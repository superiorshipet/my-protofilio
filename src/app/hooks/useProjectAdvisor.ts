import { useState, useCallback, useMemo } from "react";
import { findMatchingProjects, ProjectSolution } from "../data/botKnowledge";

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
        "Welcome! I am Mohamed Shipet's Project & Architecture AI Assistant. Describe your project idea, product, or challenge, and I will check our existing production solutions, show you live working demos, and organize your requirements into a ready-to-execute specification.",
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

  const [scope, setScope] = useState<ProjectScope>({
    projectType: "",
    requirements: [],
  });

  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  const sendMessage = useCallback((userText: string) => {
    if (!userText.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: userText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const arabic = isArabic(userText);
      const matches = findMatchingProjects(userText);

      const timelineKeywords = ["week", "month", "asap", "urgent", "flexible", "أسبوع", "شهر", "عاجل", "سريع", "مرن", "يوم"];
      const isTimelineInput = timelineKeywords.some((k) => userText.toLowerCase().includes(k));

      setScope((prev) => {
        const next = { ...prev };

        if (matches.length > 0 && !next.referenceProject) {
          next.referenceProject = matches[0].title;
          next.projectType = matches[0].category;
          if (matches[0].demoUrl) next.referenceDemo = matches[0].demoUrl;
        }

        if (isTimelineInput && !next.timeline) {
          next.timeline = userText;
        } else if (userText.length > 8 && !next.requirements.includes(userText)) {
          next.requirements = [...next.requirements, userText];
        }

        return next;
      });

      let botReplyText = "";
      let suggested: string[] = [];
      let isFinal = false;

      if (matches.length > 0) {
        const primary = matches[0];
        if (arabic) {
          botReplyText = `ممتاز جداً! محمد شيبت قام بالفعل بتنفيذ وتطوير بنية برمجية متكاملة تطابق هذه الفكرة تماماً: **${primary.arabicTitle}**.\n\nيمكنك استكشاف النموذج الحي ومعاينة الكود مباشرة من الكارت أدناه. ما هي المميزات المحددة أو التخصيصات التي تريدها لمشروعك؟`;
          suggested = [
            "نحتاج بوابات دفع ولوحة تحكم",
            "نحتاج تطبيق موبايل مع الويب",
            "التسليم خلال شهر",
            "تجهيز العرض والاتفاق مباشرة",
          ];
        } else {
          botReplyText = `Great news! Mohamed has already architected and deployed a live production system matching this exact concept: **${primary.title}**.\n\nYou can explore the live demo and inspect the architecture right in the card below. What custom features or specific business integrations do you need?`;
          suggested = [
            "Need online payments & admin dashboard",
            "Need real-time notifications",
            "Target launch within 3-4 weeks",
            "Ready to finalize specifications",
          ];
        }
      } else if (isTimelineInput || userText.toLowerCase().includes("ready") || userText.includes("جاهز") || userText.includes("اتفاق")) {
        isFinal = true;
        if (arabic) {
          botReplyText = `رائع! تم تجميع مسودة متطلبات مشروعك بنجاح. يمكنك مراجعة الملخص أدناه وإرساله بضغطة زر مباشرة إلى واتساب محمد شيبت لمناقشة التفاصيل وبدء التنفيذ فوراً!`;
        } else {
          botReplyText = `Excellent! I have compiled your project scope draft into a structured brief. You can review the specification below and forward it directly to Mohamed on WhatsApp with one click to kickstart development!`;
        }
      } else {
        if (arabic) {
          botReplyText = `فكرة ممتازة! محمد يمتلك خبرة عميقة في بناء هذه الأنظمة من الصفر (بناء واجهات تفاعلية سريعة + أنظمة Backend وقواعد بيانات قوية).\n\nلضبط نطاق العمل، ما هو المدى الزمني المتوقع للإطلاق (مثلاً أسبوعين، شهر، أو مرن)؟`;
          suggested = ["أسبوعين إلى 4 أسابيع", "خلال شهرين", "مرن حسب جودة العمل", "جاهز للمناقشة"];
        } else {
          botReplyText = `That is a solid product idea! Mohamed specializes in engineering these systems end-to-end with high-throughput backend services and clean frontend interfaces.\n\nTo help size the project scope, what is your estimated timeline for MVP launch?`;
          suggested = ["2-4 weeks (MVP)", "1-2 months", "Flexible for high quality", "Ready to discuss"];
        }
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: botReplyText,
        matchedProjects: matches.slice(0, 2),
        suggestedReplies: suggested,
        isFinalScope: isFinal,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 450);
  }, []);

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
    scope,
    whatsappLink,
    resetChat,
  };
}
