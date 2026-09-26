import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${site.name}'s privacy policy.`,
  alternates: { canonical: "/privacy" },
};

const emailLink = (
  <a
    href={`mailto:${site.email}`}
    className="font-semibold text-primary hover:text-primary-hover"
  >
    {site.email}
  </a>
);

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      intro="This privacy policy explains how Bluwave Ltd collects and uses your information when you use this website, ask us for a quote, or order print or design work from us. Bluwave Ltd takes the privacy of your information very seriously. Please read this privacy policy carefully."
      sections={[
        {
          heading: "Definitions and Interpretation",
          body: [
            "This privacy policy applies to our use of any and all Data collected by us or provided by you, whether through the Website, by email, by phone or in person. In this privacy policy, the following definitions are used:",
            <ul
              key="definitions"
              className="mt-1 list-disc space-y-2 pl-5 text-sm leading-[1.8] text-ink-2"
            >
              <li>
                <strong className="text-ink">Data</strong>
                {" "}means collectively all information that you give to Bluwave Ltd, or that we collect when you use the Website. This definition incorporates, where applicable, the definitions provided in the Data Protection Laws.
              </li>
              <li>
                <strong className="text-ink">Data Protection Laws</strong>
                {" "}means any applicable law relating to the processing of personal Data, including the UK GDPR, the Data Protection Act 2018 and the Privacy and Electronic Communications Regulations 2003.
              </li>
              <li>
                <strong className="text-ink">UK GDPR</strong>
                {" "}means the General Data Protection Regulation (EU) 2016/679 as it forms part of the law of the United Kingdom.
              </li>
              <li>
                <strong className="text-ink">Bluwave Ltd, or us</strong>
                {" "}means Bluwave Ltd, a company incorporated in England and Wales with registered number 04840051 whose registered office is at {site.address.full}.
              </li>
              <li>
                <strong className="text-ink">User or you</strong>
                {" "}means any third party that accesses the Website and is not either (i) employed by Bluwave Ltd and acting in the course of their employment, or (ii) engaged as a consultant or otherwise providing services to Bluwave Ltd and accessing the Website in connection with the provision of such services.
              </li>
              <li>
                <strong className="text-ink">Website</strong>
                {" "}means the website that you are currently using, and any sub-domains of this site unless expressly excluded by their own terms and conditions.
              </li>
            </ul>,
            "In this privacy policy, unless the context requires a different interpretation:",
            <ul
              key="interpretation"
              className="mt-1 list-disc space-y-2 pl-5 text-sm leading-[1.8] text-ink-2"
            >
              <li>the singular includes the plural and vice versa;</li>
              <li>
                references to sub-clauses, clauses, schedules or appendices are to those of this privacy policy;
              </li>
              <li>
                a reference to a person includes firms, companies, government entities, trusts and partnerships;
              </li>
              <li>
                “including” is understood to mean “including without limitation”;
              </li>
              <li>
                reference to any statutory provision includes any modification or amendment of it; and
              </li>
              <li>
                the headings and sub-headings do not form part of this privacy policy.
              </li>
            </ul>,
          ],
        },
        {
          heading: "Scope of This Policy",
          body: [
            "This privacy policy applies to the actions of Bluwave Ltd and Users with respect to this Website, and to the quotations, orders and accounts we handle for you. It does not extend to any websites that can be accessed from this Website, including but not limited to any links we may provide to social media websites.",
            "For the purposes of the applicable Data Protection Laws, Bluwave Ltd is the “data controller”. This means Bluwave Ltd determines the purposes for which, and the manner in which, your Data is processed.",
          ],
        },
        {
          heading: "Data We Collect",
          body: [
            "We may collect the following Data, which includes personal Data, from you, in each case in accordance with this privacy policy:",
            <ul
              key="data-collected"
              className="mt-1 list-disc space-y-2 pl-5 text-sm leading-[1.8] text-ink-2"
            >
              <li>
                <strong className="text-ink">Contact details</strong>
                {" "}— your name, email address, telephone number and, where relevant, your business name.
              </li>
              <li>
                <strong className="text-ink">Job details</strong>
                {" "}— what you want printed or designed, quantities, deadlines and any other information you give us when asking for a quote.
              </li>
              <li>
                <strong className="text-ink">Artwork</strong>
                {" "}— the files, text and images you send us to print, which may include personal Data about you or other people.
              </li>
              <li>
                <strong className="text-ink">Order and account details</strong>
                {" "}— delivery and billing addresses, quotations, invoices, payment records and, if you apply for a credit account, the information needed to assess it.
              </li>
              <li>
                <strong className="text-ink">Technical data</strong>
                {" "}— your IP address and information about how you use the Website (see below).
              </li>
            </ul>,
            "We do not see or store your full card details. Card payments, whether made in person or online, are processed securely by our payment providers.",
            "If the Artwork you send us includes other people's personal Data, such as names or photographs, you confirm that you are entitled to share it with us. We use it only to produce your job.",
          ],
        },
        {
          heading: "How We Collect Data",
          body: [
            "We collect Data in the following ways: Data that is given to us by you, and Data that is collected automatically.",
            <>
              <strong className="text-ink">Data given to us by you.</strong>
              {" "}Bluwave Ltd will collect your Data in a number of ways, for example: when you fill in the quote or contact form on the Website; when you contact us by telephone, post, email or in person; when you accept a quotation, approve a proof or place an order; when you apply for a credit account; and when you pay us, in person, online or by bank transfer; in each case, in accordance with this privacy policy.
            </>,
            <>
              <strong className="text-ink">Data collected automatically.</strong>
              {" "}To the extent that you access the Website, we will collect your Data automatically. This includes your IP address, the date, times and frequency with which you access the Website, and the way you use and interact with its content. We use Cloudflare Web Analytics, which does not use cookies, to understand how the Website is used, and Cloudflare Turnstile to check that forms are being filled in by a person rather than a bot. This information helps us to keep the Website secure and to make improvements to its content and navigation.
            </>,
          ],
        },
        {
          heading: "Our Use of Data",
          body: [
            "Any or all of the above Data may be used by us for the following reasons, in each case in accordance with this privacy policy:",
            <ul
              key="uses"
              className="mt-1 list-disc space-y-2 pl-5 text-sm leading-[1.8] text-ink-2"
            >
              <li>
                to respond to your enquiry and prepare a quotation — because you have asked us to take steps before entering into a contract;
              </li>
              <li>
                to produce, deliver and invoice your order, send you proofs and keep you updated on your job — to perform our contract with you;
              </li>
              <li>
                to keep accounting and tax records — because the law requires us to;
              </li>
              <li>
                to assess an application for a credit account, recover money owed to us, keep the Website secure and prevent spam and fraud, keep internal records and improve our products and services — for our legitimate interests; and
              </li>
              <li>
                to send you marketing by email — as set out below.
              </li>
            </ul>,
            "Where we rely on our legitimate interests and you are not satisfied with this, you have the right to object in certain circumstances (see the section headed “Your Rights” below).",
            "For the delivery of direct marketing to you via email, we’ll need your consent, whether via an opt-in or soft opt-in. Soft opt-in consent applies when you have previously engaged with us — for example, you contact us to ask for more details about a particular product or service, and we are marketing similar products or services; under soft opt-in consent we will take your consent as given unless you opt out. For other types of e-marketing, we are required to obtain your explicit consent, meaning you need to take positive and affirmative action when consenting, for example by checking a tick box that we’ll provide.",
            "If you are not satisfied with our approach to marketing, you have the right to withdraw consent at any time — see the section headed “Your Rights” below.",
          ],
        },
        {
          heading: "Who We Share Data With",
          body: [
            "We do not sell your Data. We share it only where needed for the purposes above, with:",
            <ul
              key="recipients"
              className="mt-1 list-disc space-y-2 pl-5 text-sm leading-[1.8] text-ink-2"
            >
              <li>
                <strong className="text-ink">Cloudflare</strong>
                {" "}— which hosts the Website and provides our analytics and form spam protection;
              </li>
              <li>
                <strong className="text-ink">Resend</strong>
                {" "}— which delivers the quote and contact forms you send through the Website to our inbox;
              </li>
              <li>
                <strong className="text-ink">Our payment providers and bank</strong>
                {" "}— to take and receive your payments. Online card payments are handled through Thintent, which provides our online invoicing and payment platform, and processed by Stripe;
              </li>
              <li>
                <strong className="text-ink">Couriers</strong>
                {" "}— where we deliver your order, your name, delivery address and phone number;
              </li>
              <li>
                <strong className="text-ink">Our accountants and professional advisers, and HMRC</strong>
                {" "}— to keep our accounts and meet our legal obligations;
              </li>
              <li>
                <strong className="text-ink">Credit reference agencies</strong>
                {" "}— only if you apply for a credit account; and
              </li>
              <li>
                <strong className="text-ink">Anyone we are required to share it with by law</strong>
                , such as the police or a court.
              </li>
            </ul>,
            "Some of these providers may process Data outside the UK. Where they do, we rely on safeguards recognised under UK law, such as UK adequacy regulations or the International Data Transfer Agreement.",
            "The contact page includes an embedded Google Map, and our home and About pages show Google reviews with reviewers' profile photos loaded from Google's servers. Google may collect information about your visit, such as your IP address, when these load, under Google's own privacy policy.",
          ],
        },
        {
          heading: "Keeping Data Secure",
          body: [
            "We will use technical and organisational measures to safeguard your Data, for example: forms on the Website are sent over an encrypted connection, access to customer records is limited to the people at Bluwave Ltd who need it to do their job, and we store your Data on secure systems.",
            <>
              Technical and organisational measures include measures to deal with any suspected data breach. If you suspect any misuse, loss or unauthorised access to your Data, please let us know immediately by contacting us at {emailLink}.
            </>,
            <>
              If you want detailed information from Get Safe Online on how to protect your information and your computers and devices against fraud, identity theft, viruses and many other online problems, please visit{" "}
              <a
                href="https://www.getsafeonline.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-primary-hover"
              >
                www.getsafeonline.org
              </a>
              . Get Safe Online is supported by HM Government and leading businesses.
            </>,
          ],
        },
        {
          heading: "Data Retention",
          body: [
            "Unless a longer retention period is required or permitted by law, we will only hold your Data on our systems for the period necessary to fulfil the purposes outlined in this privacy policy, or until you request that the Data be deleted.",
            "Records of orders, invoices and payments are part of our accounting records, which the law requires us to keep for at least six years. We cannot delete these on request during that period.",
            "Even if we delete your Data, it may persist on backup or archival media for legal, tax or regulatory purposes.",
          ],
        },
        {
          heading: "Your Rights",
          body: [
            "You have the following rights in relation to your Data:",
            <ul
              key="rights"
              className="mt-1 list-disc space-y-2 pl-5 text-sm leading-[1.8] text-ink-2"
            >
              <li>
                <strong className="text-ink">Right to access</strong>
                {" "}— the right to request (i) copies of the information we hold about you at any time, or (ii) that we modify, update or delete such information. If we provide you with access to the information we hold about you, we will not charge you for this, unless your request is “manifestly unfounded or excessive.” Where we are legally permitted to do so, we may refuse your request, and if so we will tell you the reasons why.
              </li>
              <li>
                <strong className="text-ink">Right to correct</strong>
                {" "}— the right to have your Data rectified if it is inaccurate or incomplete.
              </li>
              <li>
                <strong className="text-ink">Right to erase</strong>
                {" "}— the right to request that we delete or remove your Data from our systems.
              </li>
              <li>
                <strong className="text-ink">Right to restrict our use of your Data</strong>
                {" "}— the right to “block” us from using your Data or limit the way in which we can use it.
              </li>
              <li>
                <strong className="text-ink">Right to data portability</strong>
                {" "}— the right to request that we move, copy or transfer your Data.
              </li>
              <li>
                <strong className="text-ink">Right to object</strong>
                {" "}— the right to object to our use of your Data, including where we use it for our legitimate interests.
              </li>
            </ul>,
            <>
              To make enquiries, exercise any of your rights set out above, or withdraw your consent to the processing of your Data (where consent is our legal basis for processing your Data), please contact us at {emailLink}.
            </>,
            <>
              If you are not satisfied with the way a complaint you make in relation to your Data is handled by us, you may be able to refer your complaint to the relevant data protection authority. For the UK, this is the Information Commissioner’s Office (ICO). The ICO’s contact details can be found on their website at{" "}
              <a
                href="https://ico.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-primary-hover"
              >
                ico.org.uk
              </a>
              .
            </>,
            "It is important that the Data we hold about you is accurate and current. Please keep us informed if your Data changes during the period for which we hold it.",
          ],
        },
        {
          heading: "Links to Other Websites",
          body: [
            "This Website may, from time to time, provide links to other websites. We have no control over such websites and are not responsible for the content of these websites. This privacy policy does not extend to your use of such websites. You are advised to read the privacy policy or statement of other websites prior to using them.",
          ],
        },
        {
          heading: "Changes of Business Ownership and Control",
          body: [
            "Bluwave Ltd may, from time to time, expand or reduce our business and this may involve the sale and/or the transfer of control of all or part of Bluwave Ltd. Data provided by Users will, where it is relevant to any part of our business so transferred, be transferred along with that part, and the new owner or newly controlling party will, under the terms of this privacy policy, be permitted to use the Data for the purposes for which it was originally supplied to us.",
            "We may also disclose Data to a prospective purchaser of our business or any part of it.",
            "In the above instances, we will take steps with the aim of ensuring your privacy is protected.",
          ],
        },
        {
          heading: "General",
          body: [
            "You may not transfer any of your rights under this privacy policy to any other person. We may transfer our rights under this privacy policy where we reasonably believe your rights will not be affected.",
            "If any court or competent authority finds that any provision of this privacy policy (or part of any provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the validity and enforceability of the other provisions of this privacy policy will not be affected.",
            "Unless otherwise agreed, no delay, act or omission by a party in exercising any right or remedy will be deemed a waiver of that, or any other, right or remedy.",
            "This privacy policy will be governed by and interpreted according to the law of England and Wales. All disputes arising under it will be subject to the exclusive jurisdiction of the English and Welsh courts.",
          ],
        },
        {
          heading: "Changes to This Privacy Policy",
          body: [
            <>
              Bluwave Ltd reserves the right to change this privacy policy as we may deem necessary from time to time, or as may be required by law. Any changes will be immediately posted on the Website, and you are deemed to have accepted the terms of the privacy policy on your first use of the Website following the alterations. You may contact Bluwave Ltd by email at {emailLink}.
            </>,
          ],
        },
        {
          heading: "Attribution",
          body: [
            "This privacy policy was created using a document from Rocket Lawyer (www.rocketlawyer.co.uk).",
            "Last updated: 26 September 2026.",
          ],
        },
      ]}
    />
  );
}
