import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Track } from '../../../models/track.model';
import { Playlist, PlaylistTrack } from '../../../models/playlist.model';

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
  withMethods((store) => ({
    addTrack(playlistId: number, track: PlaylistTrack): void {
      patchState(store, (state) => ({
        playlists: state.playlists.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                tracks: [...playlist.tracks, track],
                nb_tracks: playlist.nb_tracks + 1,
              }
            : playlist,
        ),
      }));
    },
    addPlaylist(playlist: Playlist): void {
      patchState(store, (state) => ({
        playlists: [...state.playlists, playlist],
      }));
    },
  })),
);
