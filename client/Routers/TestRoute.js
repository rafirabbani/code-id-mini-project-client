import { Route, Switch } from 'react-router-dom'
import React from 'react'
import KaroselTest from '../KaroselTest'

const TestRouter = () =>{
    return (
        <>
            <Switch>
                <Route exact path = "/mini-project/test" component={KaroselTest}/>
            </Switch>
        </>
    )
}

export default TestRouter
