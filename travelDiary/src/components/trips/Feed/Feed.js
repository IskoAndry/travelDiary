import React from 'react'
import TripCard from '../TripCard/TripCard'
import styles from './Feed.module.css'

const Feed = ({ trips, loading, error, onTripDelete }) => {
  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.error}>{error}</div>
  if (trips.length === 0) return <div className={styles.empty}>Нет поездок для отображения</div>

  return (
    <div className={styles.feed}>
      {trips.map(trip => (
        <TripCard 
          key={trip._id} 
          trip={trip} 
          onDelete={onTripDelete}
          className={styles.card}
        />
      ))}
    </div>
  )
}

export default Feed