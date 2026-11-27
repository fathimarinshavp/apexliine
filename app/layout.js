import {
  Geist,
  Hanken_Grotesk,
  Inter_Tight,
  Manrope,
  Plus_Jakarta_Sans,
  Roboto_Mono,
} from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '600'],
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: ['500'],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hanken-grotesk',
  weight: ['300', '400', '500', '600'],
});

export const metadata = {
  title: 'Apexline Graphics LLC | Print, Design & Finishing',
  description:
    'Apexline Graphics LLC creates considered print, packaging and finishing — from digital and offset printing to binding and large-format graphics.',
};

export const viewport = {
  themeColor: '#111111',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${interTight.variable} ${geist.variable} ${robotoMono.variable} ${plusJakartaSans.variable} ${hankenGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
