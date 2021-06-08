import Auth from './AuthHelper'
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/mini-project/auth-failed",
            state: { from: props.location.state },
            search: `?redirect=${props.location.pathname}`,
          }}
        />
      )
    }
  />
);

export default PrivateRoute;