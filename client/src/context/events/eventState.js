import React, { useReducer } from "react";
import EventContext from "./eventContext";
import EventReducer from "./eventReducer";
import axios from "axios";
// import uuid from "uuid";

import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FILTER_EVENT,
  CLEAR_FILTER,
  EVENT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_EDITING
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
    current: null,
    editing: false,
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

  const addEvent = async event => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("api/events", event, config);
      console.log(res.data);
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Event

  const deleteEvent = async id => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      await axios.delete(`api/events/${id}`, config);

      dispatch({
        type: DELETE_EVENT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Event

  const updateEvent = async event => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQyMjZjZGQwNDRmNGI3ZDdjYmVjZjdmIn0sImlhdCI6MTU2Mjk2MjI2MywiZXhwIjoxNTYzMzIyMjYzfQ.Q_DtAFfDhu5QeAvwIwrXAx7rNZ1XHwFjPyh3NhvXnno"
      }
    };

    try {
      const res = await axios.put(`api/events/${event._id}`, event, config);
      dispatch({
        type: UPDATE_EVENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current Event

  const setCurrent = event => {
    dispatch({
      type: SET_CURRENT,
      payload: event
    });
  };

  //
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  // Filter Event

  const filterEvents = text => {
    dispatch({
      type: FILTER_EVENT,
      payload: text
    });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };
  //
  const setEditing = editingState => {
    dispatch({
      type: SET_EDITING,
      payload: editingState
    });
  };

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        filtered: state.filtered,
        editing: state.editing,
        error: state.error,
        current: state.current,
        getEvents,
        addEvent,
        updateEvent,
        deleteEvent,
        setCurrent,
        clearCurrent,
        setEditing,
        filterEvents,
        clearFilter
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
