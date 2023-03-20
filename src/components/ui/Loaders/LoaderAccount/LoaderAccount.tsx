import ContentLoader from 'react-content-loader'

const LoaderAccount = () => (
  <ContentLoader
    uniqueKey='account'
    speed={2}
    width={200}
    height={45}
    viewBox='0 0 200 45'
    backgroundColor='#f3f3f3'
    foregroundColor='#e3e3e3'>
    <circle cx='163' cy='23' r='23' />
    <rect x='0' y='13' rx='0' ry='0' width='130' height='20' />
  </ContentLoader>
)

export default LoaderAccount
