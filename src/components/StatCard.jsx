export default function StatCard({ title, value, icon: Icon, bg, iconColor }) {
  return (
    <div className="card">
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className={`text-xl ${iconColor}`} />
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1 font-medium">{title}</p>
    </div>
  )
}
