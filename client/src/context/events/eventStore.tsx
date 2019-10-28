import React, { useReducer, ReactNode, createContext } from 'react';
import axios from 'axios';
import {
  IEvent,
  DeleteEventProps,
  EventStateProps,
  EventActionProps,
  EventDispatchTypes
} from './eventTypes';
import { EventReducer } from './eventReducer';
import {
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FILTER_EVENT,
  CLEAR_FILTER,
  SET_EVENT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_EDITING,
  DELETE_IMAGE
  // GET_EVENTS_BY_ID
} from '../types';

type EventStoreProps = {
  children: ReactNode;
};

export const EventStateContext = createContext({} as EventStateProps);
export const EventActionContext = createContext({} as EventActionProps);

const EventStore = <T extends EventStoreProps>(props: T) => {
  const initialState: EventStateProps = {
    events: [
      {
        _id: '',
        creator: '',
        name: '',
        date: '',
        location: '',
        type: '',
        poster: '',
        attendees: []
      }
    ],
    current: null,
    editing: false,
    filtered: null,
    error: null,
    eventLoading: false
  };

  const [state, dispatch] = useReducer<
    React.Reducer<EventStateProps, EventDispatchTypes>
  >(EventReducer, initialState);

  const getEvents = async () => {
    dispatch({
      type: GET_EVENTS
    });
    try {
      const res = await axios.get('api/events');
      dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: res.data.events
      });
    } catch (err) {
      dispatch({
        type: SET_EVENT_ERROR,
        payload: err
      });
    }
  };

  const addEvent = async (event: IEvent) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('api/events', event, config);
      dispatch({
        type: ADD_EVENT,
        payload: res.data.event
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  const deleteEvent = async (props: DeleteEventProps) => {
    const { id, poster } = props;
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      deleteImage(poster);
      await axios.delete(`api/events/${id}`, config);
      dispatch({
        type: DELETE_EVENT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: SET_EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  const updateEvent = async (event: IEvent) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`api/events/${event._id}`, event, config);
      dispatch({
        type: UPDATE_EVENT,
        payload: res.data
      });
      getEvents();
    } catch (err) {
      dispatch({
        type: SET_EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  const setCurrent = (event: IEvent) => {
    dispatch({
      type: SET_CURRENT,
      payload: event
    });
  };

  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  const filterEvents = (text: string) => {
    if (text.length >= 2) {
      dispatch({
        type: FILTER_EVENT,
        payload: text
      });
    }
  };

  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  const setEditing = (editingState: boolean) => {
    dispatch({
      type: SET_EDITING,
      payload: editingState
    });
  };

  const addAttendee = (event: IEvent) => {
    updateEvent(event);
  };

  const deleteImage = async (poster: string) => {
    try {
      await axios.delete(`api/file/${poster}`);

      dispatch({
        type: DELETE_IMAGE
      });
    } catch (err) {
      dispatch({
        type: SET_EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <EventStateContext.Provider
      value={{
        events: state.events,
        filtered: state.filtered,
        editing: state.editing,
        error: state.error,
        current: state.current,
        eventLoading: state.eventLoading
      }}
    >
      <EventActionContext.Provider
        value={{
          getEvents,
          addEvent,
          updateEvent,
          deleteEvent,
          setCurrent,
          clearCurrent,
          setEditing,
          filterEvents,
          clearFilter,
          addAttendee
        }}
      >
        {props.children}
      </EventActionContext.Provider>
    </EventStateContext.Provider>
  );
};

export default EventStore;

// Get Event by ID

// const getEventById = async id => {
//   try {
//     const res = await axios.get(`api/events/${id}`);
//     console.log(res);
//     dispatch({
//       type: GET_EVENTS_BY_ID,
//       payload: res.data.event
//     });
//   } catch (err) {
//     dispatch({
//       type: EVENT_ERROR,
//       payload: err
//     });
//   }
// };
// Add Event
