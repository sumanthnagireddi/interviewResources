import { createReducer, on } from "@ngrx/store";
import { toggleDialog } from "../actions/dialog.actions";

export interface DialogState {
  showDialog: boolean;
}
export const initialState: DialogState = {
  showDialog: false
};


export const dialogReducer = createReducer(
  initialState,
  on(toggleDialog, (state, { show }) => ({
    ...state,
    showDialog: show
  })),
);
