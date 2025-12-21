import { createAction, props } from "@ngrx/store";
import { Technology } from "../../model/content.model";

export enum TechnologyActionTypes {
  addTechnology = '[Technology] addTechnology',
  addTechnologySuccess = '[Technology] addTechnologySuccess',
  addTechnologyFailure = '[Technology] addTechnologyFailure',
  getTechnologies = '[Technology] getTechnologies',
  getTechnologiesSuccess = '[Technology] getTechnologiesSuccess',
  getTechnologiesFailure = '[Technology] getTechnologiesFailure',
  addTopic = '[Topic] addTopic',
  addTopicSuccess = '[Topic] addTopicSuccess',
  addTopicFailure = '[Topic] addTopicFailure',
}

export const addTechnology = createAction(TechnologyActionTypes.addTechnology, props<{ technologyName: string }>());
export const addTechnologySuccess = createAction(TechnologyActionTypes.addTechnologySuccess, props<{ technology?: { id: string, name: string } }>());
export const addTechnologyFailure = createAction(TechnologyActionTypes.addTechnologyFailure, props<{ error: any }>());
export const getTechnologies = createAction(TechnologyActionTypes.getTechnologies);
export const getTechnologiesSuccess = createAction(TechnologyActionTypes.getTechnologiesSuccess, props<{ technologies: Technology[] }>());
export const getTechnologiesFailure = createAction(TechnologyActionTypes.getTechnologiesFailure, props<{ error: any }>());
export const addTopic = createAction(TechnologyActionTypes.addTopic, props<{ technology: { id: string; name: string, topic: string } }>())
export const addTopicSuccess = createAction(TechnologyActionTypes.addTechnologySuccess, props<{ technology: { id: string, name: string, topic: string } }>())
