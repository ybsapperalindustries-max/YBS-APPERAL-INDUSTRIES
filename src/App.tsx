import { useState, useEffect, useMemo, useRef } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Order, Category, GenderTarget, ProductColor } from './types/store';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { LookbookSection } from './components/LookbookSection';
import { AboutUsSection } from './components/AboutUsSection';
import { AboutUsModal } from './components/AboutUsModal';
import { B2BModal } from './components/B2BModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'YBS-849201',
    date: 'Today, 10:14 AM',
    items: [
      {
        id: 'demo-item-1',
        product: PRODUCTS[0],
        selectedSize: 'L',
        selectedColor: { name: 'Washed Charcoal', hex: '#2B2D31', inStock: true },
        quantity: 1,
      },
    ],
    customer: {
      fullName: 'Hamza Malik',
      email: 'hamza.malik@outlook.com',
      phone: '+92 300 1234567',
      address: 'House 42-B, Sector G-11/3',
      city: 'Islamabad',
      postalCode: '44000',
      country: 'Pakistan',
    },
    deliveryMethod: 'express',
    paymentMethod: 'online_bank',
    paymentReference: 'TR-MEZN-948102',
    subtotal: 42,
    discount: 4.2,
    shippingFee: 12,
    tax: 3.02,
    total: 52.82,
    status: 'In Production',
    trackingNumber: 'TRK-PK849102',
    estimatedDelivery: '3 Business Days',
  },
  {
    id: 'YBS-729402',
    date: 'Yesterday, 04:30 PM',
    items: [
      {
        id: 'demo-item-2',
        product: PRODUCTS[1],
        selectedSize: 'M',
        selectedColor: { name: 'Oatmeal Sand', hex: '#DED7CD', inStock: true },
        quantity: 1,
      },
      {
        id: 'demo-item-3',
        product: PRODUCTS[10] || PRODUCTS[0],
        selectedSize: 'M',
        selectedColor: { name: 'Bone Ecru', hex: '#EDE8E0', inStock: true },
        quantity: 2,
      },
    ],
    customer: {
      fullName: 'Ayesha Tariq',
      email: 'ayesha.t@gmail.com',
      phone: '+92 321 9876543',
      address: 'Apartment 1204, Creek Vistas, Phase 8 DHA',
      city: 'Karachi',
      postalCode: '75500',
      country: 'Pakistan',
    },
    deliveryMethod: 'standard',
    paymentMethod: 'jazzcash_easypaisa',
    paymentReference: 'JC-84920184',
    subtotal: 66,
    discount: 0,
    shippingFee: 0,
    tax: 5.28,
    total: 71.28,
    status: 'Quality Check',
    trackingNumber: 'TRK-PK729402',
    estimatedDelivery: '4 Business Days',
  },
  {
    id: 'YBS-618493',
    date: '2 days ago',
    items: [
      {
        id: 'demo-item-4',
        product: PRODUCTS[3] || PRODUCTS[0],
        selectedSize: 'XL',
        selectedColor: { name: 'Obsidian Black', hex: '#0D0E10', inStock: true },
        quantity: 1,
      },
    ],
    customer: {
      fullName: 'Robert Sterling',
      email: 'r.sterling@atelier-uk.com',
      phone: '+44 7700 900123',
      address: '14 Kensington Church Street',
      city: 'London',
      postalCode: 'W8 4EP',
      country: 'United Kingdom',
    },
    deliveryMethod: 'express',
    paymentMethod: 'card',
    paymentReference: 'AUTH-CARD-449102',
    subtotal: 85,
    discount: 8.5,
    shippingFee: 12,
    tax: 6.12,
    total: 94.62,
    status: 'Dispatched',
    trackingNumber: 'TRK-DHL-918274',
    estimatedDelivery: '2 Business Days',
  },
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Garments' },
  { id: 'tracksuits', label: 'Tracksuits' },
  { id: 'jackets', label: 'Jackets' },
  { id: 'leather', label: 'Leather Garments' },
  { id: 'sportswear', label: 'Sportswear' },
  { id: 'gymwear', label: 'Gym Wear' },
  { id: 'streetwear', label: 'Streetwear' },
  { id: 'caps_hats', label: 'Caps & Hats' },
  { id: 'hoodies', label: 'Hoodies' },
  { id: 'tees', label: 'Tees' },
  { id: 'trousers', label: 'Cargo Pants' },
];

export default function App() {
  // Navigation & Filter States
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedGender, setSelectedGender] = useState<GenderTarget>('all');
  const [selectedFit, setSelectedFit] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Products State (Core Catalog + Custom Added Articles from LocalStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const custom = localStorage.getItem('ybs_custom_products');
      if (custom) {
        const parsed: Product[] = JSON.parse(custom);
        if (parsed.length > 0) {
          return [...parsed, ...PRODUCTS];
        }
      }
    } catch {
      // ignore
    }
    return PRODUCTS;
  });

  // Cart & Wishlist States (persisted to localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ybs_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ybs_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ybs_orders');
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_DEMO_ORDERS;
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Modal Dialog States
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [activeSizeGuideProduct, setActiveSizeGuideProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isB2BOpen, setIsB2BOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<'orders' | 'articles' | 'add_article'>('orders');

  const catalogRef = useRef<HTMLDivElement>(null);
  const lookbookRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      const customOnly = products.filter((p) => p.isCustomAdded);
      localStorage.setItem('ybs_custom_products', JSON.stringify(customOnly));
    } catch {
      // ignore
    }
  }, [products]);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ybs_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('ybs_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('ybs_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      // Gender filter
      if (selectedGender !== 'all' && p.gender !== selectedGender && p.gender !== 'unisex') {
        return false;
      }
      // Fit filter
      if (selectedFit !== 'all' && p.fit !== selectedFit) {
        return false;
      }
      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesFabric = p.fabric.toLowerCase().includes(q);
        const matchesTag = p.tagline.toLowerCase().includes(q);
        const matchesFit = p.fit.toLowerCase().includes(q);
        const matchesSub = p.subType ? p.subType.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesDesc && !matchesFabric && !matchesTag && !matchesFit && !matchesSub) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, activeCategory, selectedGender, selectedFit, searchQuery, sortBy]);

  // Admin & Store Operations Handlers
  const handleOpenAdmin = (tab: 'orders' | 'articles' | 'add_article' = 'orders') => {
    setAdminTab(tab);
    setIsAdminOpen(true);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setActiveCategory('all');
    setSelectedGender('all');
    setSelectedFit('all');
    setSearchQuery('');
  };

  const handleToggleProductStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string, color: ProductColor, quantity: number) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.product.id === product.id && it.selectedSize === size && it.selectedColor.name === color.name
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      const newItem: CartItem = {
        id: `${product.id}-${size}-${color.name}-${Date.now()}`,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity,
      };
      return [...prev, newItem];
    });
  };

  const handleQuickAdd = (product: Product, size: string) => {
    handleAddToCart(product, size, product.colors[0], 1);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'YBS10' || code === 'WELCOME15') {
      setAppliedPromo(code);
      return { success: true, message: `Promo code ${code} applied successfully!` };
    }
    return { success: false, message: 'Invalid promo code. Try "YBS10" or "WELCOME15".' };
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  // Wishlist Handlers
  const isWishlisted = (productId: string) => wishlist.some((p) => p.id === productId);

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Checkout Handlers
  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBuyNow = (product: Product, size: string, color: ProductColor, quantity: number) => {
    handleAddToCart(product, size, color, quantity);
    setActiveProductModal(null);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
  };

  // Navigation Smooth Scroll
  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLookbook = () => {
    lookbookRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#121316] font-normal">
      {/* 1. Announcement Banner with WhatsApp + Sialkot Pakistan */}
      <AnnouncementBar
        onPromoClick={(code) => {
          handleApplyPromo(code);
          setIsCartOpen(true);
        }}
        onOpenAdmin={() => handleOpenAdmin('orders')}
      />

      {/* 2. Top Bar Navigation */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenB2B={() => setIsB2BOpen(true)}
        onOpenAboutUs={() => setIsAboutUsOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onOpenSearch={() => {
          scrollToCatalog();
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          searchInput?.focus();
        }}
        onGoHome={() => {
          setActiveCategory('all');
          setSelectedGender('all');
          setSelectedFit('all');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoLookbook={scrollToLookbook}
      />

      {/* 3. Campaign Hero */}
      <HeroSection
        onExploreClick={scrollToCatalog}
        onBestsellerClick={() => {
          setActiveCategory('tracksuits');
          scrollToCatalog();
        }}
      />

      {/* 4. Filter Bar with Category, Gender, Fit, and Sort */}
      <div ref={catalogRef}>
        <FilterBar
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          selectedGender={selectedGender}
          onSelectGender={setSelectedGender}
          selectedFit={selectedFit}
          onSelectFit={setSelectedFit}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={filteredProducts.length}
          onResetFilters={() => {
            setActiveCategory('all');
            setSelectedGender('all');
            setSelectedFit('all');
            setSearchQuery('');
            setSortBy('featured');
          }}
        />
      </div>

      {/* 5. Product Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 w-full font-normal">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto font-normal">
            <h3 className="text-lg font-normal font-display text-neutral-900">
              No garments found matching filters
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              We couldn't find any piece matching your criteria. Try resetting the category or gender filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedGender('all');
                setSelectedFit('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#121316] text-white text-xs font-normal uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setActiveProductModal(p)}
                onQuickAdd={handleQuickAdd}
                isWishlisted={isWishlisted(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </main>

      {/* 6. About Us, Mission & Vision Section */}
      <div ref={aboutRef}>
        <AboutUsSection onOpenB2B={() => setIsB2BOpen(true)} />
      </div>

      {/* 7. Craftsmanship & Lookbook Section */}
      <div ref={lookbookRef}>
        <LookbookSection
          onShopCollection={scrollToCatalog}
          onOpenB2B={() => setIsB2BOpen(true)}
        />
      </div>

      {/* 8. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenB2B={() => setIsB2BOpen(true)}
        onOpenAboutUs={() => setIsAboutUsOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onOpenSizeGuide={() => setActiveSizeGuideProduct(products[0])}
        onGoLookbook={scrollToLookbook}
      />

      {/* 9. Floating WhatsApp Quick Order Button */}
      <WhatsAppButton phoneNumber="923078795405" />

      {/* MODALS & DRAWERS */}
      {/* Product Detail Modal (PDP) */}
      <ProductModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={activeProductModal ? isWishlisted(activeProductModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={(p) => setActiveSizeGuideProduct(p)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        product={activeSizeGuideProduct}
        onClose={() => setActiveSizeGuideProduct(null)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleStartCheckout}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCartFromWishlist={(prod, size) => {
          handleQuickAdd(prod, size);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* Checkout Modal with Online Payments */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromo={appliedPromo}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        recentOrders={orders}
      />

      {/* About Us, Mission & Vision Modal */}
      <AboutUsModal
        isOpen={isAboutUsOpen}
        onClose={() => setIsAboutUsOpen(false)}
        onOpenB2B={() => {
          setIsAboutUsOpen(false);
          setIsB2BOpen(true);
        }}
      />

      {/* B2B & Wholesale Modal */}
      <B2BModal
        isOpen={isB2BOpen}
        onClose={() => setIsB2BOpen(false)}
      />

      {/* Store Operations & Owner Portal (Orders & Articles) */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        products={products}
        onAddProduct={handleAddProduct}
        onToggleProductStock={handleToggleProductStock}
        onDeleteProduct={handleDeleteProduct}
        initialTab={adminTab}
      />
    </div>
  );
}
