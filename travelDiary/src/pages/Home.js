import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrips } from '../store/slices/tripsSlice'
import Feed from '../components/trips/Feed/Feed'

const Home = () => {
  const dispatch = useDispatch()
  const { trips, loading, error } = useSelector((state) => state.trips)

  useEffect(() => {
    dispatch(fetchTrips())
  }, [dispatch])

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>

  return (
    <div>
      <h1>Последние путешествия</h1>
      <Feed trips={trips} />
    </div>
  )
}

export default Home