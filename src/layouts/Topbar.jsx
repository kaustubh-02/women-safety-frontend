import { FaBars, FaShieldAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-6 h-16 flex items-center justify-between flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-500 hover:text-gray-700 p-1">
          <FaBars className="text-xl" />
        </button>
        <div className="hidden lg:block">
          <p className="font-semibold text-gray-800 text-sm">Welcome back, <span className="text-rose-600">{user?.username}</span> 👋</p>
          <p className="text-xs text-gray-400">Stay safe, stay strong</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Quick SOS */}
        <button onClick={() => navigate('/sos')}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm shadow-red-200">
          <FaShieldAlt />
          <span>SOS</span>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center">
          <span className="text-rose-700 font-bold text-sm">
            {user?.username?.[0]?.toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  )
}
