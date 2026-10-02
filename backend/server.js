require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_live_TfTo29IBTbPMsg';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'ufsU97an9eMEWB2J9uHSoN81';

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET
});

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

const uploadsDirectory = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory, { recursive: true });
}

app.use('/uploads', express.static(uploadsDirectory));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    cb(null, `${baseName}_${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB per file
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WEBP, GIF, SVG) are allowed!'), false);
    }
  }
});

const collections = [
  {
    id: "38",
    title: "Handcrafted Multi-Metallic Chevron Leaf Platter",
    image: "/uploads/multi_metallic_chevron_leaf_platter.jpg",
    images: [
      "/uploads/multi_metallic_chevron_leaf_platter.jpg",
      "/uploads/multi_metallic_chevron_leaf_platter_specs.jpg"
    ],
    category: "Hospitality",
    price: "₹500",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],
    dimensions: {
      height: '7 cm (3")',
      diameter: '19 cm (8")',
      pendi: 'Length 48 cm (19")'
    },
    description: "Handcrafted leaf-shaped serving platter featuring alternating tri-color chevron bands in brushed silver, antique gold, and copper. Displayed on a scrollwork stand, ideal for luxury hotel dining and catering accents."
  },
  {
    id: "31",
    title: "Handcrafted Chain-Link Border Brass Accent Tray",
    image: "/uploads/chain_link_border_brass_tray.png",
    images: [
      "/uploads/chain_link_border_brass_tray.png",
      "/uploads/chain_link_border_brass_tray_specs.png"
    ],
    category: "Utility",
    price: "₹1,820 / $22",
    dimensions: {
      height: '5 cm (2.0")',
      diameter: '40 cm (15.7")',
      pendi: 'Length 40 cm (15.7")'
    },
    description: "Handcrafted square accent tray featuring a deeply textured antique burnished gold center basin framed by a bold cast chain-link border on all four sides."
  },
  {
    id: "12",
    title: "Handcrafted Perforated Copper & Brass Platter",
    image: "/uploads/perforated_metal_platter.png",
    images: [
      "/uploads/perforated_metal_platter.png",
      "/uploads/perforated_metal_platter_specs.png"
    ],
    category: "Giftware",
    price: "₹8,500 / $105",
    dimensions: {
      height: '8 cm (3.1")',
      diameter: '33 cm (13")',
      pendi: 'Length 33 cm (13")'
    },
    description: "Decorative multi-tone scalloped platter featuring hand-perforated cutouts, two-tone copper and brass sectors, and a textured silver center on an ornate stand."
  },
  {
    id: "23",
    title: "Handcrafted Metallic Big Ben Clock Tower Replica",
    image: "/uploads/big_ben_living_room.jpg",
    images: [
      "/uploads/big_ben_living_room.jpg",
      "/uploads/big_ben_clock_tower_sculpture.png",
      "/uploads/big_ben_clock_tower_sculpture_specs.png"
    ],
    category: "Home Décor",
    price: "₹2,700 / $33",
    dimensions: {
      height: '36 cm (14.2")',
      diameter: '9 cm (3.5")',
      pendi: 'Detailed Stonework Base'
    },
    description: "Detailed antique silver metallic replica of London's iconic Big Ben clock tower, featuring hand-textured stonework facade and clock dial."
  },
  {
    id: "32",
    title: "Handcrafted Teal & Copper Octagonal Serving Tray Set",
    image: "/uploads/teal_copper_octagonal_tray_set.png",
    images: [
      "/uploads/teal_copper_octagonal_tray_set.png",
      "/uploads/teal_copper_octagonal_tray_set_specs.png"
    ],
    category: "Hospitality",
    price: "₹620 - ₹850 / $8 - $10",
    dimensions: {
      height: '3 cm (1.2")',
      diameter: '18 cm - 20 cm (7.1" - 7.9")',
      pendi: 'Length 34 cm - 40 cm (13.4" - 15.7")'
    },
    description: "Handcrafted rectangular octagonal-corner serving tray set featuring a raw copper/rust exterior and a dramatic teal-green abstract terrain-map interior basin with organic cutouts. Available in Big (40×20cm) and Small (34×18cm) sizes."
  },
  {
    id: "33",
    title: "Handcrafted Crescent Metallic Pedestal Bowl",
    image: "/uploads/crescent_metallic_pedestal_bowl.png",
    images: [
      "/uploads/crescent_metallic_pedestal_bowl.png",
      "/uploads/crescent_metallic_pedestal_bowl_specs.png"
    ],
    category: "Hospitality",
    price: "₹1,220 / $15",
    dimensions: {
      height: '10 cm (3.9")',
      diameter: '29 cm (11.4")',
      pendi: 'Length 37 cm (14.6")'
    },
    description: "Artisanal crescent-shaped decorative serving bowl crafted in textured antiqued bronze copper with a slotted comb-tooth rim mounted on a heavy flared pedestal base."
  },

  {
    id: "11",
    title: "Ornate Vintage Copper & Brass Urn",
    image: "/uploads/vintage_brass_urn.png",
    images: [
      "/uploads/vintage_brass_urn.png",
      "/uploads/vintage_brass_urn_specs.png"
    ],
    category: "Giftware",
    price: "₹18,500 / $225",
    dimensions: {
      height: '90 cm (35.4")',
      diameter: '36 cm (14.2")',
      pendi: '36 cm (14.2")'
    },
    description: "Traditional handcrafted copper urn vessel with finial lid, rich filigree detailing, and rustic aged finish."
  },
  {
    id: "13",
    title: "Handcrafted Square Copper & Brass Accent Platter",
    image: "/uploads/square_copper_brass_tray.png",
    images: [
      "/uploads/square_copper_brass_tray.png",
      "/uploads/square_copper_brass_tray_specs.png"
    ],
    category: "Giftware",
    price: "₹6,800 / $85",
    dimensions: {
      height: '4 cm (1.6")',
      diameter: '25 cm (9.8")',
      pendi: 'Length 25 cm (9.8")'
    },
    description: "Handcrafted square decorative tray featuring a textured copper center basin, distressed antique brass border with corner motifs, and ornate metal display stand."
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
    price: "₹1,350 - ₹2,350 / $16 - $28",
    dimensions: {
      height: '50 cm - 65 cm (19.7" - 25.6")',
      diameter: '21 cm - 23 cm (8.3" - 9.1")',
      pendi: 'Top Dia 16 cm (6.3")'
    },
    description: "Handcrafted sculptural metallic floor vase set featuring spiraling copper leaf necks, hammered brass mid-accents, and textured silver bases. Available in Big (65cm) and Small (50cm) sizes."
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
    price: "₹1,800 / $22",
    dimensions: {
      height: '58 cm (22.8")',
      diameter: '32 cm (12.6")',
      pendi: 'Base 34 cm (13.4")'
    },
    description: "Artisanal dual leaf tabletop sculpture featuring hand-carved copper and gold leaves mounted on a heavy textured silver pedestal base."
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
    price: "₹620 - ₹1,000 / $8 - $12",
    dimensions: {
      height: '47 cm - 58 cm (18.5" - 22.8")',
      diameter: '13 cm - 18 cm (5.1" - 7.1")',
      pendi: 'Square Silver Pedestal'
    },
    description: "Artisanal cut-out metallic leaf sculpture set featuring hand-embossed two-tone copper and gold leaf silhouettes mounted on silver square pedestals. Available in Big (58cm) and Small (47cm) sizes."
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
    price: "₹400 - ₹800 / $5 - $10",
    dimensions: {
      height: '30 cm - 50 cm (11.8" - 19.7")',
      diameter: '12 cm - 21 cm (4.7" - 8.3")',
      pendi: 'Base 9 cm - 12 cm (3.5" - 4.7")'
    },
    description: "Abstract geometric faceted metallic sculpture set in copper, antique gold, and silver finishes. Available in Large (50cm), Medium (38cm), and Small (30cm) sizes."
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
    price: "₹550 / $7",
    dimensions: {
      height: '33 cm (13")',
      diameter: '30 cm (11.8")',
      pendi: 'Antique Dome Base'
    },
    description: "Artisanal circular tabletop sculpture featuring a pair of copper lovebirds perched on silver branches enclosed within a distressed gold circular ring."
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
    price: "₹1,350 - ₹1,590 / $16 - $19",
    dimensions: {
      height: '57 cm - 68 cm (22.4" - 26.8")',
      diameter: '31 cm - 38 cm (12.2" - 15")',
      pendi: 'Base 19 cm (7.5")'
    },
    description: "Sculptural metallic tabletop art set featuring copper circular frames with gold hand-textured horizon landscapes mounted on tiered silver conical pedestals. Available in Big (68cm) and Small (57cm) sizes."
  },
  {
    id: "20",
    title: "Sculptural Two-Tone Metallic Leaf Accent Vases",
    image: "/uploads/sculptural_leaf_accent_vases.png",
    images: [
      "/uploads/sculptural_leaf_accent_vases.png",
      "/uploads/sculptural_leaf_accent_vases_specs.png"
    ],
    category: "Home Décor",
    price: "₹800 - ₹1,350 / $10 - $16",
    dimensions: {
      height: '29 cm - 37 cm (11.4" - 14.6")',
      diameter: '20 cm - 25 cm (7.9" - 9.8")',
      pendi: 'Top 4 cm - 5 cm (1.6" - 2")'
    },
    description: "Artisanal leaf-silhouette vase pair featuring two-tone split finishes in antiqued copper and oxidized silver ribbed textures. Available in Big (37cm) and Small (29cm) sizes."
  },
  {
    id: "21",
    title: "Handcrafted Spherical Etched Metallic Vase Set",
    image: "/uploads/spherical_etched_metallic_vases.png",
    images: [
      "/uploads/spherical_etched_metallic_vases.png",
      "/uploads/spherical_etched_metallic_vases_specs.png"
    ],
    category: "Home Décor",
    price: "₹600 - ₹800 / $7 - $10",
    dimensions: {
      height: '23 cm - 28 cm (9.1" - 11.0")',
      diameter: '26 cm (10.2")',
      pendi: 'Etched Linear Finish'
    },
    description: "Spherical metallic tabletop vase pair featuring fine vertical etched linear textures and a two-tone copper to antique gold ombre gradient finish. Available in Big (28cm) and Small (23cm) sizes."
  },
  {
    id: "22",
    title: "Handcrafted Surrealist Metallic Head Sculpture",
    image: "/uploads/surrealist_metallic_head_sculpture.png",
    images: [
      "/uploads/surrealist_metallic_head_sculpture.png",
      "/uploads/surrealist_metallic_head_sculpture_specs.png"
    ],
    category: "Home Décor",
    price: "₹1,250 / $15",
    dimensions: {
      height: '54 cm (21.2")',
      diameter: '19 cm (7.5")',
      pendi: 'Turned Copper Pedestal'
    },
    description: "Surrealist tabletop bust sculpture featuring a copper hand covering a textured gold face, mounted on an antiqued turned copper pedestal stand."
  },
  {
    id: "24",
    title: "Handcrafted Spiral Flame Metallic Sculpture Set",
    image: "/uploads/spiral_flame_metallic_sculptures.png",
    images: [
      "/uploads/spiral_flame_metallic_sculptures.png",
      "/uploads/spiral_flame_metallic_sculptures_specs.png"
    ],
    category: "Home Décor",
    price: "₹1,300 - ₹1,560 / $16 - $19",
    dimensions: {
      height: '65 cm - 74 cm (25.6" - 29.1")',
      diameter: '24 cm - 28 cm (9.4" - 11.0")',
      pendi: 'Conical Brass Pedestal'
    },
    description: "Artisanal metallic tabletop sculpture set featuring spiral nautilus gold bases and textured copper flame crests mounted on conical brass pedestals. Available in Big (74cm) and Small (65cm) sizes."
  },
  {
    id: "25",
    title: "Handcrafted Avant-Garde Metallic Mask Sculpture",
    image: "/uploads/abstract_metallic_mask_sculpture.png",
    images: [
      "/uploads/abstract_metallic_mask_sculpture.png",
      "/uploads/abstract_metallic_mask_sculpture_specs.png"
    ],
    category: "Home Décor",
    price: "₹810 / $10",
    dimensions: {
      height: '51 cm (20.1")',
      diameter: '22 cm (8.7")',
      pendi: 'Textured Brass Pedestal'
    },
    description: "Avant-garde tabletop mask sculpture crafted in textured gold brass with openwork features and crowned with a tri-color metallic leaf emblem."
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
    price: "₹850 / $10",
    dimensions: {
      height: '46 cm (18.1")',
      diameter: '13 cm (5.1")',
      pendi: 'Silver Pewter Pedestal'
    },
    description: "Artisanal metallic feather tabletop sculpture featuring a split copper and antiqued gold textured quill mounted on a brushed silver pedestal base."
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
    image: "/uploads/abstract_flame_metallic_sculpture.png",
    images: [
      "/uploads/abstract_flame_metallic_sculpture.png",
      "/uploads/abstract_flame_metallic_sculpture_specs.png"
    ],
    category: "Home Décor",
    price: "₹1,540 / $19",
    dimensions: {
      height: '56 cm (22.0")',
      diameter: '36 cm (14.2")',
      pendi: 'Gold Oval Pedestal'
    },
    description: "Artisanal abstract metallic tabletop sculpture featuring sweeping copper flame tendrils cradled within a brushed gold crescent shell."
  },
  {
    id: "29",
    title: "Handcrafted 3-Tier Multi-Metallic Serving Stand",
    image: "/uploads/three_tier_metallic_serving_stand.png",
    images: [
      "/uploads/three_tier_metallic_serving_stand.png",
      "/uploads/three_tier_metallic_serving_stand_specs.png"
    ],
    category: "Hospitality, Utility",
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
    image: "/uploads/chevron_metallic_accent_platter.png",
    images: [
      "/uploads/chevron_metallic_accent_platter.png",
      "/uploads/chevron_metallic_accent_platter_specs.png"
    ],
    category: "Hospitality, Utility",
    price: "₹1,350 - ₹1,550 / $16 - $19",
    dimensions: {
      height: '6 cm - 7 cm (2.4" - 2.8")',
      diameter: '34 cm - 40 cm (13.4" - 15.7")',
      pendi: 'Square Contour Base'
    },
    description: "Handcrafted square metallic serving platter featuring alternating dual-tone silver and brushed gold chevron textured bands. Displayed on a copper scrollwork stand, available in Big (40cm) and Small (34cm) sizes."
  },
  {
    id: "34",
    title: "Handcrafted Corrugated Wave Metallic Platter",
    image: "/uploads/corrugated_wave_metallic_platter.png",
    images: [
      "/uploads/corrugated_wave_metallic_platter.png",
      "/uploads/corrugated_wave_metallic_platter_specs.png"
    ],
    category: "Hospitality, Utility",
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
    title: "Handcrafted Ruffled Copper Wave Bowl",
    image: "/uploads/ruffled_copper_bowl.jpg",
    images: [
      "/uploads/ruffled_copper_bowl.jpg",
      "/uploads/ruffled_copper_bowl_specs.jpg"
    ],
    category: "Hospitality",
    price: "₹1,100",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],
    dimensions: {
      height: '12 cm (5")',
      diameter: '28 cm (11")',
      pendi: 'Length 32 cm (13")'
    },
    description: "Artisanal hand-hammered ruffled wave bowl crafted in antique oxidized copper finish with undulating scalloped edges. A statement centrepiece ideal for luxury hotel buffets, catering displays, and fine dining tables. Available in Terracotta Red, Antique Gold, Beige, and Matte Black."
  },
  {
    id: "36",
    title: "Handcrafted Tri-Tone Metal Pedestal Accent Table",
    image: "/uploads/pedestal_accent_table.png",
    images: [
      "/uploads/pedestal_accent_table.png",
      "/uploads/pedestal_accent_table_specs.png"
    ],
    category: "Hospitality, Utility",
    price: "₹6,050 / $75",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],
    dimensions: {
      height: '91 cm (36")',
      diameter: 'Top 48 cm (19")',
      pendi: 'Tri-Pod Base'
    },
    description: "Handcrafted tri-tone metal pedestal accent side table featuring a round copper top, an intricately carved antique brass turned spindle central column, and a heavy textured silver tripod base with curved legs. Ideal for luxury hotel lounges, hospitality seating, and utility accent spaces."
  },
  {
    id: "37",
    title: "Handcrafted Ornate Oval Metallic Footed Platter Set",
    image: "/uploads/ornate_oval_metallic_platter_set.jpg",
    images: [
      "/uploads/ornate_oval_metallic_platter_set.jpg",
      "/uploads/ornate_oval_metallic_platter_set_specs.jpg"
    ],
    category: "Utility, Hospitality",
    price: "₹2,250 - ₹2,450",
    colors: ["#C0392B", "#D4A017", "#C2B280", "#2C2C2C"],
    dimensions: {
      height: '10 cm - 13 cm (4" - 5")',
      diameter: '33 cm - 36 cm (13" - 14")',
      pendi: 'Length 63 cm - 69 cm (21")'
    },
    description: "Handcrafted ornate oval serving platter set featuring filigree embossed basins, cast decorative handles, and sculpted claw-foot pedestal bases. Available in Big (69×36cm) and Small (63×33cm) sizes in copper and antique gold finishes."
  },
  {
    id: "39",
    title: "Handcrafted Dual-Tone Teal & Green Geometric Platter Set",
    image: "/uploads/teal_green_geometric_platter_set.jpg",
    images: [
      "/uploads/teal_green_geometric_platter_set.jpg",
      "/uploads/teal_green_geometric_platter_set_specs.png"
    ],
    category: "Giftware",
    price: "₹850 - ₹1,050",
    colors: ["#4E9F3D", "#1E759A", "#D4A017", "#2C2C2C"],
    dimensions: {
      height: '6 cm (2.4")',
      diameter: '15 cm - 19 cm (5.9" - 7.5")',
      pendi: 'Length 34 cm - 43 cm (13.4" - 16.9")'
    },
    description: "Handcrafted organic dual-tone decorative platter set featuring embossed geometric starburst textures in vibrant ocean teal and emerald green finishes. Displayed on copper scrollwork stands, available in Big (43×19cm) and Small (34×15cm) sizes."
  }
];

// File-based database storage for products
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// Initialize products.json if it does not exist
function initProductsFile() {
  try {
    if (!fs.existsSync(PRODUCTS_FILE)) {
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(collections, null, 2), 'utf8');
      console.log(`Initialized products.json with ${collections.length} initial items.`);
    }
  } catch (err) {
    console.error('Error initializing products.json:', err);
  }
}
initProductsFile();

function getProducts() {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const content = fs.readFileSync(PRODUCTS_FILE, 'utf8');
      const data = JSON.parse(content);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.error('Error reading products.json:', err);
  }
  return collections;
}

function saveProducts(productsList) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(productsList, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing to products.json:', err);
    return false;
  }
}

// -------------------------------------------------------------
// Image Upload Endpoint (Multer - Supports Multiple Files)
// -------------------------------------------------------------
app.post('/api/upload', (req, res) => {
  upload.array('images', 20)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message || 'File upload failed' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      url: `/uploads/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype
    }));

    const urls = uploadedFiles.map(f => f.url);

    res.json({
      success: true,
      message: `${uploadedFiles.length} file(s) uploaded successfully`,
      files: uploadedFiles,
      urls: urls
    });
  });
});

// -------------------------------------------------------------
// Product Management CRUD Endpoints
// -------------------------------------------------------------

// GET all products / collections
app.get(['/api/products', '/api/collections'], (req, res) => {
  try {
    const products = getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve products' });
  }
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const products = getProducts();
    const product = products.find(p => String(p.id) === String(req.params.id));
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve product' });
  }
});

// POST: Create a new product
app.post('/api/products', (req, res) => {
  try {
    const {
      title,
      category = 'Uncategorized',
      price,
      description = '',
      image,
      images = [],
      dimensions = {},
      colors = [],
      inStock = true
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Product title is required' });
    }
    if (!price || !price.toString().trim()) {
      return res.status(400).json({ success: false, message: 'Product price is required' });
    }

    const normalizedImages = Array.isArray(images) && images.length > 0 
      ? images 
      : (image ? [image] : []);

    const primaryImage = image || (normalizedImages.length > 0 ? normalizedImages[0] : '');

    const newProduct = {
      id: 'PROD-' + Date.now(),
      title: title.trim(),
      category: category.trim() || 'Handicrafts',
      price: price.toString().trim(),
      description: description.trim(),
      image: primaryImage,
      images: normalizedImages,
      dimensions: {
        height: dimensions.height || '',
        diameter: dimensions.diameter || '',
        pendi: dimensions.pendi || ''
      },
      colors: Array.isArray(colors) ? colors : [],
      inStock: inStock !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const products = getProducts();
    products.unshift(newProduct);

    if (!saveProducts(products)) {
      return res.status(500).json({ success: false, message: 'Failed to save product to storage' });
    }

    console.log(`New Product Created: ${newProduct.title} (ID: ${newProduct.id})`);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Internal server error while creating product' });
  }
});

// PUT: Update an existing product
app.put('/api/products/:id', (req, res) => {
  try {
    const productId = String(req.params.id);
    const products = getProducts();
    const index = products.findIndex(p => String(p.id) === productId);

    if (index === -1) {
      return res.status(404).json({ success: false, message: `Product with ID ${productId} not found` });
    }

    const existingProduct = products[index];
    const {
      title,
      category,
      price,
      description,
      image,
      images,
      dimensions,
      colors,
      inStock
    } = req.body;

    const updatedImages = images !== undefined 
      ? (Array.isArray(images) ? images : [images]) 
      : existingProduct.images;

    const updatedPrimaryImage = image !== undefined 
      ? image 
      : (updatedImages && updatedImages.length > 0 ? updatedImages[0] : existingProduct.image);

    const updatedProduct = {
      ...existingProduct,
      title: title !== undefined ? title.trim() : existingProduct.title,
      category: category !== undefined ? category.trim() : existingProduct.category,
      price: price !== undefined ? price.toString().trim() : existingProduct.price,
      description: description !== undefined ? description.trim() : existingProduct.description,
      image: updatedPrimaryImage,
      images: updatedImages,
      dimensions: dimensions !== undefined ? {
        height: dimensions.height !== undefined ? dimensions.height : (existingProduct.dimensions?.height || ''),
        diameter: dimensions.diameter !== undefined ? dimensions.diameter : (existingProduct.dimensions?.diameter || ''),
        pendi: dimensions.pendi !== undefined ? dimensions.pendi : (existingProduct.dimensions?.pendi || '')
      } : existingProduct.dimensions,
      colors: colors !== undefined ? (Array.isArray(colors) ? colors : []) : existingProduct.colors,
      inStock: inStock !== undefined ? Boolean(inStock) : existingProduct.inStock,
      updatedAt: new Date().toISOString()
    };

    products[index] = updatedProduct;

    if (!saveProducts(products)) {
      return res.status(500).json({ success: false, message: 'Failed to update product in storage' });
    }

    console.log(`Product Updated: ${updatedProduct.title} (ID: ${updatedProduct.id})`);
    res.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Internal server error while updating product' });
  }
});

// DELETE: Delete a product
app.delete('/api/products/:id', (req, res) => {
  try {
    const productId = String(req.params.id);
    const products = getProducts();
    const index = products.findIndex(p => String(p.id) === productId);

    if (index === -1) {
      return res.status(404).json({ success: false, message: `Product with ID ${productId} not found` });
    }

    const [deletedProduct] = products.splice(index, 1);

    if (!saveProducts(products)) {
      return res.status(500).json({ success: false, message: 'Failed to delete product from storage' });
    }

    console.log(`Product Deleted: ${deletedProduct.title} (ID: ${productId})`);
    res.json({
      success: true,
      message: 'Product deleted successfully',
      id: productId,
      deletedProduct
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Internal server error while deleting product' });
  }
});

// Inquiry Submission Endpoint (B2B)
app.post('/api/inquiry', (req, res) => {
  const { name, email, phone, product, quantity, message } = req.body;
  console.log(`New B2B Inquiry Received:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${quantity}\nMessage: ${message}`);
  res.json({ success: true, message: "Thank you for your enquiry. We will get in touch with you shortly." });
});

// B2B Cart Order Submission Endpoint (Offline / WhatsApp)
app.post('/api/orders', (req, res) => {
  const order = {
    id: 'ORD-' + Date.now(),
    date: new Date().toISOString(),
    status: 'INQUIRY_SUBMITTED',
    paymentMethod: 'WHATSAPP_INQUIRY',
    ...req.body
  };

  const ordersFile = path.join(__dirname, 'orders.json');
  let ordersList = [];

  if (fs.existsSync(ordersFile)) {
    try {
      ordersList = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
    } catch (e) {
      console.error("Error reading orders.json:", e);
    }
  }

  ordersList.push(order);
  fs.writeFileSync(ordersFile, JSON.stringify(ordersList, null, 2), 'utf8');

  console.log(`New B2B Order Inquiry saved: ${order.id}`);
  res.json({ success: true, orderId: order.id });
});

// Razorpay: Get Public Key ID
app.get('/api/payment/key', (req, res) => {
  res.json({ keyId: RAZORPAY_KEY_ID });
});

// Razorpay: Create Order Endpoint
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid payment amount' });
    }

    // Amount in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(numericAmount * 100);

    const options = {
      amount: amountInPaise,
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {}
    };

    const razorpayOrder = await razorpay.orders.create(options);

    console.log(`Razorpay Order created: ${razorpayOrder.id} for amount ₹${numericAmount}`);
    res.json({
      success: true,
      order: razorpayOrder,
      keyId: RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize payment gateway order',
      error: error.message || error
    });
  }
});

// Razorpay: Verify Payment Signature & Save Paid Order
app.post('/api/payment/verify', (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification credentials'
      });
    }

    // Verify HMAC-SHA256 signature
    const hmac = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      console.error(`Invalid payment signature for Razorpay Order ${razorpay_order_id}`);
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: Invalid transaction signature'
      });
    }

    // Payment signature is valid! Record order in orders.json
    const orderRecord = {
      id: 'ORD-' + Date.now(),
      date: new Date().toISOString(),
      status: 'PAID',
      paymentMethod: 'RAZORPAY',
      razorpay: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        verifiedAt: new Date().toISOString()
      },
      ...orderDetails
    };

    const ordersFile = path.join(__dirname, 'orders.json');
    let ordersList = [];

    if (fs.existsSync(ordersFile)) {
      try {
        ordersList = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
      } catch (e) {
        console.error("Error reading orders.json:", e);
      }
    }

    ordersList.push(orderRecord);
    fs.writeFileSync(ordersFile, JSON.stringify(ordersList, null, 2), 'utf8');

    console.log(`Razorpay Payment Verified & Order Confirmed: ${orderRecord.id} (Payment ID: ${razorpay_payment_id})`);

    res.json({
      success: true,
      message: 'Payment successfully verified and order confirmed',
      orderId: orderRecord.id,
      paymentId: razorpay_payment_id
    });
  } catch (error) {
    console.error('Error in payment verification:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during payment verification',
      error: error.message || error
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

