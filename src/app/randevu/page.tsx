"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Doctor {
  id: string;
  name: string;
  title: string;
}

export default function RandevuPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    doctorId: '',
    notes: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{message: string, appointmentDate: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Çalışma saatlerini kontrol eden yardımcı fonksiyon
  const isValidWorkingHours = (date: string, time: string) => {
    const selectedDate = new Date(date);
    const selectedTime = new Date(`${date}T${time}`);
    
    // Pazar günü kontrolü
    if (selectedDate.getDay() === 0) {
      return false;
    }

    // Saat kontrolü
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    
    // 10:00 - 22:00 arası kontrol
    if (hours < 10 || (hours === 22 && minutes > 0) || hours > 22) {
      return false;
    }

    return true;
  };

  // Minimum tarih hesaplama (bugün)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Maksimum tarih hesaplama (30 gün sonrası)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    // Doktorları getir
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
          cache: 'no-store'
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setDoctors(data);
          // İlk doktoru varsayılan olarak seç
          if (data.length > 0) {
            setFormData(prevData => ({
              ...prevData,
              doctorId: data[0].id
            }));
          }
        } else {
          console.error('Beklenmeyen veri formatı:', data);
          throw new Error('Doktor verileri beklenmeyen formatta');
        }
      } catch (err) {
        console.error('Doktorlar yüklenirken hata:', err);
        setError(err instanceof Error ? err.message : 'Doktorlar yüklenirken bir hata oluştu');
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Seçilen tarih ve doktor için dolu randevuları getir
    const fetchBookedSlots = async () => {
      if (!formData.date || !formData.doctorId) return;

      try {
        const response = await fetch(`/api/appointments/booked-slots?date=${formData.date}&doctorId=${formData.doctorId}`, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setBookedSlots(data.bookedSlots || []);
        }
      } catch (error) {
        console.error('Dolu randevular yüklenirken hata:', error);
      }
    };

    fetchBookedSlots();
  }, [formData.date, formData.doctorId]);

  // Telefon numarası formatı için yardımcı fonksiyon
  const formatPhoneNumber = (value: string) => {
    // Sadece rakamları al
    const numbers = value.replace(/\D/g, '');
    
    // Formatlama
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;
    } else {
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Çalışma saatleri kontrolü
      if (!isValidWorkingHours(formData.date, formData.time)) {
        throw new Error('Lütfen çalışma saatleri içinde (10:00-22:00) ve hafta içi bir randevu seçin. Pazar günleri randevu alınamaz.');
      }

      // Form validasyonu
      if (!formData.doctorId) {
        throw new Error('Lütfen bir doktor seçin');
      }

      // Mükerrer randevu kontrolü
      const duplicateCheckResponse = await fetch('/api/appointments/check-duplicate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone.replace(/\D/g, ''),
          date: new Date(`${formData.date}T${formData.time}`).toISOString()
        })
      });

      const duplicateData = await duplicateCheckResponse.json();
      if (!duplicateCheckResponse.ok) {
        throw new Error(duplicateData.error || 'Mükerrer randevu kontrolü yapılamadı');
      }

      if (duplicateData.hasDuplicate) {
        throw new Error('Bu hasta için belirtilen tarihte zaten bir randevu bulunmaktadır');
      }

      // Önce müşteriyi oluştur
      const customerResponse = await fetch('/api/customers', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone.replace(/\D/g, ''),
          email: formData.email
        })
      });

      let customerData;
      try {
        customerData = await customerResponse.json();
      } catch (e) {
        throw new Error('Sunucu yanıtı işlenirken bir hata oluştu');
      }

      if (!customerResponse.ok) {
        throw new Error(customerData.error || 'Müşteri oluşturulamadı');
      }

      // Randevu tarihini oluştur
      const appointmentDate = new Date(`${formData.date}T${formData.time}`);
      
      // Geçerli bir tarih olup olmadığını kontrol et
      if (isNaN(appointmentDate.getTime())) {
        throw new Error('Geçersiz randevu tarihi veya saati');
      }

      // Randevuyu oluştur
      const appointmentResponse = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({
          date: appointmentDate.toISOString(),
          customerId: customerData.id,
          doctorId: formData.doctorId,
          notes: formData.notes
        })
      });

      let appointmentData;
      try {
        appointmentData = await appointmentResponse.json();
      } catch (e) {
        throw new Error('Sunucu yanıtı işlenirken bir hata oluştu');
      }

      if (!appointmentResponse.ok) {
        throw new Error(appointmentData.error + (appointmentData.suggestedSlots ? `\n${appointmentData.suggestedSlots}` : ''));
      }

      // Başarılı mesajı göster ve formu sıfırla
      setSuccess({
        message: 'Randevunuz başarıyla oluşturuldu!',
        appointmentDate: new Date(appointmentData.date).toLocaleString('tr-TR', {
          dateStyle: 'full',
          timeStyle: 'short'
        })
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        doctorId: '',
        notes: ''
      });

      // 5 saniye sonra başarı mesajını kaldır
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (error: any) {
      console.error('Detaylı hata:', error);
      setError(error.message || 'Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Randevu Al</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 whitespace-pre-line">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{success.message}</p>
                <p className="mt-1 text-sm text-green-700">Randevu Tarihi: {success.appointmentDate}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium placeholder:text-gray-400"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                required
                placeholder="555 555 55 55"
                maxLength={14}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium placeholder:text-gray-400"
                value={formData.phone}
                onChange={handlePhoneChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium placeholder:text-gray-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-1">
                Doktor
              </label>
              <select
                id="doctorId"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              >
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.title} {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Tarih
              </label>
              <input
                type="date"
                id="date"
                required
                min={getMinDate()}
                max={getMaxDate()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                value={formData.date}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  // Eğer pazar günü seçilirse, bir sonraki pazartesiye ayarla
                  if (selectedDate.getDay() === 0) {
                    selectedDate.setDate(selectedDate.getDate() + 1);
                    e.target.value = selectedDate.toISOString().split('T')[0];
                  }
                  setFormData({ ...formData, date: e.target.value });
                }}
              />
              <p className="mt-1 text-sm text-gray-500">Pazar günleri randevu alınamaz</p>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Saat
              </label>
              <select
                id="time"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              >
                <option value="">Saat Seçin</option>
                {Array.from({ length: 48 }, (_, i) => {
                  const hour = Math.floor(i / 4) + 10;
                  const minute = (i % 4) * 15;
                  const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                  const isBooked = bookedSlots.includes(timeStr);
                  const isSelected = formData.time === timeStr;
                  
                  if (hour < 22) {
                    return (
                      <option 
                        key={timeStr} 
                        value={timeStr}
                        disabled={isBooked}
                        className={`
                          ${isBooked ? 'text-red-500 bg-red-50' : ''}
                          ${isSelected ? 'text-green-500 bg-green-50' : ''}
                        `}
                      >
                        {timeStr}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
              <p className="mt-1 text-sm text-gray-500">Çalışma saatleri: 10:00 - 22:00</p>
              <p className="mt-1 text-xs text-gray-400">
                <span className="inline-block w-3 h-3 bg-red-50 border border-red-500 rounded-sm mr-1"></span> Dolu
                <span className="inline-block w-3 h-3 bg-green-50 border border-green-500 rounded-sm ml-3 mr-1"></span> Seçili
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notlar
            </label>
            <textarea
              id="notes"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium placeholder:text-gray-400"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-[#234b8a] to-[#3561a8] text-white py-3 px-4 rounded-md hover:from-[#3561a8] hover:to-[#234b8a] transition-all duration-300 font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Randevu Oluşturuluyor...' : 'Randevu Oluştur'}
          </button>
        </form>
      </div>
    </div>
  );
} 