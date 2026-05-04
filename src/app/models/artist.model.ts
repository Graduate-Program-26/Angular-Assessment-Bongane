import * as z from 'zod';

export const artistSchema = z.object({
  id : z.number(),
  name : z.string(),
  link : z.url(),
  share : z.url(),
  picture : z.url(),
  picture_small : z.url(),
  picture_medium: z.url(),
  picture_big : z.url(),
  picture_xl : z.url(),
  nb_album : z.number(),
  nb_fan : z.number(),
  radio : z.boolean(),
  tracklist: z.url(),
  type: z.string(),
})