import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing-page/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
    title: 'Dashboard',
  },
  {
    path: ':id/playlist',
    loadComponent: () =>
      import('./features/playlist/playlist-page/playlist-page').then((m) => m.PlaylistPage),
    title: 'Playlists',
  },
  {
    path: 'library',
    loadComponent: () => import('./features/library/library').then((m) => m.Library),
    title: 'Library',
  },
];
