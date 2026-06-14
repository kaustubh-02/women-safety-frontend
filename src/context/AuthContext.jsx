import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)     // Current user object
  const [loading, setLoading] = useState(true) // App load ho rahi hai?

  // App start pe localStorage se user restore karo
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (savedUser && token) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Login function - API call + localStorage save
  const login = async (username, password) => {
    const res = await api.post('/api/auth/login', { username, password })
    const data = res.data
    // Token aur user data save karo
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data))
    setUser(data)
    return data
  }

  // Register function
  const register = async (formData) => {
    const res = await api.post('/api/auth/register', {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: ['ROLE_USER']
    })
    return res.data
  }

  // Logout - sab clear karo
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  // Helper - admin hai?
  const isAdmin = () => user?.roles?.includes('ROLE_ADMIN')

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// Custom hook - context use karne ke liye
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
