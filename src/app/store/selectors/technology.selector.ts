import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TechnologyState } from "../reducers/technology.reducer";
export const selectTechnologiesState = createFeatureSelector<TechnologyState>('technologies');

export const selectTechnologies = createSelector(
  selectTechnologiesState,
  (state: TechnologyState) => state?.technologies || []
);
