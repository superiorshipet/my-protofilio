import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Github, Linkedin, Mail, MapPin, MessageCircle, Send, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import cvFile from '../../imports/Mohamed-Shipet-CV.pdf';

const cvUrl = cvFile;
const whatsappUrl = 'https://wa.me/+201285544547?text=Hi%20Mohamed%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20connect.';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setSubmitStatus('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/mohmedshipet4@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New portfolio idea',
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-kicker">06 / Contact</span>
          <h2 className="mt-6 max-w-6xl font-display text-[clamp(3.6rem,9vw,8.5rem)] font-semibold leading-[0.86] text-[var(--space-starlight)]">
            Got a project worth building?
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--space-moon)]">Tell me what needs to work, who it needs to serve, and where it needs to scale. We will build the right way there.</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="editorial-surface space-y-8 rounded-[2.25rem] p-7 md:p-9"
          >
            <div>
              <h3 className="mb-6 font-display text-4xl font-semibold text-[var(--space-starlight)]">Get in touch.</h3>
              <p className="text-[var(--space-moon)] mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-auto rounded-full bg-[var(--space-button)] px-5 py-4 text-sm font-semibold text-[var(--space-button-text)] hover:bg-[var(--space-cyan)] hover:text-[var(--space-void)]"
                >
                  <a href={cvUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-full border-[var(--space-border)] bg-[var(--space-panel)] px-5 py-4 text-sm text-[var(--space-starlight)] hover:bg-[var(--space-panel-strong)]"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 border-t border-[var(--space-border)] pt-4 text-[var(--space-moon)] transition-colors hover:text-[var(--space-cyan)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--space-button)] text-[var(--space-button-text)]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-[var(--space-muted)]">Email</p>
                  <p>mohmedshipet4@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 border-t border-[var(--space-border)] pt-4 text-[var(--space-moon)] transition-colors hover:text-[var(--space-cyan)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--space-button)] text-[var(--space-button-text)]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-[var(--space-muted)]">Location</p>
                  <p>Egypt,Giza</p>
                  <p>Available world wide </p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-bold text-[var(--space-starlight)] mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <motion.a
                href="https://github.com/superiorshipet"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="editorial-surface flex h-11 w-11 items-center justify-center rounded-2xl text-[var(--space-muted)] transition-all hover:border-[var(--space-cyan)]/45 hover:text-[var(--space-cyan)]"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                href="https://www.linkedin.com/in/mohamed-shipet-700864266/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="editorial-surface flex h-11 w-11 items-center justify-center rounded-2xl text-[var(--space-muted)] transition-all hover:border-[var(--space-cyan)]/45 hover:text-[var(--space-cyan)]"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://x.com/M_shipet004"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="editorial-surface flex h-11 w-11 items-center justify-center rounded-2xl text-[var(--space-muted)] transition-all hover:border-[var(--space-cyan)]/45 hover:text-[var(--space-cyan)]"
                >
                  <Twitter className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="h-full"
            >
              <div className="editorial-surface h-full rounded-[2.25rem] p-7 md:p-9">
                <div className="mb-8 flex items-center justify-between"><h3 className="font-display text-3xl font-semibold text-[var(--space-starlight)]">Start a conversation.</h3><span className="font-mono text-xs text-[var(--space-muted)]">Usually replies soon</span></div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--space-moon)] mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-[var(--space-panel)] border-[var(--space-border)] text-[var(--space-starlight)] placeholder:text-[var(--space-muted)] focus:border-[var(--space-cyan)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--space-moon)] mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="bg-[var(--space-panel)] border-[var(--space-border)] text-[var(--space-starlight)] placeholder:text-[var(--space-muted)] focus:border-[var(--space-cyan)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--space-moon)] mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      className="bg-[var(--space-panel)] border-[var(--space-border)] text-[var(--space-starlight)] placeholder:text-[var(--space-muted)] focus:border-[var(--space-cyan)] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitStatus === 'sending'}
                    className="w-full rounded-full bg-[var(--space-button)] py-6 text-lg text-[var(--space-button-text)] hover:bg-[var(--space-cyan)] hover:text-white"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </Button>

                  {submitStatus === 'success' && (
                    <p className="text-sm text-cyan-300">
                      Your idea was sent successfully. I will get back to you soon.
                    </p>
                  )}

                  {submitStatus === 'error' && (
                    <p className="text-sm text-red-300">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
