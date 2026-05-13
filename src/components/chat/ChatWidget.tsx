'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Loader2, X, ExternalLink, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CHAT_BASE_URL = process.env.NEXT_PUBLIC_CHAT_URL ?? 'http://localhost:3001';
const CHAT_EMBED_URL = `${CHAT_BASE_URL.replace(/\/$/, '')}/embed`;

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="pointer-events-auto w-[360px] sm:w-[420px] h-[520px] max-h-[80vh] rounded-3xl border border-white/10 bg-black/90 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden flex flex-col">
          <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-red-700/50 via-transparent to-white/20 blur-[26px] opacity-40 pointer-events-none" />

          <div className="relative flex items-center justify-between px-4 pt-4 text-white">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl overflow-hidden shadow-lg shadow-red-900/40 ring-2 ring-red-600/50">
                <Image src="/icon/blackink.PNG" alt="Black Ink" width={44} height={44} className="h-full w-full object-contain bg-black" />
              </div>
              <div className="leading-tight">
                <p className="font-semibold">Black Ink Assistant</p>
                <p className="text-[11px] text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={CHAT_BASE_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir chat en nueva pestaña"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-white/10 hover:text-white h-10 w-10 text-zinc-300"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white hover:bg-white/10"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative flex-1 bg-gradient-to-b from-black via-zinc-950 to-black pt-2 pb-3 px-3">
            <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
              {[
                'Recomendación de artista',
                'Cita y disponibilidad',
                'Cuidados post tattoo',
                'Presupuesto y estilos',
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 flex items-center gap-2 shadow-sm shadow-black/30 hover:border-red-500/60 hover:text-white transition"
                >
                  <Sparkles className="h-3.5 w-3.5 text-red-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            {!isLoaded && (
              <div className="absolute inset-0 grid place-items-center text-sm text-zinc-400">
                <div className="flex items-center gap-2 bg-black/70 px-3 py-2 rounded-full border border-white/5 shadow-inner">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Conectando con el asistente...
                </div>
              </div>
            )}
            <iframe
              title="Black Ink Assistant"
              src={CHAT_EMBED_URL}
              className="w-full h-full border-0 rounded-2xl overflow-hidden shadow-inner shadow-black/40"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        </div>
      )}

      <Button
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Ocultar asistente' : 'Abrir asistente'}
        className="pointer-events-auto h-16 w-16 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] ring-4 ring-red-500/30 animate-[pulse_2s_ease-in-out_infinite]"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    </div>
  );
}
