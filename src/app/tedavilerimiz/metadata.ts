import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tedavilerimiz | DentTitanyum - Diş Sağlığı Merkezi",
  description: "İmplant, ortodonti, zirkonyum kaplama, gülüş tasarımı ve daha fazlası. Modern teknolojilerle uygulanan kapsamlı diş tedavilerimiz hakkında bilgi alın.",
  keywords: "implant tedavisi, ortodonti tedavisi, zirkonyum kaplama, gülüş tasarımı, diş beyazlatma, diş tedavileri İzmit",
  alternates: {
    canonical: 'https://denttitanyum.com/tedavilerimiz'
  },
  openGraph: {
    title: "Tedavilerimiz | DentTitanyum",
    description: "İmplant, ortodonti, zirkonyum kaplama, gülüş tasarımı ve daha fazlası. Modern teknolojilerle uygulanan kapsamlı diş tedavilerimiz.",
    type: "website",
    locale: "tr_TR",
    url: 'https://denttitanyum.com/tedavilerimiz',
    siteName: "DentTitanyum",
    images: [
      {
        url: 'https://denttitanyum.com/images/treatments-og.jpg',
        width: 1200,
        height: 630,
        alt: 'DentTitanyum Tedavi Hizmetleri'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tedavilerimiz | DentTitanyum",
    description: "İmplant, ortodonti, zirkonyum kaplama, gülüş tasarımı ve daha fazlası. Modern teknolojilerle uygulanan kapsamlı diş tedavilerimiz.",
    images: ['https://denttitanyum.com/images/treatments-og.jpg']
  }
}; 