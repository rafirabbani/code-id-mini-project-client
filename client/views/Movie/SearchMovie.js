import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import MovieActions from '../../Actions/MovieActions'
import CartActions from '../../Actions/CartActions'
import Header from '../Components/Header'

export default function SearchMovie() {
    const [movies, setMovies] = useState([])
    const [pages, setPages] = useState([])
    const [pageChange, setPageChange] = useState(false)
    const [newSearch, setNewSearch] = useState(false)    
    const query = new URLSearchParams(useLocation().search)
    const { movie, auth } = useSelector((state) => state)
    const { moviesByTitle, moviesByGenre } = movie
    const { params } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(CartActions.getCartUser(auth.userID))
        //console.log(params, query.get('movie_title'))
        if (params === 'title') {
            dispatch(MovieActions.searchMovieTitle(query.get('movie_title')))
        }

        if (params === 'genre') {
            //console.log(params, query.get('movie_genre'))
            dispatch(MovieActions.searchMovieGenre(query.get('movie_genre'), 0))
        }
        //dispatch(MovieActions.searchMovieTitle(params))
        
    }, [])

    useEffect(() => {
        if (params === 'title') {
            dispatch(MovieActions.searchMovieTitle(query.get('movie_title')))
            setNewSearch(false)
        }

        if (params === 'genre') {
            //console.log(params, query.get('movie_genre'))
            dispatch(MovieActions.searchMovieGenre(query.get('movie_genre'), 0))
            setNewSearch(false)
        }
    }, [newSearch])

    useEffect(() => {
        if (moviesByGenre) {
            const { movies, totalPages } = moviesByGenre
            setMovies(movies)
            setPages([...Array(totalPages).keys()])
            setPageChange(false)

        }
    }, [moviesByGenre, pageChange])
    
    const onPageChange = (page) => {
        dispatch(MovieActions.searchMovieGenre(query.get('movie_genre'), page))
        setPageChange(true)
    }



    return (
        <div className="bg-black min-h-screen">
            <Header setNewSearch={()=> setNewSearch(true)}/>
            <div className="px-5 mx-20 py-5 mt-20 flex flex-row items-center justify-start text-4xl font-serif text-white">
                <label className="mt-10">{`Movies with ${params === 'title' ? 'title' : params === 'genre' ? 'genre' : null} ${ params === 'title' ? `contains "${query.get('movie_title')}"` : params === 'genre' ? `"${query.get('movie_genre')}"` : null}`}</label>
            </div>
            <div className="text-white mx-20 px-5 text-xl">{params === 'title' && moviesByTitle && moviesByTitle.length < 1 ? `No Such Movies` : params === 'genre' && moviesByGenre && moviesByGenre.length < 1 ? `No Such Movies` : null}</div>
            <div className="mx-20 flex flex-row items-center justify-start flex-wrap">
                {
                    moviesByTitle && moviesByTitle.map((item) => (
                        <div className="py-5 px-5" key={item.movie_id}>
                            <div className="overflow-hidden truncate w-48 text-white">
                                <a href={`/mini-project/store/movie/${item.movie_id}`}>
                                    <img className="mb-5 transform hover:scale-105" src={`/api/movies/image/download/${item.movie_id}`} style={{width: "200px", height:"300px"}}/>
                                </a>
                                <label className="font-serif text-left">{item.movie_title}</label>
                            </div>
                        </div>
                    ))}
                {
                    movies && movies.map((item) => (
                        <div className="py-5 px-5" key={item.movie_id}>
                            <div className="overflow-hidden truncate w-48 text-white">
                                <a href={`/mini-project/store/movie/${item.movie_id}`}>
                                    <img className="mb-5 transform hover:scale-105" src={`/api/movies/image/download/${item.movie_id}`} style={{width: "200px", height:"300px"}}/>
                                </a>
                                <label className="font-serif text-left">{item.movie_title}</label>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex flex-row items-center justify-center text-white'>
                <label>Pages:</label>
                <div className="flex flex-row items-center justify-between">
                    {
                        pages && pages.map((page) => (
                            <div key={page}>
                                <button className="focus:outline-none hover:underline focus:underline mx-3" onClick={()=> onPageChange(page)}>{page+1}</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
