import React, { useRef, useState } from 'react'
import './auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../loading/Loading'
import {useDispatch} from 'react-redux'
import { Setstatus } from '../../../store/reducer/UserStatus'



axios.defaults.baseURL = "http://127.0.0.1:3000/api/v1"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(false)
    const pass = useRef()
    const ShowPassword = (e) => {
        if(e.target.checked){
            pass.current.type = "text"
        }else{
            pass.current.type = "password"
        }
    }

    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleInput = (e) => {
        const {name, value} = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const LoginAccount = async(e) => {
        e.preventDefault()
        try {
            setLoad(true)
            const resq = await axios.post('/user/login', data)
            console.log(resq)
            if(resq.status === 200){
                localStorage.setItem('csrf-token', resq.data.csrf)
                dispatch(Setstatus(true))
                navigate('/')
                location.reload()
            }
            setLoad(false)
        } catch (error) {
            setLoad(false)
            console.log(error.response.data.message)
            setError(error.response.data.message)
            setTimeout(() => {
                setError('')
            }, 3000);
        }
    }
  return (
    <>
        <div className="login__wrapper">
        {load ? <Loading/> : null}

        <div className="login">
            <div className="head">
                <h1>Login</h1>
            </div>
            <form className='login_form'>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter your email' name='email' onChange={handleInput}/>
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input ref={pass} type="password" placeholder='Enter your password' name='password' onChange={handleInput}/>
                    </div>
                    <div className="check__password">
                        <div className="checked_box">
                            <input id='checkbox' type="checkbox" onChange={ShowPassword}/>
                            <label htmlFor="checkbox">Show password</label>
                        </div>
                        <Link to='/forgot-password'>Forgot password?</Link>
                    </div>
                    <p style={{color: 'red', textAlign: 'center', fontSize: '1.6rem'}} >{error}</p>
                    <button onClick={LoginAccount}>Login</button>
            </form>
            <h2>Create an account <Link to='/signup'>Signup</Link></h2>
        </div>
    </div>
    
    </>
  )
}

export default Login