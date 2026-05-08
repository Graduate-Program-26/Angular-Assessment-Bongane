import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { DestroyRef, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { ArtistTrack } from '../models/artist-tracks.model';
import { ArtistTracklistService } from '../shared/services/artist-tracklist-service';


type ArtistTracklistState = {
  artistId: number | null;
  tracks: ArtistTrack[];
  error: string | null;
  isLoading: boolean;
};

const initialState: ArtistTracklistState = {
  artistId: null,
  tracks: [],
  error: null,
  isLoading: false,
};

export const ArtistTracklistStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    artistTracklistService: inject(ArtistTracklistService),
    destroyRef: inject(DestroyRef),
  })),
  withMethods(({ artistTracklistService, ...store }) => {
    const fetchArtistTracks = rxMethod<number>(
      pipe(
        distinctUntilChanged(),
        tap(() =>
          patchState(store, {
            tracks: [],
            error: null,
            isLoading: true,
          }),
        ),
        switchMap((id) => artistTracklistService.fetchArtistTracks(id)),
        tap({
          next: (tracks) => {
            patchState(store, {
              tracks,
              isLoading: false,
            });
          },
          error: (err) => {
            patchState(store, {
              error: err.message,
              isLoading: false,
            });
          },
        }),
      ),
    );

    return { fetchArtistTracks };
  }),
  
);