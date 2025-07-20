const 渐变特效文字 = ({ text, className = '' }) => {
  return (
    <div className={className}>
      <svg width='28' height='18'>
        <defs>
          <linearGradient
            id='text-gradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='0%'
            gradientTransform='rotate(-30 0.5 0.5)'
          >
            <stop offset='0%' stopColor='#d013d0' />
            <stop offset='40%' stopColor='#ff0203' />
            <stop offset='60%' stopColor='#ff0203' />
            <stop offset='100%' stopColor='#d013d0' />

            <animate
              attributeName='x1'
              values='-100%; 0%; 100%'
              dur='2s'
              repeatCount='indefinite'
            />
            <animate attributeName='x2' values='0%; 100%; 200%' dur='2s' repeatCount='indefinite' />
          </linearGradient>
        </defs>
        <text x='0' y='14' fontSize='14' fill='url(#text-gradient)'>
          {text}
        </text>
      </svg>
    </div>
  )
}

export default 渐变特效文字
