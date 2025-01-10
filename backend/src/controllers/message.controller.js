import Message from "../models/message.model.js";
import User from "../models/user.model.js";

// export const getContacts = async(req, res) => {
//   try {
//     const loggedInUserId = req.user._id;

//     // Find the user and populate the contacts field
//     const user = await User.findById(loggedInUserId).populate({
//       path: 'contacts',
//       select: 'name email', // Only included name and email
//     });
    
//     return user.contacts; // Return only the contacts
//   } catch (error) {
//     console.log('Error fetching contacts:', error);
//     res.status(500).json({ error: "Internal server error" })
//   }
// };

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

export const sendMessage = async(req, res) => {
  try {
    const { text, image } = req.body;
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
    });

    await newMessage.save();

    // TODO: Realtime functionality

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
};