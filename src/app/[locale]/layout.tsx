import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "sonner";
import Script from "next/script";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

import { inter, oswald, playfair } from '@/lib/fonts';


export const metadata: Metadata = {
  metadataBase: new URL('https://blackink.cl'),
  title: {
    default: 'Black Ink Tattoo Studio | Tatuajes Premium en Santiago',
    template: '%s | Black Ink Tattoo Studio',
  },
  description:
    'Estudio de tatuajes premium en Santiago, Chile. Blackwork, realismo, neotradicional y diseños personalizados por artistas expertos. Reserva tu cita ahora.',
  keywords: [
    'tatuajes Santiago',
    'tattoo studio Chile',
    'tatuajes premium',
    'blackwork',
    'realismo tattoo',
    'neotradicional',
    'diseño personalizado tattoo',
    'estudio de tatuajes',
    'tatuajes profesionales',
    'tattoo artist Santiago',
    'cover up tattoo',
    'tatuajes a color',
    'tatuajes black and grey',
  ],
  authors: [{ name: 'Black Ink Tattoo Studio' }],
  creator: 'Black Ink Tattoo Studio',
  publisher: 'Black Ink Tattoo Studio',
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
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    alternateLocale: ['en_US', 'pt_BR'],
    url: 'https://blackink.cl',
    siteName: 'Black Ink Tattoo Studio',
    title: 'Black Ink Tattoo Studio | Tatuajes Premium en Santiago',
    description:
      'Estudio de tatuajes premium en Santiago, Chile. Blackwork, realismo, neotradicional y diseños personalizados por artistas expertos.',
    images: [
      {
        url: '/images/hero-bg-2.png',
        width: 1200,
        height: 630,
        alt: 'Black Ink Tattoo Studio - Interior del estudio de tatuajes premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Black Ink Tattoo Studio | Tatuajes Premium en Santiago',
    description:
      'Estudio de tatuajes premium en Santiago, Chile. Blackwork, realismo, neotradicional y diseños personalizados.',
    images: ['/images/hero-bg-2.png'],
    creator: '@blackinktattoo',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://blackink.cl',
    languages: {
      es: 'https://blackink.cl/es',
      en: 'https://blackink.cl/en',
      pt: 'https://blackink.cl/pt',
    },
  },
  category: 'tattoo studio',
  classification: 'Business',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${oswald.variable} ${playfair.variable} font-sans antialiased bg-black text-zinc-50`}
      >
        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TattooParlor',
              name: 'Black Ink Tattoo Studio',
              image: 'https://blackink.cl/images/hero-bg-2.png',
              url: 'https://blackink.cl',
              telephone: '+56930579869',
              email: 'omar.caiguan@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Santiago',
                addressRegion: 'Región Metropolitana',
                addressCountry: 'CL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -33.4372562,
                longitude: -70.6482672,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '10:00',
                  closes: '20:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '11:00',
                  closes: '18:00',
                },
              ],
              priceRange: '$$',
              paymentAccepted: 'Cash, Credit Card, Bank Transfer',
              currenciesAccepted: 'CLP',
              areaServed: 'Santiago, Chile',
              hasMap: 'https://maps.google.com?q=Santiago',
            }),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
