import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "sonner";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

import { inter, oswald, playfair } from '@/lib/fonts';


export const metadata: Metadata = {
  title: "Black Ink Tattoo Studio",
  description: "Premium Tattoo Experience",
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
        className={`${inter.variable} ${oswald.variable} ${playfair.variable} font-sans antialiased bg-zinc-950 text-zinc-50`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
