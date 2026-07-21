export type TopicLevel = "Beginner" | "Intermediate";

export type LearnTopic = {
  id: string;
  name: string;
  builds: string;
  level: TopicLevel;
  track: TrackId;
  free?: boolean;
  /** Public lesson URL when content exists */
  href?: string;
};

export type TrackId =
  | "foundations"
  | "languages"
  | "frontend"
  | "mobile"
  | "backend"
  | "cybersecurity";

export type LearnTrack = {
  id: TrackId;
  name: string;
  blurb: string;
};

export type LearningPath = {
  id: string;
  name: string;
  forWho: string;
  topicIds: string[];
};

export const learnTracks: LearnTrack[] = [
  {
    id: "foundations",
    name: "Foundations",
    blurb: "Start here — understand programming and how software fits together.",
  },
  {
    id: "languages",
    name: "Languages & AI",
    blurb: "Core languages plus how to code effectively with AI tools.",
  },
  {
    id: "frontend",
    name: "Frontend / Web",
    blurb: "Build websites, dashboards, and product UIs people use every day.",
  },
  {
    id: "mobile",
    name: "Mobile",
    blurb: "Ship Android and iOS apps — cross-platform or native.",
  },
  {
    id: "backend",
    name: "Backend & Data",
    blurb: "APIs, servers, and databases that power real products.",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    blurb: "Secure coding, threat modeling, and defending real applications.",
  },
];

export const learnTopics: LearnTopic[] = [
  // Foundations
  {
    id: "what-is-programming",
    name: "What is programming?",
    builds: "What code is, why it exists, and how programmers think.",
    level: "Beginner",
    track: "foundations",
    free: true,
    href: "/learn/what-is-programming",
  },
  {
    id: "how-software-works",
    name: "How software works",
    builds: "Apps, servers, databases, and how frontends talk to backends.",
    level: "Beginner",
    track: "foundations",
    free: true,
    href: "/learn/how-software-works",
  },
  {
    id: "programming-basics",
    name: "Software programming basics",
    builds: "Logic, problem-solving, and how a real project is structured.",
    level: "Beginner",
    track: "foundations",
  },
  {
    id: "git",
    name: "Git & version control",
    builds: "How teams save, share, and ship code safely.",
    level: "Beginner",
    track: "foundations",
  },
  // Languages & AI
  {
    id: "javascript",
    name: "JavaScript",
    builds: "Interactive websites and the language behind most web apps.",
    level: "Beginner",
    track: "languages",
  },
  {
    id: "python",
    name: "Python",
    builds: "Scripts, automation, and a clean first programming language.",
    level: "Beginner",
    track: "languages",
  },
  {
    id: "ai-coding",
    name: "AI-assisted coding",
    builds: "Prompt, review AI output, and ship safely with modern AI tools.",
    level: "Beginner",
    track: "languages",
  },
  // Frontend
  {
    id: "nextjs",
    name: "Next.js",
    builds: "Modern websites, SaaS dashboards, and full web products.",
    level: "Intermediate",
    track: "frontend",
  },
  {
    id: "vue",
    name: "Vue.js",
    builds: "Fast, component-based web UIs and single-page apps.",
    level: "Intermediate",
    track: "frontend",
  },
  {
    id: "javascript-applied",
    name: "JavaScript (applied)",
    builds: "Browser UI, calling APIs, and real product behavior.",
    level: "Intermediate",
    track: "frontend",
  },
  // Mobile
  {
    id: "flutter",
    name: "Flutter",
    builds: "Cross-platform Android + iOS apps from one codebase.",
    level: "Intermediate",
    track: "mobile",
  },
  {
    id: "swift",
    name: "Swift",
    builds: "Native iOS apps ready for the App Store.",
    level: "Intermediate",
    track: "mobile",
  },
  // Backend
  {
    id: "nodejs",
    name: "Node.js",
    builds: "Server-side JavaScript that powers APIs and tools.",
    level: "Intermediate",
    track: "backend",
  },
  {
    id: "express",
    name: "Express.js",
    builds: "REST APIs and Node.js backends for web and mobile.",
    level: "Intermediate",
    track: "backend",
  },
  {
    id: "elixir",
    name: "Elixir",
    builds: "Concurrent, reliable backends for realtime and high-load systems.",
    level: "Intermediate",
    track: "backend",
  },
  {
    id: "python-backend",
    name: "Python (backend)",
    builds: "APIs, data tools, and automation services.",
    level: "Intermediate",
    track: "backend",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    builds: "Real product databases — schemas, queries, and relations.",
    level: "Intermediate",
    track: "backend",
  },
  {
    id: "firebase",
    name: "Firebase",
    builds: "Auth, cloud data, and backend services — great with mobile apps.",
    level: "Intermediate",
    track: "backend",
  },
  {
    id: "rest",
    name: "REST APIs",
    builds: "How frontends and mobile apps talk to servers.",
    level: "Beginner",
    track: "backend",
  },
  // Cybersecurity
  {
    id: "secure-coding",
    name: "Secure coding basics",
    builds: "Write safer code — input validation, secrets, and common mistakes.",
    level: "Beginner",
    track: "cybersecurity",
  },
  {
    id: "owasp-top10",
    name: "OWASP Top 10",
    builds: "Recognize and fix the most common web application vulnerabilities.",
    level: "Intermediate",
    track: "cybersecurity",
  },
  {
    id: "auth-threats",
    name: "Authentication threats",
    builds: "Sessions, tokens, MFA, and attacks against login systems.",
    level: "Intermediate",
    track: "cybersecurity",
  },
  {
    id: "security-testing",
    name: "Security testing",
    builds: "Static analysis, dependency scanning, and penetration testing basics.",
    level: "Intermediate",
    track: "cybersecurity",
  },
];

export const learningPaths: LearningPath[] = [
  {
    id: "beginner",
    name: "Beginner",
    forWho: "Never coded before — start free, then grow.",
    topicIds: [
      "what-is-programming",
      "how-software-works",
      "programming-basics",
      "javascript",
      "python",
      "git",
    ],
  },
  {
    id: "frontend",
    name: "Frontend · Web",
    forWho: "Want websites, dashboards, and web product UIs.",
    topicIds: ["javascript", "javascript-applied", "nextjs", "vue", "rest"],
  },
  {
    id: "mobile-flutter",
    name: "Mobile · Flutter",
    forWho: "One codebase for Android and iOS — with Firebase for data & auth.",
    topicIds: [
      "what-is-programming",
      "how-software-works",
      "flutter",
      "firebase",
    ],
  },
  {
    id: "mobile-ios",
    name: "Mobile · iOS",
    forWho: "Native Apple apps with Swift.",
    topicIds: ["what-is-programming", "how-software-works", "swift", "firebase"],
  },
  {
    id: "backend",
    name: "Backend",
    forWho: "APIs, servers, and databases.",
    topicIds: ["javascript", "python", "nodejs", "express", "elixir", "postgres", "rest"],
  },
  {
    id: "fullstack-web",
    name: "Full-stack · Web",
    forWho: "End-to-end web products — UI + API + database.",
    topicIds: [
      "what-is-programming",
      "how-software-works",
      "javascript",
      "nextjs",
      "nodejs",
      "express",
      "postgres",
      "git",
    ],
  },
  {
    id: "fullstack-mobile",
    name: "Full-stack · Mobile",
    forWho: "End-to-end mobile products — Flutter app + Firebase backend.",
    topicIds: [
      "what-is-programming",
      "how-software-works",
      "flutter",
      "firebase",
      "git",
    ],
  },
  {
    id: "ai-builder",
    name: "AI builder",
    forWho: "Ship faster with AI — without skipping fundamentals.",
    topicIds: [
      "what-is-programming",
      "how-software-works",
      "ai-coding",
      "javascript",
      "nextjs",
      "flutter",
    ],
  },
  {
    id: "security-track",
    name: "Cybersecurity",
    forWho: "Developers who want to build and defend production systems.",
    topicIds: [
      "what-is-programming",
      "how-software-works",
      "javascript",
      "secure-coding",
      "owasp-top10",
      "auth-threats",
      "security-testing",
    ],
  },
];

export const freeTopics = learnTopics.filter((t) => t.free);

export function topicsForTrack(trackId: TrackId) {
  return learnTopics.filter((t) => t.track === trackId);
}

export function topicById(id: string) {
  return learnTopics.find((t) => t.id === id);
}
