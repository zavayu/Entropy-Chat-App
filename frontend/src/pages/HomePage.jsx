import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import MessageContainer from '../components/MessageContainer';
import ChatsList from '../components/ChatsList';
import ProfileDetails from '../components/ProfileDetails';
import { useChatStore } from '../store/useChatStore';
import { useState } from 'react';

const HomePage = () => {
  const { selectedUser, showSelectedProfile } = useChatStore();
  return (
    <div className="flex bg-primary">
      <Sidebar/>
      <ChatsList/>
      {showSelectedProfile ? (
        <ProfileDetails />
      ) : selectedUser ? (
        <MessageContainer />
      ) : (
        <NoChatSelected />
      )}
    </div>
  )
}

export default HomePage
