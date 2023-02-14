import type { NextPage } from 'next'
import { memo } from 'react'

interface IProps {
  className?: string
  isPlaying: boolean
  isCurrentPath: boolean
}

const Equalizer: NextPage<IProps> = ({
  className,
  isPlaying,
  isCurrentPath
}) => {
  return (
    <>
      {isCurrentPath && isPlaying && (
        <svg
          className={className}
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          style={{
            display: isPlaying ? 'block' : 'none',
            margin: 'auto'
          }}
          width='1.5625rem'
          height='1.5625rem'
          viewBox='0 0 100 100'
          preserveAspectRatio='xMidYMid'>
          <g transform='rotate(180 50 50)'>
            <rect
              x='10.166666666666668'
              y='12.5'
              width='13'
              height='40'
              fill='#47b5ff'>
              <animate
                attributeName='height'
                calcMode='spline'
                values='50;75;10;50'
                keyTimes='0;0.33;0.66;1'
                dur='1s'
                keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                repeatCount='indefinite'
                begin='-0.2s'
              />
            </rect>
            <rect
              x='26.833333333333336'
              y='12.5'
              width='13'
              height='40'
              fill='#47b5ff'>
              <animate
                attributeName='height'
                calcMode='spline'
                values='50;75;10;50'
                keyTimes='0;0.33;0.66;1'
                dur='1s'
                keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                repeatCount='indefinite'
                begin='-0.4s'
              />
            </rect>
            <rect x='43.5' y='12.5' width='13' height='40' fill='#47b5ff'>
              <animate
                attributeName='height'
                calcMode='spline'
                values='50;75;10;50'
                keyTimes='0;0.33;0.66;1'
                dur='1s'
                keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                repeatCount='indefinite'
                begin='0s'
              />
            </rect>
            <rect
              x='60.16666666666667'
              y='12.5'
              width='13'
              height='40'
              fill='#47b5ff'>
              <animate
                attributeName='height'
                calcMode='spline'
                values='50;75;10;50'
                keyTimes='0;0.33;0.66;1'
                dur='1s'
                keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                repeatCount='indefinite'
                begin='-0.8s'
              />
            </rect>
            <rect
              x='76.83333333333333'
              y='12.5'
              width='13'
              height='40'
              fill='#47b5ff'>
              <animate
                attributeName='height'
                calcMode='spline'
                values='50;75;10;50'
                keyTimes='0;0.33;0.66;1'
                dur='1s'
                keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                repeatCount='indefinite'
                begin='-0.6s'
              />
            </rect>
          </g>
        </svg>
      )}
    </>
  )
}

export default memo(Equalizer)
