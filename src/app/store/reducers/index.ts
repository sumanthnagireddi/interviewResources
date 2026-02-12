import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import * as fromSidebar from './sidebar-new.reducer';
import * as fromDialog from './dialog.reducer';
import * as fromTechnology from './technology.reducer';
import * as fromContent from './content.reducer';
import * as fromStarred from './starred.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  sidebar: fromSidebar.SidebarState;
  dialog: fromDialog.DialogState;
  technologies: fromTechnology.TechnologyState;
  content: fromContent.ContentState;
  starred: fromStarred.StarredState;
}

export const reducers: ActionReducerMap<State> = {
  sidebar: fromSidebar.sidebarReducer,
  dialog: fromDialog.dialogReducer,
  technologies: fromTechnology.technologyReducer,
  content: fromContent.contentReducer,
  starred: fromStarred.starredReducer,
};


export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['user', 'starred'],
    rehydrate: true
  })(reducer);
}

export const metaReducers: MetaReducer<any, any>[] = [
  localStorageSyncReducer,

];
