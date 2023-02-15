import type { NextPage } from 'next'
import ContentLoader from 'react-content-loader'

const LoaderTrack: NextPage = () => (
  <ContentLoader
    speed={2}
    width={200}
    height={45}
    viewBox='0 0 200 45'
    backgroundColor='#f3f3f3'
    foregroundColor='#e3e3e3'>
    <rect x='0' y='15' rx='0' ry='0' width='20' height='20' />
    <rect x='30' y='30' rx='0' ry='0' width='200' height='15' />
    <rect x='30' y='10' rx='0' ry='0' width='150' height='15' />
  </ContentLoader>
)

export default LoaderTrack
