import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'course/:category/:mode',
    loadComponent: () => import('./components/data-layout/data-layout.component').then(m => m.DataLayoutComponent)
  }
];
