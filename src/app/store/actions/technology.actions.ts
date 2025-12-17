import { createAction, props } from "@ngrx/store";
import { Technology } from "../../model/content.model";

export enum TechnologyActionTypes {
  addTechnology = '[Technology] addTechnology',
  addTechnologySuccess = '[Technology] addTechnologySuccess',
  addTechnologyFailure = '[Technology] addTechnologyFailure',
  getTechnologies = '[Technology] getTechnologies',
  getTechnologiesSuccess = '[Technology] getTechnologiesSuccess',
  getTechnologiesFailure = '[Technology] getTechnologiesFailure',
}

export const addTechnology = createAction(TechnologyActionTypes.addTechnology, props<{ technologyName: string }>());
export const addTechnologySuccess = createAction(TechnologyActionTypes.addTechnologySuccess);
export const addTechnologyFailure = createAction(TechnologyActionTypes.addTechnologyFailure, props<{ error: any }>());
export const getTechnologies = createAction(TechnologyActionTypes.getTechnologies);
export const getTechnologiesSuccess = createAction(TechnologyActionTypes.getTechnologiesSuccess, props<{ technologies: Technology[] }>());
export const getTechnologiesFailure = createAction(TechnologyActionTypes.getTechnologiesFailure, props<{ error: any }>());
