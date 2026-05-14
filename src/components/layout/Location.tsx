'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.697529458983!2d-70.6482672!3d-33.4372562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a08332155f%3A0xe54d241c6d36e2f6!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1sen!2scl!4v1715000000000!5m2!1sen!2scl';

export function Location() {
  const t = useTranslations('Location');

  return (
    <section
      id="location"
      className="relative overflow-hidden border-t border-b border-white/10 bg-black/90"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,0,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_30%)] pointer-events-none" />
      <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 text-red-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]">
              <MapPin className="h-4 w-4" />
              {t('visitUs')}
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">{t('studioTitle')}</h3>
            <p className="text-zinc-400 leading-relaxed">
              {t('studioDescription')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <InfoRow icon={<MapPin className="h-4 w-4" />} label={t('address')} value="Santiago, Región Metropolitana" />
              <InfoRow icon={<Phone className="h-4 w-4" />} label={t('phone')} value="+56 9 3057 9869" href="tel:+56930579869" />
              <InfoRow icon={<Mail className="h-4 w-4" />} label={t('email')} value="omar.caiguan@gmail.com" href="mailto:omar.caiguan@gmail.com" />
              <InfoRow icon={<MessageCircle className="h-4 w-4" />} label={t('whatsapp')} value="+56 9 3057 9869" href="https://wa.me/56930579869" />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-zinc-300">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 hover:border-red-500 hover:text-white transition"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 hover:border-red-500 hover:text-white transition"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
              <a
                href="https://wa.me/56930579869"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 hover:border-red-500 hover:text-white transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col gap-2 text-sm text-zinc-300">
              <p className="font-semibold text-white">{t('hours')}</p>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-zinc-400">{t('monFri')}</span>
                <span className="text-white text-right">10:00 - 20:00</span>
                <span className="text-zinc-400">{t('saturday')}</span>
                <span className="text-white text-right">11:00 - 18:00</span>
                <span className="text-zinc-400">{t('sunday')}</span>
                <span className="text-white text-right">{t('byAppointment')}</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-black/50 pointer-events-none" />
            <iframe
              title={t('mapTitle')}
              src={MAP_SRC}
              className="w-full h-[420px] sm:h-[520px] grayscale hover:grayscale-0 transition duration-500"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_100%)]" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/70 backdrop-blur rounded-xl border border-white/10 px-4 py-3 text-sm text-white">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white font-semibold">BI</span>
                <div>
                  <p className="font-semibold">{t('visitOurStudio')}</p>
                  <p className="text-xs text-zinc-300">{t('santiagoChile')}</p>
                </div>
              </div>
              <a
                href="https://maps.google.com?q=Santiago"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-red-300 hover:text-white transition"
              >
                {t('viewMap')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
};

function InfoRow({ icon, label, value, href }: InfoRowProps) {
  const content = (
    <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
      <div className="mt-0.5 text-red-300">{icon}</div>
      <div className="space-y-0.5">
        <p className="text-xs uppercase tracking-[0.08em] text-zinc-400">{label}</p>
        <p className="text-sm text-white">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block hover:border-red-500/60 hover:bg-red-600/5 transition">
        {content}
      </a>
    );
  }

  return content;
}
