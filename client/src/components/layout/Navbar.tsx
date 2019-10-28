import React, { useContext, useState, MouseEvent, ReactElement } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { useAuthAction, useAuthState, useTheme } from 'src/shared/hooks';

import EventFilter from '../events/EventFilter';
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Theme,
  Switch
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

type NavbarProps = {
  title: string;
  icon: string;
};

type NavWithRouter = NavbarProps & RouteComponentProps;

const NavBar = (props: NavWithRouter): ReactElement => {
  const classes = useStyles();
  const themeState = useTheme();
  const { title = 'Party Animal', icon = 'fas fa-id-card-alt' } = props;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const { isAuthenticated } = useAuthState();
  const { logout } = useAuthAction();

  const handleMenu = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    props.history.push('/');
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.title} variant="h6" noWrap>
          <Link to="/" className={classes.link}>
            Party Animal Beta 1.0
          </Link>
        </Typography>
        <Switch
          checked={!themeState.light}
          onChange={() => themeState.toggleTheme()}
          value="themeMode"
          color="default"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
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
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                {' '}
                <Link style={{ color: 'black' }} to="/dashboard">
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: 'transparent !important',
      boxShadow: 'none'
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.contrastText,
      '&:hover': {
        color: theme.palette.primary.contrastText,
        opacity: 0.8
      }
    },
    toolBar: {
      background: theme.palette.primary.main
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    }
  })
);

export default withRouter(NavBar);
