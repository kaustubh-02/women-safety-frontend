import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import sosService from '../services/sosService'
import StatCard from '../components/StatCard'
import AlertCard from '../components/AlertCard'
import Spinner from '../components/Spinner'
import { FaExclamationTriangle, FaBell, FaShieldAlt, FaArrowRight, FaHeart } from 'react-icons/fa'

const tips = [
  { emoji: '📍', text: 'Share your location with trusted people' },
  { emoji: '📱', text: 'Keep emergency contacts updated' },
  { emoji: '⚡', text: 'Trust your instincts in unsafe situations' },
  { emoji: '🆘', text: 'Use SOS button in any emergency' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sosService.getMyAlerts()
      .then(res => setAlerts(res.data || []))
      .catch(() => setAlerts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-10">
          <FaShieldAlt className="text-9xl" />
        </div>
        <div className="relative z-10">
          <p className="text-rose-100 text-sm font-medium mb-1">Welcome back</p>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">{user?.username} 👋</h1>
          <p className="text-rose-100 text-sm mb-6">You are protected by SafeGuard</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/sos')}
              className="bg-white text-rose-600 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-rose-50 transition-all shadow-sm">
              🆘 Send SOS
            </button>
            <button onClick={() => navigate('/my-alerts')}
              className="bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/30 transition-all">
              📋 View Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="SOS Sent"     value={loading ? '...' : alerts.length} icon={FaExclamationTriangle} bg="bg-red-50"    iconColor="text-red-500" />
        <StatCard title="Notifications" value="0"                               icon={FaBell}                bg="bg-blue-50"   iconColor="text-blue-500" />
        <StatCard title="Safe Status"   value="✓"                               icon={FaHeart}               bg="bg-green-50"  iconColor="text-green-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent SOS Alerts</h2>
            <button onClick={() => navigate('/my-alerts')}
              className="flex items-center gap-1 text-rose-600 text-sm font-medium hover:gap-2 transition-all">
              View all <FaArrowRight className="text-xs" />
            </button>
          </div>
          {loading ? <Spinner /> : alerts.length === 0 ? (
            <div className="text-center py-8">
              <FaExclamationTriangle className="text-4xl text-gray-200 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No alerts sent yet</p>
              <button onClick={() => navigate('/sos')} className="btn-primary mt-4 text-sm">
                Test SOS
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.slice(0, 3).map((a, i) => <AlertCard key={i} alert={a} index={i} />)}
            </div>
          )}
        </div>

        {/* Safety Tips */}
        <div className="card">
          <h2 className="font-bold text-gray-900 mb-4">Safety Tips</h2>
          <div className="space-y-3">
            {tips.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-rose-50 rounded-xl">
                <span className="text-xl">{t.emoji}</span>
                <p className="text-sm text-gray-700 font-medium">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
