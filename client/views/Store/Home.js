import React, { useEffect } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { useHistory } from 'react-router-dom'
import CartIcon from '@heroicons/react/outline/ShoppingCartIcon'
import MovieActions from '../../Actions/MovieActions'
import Header from '../Components/Header'
import CartActions from '../../Actions/CartActions'

export default function Home() {
    const dispatch = useDispatch()
    const { movie, auth, cart } = useSelector((state) => state)
    const { movies } = movie
    const { cartUser } = cart
    const history = useHistory()

    useEffect(() => {
        dispatch(MovieActions.movieList())
        dispatch(CartActions.getCartUser(auth.userID))
    }, [])
    useEffect(() => {
        if (!cartUser) {
            dispatch(CartActions.getCartUser(auth.userID))
        }
    }, [cartUser])

    const addToCart = (userID, cartID, itemID, itemQTY) => {
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
        history.push(`/mini-project/store/movie/${id}`)
    }

    
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-black text-white">
                <h1 className="text-center text-white text-5xl pt-5 font-serif mt-20 cursor-default">Movies List</h1>
                <div className="flex flex-row flex-wrap w-full items-center justify-between px-10 pb-10">
                    {
                        movies && movies.map((movie) => (
                            <div className="mx-5 my-5" key={movie.movie_id}>
                                <a className="px-5 py-5">
                                    {/* <div className='flex flex-row flex-grow-0 flex-wrap w-48'><h1 className='text-white text-left my-5 font-serif cursor-default text-md'>{movie.movie_title}</h1></div> */}
                                    <div className="flex-col flex-grow-0 items-center justify-center w-56">
                                        <button className="w-56" onClick={()=> toDetail(movie.movie_id)}>
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
                                        <button className='text-black transform transition hover:scale-150 bg-white rounded-md mt-1 px-1 py-1 inline-block' onClick={()=> addToCart(auth.userID, ( cartUser[0] ? cartUser[0].cart_id : null ) , movie.movie_id, 1)}><CartIcon className='w-5 max-h-5'/></button>
                                    </div>
                                </a>
                            </div>
                    ))} 
                </div>
            </div>
        </div>
    )
}
