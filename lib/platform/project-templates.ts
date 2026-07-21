import type { ProjectTemplate } from "./types";

export const projectTemplates: ProjectTemplate[] = [
  {
    id: "mobile-ecommerce",
    name: "Ecommerce app",
    platform: "mobile",
    category: "ecommerce",
    description:
      "Product catalog, cart, checkout, and order history — a realistic mobile shop.",
    milestones: [
      "Product listing & search",
      "Product detail & reviews",
      "Cart & checkout flow",
      "Order history & profile",
    ],
  },
  {
    id: "mobile-dating",
    name: "Dating app",
    platform: "mobile",
    category: "dating",
    description:
      "Profiles, matching, chat, and safety features — social product patterns.",
    milestones: [
      "Profile creation & photos",
      "Discovery & matching",
      "Chat & notifications",
      "Safety & reporting",
    ],
  },
  {
    id: "mobile-payments",
    name: "Payments app",
    platform: "mobile",
    category: "payments",
    description:
      "Send money, request payments, transaction history, and KYC flows.",
    milestones: [
      "Wallet & balance",
      "Send & request money",
      "Transaction history",
      "Security & verification",
    ],
  },
  {
    id: "mobile-crypto",
    name: "Crypto wallet",
    platform: "mobile",
    category: "crypto",
    description:
      "Portfolio view, send/receive, price charts, and secure key handling.",
    milestones: [
      "Wallet setup & seed phrase",
      "Portfolio & price charts",
      "Send & receive crypto",
      "Security best practices",
    ],
  },
  {
    id: "mobile-food",
    name: "Food delivery",
    platform: "mobile",
    category: "delivery",
    description:
      "Restaurant browse, menu, cart, live tracking, and ratings.",
    milestones: [
      "Restaurant browse & filters",
      "Menu & cart",
      "Checkout & payment",
      "Order tracking & ratings",
    ],
  },
  {
    id: "web-saas",
    name: "SaaS dashboard",
    platform: "web",
    category: "saas",
    description:
      "Multi-tenant admin dashboard with auth, roles, and analytics.",
    milestones: [
      "Auth & onboarding",
      "Dashboard & analytics",
      "Settings & team management",
      "Billing placeholder UI",
    ],
  },
  {
    id: "web-marketplace",
    name: "Marketplace",
    platform: "web",
    category: "marketplace",
    description:
      "Buyer/seller flows, listings, search, and messaging.",
    milestones: [
      "Listings & search",
      "Product detail & seller profile",
      "Checkout & orders",
      "Messaging between users",
    ],
  },
  {
    id: "web-blog",
    name: "Blog / CMS",
    platform: "web",
    category: "cms",
    description:
      "Content management, publishing workflow, and public blog pages.",
    milestones: [
      "Editor & draft workflow",
      "Categories & tags",
      "Public blog pages",
      "Admin dashboard",
    ],
  },
  {
    id: "web-admin",
    name: "Admin portal",
    platform: "web",
    category: "admin",
    description:
      "Internal admin tool with tables, filters, CRUD, and audit logs.",
    milestones: [
      "Data tables & filters",
      "Create / edit records",
      "Role-based access UI",
      "Audit log view",
    ],
  },
  {
    id: "security-hardening",
    name: "Vulnerable app hardening",
    platform: "security",
    category: "security",
    description:
      "Take a deliberately vulnerable app and fix OWASP Top 10 issues.",
    milestones: [
      "Identify injection & XSS flaws",
      "Fix auth & session issues",
      "Secure API endpoints",
      "Document security improvements",
    ],
  },
];

export function projectTemplateById(id: string) {
  return projectTemplates.find((t) => t.id === id);
}

export function projectsForPlatform(platform: ProjectTemplate["platform"]) {
  return projectTemplates.filter((t) => t.platform === platform);
}
