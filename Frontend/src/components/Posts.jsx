import React, { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"; // shadcn dialog
import { Heart, MessageCircle, Bookmark, Share } from "lucide-react";

const Post = ({ username, profilePic, postVideo, caption, comments }) => {
  const [comment, setComment] = useState(""); // State to track the comment
  const [showAllComments, setShowAllComments] = useState(false); // State to toggle comments view
  const [dialogOpen, setDialogOpen] = useState(false); // State to toggle the dialog
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false); // State to toggle comments dialog

  return (
    <div className="max-w-lg mx-auto mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
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
          <Button
            variant="ghost"
            onClick={() => setDialogOpen(true)} // Open dialog when MessageCircle is clicked
          >
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
      <div className="px-4 py-2">
        {comments.slice(0, showAllComments ? comments.length : 2).map((comment, index) => (
          <div key={index} className="flex items-start mb-2">
            <img
              src={comment.profilePic}
              alt={`${comment.username}'s profile`}
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <div>
              <p>
                <span className="font-semibold">{comment.username}</span>{" "}
                {comment.text}
              </p>
            </div>
          </div>
        ))}
    
        {comments.length > 2 && (
          <Button
            variant="ghost"
            onClick={() => setCommentsDialogOpen(true)}
            className="text-blue-500 mt-2"
          >
            View All Comments
          </Button>
        )}
      </div>

      {/* Add Comment */}
      <div className="flex items-center p-4 border-t">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full p-2 text-sm outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment.trim() && (
          <Button
            variant="ghost"
            className="ml-3"
            style={{ color: "aqua" }}
          >
            Post
          </Button>
        )}
      </div>

      {/* Dialog for Post Media */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post by {username}</DialogTitle>
          </DialogHeader>
          {/* Post Media */}
          <video
            className="w-full max-h-[500px] object-cover mb-4"
            controls
            preload="metadata"
          >
            <source src={postVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </DialogContent>
      </Dialog>

      {/* Dialog for All Comments */}
      <Dialog open={commentsDialogOpen} onOpenChange={setCommentsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comments on Post by {username}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="flex items-start mb-2">
                  <img
                    src={comment.profilePic}
                    alt={`${comment.username}'s profile`}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div>
                    <p>
                      <span className="font-semibold">{comment.username}</span>{" "}
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
