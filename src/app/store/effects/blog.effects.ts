import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BlogsService } from '../../services/blogs.service';
import { Router } from '@angular/router';
import { createBlog, createBlogFailure, createBlogSuccess } from '../actions/blog.actions';
import { addTechnologyFailure } from '../actions/technology.actions';
@Injectable()
export class BlogEffects {
  private actions$ = inject(Actions);

  constructor(
    private blogsService: BlogsService,
    private router: Router
  ) { }
  addBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBlog),
      exhaustMap(({ blog }) =>
        this.blogsService.addBlogToMongo(blog).pipe(
          catchError((error) => of(createBlogFailure({ error }))),
          map((technology: any) => {
            return createBlogSuccess(technology);
          })
        )
      )
    ))
}
