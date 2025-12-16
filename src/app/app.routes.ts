import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { ContentLayoutComponent } from './component/content-layout/content-layout.component';
import { DraftsComponent } from './component/drafts/drafts.component';
import { StarredComponent } from './component/starred/starred.component';
import { RecentComponent } from './component/recent/recent.component';
import { FeedComponent } from './component/feed/feed.component';

export const routes: Routes = [
  // {
  //   path:'course/:technology/:topic/:category/:mode',
  //   loadComponent: () => import('./components/data-layout/data-layout.component').then(m => m.DataLayoutComponent)
  // }
  {
    path: '',
    component: LayoutComponent,
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
        component: ContentLayoutComponent
      }
    ]
  },
];
