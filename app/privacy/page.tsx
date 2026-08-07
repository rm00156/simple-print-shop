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
      intro="This privacy policy applies between you, the user of this website, and Bluwave Ltd, the owner and provider of this website. Bluwave Ltd takes the privacy of your information very seriously. Please read this privacy policy carefully."
      sections={[
        {
          heading: "Definitions and Interpretation",
          body: [
            "This privacy policy applies to our use of any and all Data collected by us or provided by you in relation to your use of the Website. In this privacy policy, the following definitions are used:",
            <ul
              key="definitions"
              className="mt-1 list-disc space-y-2 pl-5 text-sm leading-[1.8] text-ink-2"
            >
              <li>
                <strong className="text-ink">Data</strong>
                {" "}means collectively all information that you submit to Bluwave Ltd via the Website. This definition incorporates, where applicable, the definitions provided in the Data Protection Laws.
              </li>
              <li>
                <strong className="text-ink">Data Protection Laws</strong>
                {" "}means any applicable law relating to the processing of personal Data, including but not limited to Directive 95/46/EC (the Data Protection Directive) or the GDPR, and any national implementing laws, regulations and secondary legislation, for as long as the GDPR is effective in the UK.
              </li>
              <li>
                <strong className="text-ink">GDPR</strong>
                {" "}means the General Data Protection Regulation (EU) 2016/679.
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
            "This privacy policy applies only to the actions of Bluwave Ltd and Users with respect to this Website. It does not extend to any websites that can be accessed from this Website, including but not limited to any links we may provide to social media websites.",
            "For the purposes of the applicable Data Protection Laws, Bluwave Ltd is the “data controller”. This means Bluwave Ltd determines the purposes for which, and the manner in which, your Data is processed.",
          ],
        },
        {
          heading: "Data We Collect",
          body: [
            "We may collect the following Data, which includes personal Data, from you: name; and contact information such as email addresses and telephone numbers; in each case, in accordance with this privacy policy.",
          ],
        },
        {
          heading: "How We Collect Data",
          body: [
            "We collect Data in the following ways: Data that is given to us by you, and Data that is collected automatically.",
            <>
              <strong className="text-ink">Data given to us by you.</strong>
              {" "}Bluwave Ltd will collect your Data in a number of ways, for example: when you contact us through the Website, by telephone, post, email or through any other means; when you register with us and set up an account to receive our products or services; and when you make payments to us, through this Website or otherwise; in each case, in accordance with this privacy policy.
            </>,
            <>
              <strong className="text-ink">Data collected automatically.</strong>
              {" "}To the extent that you access the Website, we will collect your Data automatically. This includes your IP address, the date, times and frequency with which you access the Website, and the way you use and interact with its content. This information helps us to make improvements to Website content and navigation.
            </>,
          ],
        },
        {
          heading: "Our Use of Data",
          body: [
            "Any or all of the above Data may be required by us from time to time in order to provide you with the best possible service and experience when using our Website. Specifically, Data may be used by us for the following reasons: internal record keeping; improvement of our products or services; and transmission by email of marketing materials that may be of interest to you; in each case, in accordance with this privacy policy.",
            "We may use your Data for the above purposes if we deem it necessary to do so for our legitimate interests. If you are not satisfied with this, you have the right to object in certain circumstances (see the section headed “Your Rights” below).",
            "For the delivery of direct marketing to you via email, we’ll need your consent, whether via an opt-in or soft opt-in. Soft opt-in consent applies when you have previously engaged with us — for example, you contact us to ask for more details about a particular product or service, and we are marketing similar products or services; under soft opt-in consent we will take your consent as given unless you opt out. For other types of e-marketing, we are required to obtain your explicit consent, meaning you need to take positive and affirmative action when consenting, for example by checking a tick box that we’ll provide.",
            "If you are not satisfied with our approach to marketing, you have the right to withdraw consent at any time — see the section headed “Your Rights” below.",
            "When you register with us and set up an account to receive our services, the legal basis for this processing is the performance of a contract between you and us, and/or taking steps, at your request, to enter into such a contract.",
          ],
        },
        {
          heading: "Keeping Data Secure",
          body: [
            "We will use technical and organisational measures to safeguard your Data, for example: access to your account is controlled by a password and a username that is unique to you, and we store your Data on secure servers.",
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
            "Last updated: 7 August 2026.",
          ],
        },
      ]}
    />
  );
}
