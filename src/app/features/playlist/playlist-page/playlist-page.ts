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
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from '../../../models/track.model';
import { Playlist, PlaylistTrack } from '../../../models/playlist.model';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchItem } from '../../../models/search-item.model';
import { LocalPlaylist } from '../../../models/local-playlist-model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DurationPipe } from '../../../shared/pipes/duration-pipe-pipe';
import { T } from '@angular/cdk/keycodes';
import { UnifiedTrack } from '../../../shared/models/unified-track';
import { ArtistLink } from "../../artist/artist-link/artist-link";

interface UnifiedPlaylist {
  id: number;
  title: string;
  picture_medium: string;
  duration: number;
  tracks: { data: UnifiedTrack[] };
  isLocal: boolean;
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
    NzIconModule,
    NzButtonComponent,
    NzPopconfirmModule,
    DurationPipe,
    ArtistLink
],
  templateUrl: './playlist-page.html',
  styleUrl: './playlist-page.scss',
})
export class PlaylistPage {
  private readonly store = inject(PlaylistStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService);

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
      duration: api.duration,
      picture_medium: api.picture_medium,
      tracks: {
        data: api.tracks.data.map((t) => ({
          id: t.id,
          link : t.link,
          title: t.title,
          artist: { name: t.artist.name, id: t.artist.id },
          duration: t.duration,
          album: { cover_small: t.album.cover_small },
          preview: t.preview,
        })),
      },
      isLocal: false,
    };
  }

  private mapLocalPlaylist(localPlaylist: LocalPlaylist): UnifiedPlaylist {
    return {
      id: localPlaylist.id,
      title: localPlaylist.title,
      picture_medium: localPlaylist.picture,
      duration: localPlaylist.duration,
      tracks: {
        data: localPlaylist.tracks.map((localTrack) => ({
          id: localTrack.id,
          title: localTrack.title,
          artist: { name: localTrack.artist.name , id: localTrack.artist.id},
          album: { cover_small: localTrack.album.cover },
          duration: localTrack.duration,
          preview: localTrack.preview,
          link : localTrack.link
        })),
      },
      isLocal: true,
    };
  }

  trackById(index: number, track: PlaylistTrack | SearchItem) {
    return track.id;
  }

  editPlaylist() {
    this.router.navigate(['dashboard', 'edit-playlist', this.currentPlaylist()?.id]);
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  deletePlaylist() {
    this.store.removeLocalPlaylist(this.currentPlaylist()?.id ?? 0);
    this.createMessage('error', 'Playlist deleted');
    this.router.navigate(['dashboard', 'new-playlist']);
  }

  getPlaylistStats() {
    return {
      nb_tracks: this.currentPlaylist()?.tracks.data.length,
      duration: this.currentPlaylist()?.duration,
    };
  }

  changeSelectedTrack(track: UnifiedTrack) {
    console.log(track);
    this.store.setSelectedTrack(track);
  }

  cancel() {}
}
