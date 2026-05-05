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

@Component({
  selector: 'app-dashboard',
  imports: [NzInputModule, NzIconModule, FormsModule, NzListModule, SearchResultsCard, SearchInput],
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

  private readonly searchService = inject(SearchService);
  protected searchSubject = new Subject<string>();

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
}
