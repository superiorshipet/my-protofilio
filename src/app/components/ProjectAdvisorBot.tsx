import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  X,
  Send,
  ExternalLink,
  Github,
  RotateCcw,
  MessageCircle,
  CheckCircle2,
  Layers,
  ArrowRight,
  User,
} from "lucide-react";
import { BotRobotIcon } from "./BotRobotIcon";
import { useProjectAdvisor } from "../hooks/useProjectAdvisor";
import { Button } from "./ui/button";

export function ProjectAdvisorBot() {
  const {
    isOpen,
    setIsOpen,
    messages,
    sendMessage,
    isTyping,
    scope,
    whatsappLink,
    resetChat,
  } = useProjectAdvisor();

  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-project-advisor", handleOpen);
    return () => window.removeEventListener("open-project-advisor", handleOpen);
  }, [setIsOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal);
    setInputVal("");
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      {/* Floating Launcher Button - Robot Speech Bubble Companion */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-5 z-40 flex items-center justify-center cursor-pointer group"
        aria-label="Open AI Project Advisor"
      >
        {/* Futuristic Speech-Bubble Bot Container */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[var(--space-cyan)]/70 bg-[var(--space-panel-strong)]/95 shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(100,244,255,0.3)] backdrop-blur-xl transition-all duration-300 group-hover:border-[var(--space-cyan)] group-hover:shadow-[0_16px_50px_rgba(100,244,255,0.5)]">
          {/* Cyan Glow Aura */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-[var(--space-cyan)]/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />

          {/* Bot Robot Icon from user reference */}
          <BotRobotIcon className="h-9 w-9 text-[var(--space-cyan)] transition-transform duration-300 group-hover:scale-105" />
        </div>
      </motion.button>

      {/* Main Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-x-3 bottom-4 top-20 z-50 flex flex-col overflow-hidden rounded-2xl border border-[var(--space-cyan)]/40 bg-[var(--space-void)]/95 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(100,244,255,0.22)] backdrop-blur-2xl sm:inset-auto sm:bottom-20 sm:right-6 sm:h-[640px] sm:w-[440px] sm:max-h-[85vh] sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--space-border)] bg-[var(--space-panel)]/80 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--space-cyan)]/50 bg-gradient-to-br from-[var(--space-cyan)]/25 via-[var(--space-panel)] to-purple-500/20 text-[var(--space-cyan)] shadow-[0_0_20px_rgba(100,244,255,0.3)]">
                  <BotRobotIcon className="h-6 w-6 text-[var(--space-cyan)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-bold text-[var(--space-starlight)]">
                      Shipet AI Architect
                    </span>
                    <span className="rounded bg-[var(--space-cyan)]/20 px-1.5 py-0.2 font-mono text-[9px] font-semibold text-[var(--space-cyan)] border border-[var(--space-cyan)]/30">
                      ONLINE
                    </span>
                  </div>
                  <div className="text-[10px] text-[var(--space-muted)]">
                    Solutions matcher & requirements collector
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset Conversation"
                  className="rounded-lg p-1.5 text-[var(--space-muted)] hover:bg-[var(--space-panel-strong)] hover:text-[var(--space-starlight)] transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="rounded-lg p-1.5 text-[var(--space-muted)] hover:bg-[var(--space-panel-strong)] hover:text-[var(--space-starlight)] transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scope Tracker Badge */}
            {scope.referenceProject && (
              <div className="flex items-center justify-between border-b border-[var(--space-border)] bg-[var(--space-panel-strong)]/60 px-4 py-1.5 text-[11px] font-mono text-[var(--space-cyan)]">
                <div className="flex items-center gap-1.5 truncate">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span className="truncate">Matched: {scope.referenceProject}</span>
                </div>
                {scope.timeline && (
                  <span className="shrink-0 text-xs text-[var(--space-moon)]">
                    ⏱ {scope.timeline}
                  </span>
                )}
              </div>
            )}

            {/* Message Stream */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    {!isUser && (
                      <div className="mb-1 flex items-center gap-1.5 pl-1 text-[10px] font-mono font-medium text-[var(--space-cyan)]">
                        <BotRobotIcon className="h-3.5 w-3.5 text-[var(--space-cyan)]" />
                        <span>Shipet AI</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed sm:text-sm ${
                        isUser
                          ? "bg-[var(--space-button)] text-[var(--space-button-text)] font-medium shadow-[0_4px_16px_rgba(100,244,255,0.2)]"
                          : "border border-[var(--space-border)] bg-[var(--space-panel)]/80 text-[var(--space-starlight)] shadow-sm"
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Embedded Matching Projects Showcase */}
                      {msg.matchedProjects && msg.matchedProjects.length > 0 && (
                        <div className="mt-3.5 space-y-3">
                          {msg.matchedProjects.map((proj) => (
                            <div
                              key={proj.id}
                              className="overflow-hidden rounded-xl border border-[var(--space-cyan)]/30 bg-[var(--space-void)]/90 shadow-md"
                            >
                              {/* Preview Screenshot */}
                              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50">
                                <img
                                  src={proj.image}
                                  alt={proj.title}
                                  className="h-full w-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--space-void)] via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                                  {proj.tech.slice(0, 3).map((t) => (
                                    <span
                                      key={t}
                                      className="rounded bg-[var(--space-panel)]/90 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[var(--space-cyan)] border border-[var(--space-border)]"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Card Content */}
                              <div className="p-3">
                                <div className="font-display font-bold text-xs sm:text-sm text-[var(--space-starlight)]">
                                  {proj.title}
                                </div>
                                <div className="mt-1 text-[11px] text-[var(--space-moon)] line-clamp-2">
                                  {proj.description}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-3 flex gap-2">
                                  {proj.demoUrl && (
                                    <a
                                      href={proj.demoUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--space-button)] py-2 font-mono text-[11px] font-bold text-[var(--space-button-text)] hover:bg-[var(--space-cyan)] transition-all shadow-[0_0_12px_rgba(100,244,255,0.2)]"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      Explore Demo
                                    </a>
                                  )}
                                  {proj.githubUrl && (
                                    <a
                                      href={proj.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--space-border)] bg-[var(--space-panel)] px-3 py-2 font-mono text-[11px] text-[var(--space-starlight)] hover:bg-[var(--space-panel-strong)] transition-all"
                                    >
                                      <Github className="h-3 w-3" />
                                      Code
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Custom Idea Feature Roadmap & Direct WhatsApp Consultation */}
                      {msg.customBreakdown && (
                        <div className="mt-3.5 rounded-xl border border-[var(--space-cyan)]/30 bg-[var(--space-panel-strong)]/90 p-3.5 shadow-md">
                          <div className="flex items-center gap-2 font-display text-xs font-bold text-[var(--space-cyan)]">
                            <Layers className="h-4 w-4 text-[var(--space-cyan)]" />
                            <span>{msg.customBreakdown.domain}</span>
                          </div>
                          <div className="mt-2.5 space-y-1.5 border-t border-[var(--space-border)]/60 pt-2.5">
                            <div className="text-[11px] font-semibold text-[var(--space-starlight)]">
                              📋 {/[\u0600-\u06FF]/.test(msg.text) ? "خارطة الميزات المقترحة لمشروعك:" : "Suggested Feature Roadmap:"}
                            </div>
                            {msg.customBreakdown.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-1.5 text-[11px] text-[var(--space-moon)] leading-relaxed"
                              >
                                <span className="text-[var(--space-cyan)] font-mono">•</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                          <a
                            href={msg.customBreakdown.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3.5 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:bg-emerald-400 transition-all cursor-pointer"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>
                              {/[\u0600-\u06FF]/.test(msg.text)
                                ? "تواصل مع محمد على واتساب لبدء التنفيذ"
                                : "Discuss on WhatsApp with Mohamed"}
                            </span>
                          </a>
                        </div>
                      )}

                      {/* Standalone WhatsApp Action (e.g. for contact or pricing queries) */}
                      {msg.whatsappUrl && !msg.customBreakdown && (
                        <div className="mt-3">
                          <a
                            href={msg.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:bg-emerald-400 transition-all cursor-pointer"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>
                              {/[\u0600-\u06FF]/.test(msg.text)
                                ? "محادثة محمد على واتساب"
                                : "Chat on WhatsApp with Mohamed"}
                            </span>
                          </a>
                        </div>
                      )}

                      {/* Final Project Scope Export Box */}
                      {msg.isFinalScope && (
                        <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3.5">
                          <div className="flex items-center gap-2 font-display text-xs font-bold text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" />
                            Project Scope Brief Ready
                          </div>
                          <p className="mt-1 text-[11px] text-[var(--space-moon)]">
                            Forward these specifications directly to Mohamed to schedule kickoff:
                          </p>
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-all"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Send to Mohamed on WhatsApp
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Quick Reply Suggestions */}
                    {msg.suggestedReplies && msg.suggestedReplies.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                        {msg.suggestedReplies.map((reply) => (
                          <button
                            key={reply}
                            type="button"
                            onClick={() => handleQuickReply(reply)}
                            className="rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-2.5 py-1 text-[11px] font-medium text-[var(--space-moon)] hover:border-[var(--space-cyan)] hover:text-[var(--space-cyan)] transition-all cursor-pointer"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing / AI Thinking Indicator */}
              {isTyping && (
                <div className="flex flex-col items-start animate-fade-in">
                  <div className="mb-1 flex items-center gap-1.5 pl-1 text-[10px] font-mono font-medium text-[var(--space-cyan)]">
                    <BotRobotIcon className="h-3.5 w-3.5 text-[var(--space-cyan)] animate-pulse" />
                    <span>Shipet AI</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel)]/80 px-4 py-2.5 shadow-sm text-xs text-[var(--space-moon)]">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--space-cyan)] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--space-cyan)] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--space-cyan)] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-[11px] font-mono">Analyzing with AI...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-[var(--space-border)] bg-[var(--space-panel)]/70 p-3 sm:p-4"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={isTyping ? "AI is thinking..." : "Describe your project, app, or idea..."}
                  disabled={isTyping}
                  className="flex-1 rounded-xl border border-[var(--space-border)] bg-[var(--space-void)] px-3.5 py-2.5 text-xs sm:text-sm text-[var(--space-starlight)] placeholder:text-[var(--space-muted)] focus:border-[var(--space-cyan)] focus:outline-none transition-colors disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--space-button)] text-[var(--space-button-text)] disabled:opacity-40 hover:bg-[var(--space-cyan)] hover:text-[var(--space-void)] transition-all cursor-pointer shadow-[0_0_14px_rgba(100,244,255,0.25)] shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
