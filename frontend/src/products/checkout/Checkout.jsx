import React, { useEffect, useState } from "react";
import "./check.scss";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setcartRemove } from "../../store/cartFinal";
import { cartRemove } from "../../store/CartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const [totalprice, setTotalPrice] = useState(0);
  const finalCart = useSelector((state) => state.finalcart.cartData);
  //   const cartRemove = useSelector((state) => state.finalcart.cartData);
  useEffect(() => {
    // Calculate total price based on the items and their quantities
    const totalPrice = finalCart.reduce((acc, dat) => {
      const { itemId, quantity } = dat;
      return acc + itemId.price * quantity;
    }, 0);
    setTotalPrice(totalPrice);
  }, [finalCart]);
  console.log(finalCart);
  const RemoveCart = (index) => {
    dispatch(setcartRemove({ itemId: index }));
    dispatch(cartRemove(index));
  };
  const handleQuantityChange = (product, qt) => {
    console.log(product);
    dispatch(setCartData({ itemId: product._id, quantity: qt }));
  };
  return (
    <div className="checkout">
      <div className="first-section">
        <NavLink to="/">
          {" "}
          <AiOutlineArrowLeft />
          back
        </NavLink>
        <div className="datas">
          {finalCart.length > 0 ? (
            finalCart.map((dat, i) => {
              const { itemId, quantity } = dat;
              //   setTotalPrice(totalprice + itemId?.price);
              return (
                <div className="main-data">
                  <div className="details">
                    <img src={itemId.image.url} alt={itemId.title} />
                    <div>
                      <h1>{itemId.title}</h1>
                      <div className="qt_part">
                        <label htmlFor="quntity">Quantity: </label>
                        {itemId.quantity ? (
                          <select
                            name="quantity"
                            value={quantity}
                            onChange={(e) =>
                              handleQuantityChange(itemId, e.target.value)
                            }
                          >
                            {/* <option disabled >items</option> */}
                            {[...Array(itemId.quantity)].map((_, i) => (
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
                  </div>
                  <div className="price">
                    <h1>${itemId.price}</h1>
                    <button onClick={() => RemoveCart(itemId._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Cart is empty</h1>
          )}
        </div>
        <h1>Total price : ${totalprice}</h1>
      </div>
      <div className="second-section"></div>
    </div>
  );
};

export default Checkout;
