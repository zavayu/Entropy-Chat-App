import React, { useState, useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";

const MessageFooter = ({
  setShowEmojiSelector,
  selectedEmoji,
  setSelectedEmoji,
}) => {
  const { selectedUser, selectedChat } = useChatStore();
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the file upload logic here
      console.log("Selected file:", file);
    }
  };

  useEffect(() => {
    if (selectedEmoji) {
      setText((prevText) => prevText + selectedEmoji);
      setSelectedEmoji(null);
    }
  }, [selectedEmoji, setSelectedEmoji]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    //console.log("Sending message: ", text);
    if (!text.trim()) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: null,
        chatId: selectedChat._id,
      });
      setText("");
      setShowEmojiSelector(false);
    } catch (error) {
      console.log("Error sending message: ", error.message);
    }
  };

  return (
    <div className="fixed bottom-0 h-32 w-4/5 items-center py-7 pl-16 pr-40 bg-secondary border-neutral border-t-4">
      <form
        onSubmit={handleSendMessage}
        className="pr-4 flex items-center gap-2"
      >
        {/* File Input */}
        <button onClick={handleButtonClick} className="absolute left-6">
          <img src="/attach_file.svg" alt="Attach File" />
        </button>
        <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

        {/* Message Input */}
        <div className="flex-1 flex gap-2 justify-center">
          <input
            type="text"
            className="w-[95%] mr-5 input input-bordered rounded-2xl input-sm sm:input-lg bg-lightblue-250 dark:bg-base-300 border-gray-300 dark:border-gray-500 placeholder-base-content"
            placeholder={`Message ${selectedUser.name} ...`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {/* Emoji Selector */}
        <button
          type="button"
          className="absolute rounded-2xl right-72 mr-[3%]"
          onClick={(e) => {
            e.preventDefault();
            setShowEmojiSelector((prev) => !prev);
          }}
        >
          <img
            src="/smile.svg"
            alt="Select Emoji"
            className="size-9 transition-transform transform hover:scale-110"
          />
        </button>
        <button
          type="submit"
          className="rounded-2xl size-16 bg-lightblue-250 dark:bg-base-300 border-gray-500 hover:bg-blue-300 dark:hover:bg-base-200"
        >
          {/* Send Message */}
          <img
            src="/send.svg"
            alt="Send Message"
            className="size-9 translate-x-3 transition-transform transform hover:scale-105"
          />
        </button>
      </form>
    </div>
  );
};

export default MessageFooter;
