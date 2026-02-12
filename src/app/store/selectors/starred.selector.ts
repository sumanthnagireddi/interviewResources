import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StarredState } from '../reducers/starred.reducer';

export const selectStarredState = createFeatureSelector<StarredState>('starred');

export const selectStarredIds = createSelector(
  selectStarredState,
  (state: StarredState) => state.starredIds
);

export const selectStarredContent = createSelector(
  selectStarredState,
  (state: StarredState) => state.starredContent
);

export const selectStarredCount = createSelector(
  selectStarredIds,
  (starredIds: string[]) => starredIds.length
);

export const selectIsStarred = (contentId: string) =>
  createSelector(selectStarredIds, (starredIds: string[]) =>
    starredIds.includes(contentId)
  );

export const selectStarredLoading = createSelector(
  selectStarredState,
  (state: StarredState) => state.loading
);

export const selectStarredError = createSelector(
  selectStarredState,
  (state: StarredState) => state.error
);
