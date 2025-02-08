import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import MessageHeader from "./MessageHeader.jsx";
import MessageFooter from "./MessageFooter.jsx";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";


const MessageContainer = () => {
  const { messages, getMessages, selectedChat, subscribeToMessages, unsubscribeToMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat._id);
      subscribeToMessages();

      return () => {
        unsubscribeToMessages();
      };
    }
  }, [selectedChat, getMessages, subscribeToMessages, unsubscribeToMessages]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const shouldDisplayTime = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;
    const currentTime = new Date(currentMessage.createdAt).getTime();
    const previousTime = new Date(previousMessage.createdAt).getTime();
    //return (currentTime - previousTime) / 60000 > 5; // only show time if more than 5 minutes have passed
    return true;
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  return (
    <div className="bg-primary h-screen w-4/5 hidden sm:inline">
      {/* Header */}
      <MessageHeader />

      {/* Messages */}
      <div className="h-3/4 overflow-y-auto overflow-x-hidden px-10 py-6">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const previousMessage = messages[index - 1];
            const showDateDivider =
              previousMessage &&
              formatDate(message.createdAt) !==
                formatDate(previousMessage.createdAt);
            const showTime = shouldDisplayTime(message, previousMessage);

            return (
              <React.Fragment key={message._id}>
                {showDateDivider && (
                  <div className="divider text-gray-400 text-sm my-2 w-3/4 justify-self-center">
                    {formatDate(message.createdAt)}
                  </div>
                )}
                <div
                  className={`chat ${
                    message.senderId !== authUser._id
                      ? "chat-start"
                      : "text-white chat-end"
                  }`}
                >
                  <div
                    className={`chat-bubble max-w-[60%] ${
                      message.senderId !== authUser._id
                        ? "text-black dark:text-white bg-white dark:bg-secondary"
                        : "text-white chat-bubble-accent"
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    <p className="text-wrap">{message.text}</p>
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Message"
                        className="w-48 h-48 rounded-md mt-2"
                      />
                    )}
                  </div>
                  {/* Reference to the last message */}
                  {index === messages.length - 1 && (
                    <div ref={lastMessageRef}></div>
                  )}
                  {showTime && (
                    <p
                      className={`text-xs text-gray-400 translate chat-footer pt-1 ${
                        message.senderId !== authUser._id
                          ? "-translate-x-8"
                          : "translate-x-8"
                      }`}
                    >
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No messages yet!</p>
        )}
      </div>

      {/* Emoji Selector */}
      <div className={`absolute right-44 -translate-y-full pb-4 ${
        showEmojiSelector ? "" : "hidden"
      }`}>
        {/* Light Mode */}
        <div className="dark:hidden">
          <Picker theme={"light"} data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
        <div className="hidden dark:block">
          <Picker theme={"dark"} data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      </div>

      {/* Footer */}
      <MessageFooter 
        setShowEmojiSelector={setShowEmojiSelector} 
        selectedEmoji={selectedEmoji?.native}
        setSelectedEmoji={setSelectedEmoji}
      />

    </div>
  );
};

export default MessageContainer;
