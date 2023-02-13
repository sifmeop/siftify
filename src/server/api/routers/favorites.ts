import { createTRPCRouter, publicProcedure } from '../trpc'

import { z } from 'zod'

export const favoritesRouter = createTRPCRouter({
  getListFavorites: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.likedTrack.findMany({
        where: {
          userId: input.userId
        },
        include: {
          user: true
        }
      })
    }),
  getTrackById: publicProcedure
    .input(z.object({ trackId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.track.findUnique({
        where: {
          id: input.trackId
        }
      })
    }),
  addToFavorites: publicProcedure
    .input(z.object({ trackId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.likedTrack.create({
        data: {
          trackId: input.trackId,
          userId: input.userId
        }
      })
    }),
  removeFromFavorites: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.likedTrack.delete({
        where: {
          id: input.id
        }
      })
    })
})
