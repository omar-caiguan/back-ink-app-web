'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const artists = [
  {
    id: 1,
    name: 'Alex "Ink" Ryker',
    specialtyKey: 'realism',
    image: '/images/artists/artist-1.png',
  },
  {
    id: 2,
    name: 'Elena Vance',
    specialtyKey: 'traditional',
    image: '/images/artists/artist-2.png',
  },
  {
    id: 3,
    name: 'Marcus Thorne',
    specialtyKey: 'neotraditional',
    image: '/images/artists/artist-3.png',
  },
];

export function About() {
  const t = useTranslations('About');

  return (
    <section id="artists" className="py-24 bg-black/90 border-t border-white/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-red-600 font-medium tracking-widest uppercase text-sm">{t('title')}</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase">{t('heading')}</h3>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="bg-zinc-950/60 border-zinc-800 overflow-hidden group hover:border-red-900/50 transition-colors">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h4 className="text-2xl font-heading font-bold text-white uppercase mb-1">{artist.name}</h4>
                    <p className="text-red-500 font-medium text-sm tracking-wide">
                      {t(`specialties.${artist.specialtyKey}`)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
