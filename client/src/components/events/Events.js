import React, { useContext, Fragment, useEffect } from "react";
import EventContext from "../../context/events/eventContext";

const Events = () => {
  const eventContext = useContext(EventContext);
  const { events, getEvents } = eventContext;

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  //   if (events !== null && events.length === 0) {
  //     return <h4>Please add a contact</h4>;
  //   }

  return (
    <Fragment>
      {events === null ? null : events.map(event => <h3>{event.name}</h3>)}
    </Fragment>
  );
};

export default Events;
