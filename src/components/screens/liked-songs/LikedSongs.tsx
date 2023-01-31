import ArtistCard from '@/components/ArtistCard/ArtistCard'
import Favorites from 'assets/images/favorites.jpg'
import LikedSongList from './LikedSongList/LikedSongList'
import type { NextPage } from 'next'
import { api } from '@/utils/api'
import { checkTracksLength } from '@/utils/checkTracksLength'
import styles from './LikedSongs.module.scss'
import { useSession } from 'next-auth/react'

const LikedSongs: NextPage = () => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)
  const { data: tracks } = api.favorites.getFavorites.useQuery({ userId })
  // const currentSong = usePlayer((state) => state.currentSong)
  // const isCurrentPath = currentSong?.title === track.title

  console.log(tracks, 'TRACKS')

  return (
    <div>
      <ArtistCard
        size={300}
        image={Favorites}
        name=''
        type='ПЛЕЙЛИСТ'
        title='Любимые треки'
        info={
          <>
            <span className={styles.info}>{sessionData?.user?.name}</span>
            {' ৹ '}
            <span className={styles.tracksLength}>
              {tracks?.length} {checkTracksLength(tracks?.length)}
            </span>
          </>
        }
      />
      {/* <PagePanel track={track} isCurrentPath={isCurrentPath} /> */}
      <LikedSongList tracks={tracks} />
    </div>
  )
}

export default LikedSongs
