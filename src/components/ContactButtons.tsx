import Link from 'next/link';

// Google Analytics için yardımcı fonksiyon
const sendGAEvent = (eventName: string, eventParams = {}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    console.log('GA Event gönderiliyor:', eventName, eventParams);
    try {
      (window as any).gtag('event', eventName, {
        ...eventParams,
      });
      console.log('GA Event başarıyla gönderildi');
    } catch (error) {
      console.error('GA Event gönderme hatası:', error);
    }
  } else {
    console.warn('gtag bulunamadı');
  }
};

export default function ContactButtons() {
  const handlePhoneClick = () => {
    console.log('Telefon butonuna tıklandı');
    sendGAEvent('contact_click', {
      event_category: 'Contact',
      event_label: 'Telefon Araması'
    });
  };

  const handleWhatsAppClick = () => {
    console.log('WhatsApp butonuna tıklandı');
    sendGAEvent('contact_click', {
      event_category: 'Contact',
      event_label: 'WhatsApp Mesajı'
    });
  };

  const handleAppointmentClick = () => {
    console.log('Randevu butonuna tıklandı');
    sendGAEvent('contact_click', {
      event_category: 'Contact',
      event_label: 'Randevu Butonu'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
      {/* Telefon Butonu */}
      <a
        href="tel:+905349597554"
        onClick={handlePhoneClick}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        title="Bizi Arayın"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>

      {/* WhatsApp Butonu */}
      <a
        href="https://wa.me/905349597554"
        onClick={handleWhatsAppClick}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        title="WhatsApp'tan Mesaj Gönderin"
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>

      {/* Randevu Butonu */}
      <Link
        href="/randevu"
        onClick={handleAppointmentClick}
        className="bg-[#234b8a] hover:bg-[#3561a8] text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        title="Randevu Alın"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </Link>
    </div>
  );
} 