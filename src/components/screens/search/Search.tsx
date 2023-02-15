import { useDebounce } from '@/hooks/useDebounce'
import { api } from '@/utils/api'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { VscClose } from 'react-icons/vsc'
import styles from './Search.module.scss'
import SearchArtist from './SearchArtist/SearchArtist'
import SearchTrack from './SearchTracks/SearchTrack'

const Search: NextPage = () => {
  const [search, setSearch] = useState<string>('')
  const debounce = useDebounce(search)
  const { data: tracks } = api.tracks.searchTrack.useQuery(
    { search: debounce.trim() },
    { enabled: debounce.length > 0 }
  )
  const { data: artists } = api.artists.searchArtist.useQuery(
    { search: debounce.trim() },
    { enabled: debounce.length > 0 }
  )

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div className={clsx(styles.searchIcon, styles.searchIconSearch)}>
          <CiSearch size='35px' />
        </div>
        <input
          className={styles.searchInput}
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Поиск по трекам и исполнителям'
        />
        <div className={clsx(styles.searchIcon, styles.searchIconClose)}>
          {search.length > 0 && (
            <VscClose size='35px' onClick={() => setSearch('')} />
          )}
        </div>
      </div>
      {debounce.length > 0 && (
        <>
          {tracks?.map((track) => (
            <SearchTrack key={track.id} track={track} />
          ))}
          {artists?.map((artist) => (
            <SearchArtist key={artist.id} artist={artist} />
          ))}
        </>
      )}
    </div>
  )
}

export default Search
