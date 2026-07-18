import type { Metadata } from "next";
import { LegalDoc } from "@/components/ade/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Risoor",
  description: "How Risoor collects, uses, and protects information on our website and learning applications.",
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Privacy Policy"
      updated="July 18, 2026"
      intro={`This policy explains how ${site.name} (“we”, “us”) handles information when you visit our website, contact us about projects, or apply to learn with us.`}
      sections={[
        {
          title: "Who we are",
          paragraphs: [
            `${site.name} builds custom software, web platforms, and Android & iOS apps, and offers learning programs. For privacy questions, email ${site.email}.`,
          ],
        },
        {
          title: "Information we collect",
          paragraphs: [
            "We only collect what you choose to give us, or what is needed to run the site securely.",
          ],
          bullets: [
            "Contact and project forms: name, email, company (optional), service interest, and your message.",
            "Learn applications: name, email, phone/WhatsApp (optional), experience level, learning path, topics of interest, and why you want to learn.",
            "Technical data: basic server logs such as IP address, browser type, and pages visited — used for security and reliability.",
            "If we add analytics later, we will update this page and prefer privacy-friendly tools where possible.",
          ],
        },
        {
          title: "How we use information",
          paragraphs: ["We use your information to:"],
          bullets: [
            "Reply to project inquiries and schedule conversations.",
            "Review Learn applications and share onboarding next steps.",
            "Operate, protect, and improve the website.",
            "Comply with legal obligations when required.",
          ],
        },
        {
          title: "Legal bases (where applicable)",
          paragraphs: [
            "Where data-protection laws apply (for example GDPR), we rely on: your consent (when you submit a form), our legitimate interest in responding to business and education inquiries, and legal obligations when they apply.",
          ],
        },
        {
          title: "Sharing",
          paragraphs: [
            "We do not sell your personal information. We may share it with trusted providers who help us run the site (for example hosting or email delivery), only as needed to provide those services, or if required by law.",
          ],
        },
        {
          title: "Retention",
          paragraphs: [
            "We keep inquiry and application details only as long as needed to respond, run our programs, or meet legal requirements. You can ask us to delete your information by emailing us.",
          ],
        },
        {
          title: "Security",
          paragraphs: [
            "We take reasonable technical and organizational measures to protect information. No method of transmission or storage is 100% secure; please use strong passwords for any accounts we introduce later.",
          ],
        },
        {
          title: "Children",
          paragraphs: [
            "Our services are aimed at adults and learners who can form a contract under applicable law. We do not knowingly collect personal information from children under 13 (or the minimum age in your region). If you believe a child has submitted data, contact us and we will delete it.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Depending on where you live, you may have rights to access, correct, delete, or restrict use of your personal information, or to object to certain processing. To exercise these rights, email us at the address above. You may also have the right to complain to a local data-protection authority.",
          ],
        },
        {
          title: "International transfers",
          paragraphs: [
            "If you access the site from outside the country where our systems are hosted, your information may be processed in other countries. We take steps appropriate to the tools we use to protect that information.",
          ],
        },
        {
          title: "Changes",
          paragraphs: [
            "We may update this policy from time to time. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the updated policy.",
          ],
        },
        {
          title: "Contact",
          paragraphs: [`Questions about privacy: ${site.email}.`],
        },
      ]}
    />
  );
}
