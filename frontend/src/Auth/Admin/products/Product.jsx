import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './product.scss'
import Loading from '../../../loading/loading';
const Product = () => {
    const [imgview, setimgView] = useState(null);
    const [load, setLoad] = useState(false);
    const [data, setData] = useState({
        title: "",
        desc: "",
        price: "",
        category: "",
        quantity: "",
        rating: ""
    })
    const [cate, setCate] = useState([])
    // console.log(cate)
    useEffect(() => {
        const GetCategory = async() => {
            const resq = await axios.get('http://127.0.0.1:3000/api/v1/get/category')
            // console.log(resq)
            setCate(resq.data.category)
        }
        GetCategory()
    },[])
    const getValue = (e) => {
        // alert(e.target.value)
        console.log(e.target.value)
        console.log(e.target)
    }
    const ImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setimgView(reader.result);
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
    }

    const UploadInput = (e) => {
        const {name, value} = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    // console.log(data)
    const fulldata = {
        data,
        image: imgview
    }
    // console.log(fulldata)
    const CreateProduct = async(e) => {
        e.preventDefault()
        try {
            setLoad(true)
            const resq = await axios.post('http://127.0.0.1:3000/api/v1/create-products', fulldata)
            console.log(resq)
            if(resq.status === 201){
                setLoad(false)
                setData('')
            }
        } catch (error) {
            console.log(error)
            setLoad(false)

        }
    }
  return (
    <>
    {load ? <Loading name="Creating product"/> : null}
    <div className="main-products">

    <div className="products">
        <div className="title">
            <h1>Create an product</h1>
        </div>
        <form className='create'>
            <div className="name">
                <label htmlFor="name">Title</label>
                <input type="text" placeholder='Enter the title' name='title' onChange={UploadInput}/>
            </div>

            <div className="desc">
                <label htmlFor="name">Description</label>
                <textarea type="text" name='desc' placeholder='Enter description' onChange={UploadInput}/>
            </div>

            <div className="price">
                <label htmlFor="name">Price</label>
                <input type="number" name='price' placeholder='Price' onChange={UploadInput}/>
            </div>            
            <div className="quantity">
                <label htmlFor="name">Quantity</label>
                <input type="number" name='quantity' placeholder='quantity' onChange={UploadInput}/>
            </div>

            <div className="category">
                <label htmlFor="cat">Choose category : </label>
                <select name='category' onChange={UploadInput}>
                    <option value='6482d25380886ada07823adb'>Select categories</option>
                    {cate.map((dat, i) => {
                        const {name, _id} = dat
                        return(
                            <option key={i} value={_id}>{name}</option>
                        )
                    })}
                </select>
            </div>

            <div className="image">
                <label htmlFor="img">Upload image</label>
                <input type="file" id='img' onChange={ImageUpload}/>
            </div>
            {
                imgview === null ? null : <div className="image-preview">
                <img src={imgview} alt="preview" />
            </div>
            }
            <button onClick={CreateProduct}>Create</button>
        </form>
    </div>
    </div>
    </>
  )
}

export default Product