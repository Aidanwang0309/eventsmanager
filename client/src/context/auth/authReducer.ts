import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  AUTH_ERROR,
  CLEAR_ERRORS
} from '../types';

import { AuthStateProps, AuthDispatchTypes } from './authTypes';

export const AuthReducer: React.Reducer<AuthStateProps, AuthDispatchTypes> = (
  state,
  action
) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null
      };
    case UPDATE_USER_SUCCESS:
      return { ...state, user: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
