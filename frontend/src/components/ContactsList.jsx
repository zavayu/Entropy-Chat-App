import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore.js';

const ContactsList = () => {
  
  const [hasContacts, setHasContacts] = useState(true);
  const { getUsers, users, getContacts, contacts } = useChatStore();

    useEffect(() => {
      getContacts()
    }, [getContacts])

  return (
    <div className="h-[90%] overflow-y-auto pt-10">
      {/*Empty Message*/}

      <div className={`w-fit h-[75vh] justify-center justify-self-center place-content-center text-center -translate-x-10 ${hasContacts ? "hidden" : "reflex"}`}>
        <h1 className="font-bold text-2xl pb-2">Oops, It's empty in here!</h1>
        <p className="text-md">Add a contact to connect with friends</p>
      </div>

      <div className="justify-self-center grid grid-cols-1 gap-6 pb-6 w-4/5 -translate-x-12">
        {contacts.map((user) => (
          <button
            key={user._id}
            className="pr-3 rounded-2xl h-24 transition-colors ring-1 bg-base-200 hover:bg-base-300 ring-gray-200"
          >
            <div className="flex items-center justify-start mx-auto pl-4">
              <img src={user.profilePic} alt={user.name} className="size-12 rounded-full" />
              <h3 className="pl-2 pt-1 ">
                {user.name}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ContactsList
