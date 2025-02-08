import { useChatStore } from "../store/useChatStore.js";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const MessageHeader = () => {
  const { selectedUser, setShowSelectedProfile } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex justify-start items-center py-4 px-16 bg-secondary border-b-4 border-neutral">
      <div className="relative">
        <img
          src={selectedUser.profilePic}
          alt={selectedUser.name}
          className="size-[72px] rounded-full"
        />
        <span className={`absolute right-0 bottom-[8px] size-3 rounded-full ring-1 ring-zinc-900 ${
          onlineUsers.includes(selectedUser._id) ? "bg-green-400" : "bg-gray-500"
        }`} />
      </div>

      <div className="px-8">
        <h1 className="font-bold text-3xl">{selectedUser.name}</h1>
        <p className="px-1">
          {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
        </p>
      </div>

      <button
        className="ml-auto  transition-transform transform hover:scale-110 "
        onClick={() => setShowSelectedProfile(true)}
      >
        <img src="/info.svg" alt="Profile Info" className="dark:hidden" />
        <img
          src="/info-white.svg"
          alt="Profile Info"
          className="hidden dark:inline"
        />
      </button>
    </div>
  );
};

export default MessageHeader;
