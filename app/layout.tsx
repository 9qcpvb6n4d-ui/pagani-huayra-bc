import type { Metadata } from 'next';
import { Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Pagani Huayra BC | Macchina Volante',
  description:
    'Experience the Pagani Huayra BC Macchina Volante. Aerodynamic mastery, hand-built AMG V12 biturbo engine, Carbotanium architecture, and gullwing butterfly doors.',
  keywords: [
    'Pagani',
    'Huayra BC',
    'Macchina Volante',
    'Hypercar',
    'Supercar',
    'V12 Biturbo',
    'Carbotanium',
  ],
  authors: [{ name: 'Pagani Automobili' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className="bg-white text-[#111111] antialiased selection:bg-[#CC0000] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
