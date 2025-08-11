import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  fetchTrips as fetchTripsAction,
  fetchTripById as fetchTripByIdAction,
  createTrip as createTripAction,
  updateTrip as updateTripAction,
  deleteTrip as deleteTripAction,
  resetCurrentTrip as resetCurrentTripAction
} from '../store/slices/tripsSlice'
import tripService from '../api/trips'

const useTrips = () => {
  const dispatch = useDispatch()
  const { 
    trips, 
    currentTrip, 
    isLoading, 
    error 
  } = useSelector((state) => state.trips)

  const fetchTrips = (params = {}) => {
    dispatch(fetchTripsAction(params))
  }

  const fetchTripById = (tripId) => {
    dispatch(fetchTripByIdAction(tripId))
  }

  const createTrip = async (tripData, token) => {
    try {
      const createdTrip = await dispatch(createTripAction({ tripData, token }))
      return createdTrip.payload
    } catch (err) {
      console.error('Create trip error:', err)
      throw err
    }
  }

  const updateTrip = async (tripId, tripData, token) => {
    try {
      const updatedTrip = await dispatch(updateTripAction({ tripId, tripData, token }))
      return updatedTrip.payload
    } catch (err) {
      console.error('Update trip error:', err)
      throw err
    }
  }

  const deleteTrip = async (tripId, token) => {
    try {
      await dispatch(deleteTripAction({ tripId, token }))
      return true
    } catch (err) {
      console.error('Delete trip error:', err)
      throw err
    }
  }

  const resetCurrentTrip = () => {
    dispatch(resetCurrentTripAction())
  }

  // Автоматическая загрузка поездок при монтировании
  useEffect(() => {
    fetchTrips()
  }, [dispatch])

  return {
    trips,
    currentTrip,
    isLoading,
    error,
    fetchTrips,
    fetchTripById,
    createTrip,
    updateTrip,
    deleteTrip,
    resetCurrentTrip
  }
}

export default useTrips