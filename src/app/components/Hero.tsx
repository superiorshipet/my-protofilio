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
import portraitImg from '../../imports/image.png';
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

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1.02fr_0.98fr] lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-4 py-2 text-sm text-[var(--space-moon)] backdrop-blur"
          >
            <Rocket className="h-4 w-4 text-[var(--space-cyan)]" />
            Building reliable products from backend orbit to polished interface
          </motion.div>

          <h1 className="font-display mb-6 min-h-[8.4rem] text-[clamp(3.1rem,8.6vw,7.4rem)] font-bold leading-[0.92] tracking-tight text-[var(--space-starlight)]">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              className="ml-2 inline-block h-[0.72em] w-2 translate-y-2 bg-[var(--space-cyan)]"
            />
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-8 text-[var(--space-moon)] md:text-xl">
            I am Mohamed Shipet, also known as Superior. I build scalable systems, practical web products, and clean user experiences with the kind of engineering that stays steady after launch.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {systemStats.map((stat) => (
              <div key={stat.label} className="space-glass rounded-xl px-4 py-3 border border-[var(--space-border)]">
                <div className="font-display text-2xl font-bold text-[var(--space-cyan)]">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.14em] text-[var(--space-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="mb-9 flex flex-wrap gap-4">
            <Button
              onClick={() => scrollToSection('projects')}
              className="h-auto rounded-full bg-[var(--space-button)] px-7 py-5 text-base font-semibold text-[var(--space-button-text)] shadow-[0_0_36px_rgba(100,244,255,0.24)] hover:bg-[var(--space-cyan)] hover:text-[var(--space-void)]"
            >
              Explore Projects
            </Button>
            <Button
              asChild
              className="h-auto rounded-full border-[var(--space-border)] bg-[var(--space-panel)] px-7 py-5 text-base text-[var(--space-starlight)] hover:bg-[var(--space-panel-strong)]"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Me
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-full border-[var(--space-border)] bg-transparent px-7 py-5 text-base text-[var(--space-starlight)] hover:bg-[var(--space-panel)]"
            >
              <a href={cvUrl} download>
                <Download className="mr-2 h-4 w-4" />
                CV
              </a>
            </Button>
          </div>

         
        </motion.div>

        {/* Full 3D Interactive Portrait Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="relative mx-auto flex w-full max-w-[440px] items-center justify-center py-4"
          style={{ perspective: 1200 }}
          onMouseMove={handlePortraitMouseMove}
          onMouseLeave={handlePortraitMouseLeave}
        >
          {/* Ambient Cosmic Aura Glow */}
          <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-[var(--space-violet)]/35 via-[var(--space-cyan)]/25 to-transparent blur-3xl pointer-events-none" />

          {/* 3D Tilting Hologram Card */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="group relative w-full aspect-[2/3] max-w-[340px] md:max-w-[370px] rounded-3xl p-3 border border-[var(--space-border)] bg-[var(--space-panel)] shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_30px_90px_rgba(100,244,255,0.25)] hover:border-[var(--space-cyan)]/60 cursor-pointer"
          >
            {/* The full photo in complete height */}
            <div
              className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e1738] via-[#060a1c] to-[#02030a] flex items-end justify-center"
              style={{ transform: 'translateZ(20px)' }}
            >
              {/* Subtle Cosmic Aura Halo behind portrait */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--space-cyan)]/20 blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[var(--space-violet)]/25 blur-2xl pointer-events-none" />

              <img
                src={portraitImg}
                alt="Mohamed Shipet (Superior)"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 relative z-10"
              />
              {/* Subtle gradient vignette for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--space-midnight)]/90 via-transparent to-transparent pointer-events-none z-20" />
              
              {/* Holographic Nameplate inside bottom of photo */}
              <div
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-md shadow-lg"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div>
                  <div className="font-display text-base font-bold text-white flex items-center gap-2">
                    Mohamed Shipet
                    <span className="rounded-full bg-[var(--space-cyan)]/20 border border-[var(--space-cyan)]/40 px-2 py-0.5 text-[10px] font-mono text-[var(--space-cyan)]">
                      Superior
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-300 font-medium mt-0.5">
                    Full Stack & Systems Engineer
                  </div>
                </div>
                <div className="flex h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
              </div>
            </div>

            {/* Floating Orbiting Tech Badges in 3D Space */}
            {techIcons.map(({ Icon, label, delay }, index) => {
              const positions = [
                { top: '-14px', right: '-14px' },
                { bottom: '20%', right: '-22px' },
                { top: '30%', left: '-22px' },
                { bottom: '-14px', left: '-14px' },
              ];
              const pos = positions[index] || {};
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{
                    opacity: { delay: 0.8 + delay, duration: 0.4 },
                    scale: { delay: 0.8 + delay, duration: 0.4 },
                    y: { delay: 1.2 + delay, duration: 2.8 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute z-30 pointer-events-none"
                  style={{
                    ...pos,
                    transform: 'translateZ(60px)',
                  }}
                >
                  <div className="space-glass flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--space-border)] bg-[var(--space-midnight)]/90 text-[var(--space-cyan)] shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md">
                    <Icon className="h-5 w-5" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
