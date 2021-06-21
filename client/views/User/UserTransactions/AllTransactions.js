import React from 'react'

export default function AllTransactions(props) {
    console.log(props)
    const { transactionsList } = props
    const onPay = () => {
        window.location.assign('/mini-project/checkout')
    }

    return (
        <div className="mt-1">
            <label className="font-bold text-xl text-red-600 px-5" hidden={transactionsList && transactionsList.length > 0 ? true : false}>NO Transactions Recorded</label>
            { transactionsList && transactionsList.map((item) => (
                <div className="flex flex-row flex-none items-center justify-start overflow-hidden rounded-md shadow" key={item.order_name}>
                    <div className="flex flex-col px-5 py-5">
                        <div className="font-bold">Order Number: <label className="text-sm font-normal">{item.order_name}</label></div>
                        <div className="font-bold">Transaction Date: <label className="text-sm font-normal">{item.order_created_on.slice(0,10)}</label></div>
                        <div className="font-bold">Shipping Address: <label className="text-sm font-normal">{item.order_city}, {item.order_address}</label></div>
                        <div className="font-bold">Status: <label className="text-sm font-normal">{item.order_status}</label></div>
                        <div className="flex flex-row items-center justify-end">
                            <button className="px-3 py-1 text-xs bg-green-400 mr-1 rounded-md text-white focus:outline-none" hidden={item.order_status === 'OPEN' ? false : true} onClick={onPay}>Pay</button>
                        </div>
                    </div>
                </div> 
            ))}
        </div>
    )
}
