import { useState, useEffect } from 'react'
import adminService from '../services/adminService'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'
import toast from 'react-hot-toast'
import { FaUsers, FaTrash, FaSearch } from 'react-icons/fa'

export default function Users() {
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [deleting, setDeleting] = useState(null)

  const load = () => {
    setLoading(true)
    adminService.getAllUsers()
      .then(r => setUsers(r.data || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id, username) => {
    if (!window.confirm(`Delete user "${username}"? This cannot be undone.`)) return
    setDeleting(id)
    try {
      await adminService.deleteUser(id)
      toast.success('User deleted')
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch {
      toast.error('Failed to delete user')
    } finally {
      setDeleting(null)
    }
  }

  const filtered = users.filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
          <p className="text-gray-500 text-sm mt-1">{users.length} total registered users</p>
        </div>
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-10 py-2.5 text-sm"
            placeholder="Search users..."
          />
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState icon={FaUsers} title="No users found" subtitle="Try a different search" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['#', 'User', 'Email', 'Phone', 'Role', 'Action'].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u, i) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-gray-400 font-medium">{i + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-rose-600 font-bold text-xs">{u.username?.[0]?.toUpperCase()}</span>
                        </div>
                        <span className="font-semibold text-gray-800">{u.username}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500">{u.email || '—'}</td>
                    <td className="px-5 py-4 text-gray-500">{u.phone || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                        ${u.roles?.some(r => r.name === 'ROLE_ADMIN' || r === 'ROLE_ADMIN')
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-rose-100 text-rose-700'}`}>
                        {u.roles?.some(r => r.name === 'ROLE_ADMIN' || r === 'ROLE_ADMIN') ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(u.id, u.username)}
                        disabled={deleting === u.id}
                        className="flex items-center gap-1.5 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium disabled:opacity-50">
                        <FaTrash className="text-xs" />
                        {deleting === u.id ? 'Deleting...' : 'Delete'}
                      </button>
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
