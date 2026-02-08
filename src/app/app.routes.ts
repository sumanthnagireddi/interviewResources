import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { ContentLayoutComponent } from './pages/content-layout/content-layout.component';
import { DraftsComponent } from './component/drafts/drafts.component';
import { StarredComponent } from './pages/starred/starred.component';
import { FeedComponent } from './component/feed/feed.component';
import { RecentComponent } from './pages/recent/recent.component';
import { CreateDocComponent } from './pages/create-doc/create-doc.component';
import { EditDocComponent } from './pages/edit-doc/edit-doc.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SwaggerComponent } from './pages/swagger/swagger.component';
import { ViewBlogComponent } from './pages/blogs/subpages/view-blog/view-blog.component';
import { CreateBlogComponent } from './pages/blogs/subpages/create-blog/create-blog.component';
import { AdminComponent } from './pages/blogs/subpages/admin/admin.component';
import { BlogsHomeComponent } from './pages/blogs/subpages/blogs-home/blogs-home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'home',
        component: FeedComponent,
      },
      {
        path: 'recent',
        component: RecentComponent,
      },
      {
        path: 'starred',
        component: StarredComponent,
      },
      {
        path: 'drafts',
        component: DraftsComponent,
      },
      {
        path: 'pages/:pageId',
        component: ContentLayoutComponent,
      },
      {
        path: 'create-new/:pageId',
        component: CreateDocComponent,
      },
      {
        path: 'edit/:pageId',
        component: EditDocComponent,
      },
      {
        path: 'blogs',
        component: BlogsComponent,
        children: [
          {
            path: '',
            component: BlogsHomeComponent,
          },
          {
            path: 'view/:blogId',
            component: ViewBlogComponent,
          },
          {
            path: 'create-blog',
            component: CreateBlogComponent,
          },
          {
            path: 'admin',
            component: AdminComponent,
          },
        ],
      },
      {
        path: 'api-docs',
        component: SwaggerComponent,
      },
    ],
  },
];
