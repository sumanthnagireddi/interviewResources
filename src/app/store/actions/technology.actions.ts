import { createAction, props } from '@ngrx/store';
import { Technology } from '../../model/content.model';

export enum TechnologyActionTypes {
  addTechnology = '[Technology] addTechnology',
  addTechnologySuccess = '[Technology] addTechnologySuccess',
  addTechnologyFailure = '[Technology] addTechnologyFailure',
  editTechnology = '[Technology] editTechnology',
  deleteTechnology = '[Technology] deleteTechnology',
  getTechnologies = '[Technology] getTechnologies',
  getTechnologiesSuccess = '[Technology] getTechnologiesSuccess',
  getTechnologiesFailure = '[Technology] getTechnologiesFailure',
  addTopic = '[Topic] addTopic',
  addTopicSuccess = '[Topic] addTopicSuccess',
  addTopicFailure = '[Topic] addTopicFailure',
}

export const addTechnology = createAction(
  TechnologyActionTypes.addTechnology,
  props<{ technology: any }>()
);
export const addTechnologySuccess = createAction(
  TechnologyActionTypes.addTechnologySuccess,
  props<{ technology?: { id: string; name: string } }>()
);
export const addTechnologyFailure = createAction(
  TechnologyActionTypes.addTechnologyFailure,
  props<{ error: any }>()
);
export const getTechnologies = createAction(
  TechnologyActionTypes.getTechnologies
);
export const getTechnologiesSuccess = createAction(
  TechnologyActionTypes.getTechnologiesSuccess,
  props<{ technologies: any }>()
);
export const getTechnologiesFailure = createAction(
  TechnologyActionTypes.getTechnologiesFailure,
  props<{ error: any }>()
);
export const addTopic = createAction(
  TechnologyActionTypes.addTopic,
  props<{
    technologyId: string;
    topic: { name: string; description: string };
  }>()
);
export const addTopicSuccess = createAction(
  TechnologyActionTypes.addTechnologySuccess,
  props<{ technology: { id: string; name: string; topic: string } }>()
);

export const editTechnology = createAction(
  TechnologyActionTypes.editTechnology,
  props<{ technology: any }>()
);
export const deleteTechnology = createAction(
  TechnologyActionTypes.deleteTechnology,
  props<{ technologyId: string }>()
);
