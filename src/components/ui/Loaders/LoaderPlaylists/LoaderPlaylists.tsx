import ContentLoader from 'react-content-loader'

const LoaderPlaylists = () => (
  <ContentLoader
    uniqueKey='playlists'
    speed={2}
    width={150}
    height={70}
    viewBox='0 0 150 70'
    backgroundColor='#f3f3f3'
    foregroundColor='#e3e3e3'>
    <rect x='5' y='30' rx='0' ry='0' width='150' height='15' />
    <rect x='5' y='5' rx='0' ry='0' width='150' height='15' />
    <rect x='5' y='55' rx='0' ry='0' width='150' height='15' />
  </ContentLoader>
)

export default LoaderPlaylists
