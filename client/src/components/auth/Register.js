import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Themebutton from "../button/Themebutton";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

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
    console.log("register");
    if (name === "" || email === "" || password === "") {
      console.log("register1");
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      console.log("register2");
      setAlert("Passwords do not match", "danger");
    } else {
      console.log("register3");
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className={classes.container} noValidate>
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
        id="standard-password-input"
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
      <Themebutton content="Register" type="submit" value="Register" />
    </form>
  );
};

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
    backgroundColor: "#f3f3f3",
    "&$focused": {
      backgroundColor: "#f0f0f0"
    }
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

export default Register;
