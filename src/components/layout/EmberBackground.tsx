'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
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
  type: 'ember' | 'spark' | 'ash';
  life: number;
  maxLife: number;
}

export function EmberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => {
      const rand = Math.random();
      const x = Math.random() * canvas.width;
      const y = canvas.height + Math.random() * 200;

      if (rand < 0.15) {
        // Spark - bright, fast, short-lived
        return {
          x, y,
          size: Math.random() * 2 + 1,
          speedY: Math.random() * -3 - 2,
          speedX: (Math.random() - 0.5) * 3,
          opacity: Math.random() * 0.2 + 0.8,
          fadeSpeed: Math.random() * 0.008 + 0.004,
          color: 'rgba(255, 30, 30, ',
          pulse: 0,
          pulseSpeed: Math.random() * 0.15 + 0.1,
          type: 'spark',
          life: 0,
          maxLife: Math.random() * 60 + 40,
        };
      } else if (rand < 0.25) {
        // Ash - gray, slow, large, drifts
        return {
          x, y,
          size: Math.random() * 3 + 2,
          speedY: Math.random() * -0.8 - 0.2,
          speedX: (Math.random() - 0.5) * 1.5,
          opacity: Math.random() * 0.25 + 0.15,
          fadeSpeed: Math.random() * 0.001 + 0.0003,
          color: 'rgba(140, 80, 80, ',
          pulse: 0,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          type: 'ash',
          life: 0,
          maxLife: Math.random() * 200 + 150,
        };
      } else {
        // Ember - colored, glowing, main effect
        const colors = [
          'rgba(255, 20, 20, ',
          'rgba(255, 40, 0, ',
          'rgba(220, 0, 0, ',
          'rgba(255, 60, 30, ',
          'rgba(200, 0, 30, ',
        ];
        return {
          x, y,
          size: Math.random() * 5 + 2,
          speedY: Math.random() * -2.2 - 0.6,
          speedX: (Math.random() - 0.5) * 1.5,
          opacity: Math.random() * 0.3 + 0.7,
          fadeSpeed: Math.random() * 0.002 + 0.0005,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: 0,
          pulseSpeed: Math.random() * 0.08 + 0.04,
          type: 'ember',
          life: 0,
          maxLife: Math.random() * 300 + 200,
        };
      }
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(300, Math.floor((canvas.width * canvas.height) / 5000));
      for (let i = 0; i < count; i++) {
        const p = createParticle();
        p.y = Math.random() * canvas.height;
        p.life = Math.random() * p.maxLife;
        particles.push(p);
      }
    };

    const drawParticle = (p: Particle, drawOpacity: number) => {
      if (p.type === 'spark') {
        // Spark: intense white-yellow point with minimal glow
        ctx.save();
        ctx.globalAlpha = drawOpacity;
        ctx.fillStyle = `rgba(255, 80, 80, ${drawOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        // Small halo
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        grad.addColorStop(0, `rgba(255, 60, 60, ${drawOpacity * 0.3})`);
        grad.addColorStop(1, 'rgba(255, 60, 60, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (p.type === 'ash') {
        // Ash: soft gray drifting particle
        ctx.save();
        ctx.globalAlpha = drawOpacity * 0.6;
        ctx.fillStyle = `rgba(120, 60, 60, ${drawOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        // Ember: strong colored glow
        ctx.save();

        // Massive outer glow
        const outer = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 14
        );
        outer.addColorStop(0, p.color + (drawOpacity * 0.5) + ')');
        outer.addColorStop(0.2, p.color + (drawOpacity * 0.2) + ')');
        outer.addColorStop(1, p.color + '0)');
        ctx.fillStyle = outer;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 14, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        const inner = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 4
        );
        inner.addColorStop(0, p.color + (drawOpacity * 0.95) + ')');
        inner.addColorStop(1, p.color + '0)');
        ctx.fillStyle = inner;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Hot red core
        ctx.fillStyle = `rgba(255, 180, 180, ${drawOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Strong fire glow at bottom
      const fireGlow = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height, 0,
        canvas.width * 0.5, canvas.height, canvas.width * 0.9
      );
      fireGlow.addColorStop(0, 'rgba(140, 25, 5, 0.22)');
      fireGlow.addColorStop(0.3, 'rgba(80, 12, 5, 0.10)');
      fireGlow.addColorStop(0.6, 'rgba(30, 5, 5, 0.04)');
      fireGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = fireGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.006 + p.pulse) * 0.4;
        p.opacity -= p.fadeSpeed;
        p.pulse += p.pulseSpeed;
        p.life++;

        const pulseFactor = Math.sin(p.pulse) * (p.type === 'ember' ? 0.35 : 0.2);
        const lifeRatio = 1 - (p.life / p.maxLife);
        const drawOpacity = Math.max(0, Math.min(1, (p.opacity + pulseFactor) * lifeRatio));

        if (drawOpacity <= 0 || p.y < -80 || p.life >= p.maxLife) {
          Object.assign(p, createParticle());
        } else {
          drawParticle(p, drawOpacity);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    const handleResize = () => {
      resize();
      initParticles();
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
