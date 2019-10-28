import { EventDispatchTypes, EventStateProps } from './eventTypes';
import {
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FILTER_EVENT,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_EDITING,
  // GET_EVENTS_BY_ID,
  DELETE_IMAGE,
  SET_EVENT_ERROR
} from '../types';

export const EventReducer: React.Reducer<
  EventStateProps,
  EventDispatchTypes
> = (state, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, eventLoading: true };
    case GET_EVENTS_SUCCESS:
      return { ...state, events: action.payload, eventLoading: false };
    case ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
        eventLoading: false
      };
    // case GET_EVENTS_BY_ID:
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === action.payload._id ? action.payload : event
        )
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.payload),
        eventLoading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case SET_EDITING:
      return {
        ...state,
        editing: action.payload
      };
    case FILTER_EVENT:
      return {
        ...state,
        filtered: state.events.filter(event => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return event.name.match(regex) || event.location.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case DELETE_IMAGE:
      return state;
    case SET_EVENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
};
