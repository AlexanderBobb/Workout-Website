import {
	Route,
    Redirect
  } from "react-router-dom";

export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    if( !appProps.isAuthenticated )
      console.log("AuthenticatedRoute", appProps.isAuthenticated, C);
    return (
      <Route
        {...rest}
        render={props =>
          appProps.isAuthenticated
            ? <C {...props} {...appProps} />
            : <Redirect
                to={`/login?redirect=${props.location.pathname}${props.location.search}`}
              />}
      />
    );
  }