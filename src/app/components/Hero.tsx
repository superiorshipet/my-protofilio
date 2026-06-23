import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Cloud, Code2, Database, Download, Github, Linkedin, Mail, MessageCircle, Rocket, Terminal } from 'lucide-react';
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

const typingSequence = [
  { text: 'Full-stack Engineer.', pauseAfter: 900 },
  { text: 'Backend Systems Builder.', pauseAfter: 900 },
  { text: 'Scalable Product Engineer.', pauseAfter: 900 },
  { text: 'I Build Useful tools.', pauseAfter: 1100 },
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

          <p className="mb-9 max-w-2xl text-lg leading-8 text-[var(--space-moon)] md:text-xl">
            I am Mohamed Shipet, also known as Superior. I build scalable systems, practical web products, and clean user experiences with the kind of engineering that stays steady after launch.
          </p>

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

          <div className="flex gap-5">
            {[
              { href: 'https://github.com/superiorshipet', Icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/mohamed-shipet-700864266/', Icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:mohmedshipet4@gmail.com', Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-[var(--space-muted)] transition-colors hover:text-[var(--space-cyan)]"
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="relative mx-auto flex aspect-square w-[min(33rem,88vw)] items-center justify-center"
        >
          <motion.div
            className="space-orbit absolute inset-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="space-orbit absolute inset-12 border-dashed"
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-[18%] rounded-full bg-[var(--space-cyan)]/12 blur-3xl" />

          <div className="relative h-[68%] w-[68%] overflow-hidden rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] p-2 shadow-[0_0_90px_rgba(141,92,255,0.28)] backdrop-blur">
            <img
              src={portraitImg}
              alt="Mohamed Shipet"
              className="h-full w-full rounded-full object-cover object-[center_35%]"
            />
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[var(--space-violet)]/30 via-transparent to-[var(--space-cyan)]/24" />
          </div>

          {techIcons.map(({ Icon, label, delay }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 0.8 + delay, duration: 0.4 },
                scale: { delay: 0.8 + delay, duration: 0.4 },
                y: { delay: 1.2 + delay, duration: 2.6 + index * 0.2, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute"
              style={{
                top: `${Math.sin((index * Math.PI) / 2) * 43 + 49}%`,
                left: `${Math.cos((index * Math.PI) / 2) * 43 + 49}%`,
              }}
            >
              <div className="space-glass flex h-14 w-14 items-center justify-center rounded-full">
                <Icon className="h-5 w-5 text-[var(--space-cyan)]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
