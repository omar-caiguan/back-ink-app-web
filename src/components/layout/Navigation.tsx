'use client';

import * as React from 'react';
import Link from 'next/link';
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

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-bold text-white tracking-widest uppercase">
          Black<span className="text-red-600">Ink</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-red-500",
                pathname === link.href ? "text-red-500" : "text-zinc-400"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-6 w-[1px] bg-white/20 mx-2" />
          <LanguageSwitcher />
          <Button variant="default" className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-md px-6 ml-4">
            {t('booking')}
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
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
            className="md:hidden bg-black border-b border-white/10"
          >
            <nav className="flex flex-col p-6 gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-zinc-400 hover:text-red-500"
                >
                  {link.label}
                </Link>
              ))}
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md mt-4">
                {t('booking')}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
