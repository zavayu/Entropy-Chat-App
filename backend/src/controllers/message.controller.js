import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { io } from "../server.js";


export const getUsers = async(req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch(error) {
    console.log("Error in getUsers controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getMessages = async(req, res) => {
  try {
    const { id:userToChatId } = req.params
    console.log("userToChatId: ", userToChatId);
    const senderId = req.user._id;

    const messages = await Message.find({
      $or:[
        {senderId:senderId, receiverId:userToChatId},
        {senderId:userToChatId, receiverId:senderId}
      ]
    })

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
};

export const getMessagesByChat = async(req, res) => {
  try{
    const { id:chatId } = req.params;
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesByChat controller: ", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
};

export const getLastMessage = async(req, res) => {
  try {
    const { id:chatId } = req.params;
    const lastMessage = await Message.findOne({ chatId }).sort({ createdAt: -1 });
    res.status(200).json(lastMessage);
  }
  catch (error) {
    console.log("Error in getLastMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
};

export const sendMessage = async(req, res) => {
  try {
    const { text, image, chatId } = req.body;
    const { id:receiverId } = req.params;
    const senderId = req.user._id;

    // TODO : case of Image message
    let imageUrl;
    if (image) {
      imageUrl = "";
    }

    const newMessage = new Message ({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      chatId,
    });

    await newMessage.save();

    io.emit("newMessage", newMessage);

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ message: "Internal server error" })
  }
};