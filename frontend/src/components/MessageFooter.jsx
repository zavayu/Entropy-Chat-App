import React, { useState } from 'react'
import { useChatStore } from '../store/useChatStore.js';

const MessageFooter = () => {
  const { selectedUser } = useChatStore();
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async(e) => {
   console.log("Sending message: ", text);
  }

  return (
    <div className="fixed bottom-0 h-32 w-4/5 items-center py-7 pl-16 pr-40 bg-lightblue-50 border-gray-200 border-t-4">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 justify-center">
          <input 
            type="text" 
            className="w-[90%] input input-bordered rounded-2xl input-sm sm:input-lg bg-lightblue-250 border-gray-300 placeholder-gray-500"
            placeholder={`Message ${selectedUser.name} ...`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit" className="rounded-2xl size-16 bg-lightblue-250 border-gray-500 hover:bg-blue-300">
          <img src="/send.svg" alt="Send Message" className="size-9 translate-x-3"/>
        </button>
      </form>
    </div>
  )
}

export default MessageFooter
