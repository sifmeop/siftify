import { type NextPage } from 'next'

interface IProps {
  className: string
  isPlaying: boolean
}

const Equalizer: NextPage<IProps> = ({ className, isPlaying }) => {
  return (
    <>
      {isPlaying && (
        <svg
          className={className}
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          style={{
            display: isPlaying ? 'block' : 'none',
            margin: 'auto',
            backgroundColor: 'white'
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
                times='0;0.33;0.66;1'
                dur='1s'
                keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                repeatCount='indefinite'
                begin='-0.2s'></animate>
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
                times='0;0.33;0.66;1'
                dur='1s'
                keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                repeatCount='indefinite'
                begin='-0.4s'></animate>
            </rect>
            <rect x='43.5' y='12.5' width='13' height='40' fill='#47b5ff'>
              <animate
                attributeName='height'
                calcMode='spline'
                values='50;75;10;50'
                times='0;0.33;0.66;1'
                dur='1s'
                keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                repeatCount='indefinite'
                begin='0s'></animate>
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
                times='0;0.33;0.66;1'
                dur='1s'
                keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                repeatCount='indefinite'
                begin='-0.8s'></animate>
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
                times='0;0.33;0.66;1'
                dur='1s'
                keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                repeatCount='indefinite'
                begin='-0.6s'></animate>
            </rect>
          </g>
        </svg>
      )}
    </>
  )
}

export default Equalizer
