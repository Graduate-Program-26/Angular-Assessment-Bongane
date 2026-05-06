import { Component, computed, DestroyRef, inject, model } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SearchItemActions } from '../../search/search-item-actions/search-item-actions';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { NzCheckListModule, NzItemProps } from 'ng-zorro-antd/check-list';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { SearchService } from '../../../services/search-service';
import { SearchItem } from '../../../models/search-item.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlaylistStore } from '../store/playlist.store';
import { NgOptimizedImage } from '@angular/common';
import { PlaylistService } from '../../../services/playlist-service';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../../../models/playlist.model';
import { Track } from '../../../models/track.model';

@Component({
  selector: 'app-playlist-page',
  imports: [NzImageModule, NzListModule, NzTableModule, NzCheckListModule],
  templateUrl: './playlist-page.html',
  styleUrl: './playlist-page.scss',
})
export class PlaylistPage {
  private store = inject(PlaylistStore);
  private readonly route = inject(ActivatedRoute);

  playlistId!: string | null;
  currentPlaylist = computed(() =>
    this.store.playlists().find((p) => p.id === Number(this.playlistId)),
  );
  tracks!: Track;

  constructor() {
    this.store.loadBooks();
    this.playlistId = this.route.snapshot.paramMap.get('id');
  }
}
