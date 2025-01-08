import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const { logout } = useAuthStore();
  return (
    <div className="max-w-28 bg-lightblue-100 min-h-max h-dvh justify-center hidden sm:inline border-r-4">
      <a href="/"><img src="/logo.svg" alt="logo" className="px-4 mt-6"/></a>

      <div className="grid mt-32 mb-36 h-96 justify-center">
        <button className="btn btn-square rounded-2xl size-16 border-gray-300" onClick={console.log("Messages Pressed!")}>
          <img src="/message_icon.svg" alt="messages icon" className="size-9"/>
        </button>
        <button className="btn btn-square rounded-2xl size-16 border-gray-300" onClick={console.log("New Message Pressed!")}>
          <img src="/new_message_icon.svg" alt="new message icon" className="size-9"/>
        </button>
        <button className="btn btn-square rounded-2xl size-16 border-gray-300" onClick={console.log("Contacts Pressed!")}>
          <img src="/contacts.svg" alt="contacts icon" className="size-9"/>
        </button>
      </div>
      
      <div className="grid justify-center gap-3">
      <button onClick={logout} className="btn size-16">LOGOUT</button>

      <Link to={"/profile"}>
        <div className="absolute avatar placeholder">
          <div className="bg-neutral text-neutral-content w-16 rounded-full">
            <span className="text-3xl">D</span>
          </div>
        </div>
      </Link>
      </div>
    </div>
  )
}

export default Sidebar
