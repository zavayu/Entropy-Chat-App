import React from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      Home
      <br />
      <Link to={"/signup"} className="link link-primary">
        SIGNUP!!
      </Link>
      <br />
      <Link to={"/login"} className="link link-primary">
        LOGIN!!
      </Link>
      <br />
      <Link to={"/profile"} className="link link-primary">
        PROFILE!!
      </Link>
    </div>
  )
}

export default HomePage
