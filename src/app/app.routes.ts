import { Routes } from '@angular/router';
import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing-page/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    title: 'Dashboard',
  },
  {
    path: 'artist/:id',
    loadComponent : () => import('./features/artist/artist-page/artist-page').then((m) => m.ArtistPage),
    title: 'Artist'
  },
  { path: '**', component: NotFound },
];
