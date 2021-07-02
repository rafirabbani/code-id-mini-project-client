import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

//Test Page
import KaroselTest from './KaroselTest'

//Blocker Page
import AuthFailPage from './AuthFailPage'
import SignupSuccessPage from './views/User/SignupSuccessPage'
import SignupFailPage from './views/User/SignupFailPage'


//Public Page
import LandingPage from './views/LandingPage'
import SignUp from './views/User/SignUp'
import ProfileSignUp from './views/User/ProfileSignUp'
import SignIn from './views/User/SignIn'

//User Only Page
import StoreHomePage from './views/Store/Home'
import CartPage from './views/Store/Cart/Cart'
import CheckoutPage from './views/Checkout/Checkout'
import RedirectStore from './views/Store/RedirectStore'
import RedirectCheckout from './views/Store/RedirectCheckout'
import SearchMoviePage from './views/Movie/SearchMovie'
import MovieDetailPage from './views/Movie/MovieDetails'
import ProfilePage from './views/User/ProfilePage'

//Admin Only Page
import AdminHomePage from './views/Admin/AdminHome'
import AdminMoviesPage from './views/Admin/Movies/AdminMovies'
import AdminCastsPage from './views/Admin/Casts/AdminCasts'
import PrevilegeCheckPage from './PrevilegeCheckPage'


//404 Page
import NotFoundPage from './NotFoundPage'

const MainRouter = () => {

  //Get Auth State
  const auth = typeof window !== "undefined" && useSelector((state) => state.auth)
    
  //Login Checker Function
  const isLogin = (Component) => {
      if (auth.isLoggedIn) {
          return <Component />
      }
      else {
      return <Redirect to="/auth-failed"/>
      }
  }

  const isAdmin = (Component) => {
    if (auth.userType === "ADMIN") {
        return <Component />
    }
    else return <Redirect to="/not-authorized"/>
  }
  
  
  return (
    <>
      <Switch>
        {/* Public Route */}
        <Route exact path ='/' component={LandingPage}/>
        <Route exact path = '/signup' component={SignUp}/>
        <Route exact path ='/signup/profile' component={ProfileSignUp}/>
        <Route exact path = '/signin' component={SignIn}/>

        {/* User Only Route */}
        <Route exact path ='/store/home' render={()=> typeof window != 'undefined' && isLogin(StoreHomePage)}/>
        <Route exact path = '/store/movie/:movie_id' render={()=> typeof window != 'undefined' && isLogin(MovieDetailPage)}/>
        <Route exact path = '/store/cart' render={()=> typeof window != 'undefined' && isLogin(CartPage)}/>
        <Route exact path = '/checkout' render={()=> typeof window != 'undefined' && isLogin(CheckoutPage)}/>
        <Route exact path = '/user/profile' render={()=> typeof window != 'undefined' && isLogin(ProfilePage)}/>
        <Route exact path = '/movies/search/:params' render={()=> typeof window != 'undefined' && isLogin(SearchMoviePage)}/>
        <Route exact path = '/store' render={()=> typeof window != 'undefined' && isLogin(RedirectStore)}/>
        <Route exact path = '/redirect/checkout' render={()=> typeof window != 'undefined' && isLogin(RedirectCheckout)}/>

        {/* Blocking Page */}
        <Route exact path = '/auth-failed' component={AuthFailPage}/>
        <Route exact path = '/signup/success' component={SignupSuccessPage}/>
        <Route exact path = '/signup/fail' component={SignupFailPage}/>
        <Route exact path = '/not-authorized' component={PrevilegeCheckPage}/>

        {/* Admin Only Route */}
        <Route exact path = '/admin/home' render={()=> typeof window != 'undefined' && isAdmin(AdminHomePage)}/>
        <Route exact path = '/admin/movies' render={()=> typeof window != 'undefined' && isAdmin(AdminMoviesPage)}/>
        <Route exact path = '/admin/casts' render={()=> typeof window != 'undefined' && isAdmin(AdminCastsPage)}/>

        {/* Test Route */}
        <Route exact path = "/test" component={KaroselTest}/>

        {/* Not Found Route */}
        <Route exact path = '/404' component={NotFoundPage}/>
        <Redirect to="/404"/>

    </Switch>
    </>
  )
}

export default MainRouter