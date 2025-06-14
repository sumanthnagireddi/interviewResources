import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromSidebar from '../reducers/sidebar.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  sidebar: fromSidebar.SidebarState;
}

export const reducers: ActionReducerMap<State> = {
sidebar: fromSidebar.sidebarReducer
};


export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: ['user'], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];
