'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');
  
  // Also need Navigation translations for links
  const tNav = useTranslations('Navigation');

  return (
    <footer className="bg-black/90 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 text-2xl font-heading font-bold text-white tracking-widest uppercase">
              <Image
                src="/icon/blackink.PNG"
                alt="Black Ink"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <span>
                Black<span className="text-red-700">Ink</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {t('description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-red-700 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-zinc-400 hover:text-red-700 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-zinc-400 hover:text-red-700 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-heading text-lg tracking-wide">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-zinc-500 hover:text-red-700 text-sm">{tNav('artists')}</Link></li>
              <li><Link href="/artists" className="text-zinc-500 hover:text-red-700 text-sm">{tNav('services')}</Link></li>
              <li><Link href="/gallery" className="text-zinc-500 hover:text-red-700 text-sm">{tNav('gallery')}</Link></li>
              <li><Link href="/faq" className="text-zinc-500 hover:text-red-700 text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-heading text-lg tracking-wide">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-zinc-500 text-sm">
                <MapPin size={18} className="text-red-700 shrink-0" />
                <span>Santiago, Región Metropolitana, Chile</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500 text-sm">
                <Phone size={18} className="text-red-700 shrink-0" />
                <span>+56 9 3057 9869</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500 text-sm">
                <Mail size={18} className="text-red-700 shrink-0" />
                <span>omar.caiguan@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-white font-heading text-lg tracking-wide">{t('hours')}</h3>
            <ul className="space-y-2 text-zinc-500 text-sm">
              <li className="flex justify-between">
                <span>{t('days.monFri')}</span>
                <span className="text-white">10:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>{t('days.saturday')}</span>
                <span className="text-white">11:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>{t('days.sunday')}</span>
                <span className="text-red-700">{t('days.closed')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
