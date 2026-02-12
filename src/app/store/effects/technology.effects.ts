import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addTechnology,
  addTechnologyFailure,
  addTechnologySuccess,
  addTopic,
  addTopicSuccess,
  deleteTechnology,
  editTechnology,
  getTechnologies,
  getTechnologiesFailure,
  getTechnologiesSuccess,
} from './../actions/technology.actions';
import { inject, Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { TechnologyService } from '../../services/technology.service';
import { Router } from '@angular/router';
@Injectable()
export class TechnologyEffects {
  private actions$ = inject(Actions);

  constructor(
    private technologyService: TechnologyService,
    private router: Router
  ) {}
  addTechnology$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTechnology),
      exhaustMap(({ technology }) =>
        this.technologyService.addTechnologyToMongo(technology).pipe(
          catchError((error) => of(addTechnologyFailure({ error }))),
          map((technology: any) => {
            return addTechnologySuccess(technology);
          })
        )
      )
    )
  );
  updateTechnology$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTechnology),
      exhaustMap(({ technology }) =>
        this.technologyService.updateTechnology(technology).pipe(
          catchError((error) => of(addTechnologyFailure({ error }))),
          map((technology: any) => {
            return addTechnologySuccess(technology);
          })
        )
      )
    )
  );
  deleteTechnology$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTechnology),
      exhaustMap(({ technologyId }) =>
        this.technologyService.deleteTechnology(technologyId).pipe(
          catchError((error) => of(addTechnologyFailure({ error }))),
          map((technology: any) => {
            return addTechnologySuccess(technology);
          })
        )
      )
    )
  );
  // addTechnology$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addTechnology),
  //     exhaustMap(({ technologyName }) =>
  //       this.technologyService.addTechnology(technologyName).pipe(
  //         map((technology) => {
  //           return technology?.topic
  //             ? addTopic({
  //                 technology: { ...technology, topic: technology.topic },
  //               })
  //             : addTechnologySuccess({ technology });
  //         }),
  //         catchError((error) => of(addTechnologyFailure({ error })))
  //       )
  //     )
  //   )
  // );
  // addTopic$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addTopic),
  //     exhaustMap(({ technology }) =>
  //       this.technologyService.addTopic(technology).pipe(
  //         map((technology) => {
  //           return addTopicSuccess({ technology: technology });
  //         }),
  //         catchError((error) => of(addTechnologyFailure({ error })))
  //       )
  //     )
  //   )
  // );

  getTechnologies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTechnologies),
      exhaustMap(() =>
        this.technologyService.getTechnologiesWithTopics().pipe(
          map((technologies:any) => {
            console.log('technologies with nested topics', technologies);
            return getTechnologiesSuccess({ technologies });
          }),
          catchError((error) => {
            console.error('Error getting technologies', error);
            return of(getTechnologiesFailure({ error }));
          })
        )
      )
    )
  );
  navigateAfterAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTopicSuccess),
      map(() => getTechnologies())
    )
  );
}
