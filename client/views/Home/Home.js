import React, { useEffect, useState } from 'react'
import { useSelector }  from 'react-redux'

export default function Home() {
    const [loginCheck, setLoginCheck] = useState(false)
    useEffect(() => {
        //console.log(data.auth, data.user)
    }, [])
    return (
        <div>
            <h1>HOME PAGE</h1>
        </div>
    )
}
