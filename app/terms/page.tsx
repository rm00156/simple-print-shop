import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `${site.name}'s terms and conditions for quotations, print and design work.`,
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

/*
  Written for a quote-based print shop, not an online checkout. Nothing is added to
  a basket: a job is quoted, the quote is accepted, a proof is approved, and payment
  is taken in person, online through a payment page, by BACS, or on account. The consumer rights that
  the law gives regardless (Consumer Rights Act 2015, Consumer Contracts Regulations
  2013) stay in; the business-only sections are marked as such, because the limits
  in them can't lawfully be applied to a consumer.
*/
export default function TermsPage() {
  return (
    <InfoPage
      title="Terms & Conditions"
      intro="These terms apply to every quotation we give and every job we print or design, whether you're ordering for yourself or for a business. Where a section applies only to consumers or only to business customers, it says so. If anything is unclear, call us before you accept a quote."
      sections={[
        {
          heading: "Application",
          body: [
            <>
              If you are not sure about anything, just call us on {phoneLink}.
            </>,
            <>
              These Terms and Conditions apply to the supply of printed goods
              and related services by us to you (the &ldquo;Customer&rdquo; or
              &ldquo;you&rdquo;). We are {site.name} Ltd, a company registered
              in England and Wales under number 04840051 whose registered office
              is at {site.address.full} (the &ldquo;Supplier&rdquo;,
              &ldquo;us&rdquo; or &ldquo;we&rdquo;). You can contact us by email
              at {emailLink} or by phone on {phoneLink}.
            </>,
            "By accepting a Quotation you agree to be bound by these Terms and Conditions. They apply in place of any terms you put forward, including terms printed on a purchase order, unless we have agreed otherwise in writing.",
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
                <strong className="text-ink">Artwork</strong>
                {" "}means the files, text, images, logos and other content used
                to produce the Goods, whether supplied by you or prepared by us.
              </li>
              <li>
                <strong className="text-ink">Business Customer</strong>
                {" "}means a Customer who is not a Consumer, including a
                company, partnership, sole trader, charity or public body.
              </li>
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
                {" "}means our premises, where you collect the Goods, or any
                other address we agree to deliver to.
              </li>
              <li>
                <strong className="text-ink">Goods</strong>
                {" "}means the printed items and any related services, including
                design, artwork preparation, finishing and delivery, set out in
                the Quotation.
              </li>
              <li>
                <strong className="text-ink">Proof</strong>
                {" "}means the electronic (PDF) or physical sample of the Goods
                we send you for approval before production.
              </li>
              <li>
                <strong className="text-ink">Quotation</strong>
                {" "}means our written quote for the Goods, sent by email or
                handed to you, setting out the specification, quantity, price
                and timescale.
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
                information received from you.
              </li>
            </ul>,
          ],
        },
        {
          heading: "Quotations",
          body: [
            "Quotations are free. Prices shown on our website, including “from” prices, are a guide only and are not an offer to sell; the price you pay is the one in your Quotation.",
            "A Quotation is based on the specification, quantity, Artwork and deadline you give us. If any of these change, or the Artwork needs more work than we were told, we may revise the Quotation, and we will tell you the new price before we go ahead.",
            "Any Quotation we give is valid for 30 days from its date, unless we expressly withdraw it earlier.",
          ],
        },
        {
          heading: "Placing an Order",
          body: [
            "You place an order by accepting a Quotation online, by email or by phone. We can decline an order for any reason, although we will try to tell you the reason without delay.",
            "A Contract is formed when we confirm that we have accepted your order. We will confirm it in writing (usually by email), setting out what we have agreed to supply. You must check the confirmation and tell us straight away if anything in it is wrong.",
            "No variation of the Contract, whether about the description of the Goods, price or otherwise, can be made after it has been entered into unless the variation is agreed by you and us in writing.",
          ],
        },
        {
          heading: "Artwork and Proofs",
          body: [
            "You are responsible for the accuracy of the information and Artwork you give us, including spelling, names, dates, numbers and contact details. Where we check supplied files, we check that they will print correctly (resolution, bleed, fonts and colour set-up), not that the content is correct.",
            "Where a Proof is needed, we will send you an electronic PDF Proof before anything goes to print. A physical Proof is available on request; a proofing fee applies, and delivery of it is charged separately.",
            "Please check every Proof carefully. When you approve a Proof, you accept it as correct, and we are not responsible for errors in it that are then reproduced in the Goods. Changes requested after approval, or reprints needed because of an error in an approved Proof, will be charged.",
            "Production does not start until we have your approval of the Proof and, where you are supplying it, print-ready Artwork. Any agreed timescale runs from that point.",
          ],
        },
        {
          heading: "Your Content",
          body: [
            "You confirm that you own, or have permission to use, all Artwork, images, logos and text you supply to us, and that printing them will not infringe anyone else's rights or break the law.",
            "We can refuse to print anything we reasonably believe is unlawful, defamatory, offensive or infringes someone else's rights.",
            "If you are a Business Customer, you will compensate us for any claim, loss or cost we suffer as a result of printing content you supplied that infringes someone else's rights.",
          ],
        },
        {
          heading: "The Goods",
          body: [
            "Colours on screen, on a PDF Proof and on a previous print run can differ slightly from the finished Goods, and small variations in colour and finish between runs and between paper stocks are normal in printing. If an exact colour matters, tell us when you order so we can print to a Pantone reference.",
            "In the case of any Goods made to your special requirements, it is your responsibility to ensure that any information or specification you provide is accurate.",
            "Paper, board and materials are subject to availability. If a specified stock becomes unavailable, we will offer you an equivalent before going ahead.",
            "We can make changes to the Goods which are necessary to comply with any applicable law or safety requirement. We will notify you of any such changes.",
          ],
        },
        {
          heading: "Price and Payment",
          body: [
            "The price of the Goods, and of any delivery, is as set out in the Quotation you accepted, or such other price as we agree in writing.",
            "Your Quotation will say whether VAT is included. Where it does not, prices are exclusive of VAT, which is added at the rate applicable at the time of supply.",
            "You can pay by debit or credit card in person at our premises or online through our secure payment page, by bank transfer (BACS), or by any other method we agree with you. Our bank details are shown on our invoices.",
            "Unless you have a credit account with us, payment in full is due before the Goods are collected or dispatched. For larger jobs, design work or new customers we may ask for a deposit before we start, and we will tell you if we do when we quote.",
            <>
              We will never change our bank details by email. If you receive a
              message that appears to come from us asking you to pay into a
              different account, do not pay it; call us on {phoneLink} first.
            </>,
          ],
        },
        {
          heading: "Credit Accounts (Business Customers)",
          body: [
            "Business Customers who order regularly can apply for a credit account. Accounts are opened at our discretion, and we may ask for trade references or carry out a credit check first.",
            "Account customers must pay each invoice in full within the payment terms stated on it, without deduction or set-off.",
            "If an invoice is overdue, we may put further work on hold or withdraw credit until the account is brought up to date, and we may charge interest and compensation under the Late Payment of Commercial Debts (Interest) Act 1998.",
          ],
        },
        {
          heading: "Collection and Delivery",
          body: [
            "Collection from our premises is free. We will tell you when your order is ready to collect.",
            "Where we deliver, the delivery charge will be set out in your Quotation. Delivery time is in addition to production time.",
            "We will supply the Goods by the time or within the period agreed in the Quotation or, failing any agreement, without undue delay and, in any event, not more than 30 days after the day the Contract is entered into.",
            "If you are a Consumer and we do not deliver on time, you can (in addition to any other remedies) treat the Contract as at an end if: we have refused to deliver the Goods; or timely delivery is essential taking into account the circumstances, or you told us before the Contract was made that timely delivery was essential; or, after we have failed to deliver on time, you have specified a further, appropriate period and we have still not delivered within it. If you treat the Contract as at an end, we will promptly return all payments made under the Contract.",
            "We do not generally deliver to addresses outside England and Wales, Scotland, Northern Ireland, the Isle of Man and the Channel Islands. If we do accept an order for delivery outside this area, you may need to pay import duties or other taxes, which we will not pay.",
            "We may deliver the Goods in instalments where there is a genuine and fair reason, provided you are not liable for extra charges.",
            "If you or your nominee fail, through no fault of ours, to collect or take delivery of the Goods, we may charge the reasonable costs of storing and redelivering them.",
            "The Goods become your responsibility from the completion of delivery or your collection of them. You must, if reasonably practicable, examine the Goods before accepting them.",
          ],
        },
        {
          heading: "Risk and Title",
          body: [
            "Risk of damage to, or loss of, any Goods passes to you when the Goods are delivered to you or collected by you.",
            "You do not own the Goods until we have received payment in full. If full payment is overdue, or a step is taken towards your bankruptcy or insolvency, we may cancel delivery and end your right to use any Goods still owned by us, in which case you must return them or allow us to collect them.",
          ],
        },
        {
          heading: "Changing or Cancelling an Order",
          body: [
            "You can cancel an order at any time before we start work on it without charge. If you cancel after work has started, you must pay for the work done up to that point, including design time, Proofs and any materials we have bought for your job.",
            "Once your approved job has gone to print, it cannot be cancelled, except where you have a legal right to do so.",
            "If you are a Consumer, you should know that the 14-day right to cancel under the Consumer Contracts Regulations 2013 does not apply to goods made to your specifications or clearly personalised, which covers almost all printed work. It can apply where you order design services, or goods that are not personalised, without visiting our premises: see Your Right to Cancel below.",
          ],
        },
        {
          heading: "Your Right to Cancel (Consumers)",
          body: [
            "This section applies only if you are a Consumer and the Contract was made without us both being present at our premises, for example by email or phone.",
            "For design services and for goods that are not made to your specifications or personalised, you can cancel the Contract within 14 days without giving any reason. For services, the period runs from the day the Contract is made; for goods, it runs from the day you, or someone you nominate other than the carrier, receive the Goods.",
            "If you ask us to start design work within the 14-day period, you must pay for the work done up to the time you tell us you are cancelling. Once the design work has been completed at your request, the right to cancel it ends.",
            "To exercise the right to cancel, you must inform us of your decision by a clear statement (for example, a letter sent by post or email) using the contact details above. You can use the model cancellation form below, but it is not obligatory. To meet the cancellation deadline, it is enough for you to send your communication before the cancellation period has expired.",
            "If you cancel, we will reimburse all payments received from you for the cancelled Goods, less any amount due for services already provided, without undue delay and no later than 14 days after we receive the Goods back or you provide evidence that you have sent them back (or, where no goods were supplied, 14 days after you tell us you are cancelling). We will use the same means of payment as you used, unless you expressly agree otherwise, and you will not incur any fees as a result.",
            <>
              If you have received Goods in connection with a Contract you have
              cancelled, you must send them back to us or hand them over at{" "}
              {site.address.full} without delay and in any event no later than
              14 days from the day you told us you were cancelling. You agree
              that you will bear the cost of returning the Goods.
            </>,
          ],
        },
        {
          heading: "Problems With Your Order",
          body: [
            "We have a legal duty to supply the Goods in conformity with the Contract. Upon delivery, the Goods will be of satisfactory quality, reasonably fit for any particular purpose you made known to us before the Contract was made (unless it was unreasonable for you to rely on our skill and judgment), and will conform to their description and the approved Proof.",
            "If something is wrong, tell us as soon as possible and keep the Goods so we can inspect them. Where the fault is ours, we will reprint the affected Goods or give you a full or partial refund.",
            "It is not a failure to conform if the problem originates in materials or Artwork you supplied, or in an error in a Proof you approved.",
            "If you are a Consumer, nothing in these terms affects your statutory rights under the Consumer Rights Act 2015.",
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
            "If either party is affected by something beyond its reasonable control, that party will advise the other as soon as reasonably practicable, and its obligations will be suspended so far as is reasonable, provided it acts reasonably. Neither party will be liable for any failure it could not reasonably avoid, but this does not affect a Consumer's rights relating to delivery and cancellation set out above.",
          ],
        },
        {
          heading: "Privacy",
          body: [
            <>
              Your privacy is critical to us. We respect your privacy and
              comply with UK data protection law with regard to your personal
              information. These Terms and Conditions should be read alongside,
              and are in addition to, our{" "}
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
            "We are a Data Controller of the personal data we process in providing Goods to you. Where you supply personal data to us so we can provide Goods to you, including personal data contained in Artwork, we will: identify our purposes for collecting it before or at the time of collection; only process it for those purposes; respect your rights in relation to it; and implement appropriate technical and organisational measures to keep it secure.",
            "We may contact you by email, phone or post about your quotations and orders.",
            <>
              For any enquiries or complaints regarding data privacy, you can
              contact us at {emailLink}.
            </>,
          ],
        },
        {
          heading: "Excluding Liability",
          body: [
            "We do not exclude liability for any fraudulent act or omission, or for death or personal injury caused by negligence or breach of our other legal obligations.",
            "If you are a Consumer: subject to the above, we are not liable for loss which was not reasonably foreseeable to both parties when the Contract was made.",
            "If you are a Business Customer: subject to the above, we are not liable for any loss of profit, revenue, business, goodwill or anticipated savings, or for any indirect or consequential loss, and our total liability to you under or in connection with the Contract is limited to the price of the Goods under that Contract.",
          ],
        },
        {
          heading: "Governing Law, Jurisdiction and Complaints",
          body: [
            "The Contract, including any non-contractual matters, is governed by the law of England and Wales. Disputes can be submitted to the jurisdiction of the courts of England and Wales or, where you are a Consumer living in Scotland or Northern Ireland, the courts of Scotland or Northern Ireland respectively.",
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
            "For Consumers exercising a right to cancel described above, you can use the form below.",
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
                I/We hereby give notice that I/We cancel my/our contract for
                the supply of the following goods/services, ordered on
                [date]/received on [date]:
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
