import { createReducer, on } from "@ngrx/store";
import { toggleDialog } from "../actions/dialog.actions";

export interface DialogState {
  showDialog: boolean;
  value?: string | undefined
}
export const initialState: DialogState = {
  showDialog: false,
  value: undefined
};


export const dialogReducer = createReducer(
  initialState,
  on(toggleDialog, (state, { show, value, level }) => ({
    ...state,
    showDialog: show,
    value: value,
    level: level
  })),
);
