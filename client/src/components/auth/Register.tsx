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
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { AlertContext } from 'src/context';
import { useLoadUser, useAuthAction, useAuthState } from 'src/shared/hooks';
import { Alert, Button, BUTTON_VARIANTS } from 'src/shared/components';
import Rezz from '../../assets/rezz.png';

import { TextField, makeStyles, Theme, createStyles } from '@material-ui/core';

type RegisterProps = RouteComponentProps;

type IUser = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

const Register = (props: RegisterProps): ReactElement => {
  const authState = useAuthState();
  const { error } = authState;

  const authAction = useAuthAction();
  const { register } = authAction;

  const alertContext = useRef(useContext(AlertContext));
  const { setAlert } = alertContext.current;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = user;

  useLoadUser({ routerProps: props, action: 'toMain' });
  useEffect(() => {
    if (error === 'User already exists') {
      setAlert({ msg: error, type: 'error' });
    }
  }, [error, setAlert]);

  const classes = useStyles();

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert({ msg: 'Please enter all fields', type: 'warning' });
    } else if (password !== password2) {
      setAlert({ msg: 'Passwords do not match', type: 'error' });
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit} className={classes.container} noValidate>
        <img
          src={Rezz}
          className={classes.welcomeImage}
          alt="welcome page"
        ></img>

        <div className={classes.formBody}>
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={name}
            type="text"
            name="name"
            margin="normal"
            variant="filled"
            fullWidth
            required
            onChange={onChange}
          />
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
          <TextField
            id="standard-password-input2"
            label="Confirm Password"
            className={classes.textField}
            value={password2}
            type="password"
            name="password2"
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
              onClick={onSubmit}
            >
              SIGN UP
            </Button>
          </div>
        </div>
        <Alert />
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
    fromButtonGroup: {
      marginTop: '3rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  })
);

export default withRouter(Register);
