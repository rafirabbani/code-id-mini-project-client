import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Disclosure } from '@headlessui/react'
import OrderActions from '../../../Actions/OrderAction'
import TransactionItem from './TransactionItem'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'

export default function AllTransactions(props) {
    console.log(props)
    const [orders, setOrders] = useState([])
    const [pages, setPages] = useState([])
    //const [open, setOpen] = useState(true)
    const [pageChange, setPageChange] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const dispatch = useDispatch()

    const onPay = () => {
        window.location.assign('/mini-project/checkout')
    }

    useEffect(() => {
        if (props.transactionsList) {
                const { orders, totalPages } = props.transactionsList
                setOrders(orders)
                setPages([...Array(totalPages).keys()])
                setPageChange(false)
        }
    }, [props, pageChange])

    const onPageChange = (page) => {
        dispatch(OrderActions.getAllOrderForUser(props.userID, page))
        setPageChange(true)
    }

    return (
        <div className="mt-1">
            <label className="font-bold text-xl text-red-600 px-5" hidden={orders && orders.length > 0 ? true : false}>NO Transactions Recorded</label>
            { orders && orders.map((item) => (
                <div className="flex flex-row flex-none items-center justify-start overflow-hidden rounded-md shadow" key={item.order_name}>
                    <div  className="flex flex-col px-5 py-5">                           
                        <div className="font-bold">Order Number: <label className="text-sm font-normal">{item.order_name}</label></div>
                        <div className="font-bold">Transaction Date: <label className="text-sm font-normal">{item.order_created_on.slice(0,10)}</label></div>
                        <div className="font-bold">Shipping Address: <label className="text-sm font-normal">{item.order_city}, {item.order_address}</label></div>
                        <div className="font-bold">Status: <label className="text-sm font-normal">{item.order_status}</label></div>
                        <div className="flex flex-row items-center justify-end">
                            <button className="px-3 py-1 text-xs bg-green-400 mr-1 rounded-md text-white focus:outline-none" style={item.order_status === 'OPEN' ? {visibility: 'visible'} : {visibility: 'hidden'}} onClick={onPay}>Pay</button>
                        </div>
                        <Disclosure>
                                <>
                                    <Disclosure.Button className="mt-3 focus:outline-none text-left hover:bg-gray-400 rounded-md px-1 font-bold bg-gray-300 w-72">
                                        <div className="flex flex-row items-center justify-between"> 
                                            <label>Items Ordered</label>
                                            <ChevronDownIcon className="w-5 h-5"/>
                                        </div>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <div className="mt-1 px-1">
                                            <TransactionItem orderNum={item.order_name} totalDue={item.order_total_due} totalAmount={item.order_total_qty} />
                                        </div>
                                    </Disclosure.Panel> 
                                </>
                        </Disclosure>
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
