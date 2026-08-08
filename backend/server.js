const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const collections = [
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
    id: "23",
    title: "Handcrafted Metallic Big Ben Clock Tower Replica",
    image: "/uploads/big_ben_clock_tower_sculpture.png",
    images: [
      "/uploads/big_ben_clock_tower_sculpture.png",
      "/uploads/big_ben_clock_tower_sculpture_specs.png"
    ],
    category: "Home Décor",
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
    id: "31",
    title: "Handcrafted Chain-Link Border Brass Accent Tray",
    image: "/uploads/chain_link_border_brass_tray.png",
    images: [
      "/uploads/chain_link_border_brass_tray.png",
      "/uploads/chain_link_border_brass_tray_specs.png"
    ],
    category: "Hospitality, Utility",
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

app.get('/api/collections', (req, res) => {
  res.json(collections);
});

// Inquiry Submission Endpoint (B2B)
app.post('/api/inquiry', (req, res) => {
  const { name, email, phone, product, quantity, message } = req.body;
  console.log(`New B2B Inquiry Received:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${quantity}\nMessage: ${message}`);
  res.json({ success: true, message: "Thank you for your enquiry. We will get in touch with you shortly." });
});

// B2B Cart Order Submission Endpoint
app.post('/api/orders', (req, res) => {
  const fs = require('fs');
  const order = {
    id: 'ORD-' + Date.now(),
    date: new Date().toISOString(),
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
