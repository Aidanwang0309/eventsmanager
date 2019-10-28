import React, { useReducer, createContext, ReactNode } from 'react';
import uuid from 'uuid';
import { AlertStateProps, AlterActionTypes } from './alertTypes';
import { AlertReducer } from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

// Types
type AlertStoreProps = {
  children: ReactNode;
};

type AlertContextProps = {
  alerts: AlertStateProps;
  setAlert: (props: setAlertProps) => void;
};

type setAlertProps = {
  msg: string;
  type: 'close' | 'error' | 'info' | 'success' | 'warning';
  timeout?: number;
};

// AlertContext
export const AlertContext = createContext({} as AlertContextProps);

// AlertStore
export const AlertStore = <T extends AlertStoreProps>(props: T) => {
  const initialState: AlertStateProps = [];

  const [state, dispatch] = useReducer<
    React.Reducer<AlertStateProps, AlterActionTypes>
  >(AlertReducer, initialState);

  const setAlert = ({ msg, type, timeout = 5000 }: setAlertProps) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={
        {
          alerts: state,
          setAlert
        } as AlertContextProps
      }
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertStore;
// interface AlertReducerProps {
//   state: AlertStateProps;
//   dispatch: Dispatch<AlterActionTypes>;
// }
