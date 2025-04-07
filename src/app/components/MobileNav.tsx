"use client";

import Link from "next/link";
import { useEffect } from "react";
import { sendGAEvent } from '@/lib/analytics';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Mobile menu */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4 border-b border-gray-100">
            <button 
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-800"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="flex flex-col space-y-3 px-6">
              <Link 
                href="/" 
                className="py-2 text-gray-800 font-medium border-b border-gray-100"
                onClick={onClose}
              >
                Anasayfa
              </Link>
              <Link 
                href="/tedavilerimiz" 
                className="py-2 text-gray-800 border-b border-gray-100"
                onClick={onClose}
              >
                Tedavilerimiz
              </Link>
              <Link 
                href="/hekimlerimiz" 
                className="py-2 text-gray-800 border-b border-gray-100"
                onClick={onClose}
              >
                Hekimlerimiz
              </Link>
              <Link 
                href="/hakkimizda" 
                className="py-2 text-gray-800 border-b border-gray-100"
                onClick={onClose}
              >
                Hakkımızda
              </Link>
              <Link 
                href="/iletisim" 
                className="py-2 text-gray-800 border-b border-gray-100"
                onClick={onClose}
              >
                İletişim
              </Link>
            </div>
          </nav>
          
          <div className="p-6 border-t border-gray-100 space-y-3">
            <Link 
              href="/randevu" 
              className="block w-full py-3 px-4 bg-gradient-to-r from-[#234b8a] to-[#3561a8] text-white text-center font-medium rounded-lg"
              onClick={() => {
                sendGAEvent('contact_click', {
                  event_category: 'Contact',
                  event_label: 'Mobile Randevu Butonu'
                });
                onClose();
              }}
            >
              Randevu Al
            </Link>
            <a 
              href="tel:+905528327741" 
              className="block w-full py-3 px-4 bg-gradient-to-r from-[#234b8a] to-[#3561a8] text-white text-center font-medium rounded-lg"
              onClick={() => {
                sendGAEvent('contact_click', {
                  event_category: 'Contact',
                  event_label: 'Mobile Telefon Butonu'
                });
                onClose();
              }}
            >
              +90 552 832 77 41
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 