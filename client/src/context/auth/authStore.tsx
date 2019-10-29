import React, { useReducer, createContext, ReactNode } from 'react';
import axios from 'axios';
import { setAuthToken } from 'src/shared/utils';
import { AuthReducer } from './authReducer';
import {
  AuthStateProps,
  AuthActionProps,
  IUser,
  LoginProps,
  RegisterProps
} from './authTypes';
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

// Types
type AuthStoreProps = {
  children: ReactNode;
};

// AuthContext
export const AuthStateContext = createContext({} as AuthStateProps);
export const AuthActionContext = createContext({} as AuthActionProps);

// AuthStore
export const AuthStore = <T extends AuthStoreProps>(props: T) => {
  const initialState: AuthStateProps = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null,
    user: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get('/api/auth');
        dispatch({
          type: LOAD_USER,
          payload: res.data.user
        });
      } catch (err) {
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.msg
        });
      }
    } else {
      return;
    }
  };

  // Register User
  const register = async (formData: RegisterProps) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login User
  const login = async (formData: LoginProps) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      // loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
      setTimeout(clearErrors, 5000);
    }
  };

  // Log out User
  const logout = () => dispatch({ type: LOGOUT });

  // Update User
  const updateUser = async (userData: IUser) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`api/users/update`, userData, config);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data.user
      });
    } catch (err) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: err.response.msg
      });
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthActionContext.Provider
      value={
        {
          register,
          login,
          loadUser,
          logout,
          updateUser,
          clearErrors
        } as AuthActionProps
      }
    >
      <AuthStateContext.Provider
        value={
          {
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            user: state.user
          } as AuthStateProps
        }
      >
        {props.children}
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  );
};

export default AuthStore;
