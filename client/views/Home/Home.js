import React from 'react'

export default function Home() {
    const email = localStorage.getItem('email')
    console.log(email)
    return (
        <div>
            <h1>HOME PAGE</h1>
        </div>
    )
}
