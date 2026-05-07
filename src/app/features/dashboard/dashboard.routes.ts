import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'playlist/:id',
    loadComponent: () =>
      import('../playlist/playlist-page/playlist-page').then((m) => m.PlaylistPage),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('../search/search-results-card/search-results-card').then((c) => c.SearchResultsCard),
  },
  {
    path: 'new-playlist',
    loadComponent: () =>
      import('../playlist/new-playlist-form/new-playlist-form').then((c) => c.NewPlaylistForm),
  },
];
