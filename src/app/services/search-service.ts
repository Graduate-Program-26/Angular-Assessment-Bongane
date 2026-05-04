import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchItem } from '../models/search-item.model';

interface SearchApiResponse {
  data: SearchItem[];
  next: string;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);

  private readonly BASE_SEARCH_URL = '/api/search?q=';

  search(searchValue: string): Observable<SearchApiResponse> {
    return this.http.get<SearchApiResponse>(`${this.BASE_SEARCH_URL}${searchValue}`);
  }

  searchNext(nextUrl: string): Observable<SearchApiResponse> {
    const params = new URL(nextUrl).searchParams;
    return this.http.get<SearchApiResponse>(
      `${this.BASE_SEARCH_URL}?q=${params.get('q')}&index=${params.get('index')}`,
    );
  }
}
