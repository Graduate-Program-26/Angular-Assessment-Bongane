import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { Playlist, PlaylistTrack } from '../../../models/playlist.model';
import { inject } from '@angular/core';
import { PlaylistPersistanceService } from '../../../services/playlist-persistance-service';

type PlaylistState = {
  playlists: Playlist[];
  isLoading: boolean;
  currentPlaylist?: Playlist;
};

const initialState: PlaylistState = {
  playlists: [],
  isLoading: false,
};

export const PlaylistStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    persistance: inject(PlaylistPersistanceService),
  })),
  withMethods(({ persistance, ...store }) => ({
    addTrack(playlistId: number, track: PlaylistTrack): void {
      const updatedPlaylists = store.playlists().map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              tracks: {
                data: playlist.tracks.data.some((t) => t.id === track.id)
                  ? playlist.tracks.data
                  : [...playlist.tracks.data, track],
                checksum: playlist.tracks.checksum,
              },
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
    getPlaylist(playlistId: number): Playlist | undefined {
      return store.playlists().find((playlist) => playlist.id === playlistId);
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
