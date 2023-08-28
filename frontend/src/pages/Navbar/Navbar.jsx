import React, { useEffect, useState } from "react";
import logo from "../../assets/logo1.png";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BsCartFill } from "react-icons/bs";
import { GrFormNextLink } from "react-icons/gr";
import { FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartRemove } from "../../store/CartSlice";
import { setCartData, setcartRemove } from "../../store/cartFinal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Setstatus } from "../../store/reducer/UserStatus";

axios.defaults.withCredentials = true;

const Navbar = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const [showcart, setshowCart] = useState(false);

  const finalCart = useSelector((state) => state.finalcart.cartData);
  // console.log(finalCart)

  const cartNumber = useSelector((state) => state.allCarts.card);

  const items = localStorage.getItem("cart");
  const showCartData = async () => {
    setshowCart(!showcart);
  };
  const HideCart = () => {
    setshowCart(false);
  };
  const removeCart = (index) => {
    console.log(index);
    dispatch(cartRemove(index));
    dispatch(setcartRemove({ itemId: index }));
    // toast.success("Remove from cart");
    // dispatch(setCartData(carts, quantitys))
  };
  const handleQuantityChange = (product, qt) => {
    dispatch(setCartData({ itemId: product._id, quantity: qt }));
  };

  const UpdateCart = async () => {
    // dispatch(setCartData(cartNumber, quantitys));
    // // dispatch(setQuantity(quantitys));
    // console.log(finalCart);
    setshowCart(false);
  };
  const [search, setSearch] = useState();

  useEffect(() => {
    const ResqApi = async () => {
      const resq = await axios.get(
        "http://127.0.0.1:5000/api/v1/user/profile",
        { withCredentials: true }
      );
      setUser(resq.data.user.profile.pic);
      // console.log(resq.data.user.profile.pic)
      if (resq.status === 200) {
        dispatch(Setstatus(true));
      } else {
        dispatch(Setstatus(false));
      }
    };
    ResqApi();
  }, []);

  return (
    <>
      <div className="navbar">
        {/* <ToastContainer/> */}
        <div className="first-items">
          <div className="logo">
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <form className="search-bar">
            <AiOutlineSearch className="search-icons" size={22} />
            <input
              type="text"
              placeholder="Search items"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to={`/search/?s=${search}`}>
              <button>Search</button>
            </Link>
          </form>
        </div>

        <div className="last-items">
          <div className="heart">
            <AiOutlineHeart size={20} color="white" />
            <p>0</p>
          </div>
          <div className="cart" onClick={showCartData}>
            <BsCartFill size={20} color="white" />
            <p>{cartNumber?.length}</p>
          </div>
          <div className="person">
            {user.length > 0 ? (
              <img src={user} alt="profile" />
            ) : (
              <div className="persons">
                <BsFillPersonFill size={22} color="white" />
              </div>
            )}
          </div>
        </div>

        {showcart ? (
          <div className="shows__cart">
            {/* <div className="wrapper"></div> */}
            <div className="cross">
              <h1>Carts</h1>
              <FiX onClick={HideCart} size={30} className="cut" />
            </div>
            <div className="select__data">
              {cartNumber ? (
                cartNumber.map((dat, i) => {
                  const { title, image, price, desc, _id, quantity } = dat;
                  return (
                    <div className="dat" key={i}>
                      <div className="img__data">
                        <img src={image?.url} alt="" />
                        <div className="remove">
                          <h1>{title}</h1>
                          <h2>{desc}</h2>
                          <h3>Price : ${price}</h3>
                          <button onClick={() => removeCart(_id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="qt_part">
                        <label htmlFor="quntity">Quantity: </label>
                        {quantity ? (
                          <select
                            name="quantity"
                            onChange={(e) =>
                              handleQuantityChange(dat, e.target.value)
                            }
                          >
                            {/* <option disabled >items</option> */}
                            {[...Array(quantity)].map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <p>No quantity left!!</p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1>No cart found</h1>
              )}
            </div>
            {cartNumber.length > 0 ? (
              <div className="last__buttons">
                <button onClick={HideCart}>Continue shopping</button>
                <Link onClick={UpdateCart} to="/checkout">
                  Checkout <GrFormNextLink size={26} color="white" />
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Navbar;
