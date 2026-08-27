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
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Dana Engels',
    title: 'Dana Engels | Product OS Portfolio',
    description:
      'An interactive portfolio for a WGU Computer Science student building toward software and AI engineering.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Dana Engels, Computer Science Student',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dana Engels | Product OS Portfolio',
    description:
      'An interactive portfolio for a WGU Computer Science student building toward software and AI engineering.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Dana Engels, Computer Science Student',
      },
    ],
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
