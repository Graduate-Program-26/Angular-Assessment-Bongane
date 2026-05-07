import { SearchItem } from './search-item.model';

export interface LocalPlaylist {
  id: number;
  title: string;
  description: string;
  picture: string;
  isPublic: boolean;
  tracks: SearchItem[];
  createdAt: Date;
}
