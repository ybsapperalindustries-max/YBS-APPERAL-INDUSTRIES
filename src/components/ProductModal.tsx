import { useState, useEffect } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, Heart, Check, Ruler, ChevronRight, MessageCircle } from 'lucide-react';
import { Product, ProductColor } from '../types/store';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  onBuyNow: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: (product: Product) => void;
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
}: ProductModalProps) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care' | 'reviews'>('details');
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedSize(product.sizes[0] || 'M');
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    setAddedSuccess(false);
  }, [product]);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200 font-normal">
      <div
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-neutral-100 text-neutral-700 hover:text-black rounded-full shadow-md transition-colors cursor-pointer"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Gallery */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-[3/4] w-full bg-[#F5F5F3] rounded-xl overflow-hidden border border-neutral-200">
                <img
                  src={selectedImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 text-xs font-normal tracking-wider uppercase px-3 py-1 bg-[#121316] text-white rounded-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {product.gallery.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 aspect-[3/4] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        selectedImage === img ? 'border-[#121316] opacity-100' : 'border-neutral-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="lg:col-span-5 flex flex-col space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-normal uppercase tracking-widest text-neutral-500 mb-1">
                  <span>{product.genderLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.categoryLabel}</span>
                  {product.gsm && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{product.gsm} GSM</span>
                    </>
                  )}
                  <span aria-hidden="true">·</span>
                  <span>{product.fit}</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-normal font-display text-neutral-900 tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Wishlist */}
                <div className="flex items-center justify-between mt-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-normal text-neutral-700 font-mono-tabular">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono-tabular">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className="flex items-center gap-1 text-xs font-normal text-neutral-600 hover:text-black transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-neutral-500'
                      }`}
                    />
                    <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                  </button>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-normal font-mono-tabular text-neutral-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono-tabular text-neutral-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-normal font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      SAVE ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs font-normal text-neutral-600 bg-neutral-100 p-2.5 rounded-lg border-l-2 border-[#121316]">
                {product.tagline}
              </p>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between text-xs font-normal mb-2">
                  <span className="text-neutral-700 uppercase tracking-wider">
                    Color: <span className="text-neutral-900">{selectedColor.name}</span>
                  </span>
                  {!selectedColor.inStock && (
                    <span className="text-amber-700 text-[11px]">Sold out in this shade</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`relative w-7 h-7 rounded-full border transition-transform cursor-pointer flex items-center justify-center ${
                          isSelected ? 'scale-110 border-neutral-900' : 'border-neutral-300 hover:scale-105'
                        } ${!c.inStock ? 'opacity-40 cursor-not-allowed' : ''}`}
                        title={c.name}
                      >
                        <span
                          className="w-5 h-5 rounded-full block"
                          style={{ backgroundColor: c.hex }}
                        />
                        {isSelected && (
                          <Check className={`w-3 h-3 absolute ${c.hex === '#111214' || c.hex === '#161719' || c.hex === '#2B2D31' || c.hex === '#1C2430' || c.hex === '#0D0E10' ? 'text-white' : 'text-black'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector with Size Guide Trigger */}
              <div>
                <div className="flex items-center justify-between text-xs font-normal mb-2">
                  <span className="text-neutral-700 uppercase tracking-wider">
                    Size: <span className="text-neutral-900">{selectedSize}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenSizeGuide(product)}
                    className="inline-flex items-center gap-1 text-neutral-900 underline underline-offset-2 hover:text-black font-normal cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 text-xs font-mono font-normal rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#121316] text-white border-[#121316]'
                            : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Stock status */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wider text-neutral-600 font-normal">
                    Qty:
                  </span>
                  <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50 font-normal">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-neutral-700 hover:bg-neutral-200 transition-colors font-normal cursor-pointer"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-2.5 py-1 font-mono-tabular font-normal min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-neutral-700 hover:bg-neutral-200 transition-colors font-normal cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  {product.stockCount < 15 ? (
                    <span className="text-amber-700 font-mono-tabular">
                      Low Stock: only {product.stockCount} left
                    </span>
                  ) : (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      In Stock · Sialkot Mill
                    </span>
                  )}
                </div>
              </div>

              {/* Purchase Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-6 bg-[#121316] hover:bg-neutral-800 text-white font-normal text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Your Bag ({quantity})</span>
                    </>
                  ) : (
                    <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                  )}
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleBuyNow}
                    className="py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-normal text-xs uppercase tracking-wider rounded-xl border border-neutral-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Instant Checkout</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/923078795405?text=${encodeURIComponent(
                      `Hello YBS Apparels (Sialkot, Pakistan)!\nI would like to order:\n- Item: ${product.name}\n- Size: ${selectedSize}\n- Color: ${selectedColor.name}\n- Quantity: ${quantity}\n- Price: $${(product.price * quantity).toFixed(2)}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-normal text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                    <span className="truncate">WhatsApp Order (+923078795405)</span>
                  </a>
                </div>
              </div>

              {/* Trust badges */}
              <div className="pt-3 border-t border-neutral-200 grid grid-cols-3 gap-2 text-[11px] text-neutral-600 font-normal">
                <div className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                  <span>Free shipping $50+</span>
                </div>
                <div className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                  <span>30-day exchange</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                  <span>Sialkot Factory Direct</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Tabs Section */}
          <div className="mt-10 pt-6 border-t border-neutral-200">
            <div className="flex items-center gap-1 border-b border-neutral-200 pb-2 overflow-x-auto scrollbar-none">
              {[
                { id: 'details', label: 'Description & Fit' },
                { id: 'specs', label: 'Fabric & Specifications' },
                { id: 'care', label: 'Care Instructions' },
                { id: 'reviews', label: `Reviews (${product.reviews.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-normal uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#121316] text-white'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-5 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
              {activeTab === 'details' && (
                <div className="space-y-4 max-w-3xl">
                  <p>{product.description}</p>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-normal">
                    <div>
                      <span className="text-neutral-400 block">Silhouette:</span>
                      <span className="text-neutral-900">{product.fit}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Target:</span>
                      <span className="text-neutral-900">{product.genderLabel}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Pre-Shrunk:</span>
                      <span className="text-neutral-900">Garment Washed</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Origin:</span>
                      <span className="text-neutral-900">Sialkot, Pakistan</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-2.5 max-w-2xl text-xs font-normal">
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500">Textile Composition</span>
                    <span className="text-neutral-900">{product.fabric}</span>
                  </div>
                  {product.gsm && (
                    <div className="flex justify-between py-1.5 border-b border-neutral-100">
                      <span className="text-neutral-500">Density Rating</span>
                      <span className="text-neutral-900 font-mono-tabular">{product.gsm} GSM</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500">Stitching Spec</span>
                    <span className="text-neutral-900">Double-needle lockstitch seams & reinforced hem tape</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500">Origin / Facility</span>
                    <span className="text-neutral-900">YBS Apparel Industries, Sialkot, Pakistan</span>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-1.5 max-w-xl text-xs font-normal">
                  {product.careInstructions.map((instruction, idx) => (
                    <div key={idx} className="flex items-start gap-2 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#121316] mt-1.5 shrink-0" />
                      <span>{instruction}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4 font-normal">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5 text-xs font-normal">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-900 font-medium">{rev.author}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-neutral-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
                            }`}
                          />
                        ))}
                        <span className="text-neutral-500 ml-2">Fit: {rev.fitsTrueToSize}</span>
                      </div>
                      <h4 className="text-neutral-900 font-medium">{rev.title}</h4>
                      <p className="text-neutral-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
