import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing-page/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'dashboard',
    loadComponent : () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
    title : 'Dashboard'
  },
];
