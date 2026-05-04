import * as z from 'zod';

export const albumSchema = z.object({
  id : z.number(),
  title : z.string(),
  upc: z.string(),
  link : z.url(),
  share : z.url(),
  cover : z.url(),
  cover_small : z.url(),
  cover_medium : z.url(),
  cover_big : z.string(),
  cover_xl : z.url(),
  md5_image : z.string(),
  genre_id : z.number(),
  genres : z.array(
    z.object()
  ),
  label : z.string(),
  provider : z.string(),
  nb_tracks : z.number(),
  duration : z.number(),
  fans : z.number(),
  release_date : z.string(),
  record_type : z.string(),
  available : z.boolean(),
  // alternative : Return an alternative album object if the current album is not available
  tracklist: z.url(),
  
})