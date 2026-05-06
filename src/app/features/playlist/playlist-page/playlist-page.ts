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
import { PlaylistTrack } from '../../../models/playlist.model';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

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

  playlistId!: string | null;
  currentPlaylist = computed(() =>
    this.store.playlists().find((p) => p.id === Number(this.playlistId)),
  );
  tracks!: Track;

  constructor() {
    this.store.loadBooks();
    this.playlistId = this.route.snapshot.paramMap.get('id');
  }

  trackById(index: number, track: PlaylistTrack) {
    return track.id;
  }
}
