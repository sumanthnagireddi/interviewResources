import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromSidebar from './sidebar-new.reducer';
import * as fromDialog from './dialog.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  sidebar: fromSidebar.SidebarState;
  dialog: fromDialog.DialogState;
}

export const reducers: ActionReducerMap<State> = {
  sidebar: fromSidebar.sidebarReducer,
  dialog: fromDialog.dialogReducer
};


export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: ['user'], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,

];
