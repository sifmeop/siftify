import { artistsRouter } from './routers/artists'
import { createTRPCRouter } from './trpc'
import { tracksRouter } from './routers/tracks'

export const appRouter = createTRPCRouter({
  artists: artistsRouter,
  tracks: tracksRouter
})

export type AppRouter = typeof appRouter
