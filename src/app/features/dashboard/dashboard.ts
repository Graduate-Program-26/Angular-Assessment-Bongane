import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search-service';
import { NzListModule } from 'ng-zorro-antd/list';
import { SearchItem } from '../../models/search-item.model';
import { debounceTime, distinctUntilChanged, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchResultsCard } from '../search/search-results-card/search-results-card';
import { SearchInput } from '../search/search-input/search-input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SearchItemActions } from '../search/search-item-actions/search-item-actions';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    NzInputModule,
    NzIconModule,
    FormsModule,
    NzListModule,
    SearchResultsCard,
    SearchInput,
    NzCardModule,
    SearchItemActions,
    NzListModule,
    SearchItemActions,
    NzSkeletonComponent,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    NzButtonComponent,
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

  imageUrl = 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png';

  protected searchSubject = new Subject<string>();
  private readonly searchService = inject(SearchService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

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

  trackById(index: number, item: SearchItem) {
    return item.id;
  }

  createNewPlaylist() {
    this.router.navigate(['/playlists']);
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
