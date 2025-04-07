import { AppProps } from 'next/app';
import { Open_Sans, Playfair_Display } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${openSans.variable} ${playfair.variable}`}>
      <Component {...pageProps} />
    </main>
  );
} 