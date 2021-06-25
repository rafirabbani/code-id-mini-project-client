import React, { useState, } from 'react'
import bgImage from '../assets/images/landing-page.jpg'
import Popcorn from '../assets/images/popcorn-png-3.png'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UserActions from '../Actions/UserActions'

export default function LandingPage() {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const [warning, setWarning] = useState(false)
    const [notValidEmailWarning, setNotValidEmailWarning] = useState(false)
    const [email, setEmail] = useState([])
    const handleChange = name => event => {
        setEmail({...email, [name]: event.target.value })
        setWarning(false)
        setNotValidEmailWarning(false)
    }
    const onSubmit = () => {
        //console.log(data)
        //console.log(validateEmail(email.user_email))
        if (email.user_email) {
            if (validateEmail(email.user_email)) {
                dispatch(UserActions.holdMail(email))
                history.push('/mini-project/signup')
            }
            else {
                setNotValidEmailWarning(true)
            }
            
        }
        else {
            setWarning(true)
        }
        
    }

    const toLogin = () => {
        history.push('/mini-project/signin')
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    
    return (
        <div className="bg-fixed bg-cover min-h-screen" style={{backgroundImage: `url(${bgImage})`}}>
            <nav className="flex items-center justify-between">
                <img src={Popcorn} className="h-14 w-14 ml-10 mt-5 py-2 px-2" alt='icon'></img>
                    <button className="mr-10 mt-5 bg-white text-gray-500  py-2 px-3 rounded  hover:bg-red-500 hover:text-white text-l focus:ring-0 focus:border-transparent" onClick={toLogin}>Sign In</button>
            </nav>
            <div className="flex flex-wrap items-center justify-center min-h-screen">
                <div className="w-full bg-black bg-opacity-90">
                    <h1 className="text-5xl font-bold  text-red-800 tracking-wide text-center">DVD STORE</h1>
                    <h2 className=" text-2xl font-bold mt-3 mb-1 text-red-800 tracking-wide text-center">Buy Your Favorite Movies, TV Shows, Documentaries, and more...</h2>
                </div>
                <div className='bg-black w-full'>
                    <div className="flex items-center justify-center">
                        <div className="w-full md:w-1/2">
                            <h2 className=" text-2xl font-bold text-white tracking-wide text-left">Ready to make purchases?</h2>
                            <h3 className="text-white text-left">
                            Enter your email address and start purchasing new DVD.
                            </h3>
                            <span> <input className='focus:ring-0 focus:border-transparent mt-1'type='text' placeholder='Your Email Address' name='email' onChange={handleChange('user_email')}/><button
                            type="button"
                            className="border border-red-600 bg-red-600 text-white px-4 py-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                            onClick={onSubmit}>
                            Sign Up
                            </button><label className="text-red-600 mx-2 uppercase" hidden={notValidEmailWarning ? false : true}>please use a valid email address!!!</label></span>
                            <h1 className='text-red-600 font-bold text-l mb-1' style={!warning ? {visibility: 'hidden'}  : {visibility: 'visible'}  }>Email Required!!!</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


