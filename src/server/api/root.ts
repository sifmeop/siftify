import { artistsRouter } from './routers/artists'
import { favoritesRouter } from './routers/favorites'
import { playlistsRouter } from './routers/playlists'
import { tracksRouter } from './routers/tracks'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  artists: artistsRouter,
  tracks: tracksRouter,
  favorites: favoritesRouter,
  playlists: playlistsRouter
})

export type AppRouter = typeof appRouter
