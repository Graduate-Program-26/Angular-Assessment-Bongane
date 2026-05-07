import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: ':id/playlist',
    loadComponent: () =>
      import('../playlist/playlist-page/playlist-page').then((m) => m.PlaylistPage),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('../search/search-results-card/search-results-card').then((c) => c.SearchResultsCard),
  },
];
