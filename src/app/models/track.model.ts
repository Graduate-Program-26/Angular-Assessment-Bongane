import * as z from 'zod';

export const trackSchema = z.object({
  id: z.string(),
  readable : z.boolean(),
  title : z.string(),
  title_short : z.string(),
  title_version : z.string(),
  unseen : z.boolean(),
  isrc : z.string(),
  link : z.url(),
  share : z.url(),
  duration : z.number(),
  track_position : z.number(),
  disk_number : z.number(),
  rank : z.number(),
  release_date : z.string(),
  explicit_lyrics : z.boolean(),
  explicit_content_lyrics : z.number(),
  explicit_content_coover : z.number(),
  preview : z.url(),
  bpm : z.number(),
  gain : z.number(),
  available_countries : z.array(
    z.object()
  ),
  // alternative :  use track schema
  contributers : z.array(
    z.object(
    )
  ),
  md5_image : z.string(),
  // artist : create artist schema,
  type : z.string(),
  // album : create album schema

})

export type Track = z.infer<typeof trackSchema>;