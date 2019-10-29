import React, { Fragment, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  useEventAction,
  useEventState,
  useAuthState,
  useAuthAction
} from 'src/shared/hooks';
import Events from '../events/Events';
import EventForm from '../events/EventForm';
import { Alert } from 'src/shared/components';

import {
  Typography,
  Fab,
  Dialog,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const Home = () => {
  const classes = useStyles();

  const { editing } = useEventState();
  const { setEditing } = useEventAction();

  const { isAuthenticated } = useAuthState();
  const { loadUser } = useAuthAction();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className={classes.container}>
      <Alert />
      <Fab
        aria-label='Add'
        style={{
          color: 'white',
          zIndex: 100,
          position: 'fixed',
          bottom: '3rem',
          right: '3rem',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        }}
        onClick={() => setEditing(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={editing}
        onBackdropClick={() => setEditing(false)}
        aria-labelledby='simple-dialog-title'
      >
        {isAuthenticated ? (
          <EventForm />
        ) : (
          <Typography
            align='center'
            style={{ color: 'black', padding: '5rem' }}
            gutterBottom
          >
            You have to login to publish the content.
            <Link to='/login'>SIGN IN</Link>
          </Typography>
        )}
      </Dialog>
      <Events />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.background.default,
      minHeight: '100vh'
    }
  })
);

export default Home;
