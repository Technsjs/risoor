export const site = {
  name: "Risoor",
  url: "https://risoor.com",
  email: "hello@risoor.com",
  description:
    "Tech agency building custom software, web platforms, and native Android & iOS apps — from idea to launch.",
  /** Set your WhatsApp number in international format, digits only (e.g. 2348012345678). Leave empty to hide. */
  whatsapp: "",
} as const;

export function whatsappUrl() {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}`;
}
