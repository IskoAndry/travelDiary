import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrips } from '../store/slices/tripsSlice'
import TripCard from '../components/trips/TripCard/TripCard'
import UserProfile from '../components/common/UserProfile/UserProfile'
import styles from './ProfilePage.module.css'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { trips, loading, error } = useSelector((state) => state.trips)

  useEffect(() => {
    if (user) {
      dispatch(fetchTrips({ author: user._id }))
    }
  }, [dispatch, user])

  if (!user) {
    return <div className={styles.notAuth}>Пожалуйста, войдите в систему</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <UserProfile user={user} editable />
      </div>

      <div className={styles.tripsSection}>
        <h2>Мои путешествия ({trips.length})</h2>
        
        {loading && <div>Загрузка...</div>}
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.tripsGrid}>
          {trips.map((trip) => (
            <TripCard key={trip._id} trip={trip} editable />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage