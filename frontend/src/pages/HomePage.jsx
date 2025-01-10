import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import MessageContainer from '../components/MessageContainer';
import ChatsList from '../components/ChatsList';
import { useChatStore } from '../store/useChatStore';

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="flex bg-lightblue-100">
      <Sidebar/>
      <ChatsList/>
      {selectedUser ? <MessageContainer/> : <NoChatSelected/>}  
    </div>
  )
}

export default HomePage
