import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a365d] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
         
          {/* Quick Links */}
          <div className="flex flex-col items-start pl-4">
            <h3 className="text-lg font-semibold mb-6">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">Anasayfa</Link>
              </li>
              <li>
                <Link href="/tedavilerimiz" className="text-white/70 hover:text-white transition-colors">Tedavilerimiz</Link>
              </li>
              <li>
                <Link href="/hekimlerimiz" className="text-white/70 hover:text-white transition-colors">Hekimlerimiz</Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-white/70 hover:text-white transition-colors">Hakkımızda</Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-white/70 hover:text-white transition-colors">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-white/70">
                  Kemalpaşa, Cumhuriyet Cd. No:40, 41050 İzmit/Kocaeli
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+905528327741" className="text-white/70 hover:text-white transition-colors">
                  +90 552 832 77 41
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:info@denttitanyumizmit.net" className="text-white/70 hover:text-white transition-colors">
                  info@denttitanyumizmit.net
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="flex flex-col items-start pl-8">
            <h3 className="text-lg font-semibold mb-6">Çalışma Saatleri</h3>
            <ul className="space-y-3 w-full">
              <li className="flex justify-between items-center text-white/70">
                <span className="w-24">Pazartesi:</span>
                <span>10:00 - 22:00</span>
              </li>
              <li className="flex justify-between items-center text-white/70">
                <span className="w-24">Salı:</span>
                <span>10:00 - 22:00</span>
              </li>
              <li className="flex justify-between items-center text-white/70">
                <span className="w-24">Çarşamba:</span>
                <span>10:00 - 22:00</span>
              </li>
              <li className="flex justify-between items-center text-white/70">
                <span className="w-24">Perşembe:</span>
                <span>10:00 - 22:00</span>
              </li>
              <li className="flex justify-between items-center text-white/70">
                <span className="w-24">Cuma:</span>
                <span>10:00 - 22:00</span>
              </li>
              <li className="flex justify-between items-center text-white/70">
                <span className="w-24">Cumartesi:</span>
                <span>09:15 - 19:00</span>
              </li>
              <li className="flex justify-between items-center text-white/70">
                <span className="w-24">Pazar:</span>
                <span className="text-red-400">Kapalı</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} DentTitanyum. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/gizlilik-politikasi" className="text-white/70 hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
              <span className="text-white/30">|</span>
              <Link href="/kullanim-kosullari" className="text-white/70 hover:text-white transition-colors">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 