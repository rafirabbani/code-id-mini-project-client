import React from 'react';
import { Switch, Route } from 'react-router-dom'
import AuthFailPage from '../AuthFailPage'
import SignupSuccessPage from '../views/User/SignupSuccessPage'
import SignupFailPage from '../views/User/SignupFailPage'
import PrevilegeCheckPage from '../PrevilegeCheckPage'

const CheckerPageRouter = () => {
    return (
        <Switch>
            <Route exact path = '/mini-project/auth-failed' component={AuthFailPage}/>
            <Route exact path = '/mini-project/signup/success' component={SignupSuccessPage}/>
            <Route exact path = '/mini-project/signup/fail' component={SignupFailPage}/>
            <Route exact path = '/mini-project/not-authorized' component={PrevilegeCheckPage}/>
        </Switch>
    )
}

export default CheckerPageRouter