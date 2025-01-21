import { useChatStore } from '../store/useChatStore.js';
import { useState, useEffect } from 'react';

const MessageHeader = () => {
  const { selectedUser, setShowSelectedProfile } = useChatStore();

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

      <button className="ml-auto" onClick={() => setShowSelectedProfile(true)}>
        <img src="/info.svg" alt="Profile Info" className="dark:hidden"/>
        <img src="/info-white.svg" alt="Profile Info" className="hidden dark:inline"/>
      </button>


    </div>
  )
}

export default MessageHeader
