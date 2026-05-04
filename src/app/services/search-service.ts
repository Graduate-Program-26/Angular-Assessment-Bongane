import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Track } from '../models/track.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);

  private readonly BASE_SEARCH_URL = "/api/search?q=";

  async search(searchValue: string){
    const data = await firstValueFrom(this.http.get(`${this.BASE_SEARCH_URL}${searchValue}`));
    console.log(data);
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
