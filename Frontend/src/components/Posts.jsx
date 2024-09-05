import React from "react";
import { Button } from "./ui/button"
import { Heart, MessageCircle, Bookmark, Share } from "lucide-react"; // Icons from lucide-react

const Post = ({ username, profilePic, postVideo, caption, comments }) => {
  return (
    <div className="max-w-md mx-auto mt-4 bg-black text-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-4">
        <img
          src={profilePic}
          alt={`${username}'s profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="font-semibold">{username}</h3>
        </div>
      </div>

      {/* Post Video */}
      <div className="relative">
        <video
          className="w-full max-h-[500px] object-cover"
          controls
          preload="metadata"
        >
          <source src={postVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Actions */}
      <div className="flex justify-between px-4 py-2">
        <div className="flex space-x-4">
          <Button variant="ghost">
            <Heart className="w-6 h-6" />
          </Button>
          <Button variant="ghost">
            <MessageCircle className="w-6 h-6" />
          </Button>
          <Button variant="ghost">
            <Share className="w-6 h-6" />
          </Button>
        </div>
        <Button variant="ghost">
          <Bookmark className="w-6 h-6" />
        </Button>
      </div>

      {/* Likes */}
      <div className="px-4 py-1">
        <p className="font-semibold">1,234 likes</p>
      </div>

      {/* Caption */}
      <div className="px-4 py-2">
        <p>
          <span className="font-semibold">{username}</span> {caption}
        </p>
      </div>

      {/* Comments */}
      <div className="px-4 py-2 ">
        {comments.map((comment, index) => (
          <p key={index}>
            <span className="font-semibold">{comment.username}</span>{" "}
            {comment.text}
          </p>
        ))}
      </div>

      {/* Add Comment */}
      <div className="flex items-center p-4 border-t">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full p-2 text-sm outline-none text-black "
        />
        <Button variant="ghost" className="ml-3">
          Post
        </Button>
      </div>
    </div>
  );
};

export default Post;
