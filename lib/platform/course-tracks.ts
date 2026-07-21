import type { CourseTrackId } from "./types";

export type CourseTrack = {
  id: CourseTrackId;
  label: string;
  description: string;
  suggestedSkills: string[];
  suggestedOutcomes: string[];
};

export const courseTracks: CourseTrack[] = [
  {
    id: "mobile-cross",
    label: "Mobile · Cross-platform (Flutter)",
    description: "One codebase for Android and iOS with Flutter.",
    suggestedSkills: [
      "Dart",
      "Flutter widgets & navigation",
      "Firebase (Auth, Firestore)",
      "GetX",
      "BLoC",
      "Local storage",
      "App architecture",
      "Platform channels & system APIs",
      "Publishing to stores",
    ],
    suggestedOutcomes: [
      "Ship a cross-platform mobile app to TestFlight / Play Console",
      "Integrate Firebase auth and realtime data",
      "Structure a Flutter app with GetX or BLoC",
      "Handle offline data and local persistence",
    ],
  },
  {
    id: "mobile-ios",
    label: "Mobile · iOS (Swift)",
    description: "Native Apple apps with Swift and SwiftUI.",
    suggestedSkills: [
      "Swift",
      "SwiftUI & UIKit",
      "Xcode & simulators",
      "Core Data",
      "Firebase / CloudKit",
      "App Store guidelines",
      "Push notifications",
      "Keychain & security",
    ],
    suggestedOutcomes: [
      "Build and submit a native iOS app",
      "Implement auth, networking, and persistent storage",
      "Follow Apple HIG and review requirements",
    ],
  },
  {
    id: "mobile-android",
    label: "Mobile · Android (Kotlin)",
    description: "Native Android apps with Kotlin and Jetpack.",
    suggestedSkills: [
      "Kotlin",
      "Jetpack Compose",
      "Room & DataStore",
      "Firebase",
      "Material Design",
      "Play Store publishing",
      "Background work & notifications",
    ],
    suggestedOutcomes: [
      "Ship a production Android app",
      "Use modern Android architecture components",
      "Integrate backend services and offline sync",
    ],
  },
  {
    id: "web-fullstack",
    label: "Web · Full-stack",
    description: "End-to-end web products — UI, API, and database.",
    suggestedSkills: [
      "JavaScript / TypeScript",
      "React or Next.js",
      "Node.js & Express",
      "REST APIs",
      "PostgreSQL",
      "Auth & sessions",
      "Deployment (Vercel, etc.)",
    ],
    suggestedOutcomes: [
      "Build and deploy a full-stack web application",
      "Design APIs and connect a frontend to a database",
      "Handle auth, roles, and production edge cases",
    ],
  },
  {
    id: "frontend",
    label: "Web · Frontend",
    description: "Product UIs, dashboards, and interactive web apps.",
    suggestedSkills: [
      "HTML, CSS, JavaScript",
      "React / Next.js or Vue",
      "Tailwind CSS",
      "Component design",
      "API integration",
      "Accessibility basics",
    ],
    suggestedOutcomes: [
      "Build responsive, accessible web interfaces",
      "Connect UIs to live APIs",
      "Ship a portfolio-ready frontend project",
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    description: "Servers, APIs, databases, and cloud services.",
    suggestedSkills: [
      "Node.js, Python, or Elixir",
      "REST & GraphQL",
      "PostgreSQL",
      "Auth & JWT",
      "Caching & queues",
      "Security basics",
    ],
    suggestedOutcomes: [
      "Design and implement production APIs",
      "Model data and write efficient queries",
      "Secure endpoints and handle scale considerations",
    ],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    description: "Secure coding and defending real applications.",
    suggestedSkills: [
      "Secure coding",
      "OWASP Top 10",
      "Auth & session threats",
      "Security testing",
      "Network basics",
      "Incident response fundamentals",
    ],
    suggestedOutcomes: [
      "Identify and fix common vulnerabilities",
      "Harden an existing application",
      "Document security improvements professionally",
    ],
  },
  {
    id: "general",
    label: "General / Custom",
    description: "Custom live cohort — define your own skills and outcomes.",
    suggestedSkills: [],
    suggestedOutcomes: [],
  },
];

export function courseTrackById(id: CourseTrackId) {
  return courseTracks.find((t) => t.id === id);
}
