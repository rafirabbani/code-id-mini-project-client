import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import OrderActions from '../../../Actions/OrderAction'

export default function PaidTransactions(props) {
    const [orders, setOrders] = useState([])
    const [pages, setPages] = useState([])
    const [pageChange, setPageChange] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.transactionsList) {
            const { orders, totalPages } = props.transactionsList
            setOrders(orders)
            setPages([...Array(totalPages).keys()])
            setPageChange(false)

        }
    }, [props, pageChange])

    const onPageChange = (page) => {
        dispatch(OrderActions.getPaidOrderForUser(props.userID, page))
        setPageChange(true)
    }

    return (
        <div className="mt-1">
            <label className="font-bold text-xl text-red-600 px-5" hidden={orders && orders.length > 0 ? true : false}>NO Transactions Recorded</label>
            { orders && orders.map((item) => (
                <div className="flex flex-row flex-none items-center justify-start overflow-hidden rounded-md shadow" key={item.order_name}>
                    <div className="flex flex-col px-5 py-5">
                        <div className="font-bold">Order Number: <label className="text-sm font-normal">{item.order_name}</label></div>
                        <div className="font-bold">Transaction Date: <label className="text-sm font-normal">{item.order_created_on.slice(0,10)}</label></div>
                        <div className="font-bold">Shipping Address: <label className="text-sm font-normal">{item.order_city}, {item.order_address}</label></div>
                        <div className="font-bold">Status: <label className="text-sm font-normal">{item.order_status}</label></div>
                    </div>
                </div> 
            ))}
            <div className="flex flex-row items-center justify-start mt-1">
                <label>Pages:</label>
                {
                    pages && pages.map((page) => (
                        <div key={page}>
                            <button className="focus:outline-none mx-3 hover:underline focus:underline" onClick={()=> onPageChange(page)}>{page+1}</button>
                        </div>
                    ))  
                }
            </div>
        </div>
    )
}
