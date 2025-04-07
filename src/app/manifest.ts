export default function manifest() {
  return {
    name: 'DentTitanyum',
    short_name: 'DentTitanyum',
    description: 'DentTitanyum Ağız ve Diş Sağlığı Merkezi',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a365d',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
} 