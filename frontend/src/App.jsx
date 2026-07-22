import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Plus, Minus, Trash2, X, ChevronDown, Award, Globe, ShieldCheck, Calendar, Star, Quote, FileText, MapPin, CheckCircle, Download, Eye } from 'lucide-react';
import './App.css';

// Certifications Data
const CERTIFICATIONS_DATA = [
  {
    id: "cert-epch-rcmc",
    title: "EPCH Registration-Cum-Membership Certificate",
    issuer: "Export Promotion Council for Handicrafts (Govt. of India)",
    regNo: "28272 (IEC: 2993000039)",
    validity: "Valid through 30/04/2026",
    iconName: "FileText",
    badge: "Official RCMC Document",
    description: "Official EPCH RCMC Membership Certificate granted to Giftmark Industries as a recognized Manufacturer Exporter of Handicrafts under the Foreign Trade Policy.",
    downloadUrl: "/uploads/epch_membership_certificate.jpg",
    previewImage: "/uploads/epch_membership_certificate.jpg",
    isDownloadable: true
  },
  {
    id: "cert-ihgf-fair",
    title: "EPCH 53rd IHGF Delhi Fair Space Allotment & Trade Certificate",
    issuer: "Export Promotion Council for Handicrafts (EPCH)",
    regNo: "Ref: EPCH/DFI-(53)/MK/7289",
    validity: "Official Expo Confirmation",
    iconName: "FileText",
    badge: "Official Trade Expo",
    description: "Official EPCH Space Allotment & Registration Certificate confirming Giftmark Industries' participation at the 53rd IHGF Delhi Fair (Spring 2022).",
    downloadUrl: "/uploads/ihgf_delhi_fair_acknowledgement.jpg",
    previewImage: "/uploads/ihgf_delhi_fair_acknowledgement.jpg",
    isDownloadable: true
  },
  {
    id: "cert-ambiente-frankfurt",
    title: "Messe Frankfurt Ambiente Stand Space Allotment Certificate",
    issuer: "Messe Frankfurt Exhibition GmbH (Frankfurt, Germany)",
    regNo: "Customer: 12186982 (Doc: 1350186429)",
    validity: "Official International Allotment",
    iconName: "FileText",
    badge: "Official Trade Document",
    description: "Official Messe Frankfurt Stand Space Proposal & Allotment Certificate confirming Giftmark Industries' booth placement in Hall 10.1 Stand E21 at Ambiente Frankfurt Germany.",
    downloadUrl: "/uploads/ambiente_frankfurt_stand_proposal.jpg",
    previewImage: "/uploads/ambiente_frankfurt_stand_proposal.jpg",
    isDownloadable: true
  },
  {
    id: "cert-59th-ihgf-2025",
    title: "EPCH 59th IHGF Delhi Fair Stand Allotment Certificate (Spring 2025)",
    issuer: "Export Promotion Council for Handicrafts (EPCH)",
    regNo: "Ref: LP-632 / Memb. No. 7289",
    validity: "Official 2025 Expo Allotment",
    iconName: "FileText",
    badge: "Official Trade Expo",
    description: "Official EPCH Stand Allotment Letter confirming Giftmark Industries' 36 Sq. Mt. showcase space in Hall 11, Stand G-10/05 at the 59th IHGF Delhi Fair (Spring 2025).",
    downloadUrl: "/uploads/ihgf_delhi_fair_2025_allotment.jpg",
    previewImage: "/uploads/ihgf_delhi_fair_2025_allotment.jpg",
    isDownloadable: true
  },
  {
    id: "cert-khadhya-khurak-2024",
    title: "Khadhya Khurak 2024 Food & Hospitality Expo Certificate",
    issuer: "Khimashia Associates & Khadhya Khurak News",
    regNo: "Gandhinagar, Gujarat Expo 2024",
    validity: "Official Hospitality Partner",
    iconName: "FileText",
    badge: "Official Hospitality Expo",
    description: "Official Participation Certificate confirming Giftmark Industries at Khadhya Khurak 2024 — India's premier Food Processing & Hospitality exhibition at Gandhinagar, Gujarat.",
    downloadUrl: "/uploads/khadhya_khurak_2024_participation.jpg",
    previewImage: "/uploads/khadhya_khurak_2024_participation.jpg",
    isDownloadable: true
  },
  {
    id: "cert-itpo-iitf-2021",
    title: "ITPO India International Trade Fair Registration Certificate",
    issuer: "India Trade Promotion Organisation (ITPO, Govt. of India)",
    regNo: "Pragati Maidan, New Delhi (IITF 2021)",
    validity: "Official Trade Registration",
    iconName: "FileText",
    badge: "Official ITPO Document",
    description: "Official ITPO Registration Certificate confirming Giftmark Industries' participation at the prestigious India International Trade Fair at Pragati Maidan, New Delhi.",
    downloadUrl: "/uploads/itpo_iitf_2021_registration.jpg",
    previewImage: "/uploads/itpo_iitf_2021_registration.jpg",
    isDownloadable: true
  },
  {
    id: "cert-frankfurt-delegation-letter",
    title: "Messe Frankfurt Trade Delegation Authority Document",
    issuer: "Messe Frankfurt Delegation & Frankfurt Hauptbahnhof",
    regNo: "Date: 21-Feb-2023",
    validity: "Official Trade Delegation Record",
    iconName: "FileText",
    badge: "Official Trade Document",
    description: "Official Trade Delegation & Authority Document issued during Giftmark Industries' export representation at Messe Frankfurt, Germany.",
    downloadUrl: "/uploads/frankfurt_delegation_authority_letter.jpg",
    previewImage: "/uploads/frankfurt_delegation_authority_letter.jpg",
    isDownloadable: true
  },
  {
    id: "cert-award-5th-caterers-expo",
    title: "5th Caterers Expo 2017 Appreciation Award Trophy",
    issuer: "Jaipur Catering Dealers Samiti (JCDS)",
    regNo: "Reg. No: 370/97-98",
    validity: "Hospitality Industry Award",
    iconName: "Award",
    badge: "Excellence Trophy",
    description: "Appreciation Trophy presented to Giftmark Industries for valuable support and grand success of the 5th Caterers Expo 2017, Jaipur.",
    downloadUrl: "/uploads/award_5th_caterers_expo_2017.jpg",
    previewImage: "/uploads/award_5th_caterers_expo_2017.jpg",
    isDownloadable: true
  },
  {
    id: "cert-award-gifts-expo-2011",
    title: "Gifts Expo 2011 Participation Award Trophy",
    issuer: "MEX Media Exposition & Events",
    regNo: "Pragati Maidan, New Delhi (July 2011)",
    validity: "Participation & Support Award",
    iconName: "Award",
    badge: "Excellence Trophy",
    description: "Participation Award Trophy presented to Giftmark Industries for valuable contribution and support in making Gifts Expo 2011 a grand success at Pragati Maidan, New Delhi.",
    downloadUrl: "/uploads/award_gifts_expo_2011.jpg",
    previewImage: "/uploads/award_gifts_expo_2011.jpg",
    isDownloadable: true
  },
  {
    id: "cert-award-stainless-steel-2016",
    title: "6th Indian Stainless Steel Houseware Show 2016 Award Plaque",
    issuer: "Steel Market Info",
    regNo: "Pragati Maidan, New Delhi (July 2016)",
    validity: "Houseware Industry Recognition",
    iconName: "Award",
    badge: "Excellence Plaque",
    description: "Official Commemorative Award Plaque presented to Giftmark Industries at the 6th Indian Stainless Steel Houseware Show & 2nd Indian Stainless Steel Pipe Expo at Pragati Maidan, New Delhi.",
    downloadUrl: "/uploads/award_6th_stainless_steel_houseware_2016.jpg",
    previewImage: "/uploads/award_6th_stainless_steel_houseware_2016.jpg",
    isDownloadable: true
  },
  {
    id: "cert-award-faic-2024",
    title: "Federation of All India Caterers (FAIC) 5th Convention Award Frame",
    issuer: "Federation of All India Caterers (FAIC)",
    regNo: "Hitex, Hyderabad (August 2024)",
    validity: "All-India Catering Industry Award",
    iconName: "Award",
    badge: "Gold Medal Frame",
    description: "Framed Gold Medal Participation Award presented to Giftmark at the 5th FAIC Convention & Exhibition held at Hitex, Hyderabad on 9, 10, 11 August 2024.",
    downloadUrl: "/uploads/award_faic_5th_convention_2024.jpg",
    previewImage: "/uploads/award_faic_5th_convention_2024.jpg",
    isDownloadable: true
  }
];

// Exhibitions & Trade Fairs Data
const EXHIBITIONS_DATA = [
  {
    id: "ex-mega-show",
    title: "MEGA SHOW International Trade Expo (Booth 3U-1 & 2)",
    venue: "Hong Kong Convention and Exhibition Centre (HKCEC)",
    date: "Annual Global Trade Showcase",
    booth: "Stall 3U-1 & 2 (India Pavilion)",
    tag: "International Expo",
    image: "/uploads/exhibition_stall_front.jpg",
    previewImage: "/uploads/exhibition_stall_front.jpg",
    downloadUrl: "/uploads/exhibition_stall_front.jpg",
    badge: "International Trade Expo",
    issuer: "MEGA SHOW / Hong Kong Trade Fair",
    description: "Giftmark Industries' grand multi-bay exhibition stall showcasing handcrafted metallic art vases, copper urns, and luxury decorative hardware at MEGA SHOW."
  },
  {
    id: "ex-booth-entrance",
    title: "Giftmark Grand Trade Stall Entrance",
    venue: "International Convention & Exhibition Center",
    date: "Global B2B Showcase",
    booth: "Stall 3U-1 & 2 (India Pavilion)",
    tag: "Trade Showcase",
    image: "/uploads/exhibition_stall_corner.jpg",
    previewImage: "/uploads/exhibition_stall_corner.jpg",
    downloadUrl: "/uploads/exhibition_stall_corner.jpg",
    badge: "Exhibition Showcase",
    issuer: "Global Trade Fairs",
    description: "Elegant entrance view of Giftmark Industries' trade pavilion, lined with red velvet stanchions, silver-plated pedestal floor vases, and heritage metalware."
  },
  {
    id: "ex-display-bay",
    title: "Handcrafted Metalware & Vase Display Gallery",
    venue: "Giftmark Pavilion — International Trade Expo",
    date: "B2B Export Exhibition",
    booth: "Stall 3U-1 & 2",
    tag: "Product Exhibition",
    image: "/uploads/exhibition_display_shelves.jpg",
    previewImage: "/uploads/exhibition_display_shelves.jpg",
    downloadUrl: "/uploads/exhibition_display_shelves.jpg",
    badge: "Artisan Gallery",
    issuer: "Handicrafts & Decor Expo",
    description: "Interior display gallery presenting signature hand-hammered brass urns, textured metallic vases, and hotelware decor collections."
  },
  {
    id: "ex-perspective-view",
    title: "Multi-Bay Export Pavilion Setup",
    venue: "International Trade Centre",
    date: "Global Export Expo",
    booth: "Stall 3U-1 & 2 (India)",
    tag: "Trade Pavilion",
    image: "/uploads/exhibition_stall_perspective.jpg",
    previewImage: "/uploads/exhibition_stall_perspective.jpg",
    downloadUrl: "/uploads/exhibition_stall_perspective.jpg",
    badge: "Export Showcase",
    issuer: "Global Handicrafts Expo",
    description: "Wide perspective angle of Giftmark's expansive 3U-1 & 2 stall featuring tier-shelved brassware and customer meeting lounge area."
  },
  {
    id: "ex-side-view",
    title: "Side Entrance & Pedestal Floor Display",
    venue: "International Exhibition Hall",
    date: "Trade Fair Gallery",
    booth: "Stall 3U-1 & 2 (India)",
    tag: "Trade Showcase",
    image: "/uploads/exhibition_stall_side.jpg",
    previewImage: "/uploads/exhibition_stall_side.jpg",
    downloadUrl: "/uploads/exhibition_stall_side.jpg",
    badge: "Exhibition Gallery",
    issuer: "Handicraft Export Council",
    description: "Side entrance display showcasing metallic floor vases, decorative hammered brass bowls, and custom hotel catering accents."
  }
];

// Fallback data if backend is not reachable
const DEFAULT_COLLECTIONS = [
  {
    id: "01",
    title: "Filigree Brass Serving Tray",
    image: "http://localhost:5000/uploads/brass_tray_bowls.png",
    localImage: "/uploads/brass_tray_bowls.png",
    category: "Home Décor",
    price: "₹6,500 / $80",
    description: "Intricately detailed serving tray featuring traditional Indian hand-filigree patterns."
  },
  {
    id: "02",
    title: "Ornate Brass Candle Holder Set",
    image: "http://localhost:5000/uploads/metal_sculptures.png",
    localImage: "/uploads/metal_sculptures.png",
    category: "Home Décor",
    price: "₹4,800 / $60",
    description: "Classic metallic accents that combine traditional craftsmanship with modern design."
  },
  {
    id: "03",
    title: "Astrolabe Armillary Sphere",
    image: "http://localhost:5000/uploads/brass_globes.png",
    localImage: "/uploads/brass_globes.png",
    category: "Home Décor",
    price: "₹12,500 / $150",
    description: "A signature brass marine instrument evoking global exports and historical detail."
  },
  {
    id: "04",
    title: "Luxury Brass Chafing Dish",
    image: "http://localhost:5000/uploads/catering_essential.png",
    localImage: "/uploads/catering_essential.png",
    category: "Hospitality",
    price: "₹18,500 / $225",
    description: "Chafing dish and serving ware crafted for luxury hotels, catering, and restaurants."
  },
  {
    id: "05",
    title: "Polished Brass Fruit Bowl",
    image: "http://localhost:5000/uploads/brass_tray_bowls.png",
    localImage: "/uploads/brass_tray_bowls.png",
    category: "Hospitality",
    price: "₹3,900 / $48",
    description: "Decorative and functional hammered brass bowl with traditional scalloped rim."
  },
  {
    id: "06",
    title: "Classic Distressed Sideboard",
    image: "http://localhost:5000/uploads/restored_classics.png",
    localImage: "/uploads/restored_classics.png",
    category: "Hospitality",
    price: "₹45,000 / $550",
    description: "Rustic wooden sideboard highlighting copper accents and custom metal hardware."
  },
  {
    id: "07",
    title: "Ornate Gilded Mantle Clock",
    image: "http://localhost:5000/uploads/brass_clocks.png",
    localImage: "/uploads/brass_clocks.png",
    category: "Giftware",
    price: "₹15,000 / $185",
    description: "Gilded pendulum mantle clock designed for premium corporate gifting and heritage decor."
  },
  {
    id: "08",
    title: "Hand-Hammered Copper Kettle",
    image: "http://localhost:5000/uploads/brass_vessels.png",
    localImage: "/uploads/brass_vessels.png",
    category: "Giftware",
    price: "₹5,200 / $65",
    description: "Weathered brass and copper tea kettle showcasing rich hand-hammered textures."
  },
  {
    id: "09",
    title: "Traditional Brass Spice Box",
    image: "http://localhost:5000/uploads/brass_vessels.png",
    localImage: "/uploads/brass_vessels.png",
    category: "Utility",
    price: "₹3,500 / $42",
    description: "A functional and decorative multi-compartment container for kitchen organization."
  },
  {
    id: "10",
    title: "Ornate Lion-Head Brass Lock",
    image: "http://localhost:5000/uploads/restored_classics.png",
    localImage: "/uploads/restored_classics.png",
    category: "Utility",
    price: "₹2,800 / $35",
    description: "Heavy-duty traditional padlock featuring antique detailing, functional keys, and keyhole cover."
  }
];

const HERO_SLIDES = [
  {
    name: "Brass Astrolabe",
    subtitle: "ESTABLISHED IN 1993",
    title: "THE ART OF\nLEAVING A MARK",
    description: "Since 1993, we have combined generations of Indian craftsmanship with global exports to offer distinctive home décor, hospitality, catering, and giftware collections.",
    mainLocalImage: "/uploads/brass_astrolabe.png",
    bgColor: "#ECEAE6",
    bgImage: "/uploads/brass_globes.png",
    productId: "03"
  },
  {
    name: "Brass Ganesha",
    subtitle: "HANDCRAFTED DEITY SCULPTURES",
    title: "SACRED\nBRASS ART",
    description: "Traditional Indian Ganesha deity sculptures cast in solid premium brass, featuring intricate hand-carved detailing and polished antique patinas.",
    mainLocalImage: "/uploads/brass_ganesha.png",
    bgColor: "#EFECE8",
    bgImage: "/uploads/story_workshop.png",
    productId: "07"
  },
  {
    name: "Brass Peacock Lamp",
    subtitle: "LUXURY DECORATIVE PIECES",
    title: "PRECISION\nGOLD & BRASS",
    description: "Elegantly sculpted peacock lamps and candelabras finished in satin brass gold, capturing centuries of artisanal metalcraft traditions.",
    mainLocalImage: "/uploads/brass_peacock_lamp.png",
    bgColor: "#EAECE6",
    bgImage: "/uploads/story_buffet.png",
    productId: "01"
  },
  {
    name: "Bronze Nataraja",
    subtitle: "AWARD-WINNING METALWORK",
    title: "CONTEMPORARY\nBRONZE DESIGN",
    description: "Intricately detailed antique bronze Nataraja sculpture representing the divine cosmic dance, finished with authentic weathered patinas.",
    mainLocalImage: "/uploads/bronze_nataraja.png",
    bgColor: "#EFEBE6",
    bgImage: "/uploads/story_sculpture_bust.png",
    productId: "08"
  }
];

const LEGAL_TEXTS = {
  privacy: {
    title: "Privacy Policy",
    body: (
      <>
        <p><strong>Last Updated: July 2026</strong></p>
        <p>Giftmark Industries committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Giftmark Industries.</p>
        <h4>Information Collection</h4>
        <p>We collect information you provide directly to us when you fill out B2B inquiry forms, request trade catalog details, or communicate with our export sales team. This may include your name, business email, contact number (+91 98975 83968), company name, and shipping address.</p>
        <h4>How We Use Your Information</h4>
        <p>We use the information we collect to manage global bulk orders, respond to catering and custom manufacturing inquiries, verify trade credentials, and send catalog updates. We do not sell or share your business data with third-party advertisers.</p>
        <h4>Global Data Standards</h4>
        <p>As an international exporter serving regions like the EU, USA, UK, Germany, and the UAE, we respect privacy regulations (including GDPR and CCPA) in handling corporate and personal data.</p>
      </>
    )
  },
  refund: {
    title: "Refund & Return Policy",
    body: (
      <>
        <p><strong>Last Updated: July 2026</strong></p>
        <p>At Giftmark Industries, we pride ourselves on exceptional craftsmanship, B2B quality assurance, and global compliance. Due to the bespoke and custom nature of handcrafted metalware, sculptures, and custom bulk shipments, we adhere to the following policies:</p>
        <h4>Damaged or Defective Items</h4>
        <p>All items undergo strict quality inspection prior to port loading. In the rare event of transit damage, claims must be logged within 7 days of customs clearance. Please supply photographic proof alongside your bill of lading.</p>
        <h4>Custom Orders & Bulk Shipments</h4>
        <p>Deposits paid for custom designs, hotel hospitality collections, or custom metal castings are non-refundable once production starts. Returns are only authorized if there is a deviation from approved pre-production samples.</p>
      </>
    )
  },
  terms: {
    title: "Terms & Conditions",
    body: (
      <>
        <p><strong>Last Updated: July 2026</strong></p>
        <p>These Terms of Service govern your use of our website and trade services. By submitting inquiries to Giftmark Industries, you agree to these conditions.</p>
        <h4>B2B Trade Pricing & Orders</h4>
        <p>Prices displayed on the website are mock indicators for retail reference. Full pricing for container-load exports, custom sizes, or metal volume pricing is quoted via Proforma Invoice. We offer flexible FOB and CIF terms.</p>
        <h4>Intellectual Property</h4>
        <p>All catalog designs, filigree patterns, and trade photography are the exclusive intellectual property of Giftmark Industries (established 1993) and cannot be replicated without written consent from Mohammed Adil Shamsi.</p>
      </>
    )
  },
  disclaimer: {
    title: "Disclaimer",
    body: (
      <>
        <p><strong>Last Updated: July 2026</strong></p>
        <p>The information on this website is provided on an "as is" and "as available" basis. Giftmark Industries makes no guarantees regarding the exact metal oxidization or wood grains, as each antique and handcrafted piece has unique variations.</p>
        <h4>Exhibition & Award Credentials</h4>
        <p>References to international exhibitions (such as Canton Fair in China, and platforms across India, UK, Germany, and UAE) and the 2019 China business award are accurate as of our official corporate history records. The final website will update specific certificates upon official validation.</p>
      </>
    )
  }
};


const TESTIMONIALS = [
  {
    id: 1,
    quote: "Giftmark Industries has been our primary supplier for high-end hotel metalware for over a decade. Their consistency in quality, attention to detail, and reliable timelines is unmatched in the industry.",
    author: "Rajesh Mehta",
    role: "Procurement Director",
    company: "Grand Luxury Hotels Group",
    location: "Dubai, UAE",
    rating: 5,
    initial: "R"
  },
  {
    id: 2,
    quote: "Every season, their new collections at the Canton Fair set a benchmark for craftsmanship. Working with Giftmark means working with artisans who truly understand the global market. A reliable partner for any serious importer.",
    author: "Klaus Bauer",
    role: "Head of Imports",
    company: "Europäische Dekor GmbH",
    location: "Frankfurt, Germany",
    rating: 5,
    initial: "K"
  },
  {
    id: 3,
    quote: "The brass filigree trays and serving ware we ordered exceeded our expectations. The craftsmanship is extraordinary, and the bulk pricing for our hospitality business was very competitive. We've re-ordered three times already.",
    author: "Priya Sharma",
    role: "F&B Procurement Manager",
    company: "The Heritage Banquet Co.",
    location: "Mumbai, India",
    rating: 5,
    initial: "P"
  },
  {
    id: 4,
    quote: "As a boutique décor retailer, sourcing unique pieces is everything. Giftmark's handcrafted sculptures and clocks are conversation pieces our customers love. Their export packaging is also flawless — zero damages across all orders.",
    author: "Sophie Laurent",
    role: "Owner",
    company: "Maison Artisanat Boutique",
    location: "London, UK",
    rating: 5,
    initial: "S"
  },
  {
    id: 5,
    quote: "We've partnered with Giftmark for our annual corporate gifting program for three years running. The customisation options, engraving quality, and the premium packaging make these gifts truly memorable for our clients.",
    author: "Thomas Nkosi",
    role: "Corporate Relations Head",
    company: "Prestige Global Corp.",
    location: "Johannesburg, South Africa",
    rating: 5,
    initial: "T"
  }
];

const MOCK_REELS = [
  {
    id: "reel-01",
    title: "Handcrafting Ganesha Deity",
    views: "18.4K",
    likes: "2.5K",
    comments: 142,
    image: "/uploads/brass_ganesha.png",
    caption: "Behind the scenes casting our sacred solid brass Ganesha. Generations of devotion and details. 🕉️✨",
    tags: ["#artisan", "#metalcasting", "#heritage", "#giftmark"],
    link: "https://www.instagram.com/industriesgiftmark?igsh=aHdxdTBieTdnN28w"
  },
  {
    id: "reel-02",
    title: "Polishing Peacock Lamp",
    views: "12.2K",
    likes: "1.8K",
    comments: 98,
    image: "/uploads/brass_peacock_lamp.png",
    caption: "Polishing the intricate details of our satin gold Peacock Candelabra. ✨🦚",
    tags: ["#brassdecor", "#luxuryinteriors", "#craftsmanship"],
    link: "https://www.instagram.com/industriesgiftmark?igsh=aHdxdTBieTdnN28w"
  },
  {
    id: "reel-03",
    title: "Vibe of Astrolabe Sphere",
    views: "24.5K",
    likes: "3.9K",
    comments: 310,
    image: "/uploads/brass_astrolabe.png",
    caption: "A glance into the historical details of our Astrolabe Armillary Sphere. Crafting precision since 1993. 🧭",
    tags: ["#astronomy", "#vintagedecor", "#maritime", "#giftware"],
    link: "https://www.instagram.com/industriesgiftmark?igsh=aHdxdTBieTdnN28w"
  },
  {
    id: "reel-04",
    title: "Bronze Nataraja Sculpting",
    views: "15.1K",
    likes: "2.1K",
    comments: 175,
    image: "/uploads/bronze_nataraja.png",
    caption: "Unveiling the award-winning weathered bronze Nataraja sculpture. A masterpiece of movement and power. 🔱",
    tags: ["#bronzeart", "#indianhandicrafts", "#handmade"],
    link: "https://www.instagram.com/industriesgiftmark?igsh=aHdxdTBieTdnN28w"
  }
];

function InstagramReels() {
  const [selectedReel, setSelectedReel] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (selectedReel) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [selectedReel]);

  return (
    <section className="reels-section" aria-label="Instagram Reels Showcase">
      <div className="reels-header">
        <span className="reels-eyebrow">Craft in Motion</span>
        <h2 className="reels-title">Explore Our Reels</h2>
        <p className="reels-subtitle">
          Get a behind-the-scenes look at our workshop, artisanal processes, and latest product releases.
        </p>
        <a
          href="https://www.instagram.com/industriesgiftmark?igsh=aHdxdTBieTdnN28w"
          target="_blank"
          rel="noopener noreferrer"
          className="reels-handle-link"
        >
          @industriesgiftmark
        </a>
      </div>

      <div className="reels-grid">
        {MOCK_REELS.map((reel) => (
          <div
            key={reel.id}
            className="reel-card"
            onClick={() => setSelectedReel(reel)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedReel(reel)}
          >
            <div className="reel-cover-wrapper">
              <img src={reel.image} alt={reel.title} className="reel-cover-img" />
              <div className="reel-overlay">
                <div className="reel-play-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="reel-meta">
                  <span className="reel-meta-item">
                    <span className="meta-icon">👁️</span> {reel.views}
                  </span>
                  <span className="reel-meta-item">
                    <span className="meta-icon">❤️</span> {reel.likes}
                  </span>
                </div>
              </div>
            </div>
            <div className="reel-info">
              <p className="reel-caption">{reel.caption.slice(0, 70)}...</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Video Player Modal */}
      {selectedReel && (
        <div className="reel-modal-overlay" onClick={() => setSelectedReel(null)}>
          <div className="reel-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="reel-modal-close"
              onClick={() => setSelectedReel(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="reel-modal-body">
              {/* Left Column: Simulated Video Player */}
              <div className="reel-video-container">
                <img src={selectedReel.image} alt="Simulated video" className={`reel-video-mockup ${isPlaying ? 'playing' : ''}`} />
                <div className="video-glow-blob"></div>
                {/* Simulated play animation / overlay */}
                <div className="reel-video-controls">
                  <button className="video-play-pause-btn" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <div className="video-progress-bar">
                    <div className="video-progress-filled" style={{ width: isPlaying ? '100%' : '0%', transition: isPlaying ? 'width 10s linear' : 'none' }}></div>
                  </div>
                </div>
                <div className="video-live-tag">REEL</div>
              </div>

              {/* Right Column: Profile & Comments */}
              <div className="reel-details-panel">
                <div className="reel-details-header">
                  <div className="reel-profile-avatar">G</div>
                  <div>
                    <span className="reel-profile-name">giftmark_industries</span>
                    <span className="reel-profile-sub">Moradabad, India</span>
                  </div>
                </div>

                <div className="reel-details-caption">
                  <p>{selectedReel.caption}</p>
                  <div className="reel-details-tags">
                    {selectedReel.tags.map((tag, i) => (
                      <span key={i} className="reel-tag-item">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="reel-comments-list">
                  <div className="reel-comment">
                    <strong>craft_lover99</strong> Absolutely stunning work! The finish is incredible. 🔥
                  </div>
                  <div className="reel-comment">
                    <strong>hotel_decor_co</strong> Do you ship container volumes of this to the UAE?
                  </div>
                  <div className="reel-comment">
                    <strong>giftmark_industries</strong> @hotel_decor_co Yes, we do! Please send us a WhatsApp enquiry using the link on our profile to discuss terms.
                  </div>
                </div>

                <div className="reel-details-footer">
                  <div className="reel-details-stats">
                    <span>❤️ {selectedReel.likes} likes</span>
                    <span>💬 {selectedReel.comments} comments</span>
                  </div>
                  <a
                    href={selectedReel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reel-instagram-cta"
                  >
                    View on Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function TestimonialsCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const featured = TESTIMONIALS[activeIdx];
  const sideItems = TESTIMONIALS.filter((_, i) => i !== activeIdx).slice(0, 2);

  return (
    <section className="tm-section" aria-label="Customer Testimonials">
      {/* Section Header */}
      <div className="tm-section-header">
        <div className="tm-header-left">
          <span className="tm-eyebrow">Client Testimonials</span>
          <h2 className="tm-title">Trusted by Leaders<br />Across the Globe</h2>
        </div>
        <div className="tm-header-right">
          <p className="tm-subtitle">
            Over three decades of craft, backed by the trust of hospitality groups,
            importers, and boutique retailers across 20+ countries.
          </p>
          <div className="tm-dot-nav">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                className={`tm-dot${idx === activeIdx ? ' active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="tm-grid">
        {/* Featured card */}
        <div className="tm-featured-card" key={featured.id}>
          <div className="tm-featured-top">
            <div className="tm-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="var(--color-accent)" stroke="none" className="tm-star-icon" />
              ))}
            </div>
            <Quote className="tm-quote-icon" size={32} />
          </div>
          <blockquote className="tm-featured-quote">
            {featured.quote}
          </blockquote>
          <div className="tm-featured-divider" />
          <div className="tm-author-row">
            <div className="tm-avatar tm-avatar-lg">{featured.initial}</div>
            <div className="tm-author-details">
              <span className="tm-author-name">{featured.author}</span>
              <span className="tm-author-role">{featured.role}</span>
              <span className="tm-author-company">{featured.company}</span>
              <span className="tm-author-location">{featured.location}</span>
            </div>
          </div>
        </div>

        {/* Side cards */}
        <div className="tm-side-stack">
          {sideItems.map((t) => (
            <div
              key={t.id}
              className="tm-side-card"
              onClick={() => setActiveIdx(TESTIMONIALS.findIndex(x => x.id === t.id))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveIdx(TESTIMONIALS.findIndex(x => x.id === t.id))}
            >
              <div className="tm-side-top">
                <div className="tm-avatar tm-avatar-sm">{t.initial}</div>
                <div>
                  <span className="tm-side-name">{t.author}</span>
                  <span className="tm-side-role">{t.role} · {t.company}</span>
                </div>
              </div>
              <p className="tm-side-quote">"{t.quote.slice(0, 110)}…"</p>
              <span className="tm-side-location">{t.location}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="tm-stats-bar">
        <div className="tm-stat">
          <span className="tm-stat-num">32+</span>
          <span className="tm-stat-label">Years in Business</span>
        </div>
        <div className="tm-stat-divider" />
        <div className="tm-stat">
          <span className="tm-stat-num">20+</span>
          <span className="tm-stat-label">Countries Served</span>
        </div>
        <div className="tm-stat-divider" />
        <div className="tm-stat">
          <span className="tm-stat-num">500+</span>
          <span className="tm-stat-label">B2B Partners</span>
        </div>
        <div className="tm-stat-divider" />
        <div className="tm-stat">
          <span className="tm-stat-num">5★</span>
          <span className="tm-stat-label">Avg. Partner Rating</span>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'about', 'collections', 'contact'
  const [collections, setCollections] = useState(DEFAULT_COLLECTIONS);
  const [heroIndex, setHeroIndex] = useState(0);
  const [backendStatus, setBackendStatus] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Inquiry form states
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    quantity: '100',
    message: ''
  });
  const [formSuccess, setFormSuccess] = useState(null);

  // Legal Modal states
  const [activeLegal, setActiveLegal] = useState(null); // 'privacy', 'refund', 'terms', 'disclaimer' or null

  // Certifications Viewer Modal state
  const [activeCertModal, setActiveCertModal] = useState(null);

  // Cart states
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Helper to parse price string to number for subtotal (e.g. "₹6,500 / $80" -> 6500)
  const parsePrice = (priceStr) => {
    try {
      const rupeePart = priceStr.split('/')[0];
      const numeric = rupeePart.replace(/[^0-9]/g, '');
      return parseInt(numeric, 10) || 0;
    } catch (e) {
      return 0;
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const buyNow = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setIsCheckingOut(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty >= 1 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + parsePrice(item.product.price) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone) {
      alert("Please fill in your Name and Contact Number.");
      return;
    }

    const orderData = {
      name: checkoutForm.name,
      company: checkoutForm.company,
      email: checkoutForm.email,
      phone: checkoutForm.phone,
      notes: checkoutForm.notes,
      items: cart.map((item) => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity
      })),
      totalPrice: `₹${getCartTotal().toLocaleString()}`
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData);

      let waMessage = `*New Order Inquiry - Giftmark Industries*\n`;
      waMessage += `--------------------------------------\n`;
      waMessage += `*Buyer Details:*\n`;
      waMessage += `- Name: ${orderData.name}\n`;
      if (orderData.company) waMessage += `- Company: ${orderData.company}\n`;
      waMessage += `- WhatsApp/Phone: ${orderData.phone}\n`;
      if (orderData.email) waMessage += `- Email: ${orderData.email}\n`;
      if (orderData.notes) waMessage += `- Notes: ${orderData.notes}\n\n`;

      waMessage += `*Requested Items:*\n`;
      orderData.items.forEach((item, idx) => {
        waMessage += `${idx + 1}. ${item.title} (Qty: ${item.quantity}) - [${item.price}]\n`;
      });
      waMessage += `\n*Estimated Subtotal:* ${orderData.totalPrice}\n`;
      waMessage += `--------------------------------------\n`;
      waMessage += `Please review trade terms and freight costs.`;

      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/919897583968?text=${encodedMessage}`;

      setCart([]);
      setIsCartOpen(false);
      setIsCheckingOut(false);
      setCheckoutForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        notes: ''
      });

      alert(`Inquiry order saved! Redirecting to WhatsApp to coordinate freight & final pricing.`);
      window.open(waUrl, '_blank');
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Order submission failed. Please check backend connection.");
    }
  };

  // Fetch collections from node backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/collections')
      .then(res => {
        setCollections(res.data);
        setBackendStatus(true);
      })
      .catch(err => {
        console.log("Backend not running, using high-fidelity local fallback data.");
        setBackendStatus(false);
      });
  }, []);

  // Autoplay timer for hero slideshow
  useEffect(() => {
    if (!isAutoplay || currentPage !== 'home') return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [isAutoplay, currentPage]);

  const handleHeroNext = () => {
    setIsAutoplay(false);
    setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleHeroPrev = () => {
    setIsAutoplay(false);
    setHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const getHeroMainImage = (slide) => {
    return backendStatus ? slide.mainImage : slide.mainLocalImage;
  };

  const getHeroPreviewImage = (slide) => {
    return backendStatus ? slide.previewImage : slide.previewLocalImage;
  };

  const getCardImage = (item) => {
    return backendStatus ? item.image : item.localImage;
  };

  const handleProductInquiry = (productTitle) => {
    setInquiryForm({
      ...inquiryForm,
      product: productTitle,
      message: `Hi, we are interested in placing a bulk order for the "${productTitle}". Please send us FOB prices and packaging terms.`
    });
    setCurrentPage('contact');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/inquiry', inquiryForm)
      .then(res => {
        setFormSuccess(res.data.message);
        setInquiryForm({ name: '', email: '', phone: '', product: '', quantity: '100', message: '' });
      })
      .catch(err => {
        // Fallback mock submission
        console.log("Connecting directly through simulated form submission.");
        setFormSuccess("Thank you for your enquiry! We will get in touch with you shortly. (Simulated Submission)");
        setInquiryForm({ name: '', email: '', phone: '', product: '', quantity: '100', message: '' });
      });
  };

  // Filter collections
  const filteredCollections = activeFilter === 'All'
    ? collections
    : collections.filter(item => item.category === activeFilter);

  const currentHeroSlide = HERO_SLIDES[heroIndex];

  return (
    <div className="page-container">
      <div
        className="inner-frame"
        style={{
          backgroundColor: '#FAF8F5'
        }}
      >
        {/* --- HEADER --- */}
        <header className="header">
          <div className="logo-container" onClick={() => { setCurrentPage('home'); setHeroIndex(0); setIsAutoplay(true); }}>
            <img src="/uploads/giftmark_logo.png" alt="Giftmark Industries Logo" className="logo-img" />
            <div className="logo-text-wrapper">
              <span className="logo-main">GIFTMARK</span>
              <div className="logo-sub">
                <div className="logo-line"></div>
                <span className="logo-text">INDUSTRIES</span>
                <div className="logo-line"></div>
              </div>
            </div>
          </div>

          <nav>
            <ul className="nav-menu">
              <li>
                <span
                  className={`nav-link hover-underline ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => { setCurrentPage('home'); setIsAutoplay(true); }}
                >
                  Home
                </span>
              </li>
              <li>
                <span
                  className={`nav-link hover-underline ${currentPage === 'about' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('about')}
                >
                  About Us
                </span>
              </li>
              <li
                className={`nav-item-dropdown ${isDropdownOpen ? 'active-dropdown' : ''}`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <span
                  className={`nav-link hover-underline ${currentPage === 'collections' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage('collections');
                    setActiveFilter('All');
                    setIsDropdownOpen(false);
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  Collections <ChevronDown size={11} className="dropdown-arrow" />
                </span>
                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                  {['All', 'Home Décor', 'Hospitality', 'Giftware', 'Utility'].map((filter) => (
                    <li key={filter}>
                      <span
                        className="dropdown-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPage('collections');
                          setActiveFilter(filter);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {filter}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <span
                  className={`nav-link hover-underline ${currentPage === 'certifications' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('certifications')}
                >
                  Certifications & Exhibitions
                </span>
              </li>
              <li>
                <span
                  className={`nav-link hover-underline ${currentPage === 'contact' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('contact')}
                >
                  Contact
                </span>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <div className="header-phone">
              <span>+91 98975 83968</span>
            </div>
            <button className="header-cart-btn" onClick={() => setIsCartOpen(true)} title="Open Cart">
              <ShoppingBag size={18} />
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </button>
          </div>
        </header>

        {/* --- TRUST LINE BANNER (MARQUEE) --- */}
        <section className="trust-banner">
          <div className="marquee-track">
            <div className="marquee-content">
              <span>32+ Years of Experience</span>
              <div className="trust-dot"></div>
              <span>Global Export Presence</span>
              <div className="trust-dot"></div>
              <span>International Exhibitions</span>
              <div className="trust-dot"></div>
              <span>Award-Winning Leadership</span>
              <div className="trust-dot"></div>
              <span>Trusted B2B Partnerships</span>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <div className="trust-dot"></div>
              <span>32+ Years of Experience</span>
              <div className="trust-dot"></div>
              <span>Global Export Presence</span>
              <div className="trust-dot"></div>
              <span>International Exhibitions</span>
              <div className="trust-dot"></div>
              <span>Award-Winning Leadership</span>
              <div className="trust-dot"></div>
              <span>Trusted B2B Partnerships</span>
            </div>
          </div>
        </section>

        {/* ==================== PAGES ==================== */}

        {/* --- HOME PAGE --- */}
        {currentPage === 'home' && (
          <>
            {/* Hero Slider */}
            <main
              className="hero-section"
              style={{
                backgroundColor: currentHeroSlide.bgColor,
                transition: 'background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Dynamic Faded Background Image Overlay */}
              <div
                className="hero-bg-image-overlay"
                style={{
                  backgroundImage: `url(${currentHeroSlide.bgImage})`,
                  transition: 'background-image 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              {/* Left Panel: Arched white pedestal and revolving stage */}
              <div className="hero-left-column">
                <div className="pedestal-block">
                  <div className="pedestal-border-inner"></div>
                </div>

                <div className="product-stage">
                  <div className="slider-track">
                    {HERO_SLIDES.map((slide, idx) => {
                      let slideClass = "hero-slide";
                      if (idx === heroIndex) {
                        slideClass += " active";
                      } else if (idx === (heroIndex + 1) % HERO_SLIDES.length) {
                        slideClass += " next";
                      } else if (idx === (heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length) {
                        slideClass += " prev";
                      } else {
                        slideClass += " hidden";
                      }

                      const slideProduct = collections.find(p => p.id === slide.productId);

                      return (
                        <div className={slideClass} key={idx}>
                          {/* Soft golden glow behind active idol */}
                          {idx === heroIndex && (
                            <div className="slide-glow-bg">
                              <div className="glow-blob"></div>
                            </div>
                          )}

                          {/* Floating gold vector sparkles / mandala icons */}
                          {idx === heroIndex && (
                            <div className="floating-motifs-container">
                              <div className="floating-motif motif-1">✦</div>
                              <div className="floating-motif motif-2">✦</div>
                              <div className="floating-motif motif-3">✦</div>
                              <div className="floating-motif motif-4">✦</div>
                            </div>
                          )}

                          <img
                            src={slide.mainLocalImage + "?v=2"}
                            alt={slide.name}
                            className="revolving-idol-img"
                          />

                          {/* CTA Buttons — visible only on active slide */}
                          {idx === heroIndex && slideProduct && (
                            <div className="hero-product-cta">
                              <span className="hero-product-price">{slideProduct.price}</span>
                              <div className="hero-product-cta-buttons">
                                <button
                                  className="hero-cta-add-cart"
                                  onClick={() => addToCart(slideProduct)}
                                  title="Add to Cart"
                                >
                                  <ShoppingBag size={13} />
                                  Add to Cart
                                </button>
                                <button
                                  className="hero-cta-enquire"
                                  onClick={() => handleProductInquiry(slideProduct.title)}
                                  title="Enquire Now"
                                >
                                  Enquire Now
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Panel: Brand Typography and Controls */}
              <div className="hero-right-column" key={`text-${heroIndex}`}>
                <div className="hero-center">
                  <span className="hero-subheading hero-animate-text-1">{currentHeroSlide.subtitle}</span>
                  <h1 className="hero-title">
                    <div className="title-line-wrapper">
                      <span className="hero-animate-title-line line-1">
                        {currentHeroSlide.title.split('\n')[0]}
                      </span>
                    </div>
                    <div className="title-line-wrapper">
                      <span className="hero-animate-title-line line-2">
                        {currentHeroSlide.title.split('\n')[1]}
                      </span>
                    </div>
                  </h1>
                  <p className="hero-description hero-animate-text-3">
                    {currentHeroSlide.description}
                  </p>
                  <button className="hero-cta hero-animate-text-4" onClick={() => setCurrentPage('collections')}>
                    Explore Collection
                  </button>

                  {/* Slider controls placed underneath */}
                  <div className="hero-slider-nav">
                    <button className="slider-arrow-btn prev" onClick={handleHeroPrev}>←</button>
                    <div className="slider-line" style={{ width: '60px' }}></div>
                    <button className="slider-arrow-btn next" onClick={handleHeroNext}>→</button>
                  </div>
                </div>
              </div>
            </main>

            {/* Best Sellers (Animated Showcase) */}
            <section className="best-sellers-section">
              <div className="best-sellers-header">
                <div>
                  <span className="best-sellers-subtitle">Featured Highlights</span>
                  <h2 className="best-sellers-title">Our Best Sellers</h2>
                </div>
                <span className="best-sellers-subtitle hover-underline" onClick={() => setCurrentPage('collections')} style={{ cursor: 'pointer' }}>
                  View All Collections →
                </span>
              </div>

              <div className="best-sellers-grid">
                {collections.slice(0, 4).map((item) => (
                  <div className="best-seller-card" key={item.id}>
                    <span className="best-seller-badge">Best Seller</span>
                    <div className="best-seller-image-container">
                      <img src={getCardImage(item)} alt={item.title} className="best-seller-image" />
                    </div>
                    <div className="best-seller-info">
                      <span className="best-seller-cat">{item.category}</span>
                      <h3 className="best-seller-name">{item.title}</h3>
                      <div className="product-card-footer">
                        <span className="best-seller-price">{item.price}</span>
                        <div className="product-card-actions">
                          <button
                            className="product-action-btn cart-btn"
                            title="Add to Cart"
                            onClick={() => addToCart(item)}
                          >
                            <ShoppingBag size={14} />
                          </button>
                          <button
                            className="product-action-btn buy-btn"
                            onClick={() => buyNow(item)}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Collections Preview Section */}
            <section className="home-collections-preview" aria-label="Our Collections">
              <div className="collections-preview-header">
                <span className="collections-preview-subtitle">Curated Categories</span>
                <h2 className="collections-preview-title">Explore Our Collections</h2>
              </div>
              
              <div className="collections-preview-grid">
                {/* Home Décor */}
                <div 
                  className="collection-preview-card"
                  onClick={() => {
                    setCurrentPage('collections');
                    setActiveFilter('Home Décor');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="collection-preview-image-container">
                    <img src="/uploads/brass_tray_bowls.png" alt="Home Décor" className="collection-preview-image" />
                    <div className="collection-preview-overlay">
                      <div className="collection-preview-content">
                        <span className="collection-card-subtitle">Collection</span>
                        <h3 className="collection-card-title">Home Décor</h3>
                        <p className="collection-card-description">
                          Intricately detailed hand-filigree trays, vases, and luxury metal sculptures.
                        </p>
                        <span className="collection-card-cta">Explore Collection</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hospitality */}
                <div 
                  className="collection-preview-card"
                  onClick={() => {
                    setCurrentPage('collections');
                    setActiveFilter('Hospitality');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="collection-preview-image-container">
                    <img src="/uploads/catering_essential.png" alt="Hospitality" className="collection-preview-image" />
                    <div className="collection-preview-overlay">
                      <div className="collection-preview-content">
                        <span className="collection-card-subtitle">Collection</span>
                        <h3 className="collection-card-title">Hospitality</h3>
                        <p className="collection-card-description">
                          Premium chafing dishes, buffet ware, and custom accessories for luxury hotels.
                        </p>
                        <span className="collection-card-cta">Explore Collection</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Giftware */}
                <div 
                  className="collection-preview-card"
                  onClick={() => {
                    setCurrentPage('collections');
                    setActiveFilter('Giftware');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="collection-preview-image-container">
                    <img src="/uploads/brass_clocks.png" alt="Giftware" className="collection-preview-image" />
                    <div className="collection-preview-overlay">
                      <div className="collection-preview-content">
                        <span className="collection-card-subtitle">Collection</span>
                        <h3 className="collection-card-title">Giftware</h3>
                        <p className="collection-card-description">
                          Gilded clocks, armillary spheres, and curated premium corporate gifts.
                        </p>
                        <span className="collection-card-cta">Explore Collection</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Utility */}
                <div 
                  className="collection-preview-card"
                  onClick={() => {
                    setCurrentPage('collections');
                    setActiveFilter('Utility');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="collection-preview-image-container">
                    <img src="/uploads/brass_vessels.png" alt="Utility" className="collection-preview-image" />
                    <div className="collection-preview-overlay">
                      <div className="collection-preview-content">
                        <span className="collection-card-subtitle">Collection</span>
                        <h3 className="collection-card-title">Utility</h3>
                        <p className="collection-card-description">
                          Traditional spice boxes, hand-hammered kettles, and daily functional metalware.
                        </p>
                        <span className="collection-card-cta">Explore Collection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Brand Introduction Preview */}
            <section className="home-about-preview">
              <div className="home-about-grid">
                <div className="home-about-content">
                  <h2 className="home-about-heading">Generations of Craftsmanship,<br />Endless Possibilities.</h2>
                  <p className="home-about-text">
                    Established in 1993, Giftmark Industries has grown into a trusted B2B manufacturer, exporter, and importer. From statement home décor and corporate giftware to large-scale hotel serving ware collections, we bring together traditional Indian artisans and global market standards.
                  </p>
                  <p className="home-about-text" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-accent-dark)' }}>
                    "From one unique piece to thousands worldwide—crafted with experience, made to leave a mark."
                  </p>
                  <button className="hero-cta" onClick={() => setCurrentPage('about')} style={{ marginTop: '10px' }}>
                    Our Story
                  </button>
                </div>
                <div className="home-about-image-container">
                  <img
                    src={backendStatus ? collections[3]?.image : collections[3]?.localImage}
                    alt="Brass Chafing Dish"
                    className="home-about-image"
                  />
                </div>
              </div>
            </section>

            {/* Global Presence */}
            <section className="global-presence-section">
              <div className="global-map-mock">
                <div className="map-background"></div>
                <div className="map-canvas-dots"></div>
                <div className="map-node node-india" title="India HQ"></div>
                <div className="map-node node-mumbai" title="Mumbai, India"></div>
                <div className="map-node node-hyderabad" title="Hyderabad, India"></div>
                <div className="map-node node-china" title="Canton Fair, China"></div>
                <div className="map-node node-hongkong" title="Hong Kong"></div>
                <div className="map-node node-germany" title="Germany"></div>
                <div className="map-node node-holland" title="Holland (Netherlands)"></div>
                <div className="map-node node-uk" title="United Kingdom"></div>
                <div className="map-node node-usa" title="United States"></div>
                <div className="map-node node-uae" title="UAE"></div>
              </div>

              <div className="global-presence-content">
                <h2 className="global-pres-title">A Global Presence</h2>
                <p className="global-pres-text">
                  Over three decades, our handcrafted metalware has traveled across borders. Giftmark Industries has built a strong international presence, serving importers, wholesalers, retailers, and hospitality projects globally.
                </p>
                <p className="global-pres-text" style={{ fontSize: '13px' }}>
                  We exhibit regularly at major trade forums, including the prestigious **Canton Fair in China**, Hong Kong, Holland, and major hubs across Germany, the UK, USA, UAE, Mumbai, and Hyderabad.
                </p>
                <ul className="exhibition-list">
                  <li className="exhibition-tag">Canton Fair (China)</li>
                  <li className="exhibition-tag">Hong Kong</li>
                  <li className="exhibition-tag">Holland (Netherlands)</li>
                  <li className="exhibition-tag">Frankfurt (Germany)</li>
                  <li className="exhibition-tag">London (UK)</li>
                  <li className="exhibition-tag">Dubai (UAE)</li>
                  <li className="exhibition-tag">Mumbai &amp; Hyderabad (India)</li>
                </ul>
              </div>
            </section>
            {/* ==================== INSTAGRAM REELS ==================== */}
            <InstagramReels />

            {/* ==================== TESTIMONIALS ==================== */}
            <TestimonialsCarousel />
          </>
        )}

        {/* --- ABOUT US PAGE --- */}
        {currentPage === 'about' && (
          <div className="about-page">
            <div className="about-hero">
              <img src="/uploads/story_workshop.png" alt="About Us Banner" className="about-hero-img" />
              <h1 className="about-hero-title">Our Heritage</h1>
            </div>

            <section className="about-story-section">
              <div className="story-grid">
                <div className="story-block">
                  <h3>From India to the World, Since 1993</h3>
                  <p className="story-text">
                    What began over three decades ago as a passion for traditional craftsmanship has grown into a global journey. Giftmark Industries has evolved into a trusted manufacturer, exporter, and importer of distinctive home décor, hospitality, catering, and giftware products.
                  </p>
                  <p className="story-text">
                    Our products combine ancient metal shaping, casting, and filigree techniques with contemporary design sensibilities. Each piece is crafted by artisans with years of experience, ensuring that every tray, bowl, chafing dish, and sculpture leaving our workshop is built to last.
                  </p>
                </div>
                <div className="story-block">
                  <div className="story-highlight">
                    "Three decades. Global connections. One enduring legacy of craftsmanship."
                  </div>
                  <p className="story-text">
                    With decades of export experience, we understand the demands of both domestic and international markets—from initial design prototyping and custom manufacturing to handling bulk requirements and logistics.
                  </p>

                  <div className="vision-mission-grid">
                    <div className="mission-card">
                      <h4>Our Mission</h4>
                      <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-secondary)' }}>
                        To transform craftsmanship into products that inspire spaces, elevate experiences, and create lasting value—delivering quality, innovation, and reliability to our partners across the world.
                      </p>
                    </div>
                    <div className="vision-card">
                      <h4>Our Vision</h4>
                      <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-secondary)' }}>
                        To make Giftmark Industries a globally recognized name in décor, hospitality, and giftware—taking exceptional craftsmanship from India to every corner of the world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Leadership & Awards */}
            <section className="about-leadership-section">
              <div className="leadership-card">
                <div className="leader-image-placeholder">
                  <img
                    src="/uploads/founder_adil_shamsi.jpg"
                    alt="Mohammed Adil Shamsi - Founder, Giftmark Industries"
                  />
                </div>
                <div>
                  <span className="leader-role">Founder & Leadership</span>
                  <h2 className="leader-title">Mohammed Adil Shamsi</h2>
                  <p className="story-text" style={{ marginTop: '15px' }}>
                    Under the entrepreneurial vision of Mohammed Adil Shamsi, Giftmark Industries has cultivated relationships with major buyers and businesses globally. We focus on establishing long-lasting partnerships through transparency, consistent export quality, and punctual shipment timelines.
                  </p>
                  <div className="leader-award-box">
                    <strong>Global Recognition:</strong> In 2019, Mohammed Adil Shamsi was honored with a prestigious business excellence award in China, reflecting the global relationships and trade commitment behind the brand.
                  </div>
                </div>
              </div>
            </section>

            {/* Certifications & Exhibitions */}
            <section className="about-certs-exhibs-section">
              <div className="about-certs-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span className="best-sellers-subtitle">Official Recognition &amp; Global Trade</span>
                <h2 className="best-sellers-title" style={{ marginTop: '4px' }}>Certifications &amp; Global Exhibitions</h2>
              </div>

              <div className="certs-exhibs-grid">
                
                {/* Certifications Column */}
                <div className="certs-column">
                  <h3 className="certs-exhibs-heading">Our Certifications &amp; Awards</h3>

                  <div className="cert-cards-list">
                    
                    {/* Card 1: EPCH RCMC Certificate */}
                    <div
                      className="cert-item-card clickable-about-cert"
                      onClick={() => setActiveCertModal(CERTIFICATIONS_DATA[0])}
                      title="Click to view full certificate document"
                    >
                      <div className="about-cert-thumb">
                        <img src="/uploads/epch_membership_certificate.jpg" alt="EPCH RCMC Registration Certificate" />
                      </div>
                      <div className="cert-info">
                        <span className="cert-mini-badge">Official Document</span>
                        <h4 className="cert-title">EPCH Registration Certificate (RCMC)</h4>
                        <p className="cert-desc">
                          Export Promotion Council for Handicrafts (Govt. of India) official Manufacturer Exporter Certificate.
                        </p>
                        <span className="cert-click-hint"><Eye size={12} /> Click to View Document</span>
                      </div>
                    </div>

                    {/* Card 2: FAIC 2024 Gold Medal Award */}
                    <div
                      className="cert-item-card clickable-about-cert"
                      onClick={() => setActiveCertModal(CERTIFICATIONS_DATA[7])}
                      title="Click to view award frame"
                    >
                      <div className="about-cert-thumb">
                        <img src="/uploads/award_faic_5th_convention_2024.jpg" alt="FAIC 2024 Gold Medal Award" />
                      </div>
                      <div className="cert-info">
                        <span className="cert-mini-badge">Gold Medal Award</span>
                        <h4 className="cert-title">FAIC 5th Convention Award (2024)</h4>
                        <p className="cert-desc">
                          Federation of All India Caterers Framed Gold Medal Award at Hitex, Hyderabad.
                        </p>
                        <span className="cert-click-hint"><Eye size={12} /> Click to View Award</span>
                      </div>
                    </div>

                    {/* Card 3: 59th IHGF 2025 Allotment */}
                    <div
                      className="cert-item-card clickable-about-cert"
                      onClick={() => setActiveCertModal(CERTIFICATIONS_DATA[3])}
                      title="Click to view stand allotment"
                    >
                      <div className="about-cert-thumb">
                        <img src="/uploads/ihgf_delhi_fair_2025_allotment.jpg" alt="EPCH 59th IHGF Allotment" />
                      </div>
                      <div className="cert-info">
                        <span className="cert-mini-badge">Trade Expo Allotment</span>
                        <h4 className="cert-title">EPCH 59th IHGF Delhi Fair Allotment</h4>
                        <p className="cert-desc">
                          Official EPCH Stand Space Allotment Certificate for Spring 2025 (Hall 11 Stand G-10/05).
                        </p>
                        <span className="cert-click-hint"><Eye size={12} /> Click to View Document</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Exhibitions Column */}
                <div className="exhibs-column">
                  <h3 className="certs-exhibs-heading">Global Trade Exhibitions</h3>

                  <div className="exhib-cards-list">
                    
                    {/* Exhib 1: MEGA SHOW Hong Kong */}
                    <div
                      className="exhib-item-card clickable-about-cert"
                      onClick={() => setActiveCertModal(EXHIBITIONS_DATA[0])}
                      title="Click to view exhibition photo"
                    >
                      <div className="about-cert-thumb">
                        <img src="/uploads/exhibition_stall_front.jpg" alt="MEGA SHOW Hong Kong Expo" />
                      </div>
                      <div className="exhib-info">
                        <span className="exhib-mini-badge">Hong Kong Expo</span>
                        <h4 className="exhib-title">MEGA SHOW International Trade Expo</h4>
                        <p className="exhib-desc">
                          Multi-bay pavilion (Stall 3U-1 &amp; 2) showcasing handcrafted metallic art vases, copper urns, and hotelware.
                        </p>
                        <span className="exhib-meta"><Eye size={12} /> Click to View Photo</span>
                      </div>
                    </div>

                    {/* Exhib 2: Grand Pavilion Entrance */}
                    <div
                      className="exhib-item-card clickable-about-cert"
                      onClick={() => setActiveCertModal(EXHIBITIONS_DATA[1])}
                      title="Click to view pavilion entrance photo"
                    >
                      <div className="about-cert-thumb">
                        <img src="/uploads/exhibition_stall_corner.jpg" alt="Giftmark Trade Pavilion Showcase" />
                      </div>
                      <div className="exhib-info">
                        <span className="exhib-mini-badge">Global Showcase</span>
                        <h4 className="exhib-title">Giftmark Trade Pavilion Showcase</h4>
                        <p className="exhib-desc">
                          Grand entrance view displaying silver-plated pedestal floor vases and heritage brassware.
                        </p>
                        <span className="exhib-meta"><Eye size={12} /> Click to View Photo</span>
                      </div>
                    </div>

                    {/* Exhib 3: Metalware Display Gallery */}
                    <div
                      className="exhib-item-card clickable-about-cert"
                      onClick={() => setActiveCertModal(EXHIBITIONS_DATA[2])}
                      title="Click to view display gallery photo"
                    >
                      <div className="about-cert-thumb">
                        <img src="/uploads/exhibition_display_shelves.jpg" alt="Metalware & Vase Display Gallery" />
                      </div>
                      <div className="exhib-info">
                        <span className="exhib-mini-badge">Interior Display</span>
                        <h4 className="exhib-title">Metalware &amp; Vase Display Gallery</h4>
                        <p className="exhib-desc">
                          Interior display presenting signature hand-hammered brass urns, textured metallic vases, and hotelware.
                        </p>
                        <span className="exhib-meta"><Eye size={12} /> Click to View Photo</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* View Full Dedicated Page CTA */}
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button
                  className="hero-cta"
                  onClick={() => {
                    setCurrentPage('certifications');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Explore Full Certifications &amp; Exhibitions Showcase (16) →
                </button>
              </div>
            </section>
          </div>
        )}

        {/* --- COLLECTIONS PAGE --- */}
        {currentPage === 'collections' && (
          <div className="collections-page-section">
            <ul className="collections-filter-bar">
              {['All', 'Home Décor', 'Hospitality', 'Giftware', 'Utility'].map((filter) => (
                <li key={filter}>
                  <button
                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                </li>
              ))}
            </ul>

            <div className="collections-grid">
              {filteredCollections.map((item) => (
                <div className="product-card" key={item.id}>
                  <div className="product-img-container">
                    <img src={getCardImage(item)} alt={item.title} className="product-img" />
                  </div>
                  <span className="product-cat">{item.category}</span>
                  <h3 className="product-title">{item.title}</h3>
                  <p className="product-desc">{item.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{item.price}</span>
                    <div className="product-card-actions">
                      <button
                        className="product-action-btn cart-btn"
                        title="Add to Cart"
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingBag size={14} />
                      </button>
                      <button
                        className="product-action-btn buy-btn"
                        onClick={() => buyNow(item)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bulk orders banner */}
            <div className="bulk-enquiry-banner">
              <h3 className="bulk-enquiry-title">Bulk & Custom Manufacturing</h3>
              <p className="bulk-enquiry-text">
                We cater to global wholesalers, hotel chains, catering groups, and corporate buyers. Contact us to request catalog details or discuss your project specifications.
              </p>
              <button className="bulk-enquiry-btn" onClick={() => setCurrentPage('contact')}>
                Contact B2B Sales
              </button>
            </div>
          </div>
        )}

        {/* --- CONTACT PAGE --- */}
        {currentPage === 'contact' && (
          <div className="contact-page-section">
            <div className="contact-grid">
              <div className="contact-info-panel">
                <h1 className="contact-heading">Get in Touch</h1>
                <p className="contact-intro-text">
                  Whether you require a custom product mold, a hotel catering layout supply, or wholesale distribution catalog details, our export team is available to assist you.
                </p>

                <div className="contact-details-list">
                  <div className="contact-detail-item">
                    <span className="detail-label">Export Inquiry Officer</span>
                    <span className="detail-value">Mohammed Adil Shamsi</span>
                  </div>
                  <div className="contact-detail-item">
                    <span className="detail-label">WhatsApp / Call</span>
                    <a href="https://wa.me/919897583968" target="_blank" rel="noreferrer" className="detail-value detail-link">
                      +91 98975 83968
                    </a>
                  </div>
                  <div className="contact-detail-item">
                    <span className="detail-label">Email Address</span>
                    <a href="mailto:giftmark786@gmail.com" className="detail-value detail-link" style={{ fontSize: '18px' }}>
                      giftmark786@gmail.com
                    </a>
                  </div>
                  <div className="contact-detail-item">
                    <span className="detail-label">Trade Enquiries</span>
                    <span className="detail-value" style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      Contact us for bulk order and trade enquiries.
                    </span>
                  </div>
                </div>

                <div className="social-links-row">
                  <a
                    href="https://www.instagram.com/industriesgiftmark?igsh=aHdxdTBieTdnN28w"
                    target="_blank"
                    rel="noreferrer"
                    className="social-badge-btn"
                  >
                    Instagram
                  </a>
                </div>
              </div>

              <div className="contact-form-panel">
                <h3 className="form-title">Send B2B Enquiry</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="Your Name"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Business Email</label>
                      <input
                        type="email"
                        required
                        className="form-input"
                        placeholder="name@company.com"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number (WhatsApp)</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="+91 XXXXX XXXXX"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Min. Bulk Quantity</label>
                      <input
                        type="number"
                        required
                        className="form-input"
                        min="10"
                        value={inquiryForm.quantity}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, quantity: e.target.value })}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">Product / Category Interest</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="E.g., Filigree Serving Tray"
                        value={inquiryForm.product}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, product: e.target.value })}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">Inquiry Message</label>
                      <textarea
                        required
                        className="form-input"
                        placeholder="Provide details about your custom requests or shipment destination."
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="form-submit-btn">Submit Inquiry</button>
                  {formSuccess && (
                    <div className="form-success-toast">
                      {formSuccess}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

        {/* --- CERTIFICATIONS & EXHIBITIONS PAGE --- */}
        {currentPage === 'certifications' && (
          <div className="cert-page-section">
            {/* Hero Header */}
            <div className="cert-hero">
              <div className="cert-hero-badge">
                <ShieldCheck size={14} /> QUALITY &amp; GLOBAL RECOGNITION
              </div>
              <h1 className="cert-hero-title">Certifications &amp; Global Exhibitions</h1>
              <p className="cert-hero-subtitle">
                Giftmark Industries maintains the highest standards of international export quality, food safety compliance, and artisanal craftsmanship while actively representing authentic Indian heritage at global trade expos.
              </p>
            </div>

            {/* Certifications Section */}
            <div className="cert-content-container">
              <div className="cert-section-header">
                <div className="section-title-wrapper">
                  <span className="section-kicker">QUALITY ASSURANCE</span>
                  <h2 className="section-heading">Our Accredited Certifications</h2>
                </div>
                <p className="section-description">
                  Every product leaving our Moradabad facility undergoes strict multi-tier quality checks, adhering to global standards for metallurgy, safety, and workplace ethics.
                </p>
              </div>

              <div className="cert-grid">
                {CERTIFICATIONS_DATA.map((cert) => {
                  const IconComponent = cert.iconName === 'ShieldCheck' ? ShieldCheck :
                    cert.iconName === 'Award' ? Award :
                    cert.iconName === 'Star' ? Star :
                    cert.iconName === 'FileText' ? FileText : Globe;

                  const handleCardClick = () => {
                    if (cert.previewImage || cert.downloadUrl) {
                      setActiveCertModal(cert);
                    }
                  };

                  return (
                    <div
                      key={cert.id}
                      className={`cert-card ${cert.downloadUrl || cert.previewImage ? 'downloadable-card' : ''}`}
                      onClick={handleCardClick}
                      title="Click to view full certificate document"
                    >
                      {cert.previewImage && (
                        <div className="cert-card-preview">
                          <img src={cert.previewImage} alt={cert.title} className="cert-preview-img" />
                          <div className="cert-preview-overlay">
                            <span className="download-hint-badge">
                              <Eye size={14} /> Click to View
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="cert-card-header">
                        <div className="cert-icon-wrapper">
                          <IconComponent size={24} className="cert-icon" />
                        </div>
                        <span className="cert-tag-badge">{cert.badge}</span>
                      </div>
                      <h3 className="cert-card-title">{cert.title}</h3>
                      <div className="cert-issuer-info">
                        <span className="issuer-name">{cert.issuer}</span>
                      </div>
                      <p className="cert-card-desc">{cert.description}</p>
                      <div className="cert-card-footer">
                        <div className="cert-meta-item">
                          <span className="meta-label">Reg. Number:</span>
                          <span className="meta-val">{cert.regNo}</span>
                        </div>
                        <div className="cert-meta-item">
                          <span className="meta-label">Status:</span>
                          <span className="meta-val highlight">{cert.validity}</span>
                        </div>
                        {(cert.previewImage || cert.downloadUrl) && (
                          <button
                            className="cert-download-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCertModal(cert);
                            }}
                          >
                            <Eye size={14} /> View Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exhibitions Section */}
            <div className="cert-content-container exhibition-section">
              <div className="cert-section-header">
                <div className="section-title-wrapper">
                  <span className="section-kicker">GLOBAL TRADE FAIRS</span>
                  <h2 className="section-heading">Exhibitions &amp; Industry Expos</h2>
                </div>
                <p className="section-description">
                  Explore our past and upcoming global trade showcases, where we display our latest heritage metalware, hotel chafing gear, and architectural brass installations.
                </p>
              </div>

              <div className="exhibition-grid">
                {EXHIBITIONS_DATA.map((ex) => (
                  <div
                    key={ex.id}
                    className="exhibition-gallery-item"
                    onClick={() => setActiveCertModal(ex)}
                    title="Click to view full exhibition photo"
                  >
                    <img src={ex.image} alt={ex.title} className="exhibition-gallery-img" />
                    <div className="cert-preview-overlay">
                      <span className="download-hint-badge">
                        <Eye size={14} /> View Full Photo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B Compliance & Meeting CTA */}
            <div className="cert-cta-banner">
              <div className="cta-content">
                <h3 className="cta-title">Need Official Compliance Documents or Expo Meeting?</h3>
                <p className="cta-subtitle">
                  Our B2B export desk can provide audit test reports, lead-free lab certificates, or schedule one-on-one meetings at upcoming trade shows.
                </p>
              </div>
              <div className="cta-actions">
                <button className="cta-primary-btn" onClick={() => setCurrentPage('contact')}>
                  Request Certificate Copies
                </button>
                <a href="https://wa.me/919897583968" target="_blank" rel="noreferrer" className="cta-secondary-btn">
                  Book Booth Appointment
                </a>
              </div>
            </div>
          </div>
        )}

        {/* --- FOOTER --- */}
        <footer className="footer">

          {/* ---- Trust Banner Row ---- */}
          <div className="footer-trust-row">
            <div className="footer-trust-label">
              <span className="footer-trust-heading">ORDER WITH CONFIDENCE</span>
            </div>
            <div className="footer-trust-badges">
              <div className="footer-badge">
                <div className="footer-badge-icon">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M26 18l2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>500+ Happy Clients</span>
              </div>
              <div className="footer-badge">
                <div className="footer-badge-icon">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="14" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M28 20h4l4 6v4h-8V20z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="10" cy="33" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="28" cy="33" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <span>Global Shipping</span>
              </div>
              <div className="footer-badge">
                <div className="footer-badge-icon">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L24.5 15.5L35 17L27.5 24.5L29.5 35L20 30L10.5 35L12.5 24.5L5 17L15.5 15.5L20 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>Award-Winning</span>
              </div>
              <div className="footer-badge">
                <div className="footer-badge-icon">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8h16v4l4 4v14H8V16l4-4V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M16 26v-6M20 26v-9M24 26v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span>Handcrafted in India</span>
              </div>
            </div>
          </div>

          {/* ---- Divider ---- */}
          <div className="footer-hr" />

          {/* ---- 4 Column Links + Brand ---- */}
          <div className="footer-main">

            {/* Col 1: SHOP */}
            <div className="footer-col">
              <h4 className="footer-col-title">Shop</h4>
              <ul className="footer-col-links">
                <li><span className="footer-link" onClick={() => { setCurrentPage('collections'); setActiveFilter('All'); }}>All Collections</span></li>
                <li><span className="footer-link" onClick={() => { setCurrentPage('collections'); setActiveFilter('Home Décor'); }}>Home Décor</span></li>
                <li><span className="footer-link" onClick={() => { setCurrentPage('collections'); setActiveFilter('Hospitality'); }}>Hospitality</span></li>
                <li><span className="footer-link" onClick={() => { setCurrentPage('collections'); setActiveFilter('Giftware'); }}>Giftware</span></li>
                <li><span className="footer-link" onClick={() => { setCurrentPage('collections'); setActiveFilter('Utility'); }}>Utility</span></li>
              </ul>
            </div>

            {/* Col 2: INFORMATION */}
            <div className="footer-col">
              <h4 className="footer-col-title">Information</h4>
              <ul className="footer-col-links">
                <li><span className="footer-link" onClick={() => setCurrentPage('about')}>About Us</span></li>
                <li><span className="footer-link" onClick={() => setCurrentPage('certifications')}>Certifications &amp; Exhibitions</span></li>
                <li><span className="footer-link" onClick={() => setActiveLegal('refund')}>Return &amp; Exchange Policy</span></li>
                <li><span className="footer-link" onClick={() => setActiveLegal('terms')}>Terms &amp; Conditions</span></li>
                <li><span className="footer-link" onClick={() => setActiveLegal('privacy')}>Privacy Policy</span></li>
                <li><span className="footer-link" onClick={() => setActiveLegal('disclaimer')}>Disclaimer</span></li>
              </ul>
            </div>

            {/* Col 3: CONTACT */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact</h4>
              <ul className="footer-col-links">
                <li><span className="footer-link" onClick={() => setCurrentPage('contact')}>Contact Us</span></li>
                <li><span className="footer-link" onClick={() => setCurrentPage('contact')}>Bulk Order Enquiry</span></li>
                <li><span className="footer-link" onClick={() => setCurrentPage('contact')}>Request a Catalogue</span></li>
                <li><span className="footer-link" onClick={() => setCurrentPage('contact')}>Custom Manufacturing</span></li>
                <li><a className="footer-link" href="tel:+919897583968">+91 98975 83968</a></li>
              </ul>
            </div>

            {/* Col 4: OTHER */}
            <div className="footer-col">
              <h4 className="footer-col-title">Other</h4>
              <ul className="footer-col-links">
                <li><span className="footer-link" onClick={() => setCurrentPage('home')}>Home</span></li>
                <li><span className="footer-link" onClick={() => setCurrentPage('about')}>Our Heritage</span></li>
                <li><span className="footer-link" onClick={() => setCurrentPage('contact')}>Trade Partnerships</span></li>
                <li><a className="footer-link" href="mailto:info@giftmarkindustries.com">Get Help</a></li>
              </ul>

              <h4 className="footer-col-title" style={{ marginTop: '28px' }}>Follow Us</h4>
              <div className="footer-social-row">
                <a href="https://wa.me/919897583968" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="WhatsApp" title="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.532 5.857L.054 23.454a.5.5 0 00.492.546h.055l5.735-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.814 9.814 0 01-5.014-1.374l-.36-.214-3.733.977.998-3.64-.234-.374A9.815 9.815 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182S21.818 6.573 21.818 12 17.427 21.818 12 21.818z" /></svg>
                </a>
                <a href="mailto:info@giftmarkindustries.com" className="footer-social-icon" aria-label="Email" title="Email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
                </a>
                <a href="tel:+919897583968" className="footer-social-icon" aria-label="Phone" title="Phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.5 21 3 13.5 3 4.5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* ---- Brand Watermark Bottom ---- */}
          <div className="footer-watermark-bar">
            <span className="footer-watermark-text">GIFTMARK INDUSTRIES</span>
          </div>

        </footer>

        {/* --- LEGAL MODAL OVERLAY --- */}
        {activeLegal && (
          <div className="legal-modal-overlay" onClick={() => setActiveLegal(null)}>
            <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="legal-modal-close" onClick={() => setActiveLegal(null)}>×</button>
              <h2 className="legal-modal-title">{LEGAL_TEXTS[activeLegal].title}</h2>
              <div className="legal-modal-body">
                {LEGAL_TEXTS[activeLegal].body}
              </div>
            </div>
          </div>
        )}

        {/* --- CERTIFICATION LIGHTBOX MODAL --- */}
        {activeCertModal && (
          <div className="cert-modal-overlay" onClick={() => setActiveCertModal(null)}>
            <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="cert-modal-close" onClick={() => setActiveCertModal(null)} title="Close Lightbox">
                <X size={22} />
              </button>
              
              <div className="cert-modal-header">
                <span className="cert-modal-badge">{activeCertModal.badge}</span>
                <h3 className="cert-modal-title">{activeCertModal.title}</h3>
                <p className="cert-modal-issuer">{activeCertModal.issuer}</p>
              </div>

              {activeCertModal.previewImage && (
                <div className="cert-modal-image-wrapper">
                  <img
                    src={activeCertModal.previewImage}
                    alt={activeCertModal.title}
                    className="cert-modal-full-img"
                  />
                </div>
              )}

              <div className="cert-modal-footer">
                <p className="cert-modal-desc">{activeCertModal.description}</p>
                {activeCertModal.downloadUrl && (
                  <a
                    href={activeCertModal.downloadUrl}
                    download={`${activeCertModal.title.replace(/[\s\/\&]+/g, '_')}.jpg`}
                    className="cert-modal-download-btn"
                  >
                    <Download size={16} /> Download High-Res File
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- CART DRAWER OVERLAY --- */}
        {isCartOpen && (
          <div className="cart-drawer-overlay" onClick={() => { setIsCartOpen(false); setIsCheckingOut(false); }}>
            <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
              <div className="cart-drawer-header">
                <h3>Shopping Cart</h3>
                <button className="cart-close-btn" onClick={() => { setIsCartOpen(false); setIsCheckingOut(false); }}>
                  <X size={20} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="cart-empty-state">
                  <ShoppingBag size={48} className="empty-cart-icon" />
                  <p>Your cart is empty</p>
                  <button className="cart-empty-btn" onClick={() => { setIsCartOpen(false); setCurrentPage('collections'); }}>
                    Go to Collections
                  </button>
                </div>
              ) : (
                <>
                  {!isCheckingOut ? (
                    /* CART ITEMS LIST VIEW */
                    <div className="cart-body">
                      <div className="cart-items-list">
                        {cart.map((item) => (
                          <div className="cart-item-card" key={item.product.id}>
                            <img src={getCardImage(item.product)} alt={item.product.title} className="cart-item-img" />
                            <div className="cart-item-info">
                              <h4 className="cart-item-title">{item.product.title}</h4>
                              <span className="cart-item-price">{item.product.price}</span>
                              <div className="cart-item-qty-actions">
                                <button className="qty-btn" onClick={() => updateQuantity(item.product.id, -1)}>
                                  <Minus size={12} />
                                </button>
                                <span className="qty-value">{item.quantity}</span>
                                <button className="qty-btn" onClick={() => updateQuantity(item.product.id, 1)}>
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                            <button className="cart-item-remove-btn" onClick={() => removeFromCart(item.product.id)}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="cart-drawer-footer">
                        <div className="cart-summary-row">
                          <span>Subtotal:</span>
                          <span className="summary-total-price">₹{getCartTotal().toLocaleString()}</span>
                        </div>
                        <p className="cart-disclaimer-text">
                          *Estimated bulk pricing. Wholesale freight, taxes, and B2B discounts will be calculated during order finalization.
                        </p>
                        <button className="cart-checkout-btn" onClick={() => setIsCheckingOut(true)}>
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* CHECKOUT FORM VIEW */
                    <div className="cart-body">
                      <form className="cart-checkout-form" onSubmit={submitOrder}>
                        <h4 className="checkout-title">Trade Order Inquiry</h4>
                        <p className="checkout-subtitle">Enter your B2B wholesale credentials to finalize terms on WhatsApp.</p>

                        <div className="form-group">
                          <label className="form-label">Full Name *</label>
                          <input
                            type="text"
                            required
                            className="form-input"
                            placeholder="Mohammed Adil"
                            value={checkoutForm.name}
                            onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Company Name</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Giftmark Industries"
                            value={checkoutForm.company}
                            onChange={(e) => setCheckoutForm({ ...checkoutForm, company: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Contact Number (WhatsApp) *</label>
                          <input
                            type="tel"
                            required
                            className="form-input"
                            placeholder="+91 98975 83968"
                            value={checkoutForm.phone}
                            onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            className="form-input"
                            placeholder="buyer@domain.com"
                            value={checkoutForm.email}
                            onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Special Trade Notes / Quantity Requirements</label>
                          <textarea
                            className="form-input form-textarea"
                            placeholder="E.g., request custom brass filigree engraving, customized gift packaging boxes, sea freight to Germany..."
                            value={checkoutForm.notes}
                            onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                          />
                        </div>

                        <div className="cart-drawer-footer">
                          <div className="cart-summary-row">
                            <span>Total Items:</span>
                            <span>{getCartCount()}</span>
                          </div>
                          <div className="cart-summary-row" style={{ marginTop: '5px' }}>
                            <span>Est. Subtotal:</span>
                            <span className="summary-total-price">₹{getCartTotal().toLocaleString()}</span>
                          </div>
                          <div className="checkout-btn-group">
                            <button type="button" className="cart-back-btn" onClick={() => setIsCheckingOut(false)}>
                              Back to Cart
                            </button>
                            <button type="submit" className="cart-checkout-btn">
                              Confirm & WhatsApp Inquiry
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
