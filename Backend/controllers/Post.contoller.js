import sharp from "sharp";
import cloudinary from "../utils/Cloudinary.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;
    if (!image) return res.json({ message: "image required" });
    //for image optimization here we use sharp package;

    //image upload
    const OptimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();
    //buffer to datauri
    const fileuri = `data:image/jpeg;base64,${OptimizedImageBuffer.toString(
      "base64"
    )}`;

    const cloudResponse = cloudinary.uploader.upload(fileuri);
    const post = await post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });
    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await user.populate({ path: "author", select: "-password" });

    return res.status(201).json({
      message: "New Post Added",
      post,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const gettAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username, profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username, profilePicture",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username , profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username, profilePicture",
        },
      });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const LikerId = req.id;
    const postId = req.params.id;
    const post = await Post.find(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }
    //Like logic start here

    await post.updateOne({ $addToSet: { likes: LikerId } });
    await post.save();

    return res.status(200).json({ message: "Post Liked", success: true });
  } catch (error) {
    console.log(error);
  }
};
export const DislikePost = async (req, res) => {
  try {
    const LikerId = req.id;
    const postId = req.params.id;
    const post = await Post.find(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }
    //Like logic start here

    await post.updateOne({ $pull: { likes: LikerId } });
    await post.save();

    return res.status(200).json({ message: "Post Disliked", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const addNewComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commenterId = req.id;
    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!text) {
      return res
        .status(404)
        .json({ message: "text is required", success: false });
    }

    const comment = await Comment.create({
      text,
      author: commenterId,
      post: postId,
    }).populate({
      path: "author",
      select: "username profilePicture",
    });

    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({
      message: "Comment Added",
      comment,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username",
      "profilePicture"
    );
    if (!comments) {
      return res
        .status(404)
        .json({ message: "No Comments Found for This Post", success: false });
    }
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    //cheak if the logged in user is the author of the post

    if (post.author.toString() !== authorId) {
      return res.status(404).json({
        message: "Unauthorized",
        success: false,
      });
    }
    //here we find and delete user by postId
    await Post.findByIdAndDelete(postId);

    //here we will remove the postId from the user's post

    const user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() === postId);
    user.save();

    //delete associated comments with post
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      message: "Post Deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const c = req.id;

    const post = await User.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not Found", success: false });
    }
    const user = await User.findById(postId);
    if (user.bookmarks.includes(post._id)) {
      //here we remove post from bookmarks
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        message: "Post Remove From Bookmarks",
        success: true,
      });
    } else {
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        message: "Post Bookmarked ",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
