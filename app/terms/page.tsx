import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `${site.name}'s terms and conditions.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms & Conditions"
      intro="Please read these terms and conditions carefully before using our services."
      sections={[
        {
          heading: "Agreement to Terms",
          body: [
            "By accessing and using the services provided by Bluwave Ltd, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.",
          ],
        },
        {
          heading: "Use of Services",
          body: [
            "Our printing services are provided for lawful purposes only. You agree not to use our services for any illegal or unauthorised purpose, violating any intellectual property rights, transmitting harmful or offensive content, or interfering with the security of our services.",
          ],
        },
        {
          heading: "Orders and Payments",
          body: [
            "All orders placed with Bluwave Ltd are subject to acceptance and availability. We reserve the right to refuse or cancel any order. Payment must be received before we begin production of your order.",
          ],
        },
        {
          heading: "Pricing",
          body: [
            "Prices are subject to change without notice. We strive to provide accurate pricing information, but errors may occur. In the event of a pricing error, we will contact you for instructions before processing your order.",
          ],
        },
        {
          heading: "Intellectual Property",
          body: [
            "You retain all rights to the designs and content you provide. By submitting files for printing, you represent that you have the right to use and reproduce all content included in your designs.",
          ],
        },
        {
          heading: "Quality and Specifications",
          body: [
            "Bluwave Ltd makes every effort to ensure the highest quality printing. However, due to variations in materials and equipment, slight variations in colour and finish may occur. Such variations do not constitute grounds for rejection or refund.",
          ],
        },
        {
          heading: "Delivery",
          body: [
            "Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or circumstances beyond our control. Risk of loss transfers to you upon delivery to the carrier.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            "The liability of Bluwave Ltd is limited to the amount you paid for the specific product or service. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.",
          ],
        },
        {
          heading: "Changes to Terms",
          body: [
            "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the modified terms.",
          ],
        },
        {
          heading: "Contact Information",
          body: [
            "If you have any questions about these Terms and Conditions, please contact us through our website or customer service channels.",
          ],
        },
      ]}
    />
  );
}
