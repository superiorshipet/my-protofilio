import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Code2, Database, Cloud, Terminal } from 'lucide-react';
import { Button } from './ui/button';
import portraitImg from '../../imports/image.png';

const techIcons = [
  { Icon: Code2, delay: 0 },
  { Icon: Database, delay: 0.2 },
  { Icon: Cloud, delay: 0.4 },
  { Icon: Terminal, delay: 0.6 },
];

const typingSequence = [
  { text: "Hello World", pauseAfter: 1000 },
  { text: "I'm Superior.", pauseAfter: 800 },
  { text: "Software Engineer.", pauseAfter: 800 },
  { text: "Full-stack Engineer.", pauseAfter: 800 },
  { text: "Problem Solver.", pauseAfter: 800 },
  { text: "I Build Things That Actually Matter.", pauseAfter: 1000 },
];

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentSequenceIndex >= typingSequence.length) return;

    const currentPhrase = typingSequence[currentSequenceIndex];
    if (isTyping) {
      // Typing phase
      if (displayText.length < currentPhrase.text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.text.slice(0, displayText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, currentPhrase.pauseAfter);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next phrase
        setCurrentSequenceIndex((currentSequenceIndex + 1) % typingSequence.length);
        setIsTyping(true);
      }
    }
  }, [displayText, currentSequenceIndex, isTyping]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#312E81]">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96, 165, 250, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96, 165, 250, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <span className="text-cyan-400 font-mono text-sm">HI</span>
            </motion.div>

            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 min-h-[120px] md:min-h-[160px]">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block w-1 h-12 md:h-16 bg-cyan-400 ml-1"
                />
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-xl">
                Backend engineer passionate about building scalable systems, distributed architectures, 
                and solving complex problems with elegant solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                onClick={() => scrollToSection('projects')}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg"
              >
                Explore My Work
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg"
              >
                Contact Me
              </Button>
            </div>

            <div className="flex gap-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="mailto:mohamed@example.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Portrait with Floating Tech Icons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[min(32rem,86vw)] h-[min(32rem,86vw)] md:w-[min(40rem,48vw)] md:h-[min(40rem,48vw)]">
              {/* Portrait */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative z-10 h-full w-full"
              >
                <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 group">
                  <img
                    src={portraitImg}
                    alt="Mohamed"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-cyan-500/40 mix-blend-color group-hover:opacity-0 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
                </div>
              </motion.div>

              {/* Floating Tech Icons */}
              {techIcons.map(({ Icon, delay }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    opacity: { delay: 1 + delay, duration: 0.5 },
                    scale: { delay: 1 + delay, duration: 0.5 },
                    y: {
                      delay: 1.5 + delay,
                      duration: 2 + index * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  className="absolute"
                  style={{
                    top: `${Math.sin((index * Math.PI) / 2) * 48 + 50}%`,
                    left: `${Math.cos((index * Math.PI) / 2) * 48 + 50}%`,
                  }}
                >
                  <div className="bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 backdrop-blur-sm p-4 rounded-xl border border-cyan-500/30 shadow-lg">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                </motion.div>
              ))}

              {/* Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-cyan-500/10 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2 },
          y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
