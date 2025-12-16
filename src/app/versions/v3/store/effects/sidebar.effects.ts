// import { Injectable, inject } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { map, exhaustMap, catchError } from 'rxjs/operators';
// import { ResourcesService } from '../../services/resources.service';
// import {
//   addCategory,
//   addCategoryFailure,
//   addCategorySuccess,
//   loadCurrentContent,
//   loadSubTechnologies,
//   loadTechnologies,
//   setCurrentContent,
//   setNewCurrentContent,
//   setSubTechnologies,
//   setTechnologies,
//   updateCurrentContent,
// } from '../actions/sidebar.actions';

// @Injectable()
// export class SidebarEffects {
//   private actions$ = inject(Actions);
//   private resourcesService = inject(ResourcesService);

//   loadTechnologies$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadTechnologies),
//       exhaustMap(() =>
//         this.resourcesService.getTechnologies().pipe(
//           map((technologies) => setTechnologies({ technologies })),
//           catchError((error) => {
//             console.error('Error loading technologies', error);
//             return of();
//           })
//         )
//       )
//     )
//   );

//   loadSubTechnologies$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadSubTechnologies),
//       exhaustMap(({ technology }) =>
//         this.resourcesService.getCategoriesByTechnologyId(technology).pipe(
//           map((subTechnologies) => setSubTechnologies({ subTechnologies })),
//           catchError((error) => {
//             console.error('Error loading subTechnologies', error);
//             return of();
//           })
//         )
//       )
//     )
//   );

//   addCategory$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(addCategory),
//       exhaustMap(({ payload }) =>
//         this.resourcesService.addNewCategory(payload).pipe(
//           map(() => {
//             loadSubTechnologies({ technology: payload.parent });
//             return addCategorySuccess({ payload });
//           }),
//           catchError((error) => {
//             console.error('Error adding category', error);
//             return of(addCategoryFailure({ error }));
//           })
//         )
//       )
//     )
//   );

//   getContentById$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadCurrentContent),
//       exhaustMap(({ contentID }) =>
//         this.resourcesService.getTopicById(contentID).pipe(
//           map((content) => setCurrentContent({ content })),
//           catchError((error) => {
//             console.error('Error loading technologies', error);
//             return of();
//           })
//         )
//       )
//     )
//   );
//   updateContentById$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(updateCurrentContent),
//       exhaustMap(({ contentPayload }) =>
//         this.resourcesService.updateTopicContentById(contentPayload).pipe(
//           map((content) => setCurrentContent({ content })),
//           catchError((error) => {
//             console.error('Error loading technologies', error);
//             return of();
//           })
//         )
//       )
//     )
//   );
//   addNewTopicContent$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(setNewCurrentContent),
//       exhaustMap(({ contentPayload }) =>
//         this.resourcesService.addNewTopicContent(contentPayload).pipe(
//           map((content) => setCurrentContent({ content })),
//           catchError((error) => {
//             console.error('Error loading content', error);
//             return of();
//           })
//         )
//       )
//     )
//   );
// }
