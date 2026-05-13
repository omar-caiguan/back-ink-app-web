import { Navigation } from '@/components/layout/Navigation';
import { Hero } from '@/components/layout/Hero';
import { About } from '@/components/layout/About';
import { Services } from '@/components/layout/Services';
import { Portfolio } from '@/components/layout/Portfolio';
import { Location } from '@/components/layout/Location';
import { FAQ } from '@/components/layout/FAQ';
import { Contact } from '@/components/layout/Contact';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { EmberBackground } from '@/components/layout/EmberBackground';

export default function Home() {
  return (
    <>
      <EmberBackground />
      <main className="relative z-10 min-h-screen bg-transparent text-white selection:bg-red-900 selection:text-white">
        <Navigation />
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Location />
        <FAQ />
        <Contact />
        <Footer />
        <ChatWidget />
      </main>
    </>
  );
}
