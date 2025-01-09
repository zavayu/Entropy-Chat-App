import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuthStore } from '../store/useAuthStore'

const ContactsPage = () => {
  const {authUser} = useAuthStore();
  const [hasContacts, setHasContacts] = useState(false);
  const [addContact, setAddContact] = useState(false);

  return (
    <div className="flex bg-lightblue-50 w-full">

      <Sidebar/>
      <div className="w-full h-full">

        <header className="pl-12 px-24 pt-7">
          <span className="text-5xl font-bold pl-7 pb-4"> Contacts</span>
          <hr className="w-10/12 border-2 m-0 fixed top-24"/>

          <button onClick={() =>setAddContact(!addContact)}>
            <img src="/add_contact.svg" alt="Add Contact" className="absolute right-44 top-10 size-12"/>
          </button>

          <div>
            <div className={`card bg-base-100 shadow-xl fixed w-96 h-44 justify-center ${addContact ? "right-60 translate-y-2" : "hidden"}`}>
              <div className="card-body">
                <h2 className="card-title">Add Contact</h2>
                <p className="text-sm">Search for a contact to add to your list!</p>
                <div className="card-actions justify-center">
                  <label className="input input-bordered flex items-center rounded-full w-full h-10">
                    <input type="text" className="grow" placeholder="Email Address" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                    </svg>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="justify-center text-center p-32">

          {/*Empty Message*/}
          <div className={`pt-44 -translate-x-10 ${hasContacts ? "hidden" : "reflex"}`}>
            <h1 className="font-bold text-2xl pb-2">Oops, It's empty in here!</h1>
            <p className="text-md">Add a contact to connect with friends</p>
          </div>

        </main>

      </div>
    </div>
  )
}

export default ContactsPage
