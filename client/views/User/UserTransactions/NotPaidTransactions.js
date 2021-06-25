import React from 'react'
import TransactionItem from './TransactionItem'
import { Disclosure } from '@headlessui/react'

function NotPaidTransactions(props) {
    const { transactionsList } = props
    const onPay = () => {
        window.location.assign('/mini-project/checkout')
    }
    return (
        <div className="mt-1">
            <label className="font-bold text-xl text-red-600 px-5" hidden={transactionsList && transactionsList ? true : false}>NO Transactions Recorded</label>
                <div className="flex flex-row flex-none items-center justify-start overflow-hidden rounded-md shadow" style={transactionsList && transactionsList.order_name ? {visibility:'visible'} : {visibility:'hidden'}}>
                    <div className="flex flex-col px-5 py-5" >
                        <div className="font-bold" >Order Number: <label className="text-sm font-normal">{transactionsList && transactionsList.order_name}</label></div>
                        <div className="font-bold" >Transaction Date: <label className="text-sm font-normal">{transactionsList && transactionsList.order_created_on.slice(0,10)}</label></div>
                        <div className="font-bold" >Shipping Address: <label className="text-sm font-normal">{transactionsList && transactionsList.order_city}, {transactionsList && transactionsList.order_address}</label></div>
                        <div className="font-bold" >Status: <label className="text-sm font-normal">{transactionsList && transactionsList.order_status}</label></div>
                        <div className="flex flex-row items-center justify-end">
                            <button className="px-3 py-1 text-xs bg-green-400 mr-1 rounded-md text-white focus:outline-none" hidden={transactionsList && transactionsList.order_status === 'OPEN' ? false : true} onClick={onPay}>Pay</button>
                        </div>
                        <Disclosure>
                                <>
                                    <Disclosure.Button className="mt-3 focus:outline-none text-left hover:bg-gray-300 rounded-md px-1 font-bold">
                                        Items Ordered
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <div className="mt-1 px-1">
                                            <TransactionItem orderNum={transactionsList && transactionsList.order_name} />
                                        </div>
                                    </Disclosure.Panel> 
                                </>
                        </Disclosure>
                    </div>
                </div> 
        </div>
    )
}

export default NotPaidTransactions
