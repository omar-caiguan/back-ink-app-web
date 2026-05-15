'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const t = useTranslations('Navigation');
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: t('home') },
    { href: '#artists', label: t('artists') },
    { href: '#services', label: t('services') },
    { href: '#gallery', label: t('gallery') },
    { href: '#contact', label: t('contact') },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/85 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 h-24 md:h-28 flex items-center justify-between">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 lg:gap-4 text-xl lg:text-2xl font-heading font-bold text-white tracking-widest uppercase cursor-pointer"
        >
          <Image
            src="/icon/blackink.PNG"
            alt="Black Ink"
            width={88}
            height={88}
            className="h-16 w-16 lg:h-24 lg:w-24 object-contain"
            priority
          />
          <span className="hidden lg:inline">
            Black<span className="text-red-700">Ink</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) =>
            link.href === '/' ? (
              <button
                key={link.href}
                onClick={scrollToTop}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-red-700 cursor-pointer",
                  pathname === link.href ? "text-red-700" : "text-zinc-400"
                )}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-red-700",
                  pathname === link.href ? "text-red-700" : "text-zinc-400"
                )}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="h-6 w-px bg-white/20 mx-2" />
          <LanguageSwitcher />
          <Button
            variant="default"
            className="bg-red-700 hover:bg-red-800 text-white font-medium rounded-md px-6 ml-4 cursor-pointer"
            onClick={scrollToContact}
          >
            {t('booking')}
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
            <LanguageSwitcher />
            <button
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
            >
            {isOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-b border-white/10"
          >
            <nav className="flex flex-col p-6 gap-6">
              {links.map((link) =>
                link.href === '/' ? (
                  <button
                    key={link.href}
                    onClick={scrollToTop}
                    className="text-lg font-medium text-zinc-400 hover:text-red-700 text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-zinc-400 hover:text-red-700"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Button
                className="w-full bg-red-700 hover:bg-red-800 text-white rounded-md mt-4 cursor-pointer"
                onClick={scrollToContact}
              >
                {t('booking')}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
