import { FaMapMarkerAlt, FaClock, FaExclamationTriangle } from 'react-icons/fa'

export default function AlertCard({ alert, index }) {
  // Date format karo
  const date = alert.createdAt
    ? new Date(alert.createdAt).toLocaleString('en-IN')
    : 'Just now'

  return (
    <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-100 rounded-xl hover:shadow-sm transition-shadow">
      {/* Number badge */}
      <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <FaExclamationTriangle className="text-red-500 text-sm" />
      </div>

      <div className="flex-1 min-w-0">
        {/* Message */}
        <p className="font-semibold text-gray-800 text-sm truncate">
          {alert.emergencyMessage || 'SOS Emergency Alert'}
        </p>

        <div className="flex flex-wrap gap-3 mt-1.5">
          {/* Location */}
          {alert.locationAddress && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <FaMapMarkerAlt className="text-rose-400" />
              {alert.locationAddress}
            </span>
          )}
          {/* Time */}
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <FaClock className="text-gray-300" />
            {date}
          </span>
        </div>
      </div>

      {/* Status */}
      <span className="flex-shrink-0 text-xs bg-red-600 text-white px-2.5 py-1 rounded-full font-semibold">
        SENT
      </span>
    </div>
  )
}
