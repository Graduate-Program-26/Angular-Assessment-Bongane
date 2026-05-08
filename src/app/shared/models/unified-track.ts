export interface UnifiedTrack {
  id: number;
  title: string;
  artist: { name: string };
  album: { cover_small: string };
  preview: string;
  duration: number;
}
