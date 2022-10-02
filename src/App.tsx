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

          <Route exact path={Routes.LOGIN}>
            <Login />
          </Route>

          <Route exact path={Routes.SIGNUP}>
            <SignUp />
          </Route>

          <Route exact path={Routes.PASSWORD_RECOVERY}>
            <PasswordRecovery />
          </Route>

          <Route exact path={Routes.HOME}>
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
