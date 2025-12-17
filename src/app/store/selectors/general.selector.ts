import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DialogState } from "../reducers/dialog.reducer";

export const selectDialogState = createFeatureSelector<DialogState>('dialog');

export const selectShowDialog = createSelector(
  selectDialogState,
  (state: DialogState) => state?.showDialog || false
);
