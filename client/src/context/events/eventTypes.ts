import { IUser } from '../auth/authTypes';
import {
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_EVENT,
  CLEAR_FILTER,
  SET_EDITING,
  SET_EVENT_ERROR,
  DELETE_IMAGE
  // GET_EVENTS_BY_ID
} from '../types';

export type IEvent = {
  _id: string;
  creator: string;
  name: string;
  date: string;
  location: string;
  type: string;
  poster: string;
  attendees: IUser[] | [];
};
export type IEvents = Array<IEvent>;

export type EventStateProps = {
  events: IEvents;
  current: IEvent | null;
  editing: boolean;
  filtered: IEvents | null;
  error: string | null;
  eventLoading: boolean;
};

export type DeleteEventProps = {
  id: string;
  poster: string;
};

export type EventActionProps = {
  getEvents: () => Promise<void>;
  addEvent: (props: IEvent) => Promise<void>;
  updateEvent: (props: IEvent) => Promise<void>;
  deleteEvent: (props: DeleteEventProps) => Promise<void>;
  setCurrent: (props: IEvent) => void;
  clearCurrent: () => void;
  setEditing: (props: boolean) => void;
  filterEvents: (props: string) => void;
  clearFilter: () => void;
  addAttendee: (props: IEvent) => void;
};

type GetEventsDispatch = {
  type: typeof GET_EVENTS;
};

type GetEventsSuccessDispatch = {
  type: typeof GET_EVENTS_SUCCESS;
  payload: IEvents;
};

type AddEventDispatch = {
  type: typeof ADD_EVENT;
  payload: IEvent;
};

type DeleteEventDispatch = {
  type: typeof DELETE_EVENT;
  payload: string;
};

type UpdateEventDispatch = {
  type: typeof UPDATE_EVENT;
  payload: IEvent;
};

type SetCurrentDispatch = {
  type: typeof SET_CURRENT;
  payload: IEvent;
};

type ClearCurrentDispatch = {
  type: typeof CLEAR_CURRENT;
};

type FilterEventDispatch = {
  type: typeof FILTER_EVENT;
  payload: string;
};

type ClearFilterDispatch = {
  type: typeof CLEAR_FILTER;
};

type SetEditingDispatch = {
  type: typeof SET_EDITING;
  payload: boolean;
};

type SetEventErrorDispatch = {
  type: typeof SET_EVENT_ERROR;
  payload: string;
};

type DeleteImageDispatch = {
  type: typeof DELETE_IMAGE;
};

export type EventDispatchTypes =
  | GetEventsDispatch
  | GetEventsSuccessDispatch
  | AddEventDispatch
  | DeleteEventDispatch
  | UpdateEventDispatch
  | SetCurrentDispatch
  | ClearCurrentDispatch
  | FilterEventDispatch
  | ClearFilterDispatch
  | SetEditingDispatch
  | SetEventErrorDispatch
  | DeleteImageDispatch;
