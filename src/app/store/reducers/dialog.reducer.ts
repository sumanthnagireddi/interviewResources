import { createReducer, on } from '@ngrx/store';
import { toggleDialog } from '../actions/dialog.actions';

export interface DialogState {
  showDialog: boolean;
  value?: string | undefined;
  child?: any;
}
export const initialState: DialogState = {
  showDialog: false,
  value: undefined,
  child: null,
};

export const dialogReducer = createReducer(
  initialState,
  on(toggleDialog, (state, { show, value, child }) => ({
    ...state,
    showDialog: show,
    value: value,
    child: child,
  }))
);
