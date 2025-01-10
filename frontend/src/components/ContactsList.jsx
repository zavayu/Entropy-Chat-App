import React, { useState }  from 'react'

const ContactsList = () => {
  const [hasContacts, setHasContacts] = useState(false);
  return (
    <div className="h-4/5 overflow-y-auto pt-10">
      {/*Empty Message*/}

      <div className={`w-fit h-[75vh] justify-center justify-self-center place-content-center text-center -translate-x-10 ${hasContacts ? "hidden" : "reflex"}`}>
        <h1 className="font-bold text-2xl pb-2">Oops, It's empty in here!</h1>
        <p className="text-md">Add a contact to connect with friends</p>
      </div>
    </div>
  )
}

export default ContactsList
