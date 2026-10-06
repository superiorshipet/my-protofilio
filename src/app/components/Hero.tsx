import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Activity,
  Cloud,
  Code2,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { Button } from './ui/button';
import { SpaceshipTeleporter } from './SpaceshipTeleporter';
import cvFile from '../../imports/Mohamed-Shipet-CV.pdf';

const cvUrl = cvFile;
const whatsappUrl = 'https://wa.me/+201285544547?text=Hi%20Mohamed%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20connect.';

const techIcons = [
  { Icon: Code2, label: 'Frontend', delay: 0 }, 
  { Icon: Database, label: 'Data', delay: 0.2 },
  { Icon: Cloud, label: 'Cloud', delay: 0.4 },
  { Icon: Terminal, label: 'Backend', delay: 0.6 },
];

const systemStats = [
  { value: '16+', label: 'Products & Systems' },
  { value: '5+', label: 'Backend & Cloud Stacks' },
  { value: '100%', label: 'Clean Code & Dedication' },
];

const typingSequence = [
  { text: 'Full-stack Engineer.', pauseAfter: 900 },
  { text: 'Backend Systems Architect.', pauseAfter: 900 },
  { text: 'Scalable Product Engineer.', pauseAfter: 900 },
  { text: 'Building Resilient Software.', pauseAfter: 1100 },
];

const starTrails = Array.from({ length: 9 }, (_, index) => ({
  top: `${10 + index * 9}%`,
  left: `${(index * 17) % 92}%`,
  delay: index * 0.45,
  width: 42 + (index % 3) * 24,
}));

export function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-14deg', '14deg']);

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mousePosFromCenterX = (e.clientX - rect.left) / width - 0.5;
    const mousePosFromCenterY = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(mousePosFromCenterX);
    mouseY.set(mousePosFromCenterY);
  };

  const handlePortraitMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handlePortraitTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const mousePosFromCenterX = (touch.clientX - rect.left) / rect.width - 0.5;
      const mousePosFromCenterY = (touch.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(mousePosFromCenterX);
      mouseY.set(mousePosFromCenterY);
    }
  };

  const handlePortraitTouchEnd = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const currentPhrase = typingSequence[currentSequenceIndex];

    if (isTyping) {
      if (displayText.length < currentPhrase.text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.text.slice(0, displayText.length + 1));
        }, 70);
        return () => clearTimeout(timeout);
      }

      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, currentPhrase.pauseAfter);
      return () => clearTimeout(timeout);
    }

    if (displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 42);
      return () => clearTimeout(timeout);
    }

    setCurrentSequenceIndex((currentSequenceIndex + 1) % typingSequence.length);
    setIsTyping(true);
  }, [displayText, currentSequenceIndex, isTyping]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-[8%] top-[18%] h-56 w-56 rounded-full bg-[var(--space-violet)]/20 blur-3xl"
          animate={{ scale: [1, 1.18, 1], opacity: [0.38, 0.62, 0.38] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[12%] right-[10%] h-72 w-72 rounded-full bg-[var(--space-cyan)]/14 blur-3xl"
          animate={{ scale: [1.08, 0.92, 1.08], opacity: [0.28, 0.48, 0.28] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        {starTrails.map((trail) => (
          <motion.div
            key={`${trail.top}-${trail.left}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-[var(--space-starlight)]/65 to-transparent"
            style={{ top: trail.top, left: trail.left, width: trail.width }}
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 180, opacity: [0, 0.75, 0] }}
            transition={{ duration: 3.8, delay: trail.delay, repeat: Infinity, repeatDelay: 4, ease: 'easeOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 sm:gap-12 px-4 sm:px-6 pb-12 sm:pb-16 pt-24 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="max-w-3xl w-full min-w-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5 sm:mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-[var(--space-moon)] backdrop-blur max-w-full"
          >
            <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--space-cyan)] shrink-0" />
            <span className="truncate">Building reliable products from backend orbit to polished interface</span>
          </motion.div>

          <h1 className="font-display mb-5 sm:mb-6 min-h-[3.8rem] sm:min-h-[5.5rem] lg:min-h-[7.2rem] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-[var(--space-starlight)]">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              className="ml-2 inline-block h-[0.72em] w-1.5 sm:w-2 translate-y-1 sm:translate-y-2 bg-[var(--space-cyan)]"
            />
          </h1>

          <p className="mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--space-moon)] md:text-xl">
            I am Mohamed Shipet, also known as Superior. I build scalable systems, practical web products, and clean user experiences with the kind of engineering that stays steady after launch.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-7 sm:mb-8 grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl w-full"
          >
            {systemStats.map((stat) => (
              <div key={stat.label} className="space-glass rounded-xl p-2 sm:p-3.5 border border-[var(--space-border)] text-center sm:text-left min-w-0">
                <div className="font-display text-lg sm:text-2xl font-bold text-[var(--space-cyan)] truncate">{stat.value}</div>
                <div className="text-[9px] sm:text-xs uppercase tracking-wider text-[var(--space-muted)] mt-0.5 truncate">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="mb-6 sm:mb-9 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Button
              onClick={() => scrollToSection('projects')}
              className="h-auto w-full sm:w-auto rounded-full bg-[var(--space-button)] px-7 py-3.5 sm:py-5 text-sm sm:text-base font-semibold text-[var(--space-button-text)] shadow-[0_0_36px_rgba(100,244,255,0.24)] hover:bg-[var(--space-cyan)] hover:text-[var(--space-void)] transition-all"
            >
              Explore Projects
            </Button>
            <div className="flex gap-2.5 w-full sm:w-auto">
              <Button
                asChild
                className="h-auto flex-1 sm:flex-none rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-5 sm:px-7 py-3 sm:py-5 text-sm sm:text-base text-[var(--space-starlight)] hover:bg-[var(--space-panel-strong)]"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto flex-1 sm:flex-none rounded-full border border-[var(--space-border)] bg-transparent px-5 sm:px-7 py-3 sm:py-5 text-sm sm:text-base text-[var(--space-starlight)] hover:bg-[var(--space-panel)]"
              >
                <a href={cvUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  CV
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Frameless 3D Holographic Character Presence */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="relative mx-auto flex w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] flex-col items-center justify-center py-2 sm:py-4"
          style={{ perspective: 1200 }}
          onMouseMove={handlePortraitMouseMove}
          onMouseLeave={handlePortraitMouseLeave}
          onTouchMove={handlePortraitTouchMove}
          onTouchEnd={handlePortraitTouchEnd}
        >
          {/* Luminous Cosmic Energy Portal Halo behind portrait */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-[var(--space-cyan)]/25 via-[var(--space-violet)]/20 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[var(--space-cyan)]/15 blur-2xl pointer-events-none" />

          {/* 3D Tilting Character Container with Floating Hover */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative flex flex-col items-center justify-center cursor-pointer select-none"
          >
            <SpaceshipTeleporter techIcons={techIcons} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
