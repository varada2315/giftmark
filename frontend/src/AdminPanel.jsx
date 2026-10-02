import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Package,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  Upload,
  X,
  Check,
  Lock,
  ArrowLeft,
  TrendingUp,
  BarChart2,
  ShoppingBag,
  Clock,
  Tag,
  Users,
  Megaphone,
  FileSpreadsheet,
  Settings,
  Sparkles,
  AlertCircle,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  Layers,
  Grid,
  List,
  Star,
  Sliders
} from 'lucide-react';
import './AdminPanel.css';

const DEFAULT_CATEGORIES = [
  'Hospitality',
  'Utility',
  'Giftware',
  'Home Décor',
  'Tableware',
  'Sculptures',
  'Handicrafts'
];

export default function AdminPanel({ onNavigateToStore, onProductUpdated }) {
  // Navigation State
  const [activeTab, setActiveTab] = useState('products'); // Only 'products' is functional
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Locked Upgrade Modal State
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [lockedFeatureName, setLockedFeatureName] = useState('');

  // Product Management State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price-low', 'price-high', 'name-asc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hospitality',
    customCategory: '',
    price: '',
    description: '',
    images: [],
    inStock: true,
    dimensions: {
      height: '',
      diameter: '',
      pendi: ''
    }
  });

  // Image Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && prev.id ? null : prev));
    }, 4000);
  };

  // Fetch Products from Backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/products');
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      showToast('Failed to load products from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Tab Navigation (Lock Check)
  const handleNavClick = (tabId, label) => {
    if (tabId === 'products') {
      setActiveTab('products');
    } else {
      setActiveTab(tabId);
      // We also trigger the Upgrade dialog context
      setLockedFeatureName(label);
    }
    setSidebarOpen(false);
  };

  const handleOpenUpgradeModal = (featureLabel) => {
    setLockedFeatureName(featureLabel || 'Advanced Admin Features');
    setShowUpgradeModal(true);
  };

  // Open Add Product Modal
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentProductId(null);
    setUploadError('');
    setFormData({
      title: '',
      category: DEFAULT_CATEGORIES[0],
      customCategory: '',
      price: '',
      description: '',
      images: [],
      inStock: true,
      dimensions: {
        height: '',
        diameter: '',
        pendi: ''
      }
    });
    setIsModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditModal = (product) => {
    setIsEditing(true);
    setCurrentProductId(product.id);
    setUploadError('');

    // Ensure images array is properly formatted
    let initialImages = [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      initialImages = [...product.images];
    } else if (product.image) {
      initialImages = [product.image];
    }

    const isCustomCat = !DEFAULT_CATEGORIES.includes(product.category);

    setFormData({
      title: product.title || '',
      category: isCustomCat ? 'Custom' : product.category || DEFAULT_CATEGORIES[0],
      customCategory: isCustomCat ? product.category : '',
      price: product.price || '',
      description: product.description || '',
      images: initialImages,
      inStock: product.inStock !== false,
      dimensions: {
        height: product.dimensions?.height || '',
        diameter: product.dimensions?.diameter || '',
        pendi: product.dimensions?.pendi || ''
      }
    });
    setIsModalOpen(true);
  };

  // Handle Image File Upload (Direct File Upload Interface)
  const handleImageFiles = async (files) => {
    if (!files || files.length === 0) return;

    setUploadError('');
    setIsUploading(true);

    const uploadFormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadFormData.append('images', files[i]);
    }

    try {
      const res = await axios.post('/api/upload', uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data && res.data.success && Array.isArray(res.data.urls)) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...res.data.urls]
        }));
        showToast(`${res.data.urls.length} image(s) uploaded successfully`);
      } else {
        setUploadError(res.data.message || 'Failed to upload images');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError(err.response?.data?.message || 'Error connecting to image upload service');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileInputChange = (e) => {
    handleImageFiles(e.target.files);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      handleImageFiles(e.dataTransfer.files);
    }
  };

  // Remove Image from Current Form
  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Make an image primary (move to index 0)
  const handleSetPrimaryImage = (indexToPrimary) => {
    setFormData((prev) => {
      const selected = prev.images[indexToPrimary];
      const rest = prev.images.filter((_, idx) => idx !== indexToPrimary);
      return {
        ...prev,
        images: [selected, ...rest]
      };
    });
    showToast('Cover image updated');
  };

  // Save / Update Product
  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast('Product title is required', 'error');
      return;
    }
    if (!formData.price.trim()) {
      showToast('Product price is required', 'error');
      return;
    }

    const resolvedCategory =
      formData.category === 'Custom'
        ? formData.customCategory.trim() || 'Handicrafts'
        : formData.category;

    const payload = {
      title: formData.title.trim(),
      category: resolvedCategory,
      price: formData.price.trim(),
      description: formData.description.trim(),
      images: formData.images,
      image: formData.images.length > 0 ? formData.images[0] : '',
      inStock: formData.inStock,
      dimensions: {
        height: formData.dimensions.height.trim(),
        diameter: formData.dimensions.diameter.trim(),
        pendi: formData.dimensions.pendi.trim()
      }
    };

    setIsSaving(true);
    try {
      if (isEditing && currentProductId) {
        const res = await axios.put(`/api/products/${currentProductId}`, payload);
        if (res.data && res.data.success) {
          showToast('Product updated successfully');
          setIsModalOpen(false);
          await fetchProducts();
          if (onProductUpdated) onProductUpdated();
        }
      } else {
        const res = await axios.post('/api/products', payload);
        if (res.data && res.data.success) {
          showToast('New product created successfully');
          setIsModalOpen(false);
          await fetchProducts();
          if (onProductUpdated) onProductUpdated();
        }
      }
    } catch (err) {
      console.error('Save product error:', err);
      showToast(err.response?.data?.message || 'Failed to save product', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async () => {
    if (!deleteConfirmProduct) return;
    try {
      const res = await axios.delete(`/api/products/${deleteConfirmProduct.id}`);
      if (res.data && res.data.success) {
        showToast(`"${deleteConfirmProduct.title}" deleted`);
        setDeleteConfirmProduct(null);
        await fetchProducts();
        if (onProductUpdated) onProductUpdated();
      }
    } catch (err) {
      console.error('Delete product error:', err);
      showToast(err.response?.data?.message || 'Failed to delete product', 'error');
    }
  };

  // Filter & Search Logic
  const allCategories = ['All', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      (product.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.price || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(product.id || '').includes(searchQuery);

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const parseNum = (str) => {
      if (!str) return 0;
      const num = String(str).replace(/[^0-9]/g, '');
      return parseInt(num, 10) || 0;
    };

    if (sortBy === 'price-low') {
      return parseNum(a.price) - parseNum(b.price);
    }
    if (sortBy === 'price-high') {
      return parseNum(b.price) - parseNum(a.price);
    }
    if (sortBy === 'name-asc') {
      return (a.title || '').localeCompare(b.title || '');
    }
    // newest / default
    return (b.id || '').localeCompare ? (b.id || '').localeCompare(a.id || '') : b.id - a.id;
  });

  // Calculate stats
  const totalInStock = products.filter((p) => p.inStock !== false).length;
  const totalImages = products.reduce(
    (acc, p) => acc + (Array.isArray(p.images) ? p.images.length : p.image ? 1 : 0),
    0
  );

  return (
    <div className="admin-wrapper">
      {/* Toast Notification */}
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="toast-close-btn">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Admin Header / Top Bar */}
      <header className="admin-topbar">
        <div className="topbar-left">
          <button
            className="mobile-menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Navigation"
          >
            <Sliders size={20} />
          </button>
          <div className="admin-brand">
            <div className="brand-logo-gem">
              <span>G</span>
            </div>
            <div>
              <h1 className="brand-title">Giftmark Studio</h1>
              <span className="brand-badge">Enterprise Admin</span>
            </div>
          </div>
        </div>

        <div className="topbar-actions">
          <div className="plan-status-pill" onClick={() => handleOpenUpgradeModal('Upgrade Plan')}>
            <span className="status-dot-pulse"></span>
            <span className="plan-name">Starter Plan</span>
            <span className="plan-upgrade-tag">Upgrade ⚡</span>
          </div>

          <button className="view-store-btn" onClick={onNavigateToStore} title="Open Live Storefront">
            <ArrowLeft size={16} />
            <span>Storefront</span>
          </button>
        </div>
      </header>

      <div className="admin-body">
        {/* Sidebar Navigation */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-section-label">Core Operations</div>
          <nav className="sidebar-nav">
            {/* Products (ONLY AVAILABLE FEATURE) */}
            <button
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => handleNavClick('products', 'Product Management')}
            >
              <div className="nav-item-icon-wrapper">
                <Package size={18} />
              </div>
              <span className="nav-item-label">Products</span>
              <span className="access-badge available-badge">Available</span>
            </button>
          </nav>

          <div className="sidebar-section-label">Analytics & Insights</div>
          <nav className="sidebar-nav">
            <button
              className={`nav-item locked-nav ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard', 'Executive Dashboard')}
            >
              <div className="nav-item-icon-wrapper">
                <BarChart2 size={18} />
              </div>
              <span className="nav-item-label">Dashboard</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>

            <button
              className={`nav-item locked-nav ${activeTab === 'revenue' ? 'active' : ''}`}
              onClick={() => handleNavClick('revenue', 'Revenue Analytics')}
            >
              <div className="nav-item-icon-wrapper">
                <TrendingUp size={18} />
              </div>
              <span className="nav-item-label">Revenue Analytics</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>

            <button
              className={`nav-item locked-nav ${activeTab === 'advanced_analytics' ? 'active' : ''}`}
              onClick={() => handleNavClick('advanced_analytics', 'Advanced Analytics')}
            >
              <div className="nav-item-icon-wrapper">
                <Layers size={18} />
              </div>
              <span className="nav-item-label">Advanced Analytics</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>

            <button
              className={`nav-item locked-nav ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => handleNavClick('reports', 'Reports & Data Export')}
            >
              <div className="nav-item-icon-wrapper">
                <FileSpreadsheet size={18} />
              </div>
              <span className="nav-item-label">Reports</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>
          </nav>

          <div className="sidebar-section-label">Sales & CRM</div>
          <nav className="sidebar-nav">
            <button
              className={`nav-item locked-nav ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => handleNavClick('orders', 'Order Management')}
            >
              <div className="nav-item-icon-wrapper">
                <ShoppingBag size={18} />
              </div>
              <span className="nav-item-label">Order Management</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>

            <button
              className={`nav-item locked-nav ${activeTab === 'order_history' ? 'active' : ''}`}
              onClick={() => handleNavClick('order_history', 'Order History')}
            >
              <div className="nav-item-icon-wrapper">
                <Clock size={18} />
              </div>
              <span className="nav-item-label">Order History</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>

            <button
              className={`nav-item locked-nav ${activeTab === 'customers' ? 'active' : ''}`}
              onClick={() => handleNavClick('customers', 'Customer Management')}
            >
              <div className="nav-item-icon-wrapper">
                <Users size={18} />
              </div>
              <span className="nav-item-label">Customer Management</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>
          </nav>

          <div className="sidebar-section-label">Growth & Marketing</div>
          <nav className="sidebar-nav">
            <button
              className={`nav-item locked-nav ${activeTab === 'coupons' ? 'active' : ''}`}
              onClick={() => handleNavClick('coupons', 'Coupon Management')}
            >
              <div className="nav-item-icon-wrapper">
                <Tag size={18} />
              </div>
              <span className="nav-item-label">Coupon Management</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>

            <button
              className={`nav-item locked-nav ${activeTab === 'influencer' ? 'active' : ''}`}
              onClick={() => handleNavClick('influencer', 'Influencer Marketing')}
            >
              <div className="nav-item-icon-wrapper">
                <Sparkles size={18} />
              </div>
              <span className="nav-item-label">Influencer Marketing</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>

            <button
              className={`nav-item locked-nav ${activeTab === 'marketing' ? 'active' : ''}`}
              onClick={() => handleNavClick('marketing', 'Marketing Automation')}
            >
              <div className="nav-item-icon-wrapper">
                <Megaphone size={18} />
              </div>
              <span className="nav-item-label">Marketing</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>
          </nav>

          <div className="sidebar-section-label">System</div>
          <nav className="sidebar-nav">
            <button
              className={`nav-item locked-nav ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => handleNavClick('settings', 'Admin Settings')}
            >
              <div className="nav-item-icon-wrapper">
                <Settings size={18} />
              </div>
              <span className="nav-item-label">Settings</span>
              <span className="access-badge locked-badge">
                <Lock size={10} /> Locked
              </span>
            </button>
          </nav>

          {/* Upgrade Banner in Sidebar Footer */}
          <div className="sidebar-upgrade-card">
            <div className="upgrade-card-icon">
              <Sparkles size={20} />
            </div>
            <div className="upgrade-card-text">
              <strong>Unlock All Features</strong>
              <p>Get automated orders, marketing, analytics & AI tools.</p>
            </div>
            <button
              className="sidebar-upgrade-btn"
              onClick={() => handleOpenUpgradeModal('Sidebar Upgrade Card')}
            >
              Upgrade Now
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main">
          {/* ============================================================ */}
          {/* 1. PRODUCT MANAGEMENT (FULLY FUNCTIONAL) */}
          {/* ============================================================ */}
          {activeTab === 'products' ? (
            <div className="products-view">
              {/* Product Management Header */}
              <div className="view-header">
                <div>
                  <div className="view-header-title-row">
                    <h2 className="view-title">Product Catalog</h2>
                    <span className="feature-status-tag available">
                      <CheckCircle2 size={13} /> Fully Functional
                    </span>
                  </div>
                  <p className="view-subtitle">
                    Add, edit, upload photography, manage pricing, and organize luxury handicrafts.
                  </p>
                </div>

                <div className="view-actions">
                  <button className="refresh-btn" onClick={fetchProducts} title="Refresh Product List">
                    <RefreshCw size={16} className={loading ? 'spinning' : ''} />
                  </button>
                  <button className="primary-gold-btn" onClick={handleOpenAddModal}>
                    <Plus size={18} />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Stats Ribbon */}
              <div className="stats-ribbon">
                <div className="stat-card">
                  <span className="stat-label">Total Products</span>
                  <span className="stat-value">{products.length}</span>
                  <span className="stat-desc">In catalog database</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">In Stock</span>
                  <span className="stat-value">{totalInStock}</span>
                  <span className="stat-desc">Available for order</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Active Categories</span>
                  <span className="stat-value">{allCategories.length - 1}</span>
                  <span className="stat-desc">Curated collections</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Uploaded Assets</span>
                  <span className="stat-value">{totalImages}</span>
                  <span className="stat-desc">Photography gallery</span>
                </div>
              </div>

              {/* Filter, Search & View Controls */}
              <div className="catalog-toolbar">
                <div className="search-box">
                  <Search size={17} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by product name, category, price, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="toolbar-controls">
                  <div className="category-select-wrapper">
                    <Filter size={15} />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {allCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat === 'All' ? 'All Categories' : cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sort-select-wrapper">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                    </select>
                  </div>

                  <div className="view-mode-toggle">
                    <button
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      title="Grid View"
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                      onClick={() => setViewMode('table')}
                      title="Table View"
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Content */}
              {loading ? (
                <div className="loading-state">
                  <RefreshCw size={32} className="spinning gold-spinner" />
                  <p>Loading product catalog...</p>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="empty-state">
                  <Package size={48} />
                  <h3>No products found</h3>
                  <p>
                    {searchQuery || selectedCategory !== 'All'
                      ? 'No items match your active search or filter criteria.'
                      : 'Your catalog is currently empty. Add your first handcrafted piece!'}
                  </p>
                  {(searchQuery || selectedCategory !== 'All') && (
                    <button
                      className="secondary-btn"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : viewMode === 'grid' ? (
                <div className="products-grid">
                  {sortedProducts.map((product) => {
                    const primaryImg =
                      product.image ||
                      (Array.isArray(product.images) && product.images[0]) ||
                      '/uploads/placeholder.png';
                    const imgCount = Array.isArray(product.images) ? product.images.length : product.image ? 1 : 0;

                    return (
                      <div key={product.id} className="admin-product-card">
                        <div className="card-image-wrapper">
                          <img
                            src={primaryImg}
                            alt={product.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          <div className="card-image-overlay">
                            <span className="category-pill">{product.category}</span>
                            {imgCount > 1 && (
                              <span className="photos-pill">
                                <ImageIcon size={12} /> {imgCount} Photos
                              </span>
                            )}
                          </div>
                          {product.inStock === false && (
                            <span className="out-of-stock-badge">Out of Stock</span>
                          )}
                        </div>

                        <div className="card-content">
                          <div className="card-id-row">
                            <span className="product-id-tag">ID: {product.id}</span>
                            <span className="product-price">{product.price}</span>
                          </div>

                          <h3 className="card-title" title={product.title}>
                            {product.title}
                          </h3>

                          {product.description && (
                            <p className="card-desc">{product.description}</p>
                          )}

                          {product.dimensions &&
                            (product.dimensions.height || product.dimensions.diameter) && (
                              <div className="card-dimensions">
                                {product.dimensions.height && (
                                  <span>H: {product.dimensions.height}</span>
                                )}
                                {product.dimensions.diameter && (
                                  <span>Dia: {product.dimensions.diameter}</span>
                                )}
                              </div>
                            )}

                          <div className="card-actions">
                            <button
                              className="card-action-btn edit-btn"
                              onClick={() => handleOpenEditModal(product)}
                            >
                              <Edit size={14} />
                              <span>Edit</span>
                            </button>
                            <button
                              className="card-action-btn delete-btn"
                              onClick={() => setDeleteConfirmProduct(product)}
                              title="Delete Product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Table View */
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Product Details</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Gallery</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedProducts.map((product) => {
                        const primaryImg =
                          product.image ||
                          (Array.isArray(product.images) && product.images[0]) ||
                          '';
                        const imgCount = Array.isArray(product.images)
                          ? product.images.length
                          : product.image
                          ? 1
                          : 0;

                        return (
                          <tr key={product.id}>
                            <td className="table-thumb-cell">
                              <img
                                src={primaryImg}
                                alt={product.title}
                                className="table-thumb"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=200&q=80';
                                }}
                              />
                            </td>
                            <td>
                              <div className="table-product-title">{product.title}</div>
                              <span className="table-product-id">ID: {product.id}</span>
                            </td>
                            <td>
                              <span className="table-category-tag">{product.category}</span>
                            </td>
                            <td className="table-price-cell">{product.price}</td>
                            <td>
                              <span className="table-photos-count">
                                <ImageIcon size={13} /> {imgCount} photos
                              </span>
                            </td>
                            <td>
                              <span
                                className={`stock-status-pill ${
                                  product.inStock !== false ? 'in-stock' : 'out-stock'
                                }`}
                              >
                                {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td className="text-right">
                              <div className="table-action-group">
                                <button
                                  className="table-btn-icon edit"
                                  onClick={() => handleOpenEditModal(product)}
                                  title="Edit Product"
                                >
                                  <Edit size={15} />
                                </button>
                                <button
                                  className="table-btn-icon delete"
                                  onClick={() => setDeleteConfirmProduct(product)}
                                  title="Delete Product"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            /* ============================================================ */
            /* 2. EVERYTHING ELSE IS LOCKED (STUNNING PREVIEW + UPGRADE MODAL) */
            /* ============================================================ */
            <div className="locked-view-container">
              {/* Premium Top Lock Banner */}
              <div className="locked-banner">
                <div className="locked-banner-icon">
                  <Lock size={28} />
                </div>
                <div className="locked-banner-content">
                  <div className="locked-badge-row">
                    <span className="locked-pill">🔒 Premium Feature Locked</span>
                    <span className="locked-tier-label">Available on Pro & Enterprise</span>
                  </div>
                  <h2 className="locked-banner-title">
                    {lockedFeatureName || 'This Feature'} is Locked
                  </h2>
                  <p className="locked-banner-desc">
                    This feature is available in the upgraded admin panel. Upgrade your plan to
                    unlock advanced order management, analytics, marketing tools, automated
                    invoicing and more.
                  </p>
                </div>
                <div className="locked-banner-cta">
                  <button
                    className="upgrade-primary-btn"
                    onClick={() => handleOpenUpgradeModal(lockedFeatureName)}
                  >
                    <Sparkles size={16} />
                    <span>Upgrade to Unlock</span>
                  </button>
                </div>
              </div>

              {/* Mock UI Previews for Each Tab */}
              <div
                className="mock-preview-wrapper"
                onClick={() => handleOpenUpgradeModal(lockedFeatureName)}
                title="Click anywhere to Upgrade"
              >
                <div className="mock-disabled-overlay">
                  <div className="overlay-lock-badge">
                    <Lock size={16} />
                    <span>Interactive Controls Disabled — Upgrade Plan</span>
                  </div>
                </div>

                {activeTab === 'dashboard' && (
                  <div className="mock-dashboard">
                    <div className="mock-metric-row">
                      <div className="mock-stat-card">
                        <div className="mock-stat-header">
                          <span>Gross Sales</span>
                          <span className="mock-change positive">+24.8%</span>
                        </div>
                        <div className="mock-stat-number">₹14,85,400</div>
                        <div className="mock-stat-footer">vs. ₹11,90,000 last month</div>
                      </div>
                      <div className="mock-stat-card">
                        <div className="mock-stat-header">
                          <span>Paid Orders</span>
                          <span className="mock-change positive">+18.2%</span>
                        </div>
                        <div className="mock-stat-number">428 Orders</div>
                        <div className="mock-stat-footer">Razorpay verified</div>
                      </div>
                      <div className="mock-stat-card">
                        <div className="mock-stat-header">
                          <span>Avg. Order Value</span>
                          <span className="mock-change positive">+8.4%</span>
                        </div>
                        <div className="mock-stat-number">₹3,470</div>
                        <div className="mock-stat-footer">B2B & Retail combined</div>
                      </div>
                      <div className="mock-stat-card">
                        <div className="mock-stat-header">
                          <span>Store Conversion</span>
                          <span className="mock-change neutral">3.82%</span>
                        </div>
                        <div className="mock-stat-number">12,400 Visitors</div>
                        <div className="mock-stat-footer">Active buyer funnel</div>
                      </div>
                    </div>

                    <div className="mock-grid-two-col">
                      <div className="mock-card">
                        <h4 className="mock-card-title">Revenue Trajectory (30 Days)</h4>
                        <div className="mock-chart-placeholder">
                          <div className="mock-chart-bars">
                            {[40, 65, 55, 80, 70, 95, 85, 100, 90, 110, 105, 125].map(
                              (height, idx) => (
                                <div
                                  key={idx}
                                  className="mock-bar"
                                  style={{ height: `${height}%` }}
                                ></div>
                              )
                            )}
                          </div>
                          <div className="mock-chart-x-axis">
                            <span>Week 1</span>
                            <span>Week 2</span>
                            <span>Week 3</span>
                            <span>Week 4</span>
                          </div>
                        </div>
                      </div>

                      <div className="mock-card">
                        <h4 className="mock-card-title">Recent High-Value Orders</h4>
                        <div className="mock-mini-table">
                          <div className="mock-table-row header">
                            <span>Order</span>
                            <span>Customer</span>
                            <span>Amount</span>
                            <span>Status</span>
                          </div>
                          <div className="mock-table-row">
                            <span>#ORD-9821</span>
                            <span>The Oberoi Palace Hotel</span>
                            <span>₹1,45,000</span>
                            <span className="mock-status-pill green">Paid</span>
                          </div>
                          <div className="mock-table-row">
                            <span>#ORD-9820</span>
                            <span>Taj Heritage Suites</span>
                            <span>₹84,500</span>
                            <span className="mock-status-pill green">Paid</span>
                          </div>
                          <div className="mock-table-row">
                            <span>#ORD-9819</span>
                            <span>Luxury Living London</span>
                            <span>$1,850</span>
                            <span className="mock-status-pill blue">Dispatched</span>
                          </div>
                          <div className="mock-table-row">
                            <span>#ORD-9818</span>
                            <span>Royal Orchid Resorts</span>
                            <span>₹52,000</span>
                            <span className="mock-status-pill orange">Processing</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(activeTab === 'orders' || activeTab === 'order_history') && (
                  <div className="mock-orders-view">
                    <div className="mock-orders-header">
                      <div className="mock-tabs">
                        <span className="mock-tab active">All (142)</span>
                        <span className="mock-tab">Paid (98)</span>
                        <span className="mock-tab">In Production (24)</span>
                        <span className="mock-tab">Dispatched (16)</span>
                        <span className="mock-tab">Delivered (4)</span>
                      </div>
                      <div className="mock-action-btns">
                        <span className="mock-btn-sm">Export CSV</span>
                        <span className="mock-btn-sm">Filter Status</span>
                      </div>
                    </div>

                    <table className="admin-table mock-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Client / Buyer</th>
                          <th>Items</th>
                          <th>Total Amount</th>
                          <th>Gateway</th>
                          <th>Fulfillment</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: 'ORD-74921',
                            date: '2 Oct 2026',
                            client: 'The Leela Kovalam',
                            items: '12x Brass Accent Tray',
                            amount: '₹42,500',
                            gateway: 'Razorpay',
                            status: 'PAID'
                          },
                          {
                            id: 'ORD-74920',
                            date: '1 Oct 2026',
                            client: 'ITC Grand Chola',
                            items: '20x Chevron Leaf Platter',
                            amount: '₹68,000',
                            gateway: 'Razorpay',
                            status: 'PAID'
                          },
                          {
                            id: 'ORD-74919',
                            date: '30 Sep 2026',
                            client: 'Dubai Artisan Importers',
                            items: '45x Perforated Metal Platter',
                            amount: '₹3,82,500',
                            gateway: 'Wire Transfer',
                            status: 'IN PRODUCTION'
                          },
                          {
                            id: 'ORD-74918',
                            date: '28 Sep 2026',
                            client: 'Saffron Lounge Paris',
                            items: '8x Multi-Tone Leaf Vases',
                            amount: '€2,400',
                            gateway: 'Razorpay Int.',
                            status: 'DISPATCHED'
                          }
                        ].map((row) => (
                          <tr key={row.id}>
                            <td className="font-mono">{row.id}</td>
                            <td>{row.date}</td>
                            <td>
                              <strong>{row.client}</strong>
                            </td>
                            <td>{row.items}</td>
                            <td className="table-price-cell">{row.amount}</td>
                            <td>{row.gateway}</td>
                            <td>
                              <span className="stock-status-pill in-stock">{row.status}</span>
                            </td>
                            <td>
                              <button className="table-btn-icon edit">
                                <Eye size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'revenue' && (
                  <div className="mock-revenue-view">
                    <div className="mock-metric-row">
                      <div className="mock-stat-card">
                        <span className="stat-label">Net Sales Revenue</span>
                        <span className="mock-stat-number">₹48,20,000</span>
                        <span className="stat-desc">Year-to-date FY 2026</span>
                      </div>
                      <div className="mock-stat-card">
                        <span className="stat-label">Razorpay Processing</span>
                        <span className="mock-stat-number">88.4%</span>
                        <span className="stat-desc">Zero transaction failures</span>
                      </div>
                      <div className="mock-stat-card">
                        <span className="stat-label">Refund & Dispute Rate</span>
                        <span className="mock-stat-number">0.08%</span>
                        <span className="stat-desc">Industry leading satisfaction</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'coupons' && (
                  <div className="mock-coupons-view">
                    <div className="mock-grid-two-col">
                      <div className="mock-coupon-card">
                        <div className="coupon-code">HERITAGE25</div>
                        <p>25% OFF on wholesale Hospitality platters</p>
                        <span className="coupon-meta">Used 48 times · Expires in 14 days</span>
                      </div>
                      <div className="mock-coupon-card">
                        <div className="coupon-code">DIWALIEXPO</div>
                        <p>Flat ₹5,000 OFF on orders above ₹50,000</p>
                        <span className="coupon-meta">Used 112 times · Active Campaign</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'influencer' && (
                  <div className="mock-influencer-view">
                    <div className="mock-card">
                      <h4 className="mock-card-title">Tracked Creator Collaborations</h4>
                      <p className="mock-desc">
                        14 Instagram Creators tracked · 128K Views generated · 34 Inquiries attributed
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'customers' && (
                  <div className="mock-customers-view">
                    <div className="mock-card">
                      <h4 className="mock-card-title">B2B Buyer Accounts & Tiering</h4>
                      <p className="mock-desc">
                        185 Registered Luxury Hospitality Accounts · Moradabad Export Directory
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="mock-settings-view">
                    <div className="mock-card">
                      <h4 className="mock-card-title">Payment & Store Infrastructure</h4>
                      <p className="mock-desc">
                        Razorpay Live Webhooks, Multi-currency FX, Automated GST Tax Invoicing
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'marketing' && (
                  <div className="mock-marketing-view">
                    <div className="mock-card">
                      <h4 className="mock-card-title">Automated WhatsApp & Email Campaigns</h4>
                      <p className="mock-desc">
                        Abandoned Cart Recovery, B2B Catalog Push, Exhibition Invites
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'reports' && (
                  <div className="mock-reports-view">
                    <div className="mock-card">
                      <h4 className="mock-card-title">Exportable Accounting & Inventory Reports</h4>
                      <p className="mock-desc">
                        Monthly P&L, GST Returns, Export Remittance Statements (FIRC), Stock Valuation
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================ */}
      {/* ADD / EDIT PRODUCT MODAL (STRICTLY DIRECT FILE UPLOAD) */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => !isSaving && setIsModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="modal-header-left">
                <div className="modal-icon-badge">
                  <Package size={20} />
                </div>
                <div>
                  <h3 className="modal-title">
                    {isEditing ? 'Edit Product' : 'Add New Handcrafted Product'}
                  </h3>
                  <p className="modal-subtitle">
                    {isEditing
                      ? `Update details and images for ID: ${currentProductId}`
                      : 'Fill in details and upload high-res photography'}
                  </p>
                </div>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => !isSaving && setIsModalOpen(false)}
                disabled={isSaving}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="admin-modal-form">
              <div className="modal-form-scrollable">
                {/* 1. Basic Information */}
                <div className="form-section">
                  <h4 className="section-heading">Basic Information</h4>

                  <div className="form-group">
                    <label className="form-label">
                      Product Name / Title <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Handcrafted Ornate Multi-Metallic Platter Set"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <div className="form-row two-cols">
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, category: e.target.value }))
                        }
                      >
                        {DEFAULT_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                        <option value="Custom">+ Custom Category</option>
                      </select>
                      {formData.category === 'Custom' && (
                        <input
                          type="text"
                          className="form-input custom-cat-input"
                          placeholder="Type new category name..."
                          value={formData.customCategory}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, customCategory: e.target.value }))
                          }
                          required
                        />
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Pricing <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. ₹1,850 or ₹1,820 / $22"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, price: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, inStock: e.target.checked }))
                        }
                      />
                      <span>In Stock & Ready for Inquiry / Purchase</span>
                    </label>
                  </div>
                </div>

                {/* 2. Direct File Upload Interface (NO FILE-PATH INPUT) */}
                <div className="form-section">
                  <div className="section-heading-row">
                    <h4 className="section-heading">Product Photography & Gallery</h4>
                    <span className="upload-tip">Direct file upload interface</span>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    multiple
                    accept="image/png, image/jpeg, image/webp, image/jpg, image/gif, image/svg+xml"
                    style={{ display: 'none' }}
                  />

                  {/* Drag & Drop Zone */}
                  <div
                    className={`dropzone-container ${isDragOver ? 'drag-active' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="dropzone-icon">
                      {isUploading ? (
                        <RefreshCw size={28} className="spinning gold-spinner" />
                      ) : (
                        <Upload size={28} />
                      )}
                    </div>
                    <div className="dropzone-text">
                      <strong>
                        {isUploading
                          ? 'Uploading images to server...'
                          : 'Click to upload or drag & drop product photos'}
                      </strong>
                      <p>Supports multiple JPG, PNG, WEBP, GIF (up to 20MB each)</p>
                    </div>
                    <button
                      type="button"
                      className="browse-files-btn"
                      disabled={isUploading}
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Browse Files
                    </button>
                  </div>

                  {uploadError && (
                    <div className="upload-error-msg">
                      <AlertCircle size={15} />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {/* Uploaded Photos Preview Gallery */}
                  {formData.images.length > 0 && (
                    <div className="uploaded-gallery-section">
                      <div className="gallery-header">
                        <span>
                          {formData.images.length} Image(s) Attached (First image is primary cover)
                        </span>
                      </div>
                      <div className="uploaded-thumbnails-grid">
                        {formData.images.map((imgUrl, index) => (
                          <div key={index} className="uploaded-thumb-card">
                            <img
                              src={imgUrl}
                              alt={`Upload preview ${index + 1}`}
                              className="uploaded-thumb-img"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=200&q=80';
                              }}
                            />
                            {index === 0 ? (
                              <span className="primary-cover-badge">
                                <Star size={10} /> Cover Photo
                              </span>
                            ) : (
                              <button
                                type="button"
                                className="make-primary-btn"
                                onClick={() => handleSetPrimaryImage(index)}
                                title="Set as main cover image"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              className="remove-thumb-btn"
                              onClick={() => handleRemoveImage(index)}
                              title="Remove Image"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Product Description */}
                <div className="form-section">
                  <h4 className="section-heading">Description & Craftsmanship Story</h4>
                  <div className="form-group">
                    <textarea
                      className="form-textarea"
                      rows="4"
                      placeholder="Describe the artisan techniques, metal finishes, engraving details, and intended use..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                    ></textarea>
                  </div>
                </div>

                {/* 4. Dimensions & Specifications (Optional) */}
                <div className="form-section">
                  <h4 className="section-heading">Dimensions & Specifications</h4>
                  <div className="form-row three-cols">
                    <div className="form-group">
                      <label className="form-label">Height</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 7 cm (3&quot;)"
                        value={formData.dimensions.height}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            dimensions: { ...prev.dimensions, height: e.target.value }
                          }))
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Diameter / Width</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 19 cm (8&quot;)"
                        value={formData.dimensions.diameter}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            dimensions: { ...prev.dimensions, diameter: e.target.value }
                          }))
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Length / Pendi</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Length 48 cm (19&quot;)"
                        value={formData.dimensions.pendi}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            dimensions: { ...prev.dimensions, pendi: e.target.value }
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-gold-btn" disabled={isSaving || isUploading}>
                  {isSaving ? (
                    <>
                      <RefreshCw size={16} className="spinning" />
                      <span>Saving to Storage...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>{isEditing ? 'Save Changes' : 'Create Product'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ============================================================ */}
      {deleteConfirmProduct && (
        <div className="admin-modal-backdrop" onClick={() => setDeleteConfirmProduct(null)}>
          <div className="delete-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-icon">
              <Trash2 size={28} />
            </div>
            <h3 className="delete-modal-title">Delete Product?</h3>
            <p className="delete-modal-desc">
              Are you sure you want to permanently delete{' '}
              <strong>"{deleteConfirmProduct.title}"</strong> (ID: {deleteConfirmProduct.id})? This
              action cannot be undone and will remove it from the catalog.
            </p>
            <div className="delete-modal-actions">
              <button className="secondary-btn" onClick={() => setDeleteConfirmProduct(null)}>
                Cancel
              </button>
              <button className="danger-btn" onClick={handleDeleteProduct}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* UPGRADE PLAN MODAL (LOCKED POPUP) */}
      {/* ============================================================ */}
      {showUpgradeModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowUpgradeModal(false)}>
          <div className="upgrade-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowUpgradeModal(false)}>
              <X size={18} />
            </button>

            <div className="upgrade-modal-header">
              <div className="upgrade-gem-icon">
                <Sparkles size={28} />
              </div>
              <span className="upgrade-pill-tag">✨ Unlock Full Enterprise Capabilities</span>
              <h2 className="upgrade-modal-title">Upgrade Your Admin Panel</h2>
              <p className="upgrade-modal-subtitle">
                {lockedFeatureName
                  ? `"${lockedFeatureName}" is part of our Advanced Suite.`
                  : 'Upgrade to unlock enterprise features.'}{' '}
                Supercharge your studio with automated order management, live revenue analytics,
                promotional coupons, and influencer attribution.
              </p>
            </div>

            <div className="upgrade-plans-grid">
              {/* Starter Plan */}
              <div className="plan-card current-plan">
                <div className="plan-badge current">Current Plan</div>
                <h4 className="plan-title">Starter Catalog</h4>
                <div className="plan-price">Included</div>
                <ul className="plan-features-list">
                  <li className="included">
                    <Check size={14} /> Full Product Catalog Management
                  </li>
                  <li className="included">
                    <Check size={14} /> Direct Image Uploads (No File Paths)
                  </li>
                  <li className="included">
                    <Check size={14} /> Edit, Delete, Search & Filtering
                  </li>
                  <li className="locked">
                    <Lock size={12} /> Executive Revenue Dashboard
                  </li>
                  <li className="locked">
                    <Lock size={12} /> Razorpay Order Processing & Invoicing
                  </li>
                  <li className="locked">
                    <Lock size={12} /> Coupon Codes & Influencer Marketing
                  </li>
                </ul>
              </div>

              {/* Enterprise Pro Plan */}
              <div className="plan-card pro-plan">
                <div className="plan-badge pro">Recommended Upgrade</div>
                <h4 className="plan-title">Enterprise Suite</h4>
                <div className="plan-price">
                  <span>Custom / Pro</span>
                </div>
                <ul className="plan-features-list">
                  <li className="included">
                    <Check size={14} /> <strong>Everything in Starter</strong>
                  </li>
                  <li className="included">
                    <Check size={14} /> <strong>Automated Order Fulfillment & Queue</strong>
                  </li>
                  <li className="included">
                    <Check size={14} /> <strong>Real-time Revenue Analytics & P&L</strong>
                  </li>
                  <li className="included">
                    <Check size={14} /> <strong>Discount Coupons & Affiliate Tracking</strong>
                  </li>
                  <li className="included">
                    <Check size={14} /> <strong>B2B Client CRM & WhatsApp Alerts</strong>
                  </li>
                  <li className="included">
                    <Check size={14} /> <strong>Priority 24/7 Dedicated Support</strong>
                  </li>
                </ul>
                <button
                  className="plan-cta-btn gold-gradient"
                  onClick={() => {
                    showToast('Upgrade request submitted! Our sales team will contact you shortly.');
                    setShowUpgradeModal(false);
                  }}
                >
                  Request Instant Upgrade
                </button>
              </div>
            </div>

            <div className="upgrade-modal-footer">
              <p>
                🔒 All transactions are secured with 256-bit encryption. Need assistance? Contact{' '}
                <strong>enterprise@giftmark.in</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
