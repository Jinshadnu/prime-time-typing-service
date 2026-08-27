// Centralized Data Store for Professional Software Engineer Portfolio
// Easily update bio, skills, projects, experience, and links here.

export const portfolioData = {
  personal: {
    name: "Alex Rivera",
    role: "Senior Full Stack Engineer & System Architect",
    tagline: "Architecting Scalable Web Applications, Microservices & AI Solutions",
    bio: "Passionate engineer with 7+ years of experience building high-throughput web applications, cloud-native distributed microservices, and AI-driven workflow engines. Dedicated to clean architecture, developer experience, and elegant UI design.",
    location: "San Francisco, CA (Open to Remote Worldwide)",
    availability: "Available for Senior / Lead Roles",
    availabilityStatus: "available", // 'available' | 'busy'
    resumeUrl: "#",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "alex.rivera.dev@example.com",
      phone: "+1 (555) 234-5678"
    }
  },

  metrics: [
    { label: "Years Experience", value: "7+", color: "from-cyan-400 to-blue-500" },
    { label: "Production Apps", value: "40+", color: "from-purple-400 to-pink-500" },
    { label: "System Uptime", value: "99.99%", color: "from-emerald-400 to-teal-500" },
    { label: "Active Users Served", value: "2M+", color: "from-amber-400 to-orange-500" }
  ],

  cliCommands: {
    whoami: "Alex Rivera — Senior Full Stack & Cloud Architect",
    skills: ["React 19", "Next.js 15", "TypeScript", "Node.js", "Go", "Python", "Kubernetes", "PostgreSQL", "GraphQL"],
    currentFocus: "Building real-time AI agents & high-performance edge compute platforms",
    contact: "alex.rivera.dev@example.com"
  },

  skillCategories: [
    { id: "all", name: "All Technologies" },
    { id: "frontend", name: "Frontend Engineering" },
    { id: "backend", name: "Backend & Systems" },
    { id: "cloud", name: "Cloud & DevOps" },
    { id: "ai", name: "AI & Data Engineering" }
  ],

  skills: [
    // Frontend
    { name: "React 19 / Next.js", category: "frontend", level: 96, icon: "Code2", experience: "6 Yrs", description: "SSR, ISR, Server Components, State Architecture" },
    { name: "TypeScript / JavaScript", category: "frontend", level: 98, icon: "FileCode2", experience: "7 Yrs", description: "Strict Type Systems, Metaprogramming, ESM" },
    { name: "Tailwind CSS & WebGL", category: "frontend", level: 92, icon: "Palette", experience: "5 Yrs", description: "Custom UI Design Systems, Micro-animations, Shader Canvas" },
    { name: "GraphQL & REST APIs", category: "frontend", level: 94, icon: "Network", experience: "6 Yrs", description: "Apollo Client, React Query, Schema Federation" },

    // Backend
    { name: "Node.js & Express / NestJS", category: "backend", level: 95, icon: "Server", experience: "7 Yrs", description: "Event Loop Optimization, Stream Processing, Cluster Mode" },
    { name: "Go (Golang)", category: "backend", level: 88, icon: "Cpu", experience: "4 Yrs", description: "High-concurrency Goroutines, gRPC Services, Microservices" },
    { name: "Python & FastAPI", category: "backend", level: 90, icon: "Terminal", experience: "5 Yrs", description: "Async I/O, Data Processing, LangChain Integration" },
    { name: "PostgreSQL & Redis", category: "backend", level: 92, icon: "Database", experience: "6 Yrs", description: "Query Optimization, Indexing, Caching Patterns, Pub/Sub" },

    // Cloud & DevOps
    { name: "Docker & Kubernetes", category: "cloud", level: 90, icon: "Container", experience: "5 Yrs", description: "Containerization, Helm Charts, Cluster Orchestration" },
    { name: "AWS & GCP Cloud", category: "cloud", level: 93, icon: "Cloud", experience: "6 Yrs", description: "Lambda, ECS, S3, CloudFront, Terraform IaC" },
    { name: "CI/CD & GitHub Actions", category: "cloud", level: 94, icon: "Workflow", experience: "6 Yrs", description: "Automated Testing Pipelines, Zero-downtime Deployments" },

    // AI & Data
    { name: "OpenAI & Claude API Integration", category: "ai", level: 91, icon: "Sparkles", experience: "3 Yrs", description: "LLM Prompt Engineering, RAG Pipelines, Vector Search" },
    { name: "Pinecone / Qdrant Vector DB", category: "ai", level: 86, icon: "Brain", experience: "2 Yrs", description: "Embedding Retrieval, Semantic Search Engines" }
  ],

  projects: [
    {
      id: "prj-1",
      title: "PulseAnalytics — Real-Time Cloud Monitoring Platform",
      subtitle: "High-throughput log visualization dashboard processing 50k events/sec",
      category: "web",
      featured: true,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      tags: ["React 19", "Go", "WebSockets", "TimescaleDB", "Tailwind CSS"],
      metrics: "50k events/sec • < 20ms Latency",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      architecture: {
        summary: "Architected a distributed telemetry pipeline processing high-frequency server logs with real-time websocket pushes to a canvas-rendered dashboard.",
        highlights: [
          "Implemented WebGL chart rendering reducing CPU usage by 60% during high event spikes.",
          "Designed Go worker pools with Redis Pub/Sub backpressure buffers.",
          "Sub-second alert notification engine reaching 99.99% reliability."
        ]
      }
    },
    {
      id: "prj-2",
      title: "MindCraft AI — Autonomous Agent Workflow Builder",
      subtitle: "Drag-and-drop visual node builder for multi-agent LLM pipelines",
      category: "ai",
      featured: true,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: ["Next.js 15", "Python FastAPI", "LangChain", "Pinecone", "Tailwind"],
      metrics: "10x Workflow Speedup • 150k Query Invocations",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      architecture: {
        summary: "Created a visual node-graph orchestration tool powering automated document intelligence and customer service agents.",
        highlights: [
          "Built interactive canvas using React Flow with custom state history & undo/redo manager.",
          "Integrated hybrid vector search with Pinecone and OpenAI embeddings for instant RAG responses.",
          "Streamed response outputs token-by-token using Server-Sent Events (SSE)."
        ]
      }
    },
    {
      id: "prj-3",
      title: "OmniStore — Global Distributed E-Commerce Gateway",
      subtitle: "Headless commerce platform handling $12M+ annual GMV",
      category: "microservices",
      featured: true,
      image: "https://images.unsplash.com/photo-1556742049-0a67daf40955?auto=format&fit=crop&w=1200&q=80",
      tags: ["Node.js", "GraphQL", "Docker", "PostgreSQL", "Stripe Connect"],
      metrics: "$12M+ Processed GMV • 99.99% Uptime",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      architecture: {
        summary: "Designed a modular microservices commerce engine with multi-currency checkout, inventory sync, and multi-tenant seller dashboards.",
        highlights: [
          "Federated GraphQL API gateway aggregating 6 microservices into a single unified endpoint.",
          "Distributed lock mechanism with Redis to prevent double-booking during flash sales.",
          "Automated PCI-compliant Stripe Connect integration for global payouts."
        ]
      }
    },
    {
      id: "prj-4",
      title: "HyperFlight — Real-Time Flight & Aviation Radar",
      subtitle: "Live ADS-B aircraft tracking app with interactive 3D globe visualization",
      category: "web",
      featured: false,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
      tags: ["Three.js", "React", "TypeScript", "WebSockets"],
      metrics: "60 FPS Render • 30k Concurrent Flights tracked",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      architecture: {
        summary: "3D aviation visualization tool rendering thousands of active global aircraft positions updated via WebSocket telemetry.",
        highlights: [
          "Optimized Three.js geometry instancing for 30,000 aircraft mesh elements at smooth 60 FPS.",
          "Spatial indexing using GeoHash trees for rapid flight search."
        ]
      }
    }
  ],

  experience: [
    {
      period: "2023 — Present",
      role: "Lead Full Stack Architect",
      company: "Nexus Technologies Inc.",
      location: "San Francisco, CA",
      description: "Leading a core team of 8 engineers building enterprise SaaS infrastructure, AI integrations, and developer tooling.",
      achievements: [
        "Architected Next.js 15 enterprise platform migration, cutting page load times by 45%.",
        "Designed real-time event streaming pipeline using Kafka and Go microservices handling 2M+ daily requests.",
        "Mentored junior/mid-level engineers and established strict CI/CD quality gates."
      ],
      tech: ["Next.js", "TypeScript", "Go", "Kafka", "AWS", "Docker"]
    },
    {
      period: "2020 — 2023",
      role: "Senior Software Engineer",
      company: "Vanguard Digital Systems",
      location: "San Jose, CA",
      description: "Spearheaded backend architecture and frontend component systems for high-traffic financial applications.",
      achievements: [
        "Re-engineered database layer with PostgreSQL index optimization, reducing query times from 800ms to 42ms.",
        "Created shared Tailwind CSS design token system used across 5 company web products.",
        "Built automated payment reconciliation engine processing over $5M in daily transactions."
      ],
      tech: ["React", "Node.js", "PostgreSQL", "Redis", "GraphQL"]
    },
    {
      period: "2018 — 2020",
      role: "Full Stack Developer",
      company: "Apex Software Labs",
      location: "Austin, TX",
      description: "Developed custom web applications, client portals, and cloud integrations for Fortune 500 clients.",
      achievements: [
        "Delivered 12+ production client web applications on schedule with 100% test coverage.",
        "Integrated Auth0 SSO and OAuth2 security flows across legacy enterprise tools."
      ],
      tech: ["React", "Express.js", "MongoDB", "Docker", "Sass"]
    }
  ],

  testimonials: [
    {
      quote: "Alex is one of the rare engineers who possesses both deep architectural mastery and an incredible eye for product UX. He delivered our core analytics engine 2 weeks ahead of schedule.",
      name: "Marcus Vance",
      title: "VP of Engineering",
      company: "CloudScale Inc.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      quote: "Working with Alex was a game changer for our engineering culture. His expertise in TypeScript and microservices reduced our server infrastructure costs by 35% while improving uptime.",
      name: "Elena Rostova",
      title: "CTO & Co-Founder",
      company: "SynthAI Systems",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    }
  ]
};
