import React, { useEffect } from 'react'
import { useSelector, useDispatch }  from 'react-redux'
//import { useHistory } from 'react-router-dom'
import CartIcon from '@heroicons/react/outline/ShoppingCartIcon'
import MovieActions from '../../Actions/MovieActions'
import Header from '../Components/Header'
import CartActions from '../../Actions/CartActions'

export default function Home() {
    const dispatch = useDispatch()
    const { movie, auth, cart } = useSelector((state) => state)
    const { movies } = movie

    useEffect(() => {
        dispatch(MovieActions.movieList())
        auth.userID && dispatch(CartActions.getCartUser(auth.userID))
    }, [])

    const addToCart = (userID, cartID, itemID, itemQTY) => {
        if (cart.cartUser[0].cart_status === 'OPEN') {
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

    
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-black text-white">
                <h1 className="text-center text-white text-5xl pt-5 font-serif mt-20 cursor-default">Movies List</h1>
                <div className="flex flex-row flex-wrap w-full items-center justify-between px-10 pb-10">
                    {
                        movies && movies.map((movie) => (
                            <a className="px-10 py-10" key={movie.movie_id}>
                                <div className='flex flex-row flex-grow-0 flex-wrap w-48'><h1 className='text-white text-left mx-1 my-5 font-serif cursor-default'>{movie.movie_title}</h1></div>
                                <a href={`/mini-project/store/movie/${movie.movie_id}`}><img className="w-48 h-48 transition duration-100 ease-in-out rounded-lg transform hover:scale-105 hover:ring-4 ring-red-600 text-white" src={`/api/movies/image/download/${movie.movie_id}`}/></a>
                                <div className="pt-3 flex items-center justify-between">
                                    <h1 className="text-sm font-mono cursor-default">Rp{movie.movie_price}</h1>
                                    <button className='text-black transform transition hover:scale-150 bg-white rounded-md mt-1 px-1 py-1 inline-block' onClick={()=> addToCart(auth.userID, cart.cartUser[0].cart_id, movie.movie_id, 1)}><CartIcon className='w-5 max-h-5'/></button>
                                </div>
                            </a>
                    ))} 
                </div>
            </div>
        </div>
    )
}
