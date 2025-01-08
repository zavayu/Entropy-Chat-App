import React from 'react'
import Sidebar from '../components/Sidebar'
import { useAuthStore } from '../store/useAuthStore'

const ProfilePage = () => {
  const {authUser, logout} = useAuthStore();
  return (
    <div className="flex bg-lightblue-50 w-full">

      <Sidebar/>
      {/* Profile Header */}
      <div className="w-full h-full">
        <header className="pl-12 px-24 pt-7">
          <span className="text-5xl font-bold pl-7 pb-4"> Profile</span>
          <hr className="w-10/12 border-2 m-0 fixed top-24"/>
        </header>

        {/* Profile Information */}
        <main className="justify-self-center justify-center items-center p-32">
          {/* TODO: Implement Upload Picture */}
          <img src={authUser.profilePic} alt="Profile Picture" className="size-64 border-4 rounded-full  border-gray-300"/>
          <div className="pt-6">
            <p className="">Name: {authUser.name}</p>
            <p className="">Email: {authUser.email}</p>
          </div>
        </main>

        <button onClick={logout} className="absolute right-10 bottom-10 flex">
          <span className="text-lg font-semibold underline pr-2">Logout</span>
          <img src="/logout_icon.svg" alt="Logout" className="size-9 -translate-y-1"/>
          </button>
      </div>
    </div>
  )
}

export default ProfilePage
