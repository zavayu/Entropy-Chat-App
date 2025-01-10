import React, { useState }  from 'react'

const ContactsList = () => {
  const [hasContacts, setHasContacts] = useState(false);
  return (
    <div className="">
      {/*Empty Message*/}
      <div className={`pt-44 -translate-x-10 ${hasContacts ? "hidden" : "reflex"}`}>
        <h1 className="font-bold text-2xl pb-2">Oops, It's empty in here!</h1>
        <p className="text-md">Add a contact to connect with friends</p>
      </div>
    </div>
  )
}

export default ContactsList
