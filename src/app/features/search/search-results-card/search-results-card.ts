import { Component, DestroyRef, inject, input, model, output } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { SearchItemActions } from '../search-item-actions/search-item-actions';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { SearchItem } from '../../../models/search-item.model';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { SearchService } from '../../../services/search-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchStore } from '../store/search.store';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { PlaylistStore } from '../../playlist/store/playlist.store';

@Component({
  selector: 'app-search-results-card',
  imports: [
    NzListModule,
    NzSkeletonComponent,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    NzButtonComponent,
  ],
  templateUrl: './search-results-card.html',
  styleUrl: './search-results-card.scss',
})
export class SearchResultsCard {
  private readonly searchStore = inject(SearchStore);
  private readonly plyalistStore = inject(PlaylistStore);
  searchItems = this.searchStore.searchItems;
  isLoading = this.searchStore.isLoading;
  hasMore = this.searchStore.hasMore;
  nextUrl = this.searchStore.nextUrl;
  error = this.searchStore.error;

  playlistCreation = input<boolean>(false);

  searchItem = output<SearchItem>();

  trackById(index: number, item: SearchItem) {
    return item.id;
  }

  onScrolledIndexChange(index: number) {
    this.searchStore.onScrolledIndexChange(index);
  }

  addSong(searchItem: SearchItem) {
    this.searchItem.emit(searchItem);
  }
}
