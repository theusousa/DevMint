import { Gate } from './gate/Gate.jsx';
import { Background } from './components/Background.jsx';
import { Spotlight } from './components/Spotlight.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { Marquee } from './components/Marquee.jsx';
import { Stats } from './components/Stats.jsx';
import { Services } from './components/Services.jsx';
import { Process } from './components/Process.jsx';
import { Portfolio } from './components/Portfolio.jsx';
import { Testimonials } from './components/Testimonials.jsx';
import { Contact } from './components/Contact.jsx';
import { CTA } from './components/CTA.jsx';
import { Footer } from './components/Footer.jsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.jsx';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Background />
      <Spotlight />
      <Gate />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Stats />
          <Services />
          <Process />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
        <CTA />
        <Footer />
      </div>
      <FloatingWhatsApp />
    </div>
  );
}
