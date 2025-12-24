import { createReducer, on } from '@ngrx/store';
import { closeDialog, openDialog } from '../actions/dialog.actions';
import { DialogConfig } from '../../model/dialog.model';

export interface DialogState {
  isOpen: boolean;
  config: DialogConfig | null;
}

export const initialDialogState: DialogState = {
  isOpen: false,
  config: null,
};

export const dialogReducer = createReducer(
  initialDialogState,
  on(openDialog, (_, { config }) => ({
    isOpen: true,
    config,
  })),
  on(closeDialog, () => initialDialogState)
);
