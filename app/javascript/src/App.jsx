import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// import Login from "components/Authentication/Login";
// import SignUp from "components/Authentication/SignUp";
import CreateTask from "components/Tasks/CreateTask";
// import EditTask from "components/Tasks/EditTask";
import Dashboard from "components/Dashboard";
import PageLoader from "components/PageLoader";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        {/* <Route exact path="/tasks/:id/edit" component={EditTask} /> */}
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/dashboard" component={Dashboard} />
        {/* <Route exact path="/sign-up" component={SignUp} /> */}
        {/* <Route exact path="/" component={Login} /> */}
      </Switch>
    </Router>
  );
};

export default App;
