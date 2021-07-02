import React from 'react'
import { Redirect } from 'react-router-dom'

export default function RedirectCheckout() {
    //window.location.assign('/mini-project/checkout')
    return (
        <div>
            <Redirect to="/checkout"/>
        </div>
    )
}
