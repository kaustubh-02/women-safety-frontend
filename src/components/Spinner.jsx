export default function Spinner({ size = 'md' }) {
  const s = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8'
  return (
    <div className="flex justify-center items-center p-6">
      <div className={`${s} border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin`} />
    </div>
  )
}
