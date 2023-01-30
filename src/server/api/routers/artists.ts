import { createTRPCRouter, publicProcedure } from '../trpc'

import { z } from 'zod'

export const artistsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.artist.findMany()
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
  searchArtist: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.artist.findMany({
        where: {
          name: {
            contains: input.search,
            mode: 'insensitive'
          }
        }
      })
    })
})
