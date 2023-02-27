import { createTRPCRouter, publicProcedure } from '../trpc'

import { z } from 'zod'

export const playlistsRouter = createTRPCRouter({
  getPlaylists: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.playlist.findMany({
        where: {
          userId: input.userId
        },
        include: {
          tracks: true
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
      return ctx.prisma.playlist.create({
        data: {
          userId: input.userId,
          name: input.name,
          description: input.description,
          tracks: {
            connect: []
          },
          tracksIds: []
        }
      })
    }),
  deletePlaylist: publicProcedure
    .input(z.object({ playlistId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.playlist.delete({
        where: {
          id: input.playlistId
        }
      })
    }),
  updatePlaylist: publicProcedure
    .input(
      z.object({
        playlistId: z.string(),
        name: z.string(),
        description: z.string()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.playlist.update({
        where: {
          id: input.playlistId
        },
        data: {
          name: input.name,
          description: input.description
        }
      })
    }),
  addTrackToPlaylist: publicProcedure
    .input(
      z.object({
        playlistId: z.string(),
        trackId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const playlist = await ctx.prisma.playlist.findUnique({
        where: {
          id: input.playlistId
        }
      })
      if (!playlist) {
        return null
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tracksIds: string[] = playlist.tracksIds
      tracksIds.push(input.trackId)
      return ctx.prisma.playlist.update({
        where: {
          id: input.playlistId
        },
        data: {
          tracksIds: tracksIds
        }
      })
    }),
  removeTrackFromPlaylist: publicProcedure
    .input(
      z.object({
        playlistId: z.string(),
        trackId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const playlist = await ctx.prisma.playlist.findUnique({
        where: {
          id: input.playlistId
        }
      })
      if (!playlist) {
        return null
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tracksIds: string[] = playlist.tracksIds
      const index = tracksIds.indexOf(input.trackId)
      if (index > -1) {
        tracksIds.splice(index, 1)
      }
      return ctx.prisma.playlist.update({
        where: {
          id: input.playlistId
        },
        data: {
          tracksIds: tracksIds
        }
      })
    })
})
