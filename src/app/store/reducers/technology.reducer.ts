import { createReducer, on } from '@ngrx/store';
import {
  getTechnologiesSuccess,
  getTopicsSuccess,
  addTopicSuccess,
  editTopicSuccess,
  deleteTopicSuccess,
} from '../actions/technology.actions';
import { Technology } from '../../model/content.model';

export interface TechnologyState {
  technologies: Technology[];
}
export const initialState: TechnologyState = {
  technologies: [],
};

export const technologyReducer = createReducer(
  initialState,

  // Load all technologies with their nested topics
  on(getTechnologiesSuccess, (state, { technologies }) => ({
    ...state,
    technologies,
  })),

  // Handle legacy getTopicsSuccess (if still triggered somewhere)
  on(getTopicsSuccess, (state, { technologyId, topics }) => ({
    ...state,
    technologies: state.technologies.map((tech) =>
      tech._id === technologyId ? { ...tech, topics } : tech
    ),
  })),

  // Update the technology when a new topic is added
  on(addTopicSuccess, (state, { technologyId, topic }) => ({
    ...state,
    technologies: state.technologies.map((tech) =>
      tech._id === technologyId
        ? {
            ...tech,
            topics: [...(tech.topics || []), { _id: topic, name: topic }],
          }
        : tech
    ),
  })),

  // Update topic when edited
  on(editTopicSuccess, (state, { technologyId, topicId, topic }) => ({
    ...state,
    technologies: state.technologies.map((tech) =>
      tech._id === technologyId
        ? {
            ...tech,
            topics: (tech.topics || []).map((t: any) =>
              t._id === topicId ? { ...t, name: topic } : t
            ),
          }
        : tech
    ),
  })),

  // Remove topic when deleted
  on(deleteTopicSuccess, (state, { technologyId, topicId }) => ({
    ...state,
    technologies: state.technologies.map((tech) =>
      tech._id === technologyId
        ? {
            ...tech,
            topics: (tech.topics || []).filter((t: any) => t._id !== topicId),
          }
        : tech
    ),
  }))
);
