import axios from 'axios'

const API_URL = '/api/upload'


const uploadImage = async (file, token) => {
  const formData = new FormData()
  formData.append('image', file)

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const response = await axios.post(`${API_URL}/image`, formData, config)
  return response.data
}


const deleteImage = async (imageUrl, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`${API_URL}/image`, {
    ...config,
    data: { imageUrl },
  })
  return response.data
}

const uploadService = {
  uploadImage,
  deleteImage,
}

export default uploadService