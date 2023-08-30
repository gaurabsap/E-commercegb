import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.scss";
import Loading from "../../../loading/Loading";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// axios.defaults.baseURL = "http://127.0.0.1:5000/api/v1";
const Signup = () => {
  const navigate = useNavigate();
  const pass = useRef();
  const cpass = useRef();
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const ShowPassword = (e) => {
    if (e.target.checked) {
      pass.current.type = "text";
      cpass.current.type = "text";
    } else {
      pass.current.type = "password";
      cpass.current.type = "password";
    }
  };
  const SignupAccount = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const resq = await axios.post(
        "http://127.0.0.1:5000/api/v1/user/register",
        data
      );
      console.log(resq);
      setLoad(false);
      if (resq.status === 201) {
        navigate("/login");
        toast.success("Signup sucessfuly!!");
      }
    } catch (error) {
      setLoad(false);
      //   console.log(error.reponse.data);
      // console.log(error.response.data.message);
      setError(error.response.data?.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  return (
    <>
      <div className="signup__wrapper">
        {load ? <Loading /> : null}
        <div className="signup">
          <div className="head">
            <h1>Create your account</h1>
          </div>
          <form className="login_form">
            <div className="username">
              <label htmlFor="user">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                onChange={handleInput}
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleInput}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                ref={pass}
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={handleInput}
              />
            </div>
            <div className="cpassword">
              <label htmlFor="cpass">Confirm-password</label>
              <input
                ref={cpass}
                type="password"
                placeholder="Enter your confirm-password"
                name="cpassword"
                onChange={handleInput}
              />
            </div>
            <div className="checked_boxs">
              <input id="checkbox" type="checkbox" onChange={ShowPassword} />
              <label htmlFor="checkbox">Show password</label>
            </div>
            <p style={{ color: "red", textAlign: "center", fontSize: "17px" }}>
              {error}
            </p>
            <button
              //   disabled={data.cpassword.length < 5}
              onClick={SignupAccount}
            >
              Signup
            </button>
          </form>
          <h2>
            Already have account? <Link to="/login">Login</Link>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Signup;
