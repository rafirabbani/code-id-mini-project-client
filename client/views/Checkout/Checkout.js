import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ItemActions from '../../Actions/ItemActions'
import OrderActions from '../../Actions/OrderAction'
import CheckoutItem from './CheckoutItem'
import PayButton from './ButtonBayar'
import OrderAction from '../../Actions/OrderAction'


export default function Checkout() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [cancel, setCancel] = useState(false)
    const [onSuccess, setOnSuccess] = useState("")
    const { order, item } = useSelector((state) => state)
    const { openOrderUser } = order
    const { orderedItems } = item
    
    useEffect(() =>{
        dispatch(OrderActions.getOpenOrderByUser(JSON.parse(localStorage.getItem('data')).user_id))

    }, [])
     
    useEffect(()=> {
        if (onSuccess) {
            dispatch(OrderAction.updateOrderByName(onSuccess.payt_order_number, onSuccess.payt_trx_number)).then((result) => {
                if (result.status === 200) {
                    alert(`Payment Success`)
                    history.push('/mini-project/store/home')
                }
                else{
                    alert(`Payment Failed`)
                }
            })
        }
        //console.log(onSuccess) 
    }, [onSuccess])

    useEffect(() => {
        if (openOrderUser) {
            dispatch(ItemActions.listOrderedItems(openOrderUser.order_name))
            setCancel(false)
        }
    }, [openOrderUser, cancel])

    useEffect(() => {
        dispatch(OrderActions.getOpenOrderByUser(JSON.parse(localStorage.getItem('data')).user_id))
        setCancel(false)
    }, [cancel])

    const onClick = () => {
        dispatch(OrderActions.updateOrderByName(openOrderUser.order_name, null)).then((response) => {
            if (response.status === 200) {
                alert(`Order Cancelled`)
                setCancel(true)
                history.push('/mini-project/store/home')
            }
            else {
                alert(`Cancel Failed`)
                setCancel(true)
            }
        })
    }


    return (
            <div className="flex flex-row items-center justify-between mt-20 px-20 py-5 min-w-screen">
                <label className="text-bold text-3xl" hidden={order && order.err ? false : true}>You Dont Have Any Pending Orders</label>
                <div className="flex flex-col justify-start" style={order && order.err ? {visibility: 'hidden'} : null}>
                    <label className="my-1 text-xl font-bold">Invoice: {openOrderUser && openOrderUser.order_name}</label>
                    <div className="flex flex-col justify-start my-1">
                        <label className="my-1 text-xl font-bold">Address Detail</label>
                        <label className="mt-2 text-lg">City: {openOrderUser && openOrderUser.order_city} </label>
                        <label className="mt-1 text-lg">Address: {openOrderUser && openOrderUser.order_address}</label>
                    </div>
                    <div className="my-5 font-bold text-2xl"><label>ITEMS ORDERED</label></div>
                    <div className="flex flex-col justify-start py-5 px-5 ring-red-600 rounded-md ml-20">
                        {
                            orderedItems && orderedItems.map((item) => (
                                <CheckoutItem lineItemID={item.line_item_id} movieID={item.line_item_movie_id} qty={item.line_item_qty} key={item.line_item_id}/>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col justify-start py-5 px-5 ring-red-600 rounded-md ring-1 fixed right-5 top-24 mr-20">
                    <label className="text-3xl font-bold text-red-600 px-5">Order Summary</label>
                    <label className="mt-5 text-red-600">Total Due:</label>
                    <label className="mt-1 px-2">Rp{openOrderUser && openOrderUser.order_total_due.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</label>
                    <label className="mt-5 text-red-600">Total Amount:</label>
                    <label className="mt-1 px-2">{openOrderUser && openOrderUser.order_total_qty}</label>
                    <label className="mt-5 text-red-600">Shipping Address:</label>
                    <label className="mt-1 px-2">City: {openOrderUser && openOrderUser.order_city}</label>
                    <label className="mt-1 px-2 mb-2">Address: {openOrderUser && openOrderUser.order_address}</label>
                    <button className="disabled:opacity-40" disabled={order && order.err ? true : false}><PayButton onSuccess={setOnSuccess}  amount={openOrderUser && openOrderUser.order_total_due} orderNumber={openOrderUser && openOrderUser.order_name}/></button>
                    <div className="flex items-center justify-center"><button className="mt-5 px-1 py-1 bg-red-600 text-white rounded-md active:bg-red-500 focus:outline-none disabled:opacity-40" onClick={onClick} disabled={order && order.err ? true : false} style={{width: "90%"}}>
                        Cancel
                    </button></div>
                </div>
            </div>
    )
}