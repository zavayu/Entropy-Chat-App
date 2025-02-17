import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const ChatsList = () => {
  const {
    chats,
    getChats,
    selectedUser,
    selectedChat,
    setSelectedUser,
    setSelectedChat,
    setShowSelectedProfile,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getChats();
  }, [getChats, chats]);

  const sortedChats = chats.slice().sort((a, b) => {
    const aLastMessage = a.lastMessage?.data?.createdAt;
    const bLastMessage = b.lastMessage?.data?.createdAt;
    return new Date(bLastMessage) - new Date(aLastMessage);
  });

  const filteredChats = sortedChats.filter((chat) => {
    const otherChatter = chat.otherChatter?.data?.[0];
    if (!otherChatter) return false;
    const searchLower = searchQuery.toLowerCase();
    return (
      otherChatter.name.toLowerCase().startsWith(searchLower) ||
      otherChatter.email.toLowerCase().startsWith(searchLower)
    );
  });

  return (
    <div className="bg-secondary h-screen w-1/5 min-w-72 justify-center hidden sm:inline px-4 border-r-4 border-neutral overflow-hidden">
      {/* Header */}
      <header className="h-1/5 min-h-48">
        <h2 className="text-5xl font-bold py-8 pl-2">Chats</h2>
        {/* Search Bar */}
        <form>
          <label className="input input-bordered flex items-center rounded-full bg-gray-100 dark:bg-gray-300">
            <input
              type="text"
              className="grow placeholder-slate-700"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="black"
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
      <div className="justify-center text-center overflow-y-auto h-4/5 pb-6">
        {filteredChats.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 pt-2">
            {filteredChats.map((chat) => {
              // Each chat now has `otherChatter` inside it
              const otherChatter = chat.otherChatter?.data?.[0]; // directly access the other chatter
              const lastMessage = chat.lastMessage?.data; // directly access the last message

              if (!otherChatter) return null;

              return (
                <button
                  key={chat._id}
                  onClick={() => {
                    setSelectedUser(otherChatter);
                    setSelectedChat(chat);
                    setShowSelectedProfile(false);
                  }}
                  className={`pr-3 rounded-2xl h-24 transition-colors ring-1 ${
                    selectedUser?._id === otherChatter._id
                      ? " bg-accent dark:hover:bg-blue-500 hover:bg-[#85beff] text-white ring-blue-200 dark:ring-blue-700"
                      : "bg-base-300 dark:hover:bg-gray-400 hover:bg-[#d6d6d6] ring-gray-200 dark:ring-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-start mx-auto pl-4">
                    {/* profile picture of other chatter */}
                    <div className="relative">
                      <img
                        src={otherChatter.profilePic}
                        alt={otherChatter.name}
                        className="min-w-12 min-h-12 size-12 rounded-full"
                      />
                      <span
                        className={`absolute right-[-2px] bottom-[3px]  size-[11px] rounded-full ring-1 ring-zinc-900 ${
                          onlineUsers.includes(otherChatter._id)
                            ? "bg-green-400"
                            : "bg-gray-500"
                        }`}
                      />
                    </div>

                    <div className="pl-4 text-start">
                      {/* name of other chatter */}
                      <h3 className="font-semibold text-lg text-nowrap truncate max-w-30 shrink">
                        {otherChatter.name}
                      </h3>
                      {/* last message sent */}
                      <p className="text-sm truncate max-w-32">
                        {lastMessage ? lastMessage.text : "No messages yet"}
                      </p>
                    </div>
                    {/* time of last message */}
                    <p className="justify-self-end ml-auto pr-1 text-xs text-nowrap overflow-x-hidden">
                      {lastMessage
                        ? new Date(lastMessage.createdAt).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "N/A"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <span
              className={`text-gray-500 dark:text-[#d8d8d8] ${
                searchQuery ? "hidden" : ""
              }`}
            >
              No recent messages
            </span>
            <span
              className={`text-gray-500 dark:text-[#d8d8d8] ${
                searchQuery ? "" : "hidden"
              }`}
            >
              Chat not found
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsList;
