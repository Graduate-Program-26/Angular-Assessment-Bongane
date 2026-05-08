import * as z from 'zod';

export const playlistArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  link: z.url(),
});

export const playlistAlbumSchema = z.object({
  id: z.number(),
  title: z.string(),
  upc: z.string(),
  cover: z.url(),
  cover_small: z.url(),
  cover_medium: z.url(),
  cover_big: z.url(),
  cover_xl: z.url(),
});

export const playlistTrackSchema = z.object({
  id: z.number(),
  readable: z.boolean(),
  title: z.string(),
  title_short: z.string(),
  title_version: z.string(),
  unseen: z.boolean(),
  isrc: z.string(),
  link: z.url(),
  duration: z.number(),
  rank: z.number(),
  explicit_lyrics: z.boolean(),
  preview: z.url(),
  time_add: z.string(),
  artist: z.object({
    id: z.number(),
    name: z.string(),
    tracklist: z.url(),
    type: z.string(),
  }),
  album: z.object({
    id: z.number(),
    name: z.string(),
    title: z.string(),
    upc: z.string(),
    cover: z.string(),
    cover_small: z.string(),
    cover_medium: z.string(),
    cover_big: z.string(),
    cover_xl: z.string(),
    md5_image: z.string(),
    tracklist: z.url(),
    type: z.string(),
  }),
  type: z.string(),
});

export const playlistSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  public: z.boolean(),
  is_loved_track: z.boolean(),
  collaborative: z.boolean(),
  nb_tracks: z.number(),
  unseen_track_count: z.number(),
  fans: z.number(),
  link: z.url(),
  share: z.url(),
  picture: z.url(),
  picture_small: z.url(),
  picture_medium: z.url(),
  picture_big: z.url(),
  picture_xl: z.url(),
  checksum: z.string(),
  creator: z.object({
    id: z.number(),
    name: z.string(),
  }),
  tracks: z.object({
    data: z.array(playlistTrackSchema),
    checksum: z.string(),
  }),
});

export type PlaylistTrack = z.infer<typeof playlistTrackSchema>;

export type Playlist = z.infer<typeof playlistSchema>;
