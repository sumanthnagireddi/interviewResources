// dialog.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DialogState } from '../reducers/dialog.reducer';

export const selectDialogState = createFeatureSelector<DialogState>('dialog');

export const selectDialogOpen = createSelector(
  selectDialogState,
  (s) => s.isOpen
);

export const selectDialogConfig = createSelector(
  selectDialogState,
  (s) => s.config
);
