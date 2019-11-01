import React, { Fragment, useEffect } from 'react';
import {
  useEventAction,
  useEventState,
  useAuthAction,
  useAuthState
} from 'src/shared/hooks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  makeStyles,
  Theme,
  createStyles,
  CircularProgress
} from '@material-ui/core';
import EventCard from './EventCard';

const Events = () => {
  const classes = useStyles();

  // const { user } = useAuthState();
  // const { loadUser } = useAuthAction();

  // useEffect(() => {
  //   loadUser();
  // }, [loadUser]);

  const { getEvents } = useEventAction();
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const { events, filtered, eventLoading } = useEventState();
  const eventsList = filtered || events;

  return (
    <Fragment>
      {eventLoading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress color="secondary" size="3rem" />
        </div>
      ) : (
        <TransitionGroup className={classes.eventsContainer}>
          {eventsList.map(event => (
            <CSSTransition key={event._id} timeout={500} classNames="item">
              <EventCard
                _id={event._id}
                name={event.name}
                date={event.date}
                location={event.location}
                type={event.type}
                creator={event.creator}
                attendees={event.attendees}
                poster={event.poster}
                // user={user}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
    },
    eventsContainer: {
      display: 'block',
      marginTop: '50px',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }
  })
);

export default Events;
