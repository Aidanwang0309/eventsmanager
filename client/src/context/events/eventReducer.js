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
  SET_EDITING,
  ADD_ATTENDEE
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: action.payload, loading: false };
    case ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
        loading: false
      };
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
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
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
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            event.name.match(regex) ||
            event.location.match(regex) ||
            event.date.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    case ADD_ATTENDEE:
      return {
        ...state,
        attendees: [...state.attendees, action.payload]
      };
    default:
      return state;
  }
};
