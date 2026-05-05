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
  searchItems = model.required<SearchItem[]>();
  isLoading = model.required<boolean>();
  hasMore = model.required<boolean>();
  nextUrl = model.required<string | null>();
  error = model.required<string | null>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly searchService = inject(SearchService);

  trackById(index: number, item: SearchItem) {
    return item.id;
  }

  onScrolledIndexChange(index: number) {
    const nearEnd = index >= this.searchItems().length - 13;
    if (nearEnd && !this.isLoading() && this.hasMore()) {
      this.loadMore();
    }
  }

  private loadMore() {
    const next = this.nextUrl();
    if (!next) return;

    this.isLoading.set(true);
    this.searchService
      .searchNext(next)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.searchItems.update((items) => [...items, ...res.data]);
          this.nextUrl.set(res.next);
          this.hasMore.set(!!res.next);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.isLoading.set(false);
        },
      });
  }
}
