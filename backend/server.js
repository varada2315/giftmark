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
    title: "Handcrafted Teal & Aluminium Octagonal Serving Tray Set",
    image: "/uploads/teal_copper_octagonal_tray_set.png",
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
    images: [
      "/uploads/multi_metallic_chevron_leaf_platter_aesthetic.jpg",
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
    images: [
      "/uploads/ginkgo_leaf_platter_aesthetic.jpg",
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
    images: [
      "/uploads/deer_handle_patina_tray_set.jpg",
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
