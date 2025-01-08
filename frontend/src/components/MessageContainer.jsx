import React from 'react'
import { Link } from 'react-router-dom';
const MessageContainer = () => {
  return (
    <div className="w-full bg-lightblue-100 min-h-max h-dvh justify-center place-content-center hidden sm:inline px-6">

      {/*Logo and Welcome Message:*/}
      <div className="grid justify-center items-center text-center -translate-y-10">
        <img className="justify-self-center size-32" src="/logo.svg" alt="logo" />
        <h1 className="font-bold text-2xl"> Welcome to Entropy! </h1>
        <p className="text-lg"> Select a conversation to start chatting </p>
      </div>

    </div>
  )
}

export default MessageContainer
