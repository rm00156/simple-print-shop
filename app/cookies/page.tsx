import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `${site.name}'s cookie policy.`,
  alternates: { canonical: "/cookies" },
};

const linkClass = "font-semibold text-primary hover:text-primary-hover";

export default function CookiesPage() {
  return (
    <InfoPage
      title="Cookie Policy"
      intro="This policy explains what cookies are used on our website, who sets them, and how you can manage them."
      sections={[
        {
          heading: "What Are Cookies",
          body: [
            "Cookies are small text files that are stored on your device when you visit a website. Bluwave Ltd does not set any cookies of its own for advertising or tracking. The cookies on our website are either strictly necessary for it to work, or set by Google if you choose to show the map on our contact page.",
          ],
        },
        {
          heading: "Essential Cookies",
          body: [
            "These cookies are necessary for the website to function and cannot be switched off. They are set by Cloudflare, which hosts our website, to keep it secure, and by Cloudflare Turnstile, which checks that the quote and contact forms are being filled in by a person rather than a bot.",
            "Our website analytics (Cloudflare Web Analytics) do not use cookies.",
          ],
        },
        {
          heading: "Google Maps",
          body: [
            <>
              Our{" "}
              <Link href="/contact" className={linkClass}>
                contact page
              </Link>{" "}
              can show a Google Map of where we are. The map is not loaded until
              you press &ldquo;Show map&rdquo;. When it loads, Google may set cookies on your device and collect
              information about your visit, such as your IP address. These
              cookies are controlled by Google, not by us, and are used under{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Google&apos;s privacy policy
              </a>
              . You can find out more about how Google uses cookies at{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                policies.google.com/technologies/cookies
              </a>
              .
            </>,
            "The map is the only part of our website that can set Google cookies, so they are only set if you choose to show it. If you would rather not, the address and a link to directions are shown alongside it.",
            "Our home and About pages show recent Google reviews, including reviewers' profile photos. Those photos are loaded directly from Google's image servers, which means Google receives your IP address when they load, but they do not set cookies.",
          ],
        },
        {
          heading: "Online Payments",
          body: [
            "If you pay us online, you complete the payment on a secure payment page provided by our payment platform and processed by Stripe. That page may set its own cookies, which are needed to process your payment securely and prevent fraud, and are covered by the provider's own policies.",
          ],
        },
        {
          heading: "Managing Cookies",
          body: [
            "Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies, including third-party cookies such as Google's, or to alert you when cookies are being sent. Please note that disabling essential cookies may stop the quote and contact forms from working.",
          ],
        },
        {
          heading: "Changes to This Policy",
          body: [
            "Bluwave Ltd may update this Cookie Policy from time to time. Any changes will be posted on this page.",
            "Last updated: 26 September 2026.",
          ],
        },
        {
          heading: "Contact Us",
          body: [
            <>
              If you have questions about our use of cookies, please contact
              Bluwave Ltd at{" "}
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>{" "}
              or call{" "}
              <a href={site.phoneHref} className={linkClass}>
                {site.phone}
              </a>
              .
            </>,
          ],
        },
      ]}
    />
  );
}
