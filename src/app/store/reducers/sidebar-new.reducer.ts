import { createReducer, on, State } from "@ngrx/store"
import { loadCurrentContent, loadSubTechnologies, loadTechnologies, setCurrentContent, setSubTechnologies, setTechnologies, toggleSidebar } from "../actions/sidebar.actions"

export interface Technologies {
  data: any[];
  loading: boolean;
  error?: string;
}

export interface SubTechnologies {
  data: any[];
  loading: boolean;
  error?: string;
}

export interface SidebarState {
  technologies: Technologies;
  subTechnologies: SubTechnologies;
  content?: {
    data: any;
    loading: boolean;
  };
  showSidebar: boolean;
}


export const initialState: SidebarState = {
  technologies: {
    data: [],
    loading: false
  },
  subTechnologies: {
    data: [],
    loading: false
  },
  content: {
    data: null,
    loading: false
  },
  showSidebar: false
};


export const sidebarReducer = createReducer(
  initialState,
  on(toggleSidebar, (state,{show}) => ({
    ...state,
    showSidebar: show
  })),
  on(loadTechnologies, (state) => ({
    ...state,
    technologies: {
      ...state.technologies,
      loading: true,
      data: []
    }
  })),
  on(setTechnologies, (state, { technologies }) => ({
    ...state,
    technologies: {
      data: technologies,
      loading: false
    }
  })),

  on(loadSubTechnologies, (state) => ({
    ...state,
    subTechnologies: {
      ...state.subTechnologies,
      loading: true
    }
  })),
  on(setSubTechnologies, (state, { subTechnologies }) => ({
    ...state,
    subTechnologies: {
      data: subTechnologies,
      loading: false
    }
  })),
  on(loadCurrentContent, (state, { contentID }) => ({
    ...state,
    content: {
      ...state.content,
      loading: true,
      data: null
    }
  })),
  on(setCurrentContent, (state, { content }) => ({
    ...state,
    content: {
      data: content,
      loading: false
    }
  }))
);

