import { Component, computed, DestroyRef, inject, model } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckListModule } from 'ng-zorro-antd/check-list';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { PlaylistStore } from '../store/playlist.store';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../../../models/track.model';
import { Playlist, PlaylistTrack } from '../../../models/playlist.model';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchItem } from '../../../models/search-item.model';
import { LocalPlaylist } from '../../../models/local-playlist-model';

interface UnifiedPlaylist {
  id: number;
  title: string;
  picture_medium: string;
  tracks: { data: UnifiedTrack[] };
}

interface UnifiedTrack {
  id: number;
  title: string;
  artist: { name: string };
  album: { cover_small: string };
}

@Component({
  selector: 'app-playlist-page',
  imports: [
    NzImageModule,
    NzListModule,
    NzSkeletonModule,
    NzTableModule,
    NzCheckListModule,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
  ],
  templateUrl: './playlist-page.html',
  styleUrl: './playlist-page.scss',
})
export class PlaylistPage {
  private store = inject(PlaylistStore);
  private readonly route = inject(ActivatedRoute);

  protected isLoading = this.store.isLoading;

  readonly playlistId = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  currentPlaylist = computed(() => {
    const id = Number(this.playlistId().get('id'));
    const foundPlaylist = this.store.getPlaylist(id);

    if (foundPlaylist) {
      return this.mapApiPlaylist(foundPlaylist);
    }

    const localPlaylist = this.store.getLocalPlaylist(id);
    return localPlaylist ? this.mapLocalPlaylist(localPlaylist) : null;
  });

  private mapApiPlaylist(api: Playlist): UnifiedPlaylist {
    return {
      id: api.id,
      title: api.title,
      picture_medium: api.picture_medium,
      tracks: {
        data: api.tracks.data.map((t) => ({
          id: t.id,
          title: t.title,
          artist: { name: t.artist.name },
          album: { cover_small: t.album.cover_small },
        })),
      },
    };
  }

  private mapLocalPlaylist(local: LocalPlaylist): UnifiedPlaylist {
    return {
      id: local.id,
      title: local.title, 
      picture_medium: local.picture, 
      tracks: {
        data: local.tracks.map((s) => ({
          id: s.id,
          title: s.title,
          artist: { name: s.artist.name }, 
          album: { cover_small: s.album.cover },
        })),
      },
    };
  }

  tracks!: Track;

  trackById(index: number, track: PlaylistTrack | SearchItem) {
    return track.id;
  }
}
