import {
	Route,
    Redirect
  } from "react-router-dom";

export default function UnauthenticatedRoute({ component: C, appProps, ...rest }) {    
    const isAuthenticated = appProps.isAuthenticated;

    if( !isAuthenticated )
        console.log("UnauthenticatedRoute", isAuthenticated, C);

    return (
      <Route
        {...rest}
        render={props =>
            isAuthenticated === false
            ? <C {...props} {...appProps} />
            : <Redirect to="/" />}
      />
    );
  }