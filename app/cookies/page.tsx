import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `${site.name}'s cookie policy.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <InfoPage
      title="Cookie Policy"
      intro="This policy explains what cookies Bluwave Ltd uses on our website and how you can manage them."
      sections={[
        {
          heading: "What Are Cookies",
          body: [
            "Cookies are small text files that are stored on your device when you visit a website. Bluwave Ltd currently only uses strictly necessary cookies to ensure our website functions correctly.",
          ],
        },
        {
          heading: "Essential Cookies",
          body: [
            "These cookies are necessary for the website to function and cannot be switched off. They are typically set in response to actions you take, such as submitting a quote or contact form.",
          ],
        },
        {
          heading: "Managing Cookies",
          body: [
            "Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or to alert you when cookies are being sent. Please note that disabling cookies may affect the functionality of the Bluwave Ltd website.",
          ],
        },
        {
          heading: "Changes to This Policy",
          body: [
            "Bluwave Ltd may update this Cookie Policy from time to time. Any changes will be posted on this page.",
          ],
        },
        {
          heading: "Contact Us",
          body: [
            "If you have questions about our use of cookies, please contact Bluwave Ltd through our website or customer service channels.",
          ],
        },
      ]}
    />
  );
}
