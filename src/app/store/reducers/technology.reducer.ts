import { createReducer, on } from "@ngrx/store";
import { getTechnologiesSuccess } from "../actions/technology.actions";
import { Technology } from "../../model/content.model";

export interface TechnologyState {
  technologies: Technology[];
}
export const initialState: TechnologyState = {
  technologies: []
};


export const technologyReducer = createReducer(
  initialState,
  on(getTechnologiesSuccess, (state, { technologies }) => ({
    ...state,
    technologies: technologies
  })),
);
