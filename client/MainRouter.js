import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import { useSelector } from 'react-redux'

//Public Page
import LandingPage from './views/LandingPage'
import SignUp from './views/User/SignUp'
import ProfileSignUp from './views/User/ProfileSignUp'
import SignIn from './views/User/SignIn'

//User Page
import Home from './views/Store/Home'
import MovieDetail from './views/Movie/MovieDetails'
import Cart from './views/Store/Cart/Cart'
import ProfilePage from './views/User/ProfilePage'
import CheckoutPage from './views/Checkout/Checkout'
import SearchMovie from './views/Movie/SearchMovie'

//Redirect Route
import RedirectStore from './views/Store/RedirectStore'
import RedirectCheckout from './views/Store/RedirectCheckout'

//Checker Page

import AuthFailPage from './AuthFailPage'
import SignupSuccessPage from './views/User/SignupSuccessPage'
import SignupFailPage from './views/User/SignupFailPage'
import PrevilegeCheckPage from './PrevilegeCheckPage'

//Admin Page
import AdminHome from './views/Admin/AdminHome'
import AdminMovies from './views/Admin/Movies/AdminMovies'
import AdminCast from './views/Admin/Casts/AdminCasts'


//Test Page
import KaroselTest from './KaroselTest'
//import AdminMovieDetails from './views/Admin/Movies/AdminMovieDetails'

//import PrivateRoute from './Auth/PrivateRoute'

//Admin Layout
import MainLayout from './views/Admin/Components/AdminMainLayout'


const MainRouter = () => {
  const auth = typeof window !== "undefined" && useSelector((state) => state.auth)

  //Login Checker Function
  const isLogin = (Component) => {
    if (auth.isLoggedIn) {
      return <Component />
    }
    else {
      return <Redirect to="/mini-project/auth-failed" />
    }
  }

  //Admin Checker Function
  const isAdmin = (Component) => {
    //typeof window != "undefined" && console.log(typeof auth.userType)
    if (auth.userType === "ADMIN") {
        return <Component />
      }
      else return <Redirect to="/mini-project/not-authorized"/>
  }
  
  return (
  <>
    <Switch>
      {/* Public Route */}
      <Route exact path ='/mini-project' component={LandingPage}/>
      <Route exact path = '/mini-project/signup' component={SignUp}/>
      <Route exact path ='/mini-project/signup/profile' component={ProfileSignUp}/>
      <Route exact path = '/mini-project/signin' component={SignIn}/>
      
      {/* User Route */}
      <Route exact path ='/mini-project/store/home' render={()=> typeof window != 'undefined' && isLogin(Home)}/>
      <Route exact path = '/mini-project/store' render={()=> typeof window != 'undefined' && isLogin(RedirectStore)}/>
      <Route exact path = '/mini-project/store/movie/:movie_id' render={()=> typeof window != 'undefined' && isLogin(MovieDetail)}/>
      <Route exact path = '/mini-project/store/cart' render={()=> typeof window != 'undefined' && isLogin(Cart)}/>
      <Route exact path = '/mini-project/checkout' render={()=> typeof window != 'undefined' && isLogin(CheckoutPage)}/>
      <Route exact path = '/mini-project/user/profile/:user_id' render={()=> typeof window != 'undefined' && isLogin(ProfilePage)}/>
      <Route exact path = '/mini-project/movies/search/:params' render={()=> typeof window != 'undefined' && isLogin(SearchMovie)}/>

      {/* Redirect Route */}
      <Route exact path = '/mini-project/store' render={()=> typeof window != 'undefined' && isLogin(RedirectStore)}/>
      <Route exact path = '/mini-project/redirect/checkout' render={()=> typeof window != 'undefined' && isLogin(RedirectCheckout)}/>



      {/* Checker Page Route */}

      <Route exact path = '/mini-project/auth-failed' component={AuthFailPage}/>
      <Route exact path = '/mini-project/signup/success' component={SignupSuccessPage}/>
      <Route exact path = '/mini-project/signup/fail' component={SignupFailPage}/>
      <Route exact path = '/mini-project/not-authorized' component={PrevilegeCheckPage}/>

      {/*Test Page Route */}
      <Route exact path = '/mini-project/test' render={()=> typeof window != 'undefined' && isLogin(KaroselTest)}/>
      
      
     
      {/* Admin Page Route*/}
      <MainLayout>
      <Route exact path = '/mini-project/admin/home' render={()=> typeof window != 'undefined' && isAdmin(AdminHome)}/>
      <Route exact path = '/mini-project/admin/movies' render={()=> typeof window != 'undefined' && isAdmin(AdminMovies)}/>
      <Route exact path = '/mini-project/admin/casts' component={AdminCast}/>
      </MainLayout>

    </Switch>
  </>
  )
}

export default MainRouter