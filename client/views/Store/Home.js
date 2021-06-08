import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { useHistory } from 'react-router-dom'
import CartIcon from '@heroicons/react/outline/ShoppingCartIcon'
import MovieActions from '../../Actions/MovieActions'
import Header from '../Components/Header'

export default function Home() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(true)
    const { movie, auth } = useSelector((state) => state)
    const { loading } = movie
    const history = useHistory()

    useEffect(() => {
        dispatch(MovieActions.movieList())
        /* if (!auth.isLoggedIn) {
            history.push('/mini-project/login-block')
        } */
    }, [dispatch])

    
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-black text-white">
                <h1 className="text-center text-white text-5xl pt-5 font-serif mt-20 cursor-default">Movies List</h1>
                <div className="flex flex-row flex-wrap w-full items-center justify-between px-10 pb-10">
                    {
                        !loading && movie.movies.map((movie) => (
                            <a href={`/mini-project/store/movie/${movie.movie_id}`} className="px-10 py-10" key={movie.movie_id}>
                                <h1 className='text-white text-left mx-1 my-5 font-serif cursor-default'>{movie.movie_title}</h1>
                                <img className="w-48 h-48 transition duration-100 ease-in-out rounded-lg transform hover:scale-105 hover:ring-4 ring-red-600 text-white" src={`/api/movies/download/image/${movie.movie_id}`}/>
                                <div className="pt-3 flex items-center justify-between">
                                    <h1 className="text-sm font-mono cursor-default">Rp{movie.movie_price}</h1>
                                    <button className='text-black transform transition hover:scale-150 bg-white rounded-md mt-1 px-1 py-1 inline-block'><CartIcon className='w-5 max-h-5'/></button>
                                </div>
                            </a>
                    ))} 
                </div>
            </div>
        </div>
    )
}
