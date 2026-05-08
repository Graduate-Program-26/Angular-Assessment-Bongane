import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ArtistTrack } from '../../models/artist-tracks.model';


interface ArtistTracklistApiResponse {
  data: ArtistTrack[];
  next?: string;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class ArtistTracklistService {
  private readonly http = inject(HttpClient);

  fetchArtistTracks(id: number): Observable<ArtistTrack[]> {
    return this.http
      .get<ArtistTracklistApiResponse>(`/api/artist/${id}/top?limit=50`)
      .pipe(map((res) => res.data ?? []));
  }
}