import { createAction, props } from '@ngrx/store';
import { Content } from '../../model/content.model';

/* =========================================================
   STARRED ACTION TYPES
   ========================================================= */

export enum StarredActionTypes {
  /* -------------------- LOAD -------------------- */
  loadStarredContent = '[Starred] Load Starred Content',
  loadStarredContentSuccess = '[Starred] Load Starred Content Success',
  loadStarredContentFailure = '[Starred] Load Starred Content Failure',

  /* -------------------- TOGGLE -------------------- */
  toggleStarred = '[Starred] Toggle Starred',
  toggleStarredSuccess = '[Starred] Toggle Starred Success',
  toggleStarredFailure = '[Starred] Toggle Starred Failure',

  /* -------------------- ADD -------------------- */
  addToStarred = '[Starred] Add To Starred',
  addToStarredSuccess = '[Starred] Add To Starred Success',
  addToStarredFailure = '[Starred] Add To Starred Failure',

  /* -------------------- REMOVE -------------------- */
  removeFromStarred = '[Starred] Remove From Starred',
  removeFromStarredSuccess = '[Starred] Remove From Starred Success',
  removeFromStarredFailure = '[Starred] Remove From Starred Failure',

  /* -------------------- CLEAR -------------------- */
  clearAllStarred = '[Starred] Clear All Starred',
  clearAllStarredSuccess = '[Starred] Clear All Starred Success',
  clearAllStarredFailure = '[Starred] Clear All Starred Failure',
}

/* =========================================================
   ACTIONS
   ========================================================= */

/* ---------- LOAD STARRED CONTENT ---------- */

export const loadStarredContent = createAction(
  StarredActionTypes.loadStarredContent
);

export const loadStarredContentSuccess = createAction(
  StarredActionTypes.loadStarredContentSuccess,
  props<{ starredContent: Content[]; starredIds: string[] }>()
);

export const loadStarredContentFailure = createAction(
  StarredActionTypes.loadStarredContentFailure,
  props<{ error: any }>()
);

/* ---------- TOGGLE STARRED ---------- */

export const toggleStarred = createAction(
  StarredActionTypes.toggleStarred,
  props<{ contentId: string }>()
);

export const toggleStarredSuccess = createAction(
  StarredActionTypes.toggleStarredSuccess,
  props<{ contentId: string; isStarred: boolean }>()
);

export const toggleStarredFailure = createAction(
  StarredActionTypes.toggleStarredFailure,
  props<{ error: any }>()
);

/* ---------- ADD TO STARRED ---------- */

export const addToStarred = createAction(
  StarredActionTypes.addToStarred,
  props<{ contentId: string }>()
);

export const addToStarredSuccess = createAction(
  StarredActionTypes.addToStarredSuccess,
  props<{ contentId: string }>()
);

export const addToStarredFailure = createAction(
  StarredActionTypes.addToStarredFailure,
  props<{ error: any }>()
);

/* ---------- REMOVE FROM STARRED ---------- */

export const removeFromStarred = createAction(
  StarredActionTypes.removeFromStarred,
  props<{ contentId: string }>()
);

export const removeFromStarredSuccess = createAction(
  StarredActionTypes.removeFromStarredSuccess,
  props<{ contentId: string }>()
);

export const removeFromStarredFailure = createAction(
  StarredActionTypes.removeFromStarredFailure,
  props<{ error: any }>()
);

/* ---------- CLEAR ALL STARRED ---------- */

export const clearAllStarred = createAction(
  StarredActionTypes.clearAllStarred
);

export const clearAllStarredSuccess = createAction(
  StarredActionTypes.clearAllStarredSuccess
);

export const clearAllStarredFailure = createAction(
  StarredActionTypes.clearAllStarredFailure,
  props<{ error: any }>()
);
