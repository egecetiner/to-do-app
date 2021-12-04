import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Menu from "./core/Menu";
import User from "./user/User"

const MainRouter = () => (
  <div >
    <Menu />
    <Switch>
      <Route exact path="/" component={Signup} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/user/:userId" component={User} />
    </Switch>
  </div>
);

export default MainRouter;
