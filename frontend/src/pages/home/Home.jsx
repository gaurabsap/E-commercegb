import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './home.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartProduct from '../../products/CartProduc';
const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  const [data, setData] = useState([])
  const [product, setProduct] = useState([])
  useEffect(() => {
    const GetCategories = async () => {
      const resq = await axios.get('http://127.0.0.1:3000/api/v1/get/category')
      // console.log(resq)
      setData(resq.data.category)
    }
    GetCategories()
  }, [])
  useEffect(() => {
    const GetProducts = async () => {
      const resq = await axios.get('http://127.0.0.1:3000/api/v1/get-products?limit=4')
      // console.log(resq.data.product)
      setProduct(resq.data.product)
    }
    GetProducts()
  }, [])
  return (
    <>
      <header className='homepage'>
        <div className="first-part">
          {data && data.map((dat, i) => {
            const { name, _id } = dat
            return (
              <div className="link" key={i}>
                <NavLink to={`/category/${_id}`}>{name}</NavLink>
              </div>
            )
          })}
        </div>
        <div className="slider-part">
          <Slider {...settings}>
            {product.map((dat, i) => {
              const { title, desc, image, price } = dat
              return (
                <div className="slider-data" key={i}>
                  <div className="header">
                    <div className="titles">
                      <h1>{title} is for sales</h1>
                      <h3>{desc} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas vero enim saepe voluptate, earum ab provident. Dolor alias ea vel!</h3>
                      <button>View collection</button>
                    </div>
                  <img src={image.url} alt="image" />
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </header>
      <CartProduct/>
    </>
  )
}

export default Home