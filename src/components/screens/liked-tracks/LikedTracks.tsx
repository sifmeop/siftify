import ArtistCard from '@/components/ArtistCard/ArtistCard'
import TableHeader from '@/components/TableHeader/TableHeader'
import { useFavorites } from '@/stores/useFavorites'
import { checkTracksLength } from '@/utils/checkTracksLength'
import Favorites from 'assets/images/favorites.jpg'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import styles from './LikedTracks.module.scss'
import LikedTracksItem from './LikedTracksItem/LikedTracksItem'

const LikedTracks: NextPage = () => {
  const { data: sessionData } = useSession()
  const favorites = useFavorites((state) => state.favorites)

  return (
    <>
      {sessionData ? (
        <>
          <ArtistCard
            size={300}
            image={Favorites}
            name=''
            type='ПЛЕЙЛИСТ'
            title='Любимые треки'
            info={
              <>
                <span className={styles.info}>{sessionData.user?.name}</span>
                {' ৹ '}
                <span className={styles.tracksLength}>
                  {favorites?.length} {checkTracksLength(favorites?.length)}
                </span>
              </>
            }
          />
          <TableHeader />
          {favorites?.map((track, index) => (
            <LikedTracksItem key={track.id} track={track} index={index} />
          ))}
        </>
      ) : (
        <div>рега нужна</div>
      )}
    </>
  )
}

export default LikedTracks
