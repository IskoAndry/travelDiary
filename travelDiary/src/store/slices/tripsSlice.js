import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tripService from '../../api/trips'

const initialState = {
  trips: [],
  currentTrip: null,
  loading: false,
  error: null,
}


export const fetchTrips = createAsyncThunk(
  'trips/fetchAll',
  async (params, thunkAPI) => {
    try {
      return await tripService.getTrips(params)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const fetchTripById = createAsyncThunk(
  'trips/fetchById',
  async (tripId, thunkAPI) => {
    try {
      return await tripService.getTripById(tripId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const createNewTrip = createAsyncThunk(
  'trips/create',
  async (tripData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await tripService.createTrip(tripData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    resetCurrentTrip: (state) => {
      state.currentTrip = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false
        state.trips = action.payload
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchTripById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTripById.fulfilled, (state, action) => {
        state.loading = false
        state.currentTrip = action.payload
      })
      .addCase(fetchTripById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createNewTrip.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createNewTrip.fulfilled, (state, action) => {
        state.loading = false
        state.trips.unshift(action.payload)
      })
      .addCase(createNewTrip.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { resetCurrentTrip } = tripsSlice.actions
export default tripsSlice.reducer