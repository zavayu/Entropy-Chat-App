import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore.js';
import { Link } from 'react-router-dom';

const ContactsList = () => {

  const { getContacts, contacts, selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    getContacts()
  }, [getContacts])

  return (
    <div className="h-[90%] overflow-y-auto pt-10">
      {/*Empty Message*/}

      <div className={`w-fit h-[75vh] justify-center justify-self-center place-content-center text-center -translate-x-10 ${contacts.length > 0 ? "hidden" : "reflex"}`}>
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
              <img src={user.profilePic} alt={user.name} className="size-16 rounded-full" />
              <div className="text-start pl-4 pt-1">
                <h3 className="font-semibold">
                  {user.name}
                </h3>
                <p className="pl-1">
                  Online
                </p>
              </div>
            </div>

            <div className="justify-self-end flex gap-4 pr-4 items-center">
              <Link to="/" className="pt-1">
                <button
                  className="rounded-full size-14 bg-lightgray-300 justify-items-center hover:bg-gray-400"
                  onClick={() => setSelectedUser(user)}
                >
                  <img src="/message_icon.svg" alt="messages icon" className="size-8" />
                </button>
              </Link>

              <button
                className="btn rounded-full size-14 border-lightgray-300 bg-lightgray-300 justify-items-center hover:bg-gray-400"
                onClick={() => {}}
              >
                <img src="/3dots.svg" alt="messages icon" className="size-8" />
              </button>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactsList
