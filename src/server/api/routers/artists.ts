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
  getArtist: publicProcedure
    .input(z.object({ artistId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.artist.findUnique({
        where: {
          id: input.artistId
        }
      })
    }),
  getSearch: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.track.findMany({
        where: {
          OR: [
            {
              title: {
                contains: input.search,
                mode: 'insensitive'
              }
            }
          ]
        }
      })
    })
})
