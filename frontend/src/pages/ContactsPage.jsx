import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ContactsList from '../components/ContactsList'
import { useAuthStore } from '../store/useAuthStore'

const ContactsPage = () => {
  const { authUser } = useAuthStore();
  const [addContact, setAddContact] = useState(false);

  const handleSubmit = async (e) => {
    console.log("Searching...");
    e.preventDefault();
    {/*BACKEND GOES HERE!*/ }
  }

  return (
    <div className="flex bg-lightblue-50 w-full">

      <Sidebar />
      <div className="w-full h-full">

        <header className="pl-12 px-24 pt-7">
          <span className="text-5xl font-bold pl-7 pb-4"> Contacts</span>
          <hr className="w-10/12 border-2 m-0 fixed top-24" />

          <button onClick={() => setAddContact(!addContact)}>
            <img src="/add_contact.svg" alt="Add Contact" className="absolute right-44 top-10 size-12" />
          </button>

          <div>
            <div className={`card bg-base-100 shadow-xl fixed w-96 h-44 justify-center ${addContact ? "right-60 translate-y-2" : "hidden"}`}>
              <div className="card-body">
                <h2 className="card-title">Add new contact</h2>
                <div className="flex">
                  <img src="/mail.svg" alt="Mail icon" className="size-5 translate-y-0" />
                  <p className="text-sm pl-2">You can add friends with their email</p>
                </div>
                <div className="card-actions justify-start">
                <form onSubmit={handleSubmit}>
                <label className="input input-bordered flex items-center rounded-full w-72 h-10">
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
              </form>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="justify-center text-center p-32">

          <ContactsList />

        </main>

      </div>
    </div>
  )
}

export default ContactsPage
