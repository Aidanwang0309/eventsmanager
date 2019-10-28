import React, { Fragment, useContext, useEffect, useRef } from 'react';
import { useEventAction, useEventState } from 'src/shared/hooks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  makeStyles,
  Theme,
  createStyles,
  CircularProgress
} from '@material-ui/core';
import EventCard from './EventCard';

const Events = () => {
  const eventState = useEventState();
  const { events, filtered, eventLoading } = eventState;

  const eventAction = useEventAction();
  const { getEvents } = eventAction;

  const classes = useStyles();
  const eventsList = filtered || events;

  const getEventRef = useRef(getEvents);

  useEffect(() => {
    getEventRef.current();
  }, []);

  return (
    <Fragment>
      {eventLoading ? (
        <CircularProgress />
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
    eventsContainer: {
      background: theme.palette.background.default,
      display: 'block',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }
  })
);

export default Events;
// Events.whyDidYouRender = true;
