import { createTRPCRouter, publicProcedure } from '../trpc'

import { z } from 'zod'

export const artistsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.artist.findMany()
  }),
  getArtistTracks: publicProcedure
    .input(z.object({ artistId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.track.findMany({
        where: {
          artistId: input.artistId
        },
        include: {
          artist: true
        }
      })
    })
})
