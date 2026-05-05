import { inject, Injectable } from '@angular/core';
import { Playlist, PlaylistTrack } from '../models/playlist.model';
import { db } from '../db';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylisPersistanceService {
  async loadPlaylists(): Promise<Playlist[]> {
    return await db.playlists.toArray();
  }

  async savePlaylists(playlists: Playlist[]): Promise<void> {
    await db.playlists.clear();
    await db.playlists.bulkPut(playlists);
  }

  async addPlaylist(playlist: Playlist): Promise<void> {
    await db.playlists.add(playlist);
  }

  async addTrackToPlaylist(playlistId: number, track: PlaylistTrack): Promise<void> {
    const playlist = await db.playlists.get(playlistId);

    if (!playlist) return;

    await db.playlists.update(playlistId, {
      tracks: [...playlist.tracks, track],
      nb_tracks: playlist.nb_tracks + 1,
    });
  }
}
