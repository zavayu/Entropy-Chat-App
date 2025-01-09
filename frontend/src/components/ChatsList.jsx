import React, { useState } from 'react'

const ChatsList = () => {
  const [hasChats, setHasChats] = useState(false);

  const handleSubmit = async (e) => {
    console.log("Searching...");
    e.preventDefault();
    {/*BACKEND GOES HERE!*/}
  }

  return (
    <div className="bg-lightblue-50 min-h-max h-dvh justify-center hidden sm:inline px-4 border-r-4">

      {/*Header:*/}
      <header>
        <h2 className="text-5xl font-bold py-8 pl-2">Chats</h2>
        {/*Search Bar:*/}
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center rounded-full w-72">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
        </form>

        <div className="divider"></div>
        
      </header>

      {/*Chats List:*/}
      <div className="justify-center text-center">
        {/*Empty message:*/}
        <span className={` text-gray-500 ${hasChats ? "hidden" : "inline"}`}>No recent messages</span>
      </div>

    </div>
  )
}

export default ChatsList
