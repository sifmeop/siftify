import { usePlayer } from '@/stores/usePlayer'
import type { Track } from '@prisma/client'
import { message } from 'antd'

export const useQueue = (track: Track) => {
  const handleAddToQueue = usePlayer((state) => state.addToQueue)
  const handleRemoveFromQueue = usePlayer((state) => state.removeFromQueue)

  const queueList = usePlayer((state) => state.queueList)
  const isInQueue = queueList.some((t) => t.id === track.id)

  const addToQueue = () => {
    if (isInQueue) return
    handleAddToQueue(track)
    void message.success(`Добавлен в очередь трек: ${track.title}`)
  }

  const removeFromQueue = () => {
    handleRemoveFromQueue(track.id)
    void message.success(`Удален из очереди трек: ${track.title}`)
  }

  return { isInQueue, addToQueue, removeFromQueue }
}
