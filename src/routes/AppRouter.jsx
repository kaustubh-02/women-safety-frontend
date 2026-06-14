import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../layouts/MainLayout'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import SOS from '../pages/SOS'
import MyAlerts from '../pages/MyAlerts'
import AdminDashboard from '../pages/AdminDashboard'
import Users from '../pages/Users'
import SOSAlerts from '../pages/SOSAlerts'

// Login hona zaroori hai
function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

// Admin hona zaroori hai
function AdminRoute({ children }) {
  const { user, isAdmin } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin()) return <Navigate to="/dashboard" replace />
  return children
}

// Login hai toh dashboard pe bhejo
function GuestRoute({ children }) {
  const { user } = useAuth()
  return !user ? children : <Navigate to="/dashboard" replace />
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Guest only */}
      <Route path="/login"    element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

      {/* Protected - user */}
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/sos"        element={<SOS />} />
        <Route path="/my-alerts"  element={<MyAlerts />} />
      </Route>

      {/* Protected - admin */}
      <Route element={<AdminRoute><MainLayout /></AdminRoute>}>
        <Route path="/admin"           element={<AdminDashboard />} />
        <Route path="/admin/users"     element={<Users />} />
        <Route path="/admin/sos-alerts" element={<SOSAlerts />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
