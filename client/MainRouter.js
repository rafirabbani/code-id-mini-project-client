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
      return <Redirect to="/mini-project/auth-failed"/>
      }
  }

  const isAdmin = (Component) => {
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

        {/* User Only Route */}
        <Route exact path ='/mini-project/store/home' render={()=> typeof window != 'undefined' && isLogin(StoreHomePage)}/>
        <Route exact path = '/mini-project/store/movie/:movie_id' render={()=> typeof window != 'undefined' && isLogin(MovieDetailPage)}/>
        <Route exact path = '/mini-project/store/cart' render={()=> typeof window != 'undefined' && isLogin(CartPage)}/>
        <Route exact path = '/mini-project/checkout' render={()=> typeof window != 'undefined' && isLogin(CheckoutPage)}/>
        <Route exact path = '/mini-project/user/profile' render={()=> typeof window != 'undefined' && isLogin(ProfilePage)}/>
        <Route exact path = '/mini-project/movies/search/:params' render={()=> typeof window != 'undefined' && isLogin(SearchMoviePage)}/>
        <Route exact path = '/mini-project/store' render={()=> typeof window != 'undefined' && isLogin(RedirectStore)}/>
        <Route exact path = '/mini-project/redirect/checkout' render={()=> typeof window != 'undefined' && isLogin(RedirectCheckout)}/>

        {/* Blocking Page */}
        <Route exact path = '/mini-project/auth-failed' component={AuthFailPage}/>
        <Route exact path = '/mini-project/signup/success' component={SignupSuccessPage}/>
        <Route exact path = '/mini-project/signup/fail' component={SignupFailPage}/>
        <Route exact path = '/mini-project/not-authorized' component={PrevilegeCheckPage}/>

        {/* Admin Only Route */}
        <Route exact path = '/mini-project/admin/home' render={()=> typeof window != 'undefined' && isAdmin(AdminHomePage)}/>
        <Route exact path = '/mini-project/admin/movies' render={()=> typeof window != 'undefined' && isAdmin(AdminMoviesPage)}/>
        <Route exact path = '/mini-project/admin/casts' render={()=> typeof window != 'undefined' && isAdmin(AdminCastsPage)}/>

        {/* Test Route */}
        <Route exact path = "/mini-project/test" component={KaroselTest}/>

        {/* Not Found Route */}
        <Route exact path = '/mini-project/404' component={NotFoundPage}/>
        <Redirect to="/mini-project/404"/>

    </Switch>
    </>
  )
}

export default MainRouter