import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import UserActions from '../../Actions/UserActions'
import MaleIcon from '../../assets/images/male-icon.png'
import FemaleIcon from '../../assets/images/femenine.png'
import QueerIcon from '../../assets/images/question-mark.png'

export default function ProfilePage() {
    const dispatch = useDispatch()
    const { user_id } = useParams()
    const { auth, user } = useSelector((state) => state)
    const { userInfo } = user
    useEffect(() => {
        dispatch(UserActions.findUserById(user_id))
    }, [])

    return (
        <div>
            <Header/>
            <div className="mt-20 px-10 py-5 mx-20 flex flex-row items-center justify-between ">
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
                <div>Profile</div>
            </div>
        </div>
    )
}
