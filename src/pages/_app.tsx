import WrapperLayout from '@/components/WrapperLayout/WrapperLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import '../styles/globals.scss'
import { api } from '../utils/api'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <WrapperLayout>
          <Component {...pageProps} />
        </WrapperLayout>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default api.withTRPC(MyApp)
