import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { useHistory } from 'react-router-dom'
import Popcorn from '../../assets/images/popcorn-png-3.png'
import CartIcon from '@heroicons/react/outline/ShoppingCartIcon'
import MovieActions from '../../Actions/MovieActions'

export default function Home() {
    const dispatch = useDispatch()
    const [profileModal, setProfileModal] = useState(false)
    const { movie, auth } = useSelector((state) => state)
    const history = useHistory()

    useEffect(() => {
        dispatch(MovieActions.movieList())
        if (!auth.isLoggedIn) {
            history.push('/mini-project/login-block')
        }
    }, [])

    const showProfileModal = () => {
        setProfileModal(!profileModal)
    }
    return (
        <div>
            <nav className="flex items-center justify-between bg-red-600 w-full top-0">
                <div className='flex justify-start'>
                    <a href='/mini-project/store/home' className='inline-block'><img src={Popcorn} className="h-14 w-14 ml-10 py-2 px-2" alt='icon'></img></a>
                    <a className="text-white py-2 px-3 text-xl relative mt-3 ml-5 inline" href='/mini-project/store/home'>Home</a>
                    <a className="text-white py-2 px-3 text-xl relative mt-3 ml-5 inline" href='#'>Profile</a>
                </div>
                <div className='flex justify-end'>
                    <button className="py-2 px-3 mr-5 focus:outline-none inline"><CartIcon className='w-7 max-h-7 text-white mt-1'/></button>
                    <button onClick={showProfileModal} className='focus:outline-none'><img className="w-7 max-h-7 rounded-full ring-2 ring-white mr-10 inline relative mt-1" src='https://pbs.twimg.com/media/CirKshbVAAQ4TRV.jpg' alt="avatar"/></button>
                    <div className="rounded-lg absolute right-0 w-40 mt-14 mr-7 py-1 bg-gray-800 border border-gray-800 ring-4 ring-gray-800" style={profileModal ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                        <a href="#" className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-red-600 hover:bg-white">Profile</a>
                        <div className="py-2">
                            <hr></hr>
                        </div>
                        <a href="#" className="transition-colors duration-200 block px-4 py-2 text-normal rounded-lg text-white hover:text-red-600 hover:bg-white">Cart</a>
                        <div className="py-2">
                            <hr></hr>
                        </div>
                        <button className="w-full transition-colors duration-200 block px-4 py-2 text-normal text-left rounded-lg text-red-600 hover:text-white hover:bg-red-600">    
                        Logout
                        </button>
                    </div>
                </div>
            </nav>
            <div className="min-h-screen bg-black text-white">
                <h1 className="text-center text-white text-5xl pt-5 font-serif">Movies List</h1>
                <div className="flex flex-row flex-wrap w-full items-center justify-between px-10 pb-10">
                    {
                        movie.movies && movie.movies.map((movie) => (
                            <a href="#" className="px-10 py-10">
                                <h1 className='text-white text-left mx-1 my-5 font-serif'>{movie.movie_title}</h1>
                                <img className="w-48 h-48 transition duration-100 ease-in-out rounded-lg transform hover:scale-105 hover:ring-4 ring-red-600 text-white" src={`/api/movies/download/image/${movie.movie_id}`}/>
                                <div className="pt-3 flex items-center justify-between">
                                    <h1 className="text-sm font-mono">Rp{movie.movie_price}</h1>
                                    <button className='text-black bg-white rounded-md mt-1 px-1 py-1 inline-block hover:bg-gray-300'><CartIcon className='w-5 max-h-5 text-black'/></button>
                                </div>
                            </a>
                    ))} 
                </div>
            </div>
        </div>
    )
}
