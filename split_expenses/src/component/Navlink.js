import React from 'react'
import { Link } from 'react-router-dom'
import "./navlinks.css"
export default function Navlink() {
  return (
    <div>
       <nav>
        <ul className='navbar'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/Dashboard'>Dashboard</Link></li>
          <li><Link to='/Group'>Group</Link></li>
          <li className='log'><Link to='/Login'>Login</Link></li>
          <li className='log'><Link to='/Sign'>SignUp</Link></li>
        </ul>
        </nav> 
    </div>
  )
}
