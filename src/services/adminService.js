import api from '../utils/axios'

const adminService = {
  // Sab users
  getAllUsers: () => api.get('/api/admin/users'),

  // User delete karo
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),

  // Sab SOS alerts
  getAllSOSAlerts: () => api.get('/api/admin/sos-alerts'),
}

export default adminService
