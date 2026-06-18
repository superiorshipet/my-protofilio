import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Statistics } from './components/Statistics';
import { DevThoughts } from './components/DevThoughts';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="space-scene space-stars relative min-h-screen overflow-hidden text-[var(--space-starlight)]" id="home">
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Statistics />
        <DevThoughts />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
