import { z } from 'zod';

const ArtistSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string().url().optional(),
  share: z.string().url().optional(),
  picture: z.string().url().optional(),
  picture_small: z.string().url().optional(),
  picture_medium: z.string().url().optional(),
  picture_big: z.string().url().optional(),
  picture_xl: z.string().url().optional(),
  radio: z.boolean().optional(),
  tracklist: z.string().url().optional(),
  type: z.literal('artist'),
  role: z.enum(['Main', 'Featured', 'Composer']).optional(),
});

const AlbumSchema = z.object({
  id: z.number(),
  title: z.string(),
  cover: z.string().url(),
  cover_small: z.string().url(),
  cover_medium: z.string().url(),
  cover_big: z.string().url(),
  cover_xl: z.string().url(),
  md5_image: z.string(),
  tracklist: z.string().url(),
  type: z.literal('album'),
});

export const ArtistTrackSchema = z.object({
  id: z.number(),
  readable: z.boolean(),
  title: z.string(),
  title_short: z.string(),
  title_version: z.string().optional(),
  link: z.string().url(),
  duration: z.number(),
  rank: z.number(),
  explicit_lyrics: z.boolean(),
  explicit_content_lyrics: z.number(),
  explicit_content_cover: z.number(),
  preview: z.string().url(),
  contributors: z.array(ArtistSchema).optional(),
  md5_image: z.string(),
  artist: ArtistSchema.pick({ id: true, name: true, tracklist: true, type: true }),
  album: AlbumSchema,
  type: z.literal('track'),
});


export type ArtistTrack = z.infer<typeof ArtistTrackSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type Album = z.infer<typeof AlbumSchema>;
