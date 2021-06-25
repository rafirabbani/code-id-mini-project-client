import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import UserActions from '../../Actions/UserActions'
import OrderActions from '../../Actions/OrderAction'
import MaleIcon from '../../assets/images/male-icon.png'
import FemaleIcon from '../../assets/images/femenine.png'
import QueerIcon from '../../assets/images/question-mark.png'
import AllTransactions from './UserTransactions/AllTransactions'
import NotPaidTransactions from './UserTransactions/NotPaidTransactions'
import PaidTransactions from './UserTransactions/PaidTransactions'
import CancelledTransactions from './UserTransactions/CancelledTransactions'
import LoadingScreen from '../LoadingScreen'

export default function ProfilePage() {
    const [allTransactions, setAllTransactions] = useState(false)
    const [cancelledTransactions, setCancelledTransactions] = useState(false)
    const [notPaidTransactions, setNotPaidTransactions] = useState(false)
    const [paidTransactions, setPaidTransactions] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const dispatch = useDispatch()
    const { user_id } = useParams()
    const { auth, user, order } = useSelector((state) => state)
    const { userInfo } = user
    const { allOrderUser, openOrderUser, paidOrderUser, cancelOrderUser } = order
    useEffect(() => {
        setTimeout(function(){
            dispatch(UserActions.findUserById(user_id))
            dispatch(OrderActions.getOpenOrderByUser(user_id))
            dispatch(OrderActions.getAllOrderForUser(user_id, 0))
            dispatch(OrderActions.getPaidOrderForUser(user_id, 0))
            dispatch(OrderActions.getCancelOrderForUser(user_id, 0))
            setPageLoading(false)
        }, 1000)        
    }, [])

    const showAllTransaction = () => {
        setAllTransactions(true)
        setCancelledTransactions(false)
        setNotPaidTransactions(false)
        setPaidTransactions(false)
    }

    const showNotPaidTransactions = () => {
        setNotPaidTransactions(true)
        setPaidTransactions(false)
        setAllTransactions(false)
        setCancelledTransactions(false)
    }

   const showPaidTransactions = () => {
        setNotPaidTransactions(false)
        setPaidTransactions(true)
        setAllTransactions(false)
        setCancelledTransactions(false)
    }

    const showCancelledTransactions = () => {
        setNotPaidTransactions(false)
        setPaidTransactions(false)
        setAllTransactions(false)
        setCancelledTransactions(true)
    
    }

    return (
        <div>
            <Header/>
            <div className="mt-20 py-5 mx-20 flex flex-row items-start justify-start">
                <div className="border-red-300 border px-5 py-5 rounded-md">
                    <div className="py-5 px-5"><img className="rounded-md" src={auth.userID && `/api/users/avatar/${auth.userID}`} alt="avatar" style={{width: '150px', height: '150px'}}/></div>
                    <div className="py-5 px-5 text-left text-lg grid grid-rows-1">
                        <label className="text-red-600">Name: {userInfo && userInfo.user_name}</label>
                        <label>Email: {userInfo && userInfo.user_email}</label>
                        <label>Birthdate: {userInfo && userInfo.user_birthdate}</label>
                        <div className="mt-1 flex flex-row items-center justify-between flex-wrap">
                            <div hidden={userInfo && userInfo.user_gender === 'Male' ? false : true}>
                                <img src={MaleIcon} style={{width: '17px', height: '17px'}}/>
                            </div>
                            <div hidden={userInfo && userInfo.user_gender === 'Female' ? false : true}>
                                <img src={FemaleIcon} style={{width: '17px', height: '17px'}}/>
                            </div>
                            <div hidden={userInfo && !userInfo.user_gender ? false : true}>
                                <img src={QueerIcon} style={{width: '17px', height: '17px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-rows-2 px-5 rounded-md mx-5">
                    <div>
                        <div className="px-1"><label className="font-bold text-4xl">Transaction History</label></div>
                        <div className="flex flex-row text-sm mt-3 justify-start py-5">
                            <button className="bg-black px-1 py-1 rounded-lg text-white mx-3 focus:outline-none focus:bg-gray-600 active" onClick={showAllTransaction}>All Transactions</button>
                            <button className="bg-black px-1 py-1 rounded-lg text-white mx-3 focus:outline-none focus:bg-gray-600" onClick={showNotPaidTransactions}>Not Paid</button>
                            <button className="bg-black px-1 py-1 rounded-lg text-white mx-3 focus:outline-none focus:bg-gray-600" onClick={showPaidTransactions}>Paid</button>
                            <button className="bg-black px-1 py-1 rounded-lg text-white mx-3 focus:outline-none focus:bg-gray-600" onClick={showCancelledTransactions}>Cancelled</button>
                        </div>
                        {
                            allTransactions ? <AllTransactions transactionsList={allOrderUser && allOrderUser} userID={user_id}/> : null
                        }
                        {
                            notPaidTransactions ? <NotPaidTransactions transactionsList={openOrderUser && openOrderUser}/> : null
                        }
                        {
                            paidTransactions ? <PaidTransactions transactionsList={paidOrderUser && paidOrderUser} userID={user_id}/> : null
                        }
                        {
                            cancelledTransactions ? <CancelledTransactions transactionsList={cancelOrderUser && cancelOrderUser} userID={user_id}/> : null
                        }
                        {
                            pageLoading ? <LoadingScreen/> : null
                        }
                            
                    </div>
                </div> 
            </div>
        </div>
    )
}
