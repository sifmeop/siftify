import { artistsRouter } from './routers/artists'
import { favoritesRouter } from './routers/favorites'
import { tracksRouter } from './routers/tracks'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  artists: artistsRouter,
  tracks: tracksRouter,
  favorites: favoritesRouter
})

export type AppRouter = typeof appRouter
