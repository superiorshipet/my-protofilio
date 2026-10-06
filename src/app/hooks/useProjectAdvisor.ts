import { useState, useCallback, useMemo } from "react";
import {
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
      const convIntent = getConversationalIntent(userText);

      // Handle simple conversational queries (how are you, greetings, identity, etc.)
      if (convIntent) {
        const conv = getConversationalResponse(convIntent, arabic);
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "assistant",
          text: conv.text,
          matchedProjects: [],
          suggestedReplies: conv.suggestedReplies,
          isFinalScope: false,
          whatsappUrl: conv.whatsappUrl,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, botMessage]);
        return;
      }

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
      let breakdownData: { domain: string; items: string[]; whatsappUrl: string } | undefined = undefined;

      if (matches.length > 0) {
        const primary = matches[0];
        if (primary.id === "luxira-crm") {
          if (arabic) {
            botReplyText = `ممتاز جداً! محمد شيبت يمتلك خبرة إنتاجية حقيقية ومباشرة في تطوير أنظمة الـ CRM في Luxira Holding: **${primary.arabicTitle}**.\n\nالمنصة تشمل إدارة دورة حياة العملاء، وتتبع الطلبات والشحنات اللوجستية، وتوزيع الصلاحيات، والدعم الفني اللحظي عبر SignalR.\n\nما هي الوحدات أو دورات العمل المحددة التي تحتاجها في نظام الـ CRM لمشروعك؟`;
            suggested = [
              "نحتاج إدارة ليدز ومبيعات",
              "نحتاج ربط الشحن واللوجستيات",
              "نحتاج قنوات دعم فوري وتذاكر",
              "تجهيز المتطلبات للمناقشة فوراً",
            ];
          } else {
            botReplyText = `Great news! Mohamed has direct enterprise production experience architecting a full CRM platform at Luxira Holding: **${primary.title}**.\n\nIt features customer 360 profiles, order dispatching, delivery logistics, multi-tier RBAC permissions, and real-time customer support via SignalR.\n\nWhat specific CRM modules or customer pipelines do you need for your system?`;
            suggested = [
              "Need leads & sales pipeline",
              "Need order & delivery logistics",
              "Need live chat & support tickets",
              "Ready to scope CRM specifications",
            ];
          }
        } else if (primary.id === "pharmacy") {
          if (arabic) {
            botReplyText = `ممتاز جداً! محمد شيبت قام بالفعل بتطوير نظام ERP متكامل لإدارة الموارد والمخزون ونقاط البيع: **${primary.arabicTitle}**.\n\nيشمل تتبع تشغيلات وصلاحيات المخزون بدقة متناهية، ونقاط البيع (POS)، وأوامر التوريد والشراء، ومطابقة الحسابات المالية بدون أي فروقات.\n\nما هي المتطلبات أو الوحدات التي تحتاجها في نظام الـ ERP لمشروعك؟`;
            suggested = [
              "نحتاج إدارة فروع ومخازن متعددة",
              "نحتاج فواتير ونقاط بيع (POS)",
              "نحتاج حسابات وموردين وتقارير",
              "تجهيز المتطلبات للاتفاق",
            ];
          } else {
            botReplyText = `Great news! Mohamed has engineered mission-critical enterprise ERP & operations systems: **${primary.title}**.\n\nIt features strict inventory batch control, sales auditing, POS cashiering, supplier purchase orders, and zero-discrepancy financial accounting.\n\nWhat enterprise modules or inventory workflows do you need for your ERP?`;
            suggested = [
              "Need multi-warehouse & stock sync",
              "Need POS cashiering & invoicing",
              "Need supplier & procurement pipeline",
              "Ready to scope ERP specifications",
            ];
          }
        } else {
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
        }
      } else if (isTimelineInput || userText.toLowerCase().includes("ready") || userText.includes("جاهز") || userText.includes("اتفاق")) {
        isFinal = true;
        if (arabic) {
          botReplyText = `رائع! تم تجميع مسودة متطلبات مشروعك بنجاح. يمكنك مراجعة الملخص أدناه وإرساله بضغطة زر مباشرة إلى واتساب محمد شيبت لمناقشة التفاصيل وبدء التنفيذ فوراً!`;
        } else {
          botReplyText = `Excellent! I have compiled your project scope draft into a structured brief. You can review the specification below and forward it directly to Mohamed on WhatsApp with one click to kickstart development!`;
        }
      } else {
        // Honest, structured breakdown for custom projects without direct pre-built catalog demos
        const breakdown = analyzeCustomIdea(userText);
        const directWhatsAppMsg = arabic
          ? `أهلاً محمد، حابب أستفسر عن تنفيذ مشروع: ${userText}\n\nالمتطلبات المقترحة:\n` +
            breakdown.arabicSuggestedItems.map((item, i) => `${i + 1}. ${item}`).join("\n") +
            `\n\nحابب أعرف التكلفة والمدة الزمنية المتوقعة.`
          : `Hi Mohamed, I would like to discuss building: ${userText}\n\nProposed Requirements:\n` +
            breakdown.suggestedItems.map((item, i) => `${i + 1}. ${item}`).join("\n") +
            `\n\nCould we discuss the estimated timeline and budget?`;

        const directWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(directWhatsAppMsg)}`;

        breakdownData = {
          domain: arabic ? breakdown.arabicDomain : breakdown.domain,
          items: arabic ? breakdown.arabicSuggestedItems : breakdown.suggestedItems,
          whatsappUrl: directWhatsAppUrl,
        };

        if (arabic) {
          botReplyText = `فكرة ممتازة جداً! 🚀\n\nالمعرض الحالي لا يحتوي على نموذج جاهز مخصص لـ **${breakdown.arabicDomain}** تحديداً، لكن محمد متخصص في هندسة وبناء الحلول والأنظمة المخصصة من الصفر بأعلى معايير الأداء والسرعة والتصميم المتجاوب.\n\nقمت بتنظيم وتلخيص خارطة المتطلبات الأساسية لمشروعك بالأسفل لمساعدتك في ترتيب الفكرة، وتقدر تتواصل مباشرة مع محمد على واتساب لمناقشة التفاصيل والبدء فوراً:`;
          suggested = [
            "تواصل عبر واتساب فوراً",
            "نحتاج واجهة سريعة وتصميم مودرن",
            "ما هي المدة المتوقعة للتسليم؟",
            "استعراض مشاريع سابقة أخرى",
          ];
        } else {
          botReplyText = `That sounds like a fantastic project! 🚀\n\nWhile Mohamed doesn't have an off-the-shelf demo for **${breakdown.domain}** in the portfolio showcase, this is a custom web solution he specializes in architecting from scratch with high performance, clean UI, and scalable architecture.\n\nI've outlined a recommended technical feature roadmap below to help organize your requirements, and you can connect directly with Mohamed on WhatsApp to discuss details:`;
          suggested = [
            "Discuss on WhatsApp directly",
            "Need modern responsive UI",
            "What is the estimated timeline?",
            "Explore other live projects",
          ];
        }
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: botReplyText,
        matchedProjects: matches.slice(0, 2),
        suggestedReplies: suggested,
        isFinalScope: isFinal,
        customBreakdown: breakdownData,
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
