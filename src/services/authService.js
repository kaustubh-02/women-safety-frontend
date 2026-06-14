import api from '../utils/axios'

const authService = {
  // Login API
  login: (username, password) =>
    api.post('/api/auth/login', { username, password }),

  // Register API
  register: (data) =>
    api.post('/api/auth/register', {
      username: data.username,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: ['ROLE_USER']
    }),
}

export default authService
