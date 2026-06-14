import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    if (!form.username.trim() || !form.password.trim()) {
      return toast.error('Please fill all fields')
    }
    setLoading(true)
    try {
      const data = await login(form.username, form.password)
      toast.success(`Welcome, ${data.username}!`)
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data || 'Invalid username or password'
      toast.error(typeof msg === 'string' ? msg : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-rose-600 rounded-2xl items-center justify-center shadow-lg shadow-rose-200 mb-4">
            <FaShieldAlt className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SafeGuard</h1>
          <p className="text-gray-500 text-sm mt-1">Women Safety Application</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-rose-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Sign In</h2>
          <p className="text-gray-400 text-sm mb-6">Enter your credentials to continue</p>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={onChange}
                className="input"
                placeholder="Your username"
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={onChange}
                  className="input pr-12"
                  placeholder="Your password"
                  autoComplete="current-password"
                />
                <button type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                : 'Sign In'
              }
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-rose-600 font-semibold hover:text-rose-700">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
