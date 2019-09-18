import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import EventFilter from "../events/EventFilter";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/auth/authContext";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const Navbar = props => {
  const { title, icon } = props;
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // useEffect(() => {
  //   getEvents();
  //   // eslint-disable-next-line
  // }, [user]);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    props.history.push("/");
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.title} variant="h6" noWrap>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Party Animal Beta 1.0
          </Link>
        </Typography>
        <EventFilter />

        {isAuthenticated ? (
          <div>
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                {" "}
                <Link style={{ color: "black" }} to="/dashboard">
                  Dashboard
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link className={classes.link} to="/login">
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent !important",
    boxShadow: "none"
  },

  link: {
    textDecoration: "none",
    color: "inherit"
  },

  toolBar: {
    background: "transparent"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
}));

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: "Party Animal",
  icon: "fas fa-id-card-alt"
};

export default withRouter(Navbar);
