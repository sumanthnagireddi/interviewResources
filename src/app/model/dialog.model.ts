// dialog.types.ts
export enum DialogType {
  ADD_BLOG = 'ADD_BLOG',
  ADD_TECH = 'ADD_TECH',
  ADD_TOPIC = 'ADD_TOPIC',
  EDIT_TOPIC = 'EDIT_TOPIC',
  EDIT_TECH = 'EDIT_TECH',
  DELETE_TOPIC = 'DELETE_TOPIC',
  DELETE_TECH = 'DELETE_TECH',
}

export interface DialogPayload {
  technologyId?: string;
  topicId?: string;
  data?: any;
}

export interface DialogConfig {
  type: DialogType;
  payload?: DialogPayload;
}
