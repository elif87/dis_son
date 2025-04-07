"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Link from 'next/link';
import { AppointmentStatus } from '@prisma/client';

interface Appointment {
  id: string;
  date: string;
  status: AppointmentStatus;
  notes?: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  doctor: {
    name: string;
    title: string;
  };
}

export default function AdminRandevularPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | AppointmentStatus>('ALL');

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments/admin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error('Randevular getirilemedi');
      }

      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // İlk yükleme ve periyodik yenileme
  useEffect(() => {
    fetchAppointments();

    // Her 30 saniyede bir yenile
    const interval = setInterval(fetchAppointments, 30000);

    return () => clearInterval(interval);
  }, []);

  const updateAppointmentStatus = async (id: string, newStatus: AppointmentStatus) => {
    try {
      setError(null);
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Randevu güncellenemedi');
      }

      // Randevuları yeniden yükle
      await fetchAppointments();
      
      // Başarı mesajı göster
      alert('Randevu başarıyla güncellendi');
    } catch (err) {
      console.error('Güncelleme hatası:', err);
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      alert('Randevu güncellenirken bir hata oluştu');
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!window.confirm('Bu randevuyu silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Randevu silinemedi');
      }

      await fetchAppointments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    }
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    const styles: Record<AppointmentStatus, string> = {
      [AppointmentStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
      [AppointmentStatus.CONFIRMED]: 'bg-green-100 text-green-800',
      [AppointmentStatus.CANCELLED]: 'bg-red-100 text-red-800',
      [AppointmentStatus.COMPLETED]: 'bg-blue-100 text-blue-800',
    };

    const texts: Record<AppointmentStatus, string> = {
      [AppointmentStatus.PENDING]: 'Bekliyor',
      [AppointmentStatus.CONFIRMED]: 'Onaylandı',
      [AppointmentStatus.CANCELLED]: 'İptal Edildi',
      [AppointmentStatus.COMPLETED]: 'Tamamlandı',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {texts[status]}
      </span>
    );
  };

  // Filtreleme işlemleri
  const filteredAppointments = appointments
    .filter(appointment => {
      const matchesStatus = filterStatus === 'ALL' || appointment.status === filterStatus;
      const matchesSearch = searchTerm === '' || 
        appointment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.customer.phone.includes(searchTerm) ||
        appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Randevu Takibi</h1>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Randevu Takibi</h1>
          <Link 
            href="/admin"
            className="bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
          >
            Admin Panele Dön
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Filtreleme ve Arama */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Hasta adı, telefon veya doktor ara..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'ALL' | AppointmentStatus)}
          >
            <option value="ALL">Tüm Durumlar</option>
            <option value={AppointmentStatus.PENDING}>Bekleyen</option>
            <option value={AppointmentStatus.CONFIRMED}>Onaylanan</option>
            <option value={AppointmentStatus.CANCELLED}>İptal Edilen</option>
            <option value={AppointmentStatus.COMPLETED}>Tamamlanan</option>
          </select>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hasta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doktor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İletişim</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Randevu bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.customer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.doctor.title} {appointment.doctor.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{format(new Date(appointment.date), 'PPpp', { locale: tr })}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.customer.phone}</div>
                        {appointment.customer.email && (
                          <div className="text-sm text-gray-500">{appointment.customer.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <select
                            value={appointment.status}
                            onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value as AppointmentStatus)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value={AppointmentStatus.PENDING}>Bekliyor</option>
                            <option value={AppointmentStatus.CONFIRMED}>Onaylandı</option>
                            <option value={AppointmentStatus.CANCELLED}>İptal Edildi</option>
                            <option value={AppointmentStatus.COMPLETED}>Tamamlandı</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => deleteAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 