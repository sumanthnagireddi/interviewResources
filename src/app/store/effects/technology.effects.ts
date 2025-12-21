import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addTechnology, addTechnologyFailure, addTechnologySuccess, addTopic, addTopicSuccess, getTechnologies, getTechnologiesFailure, getTechnologiesSuccess } from './../actions/technology.actions';
import { inject, Injectable } from "@angular/core";
import { ResourcesService } from "../../services/resources.service";
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { TechnologyService } from '../../services/technology.service';
import { get } from '@angular/fire/database';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from "uuid";
@Injectable()
export class TechnologyEffects {
  private actions$ = inject(Actions);

  constructor(private technologyService: TechnologyService, private router: Router) { }

  addTechnology$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTechnology),
      exhaustMap(({ technologyName }) =>
        this.technologyService.addTechnology(technologyName).pipe(
          map((technology) => {
            return technology?.topic
              ? addTopic({ technology: { ...technology, topic: technology.topic } })
              : addTechnologySuccess({ technology });
          }),
          catchError((error) =>
            of(addTechnologyFailure({ error }))
          )
        )
      )
    )
  );
  addTopic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTopic),
      exhaustMap(({ technology }) =>
        this.technologyService.addTopic(technology).pipe(
          map((technology) => {
            return addTopicSuccess({ technology: technology });
          }),
          catchError((error) =>
            of(addTechnologyFailure({ error }))
          )
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
  navigateAfterAdd$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTechnologySuccess, addTopicSuccess),
        tap(({ technology, }) => {
          this.router.navigate([`/create-new/${technology?.id}-${technology?.name.trim()?.replace(/\s+/g, '-')?.toLowerCase()}`]);
        })
      ),
    { dispatch: false }
  );
}
