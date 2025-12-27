'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg-2.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/40 to-zinc-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-zinc-300 tracking-[0.2em] font-medium uppercase text-sm md:text-base">
            {t('description')}
          </h2>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold text-white uppercase tracking-tighter shadow-xl">
            {t('mainTitle')}<span className="text-red-700">{t('mainTitleSuffix')}</span>
          </h1>

          <p className="max-w-xl mx-auto text-zinc-300 text-lg md:text-xl font-light">
            {t('subtitle')}
          </p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="pt-8 flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-red-700 hover:bg-red-800 text-white min-w-[200px] text-lg font-heading tracking-wide">
              {t('ctaBooking')}
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white min-w-[200px] text-lg font-heading tracking-wide">
              {t('ctaGallery')}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-zinc-500">{t('scroll')}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent" />
      </motion.div>
    </section>
  );
}
