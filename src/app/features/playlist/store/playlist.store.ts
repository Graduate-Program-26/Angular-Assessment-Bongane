import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Playlist, PlaylistTrack } from '../../../models/playlist.model';
import { inject } from '@angular/core';
import { PlaylistPersistanceService } from '../../../services/playlist-persistance-service';
import { LocalPlaylist } from '../../../models/local-playlist-model';
import { SearchItem } from '../../../models/search-item.model';

type PlaylistState = {
  playlists: Playlist[];
  localPlaylists: LocalPlaylist[];
  isLoading: boolean;
  currentPlaylist?: Playlist;
};

const initialState: PlaylistState = {
  playlists: [],
  localPlaylists: [],
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

    addLocalPlaylist(playlist: LocalPlaylist): void {
      patchState(store, (state) => ({
        localPlaylists: [...state.localPlaylists, playlist],
      }));
      persistance.addLocalPlaylist?.(playlist);
    },
    addTrackToLocalPlaylist(playlistId: number, track: SearchItem) {
      const updatedPlaylists = store.localPlaylists().map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              tracks: playlist.tracks.some((t) => t.id === track.id)
                ? playlist.tracks
                : [...playlist.tracks, track],
            }
          : playlist,
      );

      patchState(store, { localPlaylists: updatedPlaylists });

      persistance.addTrackToLocalPlaylist(playlistId, track);
    },

    removeTrackFromLocalPlyalist(playlistId: number, track: SearchItem) {
      const updatedPlaylists = store.localPlaylists().map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,

              tracks: playlist.tracks.filter((t) => t.id !== track.id),
            }
          : playlist,
      );

      patchState(store, {
        localPlaylists: updatedPlaylists,
      });

      persistance.removeTrackFromLocalPlaylist(playlistId, track);
    },
    getLocalPlaylist(playlistId: number): LocalPlaylist | undefined {
      const playlistFound = store.localPlaylists().find((playlist) => playlist.id === playlistId);
   
      return playlistFound;
    },

    updateLocalPlaylistPicture(id: number, pictureUrl: string): void {
      patchState(store, (state) => ({
        localPlaylists: state.localPlaylists.map((p) =>
          p.id === id ? { ...p, picture: pictureUrl } : p,
        ),
      }));
    },
    getPlaylist(playlistId: number): Playlist | undefined {
      const playlistFound = store.playlists().find((playlist) => playlist.id === playlistId);
      
      return playlistFound;
    },
    async loadPlaylists() {
      patchState(store, { isLoading: true });

      const playlists = await persistance.loadPlaylists();

      patchState(store, {
        playlists: playlists,
        isLoading: false,
      });
    },
    async loadLocalPlaylists() {
      patchState(store, { isLoading: true });

      const playlists = await persistance.loadLocalPlaylists();

      patchState(store, {
        localPlaylists: playlists,
        isLoading: false,
      });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadPlaylists();
      store.loadLocalPlaylists();
    },
  }),
);
