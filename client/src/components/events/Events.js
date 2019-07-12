import React, { useContext, Fragment, useEffect } from "react";
import EventContext from "../../context/events/eventContext";
import EventCard from "./EventCard";

import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles
} from "@material-ui/core/styles";

const muiBaseTheme = createMuiTheme();

const Events = () => {
  const eventContext = useContext(EventContext);
  const { events, getEvents } = eventContext;
  const classes = useStyles();

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  //   if (events !== null && events.length === 0) {
  //     return <h4>Please add a contact</h4>;
  //   }

  return (
    <div className={classes.eventsContainer}>
      <MuiThemeProvider
        theme={createMuiTheme({
          overrides: EventCard.getTheme(muiBaseTheme)
        })}
      >
        {events === null
          ? null
          : events.map(event => (
              <EventCard
                className={classes.eventCard}
                _id={event._id}
                name={event.name}
                date={event.date}
                location={event.location}
                type={event.type}
              />
            ))}
      </MuiThemeProvider>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  eventsContainer: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  eventCard: {
    width: "80%",
    margin: "10% auto",
    [theme.breakpoints.up("sm")]: {
      width: "30%",
      margin: "0 auto"
    }
  }
}));
export default Events;
