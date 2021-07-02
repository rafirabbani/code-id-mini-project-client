import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export default function TransactionItem(props) {

    const [items, setItems] = useState([])

    useEffect(() => {
        try {
            Axios.get(`/api/movies/ordered/${props.orderNum}`).then((response) => {
                setItems(response.data)
            })
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div>
            {
                items && items.map((item) => (
                    <div key={item.movie_id} className="overflow-hidden truncate w-72">
                        <a href={`/mini-project/store/movie/${item.movie_id}`}><img className="mt-2" src={`/api/movies/image/download/${item.movie_id}`} style={{width:'80px', height:'80px'}}/></a>
                        <label className="mb-2">Movie Title: {item.movie_title}</label>
                    </div>
                ))
            }
            <div className="flex flex-row items-center justify-end mt-2">
                <div className='flex flex-col'>
                    <div>Total Qty: {props.totalAmount}</div>
                    <div>Total Due: {`Rp${props.totalDue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</div>
                </div>
            </div>
        </div>
    )
}
