import React from 'react'
import { Link } from 'react-router-dom'
import styles from './TripCard.module.css'

const TripCard = ({ trip }) => {
  return (
    <div className={styles.card}>
      <Link to={`/trips/${trip._id}`}>
        <div className={styles.imageContainer}>
          <img src={trip.images[0]} alt={trip.title} />
        </div>
        <div className={styles.content}>
          <h3>{trip.title}</h3>
          <p>{trip.description.substring(0, 100)}...</p>
          <div className={styles.meta}>
            <span>{new Date(trip.createdAt).toLocaleDateString()}</span>
            <span>{trip.locations.length} локаций</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TripCard