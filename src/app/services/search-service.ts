import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Track } from '../models/track.model';
import { debounce, debounceTime, distinctUntilChanged, firstValueFrom, interval } from 'rxjs';
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

  async search(searchValue: string): Promise<SearchItem[]> {
    const result = await firstValueFrom(
      this.http
        .get<SearchApiResponse>(`${this.BASE_SEARCH_URL}${searchValue}`)
        .pipe(debounceTime(300), distinctUntilChanged()),
    );
    return result.data;
    // try{
    //   const data = this.http.get<Track>(`${this.BASE_SEARCH_URL}${searchValue}`).subscribe({
    //    next: (res) => console.log(res)
    //   });
    //   console.log(data);
    // } catch (error){
    //   throw new Error('Error could not search track: ');
    // }
  }
}
