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
import Alert from "../layout/Alert";
import rezz from "../../assets/rezz.png";

const Login = props => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated, loadUser } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    loadUser();

    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert({ msg: error, type: "error" });
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
      setAlert({ msg: "Please enter all fields", type: "warning" });
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Alert />
      {/* <Typography
        align="center"
        variant="h3"
        style={{ color: "white" }}
        gutterBottom
      >
        Welcome Back
      </Typography> */}
      <form onSubmit={onSubmit} className={classes.container} noValidate>
        <img
          src={rezz}
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
            minLength="6"
            autoComplete="current-password"
            margin="normal"
            variant="filled"
            fullWidth
            required
            onChange={onChange}
          />
          <div className={classes.fromButtonGroup}>
            <Themebutton
              className={classes.button}
              content="SIGN IN"
              type="submit"
              value="Register"
            />
            <Typography className={classes.typography}>
              No account ?
              <Link className={classes.link} to="/register">
                {" "}
                Register Here{" "}
              </Link>
            </Typography>
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
};

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        color: "rgba(61, 69, 89, 0.4)",
        "&$focused": {
          color: "rgba(255, 255, 255, 0.63)"
        }
      }
    },

    MuiFilledInput: {
      root: {
        color: "#616161",
        backgroundColor: "transparent",

        "&:hover": {
          backgroundColor: "transparent"
        },
        "&:focus": {
          backgroundColor: "transparent"
        }
      },
      underline: {
        borderBottom: "1px solid rgba(255, 255, 255, 0.63)",

        "&::after": {
          borderBottom: "2px solid rgba(255, 255, 255, 0.63)"
        }
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    width: "100%",
    height: "70%",
    padding: "6rem 1rem 1rem 1rem",
    margin: "0 auto",
    flexDirection: "row",

    [theme.breakpoints.up("sm")]: {},

    [theme.breakpoints.up("md")]: {
      width: "60%"
    }
  },
  welcomeImage: {
    display: "none",
    flex: 1,
    borderRadius: "20px 0 0 20px",
    boxShadow: "0px 0px 4px black, -1px 6px 12px #f9b4da9e, 0 0 5px #674e53",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  formBody: {
    borderRadius: "0 20px 20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    padding: "3rem",
    boxShadow: "0px 0px 4px #109645, -1px 6px 12px #44ffdd9e, 0 0 5px #3d4559"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },

  typography: {
    color: "#b3b2b2",
    margin: "20px",
    textAlign: "center"
  },

  link: {
    textDecoration: "none",
    color: "#ff8383c2"
  },

  fromButtonGroup: {
    marginTop: "6rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default Login;
