import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const getContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const user = await User.findById(loggedInUserId).populate('contacts', '-password');
    res.status(200).json(user.contacts);
  } catch (error) {
    console.log('Error fetching contacts:', error);
    res.status(500).json({ message: "Internal server error" })
  }
};

export const addContact = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const contact = await User.findOne({ email });
    if (!contact) {
      return res.status(404).json({ message: 'Email not found' });
    }
    if (user.contacts.includes(contact._id.toString())) {
      return res.status(409).json({ message: 'Contact already exists in user\'s contacts' });
    }
    if (user._id.toString() === contact._id.toString()) {
      return res.status(409).json({ message: 'User cannot add itself as a contact' });
    }
    user.contacts.push(contact._id);
    await user.save();
    res.status(200).json({ message: 'Contact added successfully' });
  } catch (error) {
    console.error('Error adding contact:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const contact = await User.findOne({ email });
    if (!contact) {
      return res.status(404).json({ message: 'Contact with the provided email not found' });
    }
    if (!user.contacts.includes(contact._id.toString())) {
      return res.status(409).json({ message: 'Selected user is not a contact' });
    }
    user.contacts.pull(contact._id);
    await user.save();
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error adding contact:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUser = async(req, res) => {
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "Invalid user id" });
        }
        const user = await User.findById(id).select("-password");
        res.status(200).json(user);
    }
    catch(error){
        console.log('Error fetching user:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserFromEmail = async(req, res) => {
    try{
        const { email } = req.params;
        const user = await User.findOne({ email }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log('Error fetching user:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};
