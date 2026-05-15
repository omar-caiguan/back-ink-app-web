import * as React from 'react';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  // opts can be any object accepted by embla-carousel-react; using any to avoid type import issues
  opts?: any;
  className?: string;
  children: React.ReactNode;
}

export function Carousel({ opts, className, children, ...props }: CarouselProps) {
  const [emblaRef] = useEmblaCarousel(opts);
  return (
    <div ref={emblaRef} className={cn('overflow-hidden relative', className)} {...props}>
      {children}
    </div>
  );
}

export interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function CarouselContent({ className, children, ...props }: CarouselContentProps) {
  return (
    <div className={cn('flex', className)} {...props}>
      {children}
    </div>
  );
}

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function CarouselItem({ className, children, ...props }: CarouselItemProps) {
  return (
    <div className={cn('flex-[0_0_100%] pl-4', className)} {...props}>
      {children}
    </div>
  );
}

export interface CarouselNavigationProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function CarouselPrevious({ className, ...props }: CarouselNavigationProps) {
  return (
    <button
      className={cn(
        'absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-red-700',
        className
      )}
      {...props}
    >
      <ArrowLeft size={20} />
    </button>
  );
}

export function CarouselNext({ className, ...props }: CarouselNavigationProps) {
  return (
    <button
      className={cn(
        'absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-red-700',
        className
      )}
      {...props}
    >
      <ArrowRight size={20} />
    </button>
  );
}

export default Carousel;
