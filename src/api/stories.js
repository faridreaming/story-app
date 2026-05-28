import api from './config.js'

export async function getStories() {
  const response = await api.get('/stories')
  return response.data
}

export async function addStory(formData) {
  const response = await api.post('/stories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}
