export default function Badge({ children, color = 'rose' }) {
  const colors = {
    rose:   'bg-rose-100 text-rose-700',
    green:  'bg-green-100 text-green-700',
    blue:   'bg-blue-100 text-blue-700',
    red:    'bg-red-100 text-red-700',
    gray:   'bg-gray-100 text-gray-600',
  }
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${colors[color]}`}>
      {children}
    </span>
  )
}
