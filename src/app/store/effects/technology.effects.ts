import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addTechnology, addTechnologyFailure, addTechnologySuccess, getTechnologies, getTechnologiesFailure, getTechnologiesSuccess } from './../actions/technology.actions';
import { inject, Injectable } from "@angular/core";
import { ResourcesService } from "../../services/resources.service";
import { catchError, exhaustMap, map, of } from 'rxjs';
import { TechnologyService } from '../../services/technology.service';
import { get } from '@angular/fire/database';

@Injectable()
export class TechnologyEffects {
  private actions$ = inject(Actions);

  constructor(private technologyService: TechnologyService) { }

  addTechnology$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTechnology),
      exhaustMap(({ technologyName }) =>
        this.technologyService.addTechnology(technologyName).pipe(
          map(() => {
            return addTechnologySuccess()
          }),
          catchError((error) => {
            console.error('Error adding technology', error);
            return of(addTechnologyFailure({ error }));
          })
        )
      )
    )
  );

  getTechnologies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTechnologies),
      exhaustMap(() =>
        this.technologyService.getTechnologies().pipe(
          map((technologies) => {
            return getTechnologiesSuccess({ technologies });
          }),
          catchError((error) => {
            console.error('Error getting technologies', error);
            return of(getTechnologiesFailure({ error }));
          })
        )
      )
    )
  )
}
