import React, { useContext, useEffect } from "react";
import EventContext from "../../context/events/eventContext";
import EventCard from "./EventCard";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles
} from "@material-ui/core/styles";

const muiBaseTheme = createMuiTheme();

const Events = () => {
  const eventContext = useContext(EventContext);
  const { events, getEvents, filtered } = eventContext;

  const classes = useStyles();

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  //   if (events !== null && events.length === 0) {
  //     return <h4>Please add a contact</h4>;
  //   }

  const eventsList = filtered || events;

  return (
    <MuiThemeProvider
      theme={createMuiTheme({
        overrides: EventCard.getTheme(muiBaseTheme)
      })}
    >
      <TransitionGroup className={classes.eventsContainer}>
        {eventsList === null
          ? null
          : eventsList.map(event => (
              <CSSTransition key={event._id} timeout={500} classNames="item">
                <EventCard
                  className={classes.eventCard}
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
    </MuiThemeProvider>
  );
};

const useStyles = makeStyles(theme => ({
  eventsContainer: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexWrap: "wrap"
    }
  },
  eventCard: {
    width: "80%",
    margin: "10% auto",
    [theme.breakpoints.up("sm")]: {
      width: "30%",
      margin: "3rem auto"
    }
  }
}));
export default Events;
