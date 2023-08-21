import React from "react";
import { TbCategory } from "react-icons/tb";
import { AiOutlineDown } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./bottom.scss";
import axios from "axios";
import { useSelector } from "react-redux";
const NavBottom = () => {
  const loginStatus = useSelector((state) => state.userStatus.status);
  console.log(loginStatus);
  const Logout = async () => {
    // dispatch(setCartData(cartNumber, quantitys));
    // // dispatch(setQuantity(quantitys));
    const resq = await axios.get("http://127.0.0.1:5000/api/v1/user/logout", {
      withCredentials: true,
    });
    console.log(resq);
    location.reload();
  };
  return (
    <>
      <div className="bottom-nav">
        <div className="column">
          <TbCategory size={30} />
          <div className="cat">
            <h1>Categories</h1>
            <AiOutlineDown size={18} />
          </div>
        </div>
        <div className="links">
          <NavLink to="/">Home</NavLink>
          {loginStatus ? (
            <NavLink onClick={Logout}>Logout</NavLink>
          ) : (
            <NavLink to="/signup">User Account</NavLink>
          )}
          {/* <NavLink to="/signup">User Account</NavLink> */}
          <NavLink to="/">Shop</NavLink>
          <NavLink to="/">Trace order</NavLink>
          <NavLink className="contact" to="/">
            Contact
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavBottom;
