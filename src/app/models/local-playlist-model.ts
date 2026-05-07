import { Track } from "./track.model";

export interface LocalPlaylist {
  id: number;
  title: string;
  description: string;
  picture: string;
  isPublic: boolean;
  tracks: Track[];
  createdAt: Date;
}