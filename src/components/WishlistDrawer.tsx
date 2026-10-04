import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Product } from '../types/store';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCartFromWishlist: (product: Product, size: string) => void;
}

export function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCartFromWishlist,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200 font-normal">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside aria-label="Saved pieces" className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between font-normal">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h2 className="text-base font-normal font-display uppercase tracking-tight text-neutral-900">
                Saved Pieces ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100 font-normal">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-normal text-neutral-900 font-display">No saved garments yet</h3>
                  <p className="text-xs text-neutral-500 max-w-xs font-light">
                    Tap the heart icon on any piece to curate your personal wardrobe shortlist.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#121316] text-white text-xs font-normal uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              wishlist.map((prod) => (
                <div key={prod.id} className="py-4 flex gap-3.5">
                  <div className="w-20 aspect-[3/4] bg-[#F5F5F3] rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-normal text-neutral-900 line-clamp-1 leading-snug">
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(prod)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-neutral-500 mt-1 font-mono-tabular">
                        {prod.genderLabel} · ${prod.price}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 flex items-center gap-2">
                      <button
                        onClick={() => onAddToCartFromWishlist(prod, prod.sizes[0] || 'M')}
                        className="flex-1 py-1.5 px-3 bg-[#121316] hover:bg-neutral-800 text-white text-xs font-normal uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {wishlist.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-900 font-normal text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
