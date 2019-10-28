import { SET_ALERT, REMOVE_ALERT } from '../types';

export type AlertStateProp = {
  msg: string;
  type: 'close' | 'error' | 'info' | 'success' | 'warning';
  id: string;
};

export type AlertStateProps = Array<AlertStateProp>;

type SetAlertAction = {
  type: typeof SET_ALERT;
  payload: AlertStateProp;
};

type RemoveAlertAction = {
  type: typeof REMOVE_ALERT;
  payload: string;
};

export type AlterActionTypes = SetAlertAction | RemoveAlertAction;
