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
    id: "task-management",
    title: "Project Task Management Workspace",
    arabicTitle: "نظام إدارة المشاريع والمهام وسير العمل",
    category: "Full-Stack",
    keywords: ["task", "project", "management", "sprint", "board", "kanban", "team", "collaboration", "workflow", "crm", "jira", "trello", "productivity"],
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
    id: "pharmacy",
    title: "Pharmacy & Medical ERP System",
    arabicTitle: "نظام إدارة الصيدليات والمخزون الطبي",
    category: "Backend & APIs",
    keywords: ["pharmacy", "medicine", "medical", "hospital", "pos", "inventory", "stock", "prescription", "health", "erp", "expiry"],
    arabicKeywords: ["صيدلية", "ادوية", "أدوية", "طبي", "علاج", "مخزن", "مخزون", "صلاحية", "روشتة", "فواتير", "نقطة بيع"],
    description: "Mission-critical pharmacy operations system designed for inventory batch control, sales audits, prescription records, and supplier management.",
    arabicDescription: "نظام عمليات متكامل لإدارة الصيدليات والمنشآت الطبية، وتتبع صلاحيات الأدوية والموردين ومبيعات الـ POS.",
    solutionHighlight: "Robust transactional architecture ensuring zero inventory discrepancies and strict batch tracking.",
    tech: ["C#", "ASP.NET Core", "SQL Server", "Entity Framework"],
    image: "/assets/real-projects/pharmacy.png",
    demoUrl: "https://tasharuky.duckdns.org/pharmacy/",
    githubUrl: "https://github.com/superiorshipet/pharmacy",
    features: ["Batch & Expiry Date Tracking", "Point of Sale (POS) Cashier", "Supplier Purchase Orders", "Financial Auditing"],
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
    keywords: ["api", "microservice", "performance", "throughput", "architecture", "docker", "backend", "rest", "high traffic"],
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

export function findMatchingProjects(query: string): ProjectSolution[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];

  const words = normalized.split(/\s+/).filter((w) => w.length > 1);

  const scored = projectKnowledgeBase.map((proj) => {
    let score = 0;

    if (normalized.includes(proj.title.toLowerCase()) || normalized.includes(proj.arabicTitle.toLowerCase())) {
      score += 15;
    }

    for (const kw of proj.keywords) {
      if (normalized.includes(kw)) {
        score += 6;
      }
      for (const word of words) {
        if (word === kw) score += 4;
        else if (word.includes(kw) || kw.includes(word)) score += 2;
      }
    }

    for (const akw of proj.arabicKeywords) {
      if (normalized.includes(akw)) {
        score += 8;
      }
      for (const word of words) {
        if (word === akw) score += 6;
        else if (word.includes(akw) || akw.includes(word)) score += 3;
      }
    }

    for (const t of proj.tech) {
      if (normalized.includes(t.toLowerCase())) {
        score += 4;
      }
    }

    return { project: proj, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.project);
}
