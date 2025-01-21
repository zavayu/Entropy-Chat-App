import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore";

const ChatsList = () => {
  const [hasChats, setHasChats] = useState(true);
  const {
    chats,
    getChats,
    selectedUser,
    selectedChat,
    setSelectedUser,
    setSelectedChat,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const lastMessage = useState(null);

  useEffect(() => {
    getChats();
  }, [getChats]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Searching...");
    // BACKEND GOES HERE
  };

  return (
    <div className="bg-secondary h-screen w-1/5 min-w-72 justify-center hidden sm:inline px-4 border-r-4 border-neutral overflow-hidden">
      {/* Header */}
      <header className="h-1/5 min-h-48">
        <h2 className="text-5xl font-bold py-8 pl-2">Chats</h2>
        {/* Search Bar */}
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center rounded-full bg-gray-100 dark:bg-gray-300">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </form>
        <div className="divider"></div>
      </header>

      {/* Chats List */}
      <div className="justify-center text-center overflow-y-auto h-4/5">
        {hasChats ? (
          <div className="grid grid-cols-1 gap-6 pt-2">
            {chats.map((chat) => {
              // Each chat now has `otherChatter` inside it
              const otherChatter = chat.otherChatter.data[0]; // directly access the other chatter
              const lastMessage = chat.lastMessage.data; // directly access the last message

              if (!otherChatter) return null;

              return (
                <button
                  key={chat._id}
                  onClick={() => {
                    setSelectedUser(otherChatter);
                    setSelectedChat(chat);
                  }}
                  className={`pr-3 rounded-2xl h-24 transition-colors ring-1 ${
                    selectedUser?._id === otherChatter._id
                      ? "hover:bg-accent bg-accent text-white ring-blue-200 dark:ring-blue-700"
                      : "bg-base-300 hover:bg-base-300 ring-gray-200 dark:ring-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-start mx-auto pl-4">
                    <img
                      src={otherChatter.profilePic}
                      alt={otherChatter.name}
                      className="size-12 rounded-full"
                    />
                    <div className="pl-4 text-start">
                      <h3 className="font-semibold text-lg">
                        {otherChatter.name}
                      </h3>
                      {/* TODO: Add last message sent */}
                      <p className="text-sm truncate max-w-44">
                        {lastMessage ? lastMessage.text : "No messages yet"}
                      </p>
                    </div>
                    {/* TODO: Add time of last message */}
                    <p className="justify-self-end ml-auto pr-1 text-xs">
                      {lastMessage
                        ? new Date(lastMessage.createdAt).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "No messages yet"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-500">No recent messages</span>
        )}
      </div>
    </div>
  );
};

export default ChatsList;
