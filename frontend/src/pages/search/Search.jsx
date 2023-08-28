import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import "./ss.scss";
import { BsHeart } from "react-icons/bs";
import { Contextapi, ProductsData } from "./Context";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Search = () => {
  const loginStatus = useSelector((state) => state.userStatus.status);
  const checkItems = useSelector((state) => state.allCarts.card);

  const { filterdata, query, setQuery, setDatas } = useContext(Contextapi);
  // const con = useContext(Contextapi);
  // console.log(con);
  console.log(filterdata && filterdata);
  const [searchParams, setSearchParama] = useSearchParams();
  const data = searchParams.get("s");

  const [details, setDetails] = useState([]);
  const [maindata, setMainData] = useState([]);
  console.log(maindata);
  useEffect(() => {
    if (filterdata) {
      setMainData(filterdata);
    }
  }, [filterdata]);

  useEffect(() => {
    const CallApi = async () => {
      const resq = await axios.get(
        `http://127.0.0.1:5000/api/v1/search/products?search=${data}&price=best`
      );
      console.log(resq);
      // setDetails(resq.data.search);
      setMainData(resq.data.search);
    };
    CallApi();
  }, [data]);

  const SelectValue = (e) => {
    // console.log(e.target.value);
    // setOption(e.target.value);
    setQuery(e.target.value);
    setDatas(data);
  };
  const AddCart = () => {
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
  return (
    <>
      <main className="search__results">
        <div className="filters">
          {/* <h3>Filter by price</h3> */}
          <div className="price"></div>
        </div>
        <div className="main__products">
          <div className="prices">
            <h1>{maindata.length} results found!!</h1>
            <div className="sort">
              <label htmlFor="sort">Sort by :</label>
              <select onChange={SelectValue}>
                <option value="best">Best Match</option>
                <option value="low">Price Low to high</option>
                <option value="high">Price High to low</option>
              </select>
            </div>
          </div>
          <div className="products-datas">
            {maindata?.map((dat, i) => {
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
