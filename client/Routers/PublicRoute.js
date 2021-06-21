import React from 'react';
import { Switch, Route } from 'react-router-dom'
import LandingPage from '../views/LandingPage'
import SignUp from '../views/User/SignUp'
import ProfileSignUp from '../views/User/ProfileSignUp'
import SignIn from '../views/User/SignIn'

const PublicRoute = () => {
    return (
        <Switch>
            <Route exact path ='/mini-project' component={LandingPage}/>
            <Route exact path = '/mini-project/signup' component={SignUp}/>
            <Route exact path ='/mini-project/signup/profile' component={ProfileSignUp}/>
            <Route exact path = '/mini-project/signin' component={SignIn}/>
        </Switch>
    )
}

export default PublicRoute