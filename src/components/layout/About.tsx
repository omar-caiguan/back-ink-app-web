'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Artist {
  id: number;
  name: string;
  specialtyKey: string;
  image: string;
  portfolioFolder: string;
  portfolioImages: string[];
}

const artists: Artist[] = [
  {
    id: 1,
    name: 'Alex "Ink" Ryker',
    specialtyKey: 'realism',
    image: '/images/artists/artist-1.png',
    portfolioFolder: '/images/alex',
    portfolioImages: [
      'alex-01.png',
      'alex-02.jpg',
      'alex-03.jpg',
      'alex-04.jpg',
      'alex-05.jpg',
      'alex-06.jpg',
      'alex-07.jpg',
    ],
  },
  {
    id: 2,
    name: 'Elena Vance',
    specialtyKey: 'traditional',
    image: '/images/artists/artist-2.png',
    portfolioFolder: '/images/elena',
    portfolioImages: [
      'elena-01.jpg',
      'elena-02.jpg',
      'elena-03.jpg',
      'elena-04.jpg',
      'elena-05.jpg',
      'elena-06.jpg',
      'elena-07.jpg',
    ],
  },
  {
    id: 3,
    name: 'Marcus Thorne',
    specialtyKey: 'neotraditional',
    image: '/images/artists/artist-3.png',
    portfolioFolder: '/images/marcus',
    portfolioImages: [
      'marcus-01.jpg',
      'marcus-02.jpg',
      'marcus-03.jpg',
      'marcus-04.jpg',
      'marcus-05.jpg',
      'marcus-06.jpg',
      'marcus-07.jpg',
    ],
  },
];

function PortfolioModal({
  artist,
  isOpen,
  onClose,
}: {
  artist: Artist | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    if (!artist) return;
    setCurrentIndex((prev) => (prev + 1) % artist.portfolioImages.length);
  }, [artist]);

  const goPrev = useCallback(() => {
    if (!artist) return;
    setCurrentIndex(
      (prev) =>
        (prev - 1 + artist.portfolioImages.length) % artist.portfolioImages.length
    );
  }, [artist]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen || !artist) return null;

  const currentImage = `${artist.portfolioFolder}/${artist.portfolioImages[currentIndex]}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/95 backdrop-blur-sm overflow-y-auto py-4 md:py-8"
          onClick={onClose}
        >
          <div
            className="relative w-full max-w-5xl mx-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="sticky top-0 self-end text-white/70 hover:text-white transition-colors p-2 z-10 cursor-pointer"
              aria-label="Close"
            >
              <X size={28} />
            </button>

            {/* Image container */}
            <div className="relative w-full h-[50dvh] md:h-[60dvh] bg-black rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage}
                    alt={`${artist.name} - ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={goPrev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Counter */}
            <div className="mt-3 flex items-center justify-center gap-2 text-white/70 text-sm">
              <span className="font-medium text-white">{currentIndex + 1}</span>
              <span>/</span>
              <span>{artist.portfolioImages.length}</span>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 flex gap-2 overflow-x-auto px-2 pb-4 max-w-full">
              {artist.portfolioImages.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-md overflow-hidden border-2 transition-colors cursor-pointer ${
                    idx === currentIndex
                      ? 'border-red-600'
                      : 'border-transparent hover:border-white/30'
                  }`}
                >
                  <Image
                    src={`${artist.portfolioFolder}/${img}`}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function About() {
  const t = useTranslations('About');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPortfolio = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const closePortfolio = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArtist(null), 300);
  };

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
              <Card className="bg-black border-zinc-800 overflow-hidden group hover:border-red-900/50 transition-colors p-0 gap-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h4 className="text-2xl font-heading font-bold text-white uppercase mb-1">{artist.name}</h4>
                    <p className="text-red-500 font-medium text-sm tracking-wide">
                      {t(`specialties.${artist.specialtyKey}`)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openPortfolio(artist)}
                  className="w-full py-4 bg-zinc-950 text-white font-medium tracking-wide uppercase text-sm border-t border-zinc-800 hover:bg-red-900 hover:border-red-900 transition-colors cursor-pointer"
                >
                  {t('viewPortfolio')}
                </button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <PortfolioModal
        artist={selectedArtist}
        isOpen={isModalOpen}
        onClose={closePortfolio}
      />
    </section>
  );
}
