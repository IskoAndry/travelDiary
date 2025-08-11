import { useState, useEffect } from 'react'

const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается вашим браузером')
      return
    }

    const handleSuccess = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy
      })
    }

    const handleError = (err) => {
      setError(err.message)
    }

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    )

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [options])

  return { location, error }
}

export default useGeolocation