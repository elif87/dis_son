"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Appointment {
  id: string;
  date: string;
  status: string;
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

export default function RandevularPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setAppointments(data);
        }
      })
      .catch(err => setError('Randevular yüklenirken bir hata oluştu'))
      .finally(() => setLoading(false));
  }, []);

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
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getStatusBadge = (status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED') => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
    } as const;

    const texts = {
      PENDING: 'Bekliyor',
      CONFIRMED: 'Onaylandı',
      CANCELLED: 'İptal Edildi',
      COMPLETED: 'Tamamlandı',
    } as const;

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {texts[status] || status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Randevular</h1>
          <div className="text-center">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Randevular</h1>
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Randevular</h1>
        
        {/* Filtreleme ve Arama */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Hasta adı, telefon veya doktor ara..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="ALL">Tüm Durumlar</option>
              <option value="PENDING">Bekleyen</option>
              <option value="CONFIRMED">Onaylanan</option>
              <option value="CANCELLED">İptal Edilen</option>
              <option value="COMPLETED">Tamamlanan</option>
            </select>
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow">
            Randevu bulunamadı.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {appointment.customer.name}
                  </h3>
                  {getStatusBadge(appointment.status as 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED')}
                </div>
                
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Tarih:</span> {format(new Date(appointment.date), 'PPpp', { locale: tr })}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Telefon:</span> {appointment.customer.phone}
                  </p>
                  {appointment.customer.email && (
                    <p className="text-gray-600">
                      <span className="font-medium">E-posta:</span> {appointment.customer.email}
                    </p>
                  )}
                  <p className="text-gray-600">
                    <span className="font-medium">Doktor:</span> {appointment.doctor.title} {appointment.doctor.name}
                  </p>
                  {appointment.notes && (
                    <p className="text-gray-600">
                      <span className="font-medium">Notlar:</span> {appointment.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 