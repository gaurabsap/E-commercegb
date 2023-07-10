import React from 'react'
import {TbCategory} from 'react-icons/tb'
import {AiOutlineDown} from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import './bottom.scss'
const NavBottom = () => {
  return (
    <>
    <div className="bottom-nav">
        <div className="column">
            <TbCategory size={30}/>
            <div className="cat">
                <h1>Categories</h1>
                <AiOutlineDown size={18}/>
            </div>
        </div>
        <div className="links">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/signup'>User Account</NavLink>
            <NavLink to='/'>Shop</NavLink>
            <NavLink to='/'>Trace order</NavLink>
            <NavLink className='contact' to='/'>Contact</NavLink>
        </div>
    </div>
    </>
  )
}

export default NavBottom