import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUpForm from "../pages/SignUpForm";

const Routes = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@KenzieHub:token"));

    if (token) {
      return setAuth(true);
    }
  }, [auth]);

  return (
    <Switch>
      <Route exact path="/">
        <Home auth={auth} />
      </Route>
      <Route exact path="/signup">
        <SignUpForm auth={auth} />
      </Route>
      <Route exact path="/login">
        <Login auth={auth} setAuth={setAuth} />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard auth={auth} setAuth={setAuth} />
      </Route>
    </Switch>
  );
};

export default Routes;
