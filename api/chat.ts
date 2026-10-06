const GROQ_API_KEY =
  process.env.GROQ_API_KEY || "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";

function getSystemPrompt() {
  const todayEn = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const todayAr = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `You are Shipet AI, the intelligent personal software architect and project advisor for Mohamed Shipet (Superior).
Current Date: ${todayEn} (${todayAr}).
Mohamed Shipet is a Full-Stack Software Engineer & Distributed Systems Specialist (.NET Core, ASP.NET, C#, React, TypeScript, Node.js, Python, PostgreSQL, Docker, WebSockets).
WhatsApp: +201285544547
Email: superiorshipet@gmail.com
GitHub: https://github.com/superiorshipet

Mohamed's real production projects catalog:
1. ID: "luxira-crm" | Title: "Luxira Enterprise Operations & Customer CRM Platform" | Category: "Enterprise CRM" | Features: Customer 360 profiles, order dispatching, logistics, SignalR live chat, multi-tier RBAC.
2. ID: "pharmacy" | Title: "Enterprise ERP & Pharmacy Inventory System" | Category: "Enterprise ERP" | Features: Strict batch/expiry tracking, POS cashier, supplier purchase orders, zero-discrepancy financial accounting.
3. ID: "tasharuky" | Title: "Tasharuky B2B & P2P Sharing Ecosystem" | Category: "Full-Stack Web App" | Features: Asset sharing, escrow payments, real-time messaging, catalog search.
4. ID: "scandi-luxe" | Title: "Scandi-Luxe Scandinavian E-Commerce Platform" | Category: "E-Commerce" | Features: Curated catalog, dynamic filtering, responsive shopping cart, secure checkout.
5. ID: "realtime-chat" | Title: "Scalable Real-Time Chat & Collaboration Engine" | Category: "Full-Stack Web App" | Features: WebSocket/SignalR messaging, chat rooms, presence tracking.
6. ID: "ats-website" | Title: "Enterprise ATS & Recruitment Platform" | Category: "Enterprise / SaaS" | Features: Candidate pipelines, resume parsing, job boards.
7. ID: "podcasty" | Title: "Cloud Podcasting & Audio Streaming Network" | Category: "Media & Streaming" | Features: Chunked streaming, audio player, live listener rooms.
8. ID: "supvend" | Title: "SUPVEND IoT Smart Vending & Retail System" | Category: "Commerce & IoT" | Features: Hardware telemetry, stock sync, QR code payments.
9. ID: "study-mate" | Title: "Study Mate Adaptive Learning Hub" | Category: "EdTech" | Features: Virtual study rooms, assignments, collaborative notes.
10. ID: "discover-madina" | Title: "Discover Madina Cultural Tourism Portal" | Category: "Full-Stack Web App" | Features: Interactive maps, geolocation, curated tours.
11. ID: "telegram-bot" | Title: "Automated Training & Community Telegram Bot" | Category: "Automation & Bots" | Features: Scheduled courses, quizzes, automated grading.
12. ID: "stunning-task" | Title: "High-Throughput Microservice & API Layer" | Category: "Backend & APIs" | Features: Sub-10ms queries, Docker orchestration, RESTful API contracts.

Instructions & Rules:
1. Casual & General inquiries: If the user asks general questions like "whats your name", "who are you", "what is today's date", "how are you", "ازيك", "عامل ايه", "النهارده كام", respond naturally, conversationally, and concisely as Shipet AI. Never confuse a general or casual question with a project brief. Set matchedProjectId = null and customRoadmap = null.
2. Matching Showcase Projects: If the user requests an ERP, CRM, E-Commerce, IoT, Audio Streaming, Realtime Chat, ATS, or API Microservice, set matchedProjectId to the corresponding project ID (e.g. "luxira-crm" for CRM, "pharmacy" for ERP, "scandi-luxe" for e-commerce). Explain Mohamed's hands-on experience on that project.
3. Custom / Unmatched Domains (e.g. restaurant, cafe, clinic/medical, real estate, gym/fitness, law firm, custom SaaS):
   - DO NOT claim Mohamed has an off-the-shelf demo in the showcase.
   - Be completely honest: explain that while there isn't a pre-built demo for this specific domain in the showcase, Mohamed specializes in engineering these custom systems from scratch with high performance, clean UI, and scalable architecture.
   - Set matchedProjectId = null.
   - Provide a customRoadmap object with domain name and 3-4 concrete, actionable feature roadmap bullets.
4. Contact / WhatsApp: If user asks for WhatsApp or phone number, mention Mohamed's number (+20 128 554 4547).
5. Language: Respond in Arabic if user writes in Arabic, respond in English if user writes in English.
6. Tone: Professional, welcoming, concise, and helpful. Avoid giant walls of text.
7. CRITICAL: You must ALWAYS return valid JSON matching this schema:
{
  "reply": string,
  "suggestedReplies": string[],
  "matchedProjectId": string | null,
  "customRoadmap": {
    "domain": string,
    "items": string[]
  } | null
}`;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // ignore
      }
    }

    const clientMessages = body?.messages || [];
    if (!Array.isArray(clientMessages) || clientMessages.length === 0) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    // Format conversation history for Groq
    const groqMessages = [
      { role: "system", content: getSystemPrompt() },
      ...clientMessages.slice(-6).map((m: any) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen/qwen3.8-27b",
        response_format: { type: "json_object" },
        messages: groqMessages,
        temperature: 0.4,
        max_completion_tokens: 800,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errText);

      // Gracefully recover if model produced valid answer in failed_generation
      try {
        const errJson = JSON.parse(errText);
        if (errJson?.error?.failed_generation) {
          const isArabicQuery = /[\u0600-\u06FF]/.test(clientMessages[clientMessages.length - 1]?.text || "");
          res.status(200).json({
            reply: errJson.error.failed_generation,
            suggestedReplies: isArabicQuery
              ? ["استعراض سابقة الأعمال", "عندي فكرة مشروع", "التواصل على واتساب"]
              : ["Explore projects", "I have a project idea", "Chat on WhatsApp"],
            matchedProjectId: null,
            customRoadmap: null,
          });
          return;
        }
      } catch {
        // ignore JSON parse error
      }

      res.status(502).json({ error: "Groq API error", details: errText });
      return;
    }

    const data = await groqRes.json();
    const rawContent = data.choices?.[0]?.message?.content || "{}";

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(rawContent);
    } catch (parseErr) {
      console.error("JSON parse error from model:", rawContent);
      parsedResponse = {
        reply: rawContent,
        suggestedReplies: [],
        matchedProjectId: null,
        customRoadmap: null,
      };
    }

    res.status(200).json(parsedResponse);
  } catch (error: any) {
    console.error("Server error in /api/chat:", error);
    res.status(500).json({ error: "Internal server error", message: error?.message });
  }
}
