import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTripById, resetCurrentTrip } from '../../../store/slices/tripsSlice'
import Map from '../../common/Map/Map'
import CommentSection from '../../common/CommentSection/CommentSection'
import styles from './TripDetails.module.css'

const TripDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentTrip, loading, error } = useSelector((state) => state.trips)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchTripById(id))

    return () => {
      dispatch(resetCurrentTrip())
    }
  }, [id, dispatch])

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.error}>Ошибка: {error}</div>
  if (!currentTrip) return null

  const isAuthor = user && user._id === currentTrip.author._id

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{currentTrip.title}</h1>
        <div className={styles.meta}>
          <span>Автор: {currentTrip.author.username}</span>
          <span>Дата: {new Date(currentTrip.createdAt).toLocaleDateString()}</span>
          <span>Бюджет: ${currentTrip.cost}</span>
        </div>
      </div>

      <div className={styles.gallery}>
        {currentTrip.images.map((image, index) => (
          <img key={index} src={image} alt={`${currentTrip.title} ${index}`} />
        ))}
      </div>

      <div className={styles.description}>
        <h2>Описание путешествия</h2>
        <p>{currentTrip.description}</p>
      </div>

      <div className={styles.locations}>
        <h2>Локации ({currentTrip.locations.length})</h2>
        <div className={styles.mapContainer}>
          <Map locations={currentTrip.locations} zoom={2} />
        </div>
        <div className={styles.locationsList}>
          {currentTrip.locations.map((location, index) => (
            <div key={index} className={styles.locationItem}>
              <h3>{location.name}</h3>
              <p>{location.description}</p>
              <p>Координаты: {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tags}>
        {currentTrip.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>#{tag}</span>
        ))}
      </div>

      <div className={styles.commentsSection}>
        <CommentSection tripId={currentTrip._id} />
      </div>
    </div>
  )
}

export default TripDetails