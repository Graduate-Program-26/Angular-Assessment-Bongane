export interface UnifiedTrack {
  id: number;
  title: string;
  artist: { name: string , id : number};
  album: { cover_small: string };
  preview: string;
  duration: number;
  link : string;
}
