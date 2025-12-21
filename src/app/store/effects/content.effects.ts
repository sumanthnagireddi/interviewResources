import { loadTechnologies } from './../actions/sidebar.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addTechnology, addTechnologyFailure, addTechnologySuccess, getTechnologies, getTechnologiesFailure, getTechnologiesSuccess } from './../actions/technology.actions';
import { inject, Injectable } from "@angular/core";
import { ResourcesService } from "../../services/resources.service";
import { catchError, exhaustMap, map, of } from 'rxjs';
import { TechnologyService } from '../../services/technology.service';
import { get } from '@angular/fire/database';
import { ContentService } from '../../services/content.service';
import { loadRecentVisited, loadTopContents, loadTopContentsSuccess, updateRecentVisited } from '../actions/content.actions';

@Injectable()
export class ContentEffects {
  private actions$ = inject(Actions);

  constructor(private contentService: ContentService) { }

  loadTechnologies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTopContents),
      exhaustMap(() =>
        this.contentService.getAllContents(3).pipe(
          map((content) => {
            return loadTopContentsSuccess({ topContents: content })
          }),
        )
      )
    )
  );
  getRecentVisited$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecentVisited),
      exhaustMap(() =>
        this.contentService.getAllRecentViewed(6).pipe(
          map((content) => {
            console.log(content)
            return updateRecentVisited({ recentContent: content })
          }),
        )
      )
    )
  );
}
