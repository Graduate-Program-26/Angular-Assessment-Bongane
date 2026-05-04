import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);

  private readonly BASE_SEARCH_URL = "https://api.deezer.com/search?q=";

  search(searchValue: string){
    try{
      const data = this.http.get<Track>(`${this.BASE_SEARCH_URL}${searchValue}`);
      console.log(data);
    } catch (error){
      throw new Error('Error could not search track: ');
    }
  }

}
