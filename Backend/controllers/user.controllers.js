import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Post  from "../models/post.model.js";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/Cloudinary.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Something is missing, please check.",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing, please check.",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back, ${user.username}`,
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          profilePicture: user.profilePicture,
          followers: user.followers,
          followings: user.followings,
          posts: populatedPosts
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// export const editProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { bio, gender } = req.body;
//     let updatedFields = { bio, gender };

//     const profilePicture = req.file;

//     if (profilePicture) {

//       const fileUri = getDataUri(profilePicture);
//       // console.log("File URI:", fileUri);

//       const cloudResponse = await cloudinary.uploader.upload(fileUri);
//       console.log("Cloudinary Response:", cloudResponse);

//       updatedFields.profilePicture = cloudResponse.secure_url;
//     }

//     const user = await User.findByIdAndUpdate(userId, updatedFields, {
//       new: true,
//     });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found.",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "Profile updated successfully.",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return res.status(500).json({
//       message: "Server error",
//       success: false,
//     });
//   }
// };

export const editProfile = async (req, res) => {
  try {
    const { bio, gender } = req.body;
    const user = await User.findById(req.id).select("-password"); // Assuming you're using an authentication middleware to populate req.user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;

    if (req.file) {
      user.profilePicture = req.file.path; // Save the path of the uploaded file
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the profile",
      error: error.message,
    });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );

    if (suggestedUsers.length === 0) {
      return res.status(400).json({
        message: "No suggested users found.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const followerId = req.id;
    const followingId = req.params.id;

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot follow/unfollow yourself.",
        success: false,
      });
    }

    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower) {
      return res.status(404).json({
        message: "Follower user not found.",
        success: false,
      });
    }

    if (!following) {
      return res.status(404).json({
        message: "Following user not found.",
        success: false,
      });
    }

    const isFollowing = follower.following.includes(followingId);

    if (isFollowing) {
      // Unfollow logic
      follower.following.pull(followingId);
      following.followers.pull(followerId);
    } else {
      // Follow logic
      follower.following.push(followingId);
      following.followers.push(followerId);
    }

    await follower.save();
    await following.save();

    return res.status(200).json({
      message: isFollowing
        ? "Unfollowed successfully."
        : "Followed successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
