import {
  AppWindow,
  Award,
  BookOpen,
  Calendar,
  Construction,
  Copy,
  CreditCard,
  Files,
  Flower,
  Frame,
  Gift,
  GraduationCap,
  IdCard,
  Megaphone,
  Mail,
  Package,
  type LucideIcon,
} from "lucide-react";

export type CategorySlug =
  | "business-stationery"
  | "flyers-leaflets-and-invites"
  | "booklets-catalogues-and-brochures"
  | "marketing-and-promo"
  | "site-and-display-boards"
  | "fine-art-and-canvas"
  | "boxes-and-packaging"
  | "copying-and-business-forms"
  | "calendars"
  | "schools"
  | "funeral-stationery";

export type CategoryItem = {
  name: string;
  description: string;
  // A couple of paragraphs of real detail, shown on the product's own page.
  longDescription: string[];
  tags?: string[];
  badge?: string;
  icon?: LucideIcon;
  image?: string;
};

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  intro: string;
  icon: LucideIcon;
  image?: string;
  items: CategoryItem[];
  cta: { label: string; href: string };
  metaDescription: string;
};

export const categories: Category[] = [
  {
    slug: "business-stationery",
    name: "Business Stationery",
    tagline: "Cards, letterheads and personal stationery",
    intro:
      "Cards, letterheads and personal stationery. Not sure what you need? Call us.",
    icon: IdCard,
    image: "/bcards.webp",
    items: [
      {
        name: "Business cards",
        description:
          "Make a strong first impression with card weights from 300gsm to 700gsm, recycled stock, matte, gloss or silk finishes and lamination.",
        longDescription: [
          "Handing out a well-made business card is one of the simplest ways to make a lasting impression, and it's often the one thing people remember from meeting you. We print in full colour on sturdy card from 300gsm to 700gsm depending on how much weight you want it to carry, then finish with your choice of matte, gloss, silk or recycled stock, with lamination available as an extra finishing option.",
          "Whether you need fifty cards before a meeting tomorrow or a few thousand for the whole team, our digital presses make short runs cost-effective and quick, with a standard 24-48hr turnaround.",
        ],
        tags: [
          "300–700gsm stock",
          "Matte, gloss or silk",
          "Lamination available",
        ],
        badge: "Bestseller",
        image: "/bcards.webp",
      },
      {
        name: "Loyalty cards",
        description:
          "Stamp loyalty cards on durable stock, sized to slip into a wallet and keep customers coming back.",
        longDescription: [
          "A loyalty card is one of the cheapest ways to turn a first-time customer into a regular, and it works best when the card feels worth keeping rather than something to drop in the bin on the way out. We print on durable card stock cut to wallet size, with space for stamps depending on how you'd rather track visits.",
          "Coffee shops, barbers, nail bars and takeaways are our most frequent loyalty card customers, usually ordering a few hundred at a time and topping up as they're handed out.",
        ],
        tags: ["Wallet sized", "Stamps"],
        image: "/loyalty-cards.webp",
        icon: CreditCard,
      },
      {
        name: "Letterheads",
        description:
          "Branded A4 letterheads on quality bond paper, printed to match your corporate identity.",
        longDescription: [
          "A letterhead is often the most-used piece of stationery in a business, so getting it right matters more than it might seem. We print A4 letterheads in full colour on 100gsm or 120gsm bond paper.",
          "Order compliment slips and envelopes to the same specification for a stationery set that looks joined-up rather than assembled from different suppliers. It's a popular choice with solicitors, accountants and any business that still relies on formal correspondence, and reorders are quick once your layout is on file.",
        ],
        tags: ["120gsm bond", "Matching envelopes"],
        image: "/letterhead.webp",
      },
      {
        name: "Compliment slips",
        description:
          "Custom-sized slips for client shipments and everyday correspondence, printed to match your brand.",
        longDescription: [
          "A compliment slip is a small thing that still says something about how much care you put into your business — a scrappy handwritten note doesn't do the same job as a properly printed one tucked into a parcel or invoice. We print to whatever size and stock weight suits how you actually use them, matched to your existing letterheads and business cards.",
          "Because they're one of our simplest jobs to set up, we can turn a top-up order around quickly if you're running low ahead of a big shipment, and there's no minimum order that makes sense here — from a hundred to several thousand.",
        ],
        tags: ["Custom sizes", "Fast turnaround"],
        image: "/compliment.png",
      },
      {
        name: "Personal stationery",
        description:
          "Personalised notecards and writing paper on premium stock, ideal for a considered personal touch.",
        longDescription: [
          "For thank-you notes, wedding stationery or a gift that shows you thought about it, we print personal notecards and writing paper on heavier, textured stock that feels noticeably better in the hand than anything from a stationery shop shelf. Add a monogram, a family crest, or simply your name set in a typeface you actually like.",
          "Matching envelopes are available in the same or a complementary stock, and because these are personal orders rather than corporate ones, we're happy to talk you through paper and finish options over the phone rather than leaving you to guess from a swatch book.",
        ],
        tags: ["Premium paper", "Personalised"],
        image: "/personal.png",
      },
      {
        name: "Labels",
        description:
          "Custom-shaped labels for products, packaging and mailing, including waterproof options.",
        longDescription: [
          "Whether it's a roll of address labels for mailing or die-cut product labels that need to survive a trip through the fridge, we print to the shape, size and material the job actually needs. Waterproof, oil-resistant vinyl is available for food, drink and cosmetics packaging, alongside standard paper stock for everyday mailing and stock control.",
          "Small businesses and market traders are some of our most regular label customers, often ordering in batches to match new stock or seasonal packaging, and we can hold your artwork on file so reorders don't mean starting from scratch.",
        ],
        tags: ["Custom shapes", "Waterproof options"],
        image: "/label.webp",
      },
      {
        name: "Note pads",
        description:
          "Branded memo pads and tear-off note pads for the office or client giveaways.",
        longDescription: [
          "A branded note pad sits on someone's desk for months, quietly reminding them who supplied it every time they reach for it, which makes it one of the most cost-effective giveaways we print. We produce tear-off pads in your choice of size and page count, with your logo, contact details, or a simple grid or ruled layout.",
          "They're a popular addition to trade show stands and client welcome packs, and because they're a straightforward digital print job, reordering a fresh box when the last one runs low is quick and inexpensive.",
        ],
        tags: ["Tear-off binding", "Custom branding"],
        image: "/notepad.png",
      },
      {
        name: "Certificates",
        description:
          "Award and training certificates on heavyweight stock, printed to look worth framing.",
        longDescription: [
          "A certificate is a small piece of print that someone might keep for years, so it needs to feel substantial in the hand rather than like a page off the office printer. We print on heavyweight, bright-white or subtly textured stock.",
          "Training providers, schools, clubs and workplaces order these for course completions, competitions and long-service awards. We can print names individually so each certificate comes out personalised, or leave the name line blank for you to complete by hand.",
        ],
        tags: ["Heavyweight stock", "Personalised names"],
        image: "/certificates.webp",
        icon: Award,
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Business cards, letterheads, compliment slips and personal stationery, printed locally in Lower Sydenham, south east London.",
  },
  {
    slug: "flyers-leaflets-and-invites",
    name: "Flyers, Leaflets & Invites",
    tagline: "Flyers, leaflets and invitations",
    intro:
      "Flyers, leaflets and invitations, designed and printed to get your message into people's hands.",
    icon: Mail,
    image: "/flyers.webp",
    items: [
      {
        name: "Flyers",
        description:
          "Eye-catching A6 to A4 flyers in gloss or matte finish, printed fast for local campaigns.",
        longDescription: [
          "Flyers are still one of the fastest ways to get a message into someone's hand, and we print them from pocket-sized A6 up to full A4 in gloss or matte finish. Vivid, consistent colour and a fast turnaround make them well suited to time-sensitive promotions, local events and menu drops.",
          "Bulk pricing steps in quickly on flyers, so doubling your quantity rarely doubles the cost, and our standard 24-48hr turnaround means a campaign you decide on this week can be in people's hands by the weekend.",
        ],
        tags: ["A6–A4 sizes", "Gloss or matte"],
        image: "/flyers.webp",
      },
      {
        name: "Leaflets",
        description:
          "Folded and flat leaflets for mailers, drops and in-store displays, with bulk pricing available.",
        longDescription: [
          "A leaflet carries more information than a flyer without the cost of a full booklet, which makes it a natural fit for service explainers, price lists and door-to-door drops. We offer flat sheets or folded formats — bi-fold, tri-fold or gate-fold — on your choice of paper weight and finish.",
          "Bulk pricing and a fast turnaround suit both one-off campaigns and regular monthly mailers, and if you're not sure which fold works best for your content, we'll talk you through the options before you commit to a quantity.",
        ],
        tags: ["Folded options", "Bulk pricing"],
        image: "/leaflet.png",
      },
      {
        name: "Invitations",
        description:
          "Custom-worded invitations on premium card stock for weddings, parties and corporate events.",
        longDescription: [
          "Your invitation sets the tone for the event before a single guest arrives, so we print on premium card stock with options like foiling and deckled edges for weddings and milestone celebrations. Corporate event invitations can be matched to your brand colours and logo for a more formal finish.",
          "We'll work through custom wording and layout with you until it reads exactly right, and because these are proofed before printing, you'll see exactly how the finished card looks before we commit to the run.",
        ],
        tags: ["Custom wording", "Premium card"],
        image: "/invitation.png",
      },
      {
        name: "Save the dates",
        description:
          "Postcard-format save the dates printed and turned around quickly ahead of your big day.",
        longDescription: [
          "Save the dates need to land in mailboxes months ahead of the wedding, so we keep turnaround fast without compromising on the postcard-quality card stock and colour finish. Order them now and match the rest of your invitation suite later, or bring us the full set to print together if your plans are already settled.",
          "A complementary envelope colour is a popular finishing touch, and because it's a smaller, simpler print run than a full invitation set, we can often turn these around in a matter of days.",
        ],
        tags: ["Postcard format", "Fast turnaround"],
        image: "/save.jpg",
      },
      {
        name: "RSVP cards",
        description:
          "Coordinated RSVP cards to complete your invitation suite, in custom sizes.",
        longDescription: [
          "RSVP cards are usually the smallest item in an invitation suite but the one guests handle most, so we print them on the same premium stock as the rest of your set for a coordinated finish. Custom layouts are no trouble, including space for meal choices or gift registry details.",
          "Matching, often pre-addressed envelopes are available to make replying as easy as possible for your guests, and we can print these alongside your invitations or as a top-up run if you underestimated your guest list.",
        ],
        tags: ["Matching sets", "Custom sizes"],
        image: "/rsvp.png",
      },
      {
        name: "Postcards",
        description:
          "Full-colour postcards on sturdy card, ideal for mailers, promotions and keepsakes.",
        longDescription: [
          "Postcards work hard for their size — cheap to post, quick to read, and far more likely to be kept than a folded leaflet. We print full colour on sturdy card in standard A6 and A5 sizes or something custom, with a gloss front and an uncoated reverse if you want people to be able to write on them.",
          "They're popular for direct mail campaigns, appointment reminders, exhibition handouts and as souvenir cards for galleries and visitor attractions. Bulk pricing steps in quickly, so a larger mailing run costs proportionally less per card.",
        ],
        tags: ["A6 & A5 sizes", "Writable reverse"],
        image: "/postcards.webp",
      },
      {
        name: "Greeting cards",
        description:
          "Folded greeting cards with matching envelopes, printed for occasions, retail or corporate sending.",
        longDescription: [
          "Whether you're a designer selling a range or a business sending Christmas cards to clients, a greeting card needs good stock and a clean fold to feel like a proper card rather than a printout. We print folded cards in a range of sizes on heavyweight board, with a choice of matte, gloss or uncoated finishes and matching envelopes supplied.",
          "Short runs make it viable for illustrators and small makers to test a design before committing to a big order, and corporate customers often have us print a run each December with the inside message already printed.",
        ],
        tags: ["Matching envelopes", "Heavyweight board"],
        image: "/greeting-cards.webp",
        icon: Gift,
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Flyers, leaflets and invitations, designed and printed locally in Lower Sydenham, south east London.",
  },
  {
    slug: "booklets-catalogues-and-brochures",
    name: "Multi-Page Booklets",
    tagline: "Booklets, catalogues and brochures",
    intro:
      "Stapled and perfect-bound booklets, catalogues, brochures and other multi-page documents.",
    icon: BookOpen,
    image: "/booklet.webp",
    items: [
      {
        name: "Booklets",
        description:
          "Saddle-stitched or perfect-bound booklets for guides, portfolios and event materials.",
        longDescription: [
          "Whether it's a staff handbook, a wedding order booklet or a portfolio of your work, we bind booklets by saddle-stitch for slimmer page counts or perfect-bound for a squared spine on thicker documents. Full-colour printing throughout and a range of cover stocks let you match the finish to how the booklet will actually be used.",
          "Binding is done in-house rather than sent out, which keeps quality control tight and turnaround faster, and short runs are handled just as readily as larger print orders.",
        ],
        tags: ["Saddle-stitched", "Perfect bound"],
        image: "/booklet.webp",
      },
      {
        name: "Catalogues",
        description:
          "Full-colour product catalogues in a range of page counts, bound to a professional finish.",
        longDescription: [
          "A well-printed catalogue does a lot of the selling before a customer ever speaks to you, so we print in full colour on stock heavy enough to survive being flicked through repeatedly. Page counts and binding styles are flexible, from a slim seasonal update to a full annual range.",
          "For longer runs, litho printing brings the per-copy cost down and gives exact Pantone colour matching for brand-critical work; shorter runs go through digital print instead, and we'll recommend whichever is more cost-effective for your numbers.",
        ],
        tags: ["Full colour", "Multiple page counts"],
        image: "/catalogue.png",
      },
      {
        name: "Brochures",
        description:
          "Tri-fold and bi-fold brochures on gloss or matte stock, designed to showcase your business.",
        longDescription: [
          "Brochures need to work hard in a short space, and a crisp fold plus the right paper finish makes a real difference to how premium your business looks on the shelf or in a welcome pack. We print tri-fold and bi-fold formats on gloss or matte stock, and can advise on panel layout so your message reads in the right order as it's unfolded.",
          "Estate agents, gyms and clinics are frequent brochure customers, often reordering seasonally as pricing or services change, and we keep your artwork and fold specification on file to make that quick.",
        ],
        tags: ["Tri-fold or bi-fold", "Gloss finish"],
        image: "/brochure.png",
      },
      {
        name: "Manuals",
        description:
          "Durable spiral or comb-bound manuals that lie flat and stand up to daily use.",
        longDescription: [
          "Technical manuals and training guides get used hard, so we bind them with spiral or comb binding that lies flat on a workbench and survives repeated flicking through. Durable card covers protect the pages inside, and we can laminate covers for an extra layer of protection in workshop or outdoor environments.",
          "Because binding is done in-house, updates and reprints are straightforward once the original layout is on file — useful when a manual needs a page or two revised rather than a full reprint.",
        ],
        tags: ["Spiral or comb bound", "Durable covers"],
        image: "/manual.png",
      },
      {
        name: "Reports",
        description:
          "Professionally bound reports in colour or mono, ready for the boardroom.",
        longDescription: [
          "Annual reports, board packs and tender documents need to look as considered as the work inside them, so we bind in colour or mono with options ranging from simple wire binding to a cased, hardback finish. Consistent colour reproduction across every copy matters for reports going out to shareholders or clients, and we proof accordingly before the full run.",
          "Fast turnaround is available when a board meeting or deadline is looming, and litho printing is worth considering once quantities climb, both for cost and for colour consistency across a long run.",
        ],
        tags: ["Professional finish", "Colour or mono"],
        image: "/report.png",
      },
      {
        name: "Programmes",
        description:
          "Event programmes printed and finished quickly, from small runs to full houses.",
        longDescription: [
          "Whether it's a school play, a charity gala or a full theatre run, event programmes need to be ready on time and hold up through an evening of being folded into pockets and bags. We print on a stock that balances cost and quality for larger audiences, with quicker, glossier options for premium events.",
          "A fast turnaround means late running-order changes don't have to mean a missed print deadline, and we can usually accommodate a same-day reprint if the cast list changes at the last minute.",
        ],
        tags: ["Event-ready", "Fast turnaround"],
        image: "/programme.png",
      },
      {
        name: "Folded leaflets",
        description:
          "Multi-panel folded leaflets for detailed information in a compact, mailable format.",
        longDescription: [
          "When there's more to say than a standard leaflet allows but not quite enough for a booklet, a multi-panel fold packs extra pages into a single mailable piece. We can print gate-folds, roll-folds and accordion folds to suit how the information should unfold for the reader, keeping postage-friendly dimensions where that matters.",
          "Folding and scoring are handled in-house, so unusual fold patterns aren't a problem, and they're popular for detailed service guides and product spec sheets that need structure without full binding.",
        ],
        tags: ["Custom folds", "Bulk runs"],
        image: "/leaflet.png",
      },
      {
        name: "Presentation packs",
        description:
          "Branded folders with custom inserts, ideal for pitches, proposals and client packs.",
        longDescription: [
          "A branded folder holds a pitch or proposal together and signals that you've made an effort before the recipient reads a word of it. We print custom folders with pocket inserts sized for your documents, business cards and USB drives, finished in your brand colours with foiling or spot UV available for a premium edge.",
          "Popular with agencies, consultancies and anyone preparing a new business pitch, these are usually a litho job once you're ordering enough to make die-cutting the folder shape cost-effective — we'll advise on the right quantity to make that worthwhile.",
        ],
        tags: ["Branded folders", "Custom inserts"],
        image: "/presentation.png",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Booklets, catalogues, brochures, manuals and multi-page documents, bound and finished locally in Lower Sydenham, south east London.",
  },
  {
    slug: "marketing-and-promo",
    name: "Marketing & Promo",
    tagline: "Posters, banners and signage",
    intro:
      "Posters, banners, menus and signage to get your business noticed locally.",
    icon: Megaphone,
    image: "/promo.webp",
    items: [
      {
        name: "Posters",
        description:
          "Large-format posters for indoor or outdoor display, printed sharp and bright.",
        longDescription: [
          "Posters need to grab attention from across a room or a street, so we print large-format on bright, sharp media built for either indoor display or weatherproof outdoor use. Sizes run from A3 up to full shop-window scale, with matte or gloss finishes depending on where it's going.",
          "Local events, gig promoters and retail window displays are among our most regular poster jobs, and because these are digitally printed, ordering just one or two isn't a problem if that's all you need.",
        ],
        tags: ["Large format", "Indoor or outdoor"],
        image: "/poster.webp",
      },
      {
        name: "Roller banners",
        description:
          "Portable pull-up banner stands, full-colour printed and ready for events or your shopfront.",
        longDescription: [
          "A pull-up banner packs down into a carry case and sets up in under a minute, which makes it one of the most practical ways to add branded presence to an event stand, trade show or shop entrance. We print full colour on scratch-resistant media and supply the stand ready to use straight out of the box.",
          "Replacement graphics are available if your messaging changes before the stand does, so there's no need to buy a whole new unit for an updated offer or a rebrand.",
        ],
        tags: ["Portable stands", "Full colour print"],
        image: "/roll.webp",
      },
      {
        name: "Vinyl banners",
        description:
          "Weatherproof outdoor vinyl banners with eyelets, built to withstand the elements.",
        longDescription: [
          "Outdoor vinyl banners take the brunt of British weather, so we print on heavy-duty, weatherproof material with reinforced hems and eyelets spaced for secure fixing to fences, railings or scaffolding. Full-colour print stays sharp in sun and rain, making them well suited to building wraps, sports club sponsorship and long-running site hoardings.",
          "Custom sizes are made to order however large the job, and because they're built to stay outdoors for months at a time, it's worth telling us how the banner will be fixed so we can get the eyelet spacing right.",
        ],
        tags: ["Weatherproof", "Eyelets included"],
        image: "/vinyl.webp",
      },
      {
        name: "Menus",
        description:
          "Restaurant and café menus with laminated options for durability and easy wiping down.",
        longDescription: [
          "Menus get handled, spilled on and wiped down daily, so we offer laminated finishes that shrug off grease and moisture while keeping colours vivid under café lighting. Custom sizes and folds suit everything from a single-page café menu to a multi-page dining format.",
          "We can turn round quick reprints when seasonal dishes or prices change, and table talkers or drinks lists can be printed to match so the whole table setting looks consistent.",
        ],
        tags: ["Laminated options", "Custom sizes"],
        image: "/menu.png",
      },
      {
        name: "Stickers",
        description:
          "Die-cut stickers in durable vinyl for products, packaging and promotions.",
        longDescription: [
          "Die-cut stickers follow the exact outline of your logo or artwork rather than sitting in a plain rectangle, giving a much more polished finish on packaging, product labelling and promotional giveaways. We print on durable, weatherproof vinyl that holds up outdoors as well as indoors, in any shape and size your design calls for.",
          "Small businesses use them as much for branding parcels and packaging as for standalone merchandise, and die-cutting is handled in-house so unusual shapes aren't a problem.",
        ],
        tags: ["Die-cut shapes", "Durable vinyl"],
        image: "/sticker.webp",
      },
      {
        name: "Signage",
        description:
          "Rigid board signage in custom sizes for shopfronts, offices and events.",
        longDescription: [
          "Rigid signage holds its shape and looks the part whether it's mounted above a shopfront, directing visitors around an office, or marking out a stand at an event. We print on foam board, Foamex or Correx depending on how and where it will be displayed, cut to custom sizes with fixing holes added if needed.",
          "Quick-turnaround options are available for events with a fixed date that can't move, and we're happy to advise on the right board thickness for indoor versus outdoor use.",
        ],
        tags: ["Rigid boards", "Custom sizes"],
        image: "/sign.webp",
      },
      {
        name: "Window graphics",
        description:
          "Full-colour window vinyl, frosted manifestation and one-way vision film for shopfronts and offices.",
        longDescription: [
          "A shop or office window is prime advertising space, and the right graphics turn it into a display that works around the clock. We print full-colour vinyl for window posters and full wraps, frosted or etched-effect manifestation that adds privacy and a smart finish to glass partitions, and one-way vision film that lets you brand the outside of a window while keeping the view and daylight from inside.",
          "Everything is printed and cut in-house, and we can supply it application-ready with a squeegee for a straightforward DIY fit or arrange installation for larger shopfronts. It's a popular choice with local retailers refreshing a seasonal promotion and with offices adding privacy and branding to meeting rooms.",
        ],
        tags: ["Frosted & one-way vision", "Application-ready"],
        image: "/window-graphics.webp",
        icon: AppWindow,
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Posters, banners, menus and signage for local marketing and promotion, printed fast in Lower Sydenham, south east London.",
  },
  {
    slug: "site-and-display-boards",
    name: "Site & Display Boards",
    tagline: "Site boards, hoarding and fencing banners",
    intro:
      "Rigid boards and heavy-duty banners for construction sites, developments and display, built to survive outdoors.",
    icon: Construction,
    image: "/site-boards.webp",
    items: [
      {
        name: "Site boards",
        description:
          "Weatherproof contractor and development site boards, printed on rigid board and ready to fix.",
        longDescription: [
          "Every site needs a board at the gate telling people whose job it is and who to call, and it needs to still be legible after a winter of rain and site dust. We print contractor and development boards on rigid, weatherproof Foamex or Correx in whatever size your site requires, with fixing holes added where you need them.",
          "Artwork can carry your logo, contact details, project information and any required notices, and we'll keep it on file so the next site's board is a quick reorder rather than a fresh design job. Larger developments often order a matched set of site boards, hoarding panels and fencing banners together.",
        ],
        tags: ["Foamex or Correx", "Fixing holes included"],
        image: "/site-boards.webp",
      },
      {
        name: "Hoarding boards",
        description:
          "Large-format printed hoarding panels that turn a site perimeter into branded advertising.",
        longDescription: [
          "Site hoarding is a long run of blank board in a busy street, which makes it some of the cheapest and most visible advertising space a developer will ever have. We print large-format hoarding panels in full colour, matched across multiple boards so a continuous run reads as one clean design rather than a set of mismatched sheets.",
          "Panels are produced on rigid board built to stay outdoors for the length of the build, and we can work from your architect's visuals or lay the artwork out for you. Tell us the run length and panel size and we'll work out how the design should tile across it.",
        ],
        tags: ["Large format", "Tiled artwork"],
        image: "/hoarding-boards.webp",
      },
      {
        name: "Heras fencing banners",
        description:
          "Printed mesh and PVC banners sized to Heras fence panels, with eyelets for quick fixing.",
        longDescription: [
          "Heras fencing banners are the fastest way to brand a temporary site perimeter, and because they're sized to standard fence panels they go up in minutes with cable ties. We print on reinforced PVC or wind-permeable mesh, the latter being the sensible choice on exposed sites where a solid banner would act like a sail.",
          "Every banner comes hemmed with eyelets spaced for secure fixing, and full-colour print stays sharp through months of British weather. They're a regular order for contractors, plant hire firms and event organisers fencing off a space.",
        ],
        tags: ["Mesh or PVC", "Eyelets included"],
        image: "/heras-banners.webp",
      },
      {
        name: "Display boards",
        description:
          "Rigid mounted boards for presentations, exhibitions and interior display, cut to any size.",
        longDescription: [
          "A display board turns a printed image into something that stands up on its own, whether it's mounted behind a stand at an exhibition, propped on an easel at a presentation, or fixed to a wall as permanent interior display. We mount onto lightweight foam board for indoor use or heavier Foamex where the board needs to last.",
          "Boards are cut to any size, with the option of a laminated surface to resist fingerprints and scuffs in a busy space. They're popular with estate agents, galleries, schools and anyone presenting plans or photography at scale.",
        ],
        tags: ["Foam board or Foamex", "Any size"],
        image: "/display-boards.webp",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Site boards, hoarding panels, Heras fencing banners and display boards, printed weatherproof in Lower Sydenham, south east London.",
  },
  {
    slug: "fine-art-and-canvas",
    name: "Fine Art & Canvas",
    tagline: "Giclée prints and stretched canvas",
    intro:
      "Gallery-quality giclée prints and stretched canvas, printed with archival inks for artists, photographers and the home.",
    icon: Frame,
    image: "/fine-art-prints.webp",
    items: [
      {
        name: "Fine art prints",
        description:
          "Giclée prints on archival papers with pigment inks, colour-matched to your original.",
        longDescription: [
          "Giclée printing uses pigment inks on heavyweight archival paper to reproduce artwork and photography at a quality that holds its colour for decades rather than fading after a few summers on a sunny wall. We print on textured watercolour and smooth cotton rag papers, and can profile the print to match your original as closely as the paper allows.",
          "Artists selling limited editions, photographers producing portfolio pieces and galleries reproducing works all use this service. We'll run a small test print first on anything colour-critical, so you can approve the match before we commit to the full edition.",
        ],
        tags: ["Archival pigment inks", "Cotton rag & watercolour"],
        image: "/fine-art-prints.webp",
      },
      {
        name: "Stretched canvas",
        description:
          "Canvas prints stretched over a solid wooden frame, ready to hang straight out of the box.",
        longDescription: [
          "A stretched canvas gives a photograph or piece of artwork real presence on a wall without the cost and weight of framing behind glass. We print onto poly-cotton canvas and stretch it over a solid wooden bar frame, either wrapping the image around the edges or finishing with a plain or mirrored border, whichever suits the picture.",
          "Canvases arrive ready to hang with fixings attached, in standard sizes or made to your dimensions. They're a favourite for family photography, restaurant and office interiors, and artists selling work at fairs and markets.",
        ],
        tags: ["Wooden bar frame", "Ready to hang"],
        image: "/stretched-canvas.webp",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Giclée fine art prints and stretched canvas, printed with archival inks in Lower Sydenham, south east London.",
  },
  {
    slug: "boxes-and-packaging",
    name: "Boxes & Packaging",
    tagline: "Branded boxes, tape and tissue",
    intro:
      "Short-run printed boxes, branded tape, tissue and swing tags to make your packaging part of the experience.",
    icon: Package,
    image: "/printed-boxes.webp",
    items: [
      {
        name: "Printed boxes",
        description:
          "Short-run branded boxes and mailers, printed and die-cut to the size your product needs.",
        longDescription: [
          "For a small business shipping products, the box is the first thing a customer touches, and a plain brown carton is a missed chance to make an impression. We produce short-run printed boxes and postal mailers in your brand colours and logo, die-cut and creased to fold up cleanly around whatever you're sending.",
          "Because these are digitally printed and cut in-house, there's no huge minimum order to justify the setup, so you can order in batches that match your stock rather than committing to a pallet of packaging up front. Send us your product dimensions and we'll advise on the right box style and board weight.",
        ],
        tags: ["Custom sizes", "Short runs"],
        image: "/printed-boxes.webp",
      },
      {
        name: "Branded tape",
        description:
          "Custom-printed packing tape that seals parcels and reinforces your brand at the same time.",
        longDescription: [
          "Branded packing tape is one of the cheapest ways to make a plain box look considered, wrapping your logo or message right across the seam of every parcel that leaves you. We print in one or more colours onto strong paper or polypropylene tape that seals securely and still looks the part on the doorstep.",
          "It's a favourite with online sellers and subscription boxes because a single roll covers a lot of parcels, keeping the per-parcel branding cost tiny. Reorders are quick once your artwork is on file.",
        ],
        tags: ["Paper or poly", "One or more colours"],
        image: "/branded-tape.webp",
      },
      {
        name: "Tissue paper & wrap",
        description:
          "Custom-printed tissue paper and wrapping to give unboxing that premium, considered feel.",
        longDescription: [
          "Tissue paper is a small touch that makes opening a parcel feel like a gift rather than a delivery, and printing it with your logo or a repeating pattern ties the whole unboxing back to your brand. We print onto lightweight tissue in your choice of colours, ideal for lining boxes, wrapping garments or nesting delicate items.",
          "It pairs naturally with our printed boxes, branded tape and swing tags for a coordinated set, and short runs mean boutiques and makers can order sensible quantities rather than a warehouse full.",
        ],
        tags: ["Custom colours", "Premium unboxing"],
        image: "/tissue-paper.webp",
      },
      {
        name: "Swing tags",
        description:
          "Printed swing tags and product tags on premium card, strung and ready to attach.",
        longDescription: [
          "A swing tag carries your pricing, sizing and brand story on the product itself, so it needs to feel as good as whatever it's attached to. We print on premium card stock in any shape and size, with options like rounded corners, a punched hole and a choice of string or ribbon, finished to match your packaging.",
          "They're a regular order for local makers, boutiques and market traders, and because they're a quick digital print job, topping up ahead of a busy season or a craft fair is straightforward.",
        ],
        tags: ["Premium card", "Custom shapes"],
        image: "/swing-tags.webp",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Short-run printed boxes, branded packing tape, tissue paper and swing tags, printed locally in Lower Sydenham, south east London.",
  },
  {
    slug: "copying-and-business-forms",
    name: "Copying & Business Forms",
    tagline: "Copies and business forms",
    intro:
      "Black and white and colour copying, plus business forms for the office.",
    icon: Copy,
    image: "/forms.webp",
    items: [
      {
        name: "Black and white copies",
        description:
          "Fast, affordable black and white copying with bulk discounts on larger runs.",
        longDescription: [
          "Sometimes you just need clean, reliable mono copies fast, and that's exactly what our walk-in and trade copying service is built for. Pricing steps down as volume goes up, so a large print run costs proportionally less per sheet than a handful of copies.",
          "Same-day collection is standard, with binding or hole-punching added on request, and there's no need to book ahead for a quick job — walk in with a file or bring your own pages.",
        ],
        tags: ["Fast turnaround", "Bulk discounts"],
        image: "/black-white.webp",
      },
      {
        name: "Colour copies",
        description:
          "Vivid colour copying with same-day options for when you're up against a deadline.",
        longDescription: [
          "Our colour copiers are calibrated regularly so what comes off the machine matches what's on your screen, which matters for presentations, artwork proofs and anything client-facing. Same-day turnaround is available for last-minute jobs, and we print single copies or bulk runs on the same equipment.",
          "A range of paper weights, including card stock, is available for covers and inserts, so a bound presentation can have a sturdier front page without needing a separate print run.",
        ],
        tags: ["Vivid colour", "Same-day options"],
        image: "/color-copy.webp",
      },
      {
        name: "Digital copies",
        description:
          "High-resolution digital copying on a choice of paper stocks for professional documents.",
        longDescription: [
          "For documents that need to look sharp under close inspection — legal papers, certificates, professional records — we print from digital files at high resolution onto a choice of paper stocks. This keeps text and fine linework crisp even at small point sizes, and allows short runs without the setup cost of traditional litho printing.",
          "Files can be supplied digitally and collected the same day in most cases, which makes this a good option when you need a handful of professional-quality copies rather than a full print run.",
        ],
        tags: ["High resolution", "Various paper stocks"],
        image: "/digital-copy.webp",
      },
      {
        name: "Digital output",
        description:
          "Large-format digital output for plans, drawings and oversized documents.",
        longDescription: [
          "Architects, surveyors and engineers regularly need drawings and plans printed at full scale, and our large-format digital output handles sizes standard copiers simply can't. We print from CAD files and PDFs onto plain paper, tracing paper or heavier stock depending on how the drawing will be used on site.",
          "Folding to a standard document size is available for filing or posting, and because these are printed digitally, single copies and small runs are both cost-effective.",
        ],
        tags: ["Large format", "Fast turnaround"],
        image: "/plan-printing.webp",
      },
      {
        name: "Business forms",
        description:
          "Custom-layout business forms for invoicing, ordering and internal office use.",
        longDescription: [
          "Off-the-shelf forms rarely match exactly how your business actually works, so we design and print custom-layout forms for invoicing, ordering, timesheets and internal paperwork built around your fields and branding. Sequential numbering can be added for auditing and stock control, in pad or pack formats.",
          "Reordering is quick once the original layout is on file, and if your fields need to change down the line, we can update the artwork rather than starting the design from scratch.",
        ],
        tags: ["Custom layouts", "Sequential numbering"],
        image: "/forms.webp",
      },
      {
        name: "Carbonless forms",
        description:
          "Two and three-part carbonless form sets with sequential numbering, ready to write and tear.",
        longDescription: [
          "Carbonless sets let you write once and keep a copy for the customer, your files and dispatch, without a single sheet of carbon paper in sight. We print two and three-part sets with sequential numbering for tracking, collated and glued into pads that tear off cleanly.",
          "Popular with tradespeople for job sheets, delivery notes and receipt books, these are made to your exact layout rather than a generic template, so the fields match what you actually need to record.",
        ],
        tags: ["2–3 part sets", "Sequential numbering"],
        image: "/carbonless.webp",
      },
      {
        name: "Continuous forms",
        description:
          "Pre-printed continuous stationery for high-volume office printing needs.",
        longDescription: [
          "Continuous stationery still earns its place in warehouses and back offices running older line printers, feeding through as one perforated strip rather than individual sheets. We pre-print your branding, form fields or numbering onto the stock so only the variable data needs printing on your own equipment.",
          "It's a cost-effective option for high-volume, repetitive paperwork, and because it's a straightforward, high-run job, larger orders bring the per-form cost down significantly.",
        ],
        tags: ["Pre-printed", "Bulk runs"],
        image: "/continuous.webp",
      },
      {
        name: "Paper supplies",
        description:
          "Copier paper, card and speciality stock sold by the ream or box, available to collect locally.",
        longDescription: [
          "As well as printing, we sell the paper itself — everyday white copier paper by the ream or box, heavier card for covers and craft work, plus coloured, recycled and speciality stocks that are hard to find on the high street. It saves a trip across town when you just need a box of A4 before Monday morning.",
          "Trade and bulk pricing is available if you're getting through paper regularly, and because we're local you can collect the same day or have it dropped in with your next print delivery. Not sure which weight you need? Tell us what you're printing and we'll point you at the right stock.",
        ],
        tags: ["By the ream or box", "Trade pricing"],
        image: "/paper-supplies.webp",
        icon: Files,
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Black and white and colour copying and business forms, printed locally in Lower Sydenham, south east London.",
  },
  {
    slug: "calendars",
    name: "Calendars",
    tagline: "Custom printed calendars",
    intro:
      "Custom printed calendars for the office, the workshop or as a client gift.",
    icon: Calendar,
    image: "/calendars.webp",
    items: [
      {
        name: "Calendars",
        description:
          "Custom printed wall or desk calendars with your own photos and dates, ideal as a client gift.",
        longDescription: [
          "A calendar sits somewhere visible for a full twelve months, making it one of the longest-lasting branded gifts you can send to clients or keep in the workshop yourself. We print wall and desk formats with your own photography, company dates and public holidays marked, wire-bound for easy turning and hanging.",
          "Order ahead of the new year for the best choice of turnaround slots, since this is one of our more seasonal jobs and slots do fill up as December approaches.",
        ],
        tags: ["Wall or desk formats", "Custom photos and dates"],
        image: "/calendar2.webp",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Custom printed calendars, produced locally in Lower Sydenham, south east London.",
  },
  {
    slug: "schools",
    name: "Schools & Education",
    tagline: "Prospectuses, newsletters and everyday school print",
    intro:
      "Prospectuses, newsletters, exercise books and open day signage — the everyday print that keeps a school running and looking its best to prospective parents.",
    icon: GraduationCap,
    image: "/school-prospectuses.webp",
    items: [
      {
        name: "Prospectuses & open day brochures",
        description:
          "Full-colour prospectuses and open day brochures for schools, printed and bound ready for prospective parents.",
        longDescription: [
          "A prospectus is often a parent's first real impression of a school, so it needs to read as polished as the education on offer. We print full colour on quality gloss or matte stock, saddle-stitched for a slim, open-day-ready booklet or perfect bound with a squared spine for a fuller admissions pack, and can carry your school's photography, crest and house colours throughout. Every layout is proofed with you before it goes anywhere near a press.",
          "We work with primary and secondary schools each year ahead of open evenings and application deadlines, when a fast turnaround matters most. Updates for a new intake are quick once your layout is on file, and we can print matching open day signage and feeder-school mailers from the same artwork so everything a visiting parent sees looks joined-up.",
        ],
        tags: [
          "A4 or A5 formats",
          "Saddle-stitch or perfect bound",
          "Open day ready",
        ],
        image: "/school-prospectuses.webp",
      },
      {
        name: "Yearbooks",
        description:
          "Full-colour yearbooks capturing the school year, printed and bound as a keepsake pupils will hang onto.",
        longDescription: [
          "A yearbook is one of the few things a pupil keeps for decades, so it needs to hold up to that. We print full colour throughout on quality stock, in softback or hardback with a squared, perfect-bound spine, handling photo-heavy layouts — class photos, leavers' pages, house and club sections — without the colour or detail dropping off.",
          "These are proofed carefully given how many individual photos are usually involved, and we work to end-of-term deadlines so copies are ready before the summer holidays. Bulk pricing applies per year group, and we can hold your cover artwork on file for next year's edition.",
        ],
        tags: [
          "Softback or hardback",
          "Full-colour photo pages",
          "End-of-year ready",
        ],
        image: "/school-yearbooks.webp",
      },
      {
        name: "Open day signage & banners",
        description:
          "Directional signage, pull-up banners and welcome boards for open days, tours and school events.",
        longDescription: [
          "Visitors need clear direction from the car park to the hall, so we print weatherproof board signage for outdoor routes and pull-up banners for reception and welcome desks, matched to the branding and photography used in your prospectus.",
          "Turnaround is kept fast ahead of a fixed open evening date that can't move, and banner graphics can be swapped out on the same stand if your messaging changes before the next event.",
        ],
        tags: [
          "Indoor & outdoor options",
          "Matches your prospectus branding",
          "Fast turnaround",
        ],
        image: "/school-open-day-signage.webp",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Prospectuses, newsletters, exercise books and open day signage, printed locally for schools in Lower Sydenham, south east London.",
  },
  {
    slug: "funeral-stationery",
    name: "Funeral Stationery",
    tagline: "Orders of service and memorial cards",
    intro:
      "Orders of service, memorial cards and funeral stationery, handled with care and a fast turnaround.",
    icon: Flower,
    image: "/fun.webp",
    items: [
      {
        name: "Orders of service",
        description:
          "Orders of service printed with care and a fast turnaround, personalised with photos if wished.",
        longDescription: [
          "We understand these are printed at short notice and under difficult circumstances, so we prioritise a fast, sensitive turnaround without cutting corners on quality. Orders of service can include favourite photographs, readings, hymns and the order of the day, laid out and proofed with you before printing.",
          "Folded booklet formats in a range of page counts are available to suit shorter or longer services, and we're happy to talk changes through over the phone if it's easier than email at a time like this.",
        ],
        tags: ["Sensitive turnaround", "Custom photos"],
        image: "/order.webp",
      },
      {
        name: "Memorial cards",
        description:
          "Premium card-stock memorial cards with personalised wording, printed quickly when it matters.",
        longDescription: [
          "Memorial cards are often kept for years, so we print them on premium card stock with a photograph and personalised wording chosen by the family, finished to a standard that reflects how much care has gone into it. Turnaround is kept fast to fit around funeral timescales.",
          "We're happy to talk through wording and layout over the phone if that's easier, and rounded corners with a soft matte finish are popular choices for a gentler, more considered feel.",
        ],
        tags: ["Premium card stock", "Personalised wording"],
        image: "/mem.webp",
      },

      {
        name: "Photo tributes",
        description:
          "Large-format photo tributes printed to a high quality for services and gatherings.",
        longDescription: [
          "A large-format photo tribute gives mourners something to gather around at a service or wake, printed to a high quality that does justice to treasured photographs. We can work from a single image or a collage of photos supplied by the family, mounted or printed as a standalone board ready to display.",
          "A fast turnaround is standard, given how little notice these are usually ordered with, and we'll guide you through image selection if you're not sure which photos will print best at a larger size.",
        ],
        tags: ["Large format", "High quality printing"],
        image: "/photo-tribute.webp",
      },
    ],
    cta: { label: "Call us", href: "tel:+442072777663" },
    metaDescription:
      "Orders of service, memorial cards and funeral stationery, printed with care and a fast turnaround in Lower Sydenham, south east London.",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function slugifyItemName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategoryItem(categorySlug: string, itemSlug: string) {
  const category = getCategory(categorySlug);
  const item = category?.items.find(
    (i) => slugifyItemName(i.name) === itemSlug,
  );
  if (!category || !item) return undefined;
  return { category, item };
}
