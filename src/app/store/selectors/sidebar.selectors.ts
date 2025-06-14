import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SidebarState } from "../reducers/sidebar.reducer";

export const selectAppState = createFeatureSelector<SidebarState>('sidebar');


export const selectTechnologies= createSelector(
  selectAppState,
  (state: SidebarState) => state?.technologies
);

export const selectSubTechnologies = createSelector(
  selectAppState,
  (state: SidebarState) => state?.subTechnologies
);


export const selectCurentContent = createSelector(
  selectAppState,
  (state: SidebarState) => state?.content
);
