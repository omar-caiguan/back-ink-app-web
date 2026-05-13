'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Placeholder images since generation limit reached
const portfolioItems = [
  { id: 1, title: 'Black & Grey Realism', image: '/images/hero-bg-2.png' }, // Reusing hero for demo
  { id: 2, title: 'Japanese Dragon', image: '/images/artists/artist-1.png' },
  { id: 3, title: 'Geometric Wolf', image: '/images/artists/artist-2.png' },
  { id: 4, title: 'Watercolor Flower', image: '/images/artists/artist-3.png' },
  { id: 5, title: 'Neo Traditional', image: '/images/hero-bg.png' },
  { id: 6, title: 'Fine Line', image: '/images/artists/artist-2.png' },
  { id: 7, title: 'Portrait', image: '/images/artists/artist-1.png' },
  { id: 8, title: 'Abstract', image: '/images/hero-bg-2.png' },
];

export function Portfolio() {
  const t = useTranslations('Portfolio');

  return (
    <section id="gallery" className="py-24 bg-black/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-red-600 font-medium tracking-widest uppercase text-sm mb-4">{t('title')}</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase">{t('heading')}</h3>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {portfolioItems.map((item, index) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="bg-transparent border-0 overflow-hidden">
                    <CardContent className="flex aspect-[4/5] items-center justify-center p-0 relative group">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-heading font-bold uppercase tracking-wider border border-white/30 px-4 py-2 bg-black/40 backdrop-blur-sm">
                          {item.title}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-black/50 border-white/20 text-white hover:bg-red-600 hover:border-red-600" />
          <CarouselNext className="bg-black/50 border-white/20 text-white hover:bg-red-600 hover:border-red-600" />
        </Carousel>
      </div>
    </section>
  );
}
