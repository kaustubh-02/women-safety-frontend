import api from '../utils/axios'

const sosService = {
  // SOS alert bhejo
  sendAlert: (latitude, longitude, emergencyMessage, locationAddress) =>
    api.post('/api/sos/send', { latitude, longitude, emergencyMessage, locationAddress }),

  // Meri alerts
  getMyAlerts: () =>
    api.get('/api/sos/my-alerts'),
}

export default sosService
