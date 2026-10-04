import { useState } from 'react';
import { Heart, Plus, Check, Star } from 'lucide-react';
import { Product } from '../types/store';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export function ProductCard({
  product,
  onSelectProduct,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [quickSizeOpen, setQuickSizeOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleQuickAddSize = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    onQuickAdd(product, size);
    setAddedAnimation(true);
    setQuickSizeOpen(false);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="group flex flex-col bg-white border border-neutral-200/80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Visual Slot: 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full bg-[#F5F5F3] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 text-neutral-400 p-6 text-center font-normal">
            <span className="text-2xl font-display text-neutral-400 mb-1">YBS</span>
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-normal">{product.name}</span>
          </div>
        )}

        {/* Top Floating Controls */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 bg-white/90 backdrop-blur-sm text-neutral-900 rounded shadow-xs">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors pointer-events-auto cursor-pointer shadow-xs ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                : 'bg-white/80 text-neutral-700 hover:bg-white hover:text-neutral-900'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Add Floating Panel on Hover */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 inset-x-3 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          {quickSizeOpen ? (
            <div className="bg-[#121316] text-white p-2.5 rounded-lg shadow-xl text-center space-y-2 animate-in fade-in zoom-in-95">
              <div className="text-[10px] font-normal uppercase tracking-wider text-neutral-300">
                Select Size
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={(e) => handleQuickAddSize(e, sz)}
                    className="px-2 py-1 text-xs font-mono font-normal bg-neutral-800 hover:bg-white hover:text-black rounded transition-colors cursor-pointer"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setQuickSizeOpen(true);
              }}
              className="w-full py-2.5 px-3 bg-white/95 hover:bg-white text-neutral-900 text-xs font-medium uppercase tracking-wider rounded-lg shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Added to Bag</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Card Content & Metadata - Clean, non-bold typography */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Category kicker & GSM - Unboxed metadata */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 uppercase tracking-wider font-normal">
            <span>{product.genderLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryLabel}</span>
            {product.gsm && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{product.gsm} GSM</span>
              </>
            )}
          </div>

          <h3 className="mt-1 text-sm font-medium text-neutral-900 leading-snug line-clamp-1 group-hover:text-black">
            {product.name}
          </h3>
        </div>

        {/* Color swatches preview */}
        <div className="flex items-center gap-1.5 pt-0.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-2.5 h-2.5 rounded-full border border-neutral-300 shrink-0"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="text-[11px] text-neutral-500 ml-1 font-normal">
            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
          </span>
        </div>

        {/* Price & Rating Row */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-normal font-mono-tabular text-neutral-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono-tabular text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-neutral-600 font-normal">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono-tabular">{product.rating.toFixed(1)}</span>
            <span className="text-neutral-400">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
}
