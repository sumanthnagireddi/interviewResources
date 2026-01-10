import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import {  exhaustMap, map, of } from 'rxjs';
import { ContentService } from '../../services/content.service';
import {
  loadTopContents,
  loadTopContentsSuccess,
} from '../actions/content.actions';

@Injectable()
export class ContentEffects {
  private actions$ = inject(Actions);

  constructor(private contentService: ContentService) {}

  loadTechnologies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTopContents),
      exhaustMap(() =>
        this.contentService.getContents().pipe(
          map((content: any) => {
            return loadTopContentsSuccess({ topContents: content });
          })
        )
      )
    )
  );
  // getRecentVisited$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadRecentVisited),
  //     exhaustMap(() =>
  //       this.contentService.getAllRecentViewed(6).pipe(
  //         map((content) => {
  //           console.log(content);
  //           return updateRecentVisited({ recentContent: content });
  //         })
  //       )
  //     )
  //   )
  // );
}
