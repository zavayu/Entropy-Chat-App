import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    chatters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;