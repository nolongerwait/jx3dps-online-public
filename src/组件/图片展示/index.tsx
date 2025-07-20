import { useState } from 'react'

function ImageComponent({ src, fallback, alt = '', ...props }) {
  const [source, setSource] = useState(src)
  const [loading, setLoading] = useState(true)
  const [errorCount, setErrorCount] = useState(0)

  const handleError = () => {
    if (errorCount < 1) {
      setSource(fallback)
      setErrorCount((c) => c + 1)
      setLoading(true)
    }
  }

  return (
    <img
      {...props}
      alt={alt}
      src={source}
      onLoad={() => setLoading(false)}
      onError={handleError}
      style={{
        opacity: loading ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  )
}

export default ImageComponent
