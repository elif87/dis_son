import type { Metadata } from "next";
import { Playfair_Display, Open_Sans, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { Providers } from "./providers";
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import { prisma } from '@/lib/prisma';
import { metadata } from './metadata';

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial']
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial']
});

const inter = Inter({ subsets: ['latin'] });

async function getScripts() {
  try {
    const scripts = await prisma.script.findMany({
      where: {
        isActive: true
      }
    });
    return scripts;
  } catch (error) {
    console.error('Script yükleme hatası:', error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scripts = await getScripts();

  return (
    <html lang="tr" className={`${playfair.variable} ${openSans.variable} ${inter.className}`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              "name": "DentTitanyum Diş Sağlığı Merkezi",
              "image": "https://denttitanyum.com/images/logo.png",
              "description": "Güvenilir ve profesyonel diş sağlığı hizmetleri",
              "@id": "https://denttitanyum.com",
              "url": "https://denttitanyum.com",
              "telephone": "+902623211111",
              "priceRange": "₺₺₺",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ömerağa Mah. Ankara Cad.",
                "addressLocality": "İzmit",
                "addressRegion": "Kocaeli",
                "postalCode": "41300",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.7667,
                "longitude": 29.9167
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.facebook.com/denttitanyum",
                "https://www.instagram.com/denttitanyum",
                "https://www.google.com/maps?cid=YOUR_GOOGLE_PLACE_ID"
              ]
            })
          }}
        />
        {scripts.map((script) => {
          if (script.type === 'google-tag-manager' && script.scriptId) {
            return (
              <>
                <Script
                  key={`gtm-script-${script.id}`}
                  id="google-tag-manager"
                  strategy="afterInteractive"
                >
                  {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${script.scriptId}');
                  `}
                </Script>
              </>
            );
          }

          if (script.type === 'meta-pixel' && script.scriptId) {
            return (
              <Script
                key={`meta-pixel-${script.id}`}
                id="meta-pixel"
                strategy="afterInteractive"
              >
                {`
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${script.scriptId}');
                  fbq('track', 'PageView');
                `}
              </Script>
            );
          }

          if (script.type === 'custom' && script.customScript) {
            return (
              <Script
                key={`custom-${script.id}`}
                id={`custom-${script.id}`}
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: script.customScript }}
              />
            );
          }

          return null;
        })}
      </head>
      <body className="antialiased">
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
        <Toaster position="top-right" />
        {scripts.map((script) => {
          if (script.type === 'google-tag-manager' && script.scriptId) {
            return (
              <noscript key={`gtm-noscript-${script.id}`}>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${script.scriptId}`}
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}
                />
              </noscript>
            );
          }
          return null;
        })}
      </body>
    </html>
  );
}
