import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function AdminHome() {
    //const data = useSelector((state)=> state.auth)
    const history = useHistory()
    useEffect(() => {
        if (localStorage.getItem('data')) {
            if (JSON.parse(localStorage.getItem('data').user_type !== 'ADMIN')) {
                history.push('/mini-project/not-authorized')
            }
        }
        else {
            history.push('/mini-project/auth-failed')
        }
    }, [])
    return (
        <div>
            <h1>HELLO THIS IS ADMIN ONLY PAGE</h1>
        </div>
    )
}
