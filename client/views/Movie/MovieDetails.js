import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Components/Header'
import { useSelector, useDispatch }  from 'react-redux'
import PlusCircleIcon from '@heroicons/react/outline/PlusCircleIcon' 
import MinusCircleIcon from '@heroicons/react/outline/MinusCircleIcon'
import Carousel  from 'react-elastic-carousel'
import MovieActions from '../../Actions/MovieActions'
import CartActions from '../../Actions/CartActions'


export default function MoviesDetails() {
    const [amount, setAmount] = useState(1)
    const { movie_id }  = useParams()
    const { movie, auth, cart } = useSelector((state) => state)
    const dispatch = useDispatch()
    const { singleMovie } = movie
    const { cartUser } = cart

    useEffect(() => {
        dispatch(MovieActions.singleMovie(parseInt(movie_id)))
        dispatch(CartActions.getCartUser(auth.userID))
        
    }, [])

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

    const handleAmountChange = (e) => {
        if (e.target.value < 1 && e.target.value) {
            setAmount(1)
        }
        else {
            setAmount(e.target.value)
        }
    }

    const amountChange = (action) => {
        if (action === 'plus') {
            setAmount((amount + 1))
        }
        else if (action === 'minus') {
            setAmount((amount - 1))
        }
    }

    

    return (
        <div className='mt-20'>
            <Header/>
            <div className="pt-5 bg-black w-full">
                    <div className="flex flex-row items-start justify-between px-10">
                    <Carousel className="">
                                <div>
                                    <img className="rounded-lg" src={singleMovie && `/api/movies/image/download/${singleMovie.movie_id}`} style={{width: '500px', height: '500px'}}/>
                                </div>
                                <div>
                                    <iframe className="rounded-lg" style={{width: '500px', height: '400px'}} src={singleMovie && `${singleMovie.movie_trailer}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                                </div>
                            </Carousel>
                        <div className="flex flex-col text-white">
                            {/* <Carousel className="min-w-screen min-h-screen">
                                <div>
                                    <img className="rounded-lg" src={movie.singleMovie && `/api/movies/download/image/${movie.singleMovie.movie_id}`} width="400" height="300"/>
                                </div>
                                <div>
                                    <iframe className="rounded-lg" width="400" height="350" src="https://www.youtube.com/embed/XkOj5QiQKIc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen={true}></iframe>
                                </div>
                            </Carousel> */}
                        {/* <iframe className="rounded-md hover:ring-2 ring-white border-white px-1" width="450" height="300" src="https://www.youtube.com/embed/XkOj5QiQKIc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                        </div>
                        <div className='text-white flex flex-wrap flex-col -mt-1 ml-5 w-full flex-grow-0'>
                                <label className="text-3xl text-white block px-5">Title:</label>
                                <div className="flex flex-row flex-grow-0 flex-wrap px-5"><h1 className="inline-block uppercase text-xl text-white mb-3 font-serif font-bold cursor-default">{singleMovie && singleMovie.movie_title}</h1></div>
                                <label className="text-3xl text-white px-5">Price:</label>
                                <h1 className="px-5 text-white text-2xl mb-3 mt-1 font-mono font-bold cursor-default">Rp{singleMovie && singleMovie.movie_price}</h1>
                                <label className="px-5 text-3xl text-white">Genre:</label>
                                <h1 className="px-5 uppercase text-xl text-white mb-3 mt-1 font-serif font-bold cursor-default">{singleMovie && singleMovie.movie_genre}</h1>
                                <label className="px-5 text-3xl text-white">Director:</label>
                                <h1 className="px-5 uppercase text-xl text-white mb-3 mt-1 font-serif font-bold cursor-default">{singleMovie && singleMovie.movie_director}</h1>
                                <label className="px-5 text-3xl text-white">Views:</label>
                                <h1 className="px-5 uppercase text-xl text-white mb-3 mt-1 font-serif font-bold cursor-default">{singleMovie && singleMovie.movie_views}</h1>
                                <label className="px-5 text-3xl text-white">Rating:</label>
                                <h1 className="px-5 uppercase text-xl text-white mb-3 mt-1 font-serif font-bold cursor-default">{singleMovie && `${singleMovie.movie_rating}/10`}</h1>
                        </div>
                        <div/>
                        <div className="flex flex-wrap flex-col flex-grow-0 px-5 py-5 ring-2 ring-red-600 rounded-md">
                            <label className='text-xl text-center text-white'>Add Amount</label>
                            <span className="flex flex-row items-center justify-center mt-5"><button className="focus:outline-none" onClick={()=> amountChange('plus')}><PlusCircleIcon className="w-7 h-7 text-white"/></button><input className="focus:outline-none mx-5 rounded-md bg-gray-800 w-14 h-14 text-center text-sm text-white" value={amount && amount}
                            onChange={handleAmountChange}/><button className="focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed" onClick={()=> amountChange('minus')} disabled={amount===1 ? true : false}><MinusCircleIcon className="w-7 h-7 text-white"/></button></span>
                            <span className="flex flex-row items-center justify-between mt-5"><label className="text-white text-md">Subtotal:</label><h1 className="text-white text-sm font-mono cursor-default">Rp{singleMovie && (singleMovie.movie_price * amount)}</h1></span>
                            <button className="text-white w-full bg-red-600 py-1 mt-2 rounded-lg hover:ring-2 ring-white focus:outline-none"
                                onClick={()=> addToCart(auth.userID, ( cartUser[0] ? cartUser[0].cart_id : null ) , singleMovie.movie_id, amount)}>Add To Cart
                            </button>
                        </div>
                    </div>
                    <h3 className="text-gray-600 text-5xl font-bold mt-24 ml-16 text-center font-serif cursor-default">Casts</h3>
                    <div className="flex flex-row flex-wrap w-full items-center justify-between px-16 py-5 mt-5">
                         {
                            singleMovie && singleMovie.casts.map((cast) => (
                                <div className='px-5 py-5' key={cast.cast_id}>
                                    <div className="justify-center flex flex-grow-0"><img className="rounded-md" src={`/api/casts/image/download/${cast.cast_id}`} width="150" height="75" alt="cast_image"/></div>
                                    <h1 className='text-white text-sm text-center mt-3 font-serif font-thin cursor-default'>{cast.cast_name}</h1>
                                </div>
                        ))} 
                    </div>     
            </div>
        </div>
    )
}
