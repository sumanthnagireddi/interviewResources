import { createAction, props } from "@ngrx/store";

export enum ContentActionTypes {
  loadTopContents = '[Content] loadTopContents',
  updateTopContentSuccess = '[Content] loadTopContents Success',
  loadRecentVisited = '[Content] loadRecentVisited',
  updateRecentVisited= '[Content] update recentVisitied'
}

export const loadTopContents = createAction(ContentActionTypes.loadTopContents);
export const loadTopContentsSuccess = createAction(
  ContentActionTypes.updateTopContentSuccess,
  props<{ topContents: any[] }>()
);
export const loadRecentVisited = createAction(ContentActionTypes.loadRecentVisited);
export const updateRecentVisited = createAction(
  ContentActionTypes.updateRecentVisited,
  props<{ recentContent: any[] }>()
);
