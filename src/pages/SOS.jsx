import { useState, useEffect } from 'react'
import sosService from '../services/sosService'
import toast from 'react-hot-toast'
import { FaExclamationTriangle, FaMapMarkerAlt } from 'react-icons/fa'

export default function SOS() {
  const [location, setLocation]   = useState(null)
  const [message, setMessage]     = useState('')
  const [sending, setSending]     = useState(false)
  const [sent, setSent]           = useState(false)
  const [confirm, setConfirm]     = useState(false)

  // GPS location lo
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      p => setLocation({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => {}
    )
  }, [])

  const sendSOS = async () => {
    setSending(true)
    setConfirm(false)
    try {
      await sosService.sendAlert(
        location?.lat || 0,
        location?.lng || 0,
        message || 'EMERGENCY! I need help immediately!',
        location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : 'Location unavailable'
      )
      setSent(true)
      toast.success('SOS Alert sent! Help is on the way!')
    } catch {
      toast.error('Failed to send SOS. Please try again!')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">SOS Emergency</h1>
        <p className="text-gray-500 text-sm mt-1">One tap to alert all your guardians</p>
      </div>

      <div className="card text-center">
        {sent ? (
          /* Success Screen */
          <div className="py-8 space-y-4">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-5xl">✅</span>
            </div>
            <h2 className="text-xl font-bold text-green-700">Alert Sent!</h2>
            <p className="text-gray-500 text-sm">Your guardians have been notified with your location</p>
            <button onClick={() => { setSent(false); setMessage('') }} className="btn-outline mt-2">
              Send Another
            </button>
          </div>
        ) : (
          /* SOS Button */
          <div className="py-8 space-y-8">
            <div>
              <p className="text-sm text-gray-500 mb-8">Press the button below to send emergency alert</p>

              {/* Giant SOS Button */}
              <button
                onClick={() => setConfirm(true)}
                disabled={sending}
                className="w-44 h-44 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 disabled:opacity-70
                  text-white shadow-2xl shadow-red-300 flex flex-col items-center justify-center gap-2
                  mx-auto transition-all duration-200 border-8 border-red-100
                  hover:shadow-red-400 animate-pulse hover:animate-none"
              >
                {sending ? (
                  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaExclamationTriangle className="text-5xl" />
                    <span className="font-black text-2xl tracking-wider">SOS</span>
                  </>
                )}
              </button>
            </div>

            {/* Location status */}
            <div className={`flex items-center justify-center gap-2 text-sm font-medium
              ${location ? 'text-green-600' : 'text-gray-400'}`}>
              <FaMapMarkerAlt />
              {location
                ? `📍 ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
                : 'Getting location...'
              }
            </div>

            {/* Custom message */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Emergency Message <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="input resize-none"
                rows={3}
                placeholder="Describe your emergency..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {confirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center space-y-5">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <FaExclamationTriangle className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Confirm SOS?</h3>
            <p className="text-gray-500 text-sm">
              This will immediately alert all your guardians with your current location.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(false)} className="btn-outline flex-1">Cancel</button>
              <button onClick={sendSOS} className="btn-danger flex-1 py-3 rounded-xl font-bold">
                YES, SEND SOS!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
