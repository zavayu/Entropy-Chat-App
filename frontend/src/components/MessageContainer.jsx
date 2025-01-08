import React from 'react'
import { Link } from 'react-router-dom';
const MessageContainer = () => {
  return (
    <div className="w-full bg-lightblue-100 min-h-max h-dvh justify-center hidden sm:inline px-6">
      Message Container
      <br />
      <Link to={"/signup"} className="link link-primary">
        SIGNUP!!
      </Link>
      <br />
      <Link to={"/login"} className="link link-primary">
        LOGIN!!
      </Link>
      <br />
    </div>
  )
}

export default MessageContainer
