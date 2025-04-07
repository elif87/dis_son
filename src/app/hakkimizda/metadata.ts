import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | DentTitanyum - Diş Sağlığı Merkezi",
  description: "20 yılı aşkın deneyimimiz ve uzman kadromuzla İzmit'te modern diş sağlığı hizmetleri sunuyoruz. Kliniğimiz, teknoloji ve hasta konforu odaklı yaklaşımıyla öne çıkıyor.",
  keywords: "DentTitanyum, İzmit diş kliniği, uzman diş hekimleri, modern diş kliniği, dental teknoloji",
  alternates: {
    canonical: 'https://denttitanyum.com/hakkimizda'
  },
  openGraph: {
    title: "Hakkımızda | DentTitanyum",
    description: "20 yılı aşkın deneyimimiz ve uzman kadromuzla İzmit'te modern diş sağlığı hizmetleri sunuyoruz.",
    type: "website",
    locale: "tr_TR",
    url: 'https://denttitanyum.com/hakkimizda',
    siteName: "DentTitanyum",
    images: [
      {
        url: 'https://denttitanyum.com/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'DentTitanyum Diş Kliniği'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hakkımızda | DentTitanyum",
    description: "20 yılı aşkın deneyimimiz ve uzman kadromuzla İzmit'te modern diş sağlığı hizmetleri sunuyoruz.",
    images: ['https://denttitanyum.com/images/about-og.jpg']
  }
}; 