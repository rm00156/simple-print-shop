import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `${site.name}'s terms and conditions.`,
  alternates: { canonical: "/terms" },
};

const emailLink = (
  <a
    href={`mailto:${site.email}`}
    className="font-semibold text-primary hover:text-primary-hover"
  >
    {site.email}
  </a>
);

const phoneLink = (
  <a
    href={site.phoneHref}
    className="font-semibold text-primary hover:text-primary-hover"
  >
    {site.phone}
  </a>
);

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms & Conditions"
      intro="Please read all of these terms and conditions. As we can accept your order and make a legally enforceable agreement without further reference to you, you must read these terms and conditions to make sure that they contain all that you want and nothing that you are not happy with."
      sections={[
        {
          heading: "Application",
          body: [
            <>
              If you are not sure about anything, just call us on {phoneLink}.
            </>,
            <>
              These Terms and Conditions will apply to the purchase of the goods by you (the &ldquo;Customer&rdquo; or &ldquo;you&rdquo;). We are {site.name} Ltd, a company registered in England and Wales under number 04840051 whose registered office is at {site.address.full} (the &ldquo;Supplier&rdquo;, &ldquo;us&rdquo; or &ldquo;we&rdquo;). You can contact us by email at {emailLink} or by phone on {phoneLink}.
            </>,
            "These are the terms on which we sell all Goods to you. By ordering any of the Goods, you agree to be bound by these Terms and Conditions. You can only purchase the Goods from our website if you are eligible to enter into a contract and are at least 18 years old.",
          ],
        },
        {
          heading: "Interpretation",
          body: [
            <ul
              key="definitions"
              className="mt-1 list-disc space-y-2 pl-5 text-sm leading-[1.8] text-ink-2"
            >
              <li>
                <strong className="text-ink">Consumer</strong>
                {" "}means an individual acting for purposes which are wholly
                or mainly outside their trade, business, craft or profession.
              </li>
              <li>
                <strong className="text-ink">Contract</strong>
                {" "}means the legally-binding agreement between you and us
                for the supply of the Goods.
              </li>
              <li>
                <strong className="text-ink">Delivery Location</strong>
                {" "}means the Supplier&rsquo;s premises or other location
                where the Goods are to be supplied, as set out in the Order.
              </li>
              <li>
                <strong className="text-ink">Durable Medium</strong>
                {" "}means paper or email, or any other medium that allows
                information to be addressed personally to the recipient,
                enables the recipient to store the information in a way
                accessible for future reference for a period long enough for
                the purposes of the information, and allows the unchanged
                reproduction of the information stored.
              </li>
              <li>
                <strong className="text-ink">Goods</strong>
                {" "}means the goods advertised on our website that we supply
                to you, of the number and description set out in the Order.
              </li>
              <li>
                <strong className="text-ink">Order</strong>
                {" "}means the Customer&rsquo;s order for the Goods from the
                Supplier as submitted following the step-by-step process on
                our website.
              </li>
              <li>
                <strong className="text-ink">Privacy Policy</strong>
                {" "}means our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-primary hover:text-primary-hover"
                >
                  Privacy Policy
                </Link>
                , which sets out how we deal with confidential and personal
                information received from you via our website.
              </li>
            </ul>,
          ],
        },
        {
          heading: "The Goods",
          body: [
            "The description of the Goods is as set out on our website, in catalogues, brochures or other forms of advertisement. Any description is for illustrative purposes only and there may be small discrepancies in the size and colour of the Goods supplied.",
            "In the case of any Goods made to your special requirements, it is your responsibility to ensure that any information or specification you provide is accurate.",
            "All Goods which appear on our website are subject to availability.",
            "We can make changes to the Goods which are necessary to comply with any applicable law or safety requirement. We will notify you of any such changes.",
          ],
        },
        {
          heading: "Personal Information and Registration",
          body: [
            "If you register to use our website you must set up a username and password. You remain responsible for all actions taken under your chosen username and password and undertake not to disclose them to anyone else and to keep them secret.",
            <>
              We retain and use all information strictly in accordance with
              our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-primary hover:text-primary-hover"
              >
                Privacy Policy
              </Link>
              .
            </>,
            "We may contact you by email or other electronic communication methods and by pre-paid post, and you expressly agree to this.",
          ],
        },
        {
          heading: "Basis of Sale",
          body: [
            "The description of the Goods on our website does not constitute a contractual offer to sell the Goods. When an Order has been submitted on our website, we can reject it for any reason, although we will try to tell you the reason without delay.",
            "The Order process is set out on our website. Each step allows you to check and amend any errors before submitting the Order. It is your responsibility to check that you have used the ordering process correctly.",
            "A Contract will be formed for the sale of Goods ordered only when you receive an email from us confirming the Order (the “Order Confirmation”). You must ensure that the Order Confirmation is complete and accurate and inform us immediately of any errors. We are not responsible for any inaccuracies in the Order placed by you. By placing an Order you agree to us giving you confirmation of the Contract by means of an email containing all the details of the Order. You will receive the Order Confirmation within a reasonable time after the Contract is made, but in any event no later than delivery of any Goods supplied under the Contract.",
            "Any quotation we give is valid for a maximum of 7 days from its date, unless we expressly withdraw it earlier.",
            "No variation of the Contract, whether about the description of the Goods, price or otherwise, can be made after it has been entered into unless the variation is agreed by you and us in writing.",
            "We intend that these Terms and Conditions apply only to a Contract entered into by you as a Consumer. If this is not the case, you must tell us, so that we can provide you with a different contract with terms more appropriate for you.",
          ],
        },
        {
          heading: "Price and Payment",
          body: [
            "The price of the Goods and any additional delivery or other charges is that set out on our website at the date of the Order, or such other price as we may agree in writing.",
            "Prices and charges include VAT at the rate applicable at the time of the Order.",
            "You must pay by submitting your credit or debit card details with your Order, and we can take payment immediately or otherwise before delivery of the Goods.",
          ],
        },
        {
          heading: "Delivery",
          body: [
            "We will deliver the Goods to the Delivery Location by the time or within the agreed period or, failing any agreement, without undue delay and, in any event, not more than 30 days after the day the Contract is entered into.",
            "Regardless of events beyond our control, if we do not deliver the Goods on time you can (in addition to any other remedies) treat the Contract as at an end if: we have refused to deliver the Goods, or if timely delivery is essential taking into account the circumstances, or if you told us before the Contract was made that timely delivery was essential; or, after we have failed to deliver on time, you have specified a further, appropriate period and we have still not delivered within it.",
            "If you treat the Contract as at an end, we will (in addition to other remedies) promptly return all payments made under the Contract.",
            "If you were entitled to treat the Contract as at an end but choose not to, you may still cancel the Order for any Goods, or reject Goods already delivered, and we will (in addition to other remedies) without delay return all payments made for any such cancelled or rejected Goods. If the Goods have already been delivered, you must return them to us or allow us to collect them, and we will pay the costs of this.",
            "If any Goods form a commercial unit (a unit is a commercial unit if dividing it would materially impair the value of the goods or the character of the unit), you cannot cancel or reject the Order for part of that unit without cancelling or rejecting the Order for the rest of it.",
            "We do not generally deliver to addresses outside England and Wales, Scotland, Northern Ireland, the Isle of Man and the Channel Islands. If we do accept an Order for delivery outside this area, you may need to pay import duties or other taxes, which we will not pay.",
            "We may deliver the Goods in instalments if we suffer a shortage of stock or another genuine and fair reason, subject to the above provisions and provided you are not liable for extra charges.",
            "If you or your nominee fail, through no fault of ours, to take delivery of the Goods at the Delivery Location, we may charge the reasonable costs of storing and redelivering them.",
            "The Goods become your responsibility from the completion of delivery or your collection of them. You must, if reasonably practicable, examine the Goods before accepting them.",
          ],
        },
        {
          heading: "Risk and Title",
          body: [
            "Risk of damage to, or loss of, any Goods passes to you when the Goods are delivered to you.",
            "You do not own the Goods until we have received payment in full. If full payment is overdue, or a step is taken towards your bankruptcy, we may cancel delivery and end your right to use any Goods still owned by you, in which case you must return them or allow us to collect them.",
          ],
        },
        {
          heading: "Withdrawal, Returns and Cancellation",
          body: [
            "You can withdraw the Order by telling us before the Contract is made, if you simply wish to change your mind and without giving a reason, and without incurring any liability.",
            "This is a distance contract which carries the cancellation rights set out below. These rights do not apply to a contract for goods that are made to your specifications or are clearly personalised, or goods which are liable to deteriorate or expire rapidly.",
            "The right to cancel also ceases to be available if the goods become inseparably mixed with other items after delivery.",
          ],
        },
        {
          heading: "Right to Cancel",
          body: [
            "Subject as stated in these Terms and Conditions, you can cancel this Contract within 14 days without giving any reason.",
            "The cancellation period expires 14 days from the day on which you, or a third party other than the carrier you indicated, acquire physical possession of the last of the Goods.",
            "To exercise the right to cancel, you must inform us of your decision by a clear statement (for example, a letter sent by post or email) using the contact details above. You can use the model cancellation form below, but it is not obligatory. You must be able to show clear evidence of when the cancellation was made.",
            "To meet the cancellation deadline, it is enough for you to send your communication before the cancellation period has expired.",
          ],
        },
        {
          heading: "Effects of Cancellation",
          body: [
            "Except as set out below, if you cancel this Contract we will reimburse all payments received from you, including the cost of delivery (except for the supplementary cost of any delivery option other than the least expensive standard delivery we offer).",
            "We may deduct from the reimbursement any loss in value of the Goods caused by unnecessary handling by you, beyond what is needed to establish the nature, characteristics and functioning of the Goods.",
            "If we have not offered to collect the Goods, we will make the reimbursement without undue delay, and not later than 14 days after the day we receive the Goods back, or (if earlier) 14 days after the day you provide evidence that you have sent the Goods back. If we have offered to collect the Goods, or if no Goods were supplied, we will make the reimbursement without undue delay, and not later than 14 days after the day you tell us you are cancelling.",
            "We will make the reimbursement using the same means of payment as you used for the original transaction, unless you expressly agree otherwise, and in any event you will not incur any fees as a result of the reimbursement.",
          ],
        },
        {
          heading: "Returning Goods",
          body: [
            <>
              If you have received Goods in connection with a Contract you
              have cancelled, you must send them back to us or hand them over
              at {site.address.full} without delay and in any event no later
              than 14 days from the day you told us you were cancelling. The
              deadline is met if you send the Goods back before the 14-day
              period has expired. You agree that you will bear the cost of
              returning the Goods.
            </>,
          ],
        },
        {
          heading: "Conformity",
          body: [
            "We have a legal duty to supply the Goods in conformity with the Contract. Upon delivery, the Goods will be of satisfactory quality, reasonably fit for any particular purpose you made known to us before the Contract was made (unless it was unreasonable for you to rely on our skill and judgment), and will conform to their description.",
            "It is not a failure to conform if the failure originates in materials you supplied.",
          ],
        },
        {
          heading: "Successors and Our Sub-Contractors",
          body: [
            "Either party can transfer the benefit of this Contract to someone else, and will remain liable to the other for its obligations under the Contract. We will be liable for the acts of any sub-contractors we choose to help perform our duties.",
          ],
        },
        {
          heading: "Circumstances Beyond the Control of Either Party",
          body: [
            "If either party is affected by something beyond its reasonable control, that party will advise the other as soon as reasonably practicable, and its obligations will be suspended so far as is reasonable, provided it acts reasonably. Neither party will be liable for any failure it could not reasonably avoid, but this does not affect your rights relating to delivery and cancellation set out above.",
          ],
        },
        {
          heading: "Privacy",
          body: [
            <>
              Your privacy is critical to us. We respect your privacy and
              comply with the General Data Protection Regulation with regard
              to your personal information. These Terms and Conditions should
              be read alongside, and are in addition to, our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-primary hover:text-primary-hover"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/cookies"
                className="font-semibold text-primary hover:text-primary-hover"
              >
                Cookie Policy
              </Link>
              .
            </>,
            "We are a Data Controller of the personal data we process in providing Goods to you. Where you supply personal data to us so we can provide Goods to you, we will: identify our purposes for collecting it before or at the time of collection; only process it for those purposes; respect your rights in relation to it; and implement appropriate technical and organisational measures to keep it secure.",
            <>
              For any enquiries or complaints regarding data privacy, you can
              contact us at {emailLink}.
            </>,
          ],
        },
        {
          heading: "Excluding Liability",
          body: [
            "We do not exclude liability for any fraudulent act or omission, or for death or personal injury caused by negligence or breach of our other legal obligations. Subject to this, we are not liable for loss which was not reasonably foreseeable to both parties when the Contract was made, or for loss to your business, trade, craft or profession which would not be suffered by a Consumer, because we believe you are not buying the Goods wholly or mainly for your business, trade, craft or profession.",
          ],
        },
        {
          heading: "Governing Law, Jurisdiction and Complaints",
          body: [
            "The Contract, including any non-contractual matters, is governed by the law of England and Wales. Disputes can be submitted to the jurisdiction of the courts of England and Wales or, where you live in Scotland or Northern Ireland, the courts of Scotland or Northern Ireland respectively.",
            <>
              We try to avoid any dispute, so if one occurs please{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary hover:text-primary-hover"
              >
                contact us
              </Link>{" "}
              to find a solution. We will aim to respond with an appropriate
              solution within 5 days.
            </>,
          ],
        },
        {
          heading: "Attribution",
          body: [
            "These terms and conditions were created using a document from Rocket Lawyer (www.rocketlawyer.co.uk).",
          ],
        },
        {
          heading: "Model Cancellation Form",
          body: [
            "To exercise your right to cancel, you can use the form below.",
            <div
              key="cancellation-form"
              className="mt-3 rounded-xl border border-line bg-surface p-5 text-sm leading-[1.8] text-ink-2"
            >
              <p>
                To: {site.name} Ltd, {site.address.full}
              </p>
              <p>Email address: {site.email}</p>
              <p>Telephone number: {site.phone}</p>
              <p className="mt-4">
                I/We hereby give notice that I/We cancel my/our contract of
                sale of the following goods, ordered on [date]/received on
                [date]:
              </p>
              <p className="mt-4">Name of consumer(s):</p>
              <p className="mt-4">Address of consumer(s):</p>
              <p className="mt-4">
                Signature of consumer(s) (only if this form is notified on
                paper):
              </p>
              <p className="mt-4">Date:</p>
            </div>,
          ],
        },
      ]}
    />
  );
}
