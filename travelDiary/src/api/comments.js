import axios from 'axios'

const API_URL = '/api/comments'


const addComment = async (tripId, commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    `${API_URL}/${tripId}`,
    commentData,
    config
  )
  return response.data
}


const getComments = async (tripId) => {
  const response = await axios.get(`${API_URL}/${tripId}`)
  return response.data
}


const deleteComment = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`${API_URL}/${commentId}`, config)
  return response.data
}

const commentService = {
  addComment,
  getComments,
  deleteComment,
}

export default commentService