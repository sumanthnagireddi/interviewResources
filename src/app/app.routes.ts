import { Routes } from '@angular/router';
import { V3Component } from './versions/v3/v3.component';
import { FeedComponent } from './versions/v3/component/feed/feed.component';
import { RecentComponent } from './versions/v3/component/recent/recent.component';
import { StarredComponent } from './versions/v3/component/starred/starred.component';
import { DraftsComponent } from './versions/v3/component/drafts/drafts.component';

export const routes: Routes = [
  // {
  //   path:'course/:technology/:topic/:category/:mode',
  //   loadComponent: () => import('./components/data-layout/data-layout.component').then(m => m.DataLayoutComponent)
  // }
  {
    path: 'v2',
    component: V3Component,
    children: [
      {
        path: 'home',
        component: FeedComponent
      },
      {
        path: 'recent',
        component: RecentComponent
      },
      {
        path: 'starred',
        component: StarredComponent
      },
      {
        path: 'drafts',
        component: DraftsComponent
      },
      {
        path: 'pages/:pageId',
        loadComponent: () => import('./versions/v3/component/content-layout/content-layout.component').then(m => m.ContentLayoutComponent)
      }
    ]
  },
];
