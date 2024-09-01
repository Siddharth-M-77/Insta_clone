import mongoose from "mongoose";

const conversationSchmea = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  ],
});

export const Conversation = mongoose.model("Conversation",conversationSchmea)