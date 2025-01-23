import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import useLocalStorage from "use-local-storage";

const Sidebar = () => {
  const [newMessage, setNewMessage] = useState(false);
  const { authUser } = useAuthStore();
  const { setSelectedUser, getUserFromEmail, createChat, chats } =
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
    <div className="w-[7%] min-w-24 shrink-0 bg-primary h-screen justify-center hidden sm:inline border-r-4 border-neutral overflow-y-auto">
      {/*Logo:*/}
      <Link to={"/"}>
        <img
          src="/logo.svg"
          alt="logo"
          className="justify-self-center px-auto max-w-[85px] mt-6 transition-transform transform hover:scale-105"
          onClick={() => setSelectedUser(null)}
        />
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

        {/*Dark Mode Toggle:*/}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={() => setIsDark(!isDark)}
            className="theme-controller"
          />
          {/* sun icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          {/* moon icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>

      {/*Profile Picture:*/}
      <div className="pt-[18dvh] grid justify-center gap-3">
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
