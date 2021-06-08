import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import Home from './views/Store/Home'
import LandingPage from './views/LandingPage'
import SignUp from './views/User/SignUp'
import ProfileSignUp from './views/User/ProfileSignUp'
import SignIn from './views/User/SignIn'
import AuthFailPage from './AuthFailPage'
import SignupSuccessPage from './views/User/SignupSuccessPage'
import SignupFailPage from './views/User/SignupFailPage'
import AdminHome from './views/Admin/AdminHome'
import MovieDetail from './views/Movie/MovieDetails'
import KaroselTest from './KaroselTest'
import RedirectStore from './views/Store/RedirectStore'
import PrivateRoute from './views/Auth/PrivateRoute'


const MainRouter = () => {
  return (
  <>
    <Switch>
      <Route exact path ='/mini-project' component={LandingPage}/>
      <Route exact path ='/mini-project/store/home' component={Home}/>
      <Route exact path = '/mini-project/store' component={RedirectStore}/>
      <Route exact path = '/mini-project/signup' component={SignUp}/>
      <Route exact path ='/mini-project/signup/profile' component={ProfileSignUp}/>
      <Route exact path = '/mini-project/signin' component={SignIn}/>
      <Route exact path = '/mini-project/auth-failed' component={AuthFailPage}/>
      <Route exact path = '/mini-project/signup/success' component={SignupSuccessPage}/>
      <Route exact path = '/mini-project/signup/fail' component={SignupFailPage}/>
      {/* <Route exact path = '/mini-project/not-authorized' component={PrevilegeCheckPage}/> */}
      <Route exact path = '/mini-project/admin/home' component={AdminHome}/>
      <Route exact path = '/mini-project/store/movie/:movie_id' component={MovieDetail}/>
      <PrivateRoute exact path = '/test' component={KaroselTest}/>
    </Switch>
  </>
  )
}

export default MainRouter