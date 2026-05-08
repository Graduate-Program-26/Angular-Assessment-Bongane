import * as z from 'zod';

export const albumSearchSchema = z.object({
  id: z.number(),
  title: z.string(),
  upc: z.string(),
  link: z.url(),
  share: z.url(),
  cover: z.url(),
  cover_small: z.url(),
  cover_medium: z.url(),
  cover_big: z.url(),
  cover_xl: z.url(),
  md5_image: z.string(),
});

export const artistSearchSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.url(),
  picture: z.url(),
  picture_small: z.url(),
  picture_medium: z.url(),
  picture_big: z.url(),
  picture_xl: z.url(),
});

export const searchItemSchema = z.object({
  id: z.number(),
  readable: z.boolean(),
  title: z.string(),
  title_short: z.string(),
  title_version: z.string(),
  isrc: z.string(),
  link: z.url(),
  duration: z.number(),
  rank: z.number(),
  explicit_lyrics: z.boolean(),
  preview: z.url(),
  artist: artistSearchSchema,
  album: albumSearchSchema,
});

export type SearchItem = z.infer<typeof searchItemSchema>;
