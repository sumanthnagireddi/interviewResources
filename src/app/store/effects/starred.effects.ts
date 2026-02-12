import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { StarredService } from '../../services/starred.service';
import { ContentService } from '../../services/content.service';
import {
  toggleStarred,
  toggleStarredSuccess,
  toggleStarredFailure,
  loadStarredContent,
  loadStarredContentSuccess,
  loadStarredContentFailure,
  addToStarred,
  addToStarredSuccess,
  addToStarredFailure,
  removeFromStarred,
  removeFromStarredSuccess,
  removeFromStarredFailure,
  clearAllStarred,
  clearAllStarredSuccess,
  clearAllStarredFailure,
} from '../actions/starred.actions';
import { Store } from '@ngrx/store';
import { selectAllContent } from '../selectors/content.selector';

@Injectable()
export class StarredEffects {
  private actions$ = inject(Actions);
  private starredService = inject(StarredService);
  private contentService = inject(ContentService);
  private store = inject(Store);

  /**
   * Toggle starred status for a content item
   */
  toggleStarred$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleStarred),
      exhaustMap(({ contentId }) =>
        this.starredService.toggleStarred(contentId).pipe(
          map(({ contentId, isStarred }) =>
            toggleStarredSuccess({ contentId, isStarred })
          ),
          catchError((error) => of(toggleStarredFailure({ error })))
        )
      )
    )
  );

  /**
   * Add content to starred list
   */
  addToStarred$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToStarred),
      exhaustMap(({ contentId }) =>
        this.starredService.addToStarred(contentId).pipe(
          map(({ contentId }) => addToStarredSuccess({ contentId })),
          catchError((error) => of(addToStarredFailure({ error })))
        )
      )
    )
  );

  /**
   * Remove content from starred list
   */
  removeFromStarred$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromStarred),
      exhaustMap(({ contentId }) =>
        this.starredService.removeFromStarred(contentId).pipe(
          map(({ contentId }) => removeFromStarredSuccess({ contentId })),
          catchError((error) => of(removeFromStarredFailure({ error })))
        )
      )
    )
  );

  /**
   * Load all starred content with full details
   * This fetches the starred IDs from storage and then loads the full content
   */
  loadStarredContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStarredContent),
      withLatestFrom(this.store.select(selectAllContent)),
      exhaustMap(([action, allContent]) => {
        const starredIds = this.starredService.getStarredIds();

        // Filter content from the existing content in the store
        const starredContent = allContent.filter((content: any) =>
          starredIds.includes(content.id || content._id)
        );

        return of(
          loadStarredContentSuccess({
            starredContent,
            starredIds,
          })
        );
      }),
      catchError((error) => of(loadStarredContentFailure({ error })))
    )
  );

  /**
   * Clear all starred items
   */
  clearAllStarred$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearAllStarred),
      exhaustMap(() =>
        this.starredService.clearAllStarred().pipe(
          map(() => clearAllStarredSuccess()),
          catchError((error) => of(clearAllStarredFailure({ error })))
        )
      )
    )
  );
}
