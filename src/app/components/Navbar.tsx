"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { sendGAEvent } from '../../components/analytics';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="flex items-center group focus:outline-none logo-link -ml-1">
            <div className="relative w-60 h-16 overflow-hidden">
              <Image
                src="/images/dentlogo.webp"
                alt="DentTitanyum"
                fill
                className="object-contain"
                style={{ objectPosition: 'center' }}
                priority
              />
            </div>
          </Link>
          
          <div className="md:flex hidden items-center space-x-6">
            <Link href="/" className="text-gray-800 font-medium">Anasayfa</Link>
            <Link href="/tedavilerimiz" className="text-gray-800/70 hover:text-gray-800 transition-colors">Tedavilerimiz</Link>
            <Link href="/hekimlerimiz" className="text-gray-800/70 hover:text-gray-800 transition-colors">Hekimlerimiz</Link>
            <Link href="/hakkimizda" className="text-gray-800/70 hover:text-gray-800 transition-colors">Hakkımızda</Link>
            <Link href="/iletisim" className="text-gray-800/70 hover:text-gray-800 transition-colors">İletişim</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/randevu" 
              className="relative overflow-hidden group px-3 py-1.5 bg-gradient-to-r from-[#234b8a] to-[#3561a8] rounded-lg text-white text-sm font-medium flex items-center gap-2"
              onClick={() => {
                sendGAEvent('contact_click', {
                  event_category: 'Contact',
                  event_label: 'Navbar Randevu Butonu'
                });
              }}
            >
              <span className="relative z-10">Randevu Al</span>
              <svg className="w-3 h-3 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-[#3561a8] to-[#234b8a] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </Link>
            <Link 
              href="/randevu-sorgula"
              className="relative overflow-hidden group px-3 py-1.5 bg-gradient-to-r from-[#234b8a] to-[#3561a8] rounded-lg text-white text-sm font-medium flex items-center gap-2"
              onClick={() => {
                sendGAEvent('contact_click', {
                  event_category: 'Contact',
                  event_label: 'Navbar Randevu Sorgula Butonu'
                });
              }}
            >
              <span className="relative z-10">Randevu Sorgula</span>
              <svg className="w-3 h-3 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-[#3561a8] to-[#234b8a] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </Link>
            <a 
              href="tel:+905528327741" 
              className="relative overflow-hidden group px-3 py-1.5 bg-gradient-to-r from-[#234b8a] to-[#3561a8] rounded-lg text-white text-sm font-medium flex items-center gap-2"
              onClick={() => {
                sendGAEvent('contact_click', {
                  event_category: 'Contact',
                  event_label: 'Navbar Telefon Butonu'
                });
              }}
            >
              <span className="relative z-10">+90 552 832 77 41</span>
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-[#3561a8] to-[#234b8a] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </a>
          </div>
          
          <button 
            className="md:hidden block text-gray-800"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={toggleMobileMenu}
      />
    </header>
  );
} 