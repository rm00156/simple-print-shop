import {
  Layers,
  Palette,
  Printer,
  Scissors,
  Truck,
  type LucideIcon,
} from "lucide-react";
export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  // Longer opening paragraph shown in the detail-page hero.
  intro: string;
  // A couple of paragraphs of real detail about how the service works.
  overview: string[];
  // What's included / why it's worth it, shown as a checklist.
  highlights: string[];
  // Popular uses, shown as chips.
  useCases: string[];
  // Common questions, shown as an accordion and mirrored into FAQ JSON-LD.
  faqs: ServiceFaq[];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "design-artwork",
    name: "Design & Artwork",
    description:
      "Free design quotations and artwork checks, so your job is print-ready first time.",
    icon: Palette,
    image: "/design.jpg",
    intro:
      "Free design quotations and artwork checks, so your job is print-ready first time. Our in-house designers can take you from a rough idea to finished artwork, or simply check and tidy the files you already have.",
    overview: [
      "Whether you're starting from a blank page or already have a design in mind, our studio makes sure your job looks right and prints right. We'll set up your artwork to the correct size, bleed and colour so there are no surprises on the press.",
      "Already have print-ready files? We'll check them free of charge and flag anything — low-resolution images, missing fonts, RGB colours — before it costs you a reprint. No design skills or special software needed at your end.",
    ],
    highlights: [
      "Free, no-obligation design quotations",
      "Print-ready checks on files you supply",
      "Logo, layout and typesetting from scratch",
      "A proof to approve before we print",
    ],
    useCases: [
      "Logos & brand identity",
      "Business card layouts",
      "Flyer & poster design",
      "Fixing supplied files",
      "Typesetting & artwork setup",
    ],
    faqs: [
      {
        question: "How much does design cost?",
        answer:
          "Design quotations are free and priced per job depending on complexity. Simple artwork tweaks are often included at no extra cost — just ask.",
      },
      {
        question: "What file formats can I send?",
        answer:
          "Print-ready PDFs are ideal, but we can work from most formats including AI, PSD, InDesign, Word and image files. Send what you have and we'll advise.",
      },
      {
        question: "Will I see a proof before printing?",
        answer:
          "Yes. We send a proof to approve before anything goes to print, so you can check the wording, layout and colours.",
      },
    ],
    metaDescription:
      "Free design quotations, artwork checks and print-ready file preparation from Bluwave in Lower Sydenham, south east London.",
  },
  {
    slug: "digital-printing",
    name: "Digital Printing",
    description:
      "Full-colour digital printing with a fast 24-48hr turnaround as standard.",
    icon: Printer,
    image: "/digital.jpg",
    intro:
      "Full-colour digital printing with a fast 24-48hr turnaround as standard. Ideal for short and medium runs, last-minute jobs and anything where you need it right, and you need it quickly.",
    overview: [
      "Digital printing goes straight from file to press with no plates to make, which keeps set-up costs low and turnaround fast. It's the right choice for short and medium runs, reprints, and jobs where you need them tomorrow rather than next week.",
      "We print full colour on a wide range of stocks and weights, from everyday copier paper to heavyweight card and premium finishes. Because there's no minimum plate cost, you can order exactly the quantity you need.",
    ],
    highlights: [
      "24-48hr standard turnaround",
      "Cost-effective on short and medium runs",
      "Vivid full colour on a range of stocks",
      "Same-day options when you're up against it",
    ],
    useCases: [
      "Business cards",
      "Flyers & leaflets",
      "Short-run booklets",
      "Last-minute reprints",
      "Personalised documents",
    ],
    faqs: [
      {
        question: "What's the turnaround?",
        answer:
          "Most standard digital jobs are ready in 24-48 hours. Same-day is often possible on smaller runs — call us if you're up against a deadline.",
      },
      {
        question: "Is there a minimum order?",
        answer:
          "No. Digital printing means you can order as few or as many as you need without paying for plates.",
      },
      {
        question: "Digital or litho — which do I need?",
        answer:
          "As a rule of thumb, digital wins on shorter runs and speed, litho on large quantities and premium stocks. Send us your quantity and we'll recommend the most cost-effective option.",
      },
    ],
    metaDescription:
      "Fast full-colour digital printing with a 24-48hr turnaround from Bluwave in Lower Sydenham, south east London.",
  },
  {
    slug: "litho-printing",
    name: "Litho Printing",
    description:
      "Litho printing for larger runs, premium stocks and spot colours.",
    icon: Layers,
    image: "/litho.jpg",
    intro:
      "Litho printing for larger runs, premium stocks and spot colours. When quality and consistency across thousands of copies matter, litho gives you the sharpest and most economical result.",
    overview: [
      "Lithographic printing uses metal plates to transfer ink to paper, giving exceptionally sharp, consistent results across long runs. Once the plates are set up, each additional copy costs very little — so the more you print, the better the value.",
      "Litho is also the way to go for premium and specialist stocks and for exact colour matching with Pantone spot colours, making it ideal for brand-critical work and large marketing campaigns.",
    ],
    highlights: [
      "Best value on large print runs",
      "Premium and specialist paper stocks",
      "Pantone spot colours for exact brand matching",
      "Crisp, consistent results across the whole run",
    ],
    useCases: [
      "Large print runs",
      "Brochures & catalogues",
      "Premium stationery",
      "Pantone brand colours",
      "Marketing campaigns",
    ],
    faqs: [
      {
        question: "When is litho better than digital?",
        answer:
          "Litho comes into its own on larger quantities, premium papers and jobs that need precise spot-colour matching. For short runs and quick jobs, digital is usually faster and cheaper.",
      },
      {
        question: "Can you match my exact brand colour?",
        answer:
          "Yes. We print Pantone spot colours so your brand colours come out consistent every time, across every run.",
      },
      {
        question: "What quantities make litho worthwhile?",
        answer:
          "It varies by job, but litho typically becomes the more economical choice from a few hundred copies upwards. Send us your numbers and we'll compare both options for you.",
      },
    ],
    metaDescription:
      "Litho printing for large runs, premium stocks and Pantone spot colours from Bluwave in Lower Sydenham, south east London.",
  },
  {
    slug: "finishing-binding",
    name: "Finishing & Binding",
    description:
      "Folding, stapling, perfect binding and other finishing done in-house.",
    icon: Scissors,
    image: "/finish.jpg",
    intro:
      "Folding, stapling, perfect binding and other finishing done in-house. These are the final touches that turn printed sheets into a professional, ready-to-use product.",
    overview: [
      "Finishing is what turns a stack of printed sheets into a finished product. From a simple fold to a fully bound book, we handle it all in-house — which means tighter quality control and a faster turnaround than sending work out.",
      "Choose from saddle-stitching, perfect binding, spiral and comb binding, plus folding, scoring, trimming, lamination and die-cutting. Not sure what suits your job? We'll talk you through the options.",
    ],
    highlights: [
      "Saddle-stitch, perfect and spiral binding",
      "Folding, scoring and creasing",
      "Lamination, trimming and die-cutting",
      "Handled in-house for a faster turnaround",
    ],
    useCases: [
      "Booklets & brochures",
      "Folded leaflets",
      "Laminated menus",
      "Bound reports & manuals",
      "Die-cut stickers",
    ],
    faqs: [
      {
        question: "What binding options do you offer?",
        answer:
          "Saddle-stitch (stapled), perfect binding (glued spine), and spiral or comb binding for documents that need to lie flat. We'll recommend the best fit for your page count and use.",
      },
      {
        question: "Can you finish print I've had done elsewhere?",
        answer:
          "In many cases yes — bring it in and we'll take a look. Trimming, folding, lamination and binding of supplied print are often possible.",
      },
      {
        question: "Do you laminate?",
        answer:
          "Yes, in both matte and gloss. Lamination protects the print and gives menus, covers and cards a premium feel and a longer life.",
      },
    ],
    metaDescription:
      "In-house folding, binding, lamination and finishing from Bluwave in Lower Sydenham, south east London.",
  },
  {
    slug: "delivery",
    name: "Delivery",
    image: "/delivery.png",
    description:
      "Free delivery and collection across Lower Sydenham and south east London.",
    icon: Truck,
    intro:
      "Free delivery and collection across Lower Sydenham and south east London. Order remotely and we'll bring your finished job to your door, or have it ready and waiting for you to collect.",
    overview: [
      "Order without leaving your desk. We offer free delivery and collection across Lower Sydenham and the surrounding south east London area, so your finished job comes to you.",
      "Further afield? We can arrange a nationwide courier on request. Either way, we'll let you know the moment your job is ready and agree a time that works for you.",
    ],
    highlights: [
      "Free local delivery and collection",
      "Across Lower Sydenham and south east London",
      "Nationwide courier options on request",
      "We'll let you know the moment it's ready",
    ],
    useCases: [
      "Local business deliveries",
      "Office print drops",
      "Collection when it suits you",
      "Nationwide courier on request",
    ],
    faqs: [
      {
        question: "Is delivery really free?",
        answer:
          "Local delivery and collection across Lower Sydenham and south east London is free. For deliveries outside the area we'll quote a courier cost up front.",
      },
      {
        question: "How will I know when my order's ready?",
        answer:
          "We'll call or email you as soon as your job is finished and arrange delivery or collection at a time that suits you.",
      },
      {
        question: "Can I collect in person?",
        answer:
          "Of course. You're welcome to collect from us — we'll have your order ready and waiting.",
      },
    ],
    metaDescription:
      "Free local print delivery and collection across Lower Sydenham and south east London from Bluwave.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
