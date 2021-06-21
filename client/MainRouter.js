import React from 'react'
import { Route, Switch } from "react-router-dom"
import NotFoundPage from './NotFoundPage'

//Test Route
import TestRoute from './Routers/TestRoute'

//CheckerPageRoute
import CheckerPageRoute from './Routers/CheckerPageRoute'

//Public Route
import PublicRoute from './Routers/PublicRoute'

//User Only Route
import UserRoute from './Routers/UserRoute'

//Admin Only Route 
import AdminRoute from './Routers/AdminRoute'

const MainRouter = () => {
  
  return (
    <>
      <Switch>
        <Route>
          <TestRoute/>
          <CheckerPageRoute/>
          <PublicRoute/>
          <UserRoute/>
          <AdminRoute/>
        </Route>
        <Route component={NotFoundPage}/>
      </Switch>
    </>
  )
}

export default MainRouter