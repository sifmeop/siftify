import { usePlayer } from '@/stores/usePlayer'

export const useIsCurrentTrack = (title: string | undefined): boolean => {
  const currentTrack = usePlayer((state) => state.currentTrack)
  const isCurrentPath = currentTrack?.title === title

  return title ? isCurrentPath : false
}
