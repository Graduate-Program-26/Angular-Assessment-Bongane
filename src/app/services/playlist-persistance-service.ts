import { inject, Injectable } from '@angular/core';
import { Playlist, PlaylistTrack } from '../models/playlist.model';
import { db } from '../db';
import { Track } from '../models/track.model';
import { LocalPlaylist } from '../models/local-playlist-model';
import { SearchItem } from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistPersistanceService {
  async loadPlaylists(): Promise<Playlist[]> {
    return await db.playlists.toArray();
  }

  async loadLocalPlaylists(): Promise<LocalPlaylist[]> {
    return await db.localPlaylists.toArray();
  }

  async savePlaylists(playlists: Playlist[]): Promise<void> {
    await db.playlists.clear();
    await db.playlists.bulkPut(playlists);
  }

  async addPlaylist(playlist: Playlist): Promise<void> {
    await db.playlists.add(playlist);
  }

  async addLocalPlaylist(playlist: LocalPlaylist): Promise<void> {
    await db.localPlaylists.add(playlist);
  }

  async addTrackToPlaylist(playlistId: number, track: PlaylistTrack): Promise<void> {
    const playlist = await db.playlists.get(playlistId);

    if (!playlist) return;

    await db.playlists.update(playlistId, {
      tracks: {
        data: [...playlist.tracks.data, track],
        checksum: playlist.tracks.checksum, // preserve
      },
      nb_tracks: playlist.nb_tracks + 1,
    });
  }

  async addTrackToLocalPlaylist(playlistId: number, track: SearchItem): Promise<void> {
    const playlist = await db.localPlaylists.get(playlistId);

    if (!playlist) return;

    const trackExists = playlist.tracks.some((t) => t.id === track.id);

    if (trackExists) return;

    await db.localPlaylists.update(playlistId, {
      tracks: [...playlist.tracks, track],
    });
  }
}
