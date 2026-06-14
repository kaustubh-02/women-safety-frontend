import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', phone: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (form.username.length < 3) return 'Username must be at least 3 characters'
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email'
    if (form.password.length < 6) return 'Password must be at least 6 characters'
    if (form.phone.length < 10) return 'Enter a valid phone number'
    return null
  }

  const onSubmit = async e => {
    e.preventDefault()
    const err = validate()
    if (err) return toast.error(err)
    setLoading(true)
    try {
      await register(form)
      toast.success('Account created! Please login.')
      navigate('/login')
    } catch (error) {
      const msg = error.response?.data || 'Registration failed'
      toast.error(typeof msg === 'string' ? msg : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-rose-600 rounded-2xl items-center justify-center shadow-lg shadow-rose-200 mb-4">
            <FaShieldAlt className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SafeGuard</h1>
          <p className="text-gray-500 text-sm mt-1">Women Safety Application</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-rose-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Create Account</h2>
          <p className="text-gray-400 text-sm mb-6">Join SafeGuard today</p>

          <form onSubmit={onSubmit} className="space-y-4">
            {[
              { name: 'username', label: 'Username', type: 'text',  placeholder: 'Choose username' },
              { name: 'email',    label: 'Email',    type: 'email', placeholder: 'your@email.com' },
              { name: 'phone',    label: 'Phone',    type: 'tel',   placeholder: '9999999999' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                <input name={f.name} type={f.type} value={form[f.name]}
                  onChange={onChange} className="input" placeholder={f.placeholder} />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input name="password" type={showPass ? 'text' : 'password'}
                  value={form.password} onChange={onChange}
                  className="input pr-12" placeholder="Min. 6 characters" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </span>
                : 'Create Account'
              }
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-rose-600 font-semibold hover:text-rose-700">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
