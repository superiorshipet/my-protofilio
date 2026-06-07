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
    <div className="min-h-screen bg-[#0F172A]" id="home">
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
  );
}
