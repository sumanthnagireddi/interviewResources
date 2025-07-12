import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'course/:technology/:topic/:category/:mode',
    loadComponent: () => import('./components/data-layout/data-layout.component').then(m => m.DataLayoutComponent)
  }
];
