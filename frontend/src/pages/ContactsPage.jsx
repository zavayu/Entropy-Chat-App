import React from 'react'
import Sidebar from '../components/Sidebar'
import { useAuthStore } from '../store/useAuthStore'

const ContactsPage = () => {
  const {authUser} = useAuthStore();
  return (
    <div className="flex bg-lightblue-50 w-full">

      <Sidebar/>
      <div className="w-full h-full">
        <header className="pl-12 px-24 pt-7">
          <span className="text-5xl font-bold pl-7 pb-4"> Contacts</span>
          <hr className="w-10/12 border-2 m-0 fixed top-24"/>
        </header>

        <main className="justify-center text-center p-32">
          <div className="pt-44 -translate-x-10">
            <h1 className="font-bold text-2xl pb-2">Oops, It's empty in here!</h1>
            <p className="text-md">Add a contact to connect with friends</p>
          </div>
        </main>

      </div>
    </div>
  )
}

export default ContactsPage
