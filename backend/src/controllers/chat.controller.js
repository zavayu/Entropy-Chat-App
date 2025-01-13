import Chat from '../models/chat.model.js';
import User from '../models/user.model.js';
import Message from '../models/message.model.js';

export const getChats = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const chats = await Chat.find({ chatters: loggedInUserId }).populate('chatters');
        res.status(200).json(chats);
    } catch (error) {
        console.log('Error fetching chats:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createChat = async(req, res) => {
    try{
        const { userIds } = req.body;

        if(!Array.isArray(userIds) || userIds.length < 2){
            return res.status(400).json({error: "A chat must include at least two users."});
        }
        const users = await User.find({ _id: {$in: userIds } });
        const newChat = new Chat ({
            chatters: userIds,
            messages: [],
        })
        const savedChat = await newChat.save();
        res.status(201).json({ message: "Chat created successfully", chat: savedChat });
    }
    catch(error){
        console.log('Error creating chat:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteChat = async(req, res) => {
    try{
        const { chatId } = req.body;
        const chat = await Chat.findById(chatId);
        if(!chat){
            return res.status(404).json({ error: "Chat not found" });
        }
        await chat.deleteOne();
        res.status(200).json({ message: "Chat deleted successfully" });
    }
    catch(error){
        console.log('Error deleting chat:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getOtherChatters = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id; // Assuming `req.user._id` contains the current user's ID

        // Find the chat
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }

        // Exclude the requesting user's ID
        const otherChatters = await User.find({ 
            _id: { $in: chat.chatters, $ne: userId } 
        });

        res.status(200).json(otherChatters);
    } catch (error) {
        console.log('Error fetching other chatters:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};
