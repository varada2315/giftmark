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
    id: "01",
    title: "Filigree Brass Serving Tray",
    image: "/uploads/brass_tray_bowls.png",
    category: "Home Décor",
    price: "₹6,500 / $80",
    description: "Intricately detailed serving tray featuring traditional Indian hand-filigree patterns."
  },
  {
    id: "02",
    title: "Ornate Brass Candle Holder Set",
    image: "/uploads/metal_sculptures.png",
    category: "Home Décor",
    price: "₹4,800 / $60",
    description: "Classic metallic accents that combine traditional craftsmanship with modern design."
  },
  {
    id: "03",
    title: "Astrolabe Armillary Sphere",
    image: "/uploads/brass_globes.png",
    category: "Home Décor",
    price: "₹12,500 / $150",
    description: "A signature brass marine instrument evoking global exports and historical detail."
  },
  {
    id: "04",
    title: "Luxury Brass Chafing Dish",
    image: "/uploads/catering_essential.png",
    category: "Hospitality",
    price: "₹18,500 / $225",
    description: "Chafing dish and serving ware crafted for luxury hotels, catering, and restaurants."
  },
  {
    id: "05",
    title: "Polished Brass Fruit Bowl",
    image: "/uploads/brass_tray_bowls.png",
    category: "Hospitality",
    price: "₹3,900 / $48",
    description: "Decorative and functional hammered brass bowl with traditional scalloped rim."
  },
  {
    id: "06",
    title: "Classic Distressed Sideboard",
    image: "/uploads/restored_classics.png",
    category: "Hospitality",
    price: "₹45,000 / $550",
    description: "Rustic wooden sideboard highlighting copper accents and custom metal hardware."
  },
  {
    id: "07",
    title: "Ornate Gilded Mantle Clock",
    image: "/uploads/brass_clocks.png",
    category: "Giftware",
    price: "₹15,000 / $185",
    description: "Gilded pendulum mantle clock designed for premium corporate gifting and heritage decor."
  },
  {
    id: "08",
    title: "Hand-Hammered Copper Kettle",
    image: "/uploads/brass_vessels.png",
    category: "Giftware",
    price: "₹5,200 / $65",
    description: "Weathered brass and copper tea kettle showcasing rich hand-hammered textures."
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
