import React from 'react'
import loader from '../assets/loading.webp'
import './loading.scss'


const Loading = ({name}) => {
    // console.log(name)
  return <div className="loading">
    {/* <h1>{name}</h1> */}
    <img src={loader} alt="Loading" />
  </div>
}

export default Loading