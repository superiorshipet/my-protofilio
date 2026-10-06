import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { AnimatedSpaceBackground } from './components/AnimatedSpaceBackground';
import { Hero } from './components/Hero';

// Below-the-fold sections are split and only loaded when approaching viewport on mobile/desktop
const AboutBento = lazy(() => import('./components/AboutBento').then((m) => ({ default: m.AboutBento })));
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })));
const Experience = lazy(() => import('./components/Experience').then((m) => ({ default: m.Experience })));
const Skills = lazy(() => import('./components/Skills').then((m) => ({ default: m.Skills })));
const Statistics = lazy(() => import('./components/Statistics').then((m) => ({ default: m.Statistics })));
const DevThoughts = lazy(() => import('./components/DevThoughts').then((m) => ({ default: m.DevThoughts })));
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));
import { FloatingActions } from './components/FloatingActions';
import { ProjectAdvisorBot } from './components/ProjectAdvisorBot';

function LazySection({
  children,
  rootMargin = '400px',
  minHeight = '300px',
  className = '',
}: {
  children: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight: inView ? undefined : minHeight }}>
      {inView ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}

export default function App() {
  return (
    <div className="space-scene space-stars relative min-h-screen overflow-hidden text-[var(--space-starlight)]" id="home">
      <AnimatedSpaceBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <LazySection minHeight="450px"><AboutBento /></LazySection>
        <LazySection minHeight="600px" className="mobile-content-visibility"><Projects /></LazySection>
        <LazySection minHeight="500px" className="mobile-content-visibility"><Experience /></LazySection>
        <LazySection minHeight="400px" className="mobile-content-visibility"><Skills /></LazySection>
        <LazySection minHeight="300px"><Statistics /></LazySection>
        <LazySection minHeight="300px"><DevThoughts /></LazySection>
        <LazySection minHeight="450px"><Contact /></LazySection>
        <LazySection minHeight="100px"><Footer /></LazySection>
        <FloatingActions />
        <ProjectAdvisorBot />
      </div>
    </div>
  );
}
