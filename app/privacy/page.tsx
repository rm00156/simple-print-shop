import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${site.name}'s privacy policy.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      intro="This policy explains what personal information Bluwave Ltd collects, how we use it, and the rights you have over it."
      sections={[
        {
          heading: "Information We Collect",
          body: [
            "Bluwave Ltd collects information you provide directly to us, including your name, email address, postal address, phone number, and payment information when you place an order or create an account.",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "We use the information we collect to process and fulfil your orders, communicate with you about your orders, send you marketing communications (with your consent), improve our services, and comply with legal obligations.",
          ],
        },
        {
          heading: "Information Sharing",
          body: [
            "Bluwave Ltd does not sell your personal information to third parties. We may share your information with service providers who assist us in operating our business, such as payment processors and shipping carriers.",
          ],
        },
        {
          heading: "Data Security",
          body: [
            "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.",
          ],
        },
        {
          heading: "Your Rights",
          body: [
            "You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by contacting us or using the unsubscribe link in our emails.",
          ],
        },
        {
          heading: "Data Retention",
          body: [
            "We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.",
          ],
        },
        {
          heading: "Changes to This Policy",
          body: [
            "Bluwave Ltd may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website.",
          ],
        },
        {
          heading: "Contact Us",
          body: [
            "If you have any questions about this Privacy Policy, please contact Bluwave Ltd through our website or customer service channels.",
          ],
        },
      ]}
    />
  );
}
