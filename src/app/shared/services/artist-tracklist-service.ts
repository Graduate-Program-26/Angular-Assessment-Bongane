import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Track } from '../../models/track.model';
import { ArtistTrack } from '../../models/artist-tracks.model';

@Injectable({ providedIn: 'root' })
export class ArtistTracklistService {
  private readonly http = inject(HttpClient);

  tracks = signal<ArtistTrack[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  fetchArtistTracks(id: number) {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<{ data: ArtistTrack[] }>(`/api/artist/${id}/top?limit=50`).subscribe({
      next: (res) => this.tracks.set(res.data ?? []),
      error: (err) => this.error.set(err.message),
      complete: () => this.isLoading.set(false),
    });
  }
}