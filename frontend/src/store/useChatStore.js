import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from '../store/useAuthStore';

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  selectedChat: null,
  contacts: [],
  chats: [],

  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error fetching users: ", error.message);
    }
  },

  getMessages: async (chatId) => {
    try {
      const res = await axiosInstance.get(`/messages/chat/${chatId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error fetching messages: ", error.message);
    }
  },

  getLastMessage: async (chatId) => {
    try {
      const res = await axiosInstance.get(`/messages/chat/${chatId}/last`);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch last message");
      console.error("Error fetching last message: ", error.message);
      return null;
    }
  },

  sendMessage: async (messageData) => {
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error sending message: ", error.message);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  setSelectedChat: (selectedChat) => set({ selectedChat }),

  getContacts: async () => {
    try {
      const res = await axiosInstance.get(`/user/getContacts`);
      set({ contacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error fetching contacts: ", error.message);
    }
  },

  addContact: async (email) => {
    try {
      await axiosInstance.post(`/user/addContact`, { email });
      toast.success("Contact added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding contact");
      console.log("Error adding contact: ", error.message);
    }
  },

  getChats: async () => {
    try {
      const res = await axiosInstance.get(`/chat/getChats`);
      const updatedChats = await Promise.all(
        res.data.map(async (chat) => {
          const otherChatter = await axiosInstance.get(`/chat/getOtherChatters/${chat._id}`);
          const lastMessage = await axiosInstance.get(`/messages/chat/${chat._id}/last`);

          return {
            ...chat,
            otherChatter,
            lastMessage,
          };
        })
      );
  
      set({ chats: updatedChats });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching chats");
      console.log("Error fetching chats: ", error.message);
    }
  },
}));
