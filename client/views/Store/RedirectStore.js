import React from 'react'
import { Redirect } from 'react-router-dom'

export default function RedirectStore() {
    return (
        <div>
            <Redirect to="/store/home"/>
        </div>
    )
}
