import React, { useState, useContext, useEffect, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Themebutton from "../layout/Themebutton";
import { Typography } from "@material-ui/core";
import rezz from "../../assets/rezz.png";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Alert from "../layout/Alert";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const Register = props => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists") {
      setAlert({ msg: error, type: "error" });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;

  const classes = useStyles();

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert({ msg: "Please enter all fields", type: "warning" });
    } else if (password !== password2) {
      setAlert({ msg: "Passwords do not match", type: "error" });
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
      <ThemeProvider theme={theme}>
        {/* <Typography
        align="center"
        variant="h3"
        style={{ color: "white" }}
        gutterBottom
      >
        Create Account!
      </Typography> */}
        <form onSubmit={onSubmit} className={classes.container} noValidate>
          <img
            src={rezz}
            className={classes.welcomeImage}
            alt="welcome page"
          ></img>

          <div className={classes.formBody}>
            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              value={name}
              // onChange={handleChange("name")}
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
              minLength="6"
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
              minLength="6"
              autoComplete="current-password"
              margin="normal"
              variant="filled"
              fullWidth
              required
              onChange={onChange}
            />
            <div className={classes.fromButtonGroup}>
              <Themebutton content="SIGN UP" type="submit" value="Register" />
            </div>
          </div>
          <Alert />
        </form>
      </ThemeProvider>
    </Fragment>
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
    // backgroundColor: "#f3f3f3",
    // "&$focused": {
    //   backgroundColor: "#f0f0f0"
    // }
  },
  fromButtonGroup: {
    marginTop: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

export default Register;
