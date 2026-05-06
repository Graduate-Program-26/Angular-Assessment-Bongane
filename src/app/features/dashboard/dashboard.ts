import { Component, DestroyRef, inject, signal } from '@angular/core';
import { SearchService } from '../../services/search-service';
import { SearchItem } from '../../models/search-item.model';
import { debounceTime, distinctUntilChanged, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchResultsCard } from '../search/search-results-card/search-results-card';
import { SearchInput } from '../search/search-input/search-input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SearchResultsCard, SearchInput],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  searchValue = signal('');
  searchItems = signal<SearchItem[]>([]);
  error = signal<string | null>(null);
  hasMore = signal(true);

  isLoading = signal(false);
  nextUrl = signal<string | null>(null);

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
