import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js';
import MessageHeader from './MessageHeader.jsx';
import MessageFooter  from './MessageFooter.jsx';

const MessageContainer = () => {
  const {messages, getMessages, selectedUser} = useChatStore();

  useEffect (() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser._id, getMessages])

  return (
    <div className="bg-primary h-screen w-4/5 hidden sm:inline">

      <MessageHeader/>
      
      {/* Messages */}
      <div className="h-3/4 overflow-y-auto px-10">
        <p>These are messages! XD</p>
      </div>

      <MessageFooter/>
    </div>
  )
}

export default MessageContainer
