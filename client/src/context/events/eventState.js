import React, { useReducer } from "react";
import EventContext from "./eventContext";
import EventReducer from "./eventReducer";
import axios from "axios";

import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FILTER_EVENT,
  CLEAR_FILTER,
  EVENT_ERROR
} from "../types";

const EventState = props => {
  // Initial State

  const initialState = {
    events: null,
    // [
    //   {
    //     name: "Gorgon City Pres. REALM",
    //     date: "Fridat 07/12 22:00 - 04:00",
    //     location: "Brooklyn Mirage - Avant Gardner"
    //   }
    // ]
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(EventReducer, initialState);

  // Get Events

  const getEvents = async () => {
    try {
      const res = await axios.get("api/events");
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };
  // Add Event

  // Delete Event

  // Update Event

  // Filter Event

  // Clear Filter

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        filtered: state.filtered,
        error: state.error,
        getEvents
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
