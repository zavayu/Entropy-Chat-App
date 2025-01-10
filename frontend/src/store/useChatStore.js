import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import { sendMessage } from "../../../backend/src/controllers/message.controller.js";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,

  getUsers: async() => {
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error fetching users: ", error.message);
    }
  },

  getMessages: async(userId) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error fetching messages: ", error.message);
    }
  },

  sendMessage: async(messageData) => {
    try {
      const {selectedUser, messages} = get();
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error sending message: ", error.message);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

}));