import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FILTER_EVENT,
  CLEAR_FILTER,
  EVENT_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: action.payload, loading: false };
    case ADD_EVENT:
      return state;
    default:
      return state;
  }
};
