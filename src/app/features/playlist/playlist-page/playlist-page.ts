import { Component, DestroyRef, inject, model } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { SearchItemActions } from '../../search/search-item-actions/search-item-actions';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { SearchService } from '../../../services/search-service';
import { SearchItem } from '../../../models/search-item.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-playlist-page',
  imports: [
    NzImageModule,
    NzListModule,
    SearchItemActions,
    NzSkeletonComponent,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
  ],
  templateUrl: './playlist-page.html',
  styleUrl: './playlist-page.scss',
})
export class PlaylistPage {
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
