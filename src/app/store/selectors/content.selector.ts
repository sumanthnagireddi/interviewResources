import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DialogState } from "../reducers/dialog.reducer";
import { ContentState } from "../reducers/content.reducer";

export const selectContentState = createFeatureSelector<ContentState>('content');

export const selectTopContents = createSelector(
  selectContentState,
  (state: ContentState) => state?.topContents || []
);

export const selectRecentContents = createSelector(
  selectContentState,
  (state: ContentState) => state?.recentContent || []
);
