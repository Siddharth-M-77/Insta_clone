import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import upload from "../middlewares/multer.js"
import { addNewComment, addNewPost, bookmarkPost, deletePost, DislikePost, getCommentsOfPost, gettAllPost, getUserPost, likePost } from "../controllers/Post.contoller.js";

const Postrouter = express.Router();

Postrouter.route("/addpost").post(isAuthenticated,upload.single('image'),addNewPost)
Postrouter.route("/all").get(isAuthenticated,gettAllPost)
Postrouter.route("/userpost/all").get(isAuthenticated,getUserPost)
Postrouter.route("/:id/like").get(isAuthenticated,likePost)
Postrouter.route("/:id/dislike").get(isAuthenticated,DislikePost)
Postrouter.route("/:id/comment").post(isAuthenticated,addNewComment)
Postrouter.route("/:id/comment/all").post(isAuthenticated,getCommentsOfPost)
Postrouter.route("/delete/:id").post(isAuthenticated,deletePost)
Postrouter.route("/:id/bookmark").post(isAuthenticated,bookmarkPost)

export default Postrouter;