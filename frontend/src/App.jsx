import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Plus, Minus, Trash2, X } from 'lucide-react';
import './App.css';

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
    bgImage: "/uploads/brass_globes.png"
  },
  {
    name: "Brass Ganesha",
    subtitle: "HANDCRAFTED DEITY SCULPTURES",
    title: "SACRED\nBRASS ART",
    description: "Traditional Indian Ganesha deity sculptures cast in solid premium brass, featuring intricate hand-carved detailing and polished antique patinas.",
    mainLocalImage: "/uploads/brass_ganesha.png",
    bgColor: "#EFECE8",
    bgImage: "/uploads/story_workshop.png"
  },
  {
    name: "Brass Peacock Lamp",
    subtitle: "LUXURY DECORATIVE PIECES",
    title: "PRECISION\nGOLD & BRASS",
    description: "Elegantly sculpted peacock lamps and candelabras finished in satin brass gold, capturing centuries of artisanal metalcraft traditions.",
    mainLocalImage: "/uploads/brass_peacock_lamp.png",
    bgColor: "#EAECE6",
    bgImage: "/uploads/story_buffet.png"
  },
  {
    name: "Bronze Nataraja",
    subtitle: "AWARD-WINNING METALWORK",
    title: "CONTEMPORARY\nBRONZE DESIGN",
    description: "Intricately detailed antique bronze Nataraja sculpture representing the divine cosmic dance, finished with authentic weathered patinas.",
    mainLocalImage: "/uploads/bronze_nataraja.png",
    bgColor: "#EFEBE6",
    bgImage: "/uploads/story_sculpture_bust.png"
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

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'about', 'collections', 'contact'
  const [collections, setCollections] = useState(DEFAULT_COLLECTIONS);
  const [heroIndex, setHeroIndex] = useState(0);
  const [backendStatus, setBackendStatus] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  
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
    }, 5500);
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
              <span className="logo-main">GIFTMARK</span>
              <div className="logo-sub">
                <div className="logo-line"></div>
                <span className="logo-text">INDUSTRIES</span>
                <div className="logo-line"></div>
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
                <li>
                  <span 
                    className={`nav-link hover-underline ${currentPage === 'collections' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('collections')}
                  >
                    Collections
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
                  transition: 'background-color 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Dynamic Faded Background Image Overlay */}
                <div 
                  className="hero-bg-image-overlay"
                  style={{
                    backgroundImage: `url(${currentHeroSlide.bgImage})`,
                    transition: 'background-image 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
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
                <div className="global-presence-grid">
                  <div className="global-map-mock">
                    <div className="map-background"></div>
                    <div className="map-canvas-dots"></div>
                    <div className="map-node node-india" title="India HQ"></div>
                    <div className="map-node node-china" title="Canton Fair, China"></div>
                    <div className="map-node node-germany" title="Germany"></div>
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
                      We exhibit regularly at major trade forums, including the prestigious **Canton Fair in China**, and platforms across Germany, the UK, Singapore, USA, UAE, and major Indian cities.
                    </p>
                    <ul className="exhibition-list">
                      <li className="exhibition-tag">Canton Fair (China)</li>
                      <li className="exhibition-tag">Frankfurt (Germany)</li>
                      <li className="exhibition-tag">London (UK)</li>
                      <li className="exhibition-tag">Dubai (UAE)</li>
                      <li className="exhibition-tag">Delhi & Mumbai (India)</li>
                    </ul>
                  </div>
                </div>
              </section>
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
                    <span className="serif-font" style={{ fontSize: '24px', color: 'var(--color-accent-dark)' }}>MAS</span>
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
            </div>
          )}

          {/* --- COLLECTIONS PAGE --- */}
          {currentPage === 'collections' && (
            <div className="collections-page-section">
              <ul className="collections-filter-bar">
                {['All', 'Home Décor', 'Hospitality', 'Giftware'].map((filter) => (
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
                      <span className="detail-value" style={{ fontSize: '15px', color: 'var(--color-secondary)' }}>
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
                          onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
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
                          onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
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
                          onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
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
                          onChange={(e) => setInquiryForm({...inquiryForm, quantity: e.target.value})}
                        />
                      </div>
                      <div className="form-group full-width">
                        <label className="form-label">Product / Category Interest</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="E.g., Filigree Serving Tray" 
                          value={inquiryForm.product}
                          onChange={(e) => setInquiryForm({...inquiryForm, product: e.target.value})}
                        />
                      </div>
                      <div className="form-group full-width">
                        <label className="form-label">Inquiry Message</label>
                        <textarea 
                          required 
                          className="form-input" 
                          placeholder="Provide details about your custom requests or shipment destination." 
                          value={inquiryForm.message}
                          onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
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

          {/* --- FOOTER --- */}
          <footer className="footer">
            <div className="footer-top">
              <div className="logo-container" onClick={() => setCurrentPage('home')}>
                <span className="footer-logo">GIFTMARK INDUSTRIES</span>
              </div>
              <ul className="footer-nav">
                <li><span className="footer-link" onClick={() => setActiveLegal('privacy')}>Privacy Policy</span></li>
                <li><span className="footer-link" onClick={() => setActiveLegal('refund')}>Refund Policy</span></li>
                <li><span className="footer-link" onClick={() => setActiveLegal('terms')}>Terms of Service</span></li>
                <li><span className="footer-link" onClick={() => setActiveLegal('disclaimer')}>Disclaimer</span></li>
              </ul>
            </div>
            <div className="footer-bottom">
              <span>&copy; {new Date().getFullYear()} Giftmark Industries. All Rights Reserved. Estd 1993.</span>
              <span>Crafted in India. Exported Worldwide.</span>
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
                              onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input 
                              type="text" 
                              className="form-input" 
                              placeholder="Giftmark Industries" 
                              value={checkoutForm.company}
                              onChange={(e) => setCheckoutForm({...checkoutForm, company: e.target.value})}
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
                              onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input 
                              type="email" 
                              className="form-input" 
                              placeholder="buyer@domain.com" 
                              value={checkoutForm.email}
                              onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Special Trade Notes / Quantity Requirements</label>
                            <textarea 
                              className="form-input form-textarea" 
                              placeholder="E.g., request custom brass filigree engraving, customized gift packaging boxes, sea freight to Germany..." 
                              value={checkoutForm.notes}
                              onChange={(e) => setCheckoutForm({...checkoutForm, notes: e.target.value})}
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
