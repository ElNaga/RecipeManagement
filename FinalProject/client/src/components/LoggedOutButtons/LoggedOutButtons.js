import React from 'react'
import { Link } from 'react-router-dom'

export const LoggedOutButtons = () => {
  return (
      <div className="logButtons">
          <ul>
              <li className="logIn">
                <Link style={{ textDecoration: 'none', color: "#a5a5a5"}} to="/login">LOG IN</Link>
                </li>
              <li className="orangeOr">
                or
                </li>
              <li className="createAccount">
                <Link style={{ textDecoration: 'none', color: "#fff" }} to="/create-account">CREATE ACCOUNT</Link>
                </li>
          </ul>
      </div>
  )
}
