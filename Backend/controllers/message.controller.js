import Message from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";

export const Sendmessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const { message } = req.body;

    let Conversatation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!Conversatation) {
      Conversatation = await Conversatation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) Conversatation.messages.push(newMessage._id);
    await Promise.all([Conversatation.save(), newMessage.save()]);

    //implement socket.io to real time data transfer
  } catch (error) {
    console.log(error);
  }
};
export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    let Conversatation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!Conversatation) {
      return res.status(200).json({
        success: true,
        message: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: Conversatation?.messages
    });
  } catch (error) {
    console.log(error);
  }
};
