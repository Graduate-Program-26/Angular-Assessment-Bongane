import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  http = inject(HttpClient);

  fetchPlaylist(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`api/playlist/${id}`);
  }
}
