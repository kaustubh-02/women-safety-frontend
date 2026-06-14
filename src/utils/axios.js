import axios from 'axios'
import toast from 'react-hot-toast'

// Axios instance - base URL set hai
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
})

// Har request mein JWT token automatically attach hoga
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response errors globally handle karo
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 = token expired - logout karo
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
