import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Google Analytics için yardımcı fonksiyon
const sendGAEvent = (eventName: string, eventParams = {}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...eventParams,
    });
  }
};

export default function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const appointmentData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        date: formData.get('date'),
        doctorId: formData.get('doctorId'),
        notes: formData.get('notes'),
      };

      // Form gönderildiğinde Google Analytics'e bildir
      sendGAEvent('form_submit', {
        event_category: 'Appointment',
        event_label: 'Randevu Formu Gönderimi'
      });

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Randevu oluşturulurken bir hata oluştu');
      }

      // Başarılı form gönderimi
      sendGAEvent('form_submit_success', {
        event_category: 'Appointment',
        event_label: 'Randevu Başarıyla Oluşturuldu'
      });

      toast.success('Randevunuz başarıyla oluşturuldu');
      router.push('/randevu-basarili');
    } catch (error) {
      console.error('Randevu oluşturma hatası:', error);
      
      // Hata durumunda Google Analytics'e bildir
      sendGAEvent('form_submit_error', {
        event_category: 'Appointment',
        event_label: 'Randevu Formu Hatası'
      });
      
      toast.error('Randevu oluşturulurken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form alanlarına tıklanınca event gönder
  const handleFieldFocus = (fieldName: string) => {
    sendGAEvent('form_field_focus', {
      event_category: 'Appointment',
      event_label: `Form Alanı: ${fieldName}`
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Ad Soyad
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          onFocus={() => handleFieldFocus('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefon
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          onFocus={() => handleFieldFocus('phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-posta
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onFocus={() => handleFieldFocus('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Randevu Tarihi
        </label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          required
          onFocus={() => handleFieldFocus('date')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">
          Doktor
        </label>
        <select
          name="doctorId"
          id="doctorId"
          required
          onFocus={() => handleFieldFocus('doctor')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Doktor seçin</option>
          {/* Doktor listesi buraya gelecek */}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notlar
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={4}
          onFocus={() => handleFieldFocus('notes')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#234b8a] to-[#3561a8] hover:from-[#3561a8] hover:to-[#234b8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Randevu Oluştur'}
        </button>
      </div>
    </form>
  );
} 