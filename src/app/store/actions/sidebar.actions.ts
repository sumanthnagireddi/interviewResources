import { createAction, props } from "@ngrx/store";

export enum SidebarActionTypes {
  setTechnologies = '[Sidebar] getTechnologies from firestore',
  getSubTechnologies = '[Sidebar] getSubTechnologies from firestore',
  loadTechnologies = '[Sidebar] loadTechnologies from firestore',
  setSubTechnologies = '[Sidebar] setSubTechnologies from firestore',
  loadSubTechnologies = '[Sidebar] loadSubTechnologies from firestore',
  addCategory = '[Sidebar] addCategory to firestore',
  addCategorySuccess = '[Sidebar] addCategorySuccess',
  addCategoryFailure = '[Sidebar] addCategoryFailure',
  deleteCategory = '[Sidebar] deleteCategory from firestore',
  deleteCategorySuccess = '[Sidebar] deleteCategorySuccess',
  deleteCategoryFailure = '[Sidebar] deleteCategoryFailure',
  updateCategory = '[Sidebar] updateCategory in firestore',
  updateCategorySuccess = '[Sidebar] updateCategorySuccess',
  updateCategoryFailure = '[Sidebar] updateCategoryFailure',
  addTechnology = '[Sidebar] addTechnology to firestore',
  addTechnologySuccess = '[Sidebar] addTechnologySuccess',
  addTechnologyFailure = '[Sidebar] addTechnologyFailure',
  deleteTechnology = '[Sidebar] deleteTechnology from firestore',
  deleteTechnologySuccess = '[Sidebar] deleteTechnologySuccess',
  deleteTechnologyFailure = '[Sidebar] deleteTechnologyFailure',
  updateTechnology = '[Sidebar] updateTechnology in firestore',
  updateTechnologySuccess = '[Sidebar] updateTechnologySuccess',
  updateTechnologyFailure = '[Sidebar] updateTechnologyFailure',
  setCurrentContent = '[Sidebar] setCurrentContent',
  loadCurrentContent = '[Sidebar] loadCurrentContent',
  updateCurrentContent = '[Sidebar] updateCurrentContent',
}

export const setTechnologies = createAction(SidebarActionTypes.setTechnologies, props<{ technologies: any[] }>())
export const loadTechnologies = createAction(SidebarActionTypes.loadTechnologies);
export const getSubTechnologies = createAction(SidebarActionTypes.getSubTechnologies, props<{ technology: any }>());
export const setSubTechnologies = createAction(SidebarActionTypes.setSubTechnologies, props<{ subTechnologies: any[] }>());
export const loadSubTechnologies = createAction(SidebarActionTypes.loadSubTechnologies, props<{ technology: any }>());
export const addCategory = createAction(SidebarActionTypes.addCategory, props<{ payload: any }>());
export const addCategorySuccess = createAction(SidebarActionTypes.addCategorySuccess, props<{ payload: any }>());
export const addCategoryFailure = createAction(SidebarActionTypes.addCategoryFailure, props<{ error: any }>());
export const loadCurrentContent = createAction(SidebarActionTypes.loadCurrentContent, props<{ contentID: any }>());
export const setCurrentContent = createAction(SidebarActionTypes.setCurrentContent, props<{ content: any }>());
export const updateCurrentContent = createAction(SidebarActionTypes.updateCurrentContent, props<{ contentPayload: { id: string, data: string ,updatedOn : string} }>());
export const setNewCurrentContent = createAction(SidebarActionTypes.setCurrentContent, props<{ contentPayload: { parent: string, content: string,updatedOn : string } }>());
