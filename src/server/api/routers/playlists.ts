import { createTRPCRouter, publicProcedure } from '../trpc'

import { z } from 'zod'

export const playlistsRouter = createTRPCRouter({
  getAllPlaylists: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.createPlaylist.findMany({
        where: {
          userId: input.userId
        }
      })
    }),
  createPlaylist: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        description: z.string()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.createPlaylist.create({
        data: {
          userId: input.userId,
          name: input.name,
          description: input.description
        }
      })
    }),
  deletePlaylist: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.createPlaylist.delete({
        where: {
          id: input.id
        }
      })
    })
})
