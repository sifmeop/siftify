import { createTRPCRouter, publicProcedure } from '../trpc'

import { z } from 'zod'

export const tracksRouter = createTRPCRouter({
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
    }),
  getTrack: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.track.findUnique({
        where: {
          id: input.id
        }
      })
    }),
  searchTrack: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.track.findMany({
        where: {
          title: {
            contains: input.search,
            mode: 'insensitive'
          }
        }
      })
    })
})
