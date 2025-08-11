import axios from 'axios'

const API_URL = '/api/trips'


const createTrip = async (tripData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const response = await axios.post(API_URL, tripData, config)
  return response.data
}

const getTrips = async (params = {}) => {
  const response = await axios.get(API_URL, { params })
  return response.data
}


const getTripById = async (tripId) => {
  const response = await axios.get(`${API_URL}/${tripId}`)
  return response.data
}

// Обновить поездку
const updateTrip = async (tripId, tripData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const response = await axios.put(`${API_URL}/${tripId}`, tripData, config)
  return response.data
}


const deleteTrip = async (tripId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`${API_URL}/${tripId}`, config)
  return response.data
}

const tripService = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
}

export default tripService