import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function AdminHome() {
    const data = useSelector((state)=> state.auth)
    const history = useHistory()
    useEffect(() => {
        if (!data.isLoggedIn || data.userType !== 'ADMIN') {
            history.push('/mini-project/not-authorized')
        }
    }, [data, history])
    return (
        <div>
            <h1>HELLO THIS IS ADMIN ONLY PAGE</h1>
        </div>
    )
}
