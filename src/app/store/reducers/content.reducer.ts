import { createReducer, on } from "@ngrx/store";
import { loadTopContents, loadTopContentsSuccess, updateRecentVisited } from "../actions/content.actions";

export interface ContentState {
  topContents: any[];
  recentContent: any
}
export const initialState: ContentState = {
  topContents: [],
  recentContent: []
};


export const contentReducer = createReducer(
  initialState,
  on(loadTopContentsSuccess, (state, { topContents }) => ({
    ...state,
    topContents: topContents
  })),
  on(updateRecentVisited, (state, { recentContent }) => ({
    ...state,
    recentContent: recentContent
  }))
);
