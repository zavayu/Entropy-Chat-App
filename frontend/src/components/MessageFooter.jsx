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
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
      };
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
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
    if (!text.trim() && !selectedImage) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: selectedImage,
        chatId: selectedChat._id,
      });
      setText("");
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setShowEmojiSelector(false);
    } catch (error) {
      console.log("Error sending message: ", error.message);
    }
  };

  return (
    <div className="fixed bottom-0 w-4/5 items-center py-7 pl-16 pr-40 bg-secondary border-neutral border-t-4">

      {/* Display currently selected image */}
      {selectedImage && (
        <div className="absolute bottom-36 px-6 py-1 bg-[#5f728a] place-items-center place-content-center rounded-md">
          <button
            className="absolute -top-4 -right-5 size-10 rounded-md bg-[#364c69]"
            onClick={removeImage}
          >
            <img
              src="/trash.svg"
              alt="Delete Image"
              className="size-8 justify-self-center"
            />
          </button>
          <img src={selectedImage} alt="Image" className="w-64" />
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="pr-4 flex items-center gap-2"
      >
        {/* Image Input */}
        <button
          onClick={handleButtonClick}
          className="absolute left-5"
          type="button"
        >
          <img src="/image.svg" alt="Attach Image" className="size-[45px]"/>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageUpload}
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
