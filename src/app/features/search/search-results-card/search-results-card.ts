import { Component, DestroyRef, inject, input, model } from '@angular/core';
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

@Component({
  selector: 'app-search-results-card',
  imports: [
    NzListModule,
    SearchItemActions,
    NzSkeletonComponent,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
  ],
  templateUrl: './search-results-card.html',
  styleUrl: './search-results-card.scss',
})
export class SearchResultsCard {
  searchStore = inject(SearchStore);
  searchItems = this.searchStore.searchItems;
  isLoading = this.searchStore.isLoading;
  hasMore = this.searchStore.hasMore;
  nextUrl = this.searchStore.nextUrl;
  error = this.searchStore.error;

  trackById(index: number, item: SearchItem) {
    return item.id;
  }

  onScrolledIndexChange(index: number) {
    this.searchStore.onScrolledIndexChange(index);
  }
}
