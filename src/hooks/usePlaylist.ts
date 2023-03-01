import type { Playlist, Track } from '@prisma/client'

import { api } from '@/utils/api'
import { message } from 'antd'
import { useSession } from 'next-auth/react'

export const usePlaylist = (
  trackId: string,
  playlist: Playlist & { tracks: Track[] }
) => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)
  const isTrackInPlaylist = playlist.tracks.some(
    (track) => track.id === trackId
  )

  const { refetch: refetchAddTrackToPlaylist } =
    api.playlists.addTrackToPlaylist.useQuery(
      { playlistId: playlist.id, trackId },
      { enabled: !playlist }
    )

  const { refetch: refetchRemoveTrackFromPlaylist } =
    api.playlists.removeTrackFromPlaylist.useQuery(
      { playlistId: playlist.id, trackId },
      { enabled: !playlist }
    )

  const { data: playlists, refetch: refetchPlaylists } =
    api.playlists.getPlaylists.useQuery({ userId }, { enabled: !!sessionData })

  const handleAddToPlaylist = async (): Promise<void> => {
    if (isTrackInPlaylist) {
      void message.error('Трек уже есть в плейлисте')
      return
    }
    await refetchAddTrackToPlaylist()
    void message.success('Трек добавлен в плейлист')
    await refetchPlaylists()
  }

  const handleDeleteFromPlaylist = async (): Promise<void> => {
    const result = await refetchRemoveTrackFromPlaylist()
    if (result) {
      void message.success(`Трек удален из плейлиста: ${playlist.name}`)
      await refetchPlaylists()
    } else {
      void message.error('Ошибка при удалении трека из плейлиста')
    }
  }

  return {
    playlists,
    isTrackInPlaylist,
    handleAddToPlaylist,
    handleDeleteFromPlaylist
  }
}
