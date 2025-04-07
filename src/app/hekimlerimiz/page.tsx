"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { sendGAEvent } from '../../components/analytics';

export default function Doctors() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState("dt-bunyamin-kazdal");
  const [isHovered, setIsHovered] = useState("");

  const doctors = useMemo(() => [
    {
      id: "dt-bunyamin-kazdal",
      name: "Dt. Bünyamin Kazdal",
      title: "Genel Diş Hekimi",
      image: "/klinik/dent_titanyum (2).webp",
      education: [
        "Kocaeli Üniversitesi Diş Hekimliği Fakültesi"
      ],
      experience: "5 yıl",
      specialties: [
        "İmplant Tedavisi",
        "Porselen Lamine Veneer",
        "İmplant Üstü Protezler",
        "İleri Seviye İmplantoloji",
        "Zirkonyum Kaplama"
      ],
      bio: "Dt. Bünyamin Kazdal, Kocaeli üniversitesinden genel diş hekimi olarak mezun olmuştur. Mezuniyet sonrası porselen lamine veneer, temel implantoloji, implant üstü protezler, ileri seviye implantoloji, masterclass implantoloji ve implant çevresi yumuşak doku cerrahisi alanında eğitimlerini tamamlamıştır. İmplant tedavisi ve zirkonyum kaplama tedavilerinde yüksek deneyim ve tecrübe kazanmıştır. Modern ve dijital dişhekimliği tekniklerini kullanarak hastalara etkili ve güvenilir tedavi hizmetleri sunar."
    },
    {
      id: "dt-hamza-furkan-arslan",
      name: "Dt. Hamza Furkan Arslan",
      title: "Genel Diş Hekimi",
      image: "/klinik/dent_titanyum (3).webp",
      education: [
        "Kocaeli Üniversitesi Diş Hekimliği Fakültesi"
      ],
      experience: "3 yıl",
      specialties: [
        "Endodonti (Kanal Tedavisi)",
        "İmplant Üstü Protezler",
        "Modern Tedavi Teknikleri",
        "Kök Kanal Tedavisi"
      ],
      bio: "Dt. Hamza Furkan Arslan, Kocaeli üniversitesinden genel diş hekimi olarak mezun olmuştur. Mezuniyet sonrası güncel tekniklerle kök kanallarının şekillendirilmesi ve doldurulması (endodonti) ve implant üstü protezler eğitimini tamamlamıştır. Meslek hayatı boyunca güncel tedavi yöntemlerini takip ederek hastalar için en uygun ve etkili tedavi seçeneklerini kendilerine sunmayı ilke edinmiştir."
    }
  ], []);

  useEffect(() => {
    setIsVisible(true);
    
    // URL'deki hash'i kontrol et
    const hash = window.location.hash.slice(1);
    if (hash && doctors.some(d => d.id === hash)) {
      setActiveDoctor(hash);
      
      setTimeout(() => {
        const doctorElement = document.getElementById(`doctor-section-${hash}`);
        if (doctorElement) {
          doctorElement.style.visibility = 'visible';
          doctorElement.classList.remove('opacity-0', 'translate-x-8', 'absolute', 'pointer-events-none');
          doctorElement.classList.add('opacity-100', 'translate-x-0');
          
          const headerOffset = 120;
          const elementPosition = doctorElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
    
    // Enhanced parallax effect for scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = element.dataset.speed || "0.5";
        const rotation = scrolled * 0.02;
        element.style.transform = `translateY(${scrolled * parseFloat(speed)}px) rotate(${rotation}deg)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [doctors]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800">
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] py-24 overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white z-10"></div>
          
          {/* Image background */}
          <div className="absolute inset-0 md:scale-110 scale-100">
            <div className="absolute inset-0 bg-white opacity-30"></div>
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 bg-repeat"></div>
            <Image
              src="/klinik/5.webp"
              alt="Uzman Hekimlerimiz"
              fill
              priority
              className="object-cover opacity-65 w-full"
              style={{ objectPosition: 'center 45%' }}
              quality={90}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
            <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="mb-5">
                <span className="py-1.5 px-5 text-xs font-semibold tracking-widest uppercase rounded-full inline-flex items-center gap-2 bg-white/90 text-[#1a365d] border border-[#1a365d]/10 shadow-sm md:backdrop-blur-sm">
                  <span className="w-2 h-2 bg-[#1a365d] rounded-full animate-pulse"></span>
                  Profesyonel Kadro
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-[#1a365d] via-[#2a4a74] to-[#1a365d] bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-sm">
                Uzman Hekimlerimiz
              </h1>
              <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                Deneyimli ve alanlarında uzmanlaşmış hekim kadromuzla, gülüşünüzün estetiği ve sağlığı için yanınızdayız.
              </p>
              
              <div className="flex items-center justify-center gap-5">
                <Link 
                  href="#doctors" 
                  className="group relative overflow-hidden px-8 py-3.5 bg-gradient-to-r from-[#1a365d] to-[#2a4a74] text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Hekimleri Keşfet</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#2a4a74] to-[#1a365d] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                </Link>
                <Link 
                  href="/iletisim" 
                  className="px-8 py-3.5 bg-white border border-[#1a365d]/20 text-[#1a365d] rounded-full text-sm font-medium hover:bg-[#1a365d]/5 transition-all duration-300 shadow-sm hover:shadow"
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Doctors Section - ultra modern tasarım */}
        <section id="doctors" className="py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Doktor Listesi - Sol Panel - Enhanced Glassmorphism */}
              <div className="lg:w-1/3">
                <div className="sticky top-24 bg-white md:bg-white/60 p-6 rounded-2xl shadow-lg border border-white/40 md:backdrop-blur-xl md:bg-opacity-80 hover:bg-white/70 transition-all duration-300">
                  <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100 relative">
                    Hekimlerimiz
                    <span className="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-[#1a365d] via-[#4a7ab8] to-transparent"></span>
                  </h2>
                  
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <button
                        key={doctor.id}
                        onClick={() => {
                          // Aktif doktoru değiştir
                          setActiveDoctor(doctor.id);
                          
                          // URL'i güncelle
                          window.history.pushState({}, '', `#${doctor.id}`);
                          
                          // Mobil görünümde doktor detaylarına scroll yap
                          if (window.innerWidth < 768) {
                            // DOM güncellemesinin tamamlanması için biraz bekle
                            setTimeout(() => {
                              // Doktor detayları bölümünün bulunduğu yaklaşık pozisyona scroll yap
                              // Sabit bir pozisyon kullanarak scroll sorununu çöz
                              const doctorsSection = document.getElementById('doctors');
                              if (doctorsSection) {
                                // Doctors section'ın pozisyonunu al ve offset ekle
                                const sectionTop = doctorsSection.offsetTop;
                                
                                // Sayfayı doktor detaylarının bulunduğu yaklaşık pozisyona kaydır
                                window.scrollTo({
                                  top: sectionTop + 500, // Doktor detaylarının bulunduğu yaklaşık pozisyon
                                  behavior: 'smooth'
                                });
                              }
                            }, 300);
                          }
                        }}
                        onMouseEnter={() => setIsHovered(doctor.id)}
                        onMouseLeave={() => setIsHovered("")}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-500 transform ${
                          activeDoctor === doctor.id 
                            ? 'bg-gradient-to-r from-[#1a365d]/10 to-transparent border-l-2 border-[#1a365d] shadow-md md:scale-102' 
                            : 'hover:bg-white border-l-2 border-transparent hover:shadow-sm md:hover:scale-102'
                        } ${isHovered === doctor.id ? 'md:scale-102' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md group">
                            <div className={`absolute inset-0 bg-gradient-to-tr from-[#1a365d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <Image 
                              src={doctor.image}
                              alt={doctor.name}
                              fill
                              sizes="56px"
                              className="object-cover transition-all duration-500 group-hover:scale-110"
                              quality={90}
                            />
                          </div>
                          <div>
                            <h3 className={`text-base font-semibold ${activeDoctor === doctor.id ? 'text-[#1a365d]' : 'text-gray-800'}`}>
                              {doctor.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {doctor.title}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Çalışma Saatleri - modern cam efekti */}
                  <div className="mt-10 p-5 rounded-xl bg-white md:bg-gradient-to-br md:from-gray-50/80 md:to-white/60 border border-white shadow-inner md:backdrop-blur-sm">
                    <h3 className="text-sm font-medium mb-4 flex items-center gap-2 text-[#1a365d]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Çalışma Saatleri
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-gray-200/50 pb-3">
                        <span className="text-xs font-medium text-gray-700">Pazartesi - Cuma</span>
                        <span className="text-xs font-semibold text-[#1a365d] bg-white md:bg-white/80 px-3 py-1.5 rounded-full shadow-sm md:backdrop-blur-sm">10:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200/50 pb-3">
                        <span className="text-xs font-medium text-gray-700">Cumartesi</span>
                        <span className="text-xs font-semibold text-[#1a365d] bg-white md:bg-white/80 px-3 py-1.5 rounded-full shadow-sm md:backdrop-blur-sm">10:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-xs font-medium text-gray-700">Pazar</span>
                        <span className="text-xs font-semibold text-red-500 bg-red-50 md:bg-red-50/80 px-3 py-1.5 rounded-full shadow-sm md:backdrop-blur-sm">Kapalı</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Doktor Detayları - Sağ Panel - Modern Design */}
              <div className="lg:w-2/3">
                {doctors.map((doctor) => (
                  <div 
                    key={doctor.id}
                    id={`doctor-section-${doctor.id}`}
                    className={`transition-opacity duration-300 ${activeDoctor === doctor.id ? 'block opacity-100' : 'hidden opacity-0'}`}
                  >
                    <div className="bg-white md:bg-white/90 md:backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
                      {/* Modern accent bar */}
                      <div className="h-1 w-full bg-gradient-to-r from-[#1a365d] via-[#2a4a74] to-[#1a365d] animate-gradient-x"></div>
                      
                      {/* Main content */}
                      <div className="max-w-7xl mx-auto">
                        {/* Header section with elegant typography */}
                        <header className="relative overflow-hidden border-b border-gray-100/80">
                          {/* Enhanced background decorations */}
                          <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-full bg-[#1a365d]/5 -skew-x-12 origin-top-right"></div>
                            <div className="absolute top-1/4 right-1/4 w-24 h-24 border-4 border-[#1a365d]/10 rounded-full opacity-10 animate-pulse"></div>
                          </div>
                          
                          <div className="container mx-auto px-6 py-5 md:py-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                              <div className="relative z-10 flex flex-row items-center gap-4">
                                <div>
                                  <p className="text-xs font-medium uppercase tracking-wider text-[#1a365d]/80 mb-1">
                                    {doctor.title}
                                  </p>
                                  
                                  <h1 className="text-2xl md:text-3xl font-bold text-[#1a365d] leading-none tracking-tight">
                                    {doctor.name}
                                  </h1>
                                  
                                  <div className="mt-1 text-sm text-[#1a365d]/80 flex items-center">
                                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    {doctor.experience} Yıllık Klinik Deneyimi
                                  </div>
                                </div>
                              </div>
                              
                              <div className="z-10 flex items-center space-x-2 mt-3 md:mt-0">
                                <Link
                                  href="/iletisim"
                                  className="relative group inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#1a365d] to-[#2a4a74] text-white text-sm font-medium rounded-md shadow-md hover:shadow transition-all"
                                  onClick={() => {
                                    sendGAEvent('contact_click', {
                                      event_category: 'Contact',
                                      event_label: 'Hekim Sayfası Randevu Butonu'
                                    });
                                  }}
                                >
                                  <span className="mr-1.5">Randevu Al</span>
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                  </svg>
                                </Link>
                                
                                <Link
                                  href="tel:+905528327741"
                                  className="inline-flex items-center px-4 py-2 bg-white border border-[#1a365d]/20 text-[#1a365d] text-sm font-medium rounded-md shadow-sm hover:bg-[#1a365d]/5 transition-all"
                                  onClick={() => {
                                    sendGAEvent('contact_click', {
                                      event_category: 'Contact',
                                      event_label: 'Hekim Sayfası Telefon Butonu'
                                    });
                                  }}
                                >
                                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                  </svg>
                                  Ara
                                </Link>
                            </div>
                            </div>
                          </div>
                        </header>
                        
                        {/* Main doctor content with modern layout */}
                        <section className="container mx-auto py-8">
                          <div id="doctor-details" className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            {/* Doctor image column - moved to right with adjusted size */}
                            <div className="md:col-span-5 lg:col-span-4 order-1 md:order-2">
                              <div className="sticky top-24 space-y-6">
                                {/* Enhanced Doctor image presentation with fixed aspect ratio */}
                                <div className="relative mx-auto w-full max-w-[300px] md:max-w-none pb-[100%] md:pb-[140%] overflow-hidden rounded-2xl shadow-xl group bg-white md:bg-gradient-to-tr md:from-white/80 md:via-white/40 md:to-white/80 p-[1px]">
                                  <div className="absolute inset-0 rounded-2xl overflow-hidden md:backdrop-blur-sm">
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1a365d]/30 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"></div>
                                    
                                    {/* Bottom to top navy gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/40 via-[#1a365d]/10 to-transparent z-10"></div>
                                    
                                    {/* Shine effect - only on desktop */}
                                    <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000 z-20 hidden md:block">
                                      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                    </div>

                                    {/* Modern corner elements with animation - only on desktop */}
                                    <div className="absolute top-1 left-1 w-12 h-12 z-10 hidden md:block">
                                      <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white/80 rounded-tl-xl transform -translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                                    </div>
                                    <div className="absolute top-1 right-1 w-12 h-12 z-10 hidden md:block">
                                      <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-white/80 rounded-tr-xl transform translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                                    </div>
                                    
                                    {/* Bottom corners - only on desktop */}
                                    <div className="absolute bottom-1 left-1 w-12 h-12 z-10 hidden md:block">
                                      <div className="absolute bottom-0 left-0 w-full h-full border-b-2 border-l-2 border-white/80 rounded-bl-xl transform -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                                    </div>
                                    <div className="absolute bottom-1 right-1 w-12 h-12 z-10 hidden md:block">
                                      <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white/80 rounded-br-xl transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                                    </div>
                                    
                                    <Image
                                      src={doctor.image}
                                      alt={doctor.name}
                                      fill
                                      sizes="(max-width: 768px) 300px, (max-width: 1200px) 40vw, 33vw"
                                      className="transition-all duration-1000 object-cover scale-100 md:scale-110"
                                      style={{ objectPosition: "center 10%" }}
                                      priority
                                      quality={90}
                                    />
                                  </div>
                                </div>

                                {/* Klinik Deneyimi - Masaüstünde normal, mobilde sonra görünecek */}
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100/80 hidden md:block">
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                      <div className="w-1.5 h-6 bg-gradient-to-b from-[#1a365d] to-[#3c5c8f] rounded-full"></div>
                                      <div>
                                        <h2 className="text-xl font-bold text-[#1a365d]">Klinik Deneyimi</h2>
                                        <p className="text-sm text-gray-500 mt-1">Diş Hekimi • TDB Üyesi</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-4xl font-bold text-[#1a365d]">{doctor.experience.split(' ')[0]}</span>
                                      <span className="text-sm text-gray-500 font-medium">Yıl</span>
                                    </div>
                                  </div>
                                </div>

                                {/* CTA bölümü - Masaüstünde normal, mobilde sonra görünecek */}
                                <div className="bg-gradient-to-r from-[#1a365d] via-[#2a4a74] to-[#1a365d] text-white rounded-xl shadow-lg p-8 flex flex-col justify-between items-center gap-6 relative overflow-hidden group hidden md:flex">
                                  <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 md:group-hover:opacity-10 transition-opacity duration-500"></div>
                                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1a365d]/50 via-transparent to-white/10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
                                  
                                  <div className="relative z-10 text-center">
                                    <h3 className="text-xl font-bold mb-2 text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-white md:to-white/90">
                                      Sağlıklı gülüşler için yanınızdayız
                                    </h3>
                                    <p className="text-white/80 text-sm">Tedavi planınız için hemen iletişime geçin</p>
                                  </div>
                                  
                                  <div className="relative z-10 flex flex-wrap gap-3 justify-center w-full">
                                    <Link 
                                      href="/iletisim" 
                                      className="inline-flex items-center px-6 py-3 bg-white text-[#1a365d] text-sm font-medium rounded-lg hover:bg-white/90 transition-all duration-300 transform md:hover:scale-105 hover:shadow-lg"
                                    >
                                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                      </svg>
                                      Randevu Al
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Bio section - moved to left */}
                            <div className="md:col-span-7 lg:col-span-8 order-2 md:order-1">
                              <div className="space-y-6">
                                {/* Mobil görünümde Hakkında ve Uzmanlık Alanları bölümlerini üste taşıyoruz */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* Hakkında Bölümü - En üstte */}
                                  <div id={`doctor-bio-${doctor.id}`} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100/80 lg:col-span-2 col-span-1 order-1">
                                    <div className="flex items-baseline mb-4">
                                      <div className="w-1.5 h-6 bg-gradient-to-b from-[#1a365d] to-[#3c5c8f] rounded-full mr-3"></div>
                                      <h2 className="text-xl font-bold text-[#1a365d]">Hakkında</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
                                  </div>

                                  {/* Uzmanlık Alanları - İkinci sırada */}
                                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100/80 lg:col-span-1 col-span-1 order-2">
                                    <div className="flex items-center gap-4 mb-6">
                                      <div className="w-1.5 h-6 bg-gradient-to-b from-[#1a365d] to-[#3c5c8f] rounded-full"></div>
                                      <h2 className="text-xl font-bold text-[#1a365d]">Uzmanlık Alanları</h2>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-3">
                                      {doctor.specialties.map((specialty, idx) => (
                                        <div 
                                          key={idx}
                                          className="flex items-center gap-4 p-3 rounded-lg bg-gray-50/80 hover:bg-[#1a365d]/5 transition-all duration-300"
                                        >
                                          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1a365d]/10">
                                            <span className="text-sm font-semibold text-[#1a365d]">{idx + 1}</span>
                                          </div>
                                          <span className="text-gray-700 font-medium">{specialty}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Eğitim Bölümü - Üçüncü sırada */}
                                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100/80 lg:col-span-1 col-span-1 order-3">
                                    <div className="flex items-center mb-3">
                                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1a365d]/5 flex items-center justify-center mr-2">
                                        <svg className="w-3.5 h-3.5 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v7"/>
                                        </svg>
                                      </div>
                                      <div>
                                        <h2 className="text-lg font-bold text-[#1a365d] leading-none">Eğitim</h2>
                                        <p className="text-xs text-gray-500 mt-0.5">Akademik Geçmiş</p>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-2">
                                      {doctor.education.map((edu, idx) => (
                                        <div key={idx} className="flex items-center py-1">
                                          <div className="w-1.5 h-1.5 rounded-full bg-[#1a365d] mr-2 flex-shrink-0"></div>
                                          <p className="text-sm font-medium text-gray-800">{edu}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Klinik Deneyimi - Dördüncü sırada */}
                                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100/80 md:hidden col-span-1 order-4">
                                    <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-6 bg-gradient-to-b from-[#1a365d] to-[#3c5c8f] rounded-full"></div>
                                        <div>
                                          <h2 className="text-xl font-bold text-[#1a365d]">Klinik Deneyimi</h2>
                                          <p className="text-sm text-gray-500 mt-1">Diş Hekimi • TDB Üyesi</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-4xl font-bold text-[#1a365d]">{doctor.experience.split(' ')[0]}</span>
                                        <span className="text-sm text-gray-500 font-medium">Yıl</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* CTA bölümü - Beşinci sırada */}
                                  <div className="bg-gradient-to-r from-[#1a365d] via-[#2a4a74] to-[#1a365d] text-white rounded-xl shadow-lg p-8 flex flex-col justify-between items-center gap-6 relative overflow-hidden group md:hidden col-span-1 order-5">
                                    <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 transition-opacity duration-500"></div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1a365d]/50 via-transparent to-white/10 opacity-0 transition-opacity duration-500"></div>
                                    
                                    <div className="relative z-10 text-center">
                                      <h3 className="text-xl font-bold mb-2 text-white">
                                        Sağlıklı gülüşler için yanınızdayız
                                      </h3>
                                      <p className="text-white/80 text-sm">Tedavi planınız için hemen iletişime geçin</p>
                                    </div>
                                    
                                    <div className="relative z-10 flex flex-wrap gap-3 justify-center w-full">
                                      <Link 
                                        href="/iletisim" 
                                        className="inline-flex items-center px-6 py-3 bg-white text-[#1a365d] text-sm font-medium rounded-lg hover:bg-white/90 transition-all duration-300 hover:shadow-lg"
                                      >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        Randevu Al
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
