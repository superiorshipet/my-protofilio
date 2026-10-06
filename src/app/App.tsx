import { lazy, Suspense } from 'react';
import { Navigation } from './components/Navigation';
import { AnimatedSpaceBackground } from './components/AnimatedSpaceBackground';
import { Hero } from './components/Hero';

// Below-the-fold sections are split into their own chunks so the hero paints
// before the rest of the JavaScript is downloaded and parsed (big win on mobile).
const AboutBento = lazy(() => import('./components/AboutBento').then((m) => ({ default: m.AboutBento })));
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })));
const Experience = lazy(() => import('./components/Experience').then((m) => ({ default: m.Experience })));
const Skills = lazy(() => import('./components/Skills').then((m) => ({ default: m.Skills })));
const Statistics = lazy(() => import('./components/Statistics').then((m) => ({ default: m.Statistics })));
const DevThoughts = lazy(() => import('./components/DevThoughts').then((m) => ({ default: m.DevThoughts })));
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));
const FloatingActions = lazy(() => import('./components/FloatingActions').then((m) => ({ default: m.FloatingActions })));
const ProjectAdvisorBot = lazy(() => import('./components/ProjectAdvisorBot').then((m) => ({ default: m.ProjectAdvisorBot })));

const Lazy = ({ children }: { children: React.ReactNode }) => <Suspense fallback={null}>{children}</Suspense>;

export default function App() {
  return (
    <div className="space-scene space-stars relative min-h-screen overflow-hidden text-[var(--space-starlight)]" id="home">
      <AnimatedSpaceBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Lazy><AboutBento /></Lazy>
        <Lazy><Projects /></Lazy>
        <Lazy><Experience /></Lazy>
        <Lazy><Skills /></Lazy>
        <Lazy><Statistics /></Lazy>
        <Lazy><DevThoughts /></Lazy>
        <Lazy><Contact /></Lazy>
        <Lazy><Footer /></Lazy>
        <Lazy><FloatingActions /></Lazy>
        <Lazy><ProjectAdvisorBot /></Lazy>
      </div>
    </div>
  );
}
