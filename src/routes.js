import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard, Todo } from "./containers";
export default () => (
  <Switch>
    <Route
      exact
      path={`/`}
      component={Dashboard}
    />
    <Route
      path={`/bucket/todo`}
      component={Todo}
    />
  </Switch>
);
