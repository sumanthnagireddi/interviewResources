import { createReducer, on } from '@ngrx/store';
import {
  getTechnologiesSuccess,
  getTopicsSuccess,
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

  on(getTechnologiesSuccess, (state, { technologies }) => ({
    ...state,
    technologies,
  })),

  on(getTopicsSuccess, (state, { technologyId, topics }) => ({
    ...state,
    technologies: state.technologies.map((tech) =>
      tech._id === technologyId ? { ...tech, topics } : tech
    ),
  }))
);
