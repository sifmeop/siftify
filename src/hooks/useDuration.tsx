import { useEffect, useRef, useState } from 'react'

import { formatDuration } from '@/utils/formatDuration'
import type { Track } from '@prisma/client'

export const useDuration = (track: Track, type: 'short' | 'normal') => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [duration, setDuration] = useState<string>('')

  useEffect(() => {
    audioRef.current = new Audio(`/${track.audio}`)
  }, [track.audio])

  useEffect(() => {
    const getInfo = () => {
      setDuration(formatDuration(audioRef.current?.duration, type))
    }
    audioRef.current?.addEventListener('loadedmetadata', getInfo)
    return () => {
      audioRef.current?.removeEventListener('loadedmetadata', getInfo)
    }
  }, [type])

  return duration
}
