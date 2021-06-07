import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { useHistory } from 'react-router-dom'
import CartIcon from '@heroicons/react/outline/ShoppingCartIcon'
import MovieActions from '../../Actions/MovieActions'
import Header from '../Components/Header'

export default function Home() {
    const dispatch = useDispatch()
    const { movie, auth } = useSelector((state) => state)
    const history = useHistory()

    useEffect(() => {
        dispatch(MovieActions.movieList())
        if (!auth.isLoggedIn) {
            history.push('/mini-project/login-block')
        }
    }, [])

    
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-black text-white">
                <h1 className="text-center text-white text-5xl pt-5 font-serif">Movies List</h1>
                <div className="flex flex-row flex-wrap w-full items-center justify-between px-10 pb-10">
                    {
                        movie.movies && movie.movies.map((movie) => (
                            <a href={`/mini-project/store/movie/${movie.movie_id}`} className="px-10 py-10" key={movie.movie_id}>
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
