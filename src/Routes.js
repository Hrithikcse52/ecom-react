import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import Profile from "./user/Profile";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";

const Routes = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/app" exact component={App} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoutes
            path="/user/dashboard"
            exact
            component={UserDashBoard}
          />
          <AdminRoutes
            path="/admin/dashboard"
            exact
            component={AdminDashBoard}
          />
          <PrivateRoutes path="/user/profile" exact component={Profile} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
// export default Route
