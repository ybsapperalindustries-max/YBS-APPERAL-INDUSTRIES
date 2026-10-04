import { useState } from 'react';
import {
  X,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  PackageCheck,
  Landmark,
  Smartphone,
  MessageCircle,
} from 'lucide-react';
import { CartItem, Order } from '../types/store';
import { YBSMonogram } from './YBSLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromo: string | null;
  onOrderCompleted: (order: Order) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  appliedPromo,
  onOrderCompleted,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'shipping' | 'delivery' | 'payment' | 'confirmation'>('shipping');

  const [formData, setFormData] = useState({
    fullName: 'Alex Rivera',
    email: 'ybsapperalindustries@gmail.com',
    phone: '+92 307 8795405',
    address: '742 Evergreen Parkway, Apt 4B',
    city: 'Sialkot / International',
    state: 'Punjab',
    postalCode: '51310',
    country: 'Pakistan',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'online_bank' | 'jazzcash_easypaisa' | 'cod'>('card');
  const [transactionRef, setTransactionRef] = useState('');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '•••• •••• •••• 4242',
    expiry: '08/28',
    cvv: '921',
    cardName: 'Alex Rivera',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  const discountRate = appliedPromo === 'YBS10' ? 0.1 : appliedPromo === 'WELCOME15' ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const standardShippingFee = subtotal >= 50 ? 0 : 6.0;
  const shippingFee = deliveryMethod === 'express' ? 12.0 : standardShippingFee;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderNum = 'YBS-' + Math.floor(100000 + Math.random() * 900000);
      const trackingCode = 'TRK-' + Math.random().toString(36).substring(2, 9).toUpperCase();

      const newOrder: Order = {
        id: orderNum,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...items],
        customer: { ...formData },
        deliveryMethod,
        paymentMethod,
        paymentReference: transactionRef || undefined,
        subtotal,
        discount: discountAmount,
        shippingFee,
        tax,
        total,
        status: 'Order Placed',
        trackingNumber: trackingCode,
        estimatedDelivery: deliveryMethod === 'express' ? '2-3 Business Days' : '4-6 Business Days',
      };

      setCreatedOrder(newOrder);
      onOrderCompleted(newOrder);
      setIsProcessing(false);
      setStep('confirmation');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in font-normal">
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto font-normal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-[#FBFBF9]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#121316] text-white rounded-xl flex items-center justify-center shrink-0">
              <YBSMonogram size={22} color="#FFFFFF" accentColor="#D4AF37" />
            </div>
            <div>
              <span className="text-[11px] font-normal uppercase tracking-widest text-neutral-500 block">
                YBS Apparel Industries · Sialkot, Pakistan
              </span>
              <h3 className="text-base sm:text-lg font-normal font-display uppercase tracking-tight text-neutral-900">
                {step === 'confirmation' ? 'Order Confirmed' : 'Checkout & Payment'}
              </h3>
            </div>
          </div>
          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {step !== 'confirmation' && (
          <div className="px-6 py-2.5 bg-neutral-100/60 border-b border-neutral-200 flex items-center justify-between text-xs font-normal uppercase tracking-wider">
            <div className={`flex items-center gap-1.5 ${step === 'shipping' ? 'text-black' : 'text-neutral-400'}`}>
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-mono">1</span>
              <span>Shipping</span>
            </div>
            <span className="text-neutral-300">──</span>
            <div className={`flex items-center gap-1.5 ${step === 'delivery' ? 'text-black' : 'text-neutral-400'}`}>
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-mono">2</span>
              <span>Delivery</span>
            </div>
            <span className="text-neutral-300">──</span>
            <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-black' : 'text-neutral-400'}`}>
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-mono">3</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 'shipping' && (
            <div className="space-y-4 font-normal">
              <h4 className="text-xs uppercase tracking-wide text-neutral-900 font-normal">
                Delivery Destination
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-600 mb-1 font-normal">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-normal">Email for Order Updates</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-neutral-600 mb-1 font-normal">Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-normal">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-600 mb-1 font-normal">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1 font-normal">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => setStep('delivery')}
                  className="px-6 py-2.5 bg-[#121316] text-white text-xs font-normal uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY OPTIONS */}
          {step === 'delivery' && (
            <div className="space-y-4 font-normal">
              <h4 className="text-xs uppercase tracking-wide text-neutral-900 font-normal">
                Select Shipping Method
              </h4>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-[#121316] bg-neutral-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-neutral-800" />
                    <div>
                      <div className="text-xs text-neutral-900 font-medium">Standard Insured Courier</div>
                      <div className="text-xs text-neutral-500">4-6 Business Days · Dispatched from Sialkot</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono-tabular text-neutral-900">
                    {standardShippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `$${standardShippingFee.toFixed(2)}`}
                  </div>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-[#121316] bg-neutral-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="text-xs text-neutral-900 font-medium">Priority Express Air Cargo</div>
                      <div className="text-xs text-neutral-500">2-3 Business Days · Direct Air Waybill</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono-tabular text-neutral-900">
                    $12.00
                  </div>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setStep('shipping')}
                  className="px-4 py-2 text-xs font-normal text-neutral-600 hover:text-black flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => setStep('payment')}
                  className="px-6 py-2.5 bg-[#121316] text-white text-xs font-normal uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & SUMMARY */}
          {step === 'payment' && (
            <div className="space-y-5 font-normal">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs uppercase tracking-wide text-neutral-900 font-normal">
                    Select Online Payment Method
                  </h4>
                  <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-normal">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit SSL Encrypted</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {[
                    { id: 'card', label: 'Online Card', icon: CreditCard },
                    { id: 'online_bank', label: 'Online Bank / Raast', icon: Landmark },
                    { id: 'jazzcash_easypaisa', label: 'JazzCash / EasyPaisa', icon: Smartphone },
                    { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-xl border text-xs font-normal flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === pm.id
                          ? 'border-[#121316] bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <pm.icon className="w-4 h-4" />
                      <span className="text-center leading-tight">{pm.label}</span>
                    </button>
                  ))}
                </div>

                {/* Method 1: Online Card */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3 text-xs font-normal">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-900">Online Card Gateway</span>
                      <span className="text-neutral-500 font-mono">Visa · MasterCard · UnionPay</span>
                    </div>
                    <div>
                      <label className="block text-neutral-600 mb-1 font-normal">Card Number</label>
                      <input
                        type="text"
                        value={cardInfo.cardNumber}
                        onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg font-mono font-normal"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-neutral-600 mb-1 font-normal">Expiration</label>
                        <input
                          type="text"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg font-mono font-normal"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-600 mb-1 font-normal">CVV / CVC</label>
                        <input
                          type="text"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg font-mono font-normal"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Method 2: Online Bank Transfer / Raast */}
                {paymentMethod === 'online_bank' && (
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3 text-xs font-normal">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-900 font-medium">Direct Online Bank Transfer / Raast</span>
                      <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono">Instant Verify</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-white rounded-lg border border-neutral-200 font-mono-tabular">
                      <div>
                        <span className="text-neutral-400 block text-[11px]">Bank:</span>
                        <span className="text-neutral-900 font-sans">Meezan Bank Ltd / Allied Bank</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[11px]">Account Title:</span>
                        <span className="text-neutral-900 font-sans">YBS APPAREL INDUSTRIES</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[11px]">Branch:</span>
                        <span className="text-neutral-900 font-sans">Sialkot Main Branch, Pakistan</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[11px]">Raast ID:</span>
                        <span className="text-emerald-700 font-mono">03078795405</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-neutral-400 block text-[11px]">IBAN:</span>
                        <span className="text-neutral-900 font-mono">PK36MEZN0001090104829102</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-neutral-700 mb-1 font-normal">
                        Bank Transaction ID / Reference (or Sender Name)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. TR-948201 or Ali Khan"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg font-mono focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                      />
                      <p className="text-[11px] text-neutral-500 mt-1 font-light">
                        Share payment screenshot to WhatsApp <span className="text-emerald-700 font-mono">+92 307 8795405</span> for instant dispatch.
                      </p>
                    </div>
                  </div>
                )}

                {/* Method 3: JazzCash / EasyPaisa */}
                {paymentMethod === 'jazzcash_easypaisa' && (
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3 text-xs font-normal">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-900 font-medium">JazzCash / EasyPaisa Mobile Online Account</span>
                      <span className="text-[11px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono">0% Fee</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-1 font-mono-tabular">
                      <div className="flex justify-between">
                        <span className="text-neutral-500 font-sans">Account Title:</span>
                        <span className="text-neutral-900 font-sans">YBS Apparel Industries</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500 font-sans">Mobile Wallet:</span>
                        <span className="text-emerald-700 font-mono">03078795405</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500 font-sans">Location:</span>
                        <span className="text-neutral-800 font-sans">Sialkot, Pakistan</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-neutral-700 mb-1 font-normal">
                        6-Digit Transaction ID (TID)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 849201"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg font-mono focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                      />
                      <p className="text-[11px] text-neutral-500 mt-1 font-light">
                        Send to <span className="text-neutral-900 font-mono">03078795405</span> and enter the transaction ID.
                      </p>
                    </div>
                  </div>
                )}

                {/* Method 4: Cash on Delivery */}
                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 leading-relaxed space-y-1 font-normal">
                    <p className="text-neutral-900 flex items-center gap-1.5 font-medium">
                      <Truck className="w-4 h-4 text-neutral-800" />
                      <span>Cash on Delivery (Pay at Doorstep)</span>
                    </p>
                    <p className="font-light">
                      Dispatched directly from our Sialkot manufacturing hub. Inspect the parcel upon arrival and hand over payment to courier.
                    </p>
                  </div>
                )}
              </div>

              {/* Order total recap */}
              <div className="p-4 bg-neutral-100 rounded-xl space-y-1.5 text-xs font-mono-tabular font-normal">
                <div className="flex justify-between text-neutral-600">
                  <span>Items Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Promo Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping ({deliveryMethod})</span>
                  <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-900 pt-2 border-t border-neutral-200 font-normal">
                  <span>Grand Total</span>
                  <span className="text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep('delivery')}
                  className="px-4 py-2 text-xs font-normal text-neutral-600 hover:text-black flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="px-7 py-3 bg-[#121316] text-white text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 font-normal"
                >
                  {isProcessing ? (
                    <span>Authorizing Order...</span>
                  ) : (
                    <span>Place Order · ${total.toFixed(2)}</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMATION */}
          {step === 'confirmation' && createdOrder && (
            <div className="py-6 text-center space-y-5 font-normal">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <PackageCheck className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-emerald-700 font-normal">
                  Order Successfully Placed
                </span>
                <h3 className="text-xl sm:text-2xl font-normal font-display text-neutral-900">
                  Thank You, {createdOrder.customer.fullName}
                </h3>
                <p className="text-xs text-neutral-500 font-mono-tabular font-light">
                  Confirmation receipt dispatched to <span className="text-neutral-800">{createdOrder.customer.email}</span>
                </p>
              </div>

              {/* Order Info Card */}
              <div className="max-w-md mx-auto p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-left text-xs space-y-2.5 font-mono-tabular font-normal">
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Order Reference</span>
                  <span className="text-neutral-900">{createdOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Tracking Code</span>
                  <span className="text-neutral-900">{createdOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Estimated Delivery</span>
                  <span className="text-neutral-900">{createdOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500">Total Billed</span>
                  <span className="text-base text-neutral-900">${createdOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/923078795405?text=${encodeURIComponent(
                    `Hello YBS Apparels (Sialkot, Pakistan)!\nHere is my Order Confirmation:\n- Order ID: ${createdOrder.id}\n- Name: ${createdOrder.customer.fullName}\n- Payment: ${createdOrder.paymentMethod}\n- Total: $${createdOrder.total.toFixed(2)}\n- Reference: ${createdOrder.paymentReference || 'N/A'}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm font-normal"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Receipt to WhatsApp (+92 307 8795405)</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#121316] text-white text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer font-normal"
                >
                  Continue Browsing Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
