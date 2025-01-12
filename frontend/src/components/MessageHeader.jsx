import React, { useState } from 'react'
import { useChatStore } from '../store/useChatStore.js';

const MessageHeader = () => {
  const { selectedUser } = useChatStore();
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  return (
    <div className="flex justify-start items-center py-4 px-16 bg-secondary border-b-4 border-neutral">

      <img src={selectedUser.profilePic} alt={selectedUser.name} className="size-[72px] rounded-full" />
      <div className="px-8">
        <h1 className="font-bold text-3xl">
          {selectedUser.name}
        </h1>
        {/*TODO: Online Status:*/}
        <p className="px-1">
          Online
        </p>
      </div>

      <button className="ml-auto" onClick={() => setShowProfileInfo(!showProfileInfo)}>
        <img src="/info.svg" alt="Profile Info"/>
      </button>


    </div>
  )
}

export default MessageHeader
