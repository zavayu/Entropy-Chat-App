import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    chatters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;