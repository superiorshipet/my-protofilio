import { Navigation } from './components/Navigation';
import { AnimatedSpaceBackground } from './components/AnimatedSpaceBackground';
import { Hero } from './components/Hero';
import { AboutBento } from './components/AboutBento';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Statistics } from './components/Statistics';
import { DevThoughts } from './components/DevThoughts';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ProjectAdvisorBot } from './components/ProjectAdvisorBot';

export default function App() {
  return (
    <div className="space-scene space-stars relative min-h-screen overflow-hidden text-[var(--space-starlight)]" id="home">
      <AnimatedSpaceBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <AboutBento />
        <Projects />
        <Experience />
        <Skills />
        <Statistics />
        <DevThoughts />
        <Contact />
        <Footer />
        <FloatingActions />
        <ProjectAdvisorBot />
      </div>
    </div>
  );
}
