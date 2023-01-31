import { createTRPCRouter, publicProcedure } from '../trpc'

import { z } from 'zod'

export const favoritesRouter = createTRPCRouter({
  getFavorites: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.likedSong.findMany({
        where: {
          userId: input.userId
        },
        include: {
          user: true
        }
      })
    }),
  addToFavorites: publicProcedure
    .input(z.object({ trackId: z.string(), userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.likedSong.create({
        data: {
          trackId: input.trackId,
          userId: input.userId
        }
      })
    }),
  deleteFromFavorites: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.likedSong.delete({
        where: {
          id: input.id
        }
      })
    })
})
