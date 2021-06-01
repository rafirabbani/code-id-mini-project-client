import React from 'react'
//import ludens from '../assets/images/ludens.jpg'

export default function LandingPage() {
    return (
        <div class="bg-fixed bg-cover min-h-screen" style={{backgroundImage: `url('https://wallpaperaccess.com/full/3658604.jpg')`}}>
            <nav class="flex items-center justify-between">
                <img src="https://thumbs.dreamstime.com/b/red-color-popcorn-vector-icon-isolated-white-background-155306757.jpg" class="h-20 w-20 ml-10 mt-5"></img>
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
                            <form action='post' className='mt-5 mb-1'>
                            <span> <input type='text' placeHolder='Your Email Address'/><button
                            type="button"
                            class="border border-red-600 bg-red-600 text-white px-4 py-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                            >
                            Sign Up
                            </button></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


