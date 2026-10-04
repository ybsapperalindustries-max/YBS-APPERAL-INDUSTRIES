import { useState } from 'react';
import {
  X,
  Package,
  Plus,
  ShoppingBag,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MessageCircle,
  Eye,
  Trash2,
  Shield,
  CreditCard,
  Landmark,
  Smartphone,
  ExternalLink,
  ChevronDown,
  Info,
  Layers,
  Image as ImageIcon,
  Upload,
  Camera,
  Check,
} from 'lucide-react';
import { Product, Order, Category, GenderTarget, FitType, ProductColor } from '../types/store';
import { YBSMonogram } from './YBSLogo';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onToggleProductStock: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
  initialTab?: 'orders' | 'articles' | 'add_article';
}

const PRESET_IMAGES = [
  { label: "Men's Tracksuit Set", url: '/src/assets/images/ybs_men_tracksuit_1791029220564.jpg' },
  { label: "Ladies' Tracksuit Set", url: '/src/assets/images/ybs_ladies_tracksuit_1791027916929.jpg' },
  { label: "Kids' Tracksuit Set", url: '/src/assets/images/ybs_kids_tracksuit_1791027933048.jpg' },
  { label: 'Leather Biker Jacket', url: '/src/assets/images/ybs_leather_jacket_1791027950902.jpg' },
  { label: 'Heavy Puffer Jacket', url: '/src/assets/images/ybs_puffer_jacket_1791027965976.jpg' },
  { label: 'Collegiate Varsity Jacket', url: '/src/assets/images/ybs_varsity_jacket_1791027981232.jpg' },
  { label: 'Sportswear Shell Windbreaker', url: '/src/assets/images/ybs_sportswear_shell_1791029249449.jpg' },
  { label: 'Gym Compression & Shorts', url: '/src/assets/images/ybs_gym_activewear_1791029233706.jpg' },
  { label: 'Heavyweight Loopback Hoodie', url: '/src/assets/images/ybs_hoodie_charcoal_1791026848767.jpg' },
  { label: 'Boxy Cotton Tee', url: '/src/assets/images/ybs_tee_ecru_1791026862910.jpg' },
  { label: 'Utility Cargo Trousers', url: '/src/assets/images/ybs_trousers_olive_1791026875822.jpg' },
  { label: 'Strapback Chino Cap', url: '/src/assets/images/ybs_cap_strapback_1791029268044.jpg' },
  { label: 'Wool Zip Bomber Jacket', url: '/src/assets/images/ybs_jacket_navy_1791026890167.jpg' },
];

const PRESET_COLORS: ProductColor[] = [
  { name: 'Washed Charcoal', hex: '#2B2D31', inStock: true },
  { name: 'Onyx Black', hex: '#121316', inStock: true },
  { name: 'Bone Ecru', hex: '#EAE6DF', inStock: true },
  { name: 'Muted Olive', hex: '#484E42', inStock: true },
  { name: 'Midnight Navy', hex: '#1C2430', inStock: true },
  { name: 'Heather Gray', hex: '#9E9E9E', inStock: true },
  { name: 'Vintage Brown', hex: '#3B291D', inStock: true },
  { name: 'Oatmeal Sand', hex: '#DED7CD', inStock: true },
];

export function AdminPortalModal({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
  products,
  onAddProduct,
  onToggleProductStock,
  onDeleteProduct,
  initialTab = 'orders',
}: AdminPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'articles' | 'add_article'>(initialTab);

  // Orders Filter State
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Articles Filter State
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState<string>('all');

  // Form State for "Add New Article"
  const [articleForm, setArticleForm] = useState({
    name: '',
    category: 'tracksuits' as Category,
    gender: 'men' as 'men' | 'ladies' | 'kids' | 'unisex',
    subType: 'Men Tracksuit',
    price: 42,
    originalPrice: 65,
    fit: 'Relaxed' as FitType,
    fabric: '100% Combed Aegean Cotton Loopback Fleece',
    gsm: 460,
    tagline: 'Heavyweight Sialkot Mill Craft. Precision drop-shoulder drape.',
    description:
      'Engineered in our Sialkot facility using custom combed cotton. Built with double-needle lockstitch construction and reinforced pocket welts.',
    image: PRESET_IMAGES[0].url,
    badge: 'Latest Design',
    stockCount: 25,
    selectedSizes: ['S', 'M', 'L', 'XL'],
    selectedColors: [PRESET_COLORS[0], PRESET_COLORS[1]],
  });

  const [formSuccessMessage, setFormSuccessMessage] = useState(false);
  const [imageUploadMode, setImageUploadMode] = useState<'upload' | 'preset' | 'url'>('upload');
  const [uploadFileName, setUploadFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setArticleForm((prev) => ({
          ...prev,
          image: event.target!.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  // Filter Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customer.fullName.toLowerCase().includes(q);
      const matchCity = o.customer.city.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchCity && !matchPhone) return false;
    }
    return true;
  });

  // Filter Articles
  const filteredArticles = products.filter((p) => {
    if (articleCategoryFilter !== 'all' && p.category !== articleCategoryFilter) return false;
    if (articleSearch.trim()) {
      const q = articleSearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSub = p.subType ? p.subType.toLowerCase().includes(q) : false;
      if (!matchName && !matchSub) return false;
    }
    return true;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const handleCreateArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.name.trim()) return;

    const categoryLabels: Record<Category, string> = {
      all: 'All Garments',
      tracksuits: 'Tracksuits',
      jackets: 'Jackets',
      leather: 'Leather Garments',
      sportswear: 'Sportswear',
      gymwear: 'Gym Wear',
      streetwear: 'Streetwear',
      caps_hats: 'Caps & Hats',
      hoodies: 'Hoodies',
      tees: 'Tees & Tops',
      trousers: 'Pants & Cargo',
    };

    const genderLabels = {
      men: "Men's Set",
      ladies: "Ladies' Set",
      kids: "Kids' Set",
      unisex: 'Unisex Cut',
    };

    const newProd: Product = {
      id: `ybs-custom-${Date.now()}`,
      name: articleForm.name.trim(),
      category: articleForm.category,
      categoryLabel: categoryLabels[articleForm.category] || 'Apparel',
      gender: articleForm.gender,
      genderLabel: genderLabels[articleForm.gender] || 'Apparel',
      subType: articleForm.subType.trim() || undefined,
      price: Number(articleForm.price) || 99,
      originalPrice: articleForm.originalPrice ? Number(articleForm.originalPrice) : undefined,
      rating: 5.0,
      reviewCount: 1,
      image: articleForm.image,
      gallery: [articleForm.image, '/src/assets/images/ybs_hero_editorial_1791026831196.jpg'],
      tagline: articleForm.tagline.trim(),
      description: articleForm.description.trim(),
      fit: articleForm.fit,
      fabric: articleForm.fabric.trim(),
      gsm: Number(articleForm.gsm) || 380,
      colors: articleForm.selectedColors,
      sizes: articleForm.selectedSizes.length > 0 ? articleForm.selectedSizes : ['M', 'L', 'XL'],
      inStock: true,
      stockCount: Number(articleForm.stockCount) || 20,
      badge: articleForm.badge.trim() || undefined,
      isCustomAdded: true,
      careInstructions: [
        'Machine wash cold gentle cycle (30°C)',
        'Wash inside out',
        'Air dry flat to preserve fabric drape',
      ],
      sizeGuide: [
        { size: 'S', chestOrWaist: '44 in chest', length: '27 in', shoulderOrInseam: '21 in' },
        { size: 'M', chestOrWaist: '46 in chest', length: '28 in', shoulderOrInseam: '22 in' },
        { size: 'L', chestOrWaist: '48 in chest', length: '29 in', shoulderOrInseam: '23 in' },
        { size: 'XL', chestOrWaist: '50 in chest', length: '30 in', shoulderOrInseam: '24 in' },
      ],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: 'YBS Quality Assurance',
          rating: 5,
          date: 'Just now',
          title: 'Direct Sialkot Mill Standard',
          comment: 'Crafted with premium heavy textiles and tested for shape retention.',
          verifiedPurchase: true,
          fitsTrueToSize: 'True to Size',
        },
      ],
    };

    onAddProduct(newProd);
    setFormSuccessMessage(true);

    setTimeout(() => {
      setFormSuccessMessage(false);
      setActiveTab('articles');
      setArticleForm({
        name: '',
        category: 'tracksuits',
        gender: 'men',
        subType: 'Men Tracksuit',
        price: 42,
        originalPrice: 65,
        fit: 'Relaxed',
        fabric: '100% Combed Aegean Cotton Loopback Fleece',
        gsm: 460,
        tagline: 'Heavyweight Sialkot Mill Craft.',
        description: 'Engineered in our Sialkot facility using custom combed cotton.',
        image: PRESET_IMAGES[0].url,
        badge: 'Latest Design',
        stockCount: 25,
        selectedSizes: ['S', 'M', 'L', 'XL'],
        selectedColors: [PRESET_COLORS[0], PRESET_COLORS[1]],
      });
    }, 1200);
  };

  const toggleSize = (sz: string) => {
    setArticleForm((prev) => {
      const exists = prev.selectedSizes.includes(sz);
      return {
        ...prev,
        selectedSizes: exists
          ? prev.selectedSizes.filter((s) => s !== sz)
          : [...prev.selectedSizes, sz],
      };
    });
  };

  const toggleColor = (c: ProductColor) => {
    setArticleForm((prev) => {
      const exists = prev.selectedColors.some((sc) => sc.name === c.name);
      return {
        ...prev,
        selectedColors: exists
          ? prev.selectedColors.filter((sc) => sc.name !== c.name)
          : [...prev.selectedColors, c],
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in font-normal">
      <div
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col font-normal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-neutral-200 bg-[#FBFBF9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#121316] text-white rounded-xl shadow-xs flex items-center justify-center">
              <YBSMonogram size={24} color="#FFFFFF" accentColor="#D4AF37" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-normal uppercase tracking-widest text-neutral-500">
                <span>YBS Apparel Industries</span>
                <span aria-hidden="true">·</span>
                <span>Sialkot, Pakistan</span>
              </div>
              <h3 className="text-lg sm:text-xl font-normal font-display tracking-tight text-neutral-900">
                Store Operations & Owner Portal
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-6 py-2.5 bg-neutral-100/70 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs font-normal">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-[#121316] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Customer Orders</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-700 text-white font-mono">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'articles'
                  ? 'bg-[#121316] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Articles & Stock</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-700 text-white font-mono">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('add_article')}
              className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'add_article'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Article</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-neutral-500 font-mono text-[11px]">
            <span>Total Sales:</span>
            <span className="text-neutral-900 font-medium">${totalRevenue.toFixed(2)}</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 font-normal">
          {/* TAB 1: CUSTOMER ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-5">
              {/* Guidance Info Box */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200/70 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-medium">How to View & Manage Orders:</span> Every order
                  placed by customers on your store (via Online Card, Direct Bank / Raast,
                  JazzCash/EasyPaisa, or COD) automatically appears here in real-time. You can view
                  the delivery address, verify payment IDs, update manufacturing status, and click{' '}
                  <span className="font-medium text-emerald-800">"WhatsApp Customer"</span> to send
                  one-click shipping updates!
                </div>
              </div>

              {/* Order Stats Quick Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">
                    Total Orders
                  </span>
                  <span className="text-xl font-normal font-mono text-neutral-900">
                    {orders.length}
                  </span>
                </div>
                <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl">
                  <span className="text-[11px] text-amber-700 uppercase tracking-wider block">
                    In Production
                  </span>
                  <span className="text-xl font-normal font-mono text-amber-900">
                    {orders.filter((o) => o.status === 'In Production' || o.status === 'Order Placed').length}
                  </span>
                </div>
                <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl">
                  <span className="text-[11px] text-blue-700 uppercase tracking-wider block">
                    Quality & QC
                  </span>
                  <span className="text-xl font-normal font-mono text-blue-900">
                    {orders.filter((o) => o.status === 'Quality Check').length}
                  </span>
                </div>
                <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                  <span className="text-[11px] text-emerald-700 uppercase tracking-wider block">
                    Dispatched / Shipped
                  </span>
                  <span className="text-xl font-normal font-mono text-emerald-900">
                    {orders.filter((o) => o.status === 'Dispatched' || o.status === 'Delivered').length}
                  </span>
                </div>
              </div>

              {/* Orders Filters Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs pt-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, Name, Phone, City..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">Status:</span>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-800 cursor-pointer font-normal"
                  >
                    <option value="all">All Statuses ({orders.length})</option>
                    <option value="Order Placed">Order Placed</option>
                    <option value="In Production">In Production</option>
                    <option value="Quality Check">Quality Check</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Orders List / Cards */}
              {filteredOrders.length === 0 ? (
                <div className="py-14 text-center text-neutral-500 space-y-2">
                  <ShoppingBag className="w-10 h-10 mx-auto text-neutral-300" />
                  <p className="text-xs">No orders match your filter criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((ord) => {
                    const customerWaText = encodeURIComponent(
                      `Hello ${ord.customer.fullName}!\nThis is YBS APPARELS (Sialkot, Pakistan) regarding your Order ${ord.id}.\nStatus: ${ord.status}\nTracking: ${ord.trackingNumber}\nTotal: $${ord.total.toFixed(2)}\nThank you for choosing YBS Apparel Industries!`
                    );

                    return (
                      <div
                        key={ord.id}
                        className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-3 transition-all hover:border-neutral-300"
                      >
                        {/* Top bar: Order ID, Date, Status Stepper, WhatsApp button */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-mono text-neutral-900 font-medium">
                              {ord.id}
                            </span>
                            <span className="text-xs text-neutral-400 font-mono-tabular">
                              {ord.date}
                            </span>
                            <span className="text-[11px] text-neutral-500 font-mono">
                              TRK: {ord.trackingNumber}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Status Changer Dropdown */}
                            <select
                              value={ord.status}
                              onChange={(e) =>
                                onUpdateOrderStatus(ord.id, e.target.value as Order['status'])
                              }
                              className={`text-xs px-2.5 py-1 rounded-lg border cursor-pointer font-normal ${
                                ord.status === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : ord.status === 'Dispatched'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : ord.status === 'Quality Check'
                                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                                  : ord.status === 'In Production'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-neutral-100 text-neutral-800 border-neutral-300'
                              }`}
                            >
                              <option value="Order Placed">Order Placed</option>
                              <option value="In Production">In Production (Stitching)</option>
                              <option value="Quality Check">Quality Check</option>
                              <option value="Dispatched">Dispatched (Courier)</option>
                              <option value="Delivered">Delivered</option>
                            </select>

                            {/* Direct WhatsApp to Customer */}
                            <a
                              href={`https://wa.me/${ord.customer.phone.replace(/[^0-9]/g, '')}?text=${customerWaText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="Message customer on WhatsApp with tracking details"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current" />
                              <span className="hidden sm:inline">WhatsApp Customer</span>
                            </a>
                          </div>
                        </div>

                        {/* Customer & Address Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-normal">
                          <div className="p-3 bg-neutral-50 rounded-lg">
                            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">
                              Customer
                            </span>
                            <div className="text-neutral-900 font-medium">{ord.customer.fullName}</div>
                            <div className="text-neutral-600 font-mono">{ord.customer.phone}</div>
                            <div className="text-neutral-500 truncate">{ord.customer.email}</div>
                          </div>

                          <div className="p-3 bg-neutral-50 rounded-lg">
                            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">
                              Destination Address
                            </span>
                            <div className="text-neutral-900 truncate">{ord.customer.address}</div>
                            <div className="text-neutral-600">
                              {ord.customer.city}, {ord.customer.postalCode}
                            </div>
                            <div className="text-neutral-500">{ord.customer.country}</div>
                          </div>

                          <div className="p-3 bg-neutral-50 rounded-lg flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">
                                Payment Method & Reference
                              </span>
                              <div className="flex items-center gap-1.5 text-neutral-900">
                                {ord.paymentMethod === 'card' && <CreditCard className="w-3.5 h-3.5 text-blue-600" />}
                                {ord.paymentMethod === 'online_bank' && <Landmark className="w-3.5 h-3.5 text-emerald-600" />}
                                {ord.paymentMethod === 'jazzcash_easypaisa' && <Smartphone className="w-3.5 h-3.5 text-amber-600" />}
                                {ord.paymentMethod === 'cod' && <Truck className="w-3.5 h-3.5 text-neutral-700" />}
                                <span className="capitalize">{ord.paymentMethod.replace('_', ' ')}</span>
                              </div>
                              {ord.paymentReference && (
                                <div className="text-[11px] font-mono text-emerald-700 mt-0.5">
                                  Ref/TID: {ord.paymentReference}
                                </div>
                              )}
                            </div>
                            <div className="text-right text-xs pt-1">
                              <span className="text-neutral-500 mr-2">Total Billed:</span>
                              <span className="text-sm font-mono text-neutral-900 font-medium">
                                ${ord.total.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="pt-1">
                          <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-2 font-normal">
                            Garments Ordered ({ord.items.reduce((s, i) => s + i.quantity, 0)})
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {ord.items.map((it, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                              >
                                <img
                                  src={it.product.image}
                                  alt={it.product.name}
                                  className="w-10 h-10 object-cover rounded-md border border-neutral-200"
                                />
                                <div>
                                  <div className="text-neutral-900 font-normal line-clamp-1 max-w-[200px]">
                                    {it.product.name}
                                  </div>
                                  <div className="text-[11px] text-neutral-500 font-mono-tabular">
                                    Size: {it.selectedSize} · {it.selectedColor.name} · Qty: {it.quantity} · ${it.product.price}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ARTICLES & INVENTORY */}
          {activeTab === 'articles' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search articles by name or silhouette..."
                    value={articleSearch}
                    onChange={(e) => setArticleSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={articleCategoryFilter}
                    onChange={(e) => setArticleCategoryFilter(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-800 cursor-pointer font-normal"
                  >
                    <option value="all">All Categories ({products.length})</option>
                    <option value="tracksuits">Tracksuits</option>
                    <option value="jackets">Jackets</option>
                    <option value="leather">Leather Garments</option>
                    <option value="sportswear">Sportswear</option>
                    <option value="gymwear">Gym Wear</option>
                    <option value="streetwear">Streetwear</option>
                    <option value="caps_hats">Caps & Hats</option>
                  </select>

                  <button
                    onClick={() => setActiveTab('add_article')}
                    className="px-3.5 py-1.5 bg-[#121316] text-white text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Article</span>
                  </button>
                </div>
              </div>

              {/* Articles Grid / Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                      <img
                        src={art.image}
                        alt={art.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 inset-x-2 flex items-center justify-between text-[10px]">
                        <span className="px-2 py-0.5 bg-white/90 rounded backdrop-blur-xs font-mono text-neutral-800">
                          {art.genderLabel}
                        </span>
                        {art.isCustomAdded ? (
                          <span className="px-2 py-0.5 bg-amber-500 text-white rounded">
                            Custom Added
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-neutral-900/80 text-white rounded">
                            Catalog Core
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3.5 space-y-2 text-xs flex-1 flex flex-col justify-between font-normal">
                      <div>
                        <div className="flex items-center justify-between text-neutral-400 text-[10px] uppercase">
                          <span>{art.categoryLabel}</span>
                          {art.gsm && <span className="font-mono">{art.gsm} GSM</span>}
                        </div>
                        <h4 className="text-sm font-normal text-neutral-900 line-clamp-1 mt-0.5">
                          {art.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-mono text-neutral-900 font-medium">
                            ${art.price}
                          </span>
                          {art.originalPrice && (
                            <span className="text-neutral-400 font-mono line-through text-[11px]">
                              ${art.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                        <button
                          onClick={() => onToggleProductStock(art.id)}
                          className={`text-[11px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                            art.inStock
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          }`}
                        >
                          {art.inStock ? '● In Stock' : '○ Out of Stock'}
                        </button>

                        {art.isCustomAdded && (
                          <button
                            onClick={() => onDeleteProduct(art.id)}
                            className="p-1 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete custom article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ADD NEW ARTICLE FORM */}
          {activeTab === 'add_article' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {formSuccessMessage && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>
                    New article "{articleForm.name}" was successfully added to the live store
                    catalog!
                  </span>
                </div>
              )}

              <form onSubmit={handleCreateArticleSubmit} className="space-y-5 text-xs font-normal">
                <div className="border-b border-neutral-200 pb-3">
                  <h4 className="text-base font-normal font-display text-neutral-900">
                    Add New Garment Article to Storefront
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5 font-light">
                    The newly created garment will instantly show up in the catalog, filters, and
                    shopping bag.
                  </p>
                </div>

                {/* 1. Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-neutral-700 mb-1 font-normal">
                      Article Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sialkot Luxury Double-Fleece Tracksuit"
                      value={articleForm.name}
                      onChange={(e) => setArticleForm({ ...articleForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">Category *</label>
                    <select
                      value={articleForm.category}
                      onChange={(e) =>
                        setArticleForm({ ...articleForm, category: e.target.value as Category })
                      }
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal cursor-pointer"
                    >
                      <option value="tracksuits">Tracksuits (Men, Ladies, Kids)</option>
                      <option value="jackets">Jackets (Puffer, Varsity, Bomber)</option>
                      <option value="leather">Leather Garments</option>
                      <option value="sportswear">Sportswear & Technical Outerwear</option>
                      <option value="gymwear">Gym Wear & Compression Sets</option>
                      <option value="streetwear">Streetwear Core</option>
                      <option value="caps_hats">Caps & Hats</option>
                      <option value="hoodies">French Terry Hoodies</option>
                      <option value="tees">Tees & Tops</option>
                      <option value="trousers">Cargo Pants & Trousers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">
                      Target Audience / Gender *
                    </label>
                    <select
                      value={articleForm.gender}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          gender: e.target.value as 'men' | 'ladies' | 'kids' | 'unisex',
                        })
                      }
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal cursor-pointer"
                    >
                      <option value="men">Men's Apparel</option>
                      <option value="ladies">Ladies / Women's Apparel</option>
                      <option value="kids">Kids & Juniors</option>
                      <option value="unisex">Unisex Silhouette</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">
                      Selling Price ($ USD) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={articleForm.price}
                      onChange={(e) =>
                        setArticleForm({ ...articleForm, price: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg font-mono font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">
                      Original Price ($ USD) (Optional Sale Slash)
                    </label>
                    <input
                      type="number"
                      min={1}
                      placeholder="e.g. 195"
                      value={articleForm.originalPrice}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          originalPrice: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg font-mono font-normal"
                    />
                  </div>
                </div>

                {/* 2. Fabric & Technical Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-neutral-100">
                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">Silhouette / Fit</label>
                    <select
                      value={articleForm.fit}
                      onChange={(e) =>
                        setArticleForm({ ...articleForm, fit: e.target.value as FitType })
                      }
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg font-normal cursor-pointer"
                    >
                      <option value="Relaxed">Relaxed Fit</option>
                      <option value="Oversized">Oversized Fit</option>
                      <option value="Athletic Fit">Athletic Fit (Sport/Gym)</option>
                      <option value="Tailored">Tailored Cut</option>
                      <option value="Boxy">Boxy Cut</option>
                      <option value="Regular">Regular Fit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">GSM Weight</label>
                    <input
                      type="number"
                      placeholder="e.g. 460"
                      value={articleForm.gsm}
                      onChange={(e) =>
                        setArticleForm({ ...articleForm, gsm: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg font-mono font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">Badge / Label</label>
                    <input
                      type="text"
                      placeholder="e.g. Latest Design, New Arrival"
                      value={articleForm.badge}
                      onChange={(e) => setArticleForm({ ...articleForm, badge: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg font-normal"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-neutral-700 mb-1 font-normal">
                      Fabric Composition
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 100% Combed Aegean Cotton Loopback Fleece"
                      value={articleForm.fabric}
                      onChange={(e) => setArticleForm({ ...articleForm, fabric: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg font-normal"
                    />
                  </div>
                </div>

                {/* 3. Image Selection & Upload */}
                <div className="pt-3 border-t border-neutral-100 space-y-3 font-normal">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <label className="block text-neutral-800 font-normal">
                        Product Picture / Photo *
                      </label>
                      <span className="text-[11px] text-neutral-500 font-light">
                        Upload directly from your phone gallery, take a photo with your camera, or choose a preset.
                      </span>
                    </div>

                    {/* Mode Switcher Tabs */}
                    <div className="flex items-center p-0.5 bg-neutral-100 rounded-lg text-[11px] font-normal border border-neutral-200 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setImageUploadMode('upload')}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                          imageUploadMode === 'upload'
                            ? 'bg-white text-neutral-900 shadow-xs'
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload from Phone/PC</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setImageUploadMode('preset')}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                          imageUploadMode === 'preset'
                            ? 'bg-white text-neutral-900 shadow-xs'
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Studio Presets</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setImageUploadMode('url')}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                          imageUploadMode === 'url'
                            ? 'bg-white text-neutral-900 shadow-xs'
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                      >
                        <span>Web Link</span>
                      </button>
                    </div>
                  </div>

                  {/* MODE 1: DIRECT FILE UPLOAD (PHONE GALLERY / CAMERA / PC) */}
                  {imageUploadMode === 'upload' && (
                    <div className="space-y-3">
                      <label
                        htmlFor="article-photo-upload"
                        className="border-2 border-dashed border-neutral-300 hover:border-neutral-900 bg-neutral-50/70 hover:bg-neutral-100/70 rounded-xl p-5 sm:p-7 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                      >
                        <input
                          id="article-photo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-neutral-200 flex items-center justify-center text-neutral-700 group-hover:scale-105 transition-transform mb-3">
                          <Camera className="w-6 h-6 text-neutral-800" />
                        </div>
                        <div className="text-sm text-neutral-900 font-normal">
                          Tap or click here to upload photo
                        </div>
                        <div className="text-xs text-neutral-500 mt-1 max-w-sm">
                          Select a picture from your <span className="text-neutral-800 font-medium">phone camera</span>, <span className="text-neutral-800 font-medium">photo library</span>, or <span className="text-neutral-800 font-medium">computer files</span>.
                        </div>
                        <div className="mt-3 px-3 py-1 bg-white border border-neutral-200 rounded-full text-[11px] text-neutral-600 flex items-center gap-1.5 shadow-2xs">
                          <Upload className="w-3 h-3 text-neutral-500" />
                          <span>Supports JPG, PNG, WEBP, HEIC</span>
                        </div>
                      </label>
                    </div>
                  )}

                  {/* MODE 2: PRESET STUDIO PHOTOS */}
                  {imageUploadMode === 'preset' && (
                    <div className="space-y-2">
                      <div className="text-xs text-neutral-500 font-light">
                        Click any studio garment photo below to use it for this article:
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {PRESET_IMAGES.map((preset) => {
                          const isSelected = articleForm.image === preset.url;
                          return (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() => {
                                setArticleForm({ ...articleForm, image: preset.url });
                                setUploadFileName('');
                              }}
                              className={`relative aspect-[3/4] rounded-lg overflow-hidden border cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-neutral-900 ring-2 ring-neutral-900'
                                  : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={preset.url}
                                alt={preset.label}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] truncate px-1 py-0.5 text-center">
                                {preset.label}
                              </span>
                              {isSelected && (
                                <div className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                                  <Check className="w-2.5 h-2.5" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* MODE 3: CUSTOM WEB IMAGE URL */}
                  {imageUploadMode === 'url' && (
                    <div className="space-y-2">
                      <div className="text-xs text-neutral-500 font-light">
                        Paste the direct URL of an image hosted online:
                      </div>
                      <input
                        type="url"
                        placeholder="https://example.com/images/my-new-tracksuit.jpg"
                        value={articleForm.image}
                        onChange={(e) => {
                          setArticleForm({ ...articleForm, image: e.target.value });
                          setUploadFileName('');
                        }}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg font-mono text-xs font-normal"
                      />
                    </div>
                  )}

                  {/* ACTIVE PHOTO PREVIEW CARD */}
                  {articleForm.image && (
                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center gap-3">
                      <div className="w-16 h-20 bg-neutral-200 rounded-lg overflow-hidden shrink-0 border border-neutral-300">
                        <img
                          src={articleForm.image}
                          alt="Article preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Selected Picture Active</span>
                        </div>
                        <div className="text-neutral-500 text-[11px] truncate mt-0.5">
                          {uploadFileName ? `Uploaded: ${uploadFileName}` : articleForm.image}
                        </div>
                        <label
                          htmlFor="article-photo-upload"
                          className="inline-block mt-1 text-[11px] text-neutral-800 hover:text-black underline cursor-pointer"
                        >
                          Click to replace with another photo
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Sizes & Colors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">
                      Available Sizes (Click to toggle)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'Kids 4-5Y', 'Kids 6-7Y', 'Kids 8-9Y', 'One Size'].map(
                        (sz) => {
                          const active = articleForm.selectedSizes.includes(sz);
                          return (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => toggleSize(sz)}
                              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                                active
                                  ? 'bg-[#121316] text-white border-black'
                                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">
                      Available Colors (Click to toggle)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_COLORS.map((col) => {
                        const active = articleForm.selectedColors.some((c) => c.name === col.name);
                        return (
                          <button
                            key={col.name}
                            type="button"
                            onClick={() => toggleColor(col)}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] cursor-pointer transition-colors ${
                              active
                                ? 'bg-neutral-900 text-white border-black'
                                : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            <span
                              className="w-3 h-3 rounded-full border border-neutral-300"
                              style={{ backgroundColor: col.hex }}
                            />
                            <span>{col.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 5. Tagline & Description */}
                <div className="space-y-3 pt-2 border-t border-neutral-100">
                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">
                      Short Tagline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 460 GSM Heavy Combed Cotton. 2-Piece matching zip set."
                      value={articleForm.tagline}
                      onChange={(e) => setArticleForm({ ...articleForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-1 font-normal">
                      Full Description & Craftsmanship Details
                    </label>
                    <textarea
                      rows={3}
                      value={articleForm.description}
                      onChange={(e) =>
                        setArticleForm({ ...articleForm, description: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg font-normal"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab('articles')}
                    className="px-4 py-2 text-neutral-600 hover:text-black cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#121316] text-white text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md font-normal"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Article to Storefront</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
