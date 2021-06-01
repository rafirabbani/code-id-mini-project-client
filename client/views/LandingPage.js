import React, { useState, } from 'react'
import bgImage from '../assets/images/landing-page.jpg'
import Popcorn from '../assets/images/popcorn-png-3.png'
import { useHistory } from 'react-router-dom'

export default function LandingPage() {
    const history = useHistory()
    const [email, setEmail] = useState({
        email: undefined,
    })
    const handleChange = name => event => {
        setEmail({...email, [name]: event.target.value})
    }
    const onSubmit = () => {
        localStorage.setItem('email', JSON.stringify(email));
        history.push('/mini-project/signup')
    }
    
    return (
        <div class="bg-fixed bg-cover min-h-screen" style={{backgroundImage: `url(${bgImage})`}}>
            <nav class="flex items-center justify-between">
                <img src={Popcorn} class="h-14 w-14 ml-10 mt-5" alt='icon'></img>
                <div class="flex items-center mr-10 mt-5">
                    <button class="bg-white text-gray-500  py-2 px-3 rounded  hover:bg-red-500 hover:text-white text-l">Sign In</button>
                </div>
            </nav>
            <div class="flex flex-wrap items-center justify-center min-h-screen">
                <div class="w-full bg-black bg-opacity-90">
                    <h1 class="text-5xl font-bold  text-red-800 tracking-wide text-center">DVD STORE</h1>
                    <h2 class=" text-2xl font-bold mt-3 mb-1 text-red-800 tracking-wide text-center">Buy Your Favorite Movies, TV Shows, Documentaries, and more...</h2>
                </div>
                <div className='bg-black w-full'>
                    <div class="flex items-center justify-center">
                        <div class="w-full md:w-1/2">
                            <h2 class=" text-2xl font-bold text-white tracking-wide text-left">Ready to make purchases?</h2>
                            <h3 class="text-white text-left">
                            Enter your email address to start purchasing new DVD.
                            </h3>
                            <span> <input type='text' placeholder='Your Email Address' name='email' onChange={handleChange('email')}/><button
                            type="button"
                            class="border border-red-600 bg-red-600 text-white px-4 py-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                            onClick={onSubmit}>
                            Sign Up
                            </button></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


