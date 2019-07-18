import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Themebutton from "../layout/Themebutton";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { Link } from "react-router-dom";

const Login = props => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;
  const classes = useStyles();

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography
        align="center"
        variant="h3"
        style={{ color: "white" }}
        gutterBottom
      >
        Welcome Back
      </Typography>
      <form onSubmit={onSubmit} className={classes.container} noValidate>
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
          minLength="6"
          autoComplete="current-password"
          margin="normal"
          variant="filled"
          fullWidth
          required
          onChange={onChange}
        />
        <Typography className={classes.typography}>
          No account ?
          <Link className={classes.link} to="/register">
            {" "}
            Register Here{" "}
          </Link>
        </Typography>
        <Themebutton content="SIGN IN" type="submit" value="Register" />
      </form>
    </ThemeProvider>
  );
};

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: "rgba(255, 255, 255, 0.63)",
        "&$focused": {
          // increase the specificity for the pseudo class
          color: "rgba(255, 255, 255, 0.63)"
        }
      }
    },

    MuiFilledInput: {
      root: {
        color: "white"
      },
      underline: {
        borderBottom: "1px solid rgba(255, 255, 255, 0.63)",

        "&::after": {
          // increase the specificity for the pseudo class
          borderBottom: "2px solid rgba(255, 255, 255, 0.63)"
        }
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    margin: "0 auto",
    alignItems: "flex-end"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "#ffffff1c",
    "&$focused": {
      backgroundColor: "# f0f0f0"
    }
  },
  typography: {
    color: "white",
    margin: "20px 20px 0px 0px"
  },

  link: {
    textDecoration: "none",
    color: "#ff8383c2"
  }
}));

export default Login;
