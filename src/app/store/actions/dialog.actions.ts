import { createAction, props } from "@ngrx/store";

export enum DialogActionTypes {
  showDialog = '[Dialog] showDialog',
}

export const toggleDialog = createAction(DialogActionTypes.showDialog, props<{ show: boolean, value?: string, level?: string }>());
