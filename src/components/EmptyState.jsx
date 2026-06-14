export default function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon className="text-6xl text-gray-200 mb-4" />
      <p className="text-gray-500 font-semibold text-lg">{title}</p>
      {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
    </div>
  )
}
