import { SET_ALERT, REMOVE_ALERT } from "../types";
import { AlertStateProps, AlterActionTypes } from "./alertTypes";

export const AlertReducer: React.Reducer<AlertStateProps, AlterActionTypes> = (
  state,
  action
) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};
