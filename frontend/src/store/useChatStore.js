import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  selectedChat: null,
  showSelectedProfile: false,
  contacts: [],
  chats: [],

  getUserFromEmail: async (email) => {
    try {
      const res = await axiosInstance.get(`/user/getUserFromEmail/${email}`);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error fetching user: ", error.message);
      return null;
    }
  },

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
      toast.error(
        error.response?.data?.message || "Failed to fetch last message"
      );
      console.error("Error fetching last message: ", error.message);
      return null;
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      console.log("Sending message to: ", selectedUser._id);
      console.log("Message data: ", messageData);
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Image size exceeds 2MB capacity"
      );
      console.log("Error sending message: ", error.message);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  setSelectedChat: (selectedChat) => set({ selectedChat }),

  setShowSelectedProfile: (showSelectedProfile) => set({ showSelectedProfile }),

  getContacts: async () => {
    try {
      const res = await axiosInstance.get(`/user/getContacts`);
      set({ contacts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
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

  deleteContact: async (userId) => {
    try {
      await axiosInstance.post("/user/deleteContact", {
        id: userId,
      });
      set((state) => ({
        contacts: state.contacts.filter((contact) => contact._id !== userId),
      }));
      toast.success("Contact deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting contact");
      console.log("Error deleting contact: ", error.message);
    }
  },

  getChats: async () => {
    try {
      const res = await axiosInstance.get(`/chat/getChats`);
      const updatedChats = await Promise.all(
        res.data.map(async (chat) => {
          const otherChatter = await axiosInstance.get(
            `/chat/getOtherChatters/${chat._id}`
          );
          const lastMessage = await axiosInstance.get(
            `/messages/chat/${chat._id}/last`
          );

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

  createChat: async (user, otherUser) => {
    try {
      console.log("user: ", user._id, "otherUser: ", otherUser._id);
      const res = await axiosInstance.post(`/chat/createChat`, {
        userIds: [user._id, otherUser._id],
      });
      const { chats } = get();
      set({ selectedChat: res.data.chat });
      set({ chats: [...chats, res.data.chat] });
      toast.success("Chat created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating chat");
      console.log("Error creating chat: ", error.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedChat, messages } = get();
    if (!selectedChat) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (message) => {
      if (message.chatId !== selectedChat._id) return;
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });
  },

  unsubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
