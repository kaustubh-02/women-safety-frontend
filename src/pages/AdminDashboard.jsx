import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import adminService from '../services/adminService'
import StatCard from '../components/StatCard'
import Spinner from '../components/Spinner'
import { FaUsers, FaExclamationTriangle, FaArrowRight, FaShieldAlt } from 'react-icons/fa'

export default function AdminDashboard() {
  const [users, setUsers]   = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      adminService.getAllUsers().then(r => setUsers(r.data || [])),
      adminService.getAllSOSAlerts().then(r => setAlerts(r.data || []))
    ]).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">System overview and management</p>
      </div>

      {loading ? <Spinner size="lg" /> : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard title="Total Users"  value={users.length}  icon={FaUsers}               bg="bg-blue-50"  iconColor="text-blue-500" />
            <StatCard title="SOS Alerts"   value={alerts.length} icon={FaExclamationTriangle}  bg="bg-red-50"   iconColor="text-red-500" />
            <StatCard title="System"       value="Active"        icon={FaShieldAlt}             bg="bg-green-50" iconColor="text-green-500" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Recent Users</h2>
                <button onClick={() => navigate('/admin/users')}
                  className="flex items-center gap-1 text-rose-600 text-sm font-medium hover:gap-2 transition-all">
                  View all <FaArrowRight className="text-xs" />
                </button>
              </div>
              <div className="space-y-3">
                {users.slice(0, 5).map(u => (
                  <div key={u.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 font-bold text-sm">{u.username?.[0]?.toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{u.username}</p>
                      <p className="text-xs text-gray-400 truncate">{u.email}</p>
                    </div>
                    <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium">User</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Recent SOS Alerts</h2>
                <button onClick={() => navigate('/admin/sos-alerts')}
                  className="flex items-center gap-1 text-rose-600 text-sm font-medium hover:gap-2 transition-all">
                  View all <FaArrowRight className="text-xs" />
                </button>
              </div>
              <div className="space-y-3">
                {alerts.slice(0, 5).map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaExclamationTriangle className="text-red-500 text-xs" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{a.emergencyMessage || 'SOS Alert'}</p>
                      <p className="text-xs text-gray-400 truncate">{a.locationAddress || 'Unknown'}</p>
                    </div>
                  </div>
                ))}
                {alerts.length === 0 && <p className="text-gray-400 text-sm text-center py-4">No alerts yet</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
