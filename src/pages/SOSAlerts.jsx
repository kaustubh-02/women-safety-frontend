import { useState, useEffect } from 'react'
import adminService from '../services/adminService'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'
import { FaExclamationTriangle, FaSearch, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

export default function SOSAlerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')

  useEffect(() => {
    adminService.getAllSOSAlerts()
      .then(r => setAlerts(r.data || []))
      .catch(() => setAlerts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = alerts.filter(a =>
    a.emergencyMessage?.toLowerCase().includes(search.toLowerCase()) ||
    a.locationAddress?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All SOS Alerts</h1>
          <p className="text-gray-500 text-sm mt-1">{alerts.length} total emergency alerts</p>
        </div>
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="input pl-10 py-2.5 text-sm" placeholder="Search alerts..." />
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState icon={FaExclamationTriangle} title="No alerts found" subtitle="SOS alerts will appear here" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['#', 'Message', 'Location', 'Coordinates', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((a, i) => (
                  <tr key={i} className="hover:bg-red-50/30 transition-colors">
                    <td className="px-5 py-4 text-gray-400 font-medium">{i + 1}</td>
                    <td className="px-5 py-4 max-w-xs">
                      <p className="font-semibold text-gray-800 truncate">{a.emergencyMessage || 'SOS Alert'}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-500 max-w-xs">
                      <span className="flex items-center gap-1 truncate">
                        <FaMapMarkerAlt className="text-rose-400 flex-shrink-0" />
                        {a.locationAddress || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs font-mono">
                      {a.latitude && a.longitude
                        ? `${Number(a.latitude).toFixed(4)}, ${Number(a.longitude).toFixed(4)}`
                        : '—'
                      }
                    </td>
                    <td className="px-5 py-4 text-gray-400">
                      <span className="flex items-center gap-1 text-xs">
                        <FaClock className="text-gray-300" />
                        {a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-IN') : '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        EMERGENCY
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
