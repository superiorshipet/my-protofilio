import { useState, useCallback, useMemo } from "react";
import {
  projectKnowledgeBase,
  findMatchingProjects,
  getConversationalIntent,
  getConversationalResponse,
  analyzeCustomIdea,
  ProjectSolution,
} from "../data/botKnowledge";

export interface ProjectScope {
  projectType: string;
  referenceProject?: string;
  referenceDemo?: string;
  requirements: string[];
  timeline?: string;
  budget?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  matchedProjects?: ProjectSolution[];
  suggestedReplies?: string[];
  isFinalScope?: boolean;
  whatsappUrl?: string;
  customBreakdown?: {
    domain: string;
    items: string[];
    whatsappUrl: string;
  };
  timestamp: number;
}

const WHATSAPP_NUMBER = "+201285544547";

export function useProjectAdvisor() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("advisor") === "open";
    }
    return false;
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      sender: "assistant",
      text:
        "Welcome! I am Mohamed Shipet's Project & Architecture AI Assistant. Describe your project idea, product, or challenge, and I will check our existing production solutions, show you live working demos, or break down your requirements and connect you directly with Mohamed.",
      suggestedReplies: [
        "I need an E-Commerce Store",
        "I need a Task / CRM Platform",
        "I need a Realtime Chat System",
        "I need an Automated Bot / Automation",
        "I have a custom product idea...",
      ],
      timestamp: Date.now(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const [scope, setScope] = useState<ProjectScope>({
    projectType: "",
    requirements: [],
  });

  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  // Local rule-based fallback if offline or API unavailable
  const runLocalFallback = useCallback((userText: string, arabic: boolean): ChatMessage => {
    const convIntent = getConversationalIntent(userText);
    if (convIntent) {
      const conv = getConversationalResponse(convIntent, arabic);
      return {
        id: `bot-fallback-${Date.now()}`,
        sender: "assistant",
        text: conv.text,
        matchedProjects: [],
        suggestedReplies: conv.suggestedReplies,
        isFinalScope: false,
        whatsappUrl: conv.whatsappUrl,
        timestamp: Date.now(),
      };
    }

    const matches = findMatchingProjects(userText);
    if (matches.length > 0) {
      const primary = matches[0];
      const botText = arabic
        ? `ممتاز جداً! محمد يمتلك خبرة إنتاجية حقيقية ومباشرة في هذا المجال: **${primary.arabicTitle}**.\n\nيمكنك استعراض النموذج الحي أو مناقشة الميزات المحددة التي تحتاجها.`
        : `Great news! Mohamed has direct production experience with: **${primary.title}**.\n\nYou can explore the live demo below or let me know what specific modules you need.`;
      return {
        id: `bot-fallback-${Date.now()}`,
        sender: "assistant",
        text: botText,
        matchedProjects: matches.slice(0, 2),
        suggestedReplies: arabic
          ? ["نحتاج واجهة سريعة وتصميم مودرن", "تواصل عبر واتساب فوراً", "ما هي المدة المتوقعة؟"]
          : ["Need modern responsive UI", "Discuss on WhatsApp", "What is estimated timeline?"],
        isFinalScope: false,
        timestamp: Date.now(),
      };
    }

    const breakdown = analyzeCustomIdea(userText);
    const directWhatsAppMsg = arabic
      ? `أهلاً محمد، حابب أستفسر عن تنفيذ مشروع: ${userText}\n\n*المتطلبات المقترحة:*\n` +
        breakdown.arabicSuggestedItems.map((item, i) => `${i + 1}. ${item}`).join("\n") +
        `\n\nحابب أعرف التكلفة والمدة الزمنية المتوقعة.`
      : `Hi Mohamed, I would like to discuss building: ${userText}\n\n*Proposed Requirements:*\n` +
        breakdown.suggestedItems.map((item, i) => `${i + 1}. ${item}`).join("\n") +
        `\n\nCould we discuss the estimated timeline and budget?`;

    const directWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(directWhatsAppMsg)}`;

    return {
      id: `bot-fallback-${Date.now()}`,
      sender: "assistant",
      text: arabic
        ? `فكرة ممتازة جداً! 🚀\n\nالمعرض الحالي لا يحتوي على نموذج جاهز مخصص لـ **${breakdown.arabicDomain}** تحديداً، لكن محمد متخصص في هندسة وبناء الحلول والأنظمة المخصصة من الصفر بأعلى معايير الأداء والسرعة والتصميم المتجاوب.\n\nقمت بتنظيم وتلخيص خارطة المتطلبات الأساسية لمشروعك بالأسفل لمساعدتك في ترتيب الفكرة، وتقدر تتواصل مباشرة مع محمد على واتساب لمناقشة التفاصيل والبدء فوراً:`
        : `That sounds like a fantastic project! 🚀\n\nWhile Mohamed doesn't have an off-the-shelf demo for **${breakdown.domain}** in the portfolio showcase, this is a custom web solution he specializes in architecting from scratch with high performance, clean UI, and scalable architecture.\n\nI've outlined a recommended technical feature roadmap below to help organize your requirements, and you can connect directly with Mohamed on WhatsApp to discuss details:`,
      matchedProjects: [],
      suggestedReplies: arabic
        ? ["تواصل عبر واتساب فوراً", "نحتاج واجهة سريعة وتصميم مودرن", "ما هي المدة المتوقعة للتسليم؟"]
        : ["Discuss on WhatsApp directly", "Need modern responsive UI", "What is the estimated timeline?"],
      isFinalScope: false,
      customBreakdown: {
        domain: arabic ? breakdown.arabicDomain : breakdown.domain,
        items: arabic ? breakdown.arabicSuggestedItems : breakdown.suggestedItems,
        whatsappUrl: directWhatsAppUrl,
      },
      timestamp: Date.now(),
    };
  }, []);

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim()) return;

      const userMsgId = `user-${Date.now()}`;
      const userMessage: ChatMessage = {
        id: userMsgId,
        sender: "user",
        text: userText,
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsTyping(true);

      const arabic = isArabic(userText);

      // Track timeline or requirements in project scope
      const timelineKeywords = ["week", "month", "asap", "urgent", "flexible", "أسبوع", "شهر", "عاجل", "سريع", "مرن", "يوم"];
      const isTimelineInput = timelineKeywords.some((k) => userText.toLowerCase().includes(k));
      setScope((prev) => {
        const next = { ...prev };
        if (isTimelineInput && !next.timeline) {
          next.timeline = userText;
        } else if (userText.length > 8 && !next.requirements.includes(userText)) {
          next.requirements = [...next.requirements, userText];
        }
        return next;
      });

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              sender: m.sender,
              text: m.text,
            })),
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Chat API responded with status ${response.status}`);
        }

        const data = await response.json();
        const reply = typeof data.reply === "string" ? data.reply : "Thank you for reaching out!";
        const suggestedReplies = Array.isArray(data.suggestedReplies) ? data.suggestedReplies : [];
        const matchedProjectId = data.matchedProjectId;
        const customRoadmap = data.customRoadmap;

        let matchedProjects: ProjectSolution[] = [];
        if (matchedProjectId) {
          const found = projectKnowledgeBase.find((p) => p.id === matchedProjectId);
          if (found) {
            matchedProjects = [found];
            setScope((prev) => ({
              ...prev,
              referenceProject: found.title,
              projectType: found.category,
              referenceDemo: found.demoUrl,
            }));
          }
        }

        let breakdownData: { domain: string; items: string[]; whatsappUrl: string } | undefined = undefined;
        if (
          customRoadmap &&
          typeof customRoadmap.domain === "string" &&
          Array.isArray(customRoadmap.items) &&
          customRoadmap.items.length > 0
        ) {
          const directWhatsAppMsg = arabic
            ? `أهلاً محمد، حابب أستفسر عن تنفيذ مشروع: ${userText}\n\n*المتطلبات المقترحة (${customRoadmap.domain}):*\n` +
              customRoadmap.items.map((item: string, i: number) => `${i + 1}. ${item}`).join("\n") +
              `\n\nحابب أعرف التكلفة والمدة الزمنية المتوقعة.`
            : `Hi Mohamed, I would like to discuss building: ${userText}\n\n*Proposed Requirements (${customRoadmap.domain}):*\n` +
              customRoadmap.items.map((item: string, i: number) => `${i + 1}. ${item}`).join("\n") +
              `\n\nCould we discuss the estimated timeline and budget?`;

          const directWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(directWhatsAppMsg)}`;

          breakdownData = {
            domain: customRoadmap.domain,
            items: customRoadmap.items,
            whatsappUrl: directWhatsAppUrl,
          };
        }

        // WhatsApp direct link if user asks for contact, whatsapp, or pricing
        let directWaUrl: string | undefined = undefined;
        if (
          !breakdownData &&
          (/(whatsapp|whats\s*app|واتس|واتساب|تواصل|phone|call|contact|pricing|price|سعر|تكلفة)/i.test(userText) ||
            /(whatsapp|واتساب)/i.test(reply))
        ) {
          directWaUrl = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(
            arabic ? "مرحباً محمد، حابب أناقش معاك مشروع برمجيات." : "Hi Mohamed, I would like to discuss a software project with you."
          )}`;
        }

        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "assistant",
          text: reply,
          matchedProjects,
          suggestedReplies,
          isFinalScope: false,
          whatsappUrl: directWaUrl,
          customBreakdown: breakdownData,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (apiErr) {
        console.warn("Groq API error or offline, fallback to local engine:", apiErr);
        const fallback = runLocalFallback(userText, arabic);
        setMessages((prev) => [...prev, fallback]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, runLocalFallback]
  );

  const whatsappLink = useMemo(() => {
    let msg = `Hi Mohamed, I used your AI Project Advisor on your portfolio:\n\n`;
    if (scope.projectType) msg += `*Domain/Category:* ${scope.projectType}\n`;
    if (scope.referenceProject) msg += `*Reference Solution:* ${scope.referenceProject}\n`;
    if (scope.referenceDemo) msg += `*Live Demo Checked:* ${scope.referenceDemo}\n`;
    if (scope.requirements.length > 0) {
      msg += `*Key Requirements:*\n` + scope.requirements.map((r, i) => `${i + 1}. ${r}`).join("\n") + `\n`;
    }
    if (scope.timeline) msg += `*Estimated Timeline:* ${scope.timeline}\n`;
    msg += `\nI would like to discuss next steps and pricing.`;

    return `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(msg)}`;
  }, [scope]);

  const resetChat = useCallback(() => {
    setScope({ projectType: "", requirements: [] });
    setMessages([
      {
        id: "initial-welcome-reset",
        sender: "assistant",
        text:
          "Welcome! Describe your project idea, product, or challenge, and I will check our existing production solutions, show you live working demos, and organize your requirements into a ready-to-execute specification.",
        suggestedReplies: [
          "I need an E-Commerce Store",
          "I need a Task / CRM Platform",
          "I need a Realtime Chat System",
          "I need an Automated Bot / Automation",
          "I have a custom product idea...",
        ],
        timestamp: Date.now(),
      },
    ]);
  }, []);

  return {
    isOpen,
    setIsOpen,
    messages,
    sendMessage,
    isTyping,
    scope,
    whatsappLink,
    resetChat,
  };
}
