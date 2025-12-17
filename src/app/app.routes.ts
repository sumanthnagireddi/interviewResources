import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { ContentLayoutComponent } from './component/content-layout/content-layout.component';
import { DraftsComponent } from './component/drafts/drafts.component';
import { StarredComponent } from './pages/starred/starred.component';
import { FeedComponent } from './component/feed/feed.component';
import { RecentComponent } from './pages/recent/recent.component';
import { AddDialogComponent } from './component/add-dialog/add-dialog.component';

export const routes: Routes = [{
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
      path: 'pages/:pageId/:mode',
      component: ContentLayoutComponent
    },
  ]
},
];
