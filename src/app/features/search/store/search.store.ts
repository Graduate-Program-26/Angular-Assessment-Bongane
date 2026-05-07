import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { SearchItem } from '../../../models/search-item.model';
import { DestroyRef, inject } from '@angular/core';
import { SearchService } from '../../../services/search-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap, filter } from 'rxjs';

type SearchState = {
  searchValue: string;
  searchItems: SearchItem[];
  error: string | null;
  hasMore: boolean;
  isLoading: boolean;
  nextUrl: string | null;
};

const initialState: SearchState = {
  searchValue: '',
  searchItems: [],
  error: null,
  hasMore: false,
  isLoading: false,
  nextUrl: null,
};

export const SearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    searchService: inject(SearchService),
    destroyRef: inject(DestroyRef),
  })),
  withMethods(({ searchService, destroyRef, ...store }) => {
    const loadMore = () => {
      const next = store.nextUrl();
      if (!next || store.isLoading()) return;
      patchState(store, { isLoading: true });
      searchService
        .searchNext(next)
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe({
          next: (res) => {
            patchState(store, {
              searchItems: [...store.searchItems(), ...res.data],
              nextUrl: res.next,
              hasMore: !!res.next,
              isLoading: false,
            });
          },
          error: (err) => {
            patchState(store, {
              error: err.message,
              isLoading: false,
            });
          },
        });
    };

    const search = rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((query) => query.trim().length > 0), // Skip empty queries
        tap(() =>
          patchState(store, {
            searchItems: [],
            hasMore: true,
            nextUrl: null,
            error: null,
            isLoading: true,
          }),
        ),
        switchMap((query) => searchService.search(query)),
        tap({
          next: (res) => {
            patchState(store, {
              searchItems: res.data,
              nextUrl: res.next,
              hasMore: !!res.next,
              isLoading: false,
            });
          },
          error: (err) => {
            patchState(store, {
              error: err.message,
              isLoading: false,
            });
          },
        }),
      ),
    );

    return {
      loadMore,

      onScrolledIndexChange(index: number) {
        const nearEnd = index >= store.searchItems().length - 13;
        if (nearEnd && !store.isLoading() && store.hasMore()) {
          loadMore();
        }
      },

      search,
    };
  }),
);
