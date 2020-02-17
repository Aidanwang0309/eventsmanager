import React, { useEffect } from 'react';
import { useEventAction, useEventState, useAuthAction, useAuthState } from 'src/shared/hooks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { makeStyles, Theme, createStyles, CircularProgress } from '@material-ui/core';
import EventCard from './EventCard';

const Events = () => {
  const classes = useStyles();

  const { updateUser } = useAuthAction();
  const { user } = useAuthState();

  const { events, filtered, eventLoading } = useEventState();
  const { getEvents } = useEventAction();

  const eventsList = filtered || events;

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      {eventLoading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress color="secondary" size="3rem" />
        </div>
      ) : (
          <TransitionGroup className={classes.eventsContainer}>
            {eventsList.map(event => {
              const { _id, name, date, location, type, creator, attendees, poster } = event
              return (
                <CSSTransition key={_id} timeout={500} classNames="item">
                  <EventCard
                    _id={_id}
                    name={name}
                    date={date}
                    location={location}
                    type={type}
                    creator={creator}
                    attendees={attendees}
                    poster={poster}
                    user={user}
                    updateUser={updateUser}
                  />
                </CSSTransition>
              )
            }
            )}
          </TransitionGroup>
        )}
    </>
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
