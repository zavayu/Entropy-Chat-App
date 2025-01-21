import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import MessageHeader from "./MessageHeader.jsx";
import MessageFooter from "./MessageFooter.jsx";

const MessageContainer = () => {
  const { messages, getMessages, selectedUser, selectedChat } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat._id);
    }
  }, [selectedChat, getMessages]);
  console.log("messages:", messages);
  return (
    <div className="bg-primary h-screen w-4/5 hidden sm:inline">
      {/* Header */}
      <MessageHeader />

      {/* Messages */}
      <div className="h-3/4 overflow-y-auto px-14 pt-3 pb-10">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId !== authUser._id
                  ? "text-left chat-start"
                  : "text-white justify-self-end chat-end"
              }`}
              style={{
                maxWidth: "60%",
                alignSelf:
                  message.senderId !== authUser._id ? "flex-start" : "flex-end",
              }}
            >
              <div
                className={`chat-bubble  ${
                  message.senderId !== authUser._id
                    ? "text-black bg-white"
                    : "text-white chat-bubble-accent"
                }`}
              >
                <p className="">{message.text}</p>
              </div>
              <p className="text-xs text-gray-400 translate-y-4">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet!</p>
        )}
      </div>

      {/* Footer */}
      <MessageFooter />
    </div>
  );
};

export default MessageContainer;
