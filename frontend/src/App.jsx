import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ShoppingBag, Plus, Minus, Trash2, X, ChevronDown, ChevronLeft, ChevronRight, Award, Globe, ShieldCheck, Calendar, Star, Quote, FileText, MapPin, CheckCircle, Download, Eye, Menu } from 'lucide-react';
import './App.css';

const getColorName = (hex) => {
  if (!hex) return '';
  const map = {
    '#C0392B': 'Terracotta Red',
    '#D4A017': 'Antique Gold',
    '#C2B280': 'Beige / Sand',
    '#2C2C2C': 'Matte Black',
    '#4E9F3D': 'Emerald Green',
    '#1E759A': 'Ocean Teal',
    '#53565A': 'Dark Grey / Charcoal',
    '#DFBFA1': 'Sand / Beige',
    '#9E7D62': 'Brown / Bronze',
    '#C84E18': 'Orange / Rust',
    '#E67E22': 'Rust Bronze',
    '#5D9B43': 'Moss Green',
    '#2A7B9B': 'Antique Turquoise',
    '#F39C12': 'Polished Gold',
    '#A04000': 'Aged Rust Patina',
    '#5D6D7E': 'Slate Pewter',
    '#196B7F': 'Deep Teal',
    '#D4AC0D': 'Champagne Gold',
    '#1C2833': 'Gunmetal Black',
  };
  return map[hex.toUpperCase()] || hex;
};

const hasMultipleOptions = (product) => {
  if (!product) return false;
  if (Array.isArray(product.colors) && product.colors.length > 1) return true;
  if (Array.isArray(product.variants) && product.variants.length > 1) return true;
  if (Array.isArray(product.options) && product.options.length > 1) return true;
  if (Array.isArray(product.sizes) && product.sizes.length > 1) return true;
  if (typeof product.price === 'string' && product.price.includes('-')) return true;
  if (typeof product.description === 'string' && /(available in (big|large|medium|small|various)|available as |sizes\.)/i.test(product.description)) return true;
  return false;
};

const TRUST_BANNER_ITEMS = [
  "32+ Years of Experience",
  "Global Export Presence",
  "International Exhibitions",
  "Award-Winning Leadership",
  "Trusted B2B Partnerships",
  "Direct Factory Manufacturer",
  "Custom Metal Fabrication",
  "ISO & CE Certified Quality"
];

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
    id: "ex-aakar-fair-2022",
    title: "Aakar Beauty & Decor Fair 2022 (Stall 919)",
    venue: "Aakar Exhibition & Trade Fair Center",
    date: "2022 Trade Expo",
    booth: "Stall 919",
    tag: "Aakar Fair 2022",
    image: "/uploads/aakar_fair_2022.jpg",
    previewImage: "/uploads/aakar_fair_2022.jpg",
    badge: "Aakar Fair 2022",
    issuer: "Aakar Trade Expo Organisers",
    description: "Giftmark Industries' custom matte-navy showcase stall (Stall 919) at Aakar Fair 2022 featuring handcrafted metallic vases, gold filigree art pieces, and luxury floor pedestals."
  },
  {
    id: "ex-tent-decor-2025",
    title: "Tent Decor Asia International Exhibition (August 2025)",
    venue: "Tent Decor Asia International Expo Center",
    date: "August 2025",
    booth: "Giftmark Pavilion",
    tag: "Tent Decor Aug 2025",
    image: "/uploads/tent_decor_2025.jpg",
    previewImage: "/uploads/tent_decor_2025.jpg",
    badge: "Tent Decor Aug 2025",
    issuer: "Tent Decor Asia Expo",
    description: "Giftmark Industries' grand white shelving showcase at Tent Decor August 2025, displaying vibrant ceramic-finish metalware, luxury hotel vases, and bespoke catering decor."
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
    badge: "Artisan Gallery",
    issuer: "Handicrafts & Decor Expo",
    description: "Interior display gallery presenting signature hand-hammered aluminium urns, textured metallic vases, and hotelware decor collections."
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
    badge: "Exhibition Showcase",
    issuer: "Global Trade Fairs",
    description: "Elegant entrance view of Giftmark Industries' trade pavilion, lined with red velvet stanchions, silver-plated pedestal floor vases, and heritage metalware."
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
    badge: "Export Showcase",
    issuer: "Global Handicrafts Expo",
    description: "Wide perspective angle of Giftmark's expansive 3U-1 & 2 stall featuring tier-shelved aluminium metalware and customer meeting lounge area."
  },
  {
    id: "ex-ambiente-frankfurt-2026",
    title: "Messe Frankfurt Ambiente Trade Fair (Hall 10.2 Stand E08, Feb 2026)",
    venue: "Messe Frankfurt Exhibition Center, Germany",
    date: "February 2026",
    booth: "Hall 10.2 Stand E08",
    tag: "Ambiente Feb 2026",
    image: "/uploads/ambiente_frankfurt_2026.jpg",
    previewImage: "/uploads/ambiente_frankfurt_2026.jpg",
    badge: "Ambiente Feb 2026",
    issuer: "Messe Frankfurt Exhibition GmbH",
    description: "Giftmark Industries' prominent black corner pavilion (Hall 10.2 Stand E08) at Messe Frankfurt Ambiente (February 2026), presenting hand-sculpted metallic floor vases, silver candelabras, ornate mirrors, and hotelware."
  },
  {
    id: "ex-dubai-epch-2018",
    title: "EPCH Dubai India Trade Fair (Stall SS1F142, Sep 2018)",
    venue: "Dubai International Exhibition & Convention Centre, UAE",
    date: "September 2018",
    booth: "Stall SS1F142 (India Pavilion)",
    tag: "Dubai EPCH Sep 2018",
    image: "/uploads/dubai_epch_2018.jpg",
    previewImage: "/uploads/dubai_epch_2018.jpg",
  },
  {
    id: "ex-hongkong-fair-april-2018",
    title: "Hong Kong Gifts & Premium Fair (April 2018)",
    venue: "Hong Kong Convention and Exhibition Centre (HKCEC), Hong Kong",
    date: "April 2018",
    booth: "India Pavilion (Stall 3CON-150)",
    tag: "HongKong Fair Apr 2018",
    image: "/uploads/hongkong_fair_april_2018.jpg",
    previewImage: "/uploads/hongkong_fair_april_2018.jpg",
    badge: "HongKong Apr 2018",
    issuer: "Hong Kong Trade Development Council (HKTDC)",
    description: "Giftmark Industries' official India Pavilion booth (Stall 3CON-150) at Hong Kong Gifts & Premium Fair (April 2018), displaying aluminium & silver metallic art vases, platters, and luxury hotel decor."
  },
  {
    id: "ex-epch-delhi-fair-2019",
    title: "EPCH IHGF Delhi Fair Showcase (Spring 2019)",
    venue: "India Expo Centre & Mart, Greater Noida, Delhi NCR",
    date: "Spring 2019",
    booth: "Giftmark EPCH Pavilion",
    tag: "IHGF Delhi Fair 2019",
    image: "/uploads/epch_delhi_fair_2019.jpg",
    previewImage: "/uploads/epch_delhi_fair_2019.jpg",
    badge: "EPCH Delhi Fair 2019",
    issuer: "Export Promotion Council for Handicrafts (EPCH)",
    description: "Giftmark Industries' multi-shelf artisan gallery at the EPCH IHGF Delhi Fair 2019, showcasing signature hammered bronze urns, textured metallic vases, candle stands, and decorative tableware."
  },
  {
    id: "ex-ambiente-august-2021",
    title: "Ambiente International Trade Fair (August 2021)",
    venue: "Messe Frankfurt Exhibition Center, Germany",
    date: "August 2021",
    booth: "Giftmark Ambiente Showcase",
    tag: "Ambiente Aug 2021",
    image: "/uploads/ambiente_august_2021.jpg",
    previewImage: "/uploads/ambiente_august_2021.jpg",
    badge: "Ambiente Aug 2021",
    issuer: "Messe Frankfurt Exhibition GmbH",
    description: "Giftmark Industries' multi-tier decor gallery at Ambiente (August 2021), featuring hand-sculpted metallic masks, abstract head sculptures, gold & silver textured vases, and hotelware."
  },
  {
    id: "ex-ihgf-delhi-oct-2017",
    title: "EPCH 44th IHGF Delhi Fair Showcase (Autumn 2017)",
    venue: "India Expo Centre & Mart, Greater Noida, Delhi NCR",
    date: "October 2017",
    booth: "Giftmark EPCH Pavilion",
    tag: "IHGF Delhi Oct 2017",
    image: "/uploads/ihgf_delhi_oct_2017.jpg",
    previewImage: "/uploads/ihgf_delhi_oct_2017.jpg",
    badge: "IHGF Delhi Oct 2017",
    issuer: "Export Promotion Council for Handicrafts (EPCH)",
    description: "Giftmark Industries' dark-themed artisan showcase at the 44th IHGF Delhi Fair (October 2017), presenting hand-cast metallic animal skull sculptures, horn wall mounts, aluminium pedestals, and accent furniture."
  },
  {
    id: "ex-ihe-sep-2021",
    title: "International Hospitality Expo - IHE 2021 (September 2021)",
    venue: "India Expo Centre & Mart, Greater Noida, Delhi NCR",
    date: "September 2021",
    booth: "Giftmark Grand Pavilion",
    tag: "IHE Sep 2021",
    image: "/uploads/ihe_sep_2021.jpg",
    previewImage: "/uploads/ihe_sep_2021.jpg",
    badge: "IHE Sep 2021",
    issuer: "International Hospitality Expo (IHE)",
    description: "Giftmark Industries' grand illuminated pavilion at International Hospitality Expo (IHE September 2021), featuring luxury hotel serving ware, green & aluminium metallic floor urns, and bespoke B2B decor."
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
    badge: "Exhibition Gallery",
    issuer: "Handicraft Export Council",
    description: "Side entrance display showcasing metallic floor vases, decorative hammered aluminium bowls, and custom hotel catering accents."
  }
];

// IDs of products shown in the Best Sellers section (picked for visual appeal)
const BESTSELLER_IDS = ["38", "40", "12", "23"];

// Fallback data if backend is not reachable
const DEFAULT_COLLECTIONS = [
  {
    id: "32",
    title: "Handcrafted Teal & Aluminium Octagonal Serving Tray Set",
    image: "/uploads/teal_copper_octagonal_tray_set.png",
    localImage: "/uploads/teal_copper_octagonal_tray_set.png",
    images: [
      "/uploads/teal_copper_octagonal_tray_set.png",
      "/uploads/teal_copper_octagonal_tray_set_specs.png"
    ],
    category: "Hospitality",
    material: "Aluminium",
    colors: ["#1E759A", "#4E9F3D", "#D4A017", "#2C2C2C"],

    price: "₹620 - ₹850 / $8 - $10",
    dimensions: {
      height: '3 cm (1.2")',
      diameter: '18 cm - 20 cm (7.1" - 7.9")',
      pendi: 'Length 34 cm - 40 cm (13.4" - 15.7")'
    },
    description: "Handcrafted rectangular octagonal-corner serving tray set featuring a raw aluminium rust exterior and a dramatic teal-green abstract terrain-map interior basin with organic cutouts. Available in Big (40×20cm) and Small (34×18cm) sizes."
  },
  {
    id: "33",
    title: "Handcrafted Crescent Metallic Pedestal Bowl",
    image: "/uploads/crescent_metallic_pedestal_bowl.png",
    localImage: "/uploads/crescent_metallic_pedestal_bowl.png",
    images: [
      "/uploads/crescent_metallic_pedestal_bowl.png",
      "/uploads/crescent_metallic_pedestal_bowl_specs.png"
    ],
    category: "Hospitality",
    material: "Aluminium",
    colors: ["#9E7D62", "#D4A017", "#53565A", "#2C2C2C"],

    price: "₹1,220 / $15",
    dimensions: {
      height: '10 cm (3.9")',
      diameter: '29 cm (11.4")',
      pendi: 'Length 37 cm (14.6")'
    },
    description: "Artisanal crescent-shaped decorative serving bowl crafted in textured antiqued bronze aluminium with a slotted comb-tooth rim mounted on a heavy flared pedestal base."
  },

  {
    id: "11",
    title: "Ornate Vintage Aluminium Urn",
    image: "/uploads/vintage_brass_urn.png",
    images: [
      "/uploads/vintage_brass_urn.png",
      "/uploads/vintage_brass_urn_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#D4A017", "#9E7D62", "#53565A", "#2C2C2C"],

    price: "₹18,500 / $225",
    dimensions: {
      height: '90 cm (35.4")',
      diameter: '36 cm (14.2")',
      pendi: '36 cm (14.2")'
    },
    description: "Traditional handcrafted aluminium urn vessel with finial lid, rich filigree detailing, and rustic aged finish."
  },
  {
    id: "12",
    title: "Handcrafted Perforated Aluminium Platter",
    image: "/uploads/perforated_metal_platter_aesthetic.jpg",
    localImage: "/uploads/perforated_metal_platter_aesthetic.jpg",
    images: [
      "/uploads/perforated_metal_platter_aesthetic.jpg",
      "/uploads/perforated_metal_platter_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹8,500 / $105",
    dimensions: {
      height: '8 cm (3.1")',
      diameter: '33 cm (13")',
      pendi: 'Length 33 cm (13")'
    },
    description: "Decorative multi-tone scalloped platter featuring hand-perforated cutouts, two-tone aluminium sectors, and a textured silver center on an ornate stand."
  },
  {
    id: "13",
    title: "Handcrafted Square Aluminium Accent Platter",
    image: "/uploads/square_copper_brass_tray_aesthetic.jpg",
    localImage: "/uploads/square_copper_brass_tray_aesthetic.jpg",
    images: [
      "/uploads/square_copper_brass_tray_aesthetic.jpg",
      "/uploads/square_copper_brass_tray_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#D4A017", "#9E7D62", "#53565A", "#2C2C2C"],

    price: "₹6,800 / $85",
    dimensions: {
      height: '4 cm (1.6")',
      diameter: '25 cm (9.8")',
      pendi: 'Length 25 cm (9.8")'
    },
    description: "Handcrafted square decorative tray featuring a textured aluminium center basin, distressed antique aluminium border with corner motifs, and ornate metal display stand."
  },
  {
    id: "14",
    title: "Sculptural Multi-Tone Metallic Leaf Vase Set",
    image: "/uploads/sculptural_leaf_vases.png",
    images: [
      "/uploads/sculptural_leaf_vases.png",
      "/uploads/sculptural_leaf_vases_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹1,350 - ₹2,350 / $16 - $28",
    dimensions: {
      height: '50 cm - 65 cm (19.7" - 25.6")',
      diameter: '21 cm - 23 cm (8.3" - 9.1")',
      pendi: 'Top Dia 16 cm (6.3")'
    },
    description: "Handcrafted sculptural metallic floor vase set featuring spiraling aluminium leaf necks, hammered aluminium mid-accents, and textured silver bases. Available in Big (65cm) and Small (50cm) sizes."
  },
  {
    id: "15",
    title: "Handcrafted Dual Metallic Leaf Tabletop Sculpture",
    image: "/uploads/dual_metallic_leaf_sculpture.png",
    images: [
      "/uploads/dual_metallic_leaf_sculpture.png",
      "/uploads/dual_metallic_leaf_sculpture_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹1,800 / $22",
    dimensions: {
      height: '58 cm (22.8")',
      diameter: '32 cm (12.6")',
      pendi: 'Base 34 cm (13.4")'
    },
    description: "Artisanal dual leaf tabletop sculpture featuring hand-carved aluminium and gold leaves mounted on a heavy textured silver pedestal base."
  },
  {
    id: "16",
    title: "Handcrafted Perforated Metallic Leaf Sculpture Set",
    image: "/uploads/perforated_leaf_sculptures.png",
    images: [
      "/uploads/perforated_leaf_sculptures.png",
      "/uploads/perforated_leaf_sculptures_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹620 - ₹1,000 / $8 - $12",
    dimensions: {
      height: '47 cm - 58 cm (18.5" - 22.8")',
      diameter: '13 cm - 18 cm (5.1" - 7.1")',
      pendi: 'Square Silver Pedestal'
    },
    description: "Artisanal cut-out metallic leaf sculpture set featuring hand-embossed two-tone aluminium and gold leaf silhouettes mounted on silver square pedestals. Available in Big (58cm) and Small (47cm) sizes."
  },
  {
    id: "17",
    title: "Geometric Faceted Metallic Sculpture Trio",
    image: "/uploads/geometric_metallic_sculpture_trio.png",
    images: [
      "/uploads/geometric_metallic_sculpture_trio.png",
      "/uploads/geometric_metallic_sculpture_trio_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹400 - ₹800 / $5 - $10",
    dimensions: {
      height: '30 cm - 50 cm (11.8" - 19.7")',
      diameter: '12 cm - 21 cm (4.7" - 8.3")',
      pendi: 'Base 9 cm - 12 cm (3.5" - 4.7")'
    },
    description: "Abstract geometric faceted metallic sculpture set in aluminium, antique gold, and silver finishes. Available in Large (50cm), Medium (38cm), and Small (30cm) sizes."
  },
  {
    id: "18",
    title: "Handcrafted Circular Lovebirds Tree Sculpture",
    image: "/uploads/metallic_lovebirds_tree_sculpture.png",
    images: [
      "/uploads/metallic_lovebirds_tree_sculpture.png",
      "/uploads/metallic_lovebirds_tree_sculpture_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹550 / $7",
    dimensions: {
      height: '33 cm (13")',
      diameter: '30 cm (11.8")',
      pendi: 'Antique Dome Base'
    },
    description: "Artisanal circular tabletop sculpture featuring a pair of aluminium lovebirds perched on silver branches enclosed within a distressed gold circular ring."
  },
  {
    id: "19",
    title: "Handcrafted Circular Horizon Metallic Sculpture Set",
    image: "/uploads/abstract_circular_horizon_sculptures.png",
    images: [
      "/uploads/abstract_circular_horizon_sculptures.png",
      "/uploads/abstract_circular_horizon_sculptures_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹1,350 - ₹1,590 / $16 - $19",
    dimensions: {
      height: '57 cm - 68 cm (22.4" - 26.8")',
      diameter: '31 cm - 38 cm (12.2" - 15")',
      pendi: 'Base 19 cm (7.5")'
    },
    description: "Sculptural metallic tabletop art set featuring aluminium circular frames with gold hand-textured horizon landscapes mounted on tiered silver conical pedestals. Available in Big (68cm) and Small (57cm) sizes."
  },
  {
    id: "20",
    title: "Sculptural Two-Tone Metallic Leaf Accent Vases",
    image: "/uploads/sculptural_leaf_accent_vases.png",
    localImage: "/uploads/sculptural_leaf_accent_vases.png",
    images: [
      "/uploads/sculptural_leaf_accent_vases.png",
      "/uploads/sculptural_leaf_accent_vases_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#53565A", "#D4A017", "#9E7D62", "#2C2C2C"],

    price: "₹800 - ₹1,350 / $10 - $16",
    dimensions: {
      height: '29 cm - 37 cm (11.4" - 14.6")',
      diameter: '20 cm - 25 cm (7.9" - 9.8")',
      pendi: 'Top 4 cm - 5 cm (1.6" - 2")'
    },
    description: "Artisanal leaf-silhouette vase pair featuring two-tone split finishes in antiqued aluminium and oxidized silver ribbed textures. Available in Big (37cm) and Small (29cm) sizes."
  },
  {
    id: "21",
    title: "Handcrafted Spherical Etched Metallic Vase Set",
    image: "/uploads/spherical_etched_metallic_vases_aesthetic.jpg",
    images: [
      "/uploads/spherical_etched_metallic_vases_aesthetic.jpg",
      "/uploads/spherical_etched_metallic_vases_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#D4A017", "#C84E18", "#53565A", "#2C2C2C"],

    price: "₹600 - ₹800 / $7 - $10",
    dimensions: {
      height: '23 cm - 28 cm (9.1" - 11.0")',
      diameter: '26 cm (10.2")',
      pendi: 'Etched Linear Finish'
    },
    description: "Spherical metallic tabletop vase pair featuring fine vertical etched linear textures and a two-tone aluminium to antique gold ombre gradient finish. Available in Big (28cm) and Small (23cm) sizes."
  },
  {
    id: "22",
    title: "Handcrafted Surrealist Metallic Head Sculpture",
    image: "/uploads/surrealist_metallic_head_sculpture_aesthetic.jpg",
    images: [
      "/uploads/surrealist_metallic_head_sculpture_aesthetic.jpg",
      "/uploads/surrealist_metallic_head_sculpture_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹1,250 / $15",
    dimensions: {
      height: '54 cm (21.2")',
      diameter: '19 cm (7.5")',
      pendi: 'Turned Aluminium Pedestal'
    },
    description: "Surrealist tabletop bust sculpture featuring a aluminium hand covering a textured gold face, mounted on an antiqued turned aluminium pedestal stand."
  },
  {
    id: "23",
    title: "Handcrafted Metallic Big Ben Clock Tower Replica",
    image: "/uploads/big_ben_clock_tower_sculpture.jpg",
    localImage: "/uploads/big_ben_clock_tower_sculpture.jpg",
    images: [
      "/uploads/big_ben_clock_tower_sculpture.jpg",
      "/uploads/big_ben_clock_tower_sculpture_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#53565A", "#D4A017", "#2C2C2C"],

    price: "₹800 / $10",
    dimensions: {
      height: '36 cm (14.2")',
      diameter: '9 cm (3.5")',
      pendi: 'Detailed Stonework Base'
    },
    description: "Detailed antique silver metallic replica of London's iconic Big Ben clock tower, featuring hand-textured stonework facade and clock dial."
  },
  {
    id: "24",
    title: "Handcrafted Spiral Flame Metallic Sculpture Set",
    image: "/uploads/spiral_flame_metallic_sculptures_aesthetic.jpg",
    images: [
      "/uploads/spiral_flame_metallic_sculptures_aesthetic.jpg",
      "/uploads/spiral_flame_metallic_sculptures_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#D4A017", "#C84E18", "#53565A", "#2C2C2C"],

    price: "₹1,300 - ₹1,560 / $16 - $19",
    dimensions: {
      height: '65 cm - 74 cm (25.6" - 29.1")',
      diameter: '24 cm - 28 cm (9.4" - 11.0")',
      pendi: 'Conical Aluminium Pedestal'
    },
    description: "Artisanal metallic tabletop sculpture set featuring spiral nautilus gold bases and textured aluminium flame crests mounted on conical aluminium pedestals. Available in Big (74cm) and Small (65cm) sizes."
  },
  {
    id: "25",
    title: "Handcrafted Avant-Garde Metallic Mask Sculpture",
    image: "/uploads/abstract_metallic_mask_sculpture.jpg",
    images: [
      "/uploads/abstract_metallic_mask_sculpture.jpg",
      "/uploads/abstract_metallic_mask_sculpture_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#D4A017", "#9E7D62", "#2C2C2C"],

    price: "₹810 / $10",
    dimensions: {
      height: '51 cm (20.1")',
      diameter: '22 cm (8.7")',
      pendi: 'Textured Aluminium Pedestal'
    },
    description: "Avant-garde tabletop mask sculpture crafted in textured gold aluminium with openwork features and crowned with a tri-color metallic leaf emblem."
  },
  {
    id: "26",
    title: "Handcrafted Two-Tone Metallic Feather Sculpture",
    image: "/uploads/two_tone_metallic_feather_sculpture.png",
    images: [
      "/uploads/two_tone_metallic_feather_sculpture.png",
      "/uploads/two_tone_metallic_feather_sculpture_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹850 / $10",
    dimensions: {
      height: '46 cm (18.1")',
      diameter: '13 cm (5.1")',
      pendi: 'Silver Pewter Pedestal'
    },
    description: "Artisanal metallic feather tabletop sculpture featuring a split aluminium and antiqued gold textured quill mounted on a brushed silver pedestal base."
  },
  {
    id: "27",
    title: "Handcrafted Cobalt & Gold Textured Floor Vase",
    image: "/uploads/cobalt_gold_accent_floor_vase.png",
    images: [
      "/uploads/cobalt_gold_accent_floor_vase.png",
      "/uploads/cobalt_gold_accent_floor_vase_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#1E759A", "#D4A017", "#2C2C2C", "#53565A"],

    price: "₹6,350 / $78",
    dimensions: {
      height: '70 cm (28")',
      diameter: '35 cm (14")',
      pendi: 'Top 16 cm (6")'
    },
    description: "Statement 70cm artisanal floor vase featuring a brushed antique gold collar transition into a deep textured midnight cobalt blue teardrop basin."
  },
  {
    id: "28",
    title: "Handcrafted Dynamic Flame Metallic Sculpture",
    image: "/uploads/abstract_flame_metallic_sculpture.jpg",
    images: [
      "/uploads/abstract_flame_metallic_sculpture.jpg",
      "/uploads/abstract_flame_metallic_sculpture_specs.jpg"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#D4A017", "#C84E18", "#53565A", "#2C2C2C"],

    price: "₹1,540 / $19",
    dimensions: {
      height: '56 cm (22.0")',
      diameter: '36 cm (14.2")',
      pendi: 'Gold Oval Pedestal'
    },
    description: "Artisanal abstract metallic tabletop sculpture featuring sweeping aluminium flame tendrils cradled within a brushed gold crescent shell."
  },
  {
    id: "29",
    title: "Handcrafted 3-Tier Multi-Metallic Serving Stand",
    image: "/uploads/three_tier_metallic_serving_stand.jpg",
    localImage: "/uploads/three_tier_metallic_serving_stand.jpg",
    images: [
      "/uploads/three_tier_metallic_serving_stand.jpg",
      "/uploads/three_tier_metallic_serving_stand_specs.jpg"
    ],
    category: "Hospitality, Utility",
    material: "Aluminium",
    colors: ["#53565A", "#D4A017", "#2C2C2C"],

    price: "₹6,500 / $80",
    dimensions: {
      height: '99 cm (39")',
      diameter: 'Small: 33cm | Med: 41cm | Big: 52cm',
      pendi: 'Base 28 cm (11")'
    },
    description: "Handcrafted 3-tier octagonal serving stand featuring textured pewter silver metallic trays mounted on a heavy central spindle column with finial handle. Ideal for luxury hotel buffets, catering displays, and utility serving spaces."
  },
  {
    id: "30",
    title: "Handcrafted Chevron Metallic Accent Platter",
    image: "/uploads/chevron_metallic_accent_platter_aesthetic.jpg",
    localImage: "/uploads/chevron_metallic_accent_platter_aesthetic.jpg",
    images: [
      "/uploads/chevron_metallic_accent_platter_aesthetic.jpg",
      "/uploads/chevron_metallic_accent_platter_specs.png"
    ],
    category: "Hospitality, Utility",
    material: "Aluminium",
    colors: ["#53565A", "#D4A017", "#9E7D62", "#2C2C2C"],

    price: "₹1,350 - ₹1,550 / $16 - $19",
    dimensions: {
      height: '6 cm - 7 cm (2.4" - 2.8")',
      diameter: '34 cm - 40 cm (13.4" - 15.7")',
      pendi: 'Square Contour Base'
    },
    description: "Handcrafted square metallic serving platter featuring alternating dual-tone silver and brushed gold chevron textured bands. Displayed on a aluminium scrollwork stand, available in Big (40cm) and Small (34cm) sizes."
  },

  {
    id: "31",
    title: "Handcrafted Chain-Link Border Aluminium Accent Tray",
    image: "/uploads/chain_link_border_brass_tray_aesthetic.jpg",
    localImage: "/uploads/chain_link_border_brass_tray_aesthetic.jpg",
    images: [
      "/uploads/chain_link_border_brass_tray_aesthetic.jpg",
      "/uploads/chain_link_border_brass_tray_specs.png"
    ],
    category: "Hospitality",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹1,820 / $22",
    dimensions: {
      height: '5 cm (2.0")',
      diameter: '40 cm (15.7")',
      pendi: 'Length 40 cm (15.7")'
    },
    description: "Handcrafted square accent tray featuring a deeply textured antique burnished gold center basin framed by a bold cast chain-link border on all four sides."
  },
  {
    id: "34",
    title: "Handcrafted Corrugated Wave Metallic Platter",
    image: "/uploads/corrugated_wave_metallic_platter.jpg",
    localImage: "/uploads/corrugated_wave_metallic_platter.jpg",
    images: [
      "/uploads/corrugated_wave_metallic_platter.jpg",
      "/uploads/corrugated_wave_metallic_platter_stand.jpg",
      "/uploads/corrugated_wave_metallic_platter_specs.png"
    ],
    category: "Hospitality, Utility",
    material: "Aluminium",
    colors: ["#D4A017", "#53565A", "#9E7D62", "#2C2C2C"],

    price: "₹1,650 / $20",
    dimensions: {
      height: '7 cm (3")',
      diameter: '44 cm (17")',
      pendi: 'Length 60 cm (24")'
    },
    description: "Artisanal statement corrugated wave platter featuring alternating textured gold and brushed silver metallic channels, mounted on an ornate scrollwork display stand."
  },

  {
    id: "35",
    title: "Handcrafted Ruffled Aluminium Wave Bowl",
    image: "/uploads/ruffled_copper_bowl_aesthetic.jpg",
    localImage: "/uploads/ruffled_copper_bowl_aesthetic.jpg",
    images: [
      "/uploads/ruffled_copper_bowl_aesthetic.jpg",
      "/uploads/ruffled_copper_bowl_specs.jpg"
    ],
    category: "Hospitality",
    material: "Aluminium",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],

    price: "₹1,100",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],
    dimensions: {
      height: '12 cm (5")',
      diameter: '28 cm (11")',
      pendi: 'Length 32 cm (13")'
    },
    description: "Artisanal hand-hammered ruffled wave bowl crafted in antique oxidized aluminium finish with undulating scalloped edges. A statement centrepiece ideal for luxury hotel buffets, catering displays, and fine dining tables. Available in Terracotta Red, Antique Gold, Beige, and Matte Black."
  },
  {
    id: "36",
    title: "Handcrafted Tri-Tone Metal Pedestal Accent Table",
    image: "/uploads/pedestal_accent_table_aesthetic.jpg",
    localImage: "/uploads/pedestal_accent_table_aesthetic.jpg",
    images: [
      "/uploads/pedestal_accent_table_aesthetic.jpg",
      "/uploads/pedestal_accent_table_specs.png"
    ],
    category: "Hospitality, Utility",
    material: "Aluminium",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],

    price: "₹3,500 / $42",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],
    dimensions: {
      height: '61 cm (24")',
      diameter: 'Top: 41 cm (16")',
      pendi: 'Base: 23 cm (9")'
    },
    description: "Handcrafted tri-tone metal pedestal accent side table featuring a round aluminium top, an intricately carved antique aluminium turned spindle central column, and a heavy textured silver tripod base with curved legs. Ideal for luxury hotel lounges, hospitality seating, and utility accent spaces."
  },
  {
    id: "37",
    title: "Handcrafted Ornate Oval Metallic Footed Platter Set",
    image: "/uploads/ornate_oval_metallic_platter_set.jpg",
    localImage: "/uploads/ornate_oval_metallic_platter_set.jpg",
    images: [
      "/uploads/ornate_oval_metallic_platter_set.jpg",
      "/uploads/ornate_oval_metallic_platter_set_specs.jpg"
    ],
    category: "Utility, Hospitality",
    material: "Aluminium",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],

    price: "₹2,250 - ₹2,450",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],
    dimensions: {
      height: '10 cm - 13 cm (4" - 5")',
      diameter: '33 cm - 36 cm (13" - 14")',
      pendi: 'Length 63 cm - 69 cm (21")'
    },
    description: "Handcrafted ornate oval serving platter set featuring filigree embossed basins, cast decorative handles, and sculpted claw-foot pedestal bases. Available in Big (69×36cm) and Small (63×33cm) sizes in aluminium and antique gold finishes."
  },
  {
    id: "38",
    title: "Handcrafted Multi-Metallic Chevron Leaf Platter",
    image: "/uploads/multi_metallic_chevron_leaf_platter_aesthetic.jpg",
    localImage: "/uploads/multi_metallic_chevron_leaf_platter_aesthetic.jpg",
    images: [
      "/uploads/multi_metallic_chevron_leaf_platter_aesthetic.jpg",
      "/uploads/multi_metallic_chevron_leaf_platter_stand.jpg",
      "/uploads/multi_metallic_chevron_leaf_platter_specs.jpg"
    ],
    category: "Hospitality",
    material: "Aluminium",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],

    price: "₹500",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],
    dimensions: {
      height: '7 cm (3")',
      diameter: '19 cm (8")',
      pendi: 'Length 48 cm (19")'
    },
    description: "Handcrafted leaf-shaped serving platter featuring alternating tri-color chevron bands in brushed silver, antique gold, and aluminium. Displayed on a scrollwork stand, ideal for luxury hotel dining and catering accents."
  },
  {
    id: "39",
    title: "Handcrafted Dual-Tone Teal & Green Geometric Platter Set",
    image: "/uploads/teal_green_geometric_platter_set.jpg",
    localImage: "/uploads/teal_green_geometric_platter_set.jpg",
    images: [
      "/uploads/teal_green_geometric_platter_set.jpg",
      "/uploads/teal_green_geometric_platter_set_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹850 - ₹1,050",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],
    dimensions: {
      height: '6 cm (2.4")',
      diameter: '15 cm - 19 cm (5.9" - 7.5")',
      pendi: 'Length 34 cm - 43 cm (13.4" - 16.9")'
    },
    description: "Handcrafted organic dual-tone decorative platter set featuring embossed geometric starburst textures in vibrant ocean teal and emerald green finishes. Displayed on aluminium scrollwork stands, available in Big (43×19cm) and Small (34×15cm) sizes."
  },
  {
    id: "40",
    title: "Handcrafted Chain-Link Border Aluminium Accent Tray",
    image: "/uploads/chain_link_border_brass_tray_aesthetic.jpg",
    localImage: "/uploads/chain_link_border_brass_tray_aesthetic.jpg",
    images: [
      "/uploads/chain_link_border_brass_tray_aesthetic.jpg",
      "/uploads/chain_link_border_brass_tray_specs.png"
    ],
    category: "Utility",
    material: "Aluminium",
    colors: ["#53565A", "#DFBFA1", "#9E7D62", "#C84E18"],

    price: "₹1,820 / $22",
    dimensions: {
      height: '5 cm (2.0")',
      diameter: '40 cm (15.7")',
      pendi: 'Length 40 cm (15.7")'
    },
    description: "Handcrafted square accent tray featuring a deeply textured antique burnished gold center basin framed by a bold cast chain-link border on all four sides."
  },
  {
    id: "41",
    title: "Handcrafted Whitewashed & Gold Pedestal Accent Table",
    image: "/uploads/whitewashed_pedestal_table_aesthetic.jpg",
    localImage: "/uploads/whitewashed_pedestal_table_aesthetic.jpg",
    images: [
      "/uploads/whitewashed_pedestal_table_aesthetic.jpg",
      "/uploads/whitewashed_pedestal_table_specs.png"
    ],
    category: "Hospitality, Utility",
    material: "Aluminium",
    colors: ["#C84E18", "#D4A017", "#9E7D62", "#2C2C2C"],

    price: "₹2,350 / $28",
    dimensions: {
      height: '63 cm (25")',
      diameter: 'Top: 37 cm (15")',
      pendi: 'Base: 23 cm (9")'
    },
    description: "Handcrafted vintage-style pedestal accent side table featuring a round whitewashed distressed wooden top, a turned spindle central column with gold highlighting, and a matching pedestal base."
  },
  {
    id: "42",
    title: "Handcrafted Aluminium & Gold Pedestal Accent Table",
    image: "/uploads/copper_gold_pedestal_table_aesthetic.jpg",
    localImage: "/uploads/copper_gold_pedestal_table_aesthetic.jpg",
    images: [
      "/uploads/copper_gold_pedestal_table_aesthetic.jpg",
      "/uploads/copper_gold_pedestal_table_specs.png"
    ],
    category: "Hospitality, Utility",
    material: "Aluminium",
    colors: ["#C84E18", "#E67E22", "#9E7D62", "#2C2C2C"],

    price: "₹3,200 / $39",
    dimensions: {
      height: '65 cm (26")',
      diameter: 'Top: 40 cm (16")',
      pendi: 'Base: 24 cm (10")'
    },
    description: "Handcrafted metal pedestal accent side table featuring a round textured aluminium top, an elegant gold baluster spindle column, and a heavy textured silver dome base."
  },
  {
    id: "43",
    title: "Handcrafted Heart Cutout Filigree Pedestal Accent Table",
    image: "/uploads/filigree_pedestal_table_aesthetic.jpg",
    localImage: "/uploads/filigree_pedestal_table_aesthetic.jpg",
    images: [
      "/uploads/filigree_pedestal_table_aesthetic.jpg",
      "/uploads/filigree_pedestal_table_specs.png"
    ],
    category: "Hospitality, Utility",
    material: "Aluminium",
    colors: ["#C84E18", "#D4A017", "#9E7D62", "#2C2C2C"],

    price: "₹3,590 / $44",
    dimensions: {
      height: '70 cm (28")',
      diameter: 'Top: 40 cm (16")',
      pendi: 'Heart Cutout Base'
    },
    description: "Handcrafted metallic pedestal accent side table featuring a round aluminium top with intricate heart-shaped cutout filigree patterns, an antique aluminium spindle column, and a matching silver filigree base."
  },
  {
    id: "44",
    title: "Handcrafted Cellular Mosaic Textured Platter",
    image: "/uploads/mosaic_platter_aesthetic.jpg",
    localImage: "/uploads/mosaic_platter_aesthetic.jpg",
    images: [
      "/uploads/mosaic_platter_aesthetic.jpg",
      "/uploads/mosaic_platter_stand.jpg",
      "/uploads/mosaic_platter_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹1,050 / $13",
    dimensions: {
      height: '7 cm (2.8")',
      diameter: '34 cm (13.4")',
      pendi: 'Length 34 cm (13.4")'
    },
    description: "Handcrafted square metallic accent platter featuring a cellular mosaic-textured surface in a hand-painted antique turquoise-aluminium ombre finish, displayed on a scrollwork metal stand."
  },
  {
    id: "45",
    title: "Handcrafted Giant Spoon & Fork Wall Decor",
    image: "/uploads/giant_cutlery_wall_decor_aesthetic.jpg",
    localImage: "/uploads/giant_cutlery_wall_decor_aesthetic.jpg",
    images: [
      "/uploads/giant_cutlery_wall_decor_aesthetic.jpg",
      "/uploads/giant_cutlery_wall_decor_specs.png"
    ],
    category: "Hospitality, Utility",
    material: "Aluminium",
    colors: ["#C84E18", "#D4A017", "#53565A", "#2C2C2C"],

    price: "₹1,200 - ₹1,250 / $15 - $16",
    dimensions: {
      height: '120 cm (47.2")',
      diameter: 'Spoon & Fork Set',
      pendi: 'Wall Mounted'
    },
    description: "Handcrafted giant decorative wall-mounted cutlery set featuring a textured aluminium spoon and an antique gold fork. A unique statement art piece ideal for luxury dining rooms, hotel restaurants, and hospitality spaces. Available as Spoon (₹1,200) and Fork (₹1,250)."
  },
  {
    id: "46",
    title: "Handcrafted Leaf-Shaped Metallic Platter",
    image: "/uploads/leaf_platter_set_aesthetic.jpg",
    localImage: "/uploads/leaf_platter_set_aesthetic.jpg",
    images: [
      "/uploads/leaf_platter_set_aesthetic.jpg",
      "/uploads/leaf_platter_set_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹350 - ₹450 / $4 - $6",
    dimensions: {
      height: '3 cm',
      diameter: 'Small: 13 cm (5.1") / Big: 17 cm (6.7")',
      pendi: 'Small Length: 30 cm (11.8") / Big Length: 36 cm (14.2")'
    },
    description: "Handcrafted leaf-shaped metallic serving platters featuring a detailed foliage pattern in a dual-tone teal and green antique wash. Available in Big (₹450) and Small (₹350) sizes, displayed on bronze scrollwork stands."
  },
  {
    id: "47",
    title: "Handcrafted Ginkgo Leaf Accent Platter",
    image: "/uploads/ginkgo_leaf_platter_aesthetic.jpg",
    localImage: "/uploads/ginkgo_leaf_platter_aesthetic.jpg",
    images: [
      "/uploads/ginkgo_leaf_platter_aesthetic.jpg",
      "/uploads/ginkgo_leaf_platter_stand.jpg",
      "/uploads/ginkgo_leaf_platter_specs.png"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹1,100 / $14",
    dimensions: {
      height: '7 cm (2.8")',
      diameter: '38 cm (15.0")',
      pendi: 'Length 36 cm (14.2")'
    },
    description: "Handcrafted ginkgo leaf-shaped metallic accent platter featuring detailed radiating leaf veins in a dual-tone teal and green antique wash, displayed on a scrollwork metal stand."
  },
  {
    id: "48",
    title: "Handcrafted Hexagonal Three-Tier Serving Stand",
    image: "/uploads/hexagonal_serving_stand_aesthetic.jpg",
    localImage: "/uploads/hexagonal_serving_stand_aesthetic.jpg",
    images: [
      "/uploads/hexagonal_serving_stand_aesthetic.jpg",
      "/uploads/hexagonal_serving_stand_specs.jpg"
    ],
    category: "Hospitality, Utility",
    material: "Aluminium",
    colors: ["#C84E18", "#D4A017", "#53565A", "#2C2C2C"],

    price: "₹6,200 / $75",
    dimensions: {
      height: '93 cm (36.6")',
      diameter: 'Small: 32cm / Medium: 41cm / Big: 51cm',
      pendi: 'Base: 22 cm (8.7")'
    },
    description: "Handcrafted three-tier metallic serving and display stand featuring detailed hexagonal plates in a distressed antique aluminium-gold texture finish. Ideal for premium buffet setups, catering hospitality, and retail utility displays."
  },
  {
    id: "49",
    title: "Handcrafted Round Three-Tier Serving Stand",
    image: "/uploads/round_serving_stand_aesthetic.jpg",
    localImage: "/uploads/round_serving_stand_aesthetic.jpg",
    images: [
      "/uploads/round_serving_stand_aesthetic.jpg",
      "/uploads/round_serving_stand_specs.jpg"
    ],
    category: "Utility",
    material: "Aluminium",
    colors: ["#C84E18", "#D4A017", "#53565A", "#2C2C2C"],

    price: "₹2,550 / $31",
    dimensions: {
      height: '43 cm (16.9")',
      diameter: 'Small: 27cm / Medium: 33cm / Big: 40cm',
      pendi: 'Base: 13 cm (5.1")'
    },
    description: "Handcrafted three-tier metallic serving and display stand featuring circular plates in aluminium, gold, and silver finishes. A versatile piece for catering hospitality, buffet display, and home utility organization."
  },
  {
    id: "50",
    title: "Handcrafted Tri-Tone Fan Accent Platter",
    image: "/uploads/tri_tone_fan_platter_aesthetic.jpg",
    localImage: "/uploads/tri_tone_fan_platter_aesthetic.jpg",
    images: [
      "/uploads/tri_tone_fan_platter_aesthetic.jpg",
      "/uploads/tri_tone_fan_platter_stand.jpg",
      "/uploads/tri_tone_fan_platter_specs.jpg"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹1,000 / $12",
    dimensions: {
      height: '12 cm (4.7")',
      diameter: '20 cm (7.9")',
      pendi: 'Length 55 cm (21.7")'
    },
    description: "Handcrafted tri-tone metallic serving and display platter featuring an elegant fan-shaped design in silver, aluminium, and gold textured finishes. Set on an ornate metal display scrollwork stand."
  },
  {
    id: "51",
    title: "Handcrafted Rectangular Patina Tray Set with Handles",
    image: "/uploads/rectangular_patina_tray_set.jpg",
    localImage: "/uploads/rectangular_patina_tray_set.jpg",
    images: [
      "/uploads/rectangular_patina_tray_set.jpg",
      "/uploads/rectangular_patina_tray_set_stand.jpg",
      "/uploads/rectangular_patina_tray_set_specs.png"
    ],
    category: "Utility",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹1,300 - ₹1,500 / $16 - $18",
    dimensions: {
      height: '5 cm (2")',
      diameter: '30 cm - 32 cm (11.8" - 12.6")',
      pendi: 'Length 50 cm - 63 cm (19.7" - 24.8")'
    },
    description: "Handcrafted rectangular patina serving tray set with integrated side handles. Features a rustic weathered finish, available in Emerald Green, Ocean Teal, Antique Gold, and Matte Black. A durable and functional utility piece perfect for hospitality serving, room service, and organization. Available in Big (63×32cm) and Small (50×30cm) sizes."
  },
  {
    id: "52",
    title: "Handcrafted Antelope Skull Tabletop Sculpture",
    image: "/uploads/antelope_skull_sculpture.jpg",
    localImage: "/uploads/antelope_skull_sculpture.jpg",
    images: [
      "/uploads/antelope_skull_sculpture.jpg",
      "/uploads/antelope_skull_sculpture_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹2,450 / $30",
    dimensions: {
      height: '67 cm (26.4")',
      diameter: '28 cm (11")',
      pendi: 'Square Pedestal Base'
    },
    description: "An exquisite handcrafted metallic antelope skull tabletop sculpture. Features an antiqued gold skull with textured aluminium/bronze horns mounted on a detailed silver-pewter square pedestal base. A unique statement art piece ideal for luxury home décor, sideboards, study tables, and upscale B2B hospitality interiors. Available in Emerald Green, Ocean Teal, Antique Gold, and Matte Black finishes."
  },
  {
    id: "53",
    title: "Handcrafted Antlered Moose Skull Wall Mount",
    image: "/uploads/moose_skull_wall_mount.jpg",
    localImage: "/uploads/moose_skull_wall_mount.jpg",
    images: [
      "/uploads/moose_skull_wall_mount.jpg",
      "/uploads/moose_skull_wall_mount_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹2,700 / $33",
    dimensions: {
      height: '40 cm (15.7")',
      diameter: '45 cm (17.7")',
      pendi: 'Wall Mounted'
    },
    description: "A striking handcrafted metallic moose skull wall mount sculpture. Features a gold-patinated hand-textured skull with detailed aluminium-finished antlers. A bold, rustic accent piece perfect for lodge-style interiors, living rooms, and modern B2B office hospitality decors. Available in Emerald Green, Ocean Teal, Antique Gold, and Matte Black finishes."
  },
  {
    id: "54",
    title: "Handcrafted Longhorn Bull Skull Wall Mount",
    image: "/uploads/bull_skull_wall_mount.jpg",
    localImage: "/uploads/bull_skull_wall_mount.jpg",
    images: [
      "/uploads/bull_skull_wall_mount.jpg",
      "/uploads/bull_skull_wall_mount_specs.png"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹3,400 / $41",
    dimensions: {
      height: '43 cm (16.9")',
      diameter: '55 cm (21.7")',
      pendi: 'Wall Mounted'
    },
    description: "An impressive handcrafted metallic longhorn bull skull wall mount sculpture. Features a detailed hand-textured aluminium-bronze finish skull with swept-out textured steel horns. A powerful rustic statement piece perfect for western-style interiors, living rooms, and bold corporate B2B lounge spaces. Available in Emerald Green, Ocean Teal, Antique Gold, and Matte Black finishes."
  },
  {
    id: "55",
    title: "Handcrafted Spiraled Ram Skull Wall Mount",
    image: "/uploads/ram_skull_wall_mount.jpg",
    localImage: "/uploads/ram_skull_wall_mount.jpg",
    images: [
      "/uploads/ram_skull_wall_mount.jpg",
      "/uploads/ram_skull_wall_mount_close.jpg",
      "/uploads/ram_skull_wall_mount_specs.jpg"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹4,100 / $49",
    dimensions: {
      height: '64 cm (25.2")',
      diameter: '58 cm (22.8")',
      pendi: 'Wall Mounted'
    },
    description: "An extraordinary handcrafted metallic ram skull wall mount sculpture. Features a gold-finished hand-textured skull with majestic spiraling aluminium-patinated horns. A bold and theatrical statement art piece ideal for luxury home décor, living rooms, corridors, and upscale hospitality lounges. Available in Emerald Green, Ocean Teal, Antique Gold, and Matte Black finishes."
  },
  {
    id: "56",
    title: "Handcrafted Patina Tray Set with Deer Handles",
    image: "/uploads/deer_handle_patina_tray_set.jpg",
    localImage: "/uploads/deer_handle_patina_tray_set.jpg",
    images: [
      "/uploads/deer_handle_patina_tray_set.jpg",
      "/uploads/deer_handle_patina_tray_set_stand.jpg",
      "/uploads/deer_handle_patina_tray_set_specs.jpg"
    ],
    category: "Giftware",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹850 - ₹1,200 / $10 - $15",
    dimensions: {
      height: '4 cm (1.6")',
      diameter: '17 cm - 20 cm (6.7" - 7.9")',
      pendi: 'Length 36 cm - 42 cm (14.2" - 16.5")'
    },
    description: "A gorgeous handcrafted rectangular patina serving tray set featuring cast deer head figurines as side handles. Finished in a rustic distressed turquoise-green patinated texture. Perfect as a premium B2B corporate gift, holiday present, or table serving ware for rustic luxury settings. Available in Emerald Green, Ocean Teal, Antique Gold, and Matte Black finishes. Comes in Big (42×20cm) and Small (36×17cm) sizes."
  },
  {
    id: "57",
    title: "Handcrafted Circular Patina Portal Sculpture",
    image: "/uploads/circular_patina_portal_sculpture.jpg",
    localImage: "/uploads/circular_patina_portal_sculpture.jpg",
    images: [
      "/uploads/circular_patina_portal_sculpture.jpg",
      "/uploads/circular_patina_portal_sculpture_specs.jpg"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹1,150 / $14",
    dimensions: {
      height: '40 cm (15.7")',
      diameter: '38 cm (15.0")',
      pendi: 'Base 18 cm (7.1")'
    },
    description: "An outstanding handcrafted circular patina portal tabletop sculpture. Features an antiqued gold, silver, and aluminium textured concentric ring design with a hollow center basin, mounted on a solid pewter square pedestal base. A gorgeous modern art piece ideal for luxury home décor, study tables, mantels, and hotel lobbies. Available in Emerald Green, Ocean Teal, Antique Gold, and Matte Black finishes."
  },
  {
    id: "58",
    title: "Handcrafted Abstract Crescent Flame Sculpture",
    image: "/uploads/abstract_crescent_flame_sculpture.jpg",
    localImage: "/uploads/abstract_crescent_flame_sculpture.jpg",
    images: [
      "/uploads/abstract_crescent_flame_sculpture.jpg",
      "/uploads/abstract_crescent_flame_sculpture_specs.jpg"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹1,200 / $15",
    dimensions: {
      height: '41 cm (16.1")',
      diameter: '17 cm (6.7")',
      pendi: 'Base 12 cm (4.7")'
    },
    description: "An striking handcrafted abstract crescent flame tabletop sculpture. Features a textured silver base, a crescent gold-textured flame-like body, and a central aluminium/red textured oval focal element. A bold and modern artistic accent piece perfect for living rooms, reception tables, mantels, and luxury hotel decors. Available in Emerald Green, Ocean Teal, Antique Gold, and Matte Black finishes."
  },
  {
    id: "59",
    title: "Handcrafted Circular Ripple Coral Sculpture",
    image: "/uploads/circular_ripple_coral_sculpture.jpg",
    localImage: "/uploads/circular_ripple_coral_sculpture.jpg",
    images: [
      "/uploads/circular_ripple_coral_sculpture.jpg",
      "/uploads/circular_ripple_coral_sculpture_specs.jpg"
    ],
    category: "Home Décor",
    material: "Aluminium",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],

    price: "₹1,000 / $12",
    dimensions: {
      height: '29 cm (11.4")',
      diameter: '27 cm (10.6")',
      pendi: 'Length 29 cm (11.4")'
    },
    description: "A striking handcrafted circular ripple coral tabletop sculpture. Features a textured circular gear-like frame with intricate organic ridges, finished in a stunning ocean turquoise-blue top gradient transitioning into a distressed gold and white base. Set on a circular gold-brushed base. A beautiful modern art piece ideal for shelves, study tables, and upscale coastal hospitality lounge settings. Available in Emerald Green, Ocean Teal, Antique Gold, and Matte Black finishes."
  },
  {
    id: "60",
    title: "Handcrafted Tall Spindle Pedestal Accent Table",
    image: "/uploads/spindle_pedestal_accent_table.jpg",
    localImage: "/uploads/spindle_pedestal_accent_table.jpg",
    images: [
      "/uploads/spindle_pedestal_accent_table.jpg",
      "/uploads/spindle_pedestal_accent_table_specs.png"
    ],
    category: "Hospitality, Utility",
    material: "Aluminium",
    colors: ["#C84E18", "#E67E22", "#9E7D62", "#2C2C2C"],

    price: "₹6,050 / $73",
    dimensions: {
      height: '91 cm (36")',
      diameter: 'Top: 48 cm (19")',
      pendi: 'Tripod Claw-Foot Base'
    },
    description: "An elegant handcrafted tall metal pedestal side accent table. Features a round aluminium-finished wooden top, a turned antique gold aluminium spindle central column, and a heavy textured silver tripod base with curved claw-foot legs. A versatile and premium furniture piece ideal for luxury hotel lounges, hospitality seating areas, and home utility accent spaces. Available in Orange/Rust, Orange, Brown/Bronze, and Matte Black finishes."
  }
];

const HERO_SLIDES = [
  {
    name: "Whitewashed & Gold Pedestal Table",
    subtitle: "HOSPITALITY & UTILITY",
    title: "TIMELESS ELEGANCE\nIN ACCENT DESIGN",
    description: "Handcrafted vintage-style pedestal accent side table featuring a round whitewashed distressed wooden top and turned spindle column with gold highlights.",
    mainLocalImage: "/uploads/hero_whitewashed_table.png",
    bgColor: "#ECEAE6",
    bgImage: "/uploads/bg_limewash_texture.png",
    productId: "41"
  },
  {
    name: "Geometric Faceted Sculpture Trio",
    subtitle: "HOME DÉCOR COLLECTION",
    title: "MODERN FACETED\nMETALLIC ART",
    description: "Abstract geometric faceted metallic sculpture set in antique aluminium, gold, and silver finishes, bringing dynamic architectural energy to luxury interiors.",
    mainLocalImage: "/uploads/hero_geometric_sculptures.png",
    bgColor: "#EFECE8",
    bgImage: "/uploads/bg_plaster_limewash.png",
    productId: "17"
  },
  {
    name: "Longhorn Bull Skull Wall Mount",
    subtitle: "WALL DÉCOR COLLECTION",
    title: "BOLD RUSTIC\nSTATEMENT ART",
    description: "An impressive handcrafted metallic longhorn bull skull wall mount sculpture with textured aluminium-bronze patina and swept-out textured steel horns.",
    mainLocalImage: "/uploads/hero_bull_skull.png",
    bgColor: "#EFEBE6",
    bgImage: "/uploads/bg_fluted_panel_studio.png",
    productId: "54"
  },
  {
    name: "Crescent Metallic Pedestal Bowl",
    subtitle: "HOSPITALITY COLLECTION",
    title: "ARTISANAL FORM\n& TEXTURE",
    description: "Artisanal crescent-shaped decorative serving bowl crafted in textured antiqued bronze aluminium with a slotted comb-tooth rim mounted on a heavy flared pedestal base.",
    mainLocalImage: "/uploads/hero_crescent_bowl.png",
    bgColor: "#EAECE6",
    bgImage: "/uploads/bg_dark_chevron_wood.png",
    productId: "33"
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

const FAQ_DATA = [
  {
    q: "What materials do you specialize in for manufacturing?",
    a: "Every product in our actual line is engineered from 100% premium export-grade aluminium. We specialize in artisanal cast aluminium finished in multi-tone antique patinas, brushed metallics, and textured finishes compliant with international luxury hospitality standards."
  },
  {
    q: "What is your Minimum Order Quantity (MOQ) for B2B export?",
    a: "Our standard minimum order quantity is typically 50 to 100 units per style for standard catalog items. For bespoke architectural installations, custom dies, or private-label projects, MOQs can be tailored during trade consultation."
  },
  {
    q: "Do you offer custom finishes and bespoke manufacturing?",
    a: "Yes. As an OEM/ODM manufacturer with in-house foundries and finishing facilities in Moradabad (India), we offer custom sizing, logo engravings, bespoke mold casting, and specialized finish options (Antique Gold, Matte Black, Emerald Green, Ocean Teal, etc.)."
  },
  {
    q: "What international shipping and trade terms (Incoterms) do you support?",
    a: "We regularly export to over 20+ countries including the USA, UK, Germany, UAE, and EU nations under FOB (Mundra / Nhava Sheva / ICD Moradabad), CIF, and DDP terms. We handle sea freight container loads (FCL/LCL) as well as expedited air freight."
  },
  {
    q: "Are your products compliant with international export standards?",
    a: "Yes. Giftmark Industries is an official EPCH (Export Promotion Council for Handicrafts) Registered Member Exporter with full RCMC accreditation, MSME certification, and FAIC awards. Our goods undergo strict multi-stage quality inspections before packing."
  },
  {
    q: "How can I request a complete trade catalog or wholesale quote?",
    a: "You can click 'Request a Catalogue' or 'Contact B2B Sales' in the footer, submit an inquiry with your company credentials, or connect with our export team directly via WhatsApp at +91 98975 83968."
  }
];


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
    quote: "The handcrafted aluminium filigree trays and serving ware we ordered exceeded our expectations. The craftsmanship is extraordinary, and the bulk pricing for our hospitality business was very competitive. We've re-ordered three times already.",
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
    id: "reel-yt-01",
    title: "Traffic Was Crazy… But These Decor Pieces Were Worth It 😍",
    category: "Artisanal Crafting",
    views: "58.4K",
    likes: "8.2K",
    comments: 394,
    image: "https://i.ytimg.com/vi/S1_fVAJqggc/maxresdefault.jpg",
    youtubeId: "S1_fVAJqggc",
    caption: "Traffic was crazy… but these luxury handcrafted decor pieces were totally worth it. Master artisans crafting export-grade masterpieces.",
    tags: ["#luxury", "#homedecor", "#handcrafted", "#giftmark", "#moradabad"],
    link: "https://youtube.com/shorts/S1_fVAJqggc?si=UKegoxrVWQvLjqs-"
  },
  {
    id: "reel-yt-02",
    title: "Luxury Aluminium Home Decor ✨ | Tables, Sculptures & Vases",
    category: "Sculptures & Tables",
    views: "34.1K",
    likes: "5.8K",
    comments: 340,
    image: "https://i.ytimg.com/vi/ctQLUlt8EsA/maxresdefault.jpg",
    youtubeId: "ctQLUlt8EsA",
    caption: "Explore luxury aluminium home decor collections — statement tables, elegant sculptures & artisanal vases by Giftmark.",
    tags: ["#luxurydecor", "#aluminiumart", "#aesthetic", "#giftmark"],
    link: "https://youtube.com/shorts/ctQLUlt8EsA?si=DOisLEJHRibz8zon"
  },
  {
    id: "reel-yt-03",
    title: "Black & Gold Luxury Vases ✨ | Elegant Table Decor",
    category: "Luxury Vases",
    views: "38.2K",
    likes: "5.4K",
    comments: 260,
    image: "https://i.ytimg.com/vi/l_C2EDeXo4s/maxresdefault.jpg",
    youtubeId: "l_C2EDeXo4s",
    caption: "Black & Gold luxury vases — statement table decor handcrafted with premium metals and exquisite finishes.",
    tags: ["#luxurylifestyle", "#vases", "#tabledecor", "#giftmark"],
    link: "https://youtube.com/shorts/l_C2EDeXo4s?si=phhXoGkXyN3AUAYT"
  },
  {
    id: "reel-yt-04",
    title: "This Luxury Table Decor Will Elevate Your Home ✨ | Sculptural Decor",
    category: "Sculptures & Tables",
    views: "28.6K",
    likes: "4.2K",
    comments: 215,
    image: "https://i.ytimg.com/vi/yQwGhanUFZg/maxresdefault.jpg",
    youtubeId: "yQwGhanUFZg",
    caption: "This luxury sculptural table decor will elevate your home aesthetic. Handcrafted metal artistry crafted to perfection.",
    tags: ["#luxury", "#homedecor", "#sculpture", "#giftmark"],
    link: "https://youtube.com/shorts/yQwGhanUFZg?si=oqDQSQFeHmW1Y5zV"
  },
  {
    id: "reel-yt-05",
    title: "Artisanal Crafting & Metal Finishing Behind The Scenes ✨",
    category: "Behind The Scenes",
    views: "47.8K",
    likes: "6.5K",
    comments: 289,
    image: "https://i.ytimg.com/vi/zcWeul7SZqo/maxresdefault.jpg",
    youtubeId: "zcWeul7SZqo",
    caption: "Step inside our Moradabad workshops to witness precision metal finishing, handcrafted detailing, and artisanal excellence.",
    tags: ["#behindthescenes", "#metalcraft", "#artisan", "#giftmark", "#exportquality"],
    link: "https://youtube.com/shorts/zcWeul7SZqo?si=xdZfsnhclC2MhHjX"
  }
];

const REEL_CATEGORIES = ["All Reels", "Sculptures & Tables", "Luxury Vases", "Artisanal Crafting", "Behind The Scenes"];

function InstagramReels() {
  const [selectedReel, setSelectedReel] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Reels");
  const [viewAll, setViewAll] = useState(false);
  const scrollContainerRef = useRef(null);

  const filteredReels = activeCategory === "All Reels"
    ? MOCK_REELS
    : MOCK_REELS.filter((r) => r.category === activeCategory);

  const displayedReels = viewAll ? filteredReels : filteredReels.slice(0, 4);

  useEffect(() => {
    if (selectedReel) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [selectedReel]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedReel) return;
      if (e.key === 'Escape') {
        setSelectedReel(null);
      } else if (e.key === 'ArrowRight') {
        handleNextReel();
      } else if (e.key === 'ArrowLeft') {
        handlePrevReel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReel, filteredReels]);

  const currentModalIndex = selectedReel
    ? filteredReels.findIndex((r) => r.id === selectedReel.id)
    : -1;

  const handlePrevReel = () => {
    if (currentModalIndex > 0) {
      setSelectedReel(filteredReels[currentModalIndex - 1]);
    } else {
      setSelectedReel(filteredReels[filteredReels.length - 1]);
    }
  };

  const handleNextReel = () => {
    if (currentModalIndex >= 0 && currentModalIndex < filteredReels.length - 1) {
      setSelectedReel(filteredReels[currentModalIndex + 1]);
    } else {
      setSelectedReel(filteredReels[0]);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="reels-section" aria-label="Instagram & YouTube Reels Showcase">
      <div className="reels-header">
        <span className="reels-eyebrow">Craft in Motion</span>
        <h2 className="reels-title">Explore Our Reels & Video Showcase</h2>
        <p className="reels-subtitle">
          Get a behind-the-scenes look at our Moradabad workshops, artisanal casting techniques, hand-polishing craft, and luxury product launches.
        </p>

        <div className="reels-social-links">
          <a
            href="https://www.youtube.com/@GiftmarkIndustries"
            target="_blank"
            rel="noopener noreferrer"
            className="reels-channel-badge youtube"
          >
            <span className="channel-icon">▶</span>
            <span>@GiftmarkIndustries on YouTube</span>
          </a>
          <a
            href="https://www.instagram.com/industriesgiftmark?igsh=aHdxdTBieTdnN28w"
            target="_blank"
            rel="noopener noreferrer"
            className="reels-channel-badge instagram"
          >
            <span className="channel-icon">📸</span>
            <span>@industriesgiftmark on Instagram</span>
          </a>
        </div>

        {/* Category Filters */}
        <div className="reels-filter-bar">
          {REEL_CATEGORIES.map((cat) => {
            const count = cat === "All Reels"
              ? MOCK_REELS.length
              : MOCK_REELS.filter(r => r.category === cat).length;
            return (
              <button
                key={cat}
                className={`reel-filter-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} <span className="chip-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel Container */}
      <div className="reels-carousel-wrapper">
        <button
          className="reels-nav-btn prev"
          onClick={scrollLeft}
          aria-label="Scroll reels left"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          className={`reels-grid ${viewAll ? 'grid-expanded' : 'carousel-mode'}`}
          ref={scrollContainerRef}
        >
          {(viewAll ? filteredReels : displayedReels).map((reel, idx) => (
            <div
              key={reel.id}
              className="reel-card"
              onClick={() => setSelectedReel(reel)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedReel(reel)}
            >
              <div className="reel-cover-wrapper">
                <img
                  src={reel.image}
                  alt={reel.title}
                  className="reel-cover-img"
                  loading="lazy"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.step) {
                      e.currentTarget.dataset.step = "sd";
                      e.currentTarget.src = `https://i.ytimg.com/vi/${reel.youtubeId}/sddefault.jpg`;
                    } else if (e.currentTarget.dataset.step === "sd") {
                      e.currentTarget.dataset.step = "hq";
                      e.currentTarget.src = `https://i.ytimg.com/vi/${reel.youtubeId}/hqdefault.jpg`;
                    }
                  }}
                />
                <div className="reel-overlay">
                  <div className="reel-top-row">
                    <span className="reel-badge-category">{reel.category}</span>
                    <span className="reel-badge-hd">HD SHORT</span>
                  </div>

                  <div className="reel-play-btn" aria-label="Play reel">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  <div className="reel-meta-pill">
                    <span className="reel-meta-item">
                      <span className="meta-icon">👁️</span> {reel.views}
                    </span>
                    <span className="reel-meta-divider">•</span>
                    <span className="reel-meta-item">
                      <span className="meta-icon">❤️</span> {reel.likes}
                    </span>
                  </div>
                </div>
              </div>

              <div className="reel-info">
                <h4 className="reel-card-title">{reel.title}</h4>
                <p className="reel-caption">{reel.caption}</p>
                <div className="reel-card-footer">
                  <span className="reel-watch-cta">
                    <span>Watch Video</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="reels-nav-btn next"
          onClick={scrollRight}
          aria-label="Scroll reels right"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* View All / Load More Action Bar */}
      {filteredReels.length > 4 && (
        <div className="reels-action-footer">
          <button
            className="reels-view-toggle-btn"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? (
              <>Show Less (4 Featured)</>
            ) : (
              <>View All {filteredReels.length} Videos & Reels</>
            )}
          </button>
        </div>
      )}

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

            {/* Modal Navigation Arrows */}
            {filteredReels.length > 1 && (
              <>
                <button
                  className="reel-modal-nav-btn prev"
                  onClick={handlePrevReel}
                  aria-label="Previous reel"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="reel-modal-nav-btn next"
                  onClick={handleNextReel}
                  aria-label="Next reel"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className="reel-modal-body">
              {/* Left Column: Video Player */}
              <div className="reel-video-container">
                {selectedReel.youtubeId ? (
                  <iframe
                    className="reel-video-iframe"
                    src={`https://www.youtube.com/embed/${selectedReel.youtubeId}?autoplay=1&rel=0&modestbranding=1&loop=1&playlist=${selectedReel.youtubeId}&playsinline=1&enablejsapi=1`}
                    title={selectedReel.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img src={selectedReel.image} alt="Simulated video" className={`reel-video-mockup ${isPlaying ? 'playing' : ''}`} />
                    <div className="video-glow-blob"></div>
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
                  </>
                )}
              </div>

              {/* Right Column: Profile & Comments */}
              <div className="reel-details-panel">
                <div className="reel-details-header">
                  <div className="reel-profile-avatar">G</div>
                  <div className="reel-profile-info">
                    <span className="reel-profile-name">giftmark_industries</span>
                    <span className="reel-profile-sub">Moradabad, India • {currentModalIndex + 1} of {filteredReels.length}</span>
                  </div>
                  <span className="reel-category-pill">{selectedReel.category}</span>
                </div>

                <div className="reel-details-caption">
                  <h4 className="reel-modal-title">{selectedReel.title}</h4>
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
                    {selectedReel.youtubeId ? 'Watch on YouTube Shorts' : 'View on Instagram'}
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Inquiry form states
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    quantity: '100',
    finish: '',
    message: ''
  });
  const [formSuccess, setFormSuccess] = useState(null);
  const [inquiryModalProduct, setInquiryModalProduct] = useState(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Legal Modal states
  const [activeLegal, setActiveLegal] = useState(null); // 'privacy', 'refund', 'terms', 'disclaimer' or null

  // FAQ Modal states
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  // Certifications Viewer Modal state
  const [activeCertModal, setActiveCertModal] = useState(null);

  // Product Detail Lightbox Modal state
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [modalActiveImageIndex, setModalActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isImgExpanded, setIsImgExpanded] = useState(false);

  // Cart states
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Smooth scroll and highlight navigation to specific product card
  const navigateToProductCard = (productId, category) => {
    // Switch to home or collections if on legal/other subpages
    if (currentPage !== 'home' && currentPage !== 'collections') {
      setCurrentPage('home');
    }

    setTimeout(() => {
      let cardEl = document.getElementById(`bestseller-card-${productId}`) || document.getElementById(`product-card-${productId}`);

      if (!cardEl) {
        // If not found on home (e.g. filtered out on collections page), switch to collections with 'All' filter
        setCurrentPage('collections');
        setActiveFilter('All');
        setTimeout(() => {
          cardEl = document.getElementById(`product-card-${productId}`);
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            cardEl.classList.add('product-card-highlight');
            setTimeout(() => cardEl.classList.remove('product-card-highlight'), 2500);
          }
        }, 200);
      } else {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cardEl.classList.add('product-card-highlight');
        setTimeout(() => cardEl.classList.remove('product-card-highlight'), 2500);
      }
    }, 100);
  };
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'India',
    tradeTerm: 'FOB - Port of Origin (Mundra/Nhava Sheva)',
    notes: ''
  });
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // Helper to parse price string to number for subtotal (e.g. "₹6,500 / $80" -> 6500, or multi-item sets "₹800 - ₹1,350 / $10 - $16" -> 800 + 1350 = 2150)
  const parsePrice = (priceStr) => {
    try {
      if (!priceStr) return 0;
      const rupeePart = priceStr.split('/')[0];
      if (rupeePart.includes('-')) {
        return rupeePart
          .split('-')
          .map((part) => parseInt(part.replace(/[^0-9]/g, ''), 10) || 0)
          .reduce((sum, val) => sum + val, 0);
      }
      const numeric = rupeePart.replace(/[^0-9]/g, '');
      return parseInt(numeric, 10) || 0;
    } catch (e) {
      return 0;
    }
  };

  const addToCart = (product, color) => {
    const selectedCol = color || (product.colors && product.colors.length > 0 ? product.colors[0] : null);
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id && item.color === selectedCol);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id && item.color === selectedCol
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, color: selectedCol, quantity: 1 }];
    });
    setIsCheckingOut(false);
    setIsCartOpen(true);
  };

  const buyNow = (product, color) => {
    if (activeProductModal) setActiveProductModal(null);
    const selectedCol = color || (product.colors && product.colors.length > 0 ? product.colors[0] : null);
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id && item.color === selectedCol);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id && item.color === selectedCol
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, color: selectedCol, quantity: 1 }];
    });
    setIsCheckingOut(false);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, color) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.product.id === productId && item.color === color)));
  };

  const updateQuantity = (productId, color, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.color === color) {
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
      address: checkoutForm.address,
      city: checkoutForm.city,
      country: checkoutForm.country,
      tradeTerm: checkoutForm.tradeTerm,
      notes: checkoutForm.notes,
      items: cart.map((item) => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        color: item.color || null,
        quantity: item.quantity
      })),
      totalPrice: `₹${getCartTotal().toLocaleString()}`
    };

    let generatedId = 'ORD-' + Date.now();
    try {
      const res = await axios.post('/api/orders', orderData);
      if (res.data && res.data.orderId) {
        generatedId = res.data.orderId;
      }
    } catch (err) {
      console.log("Simulating order creation locally:", err);
    }

    let waMessage = `*New B2B Trade Order - Giftmark Industries*\n`;
    waMessage += `*Order ID:* ${generatedId}\n`;
    waMessage += `--------------------------------------\n`;
    waMessage += `*Buyer Details:*\n`;
    waMessage += `- Name: ${orderData.name}\n`;
    if (orderData.company) waMessage += `- Company: ${orderData.company}\n`;
    waMessage += `- WhatsApp/Phone: ${orderData.phone}\n`;
    if (orderData.email) waMessage += `- Email: ${orderData.email}\n`;
    if (orderData.city || orderData.country) waMessage += `- Destination: ${orderData.city ? orderData.city + ', ' : ''}${orderData.country}\n`;
    if (orderData.tradeTerm) waMessage += `- Trade Terms: ${orderData.tradeTerm}\n`;
    if (orderData.notes) waMessage += `- Special Notes: ${orderData.notes}\n\n`;

    waMessage += `*Order Items:*\n`;
    orderData.items.forEach((item, idx) => {
      const colorSuffix = item.color ? ` (Finish: ${getColorName(item.color)})` : '';
      waMessage += `${idx + 1}. ${item.title}${colorSuffix} x ${item.quantity} [${item.price}]\n`;
    });
    waMessage += `\n*Est. Subtotal:* ${orderData.totalPrice}\n`;
    waMessage += `--------------------------------------\n`;
    waMessage += `Please send proforma invoice and freight schedule.`;

    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/919897583968?text=${encodedMessage}`;

    setPlacedOrder({
      id: generatedId,
      items: orderData.items,
      total: orderData.totalPrice,
      waUrl: waUrl,
      buyerName: orderData.name
    });

    setCart([]);
  };

  // Fetch collections from node backend
  useEffect(() => {
    axios.get('/api/collections')
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
    return slide.mainImage || slide.mainLocalImage;
  };

  const getHeroPreviewImage = (slide) => {
    return slide.previewImage || slide.previewLocalImage;
  };

  const getCardImage = (item) => {
    if (!item) return '/uploads/brass_vessels.png';
    return item.image || item.localImage || (item.images && item.images[0]) || '/uploads/brass_vessels.png';
  };

  const handleProductInquiry = (productOrTitle, finishName = '') => {
    let prod = null;
    if (productOrTitle && typeof productOrTitle === 'object') {
      prod = productOrTitle;
    } else if (typeof productOrTitle === 'string') {
      prod = collections.find(c => c.title === productOrTitle) || collections[0];
    } else if (activeProductModal) {
      prod = activeProductModal;
    }

    if (activeProductModal) setActiveProductModal(null);
    if (isFaqOpen) setIsFaqOpen(false);
    if (activeCertModal) setActiveCertModal(null);
    if (activeLegal) setActiveLegal(null);

    const title = prod ? prod.title : (typeof productOrTitle === 'string' ? productOrTitle : '');
    const finish = finishName || (selectedColor ? getColorName(selectedColor) : '');

    setInquiryForm(prev => ({
      ...prev,
      product: title,
      quantity: prev.quantity || '100',
      finish: finish || prev.finish || '',
      message: title
        ? `Hi, we are interested in placing a wholesale order for "${title}"${finish ? ` in ${finish} finish` : ''}. Please share FOB prices, lead time, and export packaging specifications.`
        : 'Hi, we are interested in placing a bulk B2B order. Please send us your catalog and trade pricing.'
    }));

    setInquiryModalProduct(prod || collections[0]);
    setInquirySubmitted(false);
    setIsInquiryModalOpen(true);
  };

  const handleInquiryWhatsAppDirect = () => {
    const title = inquiryModalProduct ? inquiryModalProduct.title : (inquiryForm.product || 'Aluminium Metalware');
    let text = `*B2B Product Inquiry - Giftmark Industries*\n`;
    text += `--------------------------------------\n`;
    text += `*Product:* ${title}\n`;
    if (inquiryForm.finish) text += `*Preferred Finish:* ${inquiryForm.finish}\n`;
    if (inquiryForm.quantity) text += `*Estimated Quantity:* ${inquiryForm.quantity} pcs\n`;
    if (inquiryForm.name) text += `*Buyer Name:* ${inquiryForm.name}\n`;
    if (inquiryForm.company) text += `*Company:* ${inquiryForm.company}\n`;
    if (inquiryForm.phone) text += `*Contact:* ${inquiryForm.phone}\n`;
    if (inquiryForm.email) text += `*Email:* ${inquiryForm.email}\n`;
    if (inquiryForm.message) text += `*Requirement Details:* ${inquiryForm.message}\n`;
    text += `--------------------------------------\n`;
    text += `Please send us trade pricing and formal proforma quote.`;

    const waUrl = `https://wa.me/919897583968?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInquiryModalSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/inquiry', inquiryForm)
      .then(() => {
        setInquirySubmitted(true);
      })
      .catch(() => {
        setInquirySubmitted(true);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/inquiry', inquiryForm)
      .then(res => {
        setFormSuccess(res.data.message);
        setInquiryForm({ name: '', email: '', phone: '', product: '', quantity: '100', finish: '', message: '' });
      })
      .catch(err => {
        // Fallback mock submission
        console.log("Connecting directly through simulated form submission.");
        setFormSuccess("Thank you for your enquiry! We will get in touch with you shortly. (Simulated Submission)");
        setInquiryForm({ name: '', email: '', phone: '', product: '', quantity: '100', finish: '', message: '' });
      });
  };

  const scrollToBestsellers = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('bestsellers-section') || document.querySelector('.best-sellers-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const el = document.getElementById('bestsellers-section') || document.querySelector('.best-sellers-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Filter collections
  const filteredCollections = activeFilter === 'All'
    ? collections
    : collections.filter(item => {
      if (!item || !item.category) return false;
      if (item.category === activeFilter) return true;
      if (typeof item.category === 'string') {
        const cats = item.category.split(',').map(c => c.trim().toLowerCase());
        return cats.includes(activeFilter.toLowerCase()) || item.category.toLowerCase().includes(activeFilter.toLowerCase());
      }
      return false;
    });

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
            <div className="logo-img-wrapper">
              <svg className="logo-badge-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="56" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.45" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-accent-dark)" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.5" />
                <circle cx="12" cy="60" r="2.2" fill="var(--color-accent-dark)" opacity="0.85" />
                <circle cx="108" cy="60" r="2.2" fill="var(--color-accent-dark)" opacity="0.85" />
                <path id="estdTopPath" d="M 16,60 A 44,44 0 0,1 104,60" fill="none" />
                <path id="estdBottomPath" d="M 16,60 A 44,44 0 0,0 104,60" fill="none" />
                <text className="logo-badge-text">
                  <textPath href="#estdTopPath" startOffset="50%" textAnchor="middle">ESTD</textPath>
                </text>
                <text className="logo-badge-text">
                  <textPath href="#estdBottomPath" startOffset="50%" textAnchor="middle">1993</textPath>
                </text>
              </svg>
              <img
                src="/uploads/giftmark_logo.png"
                alt="Giftmark Industries Logo"
                className="logo-img"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-main">GIFTMARK</span>
              <div className="logo-sub">
                <div className="logo-line"></div>
                <span className="logo-text">INDUSTRIES</span>
                <div className="logo-line"></div>
              </div>
            </div>
          </div>

          <nav className="desktop-nav">
            <ul className="nav-menu">
              <li>
                <span
                  className={`nav-link hover-underline ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => { setCurrentPage('home'); setIsAutoplay(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
              <li>
                <span
                  className="nav-link hover-underline"
                  onClick={scrollToBestsellers}
                >
                  Bestsellers
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
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        {/* --- MOBILE NAVIGATION DRAWER --- */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-overlay" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-nav-header">
                <span className="mobile-nav-logo-title">GIFTMARK INDUSTRIES</span>
                <button className="mobile-nav-close" onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <ul className="mobile-nav-links">
                <li>
                  <span
                    className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
                    onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); setIsAutoplay(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >
                    Home
                  </span>
                </li>
                <li>
                  <span
                    className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
                    onClick={() => { setCurrentPage('about'); setIsMobileMenuOpen(false); }}
                  >
                    About Us
                  </span>
                </li>
                <li>
                  <span
                    className="mobile-nav-link"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToBestsellers();
                    }}
                  >
                    Bestsellers
                  </span>
                </li>
                <li className="mobile-nav-section-title">Collections</li>
                <li className="mobile-nav-sub-item">
                  {['All', 'Home Décor', 'Hospitality', 'Giftware', 'Utility'].map((cat) => (
                    <span
                      key={cat}
                      className={`mobile-nav-sublink ${currentPage === 'collections' && activeFilter === cat ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentPage('collections');
                        setActiveFilter(cat);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      • {cat}
                    </span>
                  ))}
                </li>
                <li>
                  <span
                    className={`mobile-nav-link ${currentPage === 'certifications' ? 'active' : ''}`}
                    onClick={() => { setCurrentPage('certifications'); setIsMobileMenuOpen(false); }}
                  >
                    Certifications & Exhibitions
                  </span>
                </li>
                <li>
                  <span
                    className={`mobile-nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                    onClick={() => { setCurrentPage('contact'); setIsMobileMenuOpen(false); }}
                  >
                    Contact Us
                  </span>
                </li>
              </ul>
              <div className="mobile-nav-footer">
                <a href="https://wa.me/919897583968" target="_blank" rel="noreferrer" className="mobile-nav-wa-btn">
                  WhatsApp Inquiry (+91 98975 83968)
                </a>
              </div>
            </div>
          </div>
        )}

        {/* --- TRUST LINE BANNER (MARQUEE) --- */}
        <section className="trust-banner" aria-label="Brand Trust Highlights">
          <div className="marquee-track">
            <div className="marquee-content">
              {TRUST_BANNER_ITEMS.map((text, i) => (
                <div key={`track1-${i}`} className="marquee-item">
                  <span className="marquee-text">{text}</span>
                  <span className="trust-dot" aria-hidden="true">•</span>
                </div>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {TRUST_BANNER_ITEMS.map((text, i) => (
                <div key={`track2-${i}`} className="marquee-item">
                  <span className="marquee-text">{text}</span>
                  <span className="trust-dot" aria-hidden="true">•</span>
                </div>
              ))}
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
                            src={slide.mainLocalImage + "?v=3"}
                            alt={slide.name}
                            className="revolving-idol-img"
                            onClick={() => {
                              if (slideProduct) {
                                setActiveProductModal(slideProduct);
                                setModalActiveImageIndex(0);
                                setSelectedColor(slideProduct.colors && slideProduct.colors.length > 0 ? slideProduct.colors[0] : null);
                              }
                            }}
                            style={{ cursor: 'pointer' }}
                            title="Click to view product details & full image"
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
                  <button
                    className="hero-cta hero-animate-text-4"
                    onClick={() => {
                      const activeProduct = collections.find(p => p.id === currentHeroSlide.productId);
                      if (activeProduct) {
                        setActiveProductModal(activeProduct);
                        setModalActiveImageIndex(0);
                        setSelectedColor(activeProduct.colors && activeProduct.colors.length > 0 ? activeProduct.colors[0] : null);
                      } else {
                        setCurrentPage('collections');
                      }
                    }}
                  >
                    View Product Details
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
                    <img src="/uploads/cobalt_gold_accent_floor_vase.png" alt="Home Décor" className="collection-preview-image" />
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
                    <img src="/uploads/crescent_metallic_pedestal_bowl.png" alt="Hospitality" className="collection-preview-image" />
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
                    <img src="/uploads/tri_tone_fan_platter_aesthetic.jpg" alt="Giftware" className="collection-preview-image" />
                    <div className="collection-preview-overlay">
                      <div className="collection-preview-content">
                        <span className="collection-card-subtitle">Collection</span>
                        <h3 className="collection-card-title">Giftware</h3>
                        <p className="collection-card-description">
                          Artisanal metallic fan accent platters, ornate vessels, and curated premium corporate gifts.
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
                    <img src="/uploads/giant_cutlery_wall_decor_aesthetic.jpg" alt="Utility" className="collection-preview-image" />
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

            {/* Best Sellers (Animated Showcase) */}
            <section className="best-sellers-section" id="bestsellers-section">
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
                {BESTSELLER_IDS.map(bid => {
                  const item = collections.find(c => c.id === bid);
                  if (!item) return null;
                  return (
                    <div
                      className="best-seller-card clickable-product-card"
                      key={item.id}
                      id={`bestseller-card-${item.id}`}
                      onClick={() => {
                        setActiveProductModal(item);
                        setModalActiveImageIndex(0);
                        setSelectedColor(item.colors && item.colors.length > 0 ? item.colors[0] : null);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="best-seller-badge">Best Seller</span>
                      <div className="best-seller-image-container">
                        <img src={getCardImage(item)} alt={item.title} className="best-seller-image" />
                      </div>
                      <div className="best-seller-info">
                        <span className="best-seller-cat">{item.category}</span>
                        <h3 className="best-seller-name">{item.title}</h3>
                        {item.colors && item.colors.length > 0 && (
                          <div className="product-card-finishes">
                            <span className="card-finishes-label">Finishes ({item.colors.length}):</span>
                            <div className="card-finishes-dots">
                              {item.colors.map((c, idx) => (
                                <span
                                  key={idx}
                                  className="card-finish-dot"
                                  style={{ backgroundColor: c }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="product-card-footer">
                          <span className="best-seller-price">{item.price}</span>
                          <div className="product-card-actions">
                            <button
                              className="product-action-btn cart-btn"
                              title="Add to Cart"
                              onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                            >
                              <ShoppingBag size={14} />
                            </button>
                            <button
                              className="product-action-btn buy-btn"
                              onClick={(e) => { e.stopPropagation(); buyNow(item); }}
                            >
                              Buy Now
                            </button>
                            {hasMultipleOptions(item) && (
                              <button
                                className="product-action-btn enquire-btn"
                                title="Enquire about custom specifications & finishes"
                                onClick={(e) => { e.stopPropagation(); handleProductInquiry(item.title); }}
                              >
                                Enquire Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                    src={collections[3]?.image || collections[3]?.localImage || '/uploads/catering_essential.png'}
                    alt="Aluminium Chafing Dish"
                    className="home-about-image"
                  />
                </div>
              </div>
            </section>

            {/* Global Presence */}
            <section className="global-presence-section">
              <div className="global-presence-grid">
                {/* Left Column: Text & Tags */}
                <div className="global-presence-content">
                  <span className="best-sellers-subtitle">32+ YEARS OF EXPORT EXCELLENCE</span>
                  <h2 className="global-pres-title" style={{ marginTop: '4px' }}>A Global Presence</h2>
                  <p className="global-pres-text">
                    Over three decades, our handcrafted metalware has traveled across borders. Giftmark Industries has built a strong international presence, serving importers, wholesalers, retailers, and hospitality projects globally.
                  </p>
                  <p className="global-pres-text" style={{ fontSize: '13.5px', marginBottom: '20px' }}>
                    We exhibit and export regularly across major trade hubs, including <strong>China</strong>, <strong>Singapore</strong>, <strong>America (USA)</strong>, Hong Kong, Holland, Germany, the UK, UAE, Mumbai, Hyderabad, and Chennai.
                  </p>
                  <ul className="exhibition-list">
                    <li className="exhibition-tag">China</li>
                    <li className="exhibition-tag">Singapore</li>
                    <li className="exhibition-tag">America (USA)</li>
                    <li className="exhibition-tag">Hong Kong</li>
                    <li className="exhibition-tag">Holland (Netherlands)</li>
                    <li className="exhibition-tag">Frankfurt (Germany)</li>
                    <li className="exhibition-tag">London (UK)</li>
                    <li className="exhibition-tag">Dubai (UAE)</li>
                    <li className="exhibition-tag">Mumbai, Hyderabad &amp; Chennai (India)</li>
                  </ul>
                </div>

                {/* Right Column: Interactive Map */}
                <div className="global-map-mock">
                  <div className="map-background"></div>
                  <div className="map-canvas-dots"></div>
                  <div className="map-node node-india" title="India HQ"></div>
                  <div className="map-node node-mumbai" title="Mumbai, India"></div>
                  <div className="map-node node-hyderabad" title="Hyderabad, India"></div>
                  <div className="map-node node-chennai" title="Chennai, India"></div>
                  <div className="map-node node-china" title="China"></div>
                  <div className="map-node node-singapore" title="Singapore"></div>
                  <div className="map-node node-hongkong" title="Hong Kong"></div>
                  <div className="map-node node-germany" title="Germany"></div>
                  <div className="map-node node-holland" title="Holland (Netherlands)"></div>
                  <div className="map-node node-uk" title="United Kingdom"></div>
                  <div className="map-node node-usa" title="America (USA)"></div>
                  <div className="map-node node-uae" title="UAE"></div>
                </div>
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
                    {EXHIBITIONS_DATA.slice(0, 4).map((ex) => (
                      <div
                        key={ex.id}
                        className="exhib-item-card clickable-about-cert"
                        onClick={() => setActiveCertModal(ex)}
                        title="Click to view exhibition photo"
                      >
                        <div className="about-cert-thumb">
                          <img src={ex.image} alt={ex.title} />
                        </div>
                        <div className="exhib-info">
                          <span className="exhib-mini-badge">{ex.badge}</span>
                          <h4 className="exhib-title">{ex.title}</h4>
                          <p className="exhib-desc">{ex.description}</p>
                          <span className="exhib-meta"><Eye size={12} /> Click to View Photo</span>
                        </div>
                      </div>
                    ))}
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
                <div
                  className="product-card clickable-product-card"
                  key={item.id}
                  id={`product-card-${item.id}`}
                  onClick={() => {
                    setActiveProductModal(item);
                    setModalActiveImageIndex(item.id === "47" ? 1 : 0);
                    setSelectedColor(item.colors && item.colors.length > 0 ? item.colors[0] : null);
                  }}
                >
                  <div className="product-img-container">
                    <img src={getCardImage(item)} alt={item.title} className="product-img" />
                  </div>
                  <span className="product-cat">{item.category}</span>
                  <h3 className="product-title">{item.title}</h3>
                  <p className="product-desc">{item.description}</p>
                  {item.colors && item.colors.length > 0 && (
                    <div className="product-card-finishes">
                      <span className="card-finishes-label">Available Finishes:</span>
                      <div className="card-finishes-dots">
                        {item.colors.map((c, idx) => (
                          <span
                            key={idx}
                            className="card-finish-dot"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="product-footer">
                    <span className="product-price">{item.price}</span>
                    <div className="product-card-actions" onClick={(e) => e.stopPropagation()}>
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
                      {hasMultipleOptions(item) && (
                        <button
                          className="product-action-btn enquire-btn"
                          title="Enquire about custom specifications & finishes"
                          onClick={() => handleProductInquiry(item.title)}
                        >
                          Enquire Now
                        </button>
                      )}
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
          <div className="contact-page-section" id="b2b-enquiry-section">
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
                  Explore our past and upcoming global trade showcases, where we display our latest heritage metalware, hotel chafing gear, and architectural aluminium metalware installations.
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
                <li><span className="footer-link" onClick={() => { setIsFaqOpen(true); setExpandedFaqIndex(null); }}>Frequently Asked Questions (FAQ)</span></li>
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
            <span className="footer-watermark-text">GIFTMARK INDUSTRIES • ESTD 1993</span>
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

        {/* --- FAQ ACCORDION MODAL OVERLAY --- */}
        {isFaqOpen && (
          <div className="faq-modal-overlay" onClick={() => { setIsFaqOpen(false); setExpandedFaqIndex(null); }}>
            <div className="faq-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="faq-modal-close" onClick={() => { setIsFaqOpen(false); setExpandedFaqIndex(null); }} title="Close FAQ">
                <X size={20} />
              </button>

              <div className="faq-modal-header">
                <span className="faq-modal-badge">Help &amp; Trade Information</span>
                <h2 className="faq-modal-title">Frequently Asked Questions</h2>
                <p className="faq-modal-subtitle">
                  Key answers regarding our handcrafted aluminium metalware, B2B wholesale orders, and global export processes.
                </p>
              </div>

              <div className="faq-accordion-list">
                {FAQ_DATA.map((item, idx) => {
                  const isOpen = expandedFaqIndex === idx;
                  return (
                    <div key={idx} className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
                      <button
                        type="button"
                        className="faq-accordion-header"
                        onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-accordion-question">{item.q}</span>
                        <span className={`faq-accordion-icon ${isOpen ? 'rotated' : ''}`}>
                          <ChevronDown size={18} />
                        </span>
                      </button>
                      {isOpen && (
                        <div className="faq-accordion-body">
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="faq-modal-footer">
                <p className="faq-footer-prompt">Have a custom hospitality or bulk project requirement?</p>
                <button
                  className="faq-contact-btn"
                  onClick={() => {
                    setIsFaqOpen(false);
                    setExpandedFaqIndex(null);
                    setCurrentPage('contact');
                  }}
                >
                  Contact B2B Sales
                </button>
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
              </div>
            </div>
          </div>
        )}

        {/* --- PRODUCT DETAIL LIGHTBOX MODAL --- */}
        {activeProductModal && (
          <div className="product-modal-overlay" onClick={() => { setActiveProductModal(null); setSelectedColor(null); setIsImgExpanded(false); }}>
            <div
              className={`product-modal-content ${isImgExpanded ? 'pmc-img-expanded' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="product-modal-close"
                onClick={() => {
                  if (isImgExpanded) { setIsImgExpanded(false); }
                  else { setActiveProductModal(null); setSelectedColor(null); }
                }}
                title={isImgExpanded ? 'Back to product details' : 'Close Modal'}
              >
                {isImgExpanded
                  ? <span style={{ fontSize: '20px', lineHeight: 1, display: 'block' }}>&#8592;</span>
                  : <X size={18} />}
              </button>

              {isImgExpanded ? (
                <InModalZoomImage
                  src={(activeProductModal.images && activeProductModal.images[modalActiveImageIndex]) || getCardImage(activeProductModal)}
                  alt={activeProductModal.title}
                />
              ) : (
                <div className="product-modal-grid">
                  {/* Left Column: Image Gallery & Thumbnail Selector */}
                  <div className="product-modal-gallery">
                    <div
                      className="product-modal-main-img-container pmc-clickable"
                      onClick={() => setIsImgExpanded(true)}
                      title="Tap to view full image"
                    >
                      <img
                        src={(activeProductModal.images && activeProductModal.images[modalActiveImageIndex]) || getCardImage(activeProductModal)}
                        alt={activeProductModal.title}
                        className="product-modal-main-img"
                      />
                      <span className="product-modal-zoom-hint">Tap image to expand • Tap thumbnail to switch</span>
                    </div>

                    {(activeProductModal.images || [getCardImage(activeProductModal)]).length > 1 && (
                      <div className="product-modal-thumbnails">
                        {(activeProductModal.images || [getCardImage(activeProductModal)]).map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className={`product-modal-thumb ${modalActiveImageIndex === idx ? 'active' : ''}`}
                            onClick={() => setModalActiveImageIndex(idx)}
                          >
                            <img src={imgUrl} alt={`View ${idx + 1}`} />
                            <span className="thumb-label">
                              {imgUrl.toLowerCase().includes('spec') ? 'Dimensions' : (idx === 0 ? 'Lifestyle' : `View ${idx + 1}`)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Product Information & Specifications */}
                  <div className="product-modal-info">
                    <div className="product-modal-header-row">
                      <span className="product-modal-category">
                        <ShieldCheck size={12} style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '4px' }} />
                        {activeProductModal.category} • B2B Export Line
                      </span>
                    </div>

                    <h2 className="product-modal-title">{activeProductModal.title}</h2>

                    <div className="product-modal-price-row">
                      <span className="product-modal-price">{activeProductModal.price}</span>
                      <span className="product-modal-sku">Item ID: GM-{activeProductModal.id || '11'}</span>
                    </div>

                    <p className="product-modal-desc">{activeProductModal.description}</p>

                    {/* Available Finishes (Informational Display Only) */}
                    {activeProductModal.colors && activeProductModal.colors.length > 0 && (
                      <div className="product-modal-colors-section product-modal-finishes-static">
                        <span className="colors-label">AVAILABLE FINISHES ({activeProductModal.colors.length}):</span>
                        <div className="finishes-static-list">
                          {activeProductModal.colors.map((colorHex, idx) => (
                            <div key={idx} className="finish-static-chip">
                              <span
                                className="finish-static-dot"
                                style={{ backgroundColor: colorHex }}
                              />
                              <span className="finish-static-name">{getColorName(colorHex)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technical Dimensions Card */}
                    {activeProductModal.dimensions ? (
                      <div className="product-modal-specs-box">
                        <div className="specs-box-header">
                          <FileText size={14} className="specs-icon" />
                          <span>DIMENSIONS & TECHNICAL SPECIFICATIONS</span>
                        </div>
                        <div className="specs-grid">
                          <div className="spec-item">
                            <span className="spec-label">Overall Height</span>
                            <span className="spec-value">{activeProductModal.dimensions.height}</span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">Body Diameter</span>
                            <span className="spec-value">{activeProductModal.dimensions.diameter}</span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">Pendi (Base)</span>
                            <span className="spec-value">{activeProductModal.dimensions.pendi}</span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">Material</span>
                            <span className="spec-value">{activeProductModal.material || "Aluminium"}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="product-modal-specs-box">
                        <div className="specs-box-header">
                          <CheckCircle size={14} className="specs-icon" />
                          <span>PRODUCT GUARANTEE & EXPORT QUALITY</span>
                        </div>
                        <p style={{ fontSize: '12.5px', color: '#666', margin: 0, lineHeight: '1.5' }}>
                          Handcrafted by master artisans in India. Export quality finish compliant with global B2B standards.
                        </p>
                      </div>
                    )}

                    {/* Call to Action Buttons */}
                    <div className="product-modal-actions">
                      <button
                        className="pm-btn pm-btn-primary"
                        onClick={() => { addToCart(activeProductModal, selectedColor); setActiveProductModal(null); setSelectedColor(null); }}
                      >
                        <ShoppingBag size={15} /> Add to Cart
                      </button>
                      <button
                        className="pm-btn pm-btn-secondary"
                        onClick={() => { buyNow(activeProductModal, selectedColor); setActiveProductModal(null); setSelectedColor(null); }}
                      >
                        Buy Now
                      </button>
                      {hasMultipleOptions(activeProductModal) && (
                        <button
                          className="pm-btn pm-btn-outline"
                          onClick={() => {
                            handleProductInquiry(activeProductModal.title);
                            setActiveProductModal(null);
                            setSelectedColor(null);
                          }}
                        >
                          Enquire Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
                          <div className="cart-item-card" key={`${item.product.id}-${item.color || ''}`}>
                            <img src={getCardImage(item.product)} alt={item.product.title} className="cart-item-img" />
                            <div className="cart-item-info">
                              <h4 className="cart-item-title">{item.product.title}</h4>
                              {item.color && (
                                <div className="cart-item-color-display" style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
                                  <span style={{ fontSize: '11px', color: '#777' }}>Finish:</span>
                                  <span
                                    className="cart-item-color-circle"
                                    style={{
                                      display: 'inline-block',
                                      width: '10px',
                                      height: '10px',
                                      borderRadius: '50%',
                                      backgroundColor: item.color,
                                      border: '1px solid rgba(0,0,0,0.1)'
                                    }}
                                  />
                                  <span style={{ fontSize: '11px', color: '#333', fontWeight: 600 }}>
                                    {getColorName(item.color)}
                                  </span>
                                </div>
                              )}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '4px' }}>
                                <span className="cart-item-price">{item.product.price}</span>
                                {item.product.price && item.product.price.includes('-') && (
                                  <span style={{ fontSize: '11px', color: '#c59d5f', fontWeight: 600 }}>
                                    (Pair Total: ₹{parsePrice(item.product.price).toLocaleString()})
                                  </span>
                                )}
                              </div>
                              <div className="cart-item-qty-actions">
                                <button className="qty-btn" onClick={() => updateQuantity(item.product.id, item.color, -1)}>
                                  <Minus size={12} />
                                </button>
                                <span className="qty-value">{item.quantity}</span>
                                <button className="qty-btn" onClick={() => updateQuantity(item.product.id, item.color, 1)}>
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                            <button className="cart-item-remove-btn" onClick={() => removeFromCart(item.product.id, item.color)}>
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
                        <button
                          className="cart-checkout-btn"
                          onClick={() => {
                            setIsCartOpen(false);
                            setIsCheckoutModalOpen(true);
                            setPlacedOrder(null);
                          }}
                        >
                          Proceed to Checkout →
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* DRAWER INLINE CHECKOUT FALLBACK */
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
                            placeholder="Your Name"
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
                              Confirm &amp; WhatsApp Inquiry
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

        {/* --- DEDICATED B2B CHECKOUT MODAL OVERLAY --- */}
        {isCheckoutModalOpen && (
          <div className="checkout-modal-overlay" onClick={() => setIsCheckoutModalOpen(false)}>
            <div className="checkout-modal-container" onClick={(e) => e.stopPropagation()}>
              <button
                className="checkout-modal-close"
                onClick={() => setIsCheckoutModalOpen(false)}
                title="Close Checkout"
              >
                <X size={18} />
              </button>

              {!placedOrder ? (
                <>
                  <div className="checkout-modal-header">
                    <div className="checkout-header-badge">
                      <ShieldCheck size={13} />
                      <span>B2B EXPORT TRADE PORTAL • FOUNDRY DIRECT</span>
                    </div>
                    <h2 className="checkout-modal-title">Wholesale Order &amp; Proforma Quotation</h2>
                    <p className="checkout-modal-subtitle">
                      Review your metalware manifest, specify international Incoterms, and receive an instant proforma invoice.
                    </p>
                  </div>

                  <div className="checkout-modal-grid">
                    {/* Left Column: Order Items Summary Card */}
                    <div className="checkout-summary-card">
                      <div className="checkout-card-header-bar">
                        <h3 className="checkout-card-heading">Order Manifest</h3>
                        <span className="checkout-item-count-badge">
                          {getCartCount()} {getCartCount() === 1 ? 'Item' : 'Items'}
                        </span>
                      </div>

                      <div className="checkout-items-scroll">
                        {cart.map((item) => (
                          <div className="checkout-item-row" key={`${item.product.id}-${item.color || ''}`}>
                            <img src={getCardImage(item.product)} alt={item.product.title} className="checkout-item-thumb" />
                            <div className="checkout-item-details">
                              <h4 className="checkout-item-name">{item.product.title}</h4>
                              {item.color && (
                                <div className="checkout-item-finish-pill">
                                  <span
                                    className="checkout-finish-dot"
                                    style={{ backgroundColor: item.color }}
                                  />
                                  <span>{getColorName(item.color)}</span>
                                </div>
                              )}
                              <div className="checkout-item-price-qty">
                                <div>
                                  <span className="checkout-unit-price">{item.product.price}</span>
                                  {item.product.price && item.product.price.includes('-') && (
                                    <span style={{ fontSize: '11px', color: '#c59d5f', fontWeight: 600, display: 'block' }}>
                                      (Pair Total: ₹{parsePrice(item.product.price).toLocaleString()})
                                    </span>
                                  )}
                                </div>
                                <div className="checkout-qty-stepper">
                                  <button
                                    type="button"
                                    className="checkout-stepper-btn"
                                    onClick={() => updateQuantity(item.product.id, item.color, -1)}
                                    title="Decrease"
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <span className="checkout-stepper-val">{item.quantity}</span>
                                  <button
                                    type="button"
                                    className="checkout-stepper-btn"
                                    onClick={() => updateQuantity(item.product.id, item.color, 1)}
                                    title="Increase"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="checkout-item-del-btn"
                              onClick={() => removeFromCart(item.product.id, item.color)}
                              title="Remove Item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="checkout-pricing-box">
                        <div className="checkout-price-row">
                          <span className="price-row-label">Estimated Subtotal:</span>
                          <strong className="checkout-total-val">₹{getCartTotal().toLocaleString()}</strong>
                        </div>
                        <div className="checkout-price-row muted">
                          <span className="price-row-label">Export Packaging:</span>
                          <span className="free-badge">COMPLIMENTARY</span>
                        </div>
                        <div className="checkout-price-row muted">
                          <span className="price-row-label">Incoterms:</span>
                          <span className="trade-term-badge">{checkoutForm.tradeTerm ? checkoutForm.tradeTerm.split(' - ')[0] : 'FOB'}</span>
                        </div>
                        <div className="checkout-price-row muted">
                          <span className="price-row-label">Freight &amp; Insurance:</span>
                          <span>Calculated on Quote</span>
                        </div>
                      </div>

                      <div className="checkout-trade-assurance">
                        <Award size={18} className="assurance-icon" />
                        <div className="assurance-text">
                          <strong>EPCH Registered Manufacturer Exporter</strong>
                          <p>RCMC #28272 • 100% Quality Inspected Aluminium</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Checkout Form Card */}
                    <div className="checkout-form-card">
                      <form onSubmit={submitOrder} className="checkout-inner-form">
                        {/* Step 1 */}
                        <div className="form-step-block">
                          <div className="form-step-header">
                            <span className="form-step-badge">1</span>
                            <h4 className="form-step-title">Buyer &amp; Organization Credentials</h4>
                          </div>

                          <div className="checkout-fields-grid">
                            <div className="checkout-field-group">
                              <label className="checkout-label">Full Name <span className="req">*</span></label>
                              <input
                                type="text"
                                required
                                className="checkout-input"
                                placeholder="Your full name"
                                value={checkoutForm.name}
                                onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                              />
                            </div>

                            <div className="checkout-field-group">
                              <label className="checkout-label">Company / Brand</label>
                              <input
                                type="text"
                                className="checkout-input"
                                placeholder="Company or brand name"
                                value={checkoutForm.company}
                                onChange={(e) => setCheckoutForm({ ...checkoutForm, company: e.target.value })}
                              />
                            </div>

                            <div className="checkout-field-group">
                              <label className="checkout-label">WhatsApp / Phone <span className="req">*</span></label>
                              <input
                                type="tel"
                                required
                                className="checkout-input"
                                placeholder="+91 / Country code &amp; number"
                                value={checkoutForm.phone}
                                onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                              />
                            </div>

                            <div className="checkout-field-group">
                              <label className="checkout-label">Business Email <span className="req">*</span></label>
                              <input
                                type="email"
                                required
                                className="checkout-input"
                                placeholder="name@company.com"
                                value={checkoutForm.email}
                                onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="form-step-block">
                          <div className="form-step-header">
                            <span className="form-step-badge">2</span>
                            <h4 className="form-step-title">Consignment &amp; Logistics</h4>
                          </div>

                          <div className="checkout-fields-grid">
                            <div className="checkout-field-group full-width">
                              <label className="checkout-label">Destination Address / Port</label>
                              <input
                                type="text"
                                className="checkout-input"
                                placeholder="Destination port or delivery warehouse address"
                                value={checkoutForm.address}
                                onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                              />
                            </div>

                            <div className="checkout-field-group">
                              <label className="checkout-label">City, State / ZIP Code</label>
                              <input
                                type="text"
                                className="checkout-input"
                                placeholder="City, Country / ZIP"
                                value={checkoutForm.city}
                                onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                              />
                            </div>

                            <div className="checkout-field-group">
                              <label className="checkout-label">International Trade Terms</label>
                              <div className="checkout-select-wrap">
                                <select
                                  className="checkout-input checkout-select"
                                  value={checkoutForm.tradeTerm}
                                  onChange={(e) => setCheckoutForm({ ...checkoutForm, tradeTerm: e.target.value })}
                                >
                                  <option value="FOB - Port of Origin (Mundra/Nhava Sheva)">FOB - Port of Origin (Sea Cargo)</option>
                                  <option value="CIF - Destination Port">CIF - Destination Port (Freight Paid)</option>
                                  <option value="DDP - Doorstep Delivery">DDP - Doorstep Delivery</option>
                                  <option value="Domestic Indian Freight (B2B GST)">Domestic Indian Delivery (GST)</option>
                                </select>
                              </div>
                            </div>

                            <div className="checkout-field-group full-width">
                              <label className="checkout-label">Special Customization / Packaging Notes</label>
                              <textarea
                                className="checkout-input checkout-textarea"
                                placeholder="Custom finish requirements, logo branding, sample orders, target timeline..."
                                value={checkoutForm.notes}
                                onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="checkout-actions-row">
                          <button
                            type="button"
                            className="checkout-btn-back"
                            onClick={() => {
                              setIsCheckoutModalOpen(false);
                              setIsCartOpen(true);
                            }}
                          >
                            ← Return to Cart
                          </button>
                          <button type="submit" className="checkout-btn-submit">
                            Confirm Order on WhatsApp →
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                /* Order Success Confirmation Screen */
                <div className="checkout-success-view">
                  <div className="checkout-success-icon-wrap">
                    <CheckCircle size={56} className="checkout-success-icon" />
                  </div>
                  <span className="checkout-success-badge">ORDER INQUIRY REGISTERED</span>
                  <h2 className="checkout-success-title">Thank You, {placedOrder.buyerName}!</h2>
                  <p className="checkout-success-desc">
                    Your trade order has been registered under Reference ID: <strong>{placedOrder.id}</strong>. Our export desk is preparing your formal Proforma Invoice.
                  </p>

                  <div className="checkout-success-summary-box">
                    <div className="checkout-success-header">
                      <span>Order Manifest ({placedOrder.items.length} {placedOrder.items.length === 1 ? 'item' : 'items'})</span>
                      <strong>{placedOrder.total}</strong>
                    </div>
                    <div className="checkout-success-items-list">
                      {placedOrder.items.map((it, idx) => (
                        <div key={idx} className="checkout-success-item">
                          <span className="success-item-name">{idx + 1}. {it.title} {it.color ? `(${getColorName(it.color)})` : ''}</span>
                          <strong className="success-item-qty">Qty: {it.quantity}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="checkout-success-actions">
                    <a
                      href={placedOrder.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="checkout-wa-direct-btn"
                    >
                      Open Order on WhatsApp (+91 98975 83968) →
                    </a>
                    <button
                      type="button"
                      className="checkout-continue-btn"
                      onClick={() => {
                        setIsCheckoutModalOpen(false);
                        setPlacedOrder(null);
                        setCurrentPage('collections');
                      }}
                    >
                      Continue Browsing Collections
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- DEDICATED PRODUCT ENQUIRY MODAL OVERLAY --- */}
        {isInquiryModalOpen && inquiryModalProduct && (
          <div className="inquiry-modal-overlay" onClick={() => setIsInquiryModalOpen(false)}>
            <div className="inquiry-modal-container" onClick={(e) => e.stopPropagation()}>
              <button
                className="inquiry-modal-close"
                onClick={() => setIsInquiryModalOpen(false)}
                title="Close Inquiry"
              >
                <X size={18} />
              </button>

              {!inquirySubmitted ? (
                <>
                  <div className="inquiry-modal-header">
                    <div className="checkout-header-badge">
                      <ShieldCheck size={13} />
                      <span>B2B EXPORT INQUIRY • MORADABAD FOUNDRY</span>
                    </div>
                    <h2 className="inquiry-modal-title">Product Inquiry &amp; Custom Quote</h2>
                    <p className="inquiry-modal-subtitle">
                      Inquire about bulk wholesale pricing, custom finishes, logo branding, and export packaging for this piece.
                    </p>
                  </div>

                  {/* Product Mini Preview Card */}
                  <div className="inquiry-product-preview-card">
                    <img
                      src={getCardImage(inquiryModalProduct)}
                      alt={inquiryModalProduct.title}
                      className="inquiry-product-thumb"
                    />
                    <div className="inquiry-product-info">
                      <span className="inquiry-product-cat">{inquiryModalProduct.category || 'Aluminium Metalware'}</span>
                      <h4 className="inquiry-product-name">{inquiryModalProduct.title}</h4>
                      <div className="inquiry-product-meta">
                        <span className="inquiry-product-price">{inquiryModalProduct.price}</span>
                        {inquiryModalProduct.colors && inquiryModalProduct.colors.length > 0 && (
                          <span className="inquiry-finishes-count">
                            {inquiryModalProduct.colors.length} Available Finishes
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleInquiryModalSubmit} className="inquiry-modal-form">
                    <div className="inquiry-fields-grid">
                      <div className="inquiry-field-group">
                        <label className="inquiry-label">Full Name <span className="req">*</span></label>
                        <input
                          type="text"
                          required
                          className="inquiry-input"
                          placeholder="Your full name"
                          value={inquiryForm.name}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        />
                      </div>

                      <div className="inquiry-field-group">
                        <label className="inquiry-label">Company / Brand</label>
                        <input
                          type="text"
                          className="inquiry-input"
                          placeholder="Company or brand name"
                          value={inquiryForm.company || ''}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                        />
                      </div>

                      <div className="inquiry-field-group">
                        <label className="inquiry-label">WhatsApp / Phone <span className="req">*</span></label>
                        <input
                          type="tel"
                          required
                          className="inquiry-input"
                          placeholder="+91 / Country code &amp; number"
                          value={inquiryForm.phone}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        />
                      </div>

                      <div className="inquiry-field-group">
                        <label className="inquiry-label">Business Email <span className="req">*</span></label>
                        <input
                          type="email"
                          required
                          className="inquiry-input"
                          placeholder="name@company.com"
                          value={inquiryForm.email}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        />
                      </div>

                      <div className="inquiry-field-group">
                        <label className="inquiry-label">Estimated Quantity (Units)</label>
                        <input
                          type="text"
                          className="inquiry-input"
                          placeholder="e.g. 50, 100, 250, 500+"
                          value={inquiryForm.quantity}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, quantity: e.target.value })}
                        />
                      </div>

                      <div className="inquiry-field-group">
                        <label className="inquiry-label">Preferred Finish / Specification</label>
                        <input
                          type="text"
                          className="inquiry-input"
                          placeholder="e.g. Antique Gold, Matte Black, Custom"
                          value={inquiryForm.finish || ''}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, finish: e.target.value })}
                        />
                      </div>

                      <div className="inquiry-field-group full-width">
                        <label className="inquiry-label">Requirement Details / Message</label>
                        <textarea
                          className="inquiry-input inquiry-textarea"
                          placeholder="Please provide details about custom finishes, branding, target port, delivery timeline..."
                          value={inquiryForm.message}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="inquiry-actions-row">
                      <button
                        type="button"
                        className="inquiry-btn-wa"
                        onClick={handleInquiryWhatsAppDirect}
                      >
                        Inquire on WhatsApp (+91 98975 83968) →
                      </button>
                      <button type="submit" className="inquiry-btn-submit">
                        Submit Inquiry
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="inquiry-success-view">
                  <CheckCircle size={52} className="inquiry-success-icon" />
                  <h3 className="inquiry-success-title">Inquiry Submitted Successfully!</h3>
                  <p className="inquiry-success-desc">
                    Thank you for your interest in <strong>{inquiryModalProduct.title}</strong>. Our Moradabad export desk will contact you within 24 business hours with FOB/CIF trade pricing.
                  </p>
                  <div className="inquiry-success-actions">
                    <button
                      type="button"
                      className="inquiry-btn-wa"
                      onClick={handleInquiryWhatsAppDirect}
                    >
                      Connect on WhatsApp Now (+91 98975 83968) →
                    </button>
                    <button
                      type="button"
                      className="inquiry-btn-close"
                      onClick={() => {
                        setIsInquiryModalOpen(false);
                        setInquirySubmitted(false);
                      }}
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* --- FLOATING WHATSAPP CTA BUTTON --- */}
      <a
        href="https://wa.me/919897583968"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        title="Chat with us on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="whatsapp-icon"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.485 2.031 7.788L0 32l8.418-2.009A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.26 13.26 0 01-6.766-1.853l-.485-.288-5.003 1.195 1.237-4.872-.317-.5A13.245 13.245 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667c7.364 0 13.333 5.969 13.333 13.333S23.364 29.333 16 29.333zm7.306-9.981c-.4-.2-2.368-1.169-2.734-1.303-.367-.133-.634-.2-.9.2-.267.4-1.034 1.303-1.267 1.57-.233.267-.467.3-.867.1-.4-.2-1.688-.623-3.215-1.984-1.188-1.06-1.99-2.37-2.223-2.77-.233-.4-.025-.616.175-.816.18-.179.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.17-1.234-2.97-.325-.78-.655-.674-.9-.686-.233-.012-.5-.015-.767-.015a1.47 1.47 0 00-1.067.5c-.367.4-1.4 1.369-1.4 3.338 0 1.969 1.434 3.875 1.634 4.143.2.267 2.822 4.308 6.836 6.038.955.413 1.7.659 2.281.844.958.305 1.831.262 2.52.159.769-.114 2.368-.969 2.702-1.904.333-.934.333-1.735.233-1.903-.1-.167-.367-.267-.767-.467z" />
        </svg>
        <span className="whatsapp-float-label">Chat with us</span>
      </a>
    </div>
  );
}

// --- IN-MODAL ZOOMABLE IMAGE COMPONENT ---
function InModalZoomImage({ src, alt }) {
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const touchRef = useRef({
    dist: 0, scale: 1,
    startX: 0, startY: 0,
    isPinching: false,
  });
  const mouseRef = useRef({ startX: 0, startY: 0 });

  const reset = () => { setScale(1); setTranslateX(0); setTranslateY(0); };

  /* --- Touch pinch-to-zoom + pan --- */
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0], t2 = e.touches[1];
      touchRef.current = {
        dist: Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY),
        scale, startX: 0, startY: 0, isPinching: true,
      };
    } else if (e.touches.length === 1) {
      const t = e.touches[0];
      touchRef.current = { startX: t.clientX - translateX, startY: t.clientY - translateY, isPinching: false };
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2 && touchRef.current.isPinching) {
      e.preventDefault();
      const t1 = e.touches[0], t2 = e.touches[1];
      const newDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const newScale = Math.min(Math.max((newDist / touchRef.current.dist) * touchRef.current.scale, 1), 5);
      setScale(newScale);
    } else if (e.touches.length === 1 && !touchRef.current.isPinching && scale > 1) {
      const t = e.touches[0];
      setTranslateX(t.clientX - touchRef.current.startX);
      setTranslateY(t.clientY - touchRef.current.startY);
    }
  };

  const onTouchEnd = () => {
    touchRef.current.isPinching = false;
    if (scale < 1) reset();
  };

  /* --- Mouse drag pan (desktop) --- */
  const onMouseDown = (e) => {
    if (e.button !== 0 || scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    mouseRef.current = { startX: e.clientX - translateX, startY: e.clientY - translateY };
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    setTranslateX(e.clientX - mouseRef.current.startX);
    setTranslateY(e.clientY - mouseRef.current.startY);
  };
  const onMouseUp = () => setIsDragging(false);

  /* --- Wheel zoom (desktop) --- */
  const onWheel = (e) => {
    e.preventDefault();
    const next = Math.min(Math.max(scale - e.deltaY * 0.005, 1), 5);
    if (next === 1) reset(); else setScale(next);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.addEventListener('wheel', onWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', onWheel); };
  }, [scale]);

  /* Double-tap / double-click to toggle zoom */
  const onDoubleClick = (e) => {
    e.stopPropagation();
    if (scale > 1) { reset(); return; }
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    imgRef.current.style.transformOrigin = `${px}% ${py}%`;
    setScale(2.5);
  };

  return (
    <div
      ref={containerRef}
      className="inmz-container"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onDoubleClick={onDoubleClick}
      style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="inmz-img"
        draggable="false"
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          transition: isDragging || touchRef.current.isPinching ? 'none' : 'transform 0.18s ease-out',
        }}
      />
      {scale === 1 && (
        <p className="inmz-hint">Pinch or scroll to zoom • Drag to pan • Double-tap to zoom</p>
      )}
    </div>
  );
}

export default App;
