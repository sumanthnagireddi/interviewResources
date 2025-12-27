import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addTechnology,
  addTechnologyFailure,
  addTechnologySuccess,
  addTopic,
  addTopicSuccess,
  deleteTechnology,
  deleteTopic,
  editTechnology,
  editTopic,
  getTechnologies,
  getTechnologiesFailure,
  getTechnologiesSuccess,
  getTopics,
  getTopicsFailure,
  getTopicsSuccess,
} from './../actions/technology.actions';
import { inject, Injectable } from '@angular/core';
import { ResourcesService } from '../../services/resources.service';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { TechnologyService } from '../../services/technology.service';
import { get } from '@angular/fire/database';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { TopicsService } from '../../services/topics.service';
@Injectable()
export class TopicEffects {
  private actions$ = inject(Actions);

  constructor(private topicService: TopicsService, private router: Router) {}
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
            topic: topic,
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
