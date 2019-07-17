import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Typography
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import EventFilter from "../events/EventFilter";
import { fade, makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/auth/authContext";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const Navbar = ({ title, icon }) => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="Open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Party Animal
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
              <MenuItem onClick={handleClose}>My account</MenuItem>
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
    backgroundColor: "transparent !important"
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
    display: "none",
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

export default Navbar;
