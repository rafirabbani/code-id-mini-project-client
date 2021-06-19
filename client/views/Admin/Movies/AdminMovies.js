import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import { useSelector, useDispatch } from 'react-redux'
import MovieActions from '../../../Actions/MovieActions'
import { TrashIcon, FolderOpenIcon } from '@heroicons/react/outline'
import AdminCreateMovie from './AdminCreateMovie'
import AdminUpdateMovie from './AdminUpdateMovie'

export default function Movies() {
    const [createMovieModal, setCreateMovieModal] = useState(false)
    const [updateMovieModal, setUpdateMovieModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [detailMovie, setDetailMovie] = useState({
        movie_id: undefined,
        movie_title: undefined,
        movie_episode: undefined,
        movie_director: undefined,
        movie_studio: undefined,
        movie_tv_status: undefined,
        movie_duration: undefined,
        movie_release: undefined,
        movie_country: undefined,
        movie_genre: undefined,
        movie_rating: undefined,
        movie_network: undefined,
        movie_trailer: undefined,
        movie_views: undefined,
        movie_price: undefined,
    })
    const { movie } = useSelector((state) => state)
    const dispatch = useDispatch()
    const { movies, createMovie, updateMovie, deleteMovie } = movie

    useEffect(() => {
        dispatch(MovieActions.movieList());
    }, [])

    useEffect(() => { 
        if (!movies) {
            dispatch(MovieActions.movieList())
        }
        setUpdate(false)
    }, [update, createMovie, updateMovie, deleteMovie])

    const handleDetail = (movieID, movieTitle, movieEpisode, movieDirector, movieStudio, movieTVStatus, movieDuration, 
        movieRelease, movieCountry,movieGenre, movieRating, movieNetwork, movieTrailer, 
        movieViews, moviePrice) => {
            setUpdateMovieModal(true)
            setDetailMovie({
                movie_id: movieID,
                movie_title: movieTitle,
                movie_episode: movieEpisode,
                movie_director: movieDirector,
                movie_studio: movieStudio,
                movie_tv_status: movieTVStatus,
                movie_duration: movieDuration,
                movie_release: movieRelease,
                movie_country: movieCountry,
                movie_genre: movieGenre,
                movie_rating: movieRating,
                movie_network: movieNetwork,
                movie_trailer: movieTrailer,
                movie_views: movieViews,
                movie_price: moviePrice,
            })
            
        }

        const onDestroy = (id) => {
            dispatch(MovieActions.deleteMovie(id)).then((result) => {
                if (result.status === 200) {
                    alert(`Movie Delete`)
                }
                else {
                    alert(`Delete Fail`)
                }
            })
        }

    return (
        <div>
            <div className="flex flex-row items-center justify-between w-full flex-shrink-0">
                <label><AdminHeader title={'Movies'}/></label>
                <button className="bg-blue-500 text-white text-xl px-3 py-3 rounded-lg focus:outline-none active:bg-blue-300" onClick={()=> setCreateMovieModal(true)}>Create New Movie</button>
            </div>
            <div className="flex items-center justify-start -ml-5">
                <div className="flex flex-col w-full">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Movie ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Movie Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Movie Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Movie Price
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                        movies && movies.map((movie) => (
                                            <tr key={movie.movie_id}>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{movie.movie_id}</div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left"><img src={`/api/movies/image/download/${movie.movie_id}`} alt="movie_image" style={{width: '100px', height: '100px'}}/></div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{movie.movie_title}</div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{movie.movie_price}</div>
                                                </td>
                                                <td className="flex items-center justify-center whitespace-nowrap content-left text-sm py-14 font-medium">
                                                    <a>
                                                        <button className="focus:outline-none"  onClick={() => handleDetail(movie.movie_id, movie.movie_title, movie.movie_episode, movie.movie_director, 
                                                            movie.movie_studio, movie.movie_tv_status, movie.movie_duration, movie.movie_release, movie.movie_country, 
                                                            movie.movie_genre, movie.movie_rating, movie.movie_network, movie.movie_trailer, movie.movie_views,
                                                            movie.movie_price) }>
                                                            <FolderOpenIcon className="h-5 w-5 text-blue-500 mr-2"/></button>
                                                    </a>
                                                    <a>
                                                        <button className="focus:outline-none"  onClick={ () => {
                                                                if (
                                                                    window.confirm(
                                                                        "Are you sure you wish to delete this item?"
                                                                    )
                                                                )
                                                                    onDestroy(movie.movie_id)
                                                             }}  ><TrashIcon className="h-5 w-5 text-red-500 ml-2"/></button>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            {
                    createMovieModal ? <AdminCreateMovie setCreateMovieModal={()=> setCreateMovieModal(false)} title={'Create New Movie'} setUpdate={()=> setUpdate(true)}/> 
                    : null 
                    
                    }
            {
                updateMovieModal ? <AdminUpdateMovie setUpdateMovieModal={()=> setUpdateMovieModal(false)} title={"Update Movie"} movie={detailMovie} setUpdate={()=> setUpdate(true)}/>
                : null
            }
        </div>
    )
}
