"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Randevu Takibi */}
          <Link 
            href="/admin/randevular" 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Randevu Takibi</h2>
            <p className="text-gray-600">Tüm randevuları görüntüle ve durumlarını güncelle</p>
          </Link>

          {/* Doktor Yönetimi */}
          <Link 
            href="/admin/doktorlar" 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Doktor Yönetimi</h2>
            <p className="text-gray-600">Doktor ekle, düzenle veya kaldır</p>
          </Link>

          {/* İstatistikler */}
          <Link 
            href="/admin/istatistikler" 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">İstatistikler</h2>
            <p className="text-gray-600">Randevu ve hasta istatistiklerini görüntüle</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 