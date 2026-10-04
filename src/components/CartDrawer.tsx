import { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Check, MessageCircle } from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
}

const FREE_SHIPPING_THRESHOLD = 50;

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountRate = appliedPromo === 'YBS10' ? 0.1 : appliedPromo === 'WELCOME15' ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = items.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : 6.0;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput.trim().toUpperCase());
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const whatsappCartMessage = encodeURIComponent(
    `Hello YBS Apparels (Sialkot, Pakistan)!\nI would like to order my shopping bag:\n` +
      items.map((i) => `- ${i.product.name} (Size: ${i.selectedSize}, Color: ${i.selectedColor.name}, Qty: ${i.quantity})`).join('\n') +
      `\n\nTotal: $${total.toFixed(2)}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200 font-normal">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside aria-label="Shopping bag" className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between font-normal">
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#121316]" />
              <h2 className="text-base font-normal font-display uppercase tracking-tight text-neutral-900">
                Shopping Bag ({items.reduce((acc, it) => acc + it.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-neutral-50 px-5 py-3 border-b border-neutral-200 text-xs font-normal">
            <div className="flex items-center justify-between mb-1.5 font-normal">
              <span className="flex items-center gap-1.5 text-neutral-700">
                <Truck className="w-3.5 h-3.5 text-neutral-900" />
                {qualifiesForFreeShipping ? (
                  <span className="text-emerald-700">Unlocked Free Express Shipping!</span>
                ) : (
                  <span>Add <span className="font-mono-tabular text-neutral-900">${amountNeededForFreeShipping.toFixed(2)}</span> more for Free Shipping</span>
                )}
              </span>
              <span className="font-mono-tabular text-neutral-500">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#121316] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100 font-normal">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-normal text-neutral-900 font-display">Your bag is empty</h3>
                  <p className="text-xs text-neutral-500 max-w-xs font-light">
                    Explore tracksuits, jackets, leather garments, and gym wear crafted in Sialkot, Pakistan.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#121316] text-white text-xs font-normal uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-3.5">
                  <div className="w-20 aspect-[3/4] bg-[#F5F5F3] rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-normal text-neutral-900 line-clamp-1 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1 font-normal">
                        <span>Size: <span className="text-neutral-800 font-mono">{item.selectedSize}</span></span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-neutral-800">{item.selectedColor.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100">
                      <div className="flex items-center border border-neutral-200 rounded-md bg-neutral-50 font-normal">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-200 cursor-pointer font-normal"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono-tabular font-normal min-w-[1.8rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-200 cursor-pointer font-normal"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-normal font-mono-tabular text-neutral-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50/70 space-y-3.5 font-normal">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-normal">
                    <span className="flex items-center gap-1.5 font-normal">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Promo <span className="font-mono">{appliedPromo}</span> applied ({appliedPromo === 'YBS10' ? '10%' : '15%'} off)
                    </span>
                    <button
                      onClick={onRemovePromo}
                      className="text-emerald-700 hover:text-emerald-900 underline font-normal cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePromoSubmit} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. YBS10)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 uppercase font-normal"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-normal rounded-lg hover:bg-neutral-800 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && !appliedPromo && (
                  <p className={`text-[11px] mt-1 ${promoFeedback.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {promoFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 font-mono-tabular font-normal">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedPromo})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-neutral-900">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-sans uppercase text-[11px]">Free</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-neutral-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-900 pt-2 border-t border-neutral-200 font-normal">
                  <span>Total</span>
                  <span className="text-base font-normal font-mono-tabular">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions: Checkout & WhatsApp Quick Order */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onCheckout}
                  className="w-full py-3 px-4 bg-[#121316] hover:bg-neutral-800 text-white font-normal text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/923078795405?text=${whatsappCartMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-normal text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Cart to WhatsApp (+92 307 8795405)</span>
                </a>
              </div>

              <div className="text-center text-[10px] text-neutral-500 uppercase tracking-wider font-normal">
                Dispatched from Sialkot, Pakistan · Worldwide Courier
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
