import { Route, Switch } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUpForm from "../pages/SignUpForm";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <SignUpForm />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
};

export default Routes;
