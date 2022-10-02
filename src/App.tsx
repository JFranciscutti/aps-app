import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import PasswordRecovery from './components/PasswordRecovery';
import SignUp from './components/SignUp';
import { Routes } from './utils/Routes';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {/* TODO: Si está logueado, va al home. Sino, al login */}
            <Redirect to={Routes.LOGIN} />
          </Route>

          <Route exact path={Routes.LOGIN} component={Login} />

          <Route exact path={Routes.SIGNUP} component={SignUp} />

          <Route exact path={Routes.PASSWORD_RECOVERY} component={PasswordRecovery} />

          <Route exact path={Routes.HOME} component={Home} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
