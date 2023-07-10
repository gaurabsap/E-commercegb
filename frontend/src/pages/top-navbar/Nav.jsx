import React from 'react'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import './Nav.scss'
const Nav = () => {
  return (
    <>
      <nav className='top-navbar'>
          <div className="first">
            <div className="phone">
              <BsFillTelephoneFill size={18} color='white'/>
              <p>+9779845097315</p>
            </div>
            <div className="email">
              <MdEmail size={20} color='white'/>
              <p>iamgaurabsap20@gmail.com</p>
            </div>
          </div>
          <div className="second">
            <a href="#">FAQ</a>
            <a href="#">Need Helps?</a>
            <div className="select">
              <select className='lang'>
                <option value="Eng">English</option>
                <option value="nepali">Nep</option>
                <option value="Hindi">Ind</option>
                <option value="Japanese">Jap</option>
              </select>
            </div>
            <div className="money">
              <select className='curr'>
                  <option value="nepali">USD</option>
                  <option value="nepali">RS</option>
                  <option value="nepali">IC</option>
                </select>
            </div>
          </div>
      </nav>    
    </>
  )
}

export default Nav