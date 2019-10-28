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
import { IEvents } from '../events/eventTypes';

export type IUser = {
  _id: string;
  name: string;
  email: string;
  date: string;
  avatar: string;
  goingEvents: IEvents | [];
};

export type AuthStateProps = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: IUser | null;
};

export type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type AuthActionProps = {
  register: (props: RegisterProps) => Promise<void>;
  login: (props: LoginProps) => Promise<void>;
  loadUser: () => Promise<void>;
  logout: () => void;
  updateUser: (props: IUser) => Promise<void>;
  clearErrors: () => Promise<void>;
};

type RegisterSuccessDispatch = {
  type: typeof REGISTER_SUCCESS;
  payload: { token: string };
};

type RegisterFailDispatch = {
  type: typeof REGISTER_FAIL;
  payload: string;
};

type LoginSuccessDispatch = {
  type: typeof LOGIN_SUCCESS;
  payload: { token: string };
};

type LoginFailDispatch = {
  type: typeof LOGIN_FAIL;
  payload: string;
};

type LogoutDispatch = {
  type: typeof LOGOUT;
};

type LoadUserDispatch = {
  type: typeof LOAD_USER;
  payload: IUser;
};

type UpdateUserSuccessDispatch = {
  type: typeof UPDATE_USER_SUCCESS;
  payload: IUser;
};

type UpdateUserFailDispatch = {
  type: typeof UPDATE_USER_FAIL;
  payload: string;
};

type AuthErrorDispatch = {
  type: typeof AUTH_ERROR;
  payload: string;
};

type ClearErrorDispatch = {
  type: typeof CLEAR_ERRORS;
};

export type AuthDispatchTypes =
  | RegisterSuccessDispatch
  | RegisterFailDispatch
  | LoginSuccessDispatch
  | LoginFailDispatch
  | LogoutDispatch
  | LoadUserDispatch
  | UpdateUserSuccessDispatch
  | UpdateUserFailDispatch
  | AuthErrorDispatch
  | ClearErrorDispatch;
