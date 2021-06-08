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
//import PrivateRoute from './Auth/PrivateRoute'
import PrevilegeCheckPage from './PrevilegeCheckPage'
import { useSelector } from 'react-redux'


const MainRouter = () => {
  const auth = typeof window !== "undefined" && useSelector((state) => state.auth)
  const isLogin = (Component) => {
    if (auth.isLoggedIn) {
      return <Component />
    }
    else {
      return <Redirect to="/mini-project/auth-failed" />
    }
  }

  const isAdmin = (Component) => {
    if (auth.isLoggedIn) {
      if (auth.userType === "ADMIN") {
        return <Component />
      }
      else return <Redirect to="/mini-project/not-authorized"/>
    } else return <Redirect to ="/mini-project/auth-failed"/>
  }
  
  return (
  <>
    <Switch>
      <Route exact path ='/mini-project' component={LandingPage}/>
      <Route exact path ='/mini-project/store/home' render={()=> typeof window != 'undefined' && isLogin(Home)}/>
      <Route exact path = '/mini-project/store' render={()=> typeof window != 'undefined' && isLogin(RedirectStore)}/>
      <Route exact path = '/mini-project/signup' component={SignUp}/>
      <Route exact path ='/mini-project/signup/profile' component={ProfileSignUp}/>
      <Route exact path = '/mini-project/signin' component={SignIn}/>
      <Route exact path = '/mini-project/auth-failed' component={AuthFailPage}/>
      <Route exact path = '/mini-project/signup/success' component={SignupSuccessPage}/>
      <Route exact path = '/mini-project/signup/fail' component={SignupFailPage}/>
      {/* <Route exact path = '/mini-project/not-authorized' component={PrevilegeCheckPage}/> */}
      <Route exact path = '/mini-project/admin/home' render={()=> typeof window != 'undefined' && isAdmin(AdminHome)}/>
      <Route exact path = '/mini-project/store/movie/:movie_id' component={MovieDetail}/>
      <Route exact path = '/mini-project/not-authorized' component={PrevilegeCheckPage}/>
      <Route exact path = '/mini-project/test' render={()=> typeof window != 'undefined' && isLogin(KaroselTest)}/>
    </Switch>
  </>
  )
}

export default MainRouter