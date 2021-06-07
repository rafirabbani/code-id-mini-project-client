import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import Home from './views/Store/Home'
import LandingPage from './views/LandingPage'
import SignUp from './views/Auth/SignUp'
import Profile from './views/Auth/Profile'
import SignIn from './views/Auth/SignIn'
import LoginBlockPage from './LoginBlockPage'
import SignupSuccessPage from './views/Auth/SignupSuccessPage'
import SignupFailPage from './views/Auth/SignupFailPage'
import PrevilegeCheckPage from './PrevilegeCheckPage'
import AdminHome from './views/Admin/AdminHome'
import MovieDetail from './views/Movie/MovieDetails'
import KaroselTest from './KaroselTest'
import AuthCheck from './Auth'
import RedirectStore from './views/Store/RedirectStore'


const MainRouter = () => {
  return (
  <>
    <Switch>
      <Route exact path ='/mini-project/' component={LandingPage}/>
      <Route exact path ='/mini-project/store/home' component={Home}/>
      <Route exact path = '/mini-project/store/' component={RedirectStore}/>
      <Route exact path = '/mini-project/signup' component={SignUp}/>
      <Route exact path ='/mini-project/signup/profile' component={Profile}/>
      <Route exact path = '/mini-project/signin' component={SignIn}/>
      <Route exact path = '/mini-project/login-block' component={LoginBlockPage}/>
      <Route exact path = '/mini-project/signup/success' component={SignupSuccessPage}/>
      <Route exact path = '/mini-project/signup/fail' component={SignupFailPage}/>
      <Route exact path = '/mini-project/not-authorized' component={PrevilegeCheckPage}/>
      <Route exact path = '/mini-project/admin/home' component={AdminHome}/>
      <Route exact path = '/mini-project/store/movie/:movie_id' component={MovieDetail}/>
      <Route exact path = '/mini-project/test' component={KaroselTest}/>
    </Switch>
  </>
  )
}

export default MainRouter