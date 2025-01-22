import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";

const ContactsList = () => {
  const {
    getContacts,
    contacts,
    chats,
    createChat,
    setSelectedUser,
    deleteContact,
    setShowSelectedProfile,
  } = useChatStore();

  const [menuVisible, setMenuVisible] = useState(null);
  const { authUser } = useAuthStore();

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const toggleMenu = (userId) => {
    setMenuVisible((prev) => (prev === userId ? null : userId));
  };

  const handleDeleteContact = (userId) => {
    console.log(`Deleting contact with ID: ${userId}`);
    deleteContact(userId);
    setMenuVisible(null);
  };

  const handleMessageButtonClick = async (user) => {
    setSelectedUser(user);
    // Check if a chat already exists
    let chat = chats.find(
      (chat) =>
        chat.chatters.some((u) => u._id === user._id) &&
        chat.chatters.some((u) => u._id === authUser._id)
    );

    // If no chat exists, create a new one
    if (!chat) {
      createChat(authUser, user);
    }
  };

  return (
    <div className="h-[90%] overflow-y-auto pt-10">
      {/*Empty Message*/}

      <div
        className={`w-fit h-[75vh] justify-center justify-self-center place-content-center text-center -translate-x-10 ${
          contacts.length > 0 ? "hidden" : "reflex"
        }`}
      >
        <h1 className="font-bold text-2xl pb-2">Oops, It's empty in here!</h1>
        <p className="text-md">Add a contact to connect with friends</p>
      </div>

      <div className="justify-self-center grid grid-cols-1 gap-6 pb-6 w-4/5 -translate-x-12 -z-10">
        {contacts.map((user) => (
          <div
            key={user._id}
            className="flex flex-row pr-3 rounded-2xl h-24 transition-colors ring-1 bg-base-300 hover:bg-base-300 ring-gray-200 dark:ring-gray-400 place-content-center"
          >
            <div className="justify-self-start flex items-center mr-auto pl-4">
              <img
                src={user.profilePic}
                alt={user.name}
                className="size-16 rounded-full"
              />
              <div className="text-start pl-4 pt-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="pl-1">Online</p>
              </div>
            </div>

            <div className="justify-self-end flex gap-4 pr-4 items-center">
              {/* Message Button */}
              <Link to="/" className="pt-1">
                <button
                  className="rounded-full size-14 bg-lightgray-300 justify-items-center hover:bg-gray-400"
                  onClick={() => {
                    setSelectedUser(user);
                    handleMessageButtonClick(user);
                  }}
                >
                  <img
                    src="/message_icon.svg"
                    alt="messages icon"
                    className="size-8"
                  />
                </button>
              </Link>

              {/* 3 Dots Button */}
              <button
                className="btn rounded-full size-14 border-lightgray-300 bg-lightgray-300 justify-items-center hover:bg-gray-400"
                onClick={() => toggleMenu(user._id)}
              >
                <img src="/3dots.svg" alt="messages icon" className="size-8" />
              </button>

              {menuVisible === user._id && (
                <div className="absolute -right-28 mt-20 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <Link to="/">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:rounded-md text-black"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowSelectedProfile(true);
                      }}
                    >
                      About Contact
                    </button>
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:rounded-md hover:bg-red-100"
                    onClick={() => handleDeleteContact(user._id)}
                  >
                    Delete Contact
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
