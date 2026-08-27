import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://danaengels.com'),
  title: 'Dana Engels | Product OS Portfolio',
  description:
    'The interactive portfolio of Dana Engels, a WGU Computer Science student building toward software and AI engineering.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dana Engels | Product OS Portfolio',
    description:
      'An interactive portfolio for a WGU Computer Science student building toward software and AI engineering.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dana Engels | Product OS Portfolio',
    description:
      'An interactive portfolio for a WGU Computer Science student building toward software and AI engineering.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
