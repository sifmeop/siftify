import { artistsRouter } from './routers/artists'
import { createTRPCRouter } from './trpc'
import { favoritesRouter } from './routers/favorites'
import { tracksRouter } from './routers/tracks'

export const appRouter = createTRPCRouter({
  artists: artistsRouter,
  tracks: tracksRouter,
  favorites: favoritesRouter
})

export type AppRouter = typeof appRouter
