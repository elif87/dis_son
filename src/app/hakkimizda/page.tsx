"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import './styles.css';

// Kullanılmayan dinamik importlar yorum satırı haline getirildi
// const DynamicSwiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), { ssr: false });
// const DynamicSwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), { ssr: false });

// Kullanılmayan Swiper modülleri yorum satırı haline getirildi
// const EffectCoverflow = dynamic(() => import('swiper/modules').then(mod => mod.EffectCoverflow), { ssr: false });
// const Pagination = dynamic(() => import('swiper/modules').then(mod => mod.Pagination), { ssr: false });
// const Navigation = dynamic(() => import('swiper/modules').then(mod => mod.Navigation), { ssr: false });

// CSS'leri içe aktaracak bileşen (sadece client tarafında çalışacak)
const SwiperStyles = dynamic(() => import('./SwiperStyles'), { ssr: false });

// Tüm Swiper bileşenlerini tek bir dinamik import ile getir
const DynamicTestimonialSlider = dynamic(
  () => import('./TestimonialSlider'),
  {
    loading: () => (
      <div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <p className="text-gray-400">Yorumlar yükleniyor...</p>
      </div>
    ),
    ssr: false
  }
);

const DynamicImageViewer = dynamic(() => import('../components/ImageViewer'), {
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="animate-pulse bg-white/10 w-full max-w-4xl aspect-[4/3] rounded-xl"></div>
    </div>
  ),
  ssr: false
});

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string; size: string }>>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map(() => {
      // Create a more clustered distribution
      const baseX = 40 + Math.random() * 20; // Center around 40-60%
      const baseY = 40 + Math.random() * 20; // Center around 40-60%
      
      // Add slight variations for natural look
      const x = baseX + (Math.random() - 0.5) * 10;
      const y = baseY + (Math.random() - 0.5) * 10;
      
      return {
        left: `${x}%`,
        top: `${y}%`,
        delay: `${Math.random() * 2}s`, // Shorter delays
        duration: `${8 + Math.random() * 4}s`, // Shorter durations
        size: `${1 + Math.random() * 2}px` // Varying sizes
      };
    });
    setParticles(newParticles);
  }, []);

  const values = [
    {
      title: "Profesyonellik",
      description: "En yüksek kalitede hizmet sunmak için sürekli kendimizi geliştiriyoruz.",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
      title: "Güven",
      description: "Hastalarımızla şeffaf ve dürüst bir ilişki kurmayı önemsiyoruz.",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    },
    {
      title: "Yenilikçilik",
      description: "En son teknolojileri ve tedavi yöntemlerini takip ediyoruz.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    }
  ];

  const galleryImages = [
    "/klinik/2.webp",
    "/klinik/8.webp",
    "/klinik/dent_titanyum (1).webp",
    "/klinik/3.webp"
  ];

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    setGalleryIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setGalleryIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const stats = [
    { number: "16+", text: "Yıllık Deneyim" },
    { number: "1000+", text: "Mutlu Hasta" },
    { number: "10+", text: "Uzman Personel" },
    { number: "100%", text: "Hasta Memnuniyeti" },
  ];

  // Testimonials verileri yorum satırları içine alındı
  /* 
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
      comment: "İzmit&apos;te çok klinik araştırdım ve en iyisini buldum tedavi sürecinde ilgi alakalarından gerçekten çok memnun kaldım ve hiç sorun yaşamadım sıcak samimi bir klinik ve Fatma hocam işinin ehli bir hekim herşey için çok teşekkür ederim Denttitanyum ❤️",
      image: "/images/avatar2.png",
      rating: 5,
      treatment: "Genel Tedavi"
    },
    {
      name: "Pınar Aliskan",
      comment: "Dişlerimin görünümünden rahatsız olduğum için Almanya&apos;dan geldim. Çok profesyonellerdi. Titiz ve her detaya dikkat eden Doktor Aybüke Hanıma ve Huriye Hanıma teşekkür ederim. Şüphesiz tercih edebilirsiniz. Tekrar görüşmek über ellerinize sağlık",
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
  */

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section with Parallax Effect */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] py-12 md:py-24 overflow-hidden">
          {/* Image background with animation */}
          <div className="absolute inset-0 scale-110">
            <div className="absolute inset-0 bg-white opacity-40"></div>
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 bg-repeat"></div>
            <Image
              src="/klinik/dent_titanyum (1).webp"
              alt="DentTitanyum Hakkında"
              fill
              priority
              className="object-cover object-[center_25%] opacity-75"
            />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white z-10"></div>
          
          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 md:px-6 text-center mt-8 md:mt-16">
            <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="mb-4">
                <span className="py-1.5 px-3 md:px-4 text-xs font-semibold tracking-widest uppercase rounded-full inline-flex items-center gap-2 text-[#1a365d] bg-[#1a365d]/10 border border-[#1a365d]/20">
                  <span className="w-1.5 h-1.5 bg-[#1a365d] rounded-full"></span>
                  Bizi Yakından Tanıyın
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 bg-gradient-to-r from-gray-800 via-gray-800 to-[#1a365d] bg-clip-text text-transparent leading-tight">
                DentTitanyum
                <span className="block text-[#1a365d] mt-2">Ağız ve Diş Sağlığı Merkezi</span>
              </h1>
              <p className="text-gray-800/70 text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-10 px-4">
                Modern teknoloji ve uzman kadromuzla &apos;Dent Titanyum&apos;da sizlere en iyi hizmeti sunmak için buradayız.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-4">
                <Link 
                  href="#about-us" 
                  className="w-full md:w-auto group relative overflow-hidden px-6 md:px-8 py-3 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:shadow-glow-cyan transform transition-all duration-300"
                >
                  <span className="relative z-10">Hakkımızda</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00A69C] to-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                </Link>
                <Link 
                  href="/iletisim" 
                  className="w-full md:w-auto px-6 md:px-8 py-3 bg-transparent border border-gray-800/30 text-gray-800 rounded-lg text-sm font-semibold hover:bg-gray-800/10 transition-all duration-300"
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative -mt-8 z-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-3 md:p-4 transform transition-all duration-500 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                >
                  <div className="text-xl md:text-2xl font-bold text-[#00A69C] mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-xs md:text-sm">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about-us" className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <span className="inline-block py-1 px-4 rounded-full bg-[#1a365d]/10 text-[#1a365d] text-sm font-medium mb-4">
                Hakkımızda
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                Bizi Yakından Tanıyın
              </h2>
              <div className="w-16 md:w-24 h-1 bg-[#1a365d] rounded-full mx-auto mb-4 md:mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
                DentTitanyum&apos;da hastalarımızın memnuniyeti bizim önceliğimizdir. Modern diş hekimliği teknolojileri ve uzman kadromuzla sizlere en kaliteli hizmeti sunmak için buradayız.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
              {/* Mission & Vision */}
              <div className="lg:col-span-1 space-y-6 md:space-y-8 px-4 md:px-0">
                <div className="group bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/5 to-[#2d4a77]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="w-14 h-14 bg-[#1a365d]/10 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-[#1a365d] text-2xl font-bold mb-4">Misyonumuz</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dent Titanyum Ağız ve Diş Sağlığı Polikliniği olarak insanların gülüşlerine dokunmak, 
                    ağız ve diş sağlıklarını korumak ve en önemlisi de bunu yaparken insani değerlerden ve 
                    kaliteden ödün vermeden hizmet etmek gayesiyle besleniyoruz.
                  </p>
                </div>

                <div className="group bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2d4a77]/5 to-[#1a365d]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="w-14 h-14 bg-[#2d4a77]/10 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-[#2d4a77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-[#2d4a77] text-2xl font-bold mb-4">Vizyonumuz</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Kendimize öngördüğümüz vizyonumuz ise ağız ve diş sağlığı konusunda öncü ve ahlaki 
                    değerler açısından da örnek bir kurum olarak ülkemiz sağlık sektöründe bir çığır açmak.
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-2 px-4 md:px-0">
                <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-lg transform transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 border-l-4 border-[var(--primary-color)] relative overflow-hidden h-full`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-color)]/5 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-[var(--primary-color)]/5 rounded-full -mr-12 -mb-12"></div>
                  <div className="relative h-full flex flex-col">
                    <h3 className="text-[var(--primary-color)] text-xl md:text-2xl font-bold mb-4 md:mb-6">Klinik <span className="text-[#1a365d]">Galerimiz</span></h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {galleryImages.map((image, index) => (
                        <div 
                          key={index}
                          className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                          onClick={() => openGallery(index)}
                        >
                          <Image
                            src={image}
                            alt={`DentTitanyum Klinik Görünüm ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Modal */}
        {isGalleryOpen && (
          <DynamicImageViewer
            images={galleryImages}
            currentIndex={galleryIndex}
            onClose={closeGallery}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
        
        {/* FAQ Section */}
        <section className="py-8 md:py-12 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <span className="inline-block py-1 px-3 md:px-4 rounded-full bg-[#1a365d]/10 text-[#1a365d] text-xs md:text-sm font-medium mb-2">
                Merak Edilenler
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
                Sıkça Sorulan Sorular
              </h2>
              <div className="w-12 md:w-16 h-1 bg-[#1a365d] rounded-full mx-auto mb-2 md:mb-3"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-4">
                Hastalarımızın en çok merak ettiği soruları ve cevaplarını sizler için derledik.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-2 px-2 md:px-0">
              {[
                {
                  question: "Bir kanal tedavisi nasıl yapılır ve ne kadar sürer?",
                  answer: "Kanal tedavisi, enfekte veya iltihaplı bir dişin iç kısmının temizlenmesi ve doldurulmasını içerir. Tedavi genellikle bir veya birkaç seansta tamamlanır. Ancak, vakanın karmaşıklığına bağlı olarak süre değişebilir."
                },
                {
                  question: "Ağrılı bir diş problemi için acil bir randevu nasıl alabilirim?",
                  answer: "Acil bir durumda, hemen bizi arayabilir veya acil randevu almak için çevrimiçi randevu sistemimizi kullanabilirsiniz. Acil durumlar için öncelikli randevular mevcuttur."
                },
                {
                  question: "Diş temizliği ne sıklıkla yapılmalıdır?",
                  answer: "Diş temizliğinin genellikle her 6 ayda bir yapılması önerilir. Bu, dişlerinizin sağlığını korumak, plak ve tartar oluşumunu önlemek, diş eti hastalıklarını erken aşamalarda tespit etmek için önemlidir. Ancak, diş hekiminiz, ağız sağlığınıza ve ihtiyaçlarınıza bağlı olarak daha sık temizlik önerisinde bulunabilir."
                },
                {
                  question: "Hangi ağız hijyeni ürünlerini kullanmalıyım?",
                  answer: "Diş fırçası, diş ipi ve ağız gargarası gibi ürünler, düzenli ağız bakımı için temel unsurlardır. Diş hekiminizin önerilerine göre uygun ürünleri seçmek önemlidir."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <button 
                    className="w-full px-4 py-3 text-left flex items-center justify-between focus:outline-none"
                    onClick={() => {
                      const content = document.getElementById(`faq-content-${index}`);
                      const icon = document.getElementById(`faq-icon-${index}`);
                      if (content && icon) {
                        content.classList.toggle('hidden');
                        icon.classList.toggle('rotate-45');
                      }
                    }}
                  >
                    <h3 className="text-base font-medium text-gray-800">{faq.question}</h3>
                    <svg 
                      id={`faq-icon-${index}`}
                      className="w-4 h-4 text-[#1a365d] transform transition-transform duration-300 flex-shrink-0"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                  </button>
                  <div id={`faq-content-${index}`} className="hidden px-4 pb-3 pt-0">
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                </div>
              ))}
            </div>
            
            {/* More Questions CTA */}
            <div className="mt-4 md:mt-6 text-center">
              <Link 
                href="/iletisim" 
                className="inline-flex items-center gap-1 px-4 py-2 bg-[#1a365d] text-white text-xs md:text-sm rounded-lg hover:bg-[#1a365d]/90 transition-colors duration-300"
              >
                <span>Daha Fazla Soru İçin İletişime Geç</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-8 md:py-20 px-4 md:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <span className="inline-block py-1 px-3 md:px-4 rounded-full bg-[#1a365d]/10 text-[#1a365d] text-xs md:text-sm font-medium mb-2">
                Mutlu Hastalarımız
              </span>
              <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
                Hasta Yorumları
              </h2>
              <div className="w-10 md:w-16 h-1 bg-[#1a365d] rounded-full mx-auto mb-2 md:mb-3"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-4">
                Hastalarımızın deneyimleri ve düşünceleri bizim için çok değerli. İşte onların DentTitanyum deneyimleri.
              </p>
            </div>
            
            <div className="relative" style={{ overflow: 'hidden' }}>
              <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                position: 'relative',
                padding: '0 10px',
                overflow: 'hidden'
              }}>
                <SwiperStyles />
                
                <DynamicTestimonialSlider />
              </div>
            </div>
          </div>
        </section>
        
        {/* Achievements and Awards Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            {/* Floating particles */}
            {particles.map((particle) => (
              <div 
                key={particle.left + particle.top}
                className="absolute bg-white rounded-full opacity-10 animate-float-random"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                  filter: 'blur(1px)'
                }}
              >
                <div className="absolute h-full w-full bg-white rounded-full blur-sm animate-pulse"></div>
              </div>
            ))}
            
            {/* Decorative circles */}
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#1a365d]/5 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#2d4a77]/5 blur-3xl"></div>
            
            {/* Animated lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1a365d]/20 to-transparent animate-slide-right"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2d4a77]/20 to-transparent animate-slide-left"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-8 md:mb-16 transform transition-all duration-700 hover:scale-105">
              <span className="inline-block py-1 px-3 md:px-4 rounded-full bg-[#2d4a77]/10 text-[#2d4a77] text-xs md:text-sm font-medium mb-3 md:mb-4 animate-pulse">
                ÖDÜLLER
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#1a365d] via-[#2d4a77] to-[#1a365d] bg-clip-text text-transparent bg-size-200 animate-bg-position-x">
                Sektördeki Başarılarımız
              </h2>
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#1a365d] to-[#2d4a77] rounded-full mx-auto mb-4 md:mb-6 animate-pulse"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-4">
                Dent Titanyum İzmit, yüksek kaliteli diş hekimliği hizmetleriyle sektördeki başarısını taçlandırdı.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Timeline with hover effects */}
              <div className="relative">
                {/* Timeline bar - centered exactly */}
                <div className="absolute left-[14px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1a365d] to-[#2d4a77] animate-pulse"></div>
                
                {/* Timeline items with staggered animation */}
                <div className="relative pl-10 pb-6 md:pb-12 transform transition-all duration-500 md:hover:translate-x-2 md:hover:scale-105">
                  {/* Circle positioned exactly on the line */}
                  <div className="absolute left-[14px] top-[24px] -translate-x-[70%] md:left-[14px] md:top-[24px] md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-4 border-[#1a365d] z-10 animate-pulse"></div>
                  <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg md:hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="text-sm text-[#1a365d] font-semibold mb-2 relative">2023</div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 relative group-hover:text-[#1a365d] transition-colors duration-300">En İyi Diş Kliniği</h3>
                    <p className="text-gray-600 text-sm md:text-base relative">
                      Dent Titanyum yenilikçi hasta hizmetleri ve topluma sağladığı değerler, resmi kurumlardan ve meslektaşlardan yüksek bir takdir görmüştür.
                    </p>
                  </div>
                </div>
                
                <div className="relative pl-10 pb-6 md:pb-12 transform transition-all duration-500 md:hover:translate-x-2 md:hover:scale-105">
                  {/* Circle positioned exactly on the line */}
                  <div className="absolute left-[14px] top-[24px] -translate-x-[70%] md:left-[14px] md:top-[24px] md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-4 border-[#1a365d]/80 z-10 animate-pulse"></div>
                  <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg md:hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="text-sm text-[#1a365d] font-semibold mb-2 relative">2022</div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 relative group-hover:text-[#1a365d] transition-colors duration-300">Memnuniyette Üstün Başarı</h3>
                    <p className="text-gray-600 text-sm md:text-base relative">
                      Hasta memnuniyetini ön planda tutarak sunduğu mükemmel hasta deneyimini takdirle karşılıyoruz.
                    </p>
                  </div>
                </div>
                
                <div className="relative pl-10 transform transition-all duration-500 md:hover:translate-x-2 md:hover:scale-105">
                  {/* Circle positioned exactly on the line */}
                  <div className="absolute left-[14px] top-[24px] -translate-x-[70%] md:left-[14px] md:top-[24px] md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-4 border-[#2d4a77] z-10 animate-pulse"></div>
                  <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg md:hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2d4a77]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="text-sm text-[#2d4a77] font-semibold mb-2 relative">2021</div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 relative group-hover:text-[#2d4a77] transition-colors duration-300">Diş Teknolojisinde Öncü Yenilikler</h3>
                    <p className="text-gray-600 text-sm md:text-base relative">
                      Dent Titanyum&apos;un, diş sağlığında en yeni teknolojileri kullanma ve bu teknolojilerle tedavi süreçlerini geliştirme yönündeki kararlılığını takdir ediyoruz.
                    </p>
                  </div>
                </div>
                
                {/* Hexagonal Award Badges */}
                <div className="mt-8 md:mt-12 grid grid-cols-3 gap-2 md:gap-4">
                  {[
                    { year: "2023", title: "En İyi Diş Kliniği" },
                    { year: "2022", title: "Memnuniyette Üstün Başarı" },
                    { year: "2021", title: "Diş Teknolojisinde Öncü Yenilikler" }
                  ].map((award, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col items-center justify-center text-center transform transition-all duration-500 md:hover:scale-105"
                    >
                      <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2">
                        {/* Hexagon shape with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] to-[#2d4a77] transform rotate-45 rounded-xl"></div>
                        
                        {/* Star icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2zm5.46 7.12l-2.78 1.15a4.982 4.982 0 0 0-2.95-2.94l1.15-2.78c2.1.8 3.77 2.47 4.58 4.57zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3 3zm-5.46-5.88l2.78-1.15a4.982 4.982 0 0 0 2.95 2.94l-1.15 2.78c-2.1-.8-3.77-2.47-4.58-4.57z" fill="#1a365d" />
                          </svg>
                        </div>
                        
                        {/* Year */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-[10px] md:text-xs font-bold text-white mt-4 md:mt-6">{award.year}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-[10px] md:text-xs font-medium text-gray-800 px-1">{award.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Awards Showcase with enhanced effects */}
              <div className="flex flex-col justify-center">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/90 to-[#2d4a77]/90 z-10 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <Image
                        src="/images/a.webp" // Using an existing image from your site
                        alt="Başarılarımız"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <div className="text-center text-white transform transition-all duration-500 group-hover:scale-110">
                        <div className="text-6xl font-bold mb-2 animate-pulse">3+</div>
                        <div className="text-xl relative">
                          <span className="relative inline-block">
                            Prestijli Sektör Ödülü
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                          </span>
                </div>
                      </div>
                    </div>
            </div>
            
                  <div className="p-8 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#1a365d]/5 to-transparent rounded-bl-full"></div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 relative">
                      <span className="relative inline-block">
                        Neden Biz Farklıyız?
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#1a365d] to-[#2d4a77] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                      </span>
                    </h3>
                    
                    <ul className="space-y-4 relative">
                      <li className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#1a365d]/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-[#1a365d]/20 transition-colors duration-300">
                          <svg className="w-4 h-4 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                        </div>
                        <p className="text-gray-600">
                          <span className="font-semibold text-[#1a365d]">Yenilikçi Yaklaşım:</span> Diş hekimliğinde en son yenilikleri takip ederek hastalarımıza sunuyoruz.
                        </p>
                      </li>
                      <li className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#1a365d]/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-[#1a365d]/20 transition-colors duration-300">
                          <svg className="w-4 h-4 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-600">
                          <span className="font-semibold text-[#1a365d]">Hasta Memnuniyeti:</span> Hastalarımızın mükemmel deneyim yaşaması için çalışıyoruz.
                        </p>
                      </li>
                      <li className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#1a365d]/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-[#1a365d]/20 transition-colors duration-300">
                          <svg className="w-4 h-4 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-600">
                          <span className="font-semibold text-[#1a365d]">Toplumsal Değer:</span> Sağladığımız hizmetlerle topluma değer katmayı hedefliyoruz.
                        </p>
                      </li>
                      <li className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#1a365d]/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-[#1a365d]/20 transition-colors duration-300">
                          <svg className="w-4 h-4 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-600">
                          <span className="font-semibold text-[#1a365d]">Modern Teknoloji:</span> En son teknolojik cihazlarla tedavilerimizi gerçekleştiriyoruz.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Call to action with enhanced effects */}
                <div className="mt-8 bg-gradient-to-r from-[#1a365d] to-[#2d4a77] rounded-xl p-6 text-white flex items-center justify-between transform transition-all duration-500 hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#1a365d] to-[#2d4a77] rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                  
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-1">Kalitemizi Keşfedin</h3>
                    <p className="text-white/80">Ödüllü kliniğimizde tedavi olun</p>
                  </div>
                  
                  <Link 
                    href="/iletisim" 
                    className="relative px-5 py-2 bg-white text-[#1a365d] rounded-lg font-medium group-hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2 overflow-hidden"
                  >
                    <span>Randevu Al</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1a365d]/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-8 md:py-20 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <span className="inline-block py-1 px-3 md:px-4 rounded-full bg-[#1a365d]/10 text-[#1a365d] text-xs md:text-sm font-medium mb-3 md:mb-4">
                Değerlerimiz
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
                Temel Değerlerimiz
              </h2>
              <div className="w-12 md:w-24 h-1 bg-[#1a365d] rounded-full mx-auto mb-3 md:mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-4">
                DentTitanyum&apos;da bizim için önemli olan ve her zaman bağlı kaldığımız temel değerlerimiz.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-2 md:px-0">
              {values.map((value, index) => (
                <div key={index} className="group bg-gray-50 p-6 md:p-8 rounded-xl shadow-md transition-all duration-300 md:hover:-translate-y-2 md:hover:shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/5 to-[#2d4a77]/5 transform scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 md:group-hover:shadow-lg">
                      <svg 
                        className="w-10 h-10 text-[#1a365d] transition-all duration-300 md:group-hover:scale-110" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon} />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-4 transition-colors duration-300 md:group-hover:text-[#1a365d]">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center leading-relaxed relative z-10">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Banner */}
        <section className="py-8 md:py-16 px-4 md:px-6 bg-[var(--primary-color)]">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-xl md:text-4xl font-bold mb-3 md:mb-6">Sağlıklı Bir Gülüşe Hazır mısınız?</h2>
            <p className="text-white/80 mb-4 md:mb-8 max-w-2xl mx-auto text-xs md:text-base px-2 md:px-4">
              DentTitanyum ile profesyonel diş tedavileriniz için hemen iletişime geçin.
            </p>
            <Link 
              href="/iletisim" 
              className="inline-block bg-white text-[var(--primary-color)] py-2 md:py-3 px-4 md:px-8 rounded-lg text-sm md:text-base font-medium hover:bg-[var(--secondary-color)] hover:text-white transition-colors duration-300"
            >
              <span className="flex items-center gap-2">
                İletişime Geç
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
} 