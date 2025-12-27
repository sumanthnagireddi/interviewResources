import { createReducer, on } from '@ngrx/store';
import {
  loadCurrentContentFromData,
  loadTopContentsSuccess,
  updateRecentVisited,
} from '../actions/content.actions';

export interface ContentState {
  topContents: any[];
  recentContent: any;
  currentContent: any;
}
export const initialState: ContentState = {
  topContents: [],
  recentContent: [],
  currentContent: null,
};

export const contentReducer = createReducer(
  initialState,
  on(loadTopContentsSuccess, (state, { topContents }) => ({
    ...state,
    topContents: topContents,
  })),
  on(updateRecentVisited, (state, { recentContent }) => ({
    ...state,
    recentContent: recentContent,
  })),
  on(loadCurrentContentFromData, (state, { currentContent }) => ({
    ...state,
    currentContent: currentContent,
  }))
);
