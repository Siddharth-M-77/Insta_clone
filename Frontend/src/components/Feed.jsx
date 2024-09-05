import React from "react";
import Post from "./Posts";

const Feed = () => {
  const posts = [
    {
      username: "john_doe",
      profilePic: "https://via.placeholder.com/50",
      postVideo: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL
      caption: "Check out this cool video! #video #fun",
      comments: [
        { username: "user1", text: "Awesome!" },
        { username: "user2", text: "Loved it!" },
      ],
    },
    {
      username: "jane_doe",
      profilePic: "https://via.placeholder.com/50",
      postVideo: "https://www.w3schools.com/html/movie.mp4", // Another example video
      caption: "My latest adventure! #travel",
      comments: [{ username: "user3", text: "Amazing video!" }],
    },
  ];

  return (
    <div className="p-4 w-full ml-[-8rem]">
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default Feed;
