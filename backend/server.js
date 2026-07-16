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
