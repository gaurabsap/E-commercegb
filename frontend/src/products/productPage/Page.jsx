import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./page.scss";
import Related from "../Related/Related";
import { useDispatch } from "react-redux";
import { setCartData } from "../../store/cartFinal";
import { cartAdd } from "../../store/CartSlice";

const Page = () => {
  const dispatch = useDispatch();
  const [qt, setQt] = useState();
  const { id } = useParams();
  const [data, setData] = useState();
  console.log(data);
  const [category, setCategory] = useState();
  useEffect(() => {
    const Apiresq = async () => {
      const resq = await axios.get(
        `http://127.0.0.1:3000/api/v1/product/${id}`
      );
      console.log(resq);
      setData([resq.data.data]);
      setCategory(resq.data.data.category);
    };
    Apiresq();
  }, []);
  const handleQuantityChange = (qt) => {
    // dispatch(setCartData({ itemId: product._id, quantity: qt }));
    // console.log(product._id);
    setQt(qt);
  };
  const AddCart = (product) => {
    dispatch(cartAdd(product));
    dispatch(setCartData({ itemId: product, quantity: 1 }));
    // dispatch(setCartData({ itemId: product._id, quantity: qt }));
  };
  return (
    <>
      <div className="Product__page">
        {data ? (
          data.map((dat, i) => {
            const { _id, title, image, price, quantity, rating, desc } = dat;
            return (
              <div className="products__data" key={_id}>
                <div className="all__data">
                  <div className="image">
                    <img src={image.url} alt="img" />
                  </div>
                  <div className="details">
                    <div className="title">
                      <h1>{title}</h1>
                    </div>
                    <div className="others">
                      <p>Price : ${price}</p>
                      <div className="tara">
                        <p>Rating : </p>
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
                      <div className="desc">
                        <h1>Product details</h1>
                        <p>
                          {desc} Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Repellat commodi sit provident ut
                          tempore. Dolor modi accusamus doloribus ducimus
                          reiciendis.
                        </p>
                      </div>
                    </div>
                    <div className="carts">
                      <div className="qt_data">
                        <p>Quantity : </p>
                        {quantity ? (
                          <select
                            name="quantity"
                            onChange={(e) =>
                              handleQuantityChange(e.target.value)
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
                      <button onClick={() => AddCart(dat)}>Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Loading..</h1>
        )}
      </div>
      <Related id={category} />
    </>
  );
};

export default Page;
