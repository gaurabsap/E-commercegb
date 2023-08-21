import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import "./ss.scss";
import { BsHeart } from "react-icons/bs";

const Search = () => {
  const [searchParams, setSearchParama] = useSearchParams();
  const data = searchParams.get("s");
  console.log(data);
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const CallApi = async () => {
      const resq = await axios.get(
        `http://127.0.0.1:5000/api/v1/search/products?search=${data}`
      );
      console.log(resq);
      setDetails(resq.data.search);
    };
    CallApi();
  }, [data]);
  const SelectValue = (e) => {
    console.log(e.target.value);
  };
  const AddCart = () => {};
  return (
    <>
      <main className="search__results">
        <div className="filters">
          {/* <h3>Filter by price</h3> */}
          <div className="price"></div>
        </div>
        <div className="main__products">
          <div className="prices">
            <h1>{details.length} results found!!</h1>
            <div className="sort">
              <label htmlFor="sort">Sort by :</label>
              <select onChange={SelectValue}>
                <option value="choose">Best Match</option>
                <option>Price Low to high</option>
                <option>Price High to low</option>
              </select>
            </div>
          </div>
          <div className="products-datas">
            {details.map((dat, i) => {
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
                      <button onClick={() => AddCart(dat)}>Add to cart</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Search;
