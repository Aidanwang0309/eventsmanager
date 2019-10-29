import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AlertStore, AuthStore, EventStore } from 'src/context';
import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import { Login, Register } from './components/auth';

import { setAuthToken } from 'src/shared/utils';
import { ThemeProvider, styled } from '@material-ui/styles';
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

// const ProtectedContainer = () => (
//   <Fragment>
//     <Navbar />
//     <ProtectedRoute exact path="/dashboard" component={Dashboard} />
//   </Fragment>
// );

const MyThemeComponent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  minHeight: '100vh'
}));

const App = () => {
  return (
    <EmotionThemeProvider>
      <ThemeProvider theme={Theme}>
        <AuthStore>
          <EventStore>
            <AlertStore>
              <Router>
                <MyThemeComponent>
                  <Switch>
                    <Route exact path="/login" component={LoginContainer} />
                    <Route exact path="/register" component={LoginContainer} />
                    <Route component={DefaultContainer} />
                  </Switch>
                </MyThemeComponent>
              </Router>
            </AlertStore>
          </EventStore>
        </AuthStore>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

export default App;
