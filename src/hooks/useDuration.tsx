import { useEffect, useState } from 'react'

import type { Track } from '@prisma/client'
import { formatDuration } from '@/utils/formatDuration'

export const useDuration = (track: Track, type: 'short' | 'normal') => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [duration, setDuration] = useState<string>('')

  useEffect(() => {
    setAudio(new Audio(`/${track.audio}`))
  }, [])

  useEffect(() => {
    const getInfo = () => {
      setDuration(formatDuration(audio?.duration, type))
    }
    audio?.addEventListener('loadedmetadata', getInfo)
    return () => {
      audio?.removeEventListener('loadedmetadata', getInfo)
    }
  }, [audio])

  return duration
}
