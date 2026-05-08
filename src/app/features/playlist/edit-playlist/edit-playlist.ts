import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { Component, computed, inject, signal } from '@angular/core';
import { NzCheckListModule } from 'ng-zorro-antd/check-list';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PlaylistStore } from '../store/playlist.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchItem } from '../../../models/search-item.model';
import { SearchInput } from '../../search/search-input/search-input';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SearchStore } from '../../search/store/search.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { SearchResultsCard } from '../../search/search-results-card/search-results-card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-playlist',
  imports: [
    NzImageModule,
    NzListModule,
    NzSkeletonModule,
    NzTableModule,
    NzCheckListModule,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    FormsModule,
    NzIconModule,
    NzInputModule,
    SearchResultsCard,
    NzButtonComponent,
    NzSpaceModule,
    CdkDropList,
  ],
  templateUrl: './edit-playlist.html',
  styleUrl: './edit-playlist.scss',
})
export class EditPlaylist {
  private readonly playlistStore = inject(PlaylistStore);
  private readonly searchStore = inject(SearchStore);
  private readonly route = inject(ActivatedRoute);
  private readonly message = inject(NzMessageService);
  private readonly router = inject(Router);

  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected currentPlaylist = computed(() =>
    this.playlistStore.getLocalPlaylist(Number(this.params().get('id'))),
  );
  protected isLoading = this.playlistStore.isLoading;

  searchValue = this.searchStore.searchValue;
  currentTitle = signal(this.currentPlaylist()?.title ?? '');

  trackById(index: number, track: SearchItem) {
    return track.id;
  }

  onSearchChange(query: string) {
    this.searchStore.search(query);
    console.log(query);
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  onRemoveTrack(track: SearchItem) {
    const playlist = this.currentPlaylist();

    if (!playlist) return;
    this.playlistStore.removeTrackFromLocalPlyalist(playlist.id, track);
    this.createMessage('error', 'Removed from playlist');
  }

  onAddSong(searchItem: SearchItem) {
    const playlist = this.currentPlaylist();

    if (!playlist) return;

    this.playlistStore.addTrackToLocalPlaylist(playlist.id, searchItem);
    this.createMessage('success', 'Added to playlist');
    console.log(this.currentPlaylist()?.tracks);
  }

  savePlaylist() {
    const newTitle = this.currentTitle;
    if (!newTitle) return;
    this.playlistStore.renameLocalPlaylist(this.currentPlaylist()?.id ?? 0, newTitle());
    this.router.navigate(['dashboard', 'playlist', this.currentPlaylist()?.id]);
  }

  onTitleChange(newTitle: string) {
    this.currentTitle.set(newTitle);
  }
}
