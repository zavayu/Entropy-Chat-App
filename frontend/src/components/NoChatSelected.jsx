import React from 'react'
const NoChatSelected = () => {
  return (
    <div className="w-4/5 bg-primary min-h-max h-dvh justify-center place-content-center hidden sm:inline px-6">

      <div className="grid justify-center items-center text-center -translate-y-10 -translate-x-8">
        <img className="justify-self-center size-32" src="/logo.svg" alt="logo" />
        <h1 className="font-bold text-2xl"> Welcome to Entropy! </h1>
        <p className="text-lg"> Select a conversation to start chatting </p>
      </div>

    </div>
  )
}

export default NoChatSelected
