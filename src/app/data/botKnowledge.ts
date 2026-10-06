export interface ProjectSolution {
  id: string;
  title: string;
  arabicTitle: string;
  category: "Full-Stack" | "Backend & APIs" | "Commerce" | "Systems & ML";
  keywords: string[];
  arabicKeywords: string[];
  description: string;
  arabicDescription: string;
  solutionHighlight: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
}

export const projectKnowledgeBase: ProjectSolution[] = [
  {
    id: "luxira-crm",
    title: "Luxira Enterprise Operations & Customer CRM Platform",
    arabicTitle: "منصة إدارة علاقات العملاء والعمليات المؤسسية (CRM)",
    category: "Full-Stack",
    keywords: [
      "crm",
      "crm system",
      "crm systems",
      "customer relationship",
      "customer management",
      "customer",
      "lead",
      "leads",
      "sales crm",
      "order management",
      "logistics",
      "client portal",
      "customer support",
      "luxira",
      "operations",
      "pipeline",
      "client",
      "clients",
      "tickets",
    ],
    arabicKeywords: [
      "crm",
      "سي ار ام",
      "ادارة عملاء",
      "إدارة عملاء",
      "علاقات العملاء",
      "عملاء",
      "طلبات",
      "لوجستيات",
      "خدمة عملاء",
      "مبيعات",
      "منظومة عملاء",
      "ليدز",
      "دعم فني",
      "نظام crm",
      "منصة عملاء",
    ],
    description: "An enterprise-grade CRM and operations platform engineered for customer lifecycle tracking, order dispatching, logistics tracking, role-based access control, and real-time customer support.",
    arabicDescription: "منصة CRM متكاملة لإدارة دورة حياة العملاء ومتابعة الطلبات، والشحن واللوجستيات، وصلاحيات المستخدمين، وقنوات الدعم الفوري.",
    solutionHighlight: "Production CRM architecture built at Luxira Holding with real-time SignalR notifications, audit trails, and multi-tier role permissions.",
    tech: ["ASP.NET Core MVC", "C#", "SQL Server", "SignalR", "Entity Framework Core"],
    image: "/assets/real-projects/luxira-chat.png",
    githubUrl: "https://github.com/superiorshipet",
    features: [
      "360 Customer Lifecycle & History",
      "Order Management & Logistics Tracking",
      "Role-Based Access Control (RBAC)",
      "Real-time Support via SignalR",
    ],
  },
  {
    id: "pharmacy",
    title: "Enterprise ERP & Pharmacy Inventory System",
    arabicTitle: "نظام إدارة الموارد والمخزون المؤسسي (ERP & POS)",
    category: "Backend & APIs",
    keywords: [
      "erp",
      "erp system",
      "erp systems",
      "enterprise resource planning",
      "inventory",
      "stock",
      "pos",
      "point of sale",
      "warehouse",
      "procurement",
      "supply chain",
      "invoicing",
      "billing",
      "pharmacy",
      "medicine",
      "medical",
      "hospital",
      "prescription",
      "health",
      "expiry",
      "accounting",
      "operations erp",
    ],
    arabicKeywords: [
      "erp",
      "اي ار بي",
      "نظام erp",
      "مؤسسي",
      "تخطيط موارد",
      "ادارة موارد",
      "مخازن",
      "مستودعات",
      "مخزون",
      "فواتير",
      "نقاط بيع",
      "حسابات",
      "توريدات",
      "صيدلية",
      "ادوية",
      "أدوية",
      "طبي",
      "علاج",
      "صلاحية",
      "روشتة",
      "نظام محاسبي",
    ],
    description: "A mission-critical enterprise ERP system for inventory batch control, sales audits, POS cashiering, supplier workflows, and financial records.",
    arabicDescription: "نظام ERP متكامل لإدارة الموارد والمخزون، وتتبع الصلاحيات والتشغيلات، وفواتير نقاط البيع (POS)، وحسابات الموردين والتدقيق المالي.",
    solutionHighlight: "Production ERP transactional architecture ensuring strict inventory batch audit, supplier purchase orders, POS cashiering, and zero discrepancy accounting.",
    tech: ["C#", "ASP.NET Core", "SQL Server", "Entity Framework", "ERP Engine"],
    image: "/assets/real-projects/pharmacy.png",
    demoUrl: "https://tasharuky.duckdns.org/pharmacy/",
    githubUrl: "https://github.com/superiorshipet/pharmacy",
    features: [
      "Inventory & Expiry Batch Tracking",
      "Point of Sale (POS) Cashier & Invoicing",
      "Supplier Procurement & Purchase Orders",
      "Financial Auditing & Discrepancy Prevention",
    ],
  },
  {
    id: "task-management",
    title: "Project Task Management Workspace",
    arabicTitle: "نظام إدارة المشاريع والمهام وسير العمل",
    category: "Full-Stack",
    keywords: ["task", "project", "management", "sprint", "board", "kanban", "team", "collaboration", "workflow", "jira", "trello", "productivity"],
    arabicKeywords: ["مهام", "مشروع", "مشاريع", "ادارة", "إدارة", "فريق", "كانبان", "تاسكات", "ورك فلو", "تعاون", "تنظيم", "سبرنت"],
    description: "An enterprise workspace for managing team projects, sprint tasks, member roles, status boards, and automated workflows.",
    arabicDescription: "مساحة عمل متكاملة لإدارة مشاريع وفرق العمل، وتعيين المهام، وتتبع حالات الإنجاز بلوحات كانبان وتقارير الأداء.",
    solutionHighlight: "Ready-to-deploy multi-tenant project management architecture with role-based access control (RBAC).",
    tech: ["Laravel", "Blade", "PHP", "MySQL", "Full-Stack"],
    image: "/assets/real-projects/task-management.png",
    demoUrl: "https://tasharuky.duckdns.org/login",
    githubUrl: "https://github.com/superiorshipet/project-task-managment",
    features: ["Custom Kanban Boards", "Role & Permission Engine", "Task Deadlines & Priority", "Activity Audit Logs"],
  },
  {
    id: "ats-website",
    title: "Enterprise ATS & Hiring Platform",
    arabicTitle: "منصة التوظيف وتتبع المتقدمين (ATS)",
    category: "Full-Stack",
    keywords: ["hiring", "recruitment", "ats", "applicant", "job", "resume", "cv", "interview", "hr", "candidate", "careers"],
    arabicKeywords: ["توظيف", "سير ذاتية", "سي في", "مرشحين", "وظائف", "اتش ار", "مقابلات", "تقديم", "فرص عمل", "استقطاب"],
    description: "An enterprise applicant tracking and candidate assessment platform featuring resume ingestion, status pipelines, and candidate analytics.",
    arabicDescription: "نظام متكامل لإدارة التوظيف وتتبع المرشحين، مع فلترة السير الذاتية وتنسيق مراحل المقابلات وتقييم الكفاءات.",
    solutionHighlight: "Automated candidate lifecycle pipeline with candidate rating, interactive dashboards, and status stages.",
    tech: ["TypeScript", "React", "PHP", "PostgreSQL"],
    image: "/assets/real-projects/ats.png",
    demoUrl: "https://the-ats-pro.duckdns.org/ats/",
    githubUrl: "https://github.com/superiorshipet/ATS-website",
    features: ["Resume Ingestion Pipeline", "Hiring Stage Kanban", "Recruiter Assessment Rubrics", "Candidate Filtering"],
  },
  {
    id: "belvie-furniture",
    title: "Belvie Luxury Furniture Storefront",
    arabicTitle: "متجر بيلفي للأثاث والتجارة الإلكترونية",
    category: "Commerce",
    keywords: ["furniture", "ecommerce", "e-commerce", "shop", "store", "cart", "checkout", "products", "decor", "interior"],
    arabicKeywords: ["اثاث", "أثاث", "متجر", "متجر الكتروني", "تسوق", "سلة", "شراء", "ديكور", "منتجات", "دفع"],
    description: "A modern Scandinavian furniture e-commerce storefront with high-resolution catalogs, custom item configurator, secure checkout, and full admin CMS.",
    arabicDescription: "متجر إلكتروني فخم لبيع الأثاث والمنتجات مع عربة تسوق، وبوابات دفع، ولوحة تحكم متكاملة بالمنتجات.",
    solutionHighlight: "High-conversion responsive e-commerce experience with dynamic catalog filtering and order fulfillment.",
    tech: ["React", "ASP.NET Core", "PostgreSQL", "E-commerce"],
    image: "/assets/real-projects/belvie.png",
    demoUrl: "https://belvie-arc.duckdns.org/belvie/",
    features: ["Visual Catalog & Filtering", "Real-time Cart & Checkout", "Admin Inventory Manager", "Responsive Mobile First"],
  },
  {
    id: "arabic-perfume",
    title: "Artisanal Perfume Boutique",
    arabicTitle: "متجر عطور وبوتيك إلكتروني فاخر",
    category: "Commerce",
    keywords: ["perfume", "fragrance", "boutique", "cosmetics", "luxury", "beauty", "store", "e-commerce"],
    arabicKeywords: ["عطور", "عطر", "بخور", "تجميل", "متجر عطور", "برفان", "تسوق الكتروني"],
    description: "An artisanal oriental perfume boutique with scent notes taxonomy, custom customer recommendations, authentication, and inventory sync.",
    arabicDescription: "منصة تسوق متخصصة في العطور الفاخرة مع نظام تصنيف النوتات العطرية وتوصيات مخصصة للعملاء.",
    solutionHighlight: "Tailored niche commerce layout optimized for high average order value (AOV) and customer retention.",
    tech: ["React", "ASP.NET Core", "PostgreSQL", "Commerce"],
    image: "/assets/real-projects/arabic-perfume.png",
    demoUrl: "https://arabic-perfume.duckdns.org/arabic-perfume/",
    features: ["Scent Pyramid Taxonomy", "Personalized Fragrance Quiz", "Secure Checkout Flow", "Customer Favorites List"],
  },
  {
    id: "digital-ecommerce",
    title: "Digital Goods & Software License Marketplace",
    arabicTitle: "سوق المنتجات الرقمية والتراخيص البرمجية",
    category: "Commerce",
    keywords: ["digital", "download", "license", "software", "assets", "saas", "stripe", "marketplace", "subscription"],
    arabicKeywords: ["رقمي", "منتجات رقمية", "تراخيص", "تنزيل", "تحميل", "برامج", "اشتراكات", "دفع اونلاين"],
    description: "A modern marketplace for downloadable digital assets with instant license provisioning, payment processing, and download protection.",
    arabicDescription: "منصة بيع المنتجات الرقمية والملفات مع نظام توليد التراخيص التلقائي وحماية روابط التحميل.",
    solutionHighlight: "Instant automated license keys delivery upon successful Stripe checkout with webhook verification.",
    tech: ["TypeScript", "React", "Tailwind", "Stripe"],
    image: "/assets/real-projects/e-commerce-e-products.png",
    demoUrl: "https://e-commerce-for-e-products.vercel.app",
    githubUrl: "https://github.com/superiorshipet/E-commerce-for-E-products",
    features: ["Instant License Generation", "Stripe Card & Digital Wallets", "Secure Expiring Download Links", "Customer Dashboard"],
  },
  {
    id: "luxira-chat",
    title: "Luxira Realtime Chat Microservice",
    arabicTitle: "نظام المحادثات الفورية والشات (Real-Time)",
    category: "Backend & APIs",
    keywords: ["chat", "messaging", "websocket", "realtime", "real-time", "signalr", "instant", "notifications", "channels"],
    arabicKeywords: ["شات", "محادثة", "رسائل", "ريل تايم", "فوري", "تواصل", "غرف محادثة", "ويب سوكت"],
    description: "Real-time messaging microservice built with SignalR WebSocket channels, instant delivery receipts, group channels, and decoupled frontend architecture.",
    arabicDescription: "محرك محادثات فورية عالي السرعة مبني بتقنية WebSockets و SignalR مع مؤشرات القراءة والإرسال والمجموعات.",
    solutionHighlight: "Sub-millisecond latency WebSocket microservice handling thousands of simultaneous duplex connections.",
    tech: ["C#", "SignalR", "ASP.NET", "WebSockets"],
    image: "/assets/real-projects/luxira-chat.png",
    githubUrl: "https://github.com/superiorshipet/luxira-chatting-backend",
    features: ["Direct & Group Messaging", "Typing Indicators & Read Receipts", "Reconnection Resiliency", "Scalable WebSocket Hub"],
  },
  {
    id: "podcasty",
    title: "Podcasty Cloud Audio Streaming Platform",
    arabicTitle: "منصة بث البودكاست والصوتيات السحابية",
    category: "Backend & APIs",
    keywords: ["podcast", "audio", "streaming", "music", "media", "sound", "radio", "broadcast", "episodes"],
    arabicKeywords: ["بودكاست", "صوتيات", "بث", "صوت", "حلقات", "تسجيلات", "راديو", "ميديا"],
    description: "A cloud podcasting platform supporting episode uploads, streaming playback, live chat rooms, and automated backend audio ingestion pipelines.",
    arabicDescription: "منصة سحابية متخصصة في رفع وبث حلقات البودكاست الصوتي مع مشغل حديث وغرف تفاعل للمستمعين.",
    solutionHighlight: "Optimized chunked streaming pipeline with cloud storage integration and listener analytics.",
    tech: ["C#", "ASP.NET Core", "SQL Server", "WebSocket"],
    image: "/assets/real-projects/podcasty.png",
    demoUrl: "https://tasharuky.duckdns.org/podcasty-ui/",
    githubUrl: "https://github.com/superiorshipet/podcasty",
    features: ["Custom Audio Player", "Episode Catalog & Playlists", "Listener Analytics", "Live Discussion Stream"],
  },
  {
    id: "supvend",
    title: "SUPVEND IoT Smart Vending & Retail System",
    arabicTitle: "منصة ماكينات البيع الذكية وإنترنت الأشياء (IoT)",
    category: "Commerce",
    keywords: ["iot", "vending", "smart", "hardware", "retail", "telemetry", "automation", "pos", "sensors"],
    arabicKeywords: ["انترنت الاشياء", "ماكينات بيع", "ذكي", "هاردوير", "تتبع اجهزة", "اتمتة", "بيع ذاتي"],
    description: "An IoT smart vending and micro-retail platform with telemetry tracking, instant order processing, inventory sync, and hardware API connectivity.",
    arabicDescription: "منصة إدارة وتتبع أجهزة البيع الآلي وربط الحساسات عن بعد مع تحديث لحظي للمخزون ومبيعات الماكينات.",
    solutionHighlight: "Full-stack IoT telemetry bridge synchronizing physical machine sensors with cloud inventory dashboards.",
    tech: ["JavaScript", "Node.js", "PostgreSQL", "IoT Protocols"],
    image: "/assets/real-projects/supvend.png",
    demoUrl: "https://supvend.duckdns.org/supvend-ui/",
    githubUrl: "https://github.com/superiorshipet/SUPVEND",
    features: ["Machine Telemetry & Health", "Remote Stock Sync", "QR Code Payments", "Hardware Bridge APIs"],
  },
  {
    id: "study-mate",
    title: "Study Mate Adaptive Learning Hub",
    arabicTitle: "منصة ستادي ميت للتعليم والتعلم التفاعلي (EdTech)",
    category: "Full-Stack",
    keywords: ["learning", "student", "education", "courses", "edtech", "school", "study", "university", "quiz", "lms"],
    arabicKeywords: ["تعليم", "كورسات", "طلاب", "دراسة", "منصة تعليمية", "مدارس", "جامعة", "امتحانات", "كويزات"],
    description: "A student collaboration and adaptive learning hub with structured study group rooms, real-time messaging, task boards, and academic resource hubs.",
    arabicDescription: "منصة تعليم تفاعلية تتيح إنشاء فصول دراسية، وجداول مهام للطلاب، وتبادل المصادر العلمية والاختبارات.",
    solutionHighlight: "Interactive LMS architecture connecting students with instructors and collaborative peer groups.",
    tech: ["TypeScript", "React", "ASP.NET", "PostgreSQL"],
    image: "/assets/real-projects/study-mate.png",
    demoUrl: "https://study-mate-blush.vercel.app",
    githubUrl: "https://github.com/superiorshipet/study-mate",
    features: ["Virtual Study Rooms", "Resource & PDF Sharing", "Group Assignment Trackers", "Interactive Discussion"],
  },
  {
    id: "discover-madina",
    title: "Discover Madina Cultural Tourism Portal",
    arabicTitle: "بوابة اكتشف المدينة للسياحة والخرائط التفاعلية",
    category: "Full-Stack",
    keywords: ["tourism", "travel", "guide", "city", "map", "places", "booking", "hotels", "attractions"],
    arabicKeywords: ["سياحة", "سفر", "مرشد", "فنادق", "حجز", "خريطة", "معالم", "مدينة", "اماكن"],
    description: "A comprehensive cultural tourism platform with interactive landmark discovery, itinerary planning, geolocation maps, and realtime tourist services.",
    arabicDescription: "بوابة سياحية غنية تستعرض معالم المدينة وتوفر خرائط تفاعلية وجداول رحلات مخصصة وخدمات استكشاف.",
    solutionHighlight: "Geolocation-based landmark engine with rich media presentation and bilingual tour itineraries.",
    tech: ["C#", "React", "PostgreSQL", "WebSocket"],
    image: "/assets/real-projects/discover-madina.png",
    demoUrl: "https://discover-madina.duckdns.org/",
    githubUrl: "https://github.com/superiorshipet/discover-madina",
    features: ["Interactive Map Layers", "Curated Itinerary Planner", "Landmark Audio & Media Guide", "Visitor Review Hub"],
  },
  {
    id: "telegram-bot",
    title: "Automated Training & Community Telegram Bot",
    arabicTitle: "بوت تيليجرام تفاعلي لإدارة التدريب والتعليم التلقائي",
    category: "Systems & ML",
    keywords: ["telegram", "bot", "automation", "quiz", "workflow", "training", "channel", "python", "script"],
    arabicKeywords: ["بوت", "تيليجرام", "تلجرام", "اتمتة", "اختبارات", "تدريب", "بوتات", "رد الي", "رد آلي"],
    description: "An automated training bot delivering scheduled courses, interactive quizzes, automated grading, and learner progress tracking directly via Telegram.",
    arabicDescription: "بوت تيليجرام ذكي يقوم بإرسال المحتوى التعليمي تلقائياً وإجراء الاختبارات التفاعلية وحساب الدرجات.",
    solutionHighlight: "Serverless-capable Telegram automation daemon handling complex multi-step user conversational states.",
    tech: ["Python", "Telegram API", "Automation", "SQLite"],
    image: "/assets/real-projects/telegram-bot.png",
    githubUrl: "https://github.com/superiorshipet/telegram_training_bot",
    features: ["Automated Quiz Flows", "Instant Grading & Feedback", "User Progress Database", "Scheduled Content Delivery"],
  },
  {
    id: "stunning-task",
    title: "High-Throughput Microservice & API Layer",
    arabicTitle: "طبقة خدمات وواجهات برمجية عالية الأداء (Microservices & APIs)",
    category: "Backend & APIs",
    keywords: ["api", "microservice", "performance", "throughput", "architecture", "docker", "backend", "rest api", "high traffic"],
    arabicKeywords: ["اي بي اي", "باك اند", "مايكروسيرفس", "خدمات", "سرعة", "ضغط عالي", "داتا بيز", "ربط انظمة"],
    description: "High-performance full-stack service layer built on .NET with a reactive client, optimized DB queries, and containerized deployment.",
    arabicDescription: "بنية تحتية برمجية ذات كفاءة فائقة مصممة لتحمل ملايين الطلبات وسرعة استجابة متناهية الدقة.",
    solutionHighlight: "Enterprise-grade REST architecture with query optimization, Docker containerization, and rate-limiting.",
    tech: ["C#", "ASP.NET Core", "React", "Docker"],
    image: "/assets/real-projects/stunning-task.png",
    demoUrl: "https://tasharuky.duckdns.org/stunning.io-task/",
    githubUrl: "https://github.com/superiorshipet/stunning.io-task",
    features: ["Sub-10ms Database Queries", "Docker Container Orchestration", "Structured Error Telemetry", "RESTful Contract Specs"],
  },
];

export type ConversationalIntent =
  | "how_are_you"
  | "greeting"
  | "who_are_you"
  | "about_mohamed"
  | "gratitude"
  | "pricing"
  | "contact_whatsapp";

const STOP_WORDS = new Set([
  "how", "are", "you", "and", "the", "for", "with", "have", "need", "want", "like", "can",
  "what", "who", "when", "where", "why", "this", "that", "from", "is", "it", "to", "in",
  "on", "at", "by", "or", "an", "be", "do", "we", "i", "me", "my", "your", "ur", "u", "r",
  "please", "tell", "about", "some", "any", "good", "fine", "ok", "okay",
  "انا", "عايز", "محتاج", "في", "من", "على", "عن", "مع", "هل", "هو", "هي", "لو", "ايه", "اي", "شو", "ليه", "مين", "كام"
]);

export function getConversationalIntent(query: string): ConversationalIntent | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  // 1. How are you / Status
  if (
    /^(how\s*(are|r)\s*(u|you)|how('s|s)\s*it\s*going|how\s*do\s*you\s*do|what('s|s)\s*up|whats\s*up|sup)(\b|[?!.])/i.test(q) ||
    /^(ازيك|عامل ايه|عامل إيه|اخبارك|أخبارك|كيف حالك|كيفك|شخبارك|شلونك|تمام\?|كله تمام)(\b|[?!.])/i.test(q) ||
    q === "how are u" ||
    q === "how are you" ||
    q === "how r u" ||
    q === "ازيك" ||
    q === "عامل ايه" ||
    q === "اخبارك" ||
    q === "كيف حالك"
  ) {
    return "how_are_you";
  }

  // 2. Greetings
  if (
    /^(hi|hello|hey|hiya|yo|greetings|good\s*(morning|afternoon|evening|day))(\b|[?!.])/i.test(q) ||
    /^(اهلا|أهلا|اهلين|مرحبا|مرحباً|سلام|السلام عليكم|سلام عليكم|صباح الخير|مساء الخير|هلا|هاي)(\b|[?!.])/i.test(q) ||
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q === "سلام" ||
    q === "مرحبا" ||
    q === "اهلا"
  ) {
    return "greeting";
  }

  // 3. Who are you / Bot identity
  if (
    /(who\s*(are|r)\s*(u|you)|what\s*(are|r)\s*(u|you)|what\s*can\s*you\s*do|tell\s*me\s*about\s*yourself|what\s*is\s*this\s*bot)/i.test(q) ||
    /(مين انت|انت مين|أنت مين|مين حضرتك|بتعمل ايه|شو وظيفتك|عرفني بنفسك|من أنت|من انت)/i.test(q)
  ) {
    return "who_are_you";
  }

  // 4. About Mohamed Shipet
  if (
    /(who\s*is\s*(mohamed|mohammad|muhamed|shipet)|about\s*(mohamed|shipet)|who\s*made\s*you|who\s*created\s*you)/i.test(q) ||
    /(مين محمد|مين شيبت|من هو محمد|من محمد|معلومات عن محمد|مين صاحب الموقع)/i.test(q)
  ) {
    return "about_mohamed";
  }

  // 5. Gratitude / Thanks
  if (
    /^(thanks|thank\s*you|thx|appreciate\s*it|great\s*job|perfect|awesome)(\b|[?!.])/i.test(q) ||
    /^(شكرا|شكراً|تسلم|مشكور|الله يعطيك العافية|الف شكر|ألف شكر|تسلم ايدك)(\b|[?!.])/i.test(q)
  ) {
    return "gratitude";
  }

  // 6. Pricing / Rates
  if (
    /(how\s*much|pricing|price|cost|quote|rates|budget)/i.test(q) ||
    /(بكام|كم السعر|السعر|الاسعار|الأسعار|التكلفة|الميزانية)/i.test(q)
  ) {
    return "pricing";
  }

  // 7. Contact / WhatsApp
  if (
    /(whatsapp|whats\s*app|phone|call|contact|reach\s*out|talk\s*to\s*mohamed|hire|chat\s*on\s*whatsapp)/i.test(q) ||
    /(واتس|واتساب|تواصل|اتصال|رقم|تليفون|موبايل|تواصل عبر واتساب|كلمني|كلم محمد)/i.test(q)
  ) {
    return "contact_whatsapp";
  }

  return null;
}

export function getConversationalResponse(
  intent: ConversationalIntent,
  isArabic: boolean
): { text: string; suggestedReplies: string[]; whatsappUrl?: string } {
  switch (intent) {
    case "how_are_you":
      return isArabic
        ? {
            text: "الحمد لله بخير وكله تمام، تسلم لذوقك وسؤالك! ⚡\n\nأنا المستشار الذكي لمشاريع محمد شيبت. أقدر أساعدك في هندسة فكرتك البرمجية، واقتراح نماذج جاهزة وحية اشتغلنا عليها، أو تحضير متطلبات مشروعك فوراً. إيه فكرة المشروع أو السيستم اللي بتفكر فيه؟",
            suggestedReplies: [
              "عايز متجر إلكتروني",
              "محتاج نظام إدارة ومهمات",
              "محتاج شات ومحادثات فورية",
              "عندي فكرة مشروع مخصصة",
            ],
          }
        : {
            text: "I'm doing great and running at full speed! ⚡ Thank you for asking.\n\nI'm Mohamed Shipet's AI Project Advisor. I'm here to help you scope ideas, explore existing software architectures, or inspect live production systems. How can I assist you with your project today?",
            suggestedReplies: [
              "Show me E-Commerce projects",
              "Need a Realtime Web App",
              "Need an Automated Bot / Script",
              "I have a custom project idea...",
            ],
          };

    case "greeting":
      return isArabic
        ? {
            text: "أهلاً وسهلاً بك! 👋 منوّر في موقع محمد شيبت. أنا مستشارك التقني الذكي.\n\nسواء كنت محتاج تبني متجر إلكتروني، سيستم إدارة ERP، نظام شات فوري، أو مايكروسيرفس سريعة، أقدر أساعدك وأوريك نماذج حية شغالة. حابب نبدأ بأي نوع من الأنظمة؟",
            suggestedReplies: [
              "محتاج متجر إلكتروني",
              "محتاج نظام إدارة مهام وفريق",
              "محتاج شات فوري ومراسلات",
              "عندي فكرة منتج جديد",
            ],
          }
        : {
            text: "Hello! 👋 Welcome to Mohamed Shipet's portfolio. I'm his AI Project Advisor.\n\nWhether you're looking for a high-performance backend, a modern full-stack web application, or an enterprise ERP, I can help you find relevant live demos and prepare a technical brief. What are you looking to build?",
            suggestedReplies: [
              "I need an E-Commerce Store",
              "I need a Task / CRM Platform",
              "I need a Realtime Chat System",
              "I have a custom product idea...",
            ],
          };

    case "who_are_you":
      return isArabic
        ? {
            text: "أنا المستشار التقني الذكي لمحمد شيبت 🤖\n\nدوري أسمع فكرة تطبيقك أو مشروعك، وأطابقها مع أكثر من 16 مشروعاً حياً ومبنياً بأحدث التقنيات (.NET, React, TypeScript, PHP, Python)، وأجمعلك ملخصاً تقنياً منظماً تقدر تبعته مباشرة لمحمد لبدء التنفيذ فوراً.",
            suggestedReplies: [
              "استعرض أهم المشاريع",
              "إيه التقنيات اللي بتشتغلوا بيها؟",
              "عندي مشروع عايز أنفذه",
            ],
          }
        : {
            text: "I am Mohamed Shipet's AI Project Advisor & System Architect 🤖\n\nMy role is to discuss your software ideas, match your needs against 16+ real production projects Mohamed has built (.NET, React, TypeScript, PHP, Python), and assemble a clean project brief that you can send directly to Mohamed for kickoff.",
            suggestedReplies: [
              "Show me top projects",
              "What tech stacks do you use?",
              "I have a project to build",
            ],
          };

    case "about_mohamed":
      return isArabic
        ? {
            text: "محمد شيبت هو مهندس برمجيات Full-Stack ومتخصص في الـ Backend وهندسة الأنظمة الموزعة (.NET Core, C#, React, TypeScript, PostgreSQL, Docker, WebSockets).\n\nقام بتصميم وتنفيذ أنظمة حيوية مثل ERP الصيدليات والمنشآت الطبية، ومايكروسيرفس عالية الضغط، ومتاجر إلكترونية راقية، وأنظمة محادثات وبث صوتي لحظية.",
            suggestedReplies: [
              "استعراض مشاريع محمد",
              "التواصل عبر واتساب",
              "عايز أبدأ مشروعي",
            ],
          }
        : {
            text: "Mohamed Shipet is a Full-Stack Engineer and Backend Specialist with deep expertise in scalable distributed systems (.NET Core, ASP.NET, C#, React, PostgreSQL, Docker, and IoT/WebSockets).\n\nHe has architected mission-critical pharmacy ERPs, high-throughput microservices, Scandinavian luxury commerce platforms, and real-time streaming engines.",
            suggestedReplies: [
              "View Mohamed's projects",
              "Contact on WhatsApp",
              "I want to start a project",
            ],
          };

    case "gratitude":
      return isArabic
        ? {
            text: "العفو، تسلم يا رب ودايماً في الخدمة! 😊 في أي وقت تحب تناقش فكرة مشروعك أو تبدأ فيه، أنا هنا وجاهز لمساعدتك.",
            suggestedReplies: [
              "معاينة النماذج الحية",
              "التواصل على واتساب",
            ],
          }
        : {
            text: "You're very welcome! 😊 Whenever you have a project idea, questions about architecture, or want to discuss timelines, just let me know.",
            suggestedReplies: [
              "Check live demos",
              "Send WhatsApp message",
            ],
          };

    case "pricing":
      return isArabic
        ? {
            text: "تحديد التكلفة بيعتمد على حجم المشروع، وبوابات الدفع والربط المطلوب، وسرعة التسليم.\n\nتقدر توصف الميزات الأساسية لمشروعك عشان أجمعلك المتطلبات، أو تضغط للتحويل مباشرة إلى واتساب لمناقشة السعر والمواعيد مع محمد!",
            suggestedReplies: [
              "تسليم خلال أسبوعين إلى شهر",
              "مشروع متكامل للشركات",
              "تواصل عبر واتساب",
            ],
            whatsappUrl: "https://wa.me/201285544547?text=" + encodeURIComponent("مرحباً محمد، حابب أستفسر عن تقدير تكلفة ووقت تنفيذ مشروع برمجيات."),
          }
        : {
            text: "Pricing is determined by your system scope, required integrations (e.g. payment gateways, real-time sockets, ERP database scale), and launch timeline.\n\nTell me the core features you need, or click below to connect with Mohamed directly on WhatsApp for an accurate quote!",
            suggestedReplies: [
              "I need MVP in 2-4 weeks",
              "Need complete enterprise system",
              "Connect on WhatsApp",
            ],
            whatsappUrl: "https://wa.me/201285544547?text=" + encodeURIComponent("Hi Mohamed, I would like to get a quote and timeline estimation for a software project."),
          };

    case "contact_whatsapp":
      return isArabic
        ? {
            text: "تقدر تتواصل مباشرة مع محمد شيبت على واتساب في أي وقت لمناقشة مشروعك أو طلب استشارة تقنية سريعة:\n\n📱 **واتساب:** +20 128 554 4547\n\nاضغط على الزر أدناه لبدء المحادثة فوراً:",
            suggestedReplies: [
              "استعراض مشاريع سابقة",
              "عندي فكرة مشروع جديد",
              "نظام إدارة أو ERP",
            ],
            whatsappUrl: "https://wa.me/201285544547?text=" + encodeURIComponent("مرحباً محمد، حابب أناقش معاك مشروع جديد."),
          }
        : {
            text: "You can connect directly with Mohamed Shipet on WhatsApp anytime to discuss your project or explore technical feasibility:\n\n📱 **WhatsApp:** +20 128 554 4547\n\nClick the button below to start a chat directly:",
            suggestedReplies: [
              "Show me past projects",
              "I have a new product idea",
              "Need an ERP or CRM platform",
            ],
            whatsappUrl: "https://wa.me/201285544547?text=" + encodeURIComponent("Hi Mohamed, I would like to discuss a software project with you."),
          };

    default:
      return {
        text: isArabic
          ? "يسعدني مساعدتك! كيف يمكنني دعم مشروعك اليوم؟"
          : "I'm happy to help! How can I assist with your software project today?",
        suggestedReplies: [
          "Explore live projects",
          "I have a product idea",
        ],
      };
  }
}

export interface ScopeBreakdown {
  domain: string;
  arabicDomain: string;
  suggestedItems: string[];
  arabicSuggestedItems: string[];
}

export function analyzeCustomIdea(query: string): ScopeBreakdown {
  const q = query.toLowerCase();

  if (/restaurant|cafe|food|pizza|burger|coffee|dining|bakery|مطعم|كافيه|مقهى|مقهي|اكل|أكل|طعام|وجبات/i.test(q)) {
    return {
      domain: "Restaurant & Cafe Website",
      arabicDomain: "موقع وتطبيق مطعم أو كافيه",
      suggestedItems: [
        "Interactive Digital Menu with Dish Categories & Pricing",
        "Online Food Ordering & Direct WhatsApp Checkout",
        "Table Reservation System with Date/Time Picker",
        "Google Maps Branch Location, Opening Hours & Reviews",
      ],
      arabicSuggestedItems: [
        "منيو رقمي تفاعلي مع تصنيف الأطباق والأسعار والصور",
        "نظام طلبات أونلاين مع تحويل الطلب فوراً للواتساب",
        "نظام حجز طاولات تفاعلي لتحديد التاريخ والوقت وعدد الأفراد",
        "موقع الفروع على خرائط جوجل، ساعات العمل، وتقييمات العملاء",
      ],
    };
  }

  if (/real\s*estate|property|properties|apartment|villa|broker|عقار|عقارات|شقق|فيلا|سمسار|مكتب عقاري/i.test(q)) {
    return {
      domain: "Real Estate & Property Platform",
      arabicDomain: "منصة عقارات وإدارة وحدات سكنية",
      suggestedItems: [
        "Property Listings with Filters (Price, Location, Bedrooms)",
        "High-Resolution Photo Galleries & Virtual Tour Ingestion",
        "Lead Ingestion Forms & Instant WhatsApp Inquiry Button",
        "Admin Portal to Add/Edit/Archive Property Listings",
      ],
      arabicSuggestedItems: [
        "دليل عقارات تفاعلي مع فلترة متقدمة (السعر، المنطقة، المساحة)",
        "معرض صور عالي الدقة ومخططات للوحدات السكنية",
        "نماذج استقبال استفسارات العملاء والتواصل الفوري عبر واتساب",
        "لوحة تحكم سهلة لإضافة وتعديل وحذف العقارات",
      ],
    };
  }

  if (/clinic|doctor|hospital|dental|medical|patient|عيادة|طبيب|دكتور|اسنان|أسنان|مستوصف/i.test(q)) {
    return {
      domain: "Medical Clinic & Healthcare Portal",
      arabicDomain: "موقع عيادة أو مركز طبي",
      suggestedItems: [
        "Specialties, Doctors & Services Directory",
        "Patient Online Appointment Booking Calendar",
        "Clinic Locations, Working Hours & Emergency Contacts",
        "Patient FAQs & WhatsApp Quick Consultation Channel",
      ],
      arabicSuggestedItems: [
        "دليل التخصصات الطبية والأطباء والخدمات العلاجية",
        "جدول مواعيد تفاعلي لحجز كشف ومواعيد العيادة بسهولة",
        "مواقع العيادات، مواعيد العمل، وأرقام الطوارئ",
        "قناة تواصل سريعة عبر واتساب لاستفسارات المرضى المباشرة",
      ],
    };
  }

  if (/gym|fitness|workout|trainer|crossfit|جيم|لياقة|رياضة|مدرب/i.test(q)) {
    return {
      domain: "Fitness & Gym Platform",
      arabicDomain: "موقع مركز لياقة بدنية أو جيم",
      suggestedItems: [
        "Membership Plans & Online Subscription Purchases",
        "Trainer Profiles & Weekly Class Schedule Grid",
        "Facility Photo Tour & Equipment Highlights",
        "Free Trial Request Form & Direct WhatsApp Contact",
      ],
      arabicSuggestedItems: [
        "باقات الاشتراك والعضويات مع إمكانية الدفع والتسجيل",
        "جداول الحصص والتمارين الأسبوعية والمدربين",
        "جولة مصورة في الصالة الرياضية والأجهزة المتاحة",
        "طلب حصة تجريبية مجانية وتواصل سريع عبر واتساب",
      ],
    };
  }

  if (/law|legal|attorney|lawyer|محامي|استشارات قانونية|قانون/i.test(q)) {
    return {
      domain: "Legal Practice & Law Firm Website",
      arabicDomain: "موقع مكتب محاماة واستشارات قانونية",
      suggestedItems: [
        "Practice Areas & Legal Case Overview",
        "Confidential Legal Consultation Booking Flow",
        "Attorney Profiles & Track Record of Success",
        "Direct WhatsApp & Encrypted Inquiry Form",
      ],
      arabicSuggestedItems: [
        "استعراض مجالات التخصص والقضايا والاستشارات",
        "حجز جلسة استشارة قانونية بسرية وأمان",
        "السيرة المهنية للمحامين وإنجازات المكتب",
        "نموذج تواصل مشفر وزر استشارة مباشرة عبر واتساب",
      ],
    };
  }

  // Default custom project breakdown
  return {
    domain: "Custom Web Application",
    arabicDomain: "مشروع وتطبيق ويب مخصص",
    suggestedItems: [
      "Modern, Responsive High-Performance Frontend UI",
      "Secure Backend Architecture & Scalable Database",
      "Dedicated Admin Dashboard to Control Content & Workflows",
      "Direct WhatsApp & Automated Notifications Integration",
    ],
    arabicSuggestedItems: [
      "واجهة مستخدم عصرية وسريعة جداً متجاوبة مع كافة الشاشات",
      "بنية تحتية برمجية آمنة للـ Backend وقاعدة بيانات سريعة",
      "لوحة تحكم إدارية خاصة لإدارة المحتوى والبيانات وسير العمل",
      "ربط مباشر مع واتساب والإشعارات وبوابات الدفع الإلكترونية",
    ],
  };
}

function matchesWordBoundary(text: string, term: string): boolean {
  if (!term) return false;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(^|[^\\w\\u0600-\\u06FF])${escaped}([^\\w\\u0600-\\u06FF]|$)`, "i");
  return regex.test(text);
}

export function findMatchingProjects(query: string): ProjectSolution[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];

  // If this is purely a conversational or greeting query, do not falsely match projects
  if (getConversationalIntent(query) !== null) {
    return [];
  }

  const words = normalized
    .split(/\s+/)
    .map((w) => w.replace(/[^\w\u0600-\u06FF]/g, ""))
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));

  if (words.length === 0 && normalized.length < 5) {
    return [];
  }

  const scored = projectKnowledgeBase.map((proj) => {
    let score = 0;

    if (normalized.includes(proj.title.toLowerCase()) || normalized.includes(proj.arabicTitle.toLowerCase())) {
      score += 25;
    }

    for (const kw of proj.keywords) {
      if (matchesWordBoundary(normalized, kw)) {
        score += 8;
      }
      for (const word of words) {
        if (word === kw) {
          score += 6;
        } else if (
          word.length >= 4 &&
          (word === kw + "s" || kw === word + "s" || word === kw + "es" || kw === word + "es")
        ) {
          score += 3;
        }
      }
    }

    for (const akw of proj.arabicKeywords) {
      if (matchesWordBoundary(normalized, akw)) {
        score += 10;
      }
      for (const word of words) {
        if (word === akw) {
          score += 8;
        }
      }
    }

    for (const t of proj.tech) {
      if (matchesWordBoundary(normalized, t.toLowerCase())) {
        score += 5;
      }
    }

    // High precision domain boost for exact terms
    if (
      (words.includes("crm") || matchesWordBoundary(normalized, "crm") || matchesWordBoundary(normalized, "سي ار ام")) &&
      proj.id === "luxira-crm"
    ) {
      score += 35;
    }
    if (
      (words.includes("erp") || matchesWordBoundary(normalized, "erp") || matchesWordBoundary(normalized, "اي ار بي") || matchesWordBoundary(normalized, "تخطيط موارد")) &&
      proj.id === "pharmacy"
    ) {
      score += 35;
    }
    if (
      (words.includes("ats") || matchesWordBoundary(normalized, "ats") || matchesWordBoundary(normalized, "توظيف")) &&
      proj.id === "ats-website"
    ) {
      score += 25;
    }
    if (
      (words.includes("iot") || matchesWordBoundary(normalized, "iot") || matchesWordBoundary(normalized, "انترنت الاشياء")) &&
      proj.id === "supvend"
    ) {
      score += 25;
    }

    return { project: proj, score };
  });

  // Only return as existing matching project if score is solid (>= 12)
  return scored
    .filter((s) => s.score >= 12)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.project);
}
