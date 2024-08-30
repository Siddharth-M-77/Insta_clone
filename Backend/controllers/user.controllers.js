import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/Cloudinary.js";
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "something is missing, Plz cheak",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "This Email id is Already Exist",
        success: false,
      });
    }

    //Hashing the password with the help of bcrypt

    const HashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: HashedPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "something is missing, Plz cheak",
        success: false,
      });
    }
    let user = User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
      followers: user.follower,
      followings: user.following,
      posts: user.post,
    };

    //for generating token we use jwt.sign method

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiredIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const userId = req.params._id;
    let user = await User.findById(userId);
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id; //its taking id from isAuthenticated middlewares
    const { bio, gender } = req.body;
    const profilePicture = req.file;

    let cloudResponse;

    if (profilePicture) {
      const fileuri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileuri);
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: true,
      });
    }

    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;
    if (gender) user.gender = gender;

    await user.save();
    return res.status(404).json({
      message: "Profile Updated Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSuggesteduser = async (req, res) => {
  try {
    const Suggesteduser = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!Suggesteduser) {
      return res.status(400).json({
        message: "Currently do not have any user",
      });
    }
    return res.status(200).json({
        success:true,
        users:Suggesteduser
    })

  } catch (error) {
    console.log(error);
  }
};

export const followOrUnfollow =(req,res)=>{

  try {
    
  } catch (error) {
    console.log(error);
    
  }

}
