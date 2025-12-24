// dialog.actions.ts
import { createAction, props } from '@ngrx/store';
import { DialogConfig } from '../../model/dialog.model';

export const openDialog = createAction(
  '[Dialog] Open',
  props<{ config: DialogConfig }>()
);

export const closeDialog = createAction('[Dialog] Close');
