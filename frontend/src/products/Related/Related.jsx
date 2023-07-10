import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import "./rel.scss";
const Related = ({ id }) => {
  console.log(id);
  const [data, setData] = useState([]);
  useEffect(() => {
    const CallApi = async () => {
      const resq = await axios.get(
        `http://127.0.0.1:3000/api/v1/related-product/${id}`
      );
      console.log(resq);
      setData(resq.data.related);
    };
    CallApi();
  }, [id]);
  const AddCart = () => {};
  return (
    <>
      <div className="related__product">
        <div className="title">
          <h1>Related product</h1>
        </div>

        <div className="products-datas">
          <div className="title">
            <h1></h1>
          </div>
          {data.map((dat, i) => {
            const { title, desc, image, rating, price, _id } = dat;
            return (
              <div className="box" key={_id}>
                <div className="img">
                  <NavLink target="_blank" to={`/product/${_id}`}>
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
                    <button onClick={() => AddCart(dat)}>Add to cart</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Related;
