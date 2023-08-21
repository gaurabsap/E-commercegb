import React, { useEffect, useRef, useState } from "react";
import "./pd.scss";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
// import {AiFillHeart} from 'react-icons/ai'
// import {AiOutlineHeart} from 'react-icons/ai'
import { cartAdd } from "../store/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCartData } from "../store/cartFinal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Setstatus } from "../store/reducer/UserStatus";
import CartComponent from "../CartComponent";

axios.defaults.baseURL = "http://127.0.0.1:5000/api/v1";
const CartProduct = () => {
  const checkItems = useSelector((state) => state.allCarts.card);
  console.log(checkItems);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [popup, setPopup] = useState(false);
  const loginStatus = useSelector((state) => state.userStatus.status);
  //   console.log(loginStatus);
  const [add, setAdd] = useState("Add to cart");
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [button, setButton] = useState("Add to cart");

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        "http://127.0.0.1:5000/api/v1/get-products?limit=8&sort=1"
      );
      setData(res.data.product);
    };
    getProducts();
  }, []);
  const pass = useRef();

  const AddCart = (product) => {
    // console.log("add");
    if (loginStatus === false) {
      setPopup(true);
    } else {
      if (checkItems.includes(product)) {
        alert("Already added");
      } else {
        // setButton("Added");
        dispatch(cartAdd(product));
        dispatch(setCartData({ itemId: product, quantity: 1 }));
        toast.success("Added to the cart");
      }
    }
  };

  const ShowPassword = (e) => {
    if (e.target.checked) {
      pass.current.type = "text";
    } else {
      pass.current.type = "password";
    }
  };
  const CloseModel = () => {
    setPopup(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const LoginAccount = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const resq = await axios.post("/user/login", info);
      console.log(resq);
      if (resq.status === 200) {
        localStorage.setItem("csrf-token", resq.data.csrf);
        dispatch(Setstatus(true));
        location.reload();
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="products">
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          // pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ fontSize: "1.7rem" }}
          // toastClassName={css({ fontFamily: "Times New Roman, Serif", FontFace: "24" })}
        />
        <div className="top-title">
          <div className="title">
            <h1>New Products</h1>
          </div>
          {/* <div className="filters">
                <select className=''></select>
            </div> */}
        </div>
        <CartComponent data={data} />
        <div className="products-datas">
          {data.map((dat, i) => {
            const { title, desc, image, rating, price, _id } = dat;
            return (
              <div className="box" key={_id}>
                <div className="img">
                  <NavLink to={`/product/${_id}`}>
                    <img src={image.url} alt="img" />
                  </NavLink>
                </div>
                <div className="heart">
                  <BsHeart
                    size={20}
                    className="heart"
                    title="Add to whislist"
                  />
                  <div className="rat">
                    <div className="star" key={_id}>
                      {[...Array(rating)].map((star, i) => {
                        return (
                          <span
                            key={i}
                            style={{ color: "goldenrod" }}
                            className="star"
                          >
                            &#9733;
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="datas">
                  <div className="titles">
                    <h1>{title}</h1>
                    <p>${price}</p>
                  </div>
                  <div className="desc">
                    <p>
                      {desc}Lil hawa zpt k ho zpt Lorem ipsum dolor sit, amet
                      consectetur adipisicing elit. Nulla, porro! Lorem, ipsum
                      dolor sit amet consectetur adipisicing elit. Natus,
                      possimus?
                    </p>
                  </div>
                  <div className="rating">
                    <button onClick={() => AddCart(dat)}>{button}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {popup ? (
          <>
            <div className="wrapper"></div>
            <div className="popup">
              <dialog open className="model">
                <div className="head">
                  <h1>Login</h1>
                </div>
                <form className="login_form">
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
                  <div className="check__password">
                    <div className="checked_box">
                      <input type="checkbox" onChange={ShowPassword} />
                      <label htmlFor="checkbox">Show password</label>
                    </div>
                    <Link to="/forgot-password">Forgot password?</Link>
                  </div>
                  <div className="buttons">
                    <button onClick={CloseModel}>Cancel</button>
                    <button onClick={LoginAccount}>Login</button>
                  </div>
                </form>
              </dialog>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default CartProduct;
