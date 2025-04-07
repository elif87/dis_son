import Link from 'next/link'
import { CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const Sidebar = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <Link href="/admin/randevular" className={`flex items-center px-4 py-2 text-gray-700 ${pathname === '/admin/randevular' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
          <CalendarIcon className="h-5 w-5 mr-2" />
          Randevular
        </Link>
        <Link href="/admin/istatistikler" className={`flex items-center px-4 py-2 text-gray-700 ${pathname === '/admin/istatistikler' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
          <ChartBarIcon className="h-5 w-5 mr-2" />
          İstatistikler
        </Link>
      </div>
    </div>
  )
}

export default Sidebar 