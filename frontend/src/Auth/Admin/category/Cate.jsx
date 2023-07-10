import React, { useState } from 'react'
import Loading from '../../../loading/loading';
import axios from 'axios'

const Cate = () => {
    const [load, setLoad] = useState(false)
  return (
    <>
        {load ? <Loading/> : null}

        <div className="cart">
        <div className="tit">
            <h1>Create new category</h1>
        </div>
        </div>
    </>
  )
}

export default Cate