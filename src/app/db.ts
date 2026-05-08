import Dexie, { Table } from 'dexie';
import { Playlist } from './models/playlist.model';
import { LocalPlaylist } from './models/local-playlist-model';

export class AppDB extends Dexie {
  playlists!: Table<Playlist, number>;
  localPlaylists!: Table<LocalPlaylist, number>;

  constructor() {
    super('MusicDB');

    this.version(1).stores({
      playlists: 'id',
    });

    this.version(2).stores({
      playlists: 'id',
      settings: 'key',
    });

    this.version(3).stores({
      playlists: 'id',
      settings: 'key',
      localPlaylists: 'id',
    });
  }
}

export const db = new AppDB();
