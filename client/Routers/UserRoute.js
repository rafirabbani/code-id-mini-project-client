import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
import { useSelector } from 'react-redux'
import HomePage from '../views/Store/Home'
import MovieDetailPage from '../views/Movie/MovieDetails'
import CartPage from '../views/Store/Cart/Cart'
import CheckoutPage from '../views/Checkout/Checkout'
import ProfilePage from '../views/User/ProfilePage'
import SearchMoviePage from '../views/Movie/SearchMovie'
import RedirectStore from '../views/Store/RedirectStore'
import RedirectCheckout from '../views/Store/RedirectCheckout'

const UserRoute = () => {

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

    return (
        <Switch>
            {/* User Only Page */}
            <Route exact path ='/mini-project/store/home' render={()=> typeof window != 'undefined' && isLogin(HomePage)}/>
            <Route exact path = '/mini-project/store/movie/:movie_id' render={()=> typeof window != 'undefined' && isLogin(MovieDetailPage)}/>
            <Route exact path = '/mini-project/store/cart' render={()=> typeof window != 'undefined' && isLogin(CartPage)}/>
            <Route exact path = '/mini-project/checkout' render={()=> typeof window != 'undefined' && isLogin(CheckoutPage)}/>
            <Route exact path = '/mini-project/user/profile/:user_id' render={()=> typeof window != 'undefined' && isLogin(ProfilePage)}/>
            <Route exact path = '/mini-project/movies/search/:params' render={()=> typeof window != 'undefined' && isLogin(SearchMoviePage)}/>
            <Route exact path = '/mini-project/store' render={()=> typeof window != 'undefined' && isLogin(RedirectStore)}/>
            <Route exact path = '/mini-project/redirect/checkout' render={()=> typeof window != 'undefined' && isLogin(RedirectCheckout)}/>
        </Switch>
    )
}

export default UserRoute