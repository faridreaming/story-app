import api from './config.js'

export async function login(email, password) {
  const response = await api.post('/login', { email, password })
  return response.data
}

export async function register(name, email, password) {
  const response = await api.post('/register', { name, email, password })
  return response.data
}
