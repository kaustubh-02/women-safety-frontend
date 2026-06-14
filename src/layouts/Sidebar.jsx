import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import {
  FaShieldAlt, FaTachometerAlt, FaExclamationTriangle,
  FaBell, FaUsers, FaUserShield, FaSignOutAlt, FaTimes, FaList
} from 'react-icons/fa'

// Normal user links
const userLinks = [
  { to: '/dashboard',  icon: FaTachometerAlt,      label: 'Dashboard' },
  { to: '/sos',        icon: FaExclamationTriangle, label: 'SOS Emergency' },
  { to: '/my-alerts',  icon: FaBell,                label: 'My Alerts' },
]

// Admin links
const adminLinks = [
  { to: '/admin',             icon: FaUserShield, label: 'Admin Dashboard' },
  { to: '/admin/users',       icon: FaUsers,      label: 'All Users' },
  { to: '/admin/sos-alerts',  icon: FaList,       label: 'All SOS Alerts' },
]

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/login')
  }

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-30 w-64
      bg-white border-r border-gray-100
      flex flex-col transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center">
            <FaShieldAlt className="text-white text-sm" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">SafeGuard</p>
            <p className="text-xs text-gray-400">Women Safety</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 p-1">
          <FaTimes />
        </button>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3 bg-rose-50 rounded-xl p-3">
          <div className="w-9 h-9 bg-rose-200 rounded-full flex items-center justify-center">
            <span className="text-rose-700 font-bold text-sm">
              {user?.username?.[0]?.toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 text-sm truncate">{user?.username}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* User links */}
        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider px-2 mb-2">Menu</p>
        {userLinks.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} onClick={onClose}
            className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>
            <Icon className="text-base flex-shrink-0" />
            {label}
          </NavLink>
        ))}

        {/* Admin links */}
        {isAdmin() && (
          <>
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider px-2 mt-6 mb-2">Admin</p>
            {adminLinks.map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to} onClick={onClose}
                className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>
                <Icon className="text-base flex-shrink-0" />
                {label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium text-sm">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  )
}
