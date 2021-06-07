import React from 'react'
import { Redirect } from 'react-router-dom'

export default function Auth(Component) {
    console.log(typeof window)
    if (typeof window !== 'undefined'){
        return (
            <div>
                <Component/>
            </div>
        )
    }
    else {
        return (
            <div>
                <Redirect to="/mini-project/login-block"/>
            </div>
        )
    }
}
