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

export default conversationSchmea = mongoose.model("Conversation",conversationSchmea)