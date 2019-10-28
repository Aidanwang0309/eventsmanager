import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  Fragment,
  ReactElement,
  ChangeEvent,
  FormEvent
} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { AlertContext } from 'src/context';
import { useLoadUser, useAuthState, useAuthAction } from 'src/shared/hooks';
import { Alert, Button, BUTTON_VARIANTS } from 'src/shared/components';
import Rezz from 'src/assets/rezz.png';

import {
  Typography,
  TextField,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';

// Types
type LoginProps = RouteComponentProps;

type IUser = {
  email: string;
  password: string;
};

const Login = (props: LoginProps): ReactElement => {
  const authState = useAuthState();
  const { error } = authState;

  const authAction = useAuthAction();
  const { login } = authAction;

  const alertContext = useRef(useContext(AlertContext));
  const { setAlert } = alertContext.current;

  const [user, setUser] = useState<IUser>({
    email: '',
    password: ''
  });
  const { email, password } = user;

  useLoadUser({ routerProps: props, action: 'toMain' });

  useEffect(() => {
    if (error) {
      setAlert({ msg: error, type: 'error' });
    }
  }, [error, setAlert]);

  const classes = useStyles();

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    if (email === '' || password === '') {
      setAlert({ msg: 'Please enter all fields', type: 'warning' });
      return;
    }

    try {
      login({
        email,
        password
      });
    } catch (err) {
      setAlert({ msg: err, type: 'error' });
    }
  };

  return (
    <Fragment>
      <Alert />
      <form onSubmit={onSubmit} className={classes.container} noValidate>
        <img
          src={Rezz}
          className={classes.welcomeImage}
          alt="welcome page"
        ></img>

        <div className={classes.formBody}>
          <TextField
            id="standard-email-input"
            label="Email"
            className={classes.textField}
            value={email}
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="filled"
            fullWidth
            required
            onChange={onChange}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            value={password}
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            variant="filled"
            fullWidth
            required
            onChange={onChange}
          />
          <div className={classes.fromButtonGroup}>
            <Button
              variant={BUTTON_VARIANTS.DEFAULT}
              type="submit"
              onClick={() => onSubmit}
            >
              SIGN IN
            </Button>
            <Typography className={classes.typography}>
              No account ?
              <Link className={classes.link} to="/register">
                {' '}
                Register Here{' '}
              </Link>
            </Typography>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      width: '100%',
      height: '70%',
      padding: '6rem 1rem 1rem 1rem',
      margin: '0 auto',
      flexDirection: 'row',

      [theme.breakpoints.up('sm')]: {},

      [theme.breakpoints.up('md')]: {
        width: '60%'
      }
    },
    welcomeImage: {
      display: 'none',
      flex: 1,
      borderRadius: '20px 0 0 20px',
      boxShadow: '0px 0px 4px black, -1px 6px 12px #f9b4da9e, 0 0 5px #674e53',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    formBody: {
      borderRadius: '0 20px 20px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'white',
      padding: '3rem',
      boxShadow: '0px 0px 4px #109645, -1px 6px 12px #44ffdd9e, 0 0 5px #3d4559'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },

    typography: {
      color: '#b3b2b2',
      margin: '20px',
      textAlign: 'center'
    },

    link: {
      textDecoration: 'none',
      color: '#ff8383c2'
    },

    fromButtonGroup: {
      marginTop: '6rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  })
);

export default withRouter(Login);
