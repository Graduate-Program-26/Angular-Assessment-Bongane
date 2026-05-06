import Dexie, { Table } from 'dexie';
import { Playlist } from './models/playlist.model';

export class AppDB extends Dexie {
  playlists!: Table<Playlist, number>;

  constructor() {
    super('MusicDB');

    this.version(1).stores({
      playlists: 'id',
    });

    this.version(2).stores({
      playlists: 'id',
      settings: 'key',
    });
  }
}

export const db = new AppDB();
