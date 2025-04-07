"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const workingHours = [
    { day: "Pazartesi", hours: "10:00 - 22:00" },
    { day: "Salı", hours: "10:00 - 22:00" },
    { day: "Çarşamba", hours: "10:00 - 22:00" },
    { day: "Perşembe", hours: "10:00 - 22:00" },
    { day: "Cuma", hours: "10:00 - 22:00" },
    { day: "Cumartesi", hours: "10:00 - 22:00" },
    { day: "Pazar", hours: "Kapalı" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: "/images/instagram.svg", url: "https://instagram.com/denttitanyum" },
    { name: "Facebook", icon: "/images/facebook.svg", url: "https://facebook.com/denttitanyum" },
    { name: "Twitter", icon: "/images/twitter.svg", url: "https://twitter.com/denttitanyum" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased text-rendering-optimizeLegibility">
      {/* Navigation Bar - Mobile Responsive */}
      <nav className="navbar relative z-30">
        <div className="navbar-container px-4 py-3 flex justify-between items-center md:hidden">
          <Link href="/" className="text-lg font-extrabold text-[#1E2756]">
            DentTitanyum
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-[#1E2756] focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`absolute top-full left-0 right-0 bg-white shadow-lg z-40 transition-all duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} md:hidden`}>
          <ul className="py-2 px-4">
            <li className="py-2 border-b border-gray-100">
              <Link href="/" className="block text-[#1E2756] font-semibold text-base">
                Anasayfa
              </Link>
            </li>
            <li className="py-2 border-b border-gray-100">
              <Link href="/hekimlerimiz" className="block text-[#1E2756] font-semibold text-base">
                Hekimlerimiz
              </Link>
            </li>
            <li className="py-2 border-b border-gray-100">
              <Link href="/tedavilerimiz" className="block text-[#1E2756] font-semibold text-base">
                Tedavilerimiz
              </Link>
            </li>
            <li className="py-2 border-b border-gray-100">
              <Link href="/hakkimizda" className="block text-[#1E2756] font-semibold text-base">
                Hakkımızda
              </Link>
            </li>
            <li className="py-2">
              <Link href="/iletisim" className="block text-[#1E2756] font-semibold text-base">
                İletişim
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Desktop Menu - Unchanged */}
        <div className="navbar-container hidden md:block">
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Anasayfa
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/hekimlerimiz" className="nav-link">
                Hekimlerimiz
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/tedavilerimiz" className="nav-link">
                Tedavilerimiz
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/hakkimizda" className="nav-link">
                Hakkımızda
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/iletisim" className="nav-link">
                İletişim
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white">
        {/* İletişim Başlık Bölümü */}
        <section className="relative h-[45vh] sm:h-[45vh] overflow-hidden bg-white">
          {/* Background image with overlay */}
          <div className="absolute inset-0 scale-110">
            <div className="absolute inset-0 bg-white opacity-80"></div>
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 bg-repeat"></div>
            <Image
              src="/klinik/6.webp"
              alt="İletişim"
              fill
              priority
              className="object-cover object-[center_60%] opacity-95"
            />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/15 to-white z-10"></div>
          
          {/* Content with enhanced hover effects - adjusted for image background */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
            <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="mb-4 sm:mb-6">
                <span className="py-1 sm:py-1.5 px-3 sm:px-5 text-[11px] sm:text-xs font-bold tracking-widest uppercase rounded-full inline-flex items-center gap-2 sm:gap-3 text-white bg-[#1E3A70] border-2 border-[#1E3A70]/10 shadow-lg hover:bg-[#1E3A70]/90 transition-all duration-500">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full animate-pulse"></span>
                  Bizimle İletişime Geçin
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 text-[#1E3A70] leading-tight tracking-tight">
                İletişim ve <span className="relative inline-block">
                  Ulaşım
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-[#1E3A70] rounded-full animate-pulse"></span>
                </span>
              </h1>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-medium">
                &apos;Dent Titanyum&apos;da sizlere en iyi hizmeti sunmak için buradayız.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                <Link 
                  href="tel:+905528327741" 
                  className="w-full sm:w-auto group relative overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 bg-[#1E3A70] text-white rounded-xl text-sm font-bold hover:bg-[#1E3A70]/90 transition-all duration-500 border-2 border-[#1E3A70]/10 shadow-lg hover:shadow-[#1E3A70]/20"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Hemen Ara
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </Link>
                <Link 
                  href="https://wa.me/905528327741" 
                  className="w-full sm:w-auto group relative overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 bg-[#1E3A70] text-white rounded-xl text-sm font-bold hover:bg-[#1E3A70]/90 transition-all duration-500 border-2 border-[#1E3A70]/10 shadow-lg hover:shadow-[#1E3A70]/20"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    WhatsApp
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* İletişim Bilgileri ve Form Bölümü */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 -mt-16 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* İletişim Bilgileri - Daha geniş */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Destek Hattı - Solid background for mobile */}
                  <div className="group relative p-5 rounded-2xl transition-all duration-500 overflow-hidden bg-white sm:bg-gradient-to-br sm:from-white/70 sm:to-white/30 sm:backdrop-blur-sm border border-gray-100 sm:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(30,39,86,0.3)] hover:border-[#1E2756]/20 hover:scale-[1.01]">
                    <div className="absolute inset-0 hidden sm:block bg-gradient-to-br from-[#1E2756]/10 via-[#354899]/5 to-[#5B6BC9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute -bottom-32 -right-32 w-64 h-64 hidden sm:block bg-[#1E2756]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000"></div>
                    <div className="absolute -top-48 -left-48 w-96 h-96 hidden sm:block bg-[#1E2756]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 delay-100"></div>
                    
                    <div className="flex flex-col h-full relative z-10">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1E2756] to-[#5B6BC9] text-white shadow-lg mr-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#1E2756] sm:bg-clip-text sm:text-transparent sm:bg-gradient-to-r sm:from-[#1E2756] sm:to-[#1E2756] group-hover:from-[#1E2756] group-hover:to-[#5B6BC9] transition-all duration-500">Destek Hattı</h3>
                      </div>
                      
                      <div className="flex-grow">
                        <p className="text-gray-600 text-xs mb-2 font-medium">09:15 - 19:00 Saatleri Arasında</p>
                        <Link href="tel:+905528327741" className="text-base font-bold text-[#2C3E50] hover:text-[#1E2756] transition-colors inline-flex group-hover:translate-x-1 duration-300">
                          +90 552 832 77 41
                        </Link>
                      </div>
                      
                      <div className="mt-3 pt-2 border-t border-gray-200/40">
                        <Link href="tel:+905528327741" className="flex items-center text-[#1E2756] font-semibold text-xs hover:text-[#5B6BC9] transition-colors">
                          <span>Hemen Ara</span>
                          <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* WhatsApp Destek */}
                  <div className="group relative p-5 rounded-2xl transition-all duration-500 overflow-hidden bg-white sm:bg-gradient-to-br sm:from-white/70 sm:to-white/30 sm:backdrop-blur-sm border border-gray-100 sm:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:border-[#25D366]/20 hover:scale-[1.01]">
                    <div className="absolute inset-0 hidden sm:block bg-gradient-to-br from-[#25D366]/10 via-[#25D366]/5 to-[#25D366]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute -bottom-32 -right-32 w-64 h-64 hidden sm:block bg-[#25D366]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000"></div>
                    <div className="absolute -top-48 -left-48 w-96 h-96 hidden sm:block bg-[#25D366]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 delay-100"></div>
                    
                    <div className="flex flex-col h-full relative z-10">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-lg mr-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#1E2756] sm:bg-clip-text sm:text-transparent sm:bg-gradient-to-r sm:from-[#1E2756] sm:to-[#1E2756] group-hover:from-[#128C7E] group-hover:to-[#25D366] transition-all duration-500">WhatsApp</h3>
                      </div>
                      
                      <div className="flex-grow">
                        <p className="text-gray-600 text-xs mb-2 font-medium">WhatsApp Destek Hattı</p>
                        <Link href="https://wa.me/905528327741" className="text-base font-bold text-[#2C3E50] hover:text-[#25D366] transition-colors inline-flex group-hover:translate-x-1 duration-300">
                          +90 552 832 77 41
                        </Link>
                      </div>
                      
                      <div className="mt-3 pt-2 border-t border-gray-200/40">
                        <Link href="https://wa.me/905528327741" className="flex items-center text-[#25D366] font-semibold text-xs hover:text-[#128C7E] transition-colors">
                          <span>WhatsApp&apos;tan Yaz</span>
                          <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* E-Posta */}
                  <div className="group relative p-5 rounded-2xl transition-all duration-500 overflow-hidden bg-white sm:bg-gradient-to-br sm:from-white/70 sm:to-white/30 sm:backdrop-blur-sm border border-gray-100 sm:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(234,88,12,0.3)] hover:border-[#EA580C]/20 hover:scale-[1.01]">
                    <div className="absolute inset-0 hidden sm:block bg-gradient-to-br from-[#EA580C]/10 via-[#EA580C]/5 to-[#EA580C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute -bottom-32 -right-32 w-64 h-64 hidden sm:block bg-[#EA580C]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000"></div>
                    <div className="absolute -top-48 -left-48 w-96 h-96 hidden sm:block bg-[#EA580C]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 delay-100"></div>
                    
                    <div className="flex flex-col h-full relative z-10">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#EA580C] to-[#F97316] text-white shadow-lg mr-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#1E2756] sm:bg-clip-text sm:text-transparent sm:bg-gradient-to-r sm:from-[#1E2756] sm:to-[#1E2756] group-hover:from-[#EA580C] group-hover:to-[#F97316] transition-all duration-500">E-Posta</h3>
                      </div>
                      
                      <div className="flex-grow">
                        <p className="text-gray-600 text-xs mb-2 font-medium">E-Posta Yolu ile ulaş</p>
                        <Link href="mailto:info@denttitanyumizmit.net" className="text-sm text-[#2C3E50] hover:text-[#EA580C] transition-colors inline-flex break-all group-hover:translate-x-1 duration-300">
                          info@denttitanyumizmit.net
                        </Link>
                      </div>
                      
                      <div className="mt-3 pt-2 border-t border-gray-200/40">
                        <Link href="mailto:info@denttitanyumizmit.net" className="flex items-center text-[#EA580C] font-semibold text-xs hover:text-[#F97316] transition-colors">
                          <span>E-Posta Gönder</span>
                          <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Adres */}
                  <div className="group relative p-5 rounded-2xl transition-all duration-500 overflow-hidden bg-white sm:bg-gradient-to-br sm:from-white/70 sm:to-white/30 sm:backdrop-blur-sm border border-gray-100 sm:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.3)] hover:border-[#06B6D4]/20 hover:scale-[1.01]">
                    <div className="absolute inset-0 hidden sm:block bg-gradient-to-br from-[#06B6D4]/10 via-[#06B6D4]/5 to-[#06B6D4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute -bottom-32 -right-32 w-64 h-64 hidden sm:block bg-[#06B6D4]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000"></div>
                    <div className="absolute -top-48 -left-48 w-96 h-96 hidden sm:block bg-[#06B6D4]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 delay-100"></div>
                    
                    <div className="flex flex-col h-full relative z-10">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0891B2] to-[#06B6D4] text-white shadow-lg mr-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#1E2756] sm:bg-clip-text sm:text-transparent sm:bg-gradient-to-r sm:from-[#1E2756] sm:to-[#1E2756] group-hover:from-[#0891B2] group-hover:to-[#06B6D4] transition-all duration-500">Adres</h3>
                      </div>
                      
                      <div className="flex-grow">
                        <p className="text-gray-600 text-xs mb-1 font-medium">Kemalpaşa, Cumhuriyet Cd. No:40</p>
                        <p className="text-gray-600 text-xs mb-2 font-medium">41050 İzmit/Kocaeli</p>
                      </div>
                      
                      <div className="mt-3 pt-2 border-t border-gray-200/40">
                        <Link 
                          href="https://maps.google.com/?q=Kemalpaşa, Cumhuriyet Cd. No:40, 41050 İzmit/Kocaeli" 
                          target="_blank"
                          className="flex items-center text-[#06B6D4] font-semibold text-xs hover:text-[#0891B2] transition-colors"
                        >
                          <span>Yol Tarifi Al</span>
                          <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Çalışma Saatleri - Yeni Tasarım */}
                <div className="group mt-4 sm:mt-6 relative p-4 sm:p-5 rounded-2xl transition-all duration-500 overflow-hidden bg-white sm:bg-gradient-to-br sm:from-white/70 sm:to-white/30 sm:backdrop-blur-sm border border-gray-100 sm:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.2)] hover:border-[#4F46E5]/20">
                  <div className="absolute inset-0 hidden sm:block bg-gradient-to-br from-[#4F46E5]/5 via-[#818CF8]/5 to-[#4F46E5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute -bottom-96 right-0 w-96 h-96 hidden sm:block bg-[#4F46E5]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000 delay-100"></div>
                  
                  <div className="flex items-center mb-3 sm:mb-4 relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#818CF8] text-white shadow-lg mr-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1E2756] sm:bg-clip-text sm:text-transparent sm:bg-gradient-to-r sm:from-[#1E2756] sm:to-[#1E2756] group-hover:from-[#4F46E5] group-hover:to-[#818CF8] transition-all duration-500">Çalışma Saatleri</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 sm:mt-4 relative z-10">
                    {workingHours.map((item, index) => (
                      <div 
                        key={index} 
                        className={`p-2 sm:p-3 rounded-xl transition-all duration-300 hover:shadow-md ${
                          item.hours === "Kapalı" 
                            ? "bg-red-50 border border-red-100 hover:bg-red-50 hover:border-red-200" 
                            : "bg-blue-50 border border-blue-100 hover:bg-blue-50 hover:border-blue-200"
                        }`}
                      >
                        <div className="font-semibold text-xs sm:text-sm text-[#1E2756]">{item.day}</div>
                        <div className={`mt-1 text-xs font-medium sm:font-semibold ${
                          item.hours === "Kapalı" 
                            ? "text-red-600" 
                            : "text-blue-700"
                        }`}>
                          {item.hours}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sağ Taraf - Harita */}
              <div className="lg:col-span-1 mt-6 lg:mt-0">
                <div className="relative h-[400px] lg:h-full lg:sticky lg:top-24">
                  <div className="absolute -inset-3 bg-gradient-to-r from-[#1E2756] to-[#2C3E50] rounded-3xl opacity-75 blur-xl"></div>
                  <div className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[520px] bg-white rounded-3xl overflow-hidden p-1.5 shadow-xl transition-all duration-500 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E2756]/5 to-[#2C3E50]/5 opacity-0 hover:opacity-50 transition-opacity z-10 pointer-events-none"></div>
                    
                    {/* Harita Container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                      {/* Loading state */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-[#1E2756]/20 border-t-[#1E2756] rounded-full animate-spin mb-4"></div>
                          <p className="text-sm text-gray-500">Harita yükleniyor...</p>
                        </div>
                      </div>

                      {/* Google Maps Embed */}
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.745309630802!2d29.919690776537713!3d40.76636597138435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb5babc37b76d1%3A0x2e96a938ea4c1973!2sDent%20Titanyum%20A%C4%9F%C4%B1z%20ve%20Di%C5%9F%20Sa%C4%9Fl%C4%B1%C4%9F%C4%B1%20Merkezi!5e0!3m2!1str!2str!4v1710159477044!5m2!1str!2str"
                        style={{ border: 0, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-2xl z-20"
                        onLoad={(e) => {
                          // iframe yüklendiğinde loading state'i gizle
                          const target = e.target as HTMLIFrameElement;
                          const loadingEl = target.previousElementSibling;
                          if (loadingEl) {
                            loadingEl.classList.add('opacity-0');
                            setTimeout(() => {
                              loadingEl.classList.add('hidden');
                            }, 300);
                          }
                        }}
                      />

                      {/* Harita Overlay ve Buton */}
                      <div className="absolute bottom-4 right-4 z-30">
                        <a 
                          href="https://maps.google.com/?q=Dent+Titanyum+Ağız+ve+Diş+Sağlığı+Merkezi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm shadow-lg font-semibold text-[#1E2756] hover:bg-white/100 transition-all hover:scale-105 duration-300"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Google Maps&apos;te Aç
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sosyal Medya Bağlantıları */}
        <section className="py-10 sm:py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E2756] mb-6 sm:mb-8">Sosyal Medyada Bizi Takip Edin</h3>
            <div className="flex justify-center gap-4 sm:gap-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 sm:w-14 h-12 sm:h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1E2756] to-[#2C3E50] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity"></div>
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={20}
                    height={20}
                    className="transform transition-transform group-hover:scale-110 w-6 h-6 sm:w-6 sm:h-6"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 