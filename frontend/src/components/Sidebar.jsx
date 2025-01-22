import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import useLocalStorage from "use-local-storage";

const Sidebar = () => {
  const [newMessage, setNewMessage] = useState(false);
  const { authUser } = useAuthStore();
  const { selectedUser, setSelectedUser, getUserFromEmail, createChat, chats } =
    useChatStore();
  const [email, setEmail] = useState("");
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otherUser = await getUserFromEmail(email);

    if (otherUser && otherUser._id !== authUser._id) {
      setSelectedUser(otherUser);
      let chat = chats.find(
        (chat) =>
          chat.chatters.some((u) => u._id === otherUser._id) &&
          chat.chatters.some((u) => u._id === authUser._id)
      );
      // If no chat exists, create a new one
      if (!chat) {
        createChat(authUser, otherUser);
      }
    }
    setNewMessage(false);
    setEmail("");
  };

  return (
    <div className="max-w-28 bg-primary h-screen justify-center hidden sm:inline border-r-4 border-neutral overflow-y-auto">
      {/*Logo:*/}
      <Link to={"/"}>
        <img src="/logo.svg" alt="logo" className="px-4 mt-6" />
      </Link>

      {/*Navigation Buttons:*/}
      <div className="grid mt-12 md:mt-24 lg:mt-32 h-96 justify-center place-items-center">
        {/*Messages Button:*/}
        <Link to={"/"}>
          <button className="btn btn-square rounded-2xl size-16 border-gray-300">
            <img
              src="/message_icon.svg"
              alt="messages icon"
              className="size-9"
            />
          </button>
        </Link>

        {/*New Message Button:*/}
        <button
          className="btn btn-square rounded-2xl size-16 border-gray-300"
          onClick={() => setNewMessage(!newMessage)}
        >
          <img
            src="/new_message_icon.svg"
            alt="new message icon"
            className="size-9"
          />
        </button>

        {/*New Messages Pop-up:*/}
        <div
          className={`card bg-base-100 shadow-xl fixed w-96 h-44 justify-center dark:border-2 border-neutral ${
            newMessage ? "left-24 -translate-y-5 z-10" : "hidden"
          }`}
        >
          <div className="card-body">
            <h2 className="card-title">New Message</h2>
            <p className="text-sm">
              Enter a friend's email to start a conversation!
            </p>
            <div className="card-actions justify-start">
              <form onSubmit={handleSubmit}>
                <label className="input input-bordered flex items-center rounded-full w-full h-10">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
            </div>
          </div>
        </div>

        {/*Contacts Button:*/}
        <Link to={"/contacts"}>
          <button className="btn btn-square rounded-2xl size-16 border-gray-300">
            <img src="/contacts.svg" alt="contacts icon" className="size-9" />
          </button>
        </Link>

        <input
          type="checkbox"
          className="toggle toggle-info"
          checked={isDark}
          onChange={() => setIsDark(!isDark)}
        />
      </div>

      {/*Profile Picture:*/}
      <div className="pt-52 grid justify-center gap-3">
        <Link to={"/profile"}>
          <img
            src={authUser.profilePic}
            alt="Profile"
            className="size-20 rounded-full border-2 border-gray-300"
          />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
