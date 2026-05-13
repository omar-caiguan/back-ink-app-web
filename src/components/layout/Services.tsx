'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const serviceKeys = ['custom', 'coverup', 'realism', 'consultation'];

export function Services() {
  const t = useTranslations('Services');

  return (
    <section id="services" className="py-24 bg-zinc-950/80">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-red-600/50 transition-colors h-full flex flex-col justify-between">
                <CardHeader>
                  <h4 className="text-xl font-heading font-bold text-white uppercase">{t(`items.${key}.title`)}</h4>
                  <p className="text-red-500 font-medium text-lg">{t(`items.${key}.price`)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400 text-sm mb-6">{t(`items.${key}.description`)}</p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center justify-center rounded-md text-sm transition-colors h-10 py-2 px-4 w-full bg-white text-black hover:bg-red-600 hover:text-white font-semibold tracking-wide cursor-pointer"
                  >
                    {t('book')}
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
