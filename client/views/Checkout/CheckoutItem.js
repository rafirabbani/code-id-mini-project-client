import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function CheckoutItem(props) {
    const [data, setData] = useState([])
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        try {
            setAmount(props.qty)
            Axios.get(`/api/movies/${props.movieID}`).then((response) => {
                setData(response.data)
            })
            
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    return (
            <div className="flex flex-row flex-none py-5 items-center justify-start rounded-md shadow overflow-hidden">
                <img className="rounded-md mx-5" src={`/api/movies/image/download/${props.movieID}`} style={{ width: '100px', height: '100px'}}/>
                <div className="grid grid-rows-3 gap-1 w-11/12 px-5 py-1">
                    <div className="flex flex-row overflow-hidden">
                        <label className="px-1">Title: </label>
                        <p className="px-1 truncate">{data.movie_title && data.movie_title}</p>
                    </div>
                    {/* <div className="flex flex-row items-center justify-start">
                        <label className="px-1">Price: </label>
                        <label className="px-1 font-mono">Rp{data.movie_price && data.movie_price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</label>
                    </div> */}
                    <div className="flex flex-row items-center justify-start">
                        <label className="px-1">Amount: </label>
                        <label className="px-1">{amount}</label>
                    </div>
                    {/* <div className="flex flex-row items-center justify-start">
                        <label className="px-1">Subtotal: </label>
                        <label className="px-1 font-mono">Rp{data.movie_price && (data.movie_price * amount).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</label>
                    </div> */}
                </div>
            </div>
    )
}
