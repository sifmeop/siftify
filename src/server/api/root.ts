import { artistsRouter } from './routers/artists'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  artists: artistsRouter
})

export type AppRouter = typeof appRouter
