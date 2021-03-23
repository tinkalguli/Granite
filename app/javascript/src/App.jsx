import React from "react";
import Dashboard from "components/Dashboard";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
