import ContentLoader from 'react-content-loader'

const LoaderDuration = () => (
  <ContentLoader
    uniqueKey='duration'
    speed={2}
    width={40}
    height={20}
    viewBox='0 0 40 20'
    backgroundColor='#f3f3f3'
    foregroundColor='#e3e3e3'
    style={{ margin: 'auto' }}>
    <rect x='53' y='121' rx='0' ry='0' width='0' height='1' />
    <rect x='1' y='178' rx='0' ry='0' width='600' height='25' />
    <rect x='1' y='218' rx='0' ry='0' width='600' height='25' />
    <rect x='0' y='257' rx='0' ry='0' width='600' height='25' />
    <rect x='0' y='0' rx='0' ry='0' width='40' height='20' />
  </ContentLoader>
)

export default LoaderDuration
