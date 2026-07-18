import type { Metadata } from "next";
import { LegalDoc } from "@/components/ade/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use — Risoor",
  description:
    "Terms governing use of the Risoor website, project inquiries, and learning applications.",
};

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Terms of Use"
      updated="July 18, 2026"
      intro={`These terms govern your use of the ${site.name} website and related forms. By using the site, you agree to them.`}
      sections={[
        {
          title: "Agreement",
          paragraphs: [
            `The website at ${site.url} (and related pages) is operated by ${site.name}. If you do not agree with these terms, do not use the site.`,
          ],
        },
        {
          title: "What we offer",
          paragraphs: [
            "The site describes our custom software, web, Android, and iOS services, and our Learn programs. Content on the site is for information only and does not, by itself, create a client or student contract.",
          ],
        },
        {
          title: "Project work",
          paragraphs: [
            "Sending a contact message or booking a call is an inquiry, not a paid engagement. Any project work is governed by a separate proposal, statement of work, or contract that you and we agree to in writing (including email).",
          ],
        },
        {
          title: "Learn applications",
          paragraphs: [
            "Applying to Learn does not guarantee a place. We review applications and may accept, waitlist, or decline. Free foundation lessons on the site are provided as-is for educational use. Full programs, schedules, fees (if any), and rules will be confirmed when we onboard you.",
          ],
        },
        {
          title: "Acceptable use",
          paragraphs: ["You agree not to:"],
          bullets: [
            "Misuse forms (spam, false information, or automated abuse).",
            "Attempt to disrupt or reverse-engineer the site beyond normal browsing.",
            "Copy free lesson content for resale or to pass it off as your own course.",
            "Use the site in any way that breaks applicable law.",
          ],
        },
        {
          title: "Intellectual property",
          paragraphs: [
            `Site design, branding, text, and lesson materials belong to ${site.name} or our licensors. You may view and use free lessons for personal learning. You may not republish our materials commercially without written permission.`,
            "Client project IP is handled in the separate agreement for that project.",
          ],
        },
        {
          title: "Third-party links",
          paragraphs: [
            "The site may link to third-party tools or sites (for example WhatsApp or calendars). We are not responsible for their content or practices.",
          ],
        },
        {
          title: "Disclaimer",
          paragraphs: [
            "The site and free learning materials are provided “as is” without warranties of any kind, express or implied, including fitness for a particular purpose. We do not guarantee uninterrupted access or that free content alone will lead to employment or a shipped product.",
          ],
        },
        {
          title: "Limitation of liability",
          paragraphs: [
            `To the fullest extent permitted by law, ${site.name} is not liable for indirect, incidental, special, or consequential damages arising from use of the site or free materials. Our total liability for claims related solely to website use is limited to the greater of zero (if you paid us nothing for site access) or the amount you paid us for site-related services in the three months before the claim.`,
            "Nothing in these terms limits liability that cannot be limited under applicable law.",
          ],
        },
        {
          title: "Indemnity",
          paragraphs: [
            "You agree to indemnify us against claims arising from your misuse of the site or your violation of these terms, to the extent allowed by law.",
          ],
        },
        {
          title: "Changes",
          paragraphs: [
            "We may update these terms. The “Last updated” date will change when we do. Continued use after changes means you accept the new terms.",
          ],
        },
        {
          title: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of the jurisdiction where Risoor principally operates, without regard to conflict-of-law rules. Courts in that jurisdiction will have exclusive venue for disputes, except where consumer law gives you mandatory rights elsewhere. (Update this clause with your exact country/state when you incorporate.)",
          ],
        },
        {
          title: "Contact",
          paragraphs: [`Questions about these terms: ${site.email}.`],
        },
      ]}
    />
  );
}
