import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search-service';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { SearchItem } from '../../models/search-item.model';
import { debounceTime, distinctUntilChanged, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    NzListModule,
    NzSkeletonModule,
    NzPopoverModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  searchValue = signal('');
  searchItems = signal<SearchItem[]>([]);
  error = signal<string | null>(null);
  hasMore = signal(true);
  offset = signal(0);
  isLoading = signal(false);
  nextUrl = signal<string | null>(null);
  visible = false;

  activePopoverId = signal<number | null>(null);

  togglePopover(id: number) {
    this.activePopoverId.set(this.activePopoverId() === id ? null : id);
  }

  change(value: boolean) {}

  closePopover(id: number) {
    if (this.activePopoverId() === id) {
      this.activePopoverId.set(null);
    }
  }

  private readonly searchService = inject(SearchService);
  private readonly destroyRef = inject(DestroyRef);
  private searchSubject = new Subject<string>();

  private readonly searchSubsciption = this.searchSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.searchItems.set([]);
        this.hasMore.set(true);
        this.nextUrl.set(null);
        this.offset.set(0);
        this.error.set(null);
        this.isLoading.set(true);
      }),
      switchMap((query) => this.searchService.search(query)),
      takeUntilDestroyed(),
    )
    .subscribe({
      next: (res) => {
        this.searchItems.set(res.data);
        this.nextUrl.set(res.next);
        this.hasMore.set(!!res.next);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      },
    });

  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }

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
