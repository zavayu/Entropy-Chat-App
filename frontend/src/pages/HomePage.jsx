import React from 'react'
import Sidebar from '../components/Sidebar';
import MessageContainer from '../components/MessageContainer';
import ChatsList from '../components/ChatsList';

const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <ChatsList/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage
