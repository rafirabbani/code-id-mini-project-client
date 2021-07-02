import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { useHistory } from 'react-router-dom'
import CartIcon from '@heroicons/react/outline/ShoppingCartIcon'
import MovieActions from '../../Actions/MovieActions'
import Header from '../Components/Header'
import CartActions from '../../Actions/CartActions'
import LoadingScreen from '../LoadingScreen'
import Loading from '../../assets/images/content-loading.svg'


export default function Home() {
    const dispatch = useDispatch()
    const { movie, auth, cart } = useSelector((state) => state)
    const [movies, setMovies] = useState([])
    const [pages, setPages] =  useState([])
    const [pageChange, setPageChange] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [contentLoading, setContentLoading] = useState(false)
    const { movieData } = movie
    const { cartUser } = cart
    const history = useHistory()

    useEffect(() => {
        dispatch(CartActions.getCartUser(auth.userID))
        dispatch(MovieActions.movieList(0)).then((result) => {
            const { movies, totalPages } = result.data
            setTimeout(function(){
                setMovies(movies)
                setPageLoading(false)
                setPages([...Array(totalPages).keys()])
            }, 2000)
        })

    }, [])

    useEffect(() => {
        setTimeout(function(){
            const { movies, totalPages } = movieData
            setMovies(movies)
            setPages([...Array(totalPages).keys()])
            setPageChange(false)
            setContentLoading(false)
        }, 1000)  
    }, [pageChange, movieData])  

    const addToCart = (userID, cartID, itemID, itemQTY) => {
        //console.log(cartID)
        if (cartUser[0] && cartUser[0].cart_status === 'OPEN') {
            dispatch(CartActions.updateCart(cartID, itemID, itemQTY)).then((result) => {
                if (result.status === 200) {
                    alert(`Success Adding Item`)
                }
                else {
                    alert(`Failed Adding Item`)
                }
            })
        } else {
            dispatch(CartActions.createCart(userID, itemID, itemQTY)).then((result) => {
                if (result.status === 200) {
                    alert(`Success Adding Item`)
                }
                else {
                    alert(`Failed Adding Item`)
                }
            }) 
        }
    }

    const toDetail = (id) => {
        history.push(`/store/movie/${id}`)
        //console.log(pages)
    }

    const onChangePage = (page) => {
        dispatch(MovieActions.movieList(page))
        setPageChange(true)
        setContentLoading(true)
    }

    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-black text-white">
                <h1 className="text-center text-white text-5xl pt-5 font-serif mt-20 cursor-default">Movies List</h1>
                {/* <button className="bg-white px-1 py-1 min-w-screen" onClick={testClick}>Click</button> */}
                <div className="flex flex-row flex-wrap w-full items-center justify-around px-10 pb-10">
                    {
                        movies && movies.map((movie) => (
                            <div className="mx-5 my-5" key={movie.movie_id} hidden={contentLoading ? true : false}>
                                <a className="px-5 py-5">
                                    <div className="flex-col flex-grow-0 items-center justify-center w-56">
                                        <button className="w-56 focus:outline-none" onClick={()=> toDetail(movie.movie_id)}>
                                            <img className="transition duration-100 ease-in-out rounded-lg transform hover:scale-105" 
                                            src={`/api/movies/image/download/${movie.movie_id}`}
                                            style={{width: '250px', height: '250px'}}/>  
                                        </button>
                                    </div>
                                    <div className="inline-flex justify-center items-center w-56">
                                        <div className="flex-1 overflow-hidden text-center">
                                            <p className='text-white font-serif cursor-default text-md truncate'>{movie.movie_title}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between flex-grow-0 w-56 my-3">
                                        <h1 className="text-sm cursor-default">Rp{movie.movie_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</h1>
                                        <button className='text-black transform transition hover:scale-150 bg-white rounded-md mt-1 px-1 py-1 inline-block focus:outline-none' onClick={()=> addToCart(auth.userID, ( cartUser[0] ? cartUser[0].cart_id : null ) , movie.movie_id, 1)}><CartIcon className='w-5 max-h-5'/></button>
                                    </div>
                                </a>
                            </div>
                    ))}                                        
                </div>
                {
                    contentLoading ? 
                    <div className="text-white mt-20 flex min-w-screen min-h-screen items-center justify-center"> 
                        <img src={Loading}/>                  
                    </div> : null
                }                
                <div className="flex flex-row items-center justify-center">
                    <div className="flex flex-row items-center justify-between" hidden={contentLoading ? true : false}>Pages: 
                            {
                                pages && pages.map((page) => (
                                    <div key={page}> 
                                        <button className="mx-5 focus:outline-none focus:underline hover:underline" onClick={()=> onChangePage(page)}>{page + 1}</button>
                                    </div>
                                ))
                            }
                    </div>
                </div>
                {
                    pageLoading ? <LoadingScreen/> : null
                }
            </div>
        </div>
    )
}
