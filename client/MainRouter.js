import React from 'react'
import { Switch, Route, useHistory, Redirect } from "react-router-dom"
import { useSelector } from 'react-redux'
import Home from './views/Home/Home'
import LandingPage from './views/LandingPage'
import SignUp from './views/Auth/SignUp'
import Profile from './views/Auth/Profile'
import SignIn from './views/Auth/SignIn'
import LoginCheckPage from './views/LoginCheckPage'


const MainRouter = () => {
  //const history = useHistory()
  const data = useSelector((state) => state.user)
  const dataCheck = (Component) => {
    //console.log(Object.keys(data.user).length)
    //return <Component />
    if (Object.keys(data.user).length !== 0) {
      if (data.user.user_email && data.user.user_password) {
        return <Component />
      }
    }
    else {
      return <Redirect to="/mini-project/" />
    }
  }

  const loginCheck = (Component) => {
    if (localStorage.getItem('data')) {
      return <Component />
    }
    else {
      return <Redirect to='/mini-project/login-block'/>
    }
  }
  return (
  <>
    <Switch>
      <Route exact path ='/mini-project/' component={LandingPage}/>
      <Route exact path ='/mini-project/home' render={()=> loginCheck(Home)}/>
      <Route exact path = '/mini-project/signup' component={SignUp}/>
      <Route exact path ='/mini-project/profile' render={() => dataCheck(Profile)}/>
      <Route exact path = '/mini-project/signin' component={SignIn}/>
      <Route exact path = '/mini-project/login-block' component={LoginCheckPage}/>
    </Switch>
  </>)
}

export default MainRouter