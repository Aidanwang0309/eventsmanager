import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AlertStore, AuthStore, EventStore } from 'src/context';
import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import { Login, Register } from './components/auth';

import { ProtectedRoute, setAuthToken } from 'src/shared/utils';
import { ThemeProvider } from '@material-ui/styles';
import Theme from './shared/styles/theme';
import { EmotionThemeProvider } from 'src/shared/hooks';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const LoginContainer = () => (
  <Fragment>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Fragment>
);

const DefaultContainer = () => (
  <Fragment>
    <Navbar />
    <Route exact path="/" component={Home} />
    <Route exact path="/dashboard" component={Dashboard} />
  </Fragment>
);

const ProtectedContainer = () => (
  <Fragment>
    <Navbar />
    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
  </Fragment>
);

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <EmotionThemeProvider>
        <AuthStore>
          <EventStore>
            <AlertStore>
              <Router>
                <div className="container">
                  <Switch>
                    <Route exact path="/login" component={LoginContainer} />
                    <Route exact path="/register" component={LoginContainer} />
                    <Route
                      exact
                      path="/dashboard"
                      component={ProtectedContainer}
                    />
                    <Route component={DefaultContainer} />
                  </Switch>
                </div>
              </Router>
            </AlertStore>
          </EventStore>
        </AuthStore>
      </EmotionThemeProvider>
    </ThemeProvider>
  );
};

export default App;
