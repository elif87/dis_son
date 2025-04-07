'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Swiper CSS dosyalarını doğrudan import edelim
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: "Kübra Yavuz",
    comment: "Daha önceki gittiğim dişçilerde dolgu yaptırırken iğne acısını çok hissediyordum burda hiçbir acı hissetmedim. Aybüke doktorun eli çok hafif. Tavsiye ederim.Çalışanlar çok güler yüzlüydü. İlgilerinden memnun kaldım.",
    image: "/images/avatar1.png",
    rating: 5,
    treatment: "Dolgu Tedavisi"
  },
  {
    name: "Melek Kaymaz",
    comment: "İzmit'te çok klinik araştırdım ve en iyisini buldum tedavi sürecinde ilgi alakalarından gerçekten çok memnun kaldım ve hiç sorun yaşamadım sıcak samimi bir klinik ve Fatma hocam işinin ehli bir hekim herşey için çok teşekkür ederim Denttitanyum ❤️",
    image: "/images/avatar2.png",
    rating: 5,
    treatment: "Genel Tedavi"
  },
  {
    name: "Pınar Aliskan",
    comment: "Dişlerimin görünümünden rahatsız olduğum için Almanya'dan geldim. Çok profesyonellerdi. Titiz ve her detaya dikkat eden Doktor Aybüke Hanıma ve Huriye Hanıma teşekkür ederim. Şüphesiz tercih edebilirsiniz. Tekrar görüşmek über ellerinize sağlık",
    image: "/images/avatar3.png",
    rating: 5,
    treatment: "Estetik Diş Tedavisi"
  },
  {
    name: "Ali Berk Çoban",
    comment: "Çok memnun kaldım iplant sürecinde çok ilgililerdi ve düzenli bir şekilde kontrol muayeneleri düzenlendi çok teşekkürler",
    image: "/images/avatar4.png",
    rating: 5,
    treatment: "İmplant Tedavisi"
  }
];

export default function TestimonialSlider() {
  return (
    <Swiper
      className="testimonials-swiper"
      effect="coverflow"
      slidesPerView={1}
      centeredSlides={true}
      spaceBetween={20}
      grabCursor={true}
      loop={true}
      speed={600}
      coverflowEffect={{
        rotate: 15,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[EffectCoverflow, Pagination, Navigation]}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }}
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide 
          key={index} 
          className="testimonial-slide"
          style={{
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            transition: 'all 0.3s ease',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 mx-2 h-full">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0">
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(to right, #1a365d, #2d4a77)',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}>
                  {testimonial.name.charAt(0)}
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                <div className="flex text-yellow-400 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-4">{testimonial.comment}</p>
            
            <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-[#1a365d]">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{testimonial.treatment}</span>
              </div>
              <div className="ml-auto flex items-center">
                <svg className="w-4 h-4 text-[#1a365d] mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <span className="text-xs text-gray-500">Google Değerlendirmesi</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
} 