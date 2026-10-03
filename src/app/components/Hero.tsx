import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import portraitImg from '../../imports/image.png';
import cvFile from '../../imports/Mohamed-Shipet-CV.pdf';

const cvUrl = cvFile;
const whatsappUrl = 'https://wa.me/+201285544547?text=Hi%20Mohamed%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20connect.';

const typingSequence = [
  { text: 'Full-stack Engineer.', pauseAfter: 900 },
  { text: 'Backend Systems Builder.', pauseAfter: 900 },
  { text: 'Scalable Product Engineer.', pauseAfter: 900 },
  { text: 'I Build Useful tools.', pauseAfter: 1100 },
];

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
    <section className="relative min-h-screen overflow-hidden border-b border-[var(--space-border)]">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-10 pt-32 md:pb-16 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mb-10 flex items-center justify-between gap-6"
        >
          <span className="section-kicker">Independent full-stack engineer</span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.16em] text-[var(--space-muted)] md:block">Egypt · Available worldwide</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: 'easeOut' }}
          className="font-display max-w-6xl text-[clamp(3.8rem,10vw,9.7rem)] font-semibold leading-[0.82] text-[var(--space-starlight)]"
        >
          Digital products,
          <span className="block text-[var(--space-muted)]">built to hold up.</span>
        </motion.h1>

        <div className="mt-12 grid flex-1 items-end gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="pb-4"
          >
            <div className="mb-6 flex min-h-7 items-center font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--space-cyan)]">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="ml-2 inline-block h-4 w-px bg-[var(--space-cyan)]"
              />
            </div>
            <p className="mb-8 max-w-xl text-lg leading-8 text-[var(--space-moon)]">
              I am Mohamed Shipet, also known as Superior. I engineer scalable backend systems and polished web products that stay fast, clear, and reliable after launch.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
            <Button
              onClick={() => scrollToSection('projects')}
              className="h-auto rounded-full bg-[var(--space-button)] px-6 py-4 text-sm font-semibold text-[var(--space-button-text)] hover:bg-[var(--space-cyan)] hover:text-white"
            >
              Explore Projects
              <ArrowDownRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              asChild
              className="h-auto rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-6 py-4 text-sm text-[var(--space-starlight)] hover:bg-[var(--space-panel-strong)]"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Me
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-full border-[var(--space-border)] bg-transparent px-6 py-4 text-sm text-[var(--space-starlight)] hover:bg-[var(--space-panel)]"
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
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: 'easeOut' }}
            className="editorial-surface relative min-h-[28rem] overflow-hidden rounded-[2.25rem] p-4 md:min-h-[34rem]"
          >
            <div className="absolute inset-x-4 top-4 flex items-center justify-between rounded-[1.4rem] bg-[var(--space-button)] px-5 py-4 text-[var(--space-button-text)]">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em]">Object / 01</span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em]">Engineer + Builder</span>
            </div>
            <img
              src={portraitImg}
              alt="Mohamed Shipet"
              className="absolute inset-x-[16%] bottom-0 h-[76%] w-[68%] rounded-t-[12rem] object-cover object-[center_28%] grayscale transition duration-700 hover:grayscale-0"
            />
            <div className="absolute bottom-5 left-5 rounded-full bg-[var(--space-panel-strong)] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--space-starlight)] shadow-lg">
              Intent, given form.
            </div>
            <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel-strong)] text-2xl text-[var(--space-cyan)] shadow-lg">
              ✦
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
