import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentService from '../../api/comments'

const initialState = {
  comments: [],
  loading: false,
  error: null,
}

export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  async (tripId, thunkAPI) => {
    try {
      return await commentService.getComments(tripId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const addNewComment = createAsyncThunk(
  'comments/add',
  async ({ tripId, text }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await commentService.addComment(tripId, { text }, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addNewComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.loading = false
        state.comments.push(action.payload)
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default commentsSlice.reducer