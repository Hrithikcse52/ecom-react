import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from ".";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticate() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default PrivateRoutes;
