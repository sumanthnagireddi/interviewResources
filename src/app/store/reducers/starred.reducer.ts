import { createReducer, on } from '@ngrx/store';
import {
  loadStarredContentSuccess,
  toggleStarredSuccess,
  addToStarredSuccess,
  removeFromStarredSuccess,
  clearAllStarredSuccess,
} from '../actions/starred.actions';
import { Content } from '../../model/content.model';

export interface StarredState {
  starredIds: string[]; // IDs of starred content
  starredContent: Content[]; // Full content objects (loaded when viewing starred page)
  loading: boolean;
  error: any;
}

export const initialState: StarredState = {
  starredIds: [],
  starredContent: [],
  loading: false,
  error: null,
};

export const starredReducer = createReducer(
  initialState,

  // Load starred content
  on(loadStarredContentSuccess, (state, { starredContent, starredIds }) => ({
    ...state,
    starredContent,
    starredIds,
    loading: false,
  })),

  // Toggle starred (can add or remove)
  on(toggleStarredSuccess, (state, { contentId, isStarred }) => {
    if (isStarred) {
      // Add to starred
      return {
        ...state,
        starredIds: [...state.starredIds, contentId],
      };
    } else {
      // Remove from starred
      return {
        ...state,
        starredIds: state.starredIds.filter((id) => id !== contentId),
        starredContent: state.starredContent.filter((content) => content.id !== contentId),
      };
    }
  }),

  // Add to starred
  on(addToStarredSuccess, (state, { contentId }) => ({
    ...state,
    starredIds: [...state.starredIds, contentId],
  })),

  // Remove from starred
  on(removeFromStarredSuccess, (state, { contentId }) => ({
    ...state,
    starredIds: state.starredIds.filter((id) => id !== contentId),
    starredContent: state.starredContent.filter((content) => content.id !== contentId),
  })),

  // Clear all starred
  on(clearAllStarredSuccess, (state) => ({
    ...state,
    starredIds: [],
    starredContent: [],
  }))
);
