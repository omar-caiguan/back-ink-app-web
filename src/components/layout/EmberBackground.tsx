'use client';

import React, { useEffect, useRef } from 'react';

interface Ember {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

export function EmberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let embers: Ember[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createEmber = (): Ember => {
      const colors = [
        'rgba(255, 60, 0, ',    // rojo intenso
        'rgba(255, 120, 0, ',   // naranja fuego
        'rgba(255, 200, 50, ', // dorado brillante
        'rgba(220, 30, 30, ',  // carmesí
        'rgba(255, 80, 50, ',  // rojo coral
      ];
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 150,
        size: Math.random() * 4 + 1.5,
        speedY: Math.random() * -1.8 - 0.5,
        speedX: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.5 + 0.5,
        fadeSpeed: Math.random() * 0.002 + 0.0005,
        color: colorBase,
        pulse: 0,
        pulseSpeed: Math.random() * 0.08 + 0.03,
      };
    };

    const initEmbers = () => {
      embers = [];
      const count = Math.min(180, Math.floor((canvas.width * canvas.height) / 8000));
      for (let i = 0; i < count; i++) {
        const ember = createEmber();
        ember.y = Math.random() * canvas.height;
        embers.push(ember);
      }
    };

    const drawEmber = (ember: Ember, drawOpacity: number) => {
      ctx.save();

      // Glow externo grande y difuso
      const outerGradient = ctx.createRadialGradient(
        ember.x, ember.y, 0,
        ember.x, ember.y, ember.size * 8
      );
      outerGradient.addColorStop(0, ember.color + (drawOpacity * 0.4) + ')');
      outerGradient.addColorStop(0.3, ember.color + (drawOpacity * 0.15) + ')');
      outerGradient.addColorStop(1, ember.color + '0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = outerGradient;
      ctx.beginPath();
      ctx.arc(ember.x, ember.y, ember.size * 8, 0, Math.PI * 2);
      ctx.fill();

      // Glow medio
      const midGradient = ctx.createRadialGradient(
        ember.x, ember.y, 0,
        ember.x, ember.y, ember.size * 3
      );
      midGradient.addColorStop(0, ember.color + (drawOpacity * 0.9) + ')');
      midGradient.addColorStop(1, ember.color + '0)');
      ctx.fillStyle = midGradient;
      ctx.beginPath();
      ctx.arc(ember.x, ember.y, ember.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Núcleo brillante blanco-anaranjado
      ctx.fillStyle = `rgba(255, 240, 200, ${drawOpacity})`;
      ctx.beginPath();
      ctx.arc(ember.x, ember.y, ember.size * 0.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Resplandor de fogata en la base - más intenso
      const bgGradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height, 0,
        canvas.width * 0.5, canvas.height, canvas.width * 0.8
      );
      bgGradient.addColorStop(0, 'rgba(120, 20, 5, 0.15)');
      bgGradient.addColorStop(0.4, 'rgba(60, 10, 5, 0.06)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      embers.forEach((ember) => {
        ember.y += ember.speedY;
        ember.x += ember.speedX + Math.sin(ember.y * 0.008) * 0.5;
        ember.opacity -= ember.fadeSpeed;
        ember.pulse += ember.pulseSpeed;

        // Parpadeo intenso tipo brasa real
        const pulseFactor = Math.sin(ember.pulse) * 0.25;
        const drawOpacity = Math.max(0, Math.min(1, ember.opacity + pulseFactor));

        if (ember.opacity <= 0 || ember.y < -50) {
          const newEmber = createEmber();
          Object.assign(ember, newEmber);
        } else {
          drawEmber(ember, drawOpacity);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    initEmbers();
    animate();

    const handleResize = () => {
      resize();
      initEmbers();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
