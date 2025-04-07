"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { sendGAEvent } from '../lib/analytics';

interface Service {
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface Doctor {
  id: string;
  name: string;
  title: string;
  image: string;
  specialties: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

interface Particle {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

// services'i export etmek yerine const olarak tanımlıyoruz
// export const services = [
const servicesData: Service[] = [
  {
    title: "İmplant Tedavisi",
    description: "Modern teknoloji ile implant tedavisi uyguluyoruz.",
    href: "/tedavilerimiz#implant-tedavisi",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
  },
  {
    title: "Temel Diş Bakımı",
    description: "Profesyonel diş temizliği ve bakım hizmetleri.",
    href: "/tedavilerimiz#temel-dis-bakimi",
    icon: "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
  },
  {
    title: "Ortodonti",
    description: "Modern ortodontik tedavi yöntemleri.",
    href: "/tedavilerimiz#ortodonti",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  },
  {
    title: "Pedodonti",
    description: "Çocuk diş hekimliği ve tedavileri.",
    href: "/tedavilerimiz#pedodonti",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    title: "Protez",
    description: "Protez diş hekimliği ve tedavileri.",
    href: "/tedavilerimiz#protez-dis-hekimligi",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  },
  {
    title: "Estetik",
    description: "Estetik diş hekimliği ve tedavileri.",
    href: "/tedavilerimiz#estetik-dis-hekimligi",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
  },
  {
    title: "Endodonti",
    description: "Kanal tedavisi ve endodontik tedaviler.",
    href: "/tedavilerimiz#endodonti",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
  },
  {
    title: "Diş Beyazlatma",
    description: "Profesyonel diş beyazlatma tedavisi.",
    href: "/tedavilerimiz#dis-beyazlatma",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  }
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setIsVisible(true);
    // Generate particle positions only on client side
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 10}s`
      }))
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <style jsx global>{`
        @keyframes floatBubble {
          0% {
            transform: translateY(120vh) translateX(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            transform: translateY(60vh) translateX(-100px) scale(1.2);
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20vh) translateX(100px) scale(1);
            opacity: 0;
          }
        }
        .animate-float-bubble {
          animation: floatBubble ease-in-out infinite;
        }
        .bubble-container {
          position: fixed;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .fade-in-scale {
          animation: fadeInScale 1s ease-out forwards;
        }
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #1a365d;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.1;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>

      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="relative h-[calc(30vh+40px)] md:h-[calc(50vh+60px)] pt-0 overflow-hidden">
          {/* Particles */}
          {particles.map((particle, index) => (
            <div
              key={index}
              className="particle"
              style={{
                left: particle.left,
                top: particle.top,
                animation: `float ${particle.duration} ease-in-out infinite`,
                animationDelay: particle.delay,
              }}
            />
          ))}
          
          {/* Image background with animation */}
          <div className="absolute inset-0 scale-110">
            <div className="absolute inset-0 bg-white opacity-80"></div>
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 bg-repeat"></div>
            <Image
              src="/klinik/4.webp"
              alt="Uzman Hekimlerimiz"
              fill
              priority
              className={`object-cover opacity-95 transition-all duration-1000 ${
                isVisible ? 'scale-100' : 'scale-110'
              }`}
            />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/15 to-white z-10"></div>
          
          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full px-3 md:px-6 text-center">
            <div className={`max-w-4xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="mb-1 md:mb-3">
                <span className="py-0.5 px-2 md:px-3 text-[10px] md:text-xs font-semibold tracking-widest uppercase rounded-full inline-flex items-center gap-1 md:gap-2 text-[#1a365d] bg-[#1a365d]/10 border border-[#1a365d]/20">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#1a365d] rounded-full"></span>
                  BİZİ YAKINDAN TANIYIN
                </span>
              </div>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-black mb-4 text-[#1a365d] leading-tight">
                Sağlıklı Dişler,<br/>
                <span className="text-[#1a365d]">Güzel Gülüşler</span>
              </h1>
              <p className="text-gray-600 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 px-2">
                Modern teknoloji ve uzman kadromuzla sizlere en iyi diş sağlığı hizmetini sunmak için buradayız.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link 
                  href="/hakkimizda" 
                  className="px-6 py-3 bg-[#1a365d] text-white rounded-lg text-sm font-semibold hover:bg-[#1a365d]/90 transition-all duration-300"
                >
                  Hakkımızda
                </Link>
                <Link 
                  href="/iletisim" 
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Credit Card Installment Section */}
        <section className="py-8 md:py-12 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <span className="inline-block py-1 px-3 md:px-4 rounded-full bg-[#1a365d]/10 text-[#1a365d] text-xs md:text-sm font-medium mb-2">
                Ödeme Seçenekleri
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
                Tüm Kredi Kartlarına 12 Aya Varan Taksit
              </h2>
              <div className="w-12 md:w-16 h-1 bg-[#1a365d] rounded-full mx-auto mb-2 md:mb-3"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-xs md:text-sm px-2">
                Tedavilerinizi daha kolay ödeyebilmeniz için tüm kredi kartlarına 12 aya varan taksit imkanı sunuyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-2">
              {/* Credit Card Option 1 */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-[#1a365d]/5 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">Tüm Kredi Kartları</h3>
                <p className="text-gray-600 text-sm text-center">
                  Tüm banka kredi kartlarına taksit imkanı
                </p>
              </div>

              {/* Credit Card Option 2 */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-[#1a365d]/5 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">12 Aya Varan Taksit</h3>
                <p className="text-gray-600 text-sm text-center">
                  Tedavi tutarınıza göre 12 aya varan taksit seçenekleri
                </p>
              </div>

              {/* Credit Card Option 3 */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-[#1a365d]/5 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">Faizsiz Taksit</h3>
                <p className="text-gray-600 text-sm text-center">
                  Uygun tutarlarda faizsiz taksit fırsatı
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Taksit seçenekleri için lütfen bizimle iletişime geçin
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-8 md:py-20 px-3 md:px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#1a365d]/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2d4a77]/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#1a365d]/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-6 md:mb-16">
              <span className="inline-flex items-center gap-1 md:gap-2 py-0.5 md:py-2 px-2 md:px-4 rounded-full bg-[#1a365d]/5 text-[#1a365d] text-[10px] md:text-sm font-medium border border-[#1a365d]/10">
                <span className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#1a365d] animate-pulse"></span>
                HİZMETLERİMİZ
                <span className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#1a365d] animate-pulse"></span>
              </span>
              <h2 className="text-xl md:text-5xl font-black mt-3 md:mt-6 mb-2 md:mb-4 bg-gradient-to-r from-[#1a365d] via-gray-800 to-[#2d4a77] bg-clip-text text-transparent">
                Tedavi Seçeneklerimiz
              </h2>
              <div className="w-12 md:w-20 h-0.5 md:h-1.5 bg-gradient-to-r from-[#1a365d] to-[#2d4a77] rounded-full mx-auto mb-3 md:mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-xs md:text-lg px-2">
                Modern teknoloji ve uzman kadromuzla, en kaliteli tedavi hizmetini sunuyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 max-w-7xl mx-auto px-2">
              {servicesData.map((service, index) => (
                <Link 
                  key={index} 
                  href={service.href}
                  className="group relative bg-white rounded-2xl border border-gray-100 hover:border-[#1a365d]/20 transition-all duration-500 hover:shadow-2xl overflow-hidden flex flex-col p-6 hover:-translate-y-2"
                >
                  {/* Enhanced background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-0 group-hover:opacity-5 transition-all duration-500 group-hover:scale-125"></div>
                  
                  {/* Animated corner decorations */}
                  <div className="absolute top-0 left-0 w-24 h-24 -translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-br from-[#1a365d]/10 to-transparent rounded-br-full"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-tl from-[#1a365d]/10 to-transparent rounded-tl-full"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                  
                  {/* Content with enhanced animations */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Title and arrow in the same row */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#1a365d] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <div className="transform transition-all duration-500 group-hover:translate-x-1">
                        <svg 
                          className="w-5 h-5 text-[#1a365d] opacity-50 group-hover:opacity-100" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm flex-grow transform group-hover:translate-x-1 transition-transform duration-300">
                      {service.description}
                    </p>
                    
                    <div className="mt-6 flex items-center text-[#1a365d] text-sm font-medium transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="mr-2">Detaylı Bilgi</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover indicator dots */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#1a365d]/20 group-hover:bg-[#1a365d] transition-colors duration-300 delay-100"></div>
                    <div className="w-1 h-1 rounded-full bg-[#1a365d]/20 group-hover:bg-[#1a365d] transition-colors duration-300 delay-200"></div>
                    <div className="w-1 h-1 rounded-full bg-[#1a365d]/20 group-hover:bg-[#1a365d] transition-colors duration-300 delay-300"></div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <Link 
                href="/tedavilerimiz" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a365d] text-white rounded-xl text-lg font-semibold hover:bg-[#2d4a77] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                Tüm Tedavilerimizi İncele
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <span className="inline-block py-1 px-3 md:px-4 rounded-full bg-[#1a365d]/10 text-[#1a365d] text-xs md:text-sm font-medium mb-2 md:mb-4">
                Bizimle Tanışın
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-6">
                Uzman Hekimlerimiz
              </h2>
              <div className="w-16 md:w-24 h-1 bg-[#1a365d] rounded-full mx-auto mb-3 md:mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm px-2">
                Dent Titanyum ailesi olarak, mesleğinde uzman diş hekimleri ve sağlık personelimizle birlikte, hastalarımıza güler yüzlü ve nitelikli diş hizmeti sunmayı amaçlıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto px-2">
              {[
                {
                  id: "dt-bunyamin-kazdal",
                  name: "Dt. Bünyamin Kazdal",
                  title: "Genel Diş Hekimi",
                  image: "/klinik/dent_titanyum (2).webp",
                  specialties: ["İmplant Tedavisi", "Porselen Lamine", "Zirkonyum"]
                },
                {
                  id: "dt-hamza-furkan-arslan",
                  name: "Dt. Hamza Furkan Arslan",
                  title: "Genel Diş Hekimi",
                  image: "/klinik/dent_titanyum (3).webp",
                  specialties: ["Endodonti", "Kanal Tedavisi", "İmplant"]
                }
              ].map((doctor) => (
                <Link
                  key={doctor.id}
                  href={`/hekimlerimiz#${doctor.id}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative w-64 h-64 mb-6 cursor-pointer">
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-300 group-hover:shadow-xl">
                      <div className="absolute inset-0 bg-[#1a365d]/0 group-hover:bg-[#1a365d]/10 transition-all duration-300 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white p-2 rounded-full">
                          <svg className="w-5 h-5 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ objectPosition: '50% 35%' }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {doctor.title}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {doctor.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/hekimlerimiz"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#1a365d]/30 text-[#1a365d] rounded-lg text-sm font-semibold hover:bg-[#1a365d]/5 transition-all duration-300"
              >
                Tüm Hekimlerimizi Tanıyın
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

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
              <p className="text-gray-600 max-w-2xl mx-auto text-xs md:text-sm px-2">
                Hastalarımızın en çok merak ettiği soruları ve cevaplarını sizler için derledik.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-2 px-2">
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
            <div className="mt-6 text-center">
              <Link 
                href="/iletisim" 
                className="inline-flex items-center gap-1 px-4 py-2 bg-[#1a365d] text-white text-sm rounded-lg hover:bg-[#1a365d]/90 transition-colors duration-300"
              >
                <span>Daha Fazla Soru İçin İletişime Geç</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Insurance Partners Section */}
        <section className="py-8 md:py-12 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <span className="inline-block py-1 px-3 md:px-4 rounded-full bg-[#1a365d]/10 text-[#1a365d] text-xs md:text-sm font-medium mb-2">
                Sigorta Anlaşmalarımız
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
                Anlaşmalı Sigorta Şirketlerimiz
              </h2>
              <div className="w-12 md:w-16 h-1 bg-[#1a365d] rounded-full mx-auto mb-2 md:mb-3"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-xs md:text-sm px-2">
                Tedavilerinizde anlaşmalı olduğumuz sigorta şirketlerimizin avantajlarından yararlanabilirsiniz.
              </p>
            </div>
            
            <div className="flex justify-center items-center px-2">
              <div className="relative w-48 md:w-64 h-24 md:h-32 bg-white rounded-xl shadow-lg p-3 md:p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <Image
                  src="/images/alianz.webp"
                  alt="Allianz Sigorta"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 md:py-12 px-4 md:px-6 bg-white">
          <div className="max-w-4xl mx-auto p-6 md:p-8 bg-gradient-to-br from-[#1a365d] to-[#2d4a77] rounded-xl md:rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                Sağlıklı Gülüşler İçin<br/>
                <span className="text-white/90">Hemen Randevu Alın</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <Link 
                  href="/iletisim" 
                  className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-white text-[#1a365d] rounded-lg text-sm md:text-base font-semibold hover:bg-[#1a365d] hover:text-white transition-all duration-300"
                  onClick={() => {
                    sendGAEvent('contact_click', {
                      event_category: 'Contact',
                      event_label: 'Ana Sayfa Randevu Butonu'
                    });
                  }}
                >
                  Randevu Al
                </Link>
                <Link 
                  href="tel:+905528327741" 
                  className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-transparent border border-white text-white rounded-lg text-sm md:text-base font-semibold hover:bg-white/10 transition-all duration-300"
                  onClick={() => {
                    sendGAEvent('contact_click', {
                      event_category: 'Contact',
                      event_label: 'Ana Sayfa Telefon Butonu'
                    });
                  }}
                >
                  +90 552 832 77 41
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
