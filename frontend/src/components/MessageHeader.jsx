import React from 'react'
import { useChatStore } from '../store/useChatStore.js';

const MessageHeader = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex justify-start items-center py-4 px-16 bg-lightblue-50 border-gray-200 border-b-4">

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

    </div>
  )
}

export default MessageHeader
