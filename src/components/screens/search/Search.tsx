import Link from 'next/link'
import type { NextPage } from 'next'
import { api } from '@/utils/api'
import { useDebounce } from '@/hooks/useDebounce'
import { useState } from 'react'

const Search: NextPage = () => {
  const [search, setSearch] = useState<string>('')
  const debounce = useDebounce(search)
  const { data: tracks } = api.artists.getSearch.useQuery(
    { search: debounce },
    { enabled: debounce.length > 2 }
  )

  console.log(tracks)

  return (
    <div>
      <input
        className='border border-black'
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {debounce.length > 0 &&
        tracks?.map((track) => (
          <div className='mb-3 border-b border-b-black' key={track.id}>
            <h1>
              <Link href={`/track/${track.id}`}>{track.title}</Link>
            </h1>
            <h2>{track.featuring.join(', ')}</h2>
          </div>
        ))}
    </div>
  )
}

export default Search
