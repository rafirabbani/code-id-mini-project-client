import React from 'react'
import { Switch, Route} from "react-router-dom"
import Home from './views/Home/Home'
import LandingPage from './views/LandingPage'
import SignUp from './views/Auth/SignUp'

const MainRouter = () => {
  return (
  <>
    <Switch>
      <Route exact path ='/mini-project/' component={LandingPage}/>
      <Route exact path ='/mini-project/home' component={Home}/>
      <Route exact path = '/mini-project/signup' component={SignUp}/>
    </Switch>
  </>)
}

export default MainRouter