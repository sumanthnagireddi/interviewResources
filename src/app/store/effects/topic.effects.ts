import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addTechnologyFailure,
  addTopic,
  addTopicSuccess,
  deleteTopic,
  editTopic,
  getTechnologies,
  getTopics,
  getTopicsFailure,
  getTopicsSuccess,
} from './../actions/technology.actions';
import { inject, Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TopicsService } from '../../services/topics.service';
@Injectable()
export class TopicEffects {
  private actions$ = inject(Actions);

  constructor(private topicService: TopicsService, private router: Router) { }
  addTopic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTopic),
      exhaustMap(({ technologyId, topic, topic_description }) =>
        this.topicService
          .addTopic({
            technologyId: technologyId,
            title: topic,
            topic_description,
          })
          .pipe(
            catchError((error) => of(addTechnologyFailure({ error }))),
            map((topic: any) => {
              return addTopicSuccess({
                technologyId: topic?.technologyId,
                topic: topic?._id,
              });
            })
          )
      )
    )
  );
  getTopicsByTechID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTopics),
      exhaustMap(({ technologyId }) =>
        this.topicService.getAllTopicsByTechID(technologyId).pipe(
          map((topics: any) => {
            console.log('technologies', topics);
            return getTopicsSuccess({
              technologyId: technologyId,
              topics: topics,
            });
          }),
          catchError((error) => {
            console.error('Error getting technologies', error);
            return of(getTopicsFailure({ error }));
          })
        )
      )
    )
  );
  updateTopic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTopic),
      exhaustMap(({ topic, topic_description, topicId }) =>
        this.topicService
          .updateTopic({
            name: topic,
            topic_description: topic_description,
            topicId: topicId,
          })
          .pipe(
            catchError((error) => of(addTechnologyFailure({ error }))),
            map(() => {
              return getTechnologies();
            })
          )
      )
    )
  );
  deleteTopic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTopic),
      exhaustMap(({ topicId }) =>
        this.topicService.deleteTopic(topicId).pipe(
          catchError((error) => of(addTechnologyFailure({ error }))),
          map((technology: any) => {
            return getTechnologies();
          })
        )
      )
    )
  );
  navigateAfterAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTopicSuccess),

      tap(({ topic }) => {
        console.log('');
        this.router.navigate(['create-new', topic]);
      }),

      map(() => getTechnologies())
    )
  );
}
