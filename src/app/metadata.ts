import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://denttitanyum.com'),
  title: "DentTitanyum - Diş Sağlığı Merkezi",
  description: "Güvenilir ve profesyonel diş sağlığı hizmetleri. Modern teknoloji ve uzman kadromuzla implant, ortodonti, estetik diş hekimliği ve daha fazlası.",
  keywords: "diş hekimi, diş kliniği, implant, ortodonti, diş tedavisi, estetik diş hekimliği, İzmit diş",
  applicationName: 'DentTitanyum',
  authors: [{ name: 'DentTitanyum' }],
  generator: 'Next.js',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "DentTitanyum - Diş Sağlığı Merkezi",
    description: "Güvenilir ve profesyonel diş sağlığı hizmetleri. Modern teknoloji ve uzman kadromuzla implant, ortodonti, estetik diş hekimliği ve daha fazlası.",
    type: "website",
    locale: "tr_TR",
    siteName: "DentTitanyum",
  },
  twitter: {
    card: "summary_large_image",
    title: "DentTitanyum - Diş Sağlığı Merkezi",
    description: "Güvenilir ve profesyonel diş sağlığı hizmetleri. Modern teknoloji ve uzman kadromuzla hizmetinizdeyiz.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  },
}; 