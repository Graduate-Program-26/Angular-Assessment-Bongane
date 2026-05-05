import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { Track } from '../../../models/track.model';
import { Playlist, PlaylistTrack } from '../../../models/playlist.model';
import { inject } from '@angular/core';
import { PlaylisPersistanceService } from '../../../services/playlist-service';

type PlaylistState = {
  playlists: Playlist[];
  isLoading: boolean;
};

const initialState: PlaylistState = {
  playlists: [],
  isLoading: false,
};

export const PlaylistStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    persistance: inject(PlaylisPersistanceService),
  })),
  withMethods(({ persistance, ...store }) => ({
    addTrack(playlistId: number, track: PlaylistTrack): void {
      const updatedPlaylists = store.playlists().map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              tracks: [...playlist.tracks, track],
              nb_tracks: playlist.nb_tracks + 1,
            }
          : playlist,
      );

      patchState(store, { playlists: updatedPlaylists });

      persistance.addTrackToPlaylist(playlistId, track);
    },
    addPlaylist(playlist: Playlist): void {
      patchState(store, (state) => ({
        playlists: [...state.playlists, playlist],
      }));

      persistance.addPlaylist(playlist);
    },
    async loadBooks() {
      patchState(store, { isLoading: true });

      const playlists = await persistance.loadPlaylists();

      patchState(store, {
        playlists: playlists,
        isLoading: false,
      });
    },
  })),
);
