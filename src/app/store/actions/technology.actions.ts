import { createAction, props } from '@ngrx/store';
import { Technology } from '../../model/content.model';

/* =========================================================
   ACTION TYPES
   ========================================================= */

export enum TechnologyActionTypes {
  // Technology
  addTechnology = '[Technology] Add Technology',
  addTechnologySuccess = '[Technology] Add Technology Success',
  addTechnologyFailure = '[Technology] Add Technology Failure',

  editTechnology = '[Technology] Edit Technology',
  editTechnologySuccess = '[Technology] Edit Technology Success',
  editTechnologyFailure = '[Technology] Edit Technology Failure',

  deleteTechnology = '[Technology] Delete Technology',
  deleteTechnologySuccess = '[Technology] Delete Technology Success',
  deleteTechnologyFailure = '[Technology] Delete Technology Failure',

  getTechnologies = '[Technology] Get Technologies',
  getTechnologiesSuccess = '[Technology] Get Technologies Success',
  getTechnologiesFailure = '[Technology] Get Technologies Failure',

  // Topic
  addTopic = '[Topic] Add Topic',
  addTopicSuccess = '[Topic] Add Topic Success',
  addTopicFailure = '[Topic] Add Topic Failure',

  editTopic = '[Topic] Edit Topic',
  editTopicSuccess = '[Topic] Edit Topic Success',
  editTopicFailure = '[Topic] Edit Topic Failure',

  deleteTopic = '[Topic] Delete Topic',
  deleteTopicSuccess = '[Topic] Delete Topic Success',
  deleteTopicFailure = '[Topic] Delete Topic Failure',

  getTopics = '[Topic] Get Topics',
  getTopicsSuccess = '[Topic] Get Topics Success',
  getTopicsFailure = '[Topic] Get Topics Failure',
}

export const addTechnology = createAction(
  TechnologyActionTypes.addTechnology,
  props<{ technology: Technology }>()
);

export const addTechnologySuccess = createAction(
  TechnologyActionTypes.addTechnologySuccess,
  props<{ technology: Technology }>()
);

export const addTechnologyFailure = createAction(
  TechnologyActionTypes.addTechnologyFailure,
  props<{ error: any }>()
);

export const editTechnology = createAction(
  TechnologyActionTypes.editTechnology,
  props<{ technology: Technology }>()
);

export const editTechnologySuccess = createAction(
  TechnologyActionTypes.editTechnologySuccess,
  props<{ technology: Technology }>()
);

export const editTechnologyFailure = createAction(
  TechnologyActionTypes.editTechnologyFailure,
  props<{ error: any }>()
);

export const deleteTechnology = createAction(
  TechnologyActionTypes.deleteTechnology,
  props<{ technologyId: string }>()
);

export const deleteTechnologySuccess = createAction(
  TechnologyActionTypes.deleteTechnologySuccess,
  props<{ technologyId: string }>()
);

export const deleteTechnologyFailure = createAction(
  TechnologyActionTypes.deleteTechnologyFailure,
  props<{ error: any }>()
);

export const getTechnologies = createAction(
  TechnologyActionTypes.getTechnologies
);

export const getTechnologiesSuccess = createAction(
  TechnologyActionTypes.getTechnologiesSuccess,
  props<{ technologies: Technology[] }>()
);

export const getTechnologiesFailure = createAction(
  TechnologyActionTypes.getTechnologiesFailure,
  props<{ error: any }>()
);
export const addTopic = createAction(
  TechnologyActionTypes.addTopic,
  props<{
    technologyId: string;
    topic: string;
    topic_description: string;
  }>()
);

export const addTopicSuccess = createAction(
  TechnologyActionTypes.addTopicSuccess,
  props<{
    technologyId: string;
    topic: string;
  }>()
);

export const addTopicFailure = createAction(
  TechnologyActionTypes.addTopicFailure,
  props<{ error: any }>()
);

export const editTopic = createAction(
  TechnologyActionTypes.editTopic,
  props<{
    topicId: string;
    topic: string;
    topic_description: string;
  }>()
);

export const editTopicSuccess = createAction(
  TechnologyActionTypes.editTopicSuccess,
  props<{
    technologyId: string;
    topicId: string;
    topic: string;
  }>()
);

export const editTopicFailure = createAction(
  TechnologyActionTypes.editTopicFailure,
  props<{ error: any }>()
);

export const deleteTopic = createAction(
  TechnologyActionTypes.deleteTopic,
  props<{
    topicId: string;
  }>()
);

export const deleteTopicSuccess = createAction(
  TechnologyActionTypes.deleteTopicSuccess,
  props<{
    technologyId: string;
    topicId: string;
  }>()
);

export const deleteTopicFailure = createAction(
  TechnologyActionTypes.deleteTopicFailure,
  props<{ error: any }>()
);

export const getTopics = createAction(
  TechnologyActionTypes.getTopics,
  props<{ technologyId: string }>()
);

export const getTopicsSuccess = createAction(
  TechnologyActionTypes.getTopicsSuccess,
  props<{
    technologyId: string;
    topics: any;
  }>()
);

export const getTopicsFailure = createAction(
  TechnologyActionTypes.getTopicsFailure,
  props<{ error: any }>()
);
