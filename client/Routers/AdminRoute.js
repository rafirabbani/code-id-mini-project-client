import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
import { useSelector } from 'react-redux'
import MainLayout from '../views/Admin/Components/AdminMainLayout'
import AdminHomePage from '../views/Admin/AdminHome'
import AdminMoviesPage from '../views/Admin/Movies/AdminMovies'
import AdminCastsPage from '../views/Admin/Casts/AdminCasts'

const AdminRoute = () => {

    //Get Auth state
    const auth = typeof window !== "undefined" && useSelector((state) => state.auth)

    //Admin Checker Function
    const isAdmin = (Component) => {
        //typeof window != "undefined" && console.log(typeof auth.userType)
        if (auth.userType === "ADMIN") {
            return <Component />
        }
        else return <Redirect to="/mini-project/not-authorized"/>
    }

    return (
        <Switch>
            {/* Admin Only Page */}
                <Route exact path = '/mini-project/admin/home' render={()=> typeof window != 'undefined' && isAdmin(AdminHomePage)}/>
                <Route exact path = '/mini-project/admin/movies' render={()=> typeof window != 'undefined' && isAdmin(AdminMoviesPage)}/>
                <Route exact path = '/mini-project/admin/casts' render={()=> typeof window != 'undefined' && isAdmin(AdminCastsPage)}/>
        </Switch>
    )
}

export default AdminRoute