import type { Track } from '@prisma/client'
import type { NextPage } from 'next'
import Favorite from '../Favorite/Favorite'
import PlayTrack from '../PlayTrack/PlayTrack'
import styles from './PagePanel.module.scss'

interface IProps {
  track: Track
  isCurrentPath: boolean
}

const PagePanel: NextPage<IProps> = ({ track, isCurrentPath }) => {
  return (
    <div className={styles.panel}>
      <PlayTrack isCurrentPath={isCurrentPath} track={track} size='big' />
      <Favorite />
    </div>
  )
}

export default PagePanel
