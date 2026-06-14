import { useState, useEffect } from 'react'
import sosService from '../services/sosService'
import AlertCard from '../components/AlertCard'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'
import { FaBell } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function MyAlerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    sosService.getMyAlerts()
      .then(res => setAlerts(res.data || []))
      .catch(() => setAlerts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My SOS Alerts</h1>
          <p className="text-gray-500 text-sm mt-1">All your emergency alerts history</p>
        </div>
        {alerts.length > 0 && (
          <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1.5 rounded-xl">
            {alerts.length} Alerts
          </span>
        )}
      </div>

      <div className="card">
        {loading ? (
          <Spinner />
        ) : alerts.length === 0 ? (
          <EmptyState
            icon={FaBell}
            title="No alerts yet"
            subtitle="Your SOS alert history will appear here"
          />
        ) : (
          <div className="space-y-3">
            {alerts.map((a, i) => <AlertCard key={i} alert={a} index={i} />)}
          </div>
        )}
      </div>

      <button onClick={() => navigate('/sos')} className="btn-primary w-full">
        + Send New SOS Alert
      </button>
    </div>
  )
}
