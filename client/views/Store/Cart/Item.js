import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import TrashIcon from '@heroicons/react/outline/TrashIcon'

export default function Item(props) {
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
    
    /* useEffect(()=> {
        if (!amount) {
            setAmount(1)
        }
    }, [amount]) */

    const handleAmountChange = (e) => {
        //console.log(e)
        setAmount(e.target.value)
        /* if (amount < 1 ) {
            setAmount(1)
        }
        else {
            setAmount(e.target.value)
        } */              
    }

    const inputProtection = (e) => {
        if (amount == "") {
            const data = {
                line_item_qty: 1
            }
            try {
                Axios.put(`/api/transactions/cart/update/edititem/${parseInt(props.lineItemID)}`, data).then(()=> {
                    props.setUpdate(true)
                    props.setItemUpdateModal(true)
                })
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            const data = {
                line_item_qty: amount
            }
            try {
                Axios.put(`/api/transactions/cart/update/edititem/${parseInt(props.lineItemID)}`, data).then(()=> {
                    props.setUpdate(true)
                    props.setItemUpdateModal(true)
                })
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const onDelete = () => {
        try {
            Axios.delete(`/api/transactions/cart/update/deleteitem/${parseInt(props.lineItemID)}`).then(() => {
                props.setUpdate(true)
                props.setItemDeleteModal(true)
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    //console.log(props
    return (
        <div>
            <div className="flex flex-row flex-none items-center justify-start py-10 rounded-md shadow overflow-hidden">
                <img className="rounded-md mx-5" src={`/api/movies/image/download/${props.movieID}`} style={{ width: '100px', height: '100px'}}/>
                <div className="grid grid-rows-3 gap-1 w-11/12 px-5 py-1">
                    <div className="flex flex-row overflow-hidden">
                        <label className="px-1">Title: </label>
                        <p className="px-1 truncate">{data.movie_title && data.movie_title}</p>
                    </div>
                    <div className="flex flex-row items-center justify-start">
                        <label className="px-1">Price: </label>
                        <label className="px-1 font-mono">Rp{data.movie_price && data.movie_price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</label>
                    </div>
                    {/* <div className="flex flex-row items-center justify-start">
                        <label className="px-1">Amount: </label>
                        <label className="px-1">{amount}</label>
                    </div> */} 
                    <div className="flex flex-row flex-grow-0 items-center justify-end">
                        <div className="flex flex-row items-center justify-between">
                            <button className="mx-3" onClick={onDelete}><TrashIcon className="w-7 h-7 text-red-600"/></button>
                            <label>Amount: </label>
                            <input className="w-14 max-h-7 px-1 py-1 mx-3  border-b-2 border-t-0 border-l-0 border-r-0 border-green-400 focus:outline-none focus:ring-0" 
                            value={amount} onChange={handleAmountChange} type="number" onBlur={inputProtection} />
                        </div>
                    </div>
                    
                </div>
                
                {/* <button className="bg-black text-white rounded-md px-1 py-1" onClick={onClick}>CLICK</button> */}
            </div>
        </div>
    )
}
