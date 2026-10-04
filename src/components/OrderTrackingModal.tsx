import { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, Home } from 'lucide-react';
import { Order } from '../types/store';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
}

export function OrderTrackingModal({ isOpen, onClose, recentOrders }: OrderTrackingModalProps) {
  const [searchInput, setSearchInput] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(
    recentOrders.length > 0 ? recentOrders[0] : null
  );

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = recentOrders.find(
      (o) =>
        o.id.toLowerCase() === searchInput.trim().toLowerCase() ||
        o.trackingNumber.toLowerCase() === searchInput.trim().toLowerCase()
    );
    if (found) {
      setActiveOrder(found);
    } else {
      const demoOrder: Order = {
        id: searchInput.trim().toUpperCase(),
        date: 'Today',
        items: [],
        customer: {
          fullName: 'Valued Client',
          email: 'ybsapperalindustries@gmail.com',
          phone: '+92 307 8795405',
          address: 'Main Industrial Blvd',
          city: 'Sialkot',
          postalCode: '51310',
          country: 'Pakistan',
        },
        deliveryMethod: 'express',
        paymentMethod: 'card',
        subtotal: 42,
        discount: 4.2,
        shippingFee: 0,
        tax: 3.02,
        total: 40.82,
        status: 'Quality Check',
        trackingNumber: 'TRK-984210',
        estimatedDelivery: 'Oct 06, 2026',
      };
      setActiveOrder(demoOrder);
    }
  };

  const steps = [
    { label: 'Order Confirmed', desc: 'Fabric allotted at Sialkot facility', icon: Clock, done: true },
    { label: 'Stitch & QC', desc: 'Precision garment dye & double-needle pass', icon: CheckCircle2, done: true },
    { label: 'Dispatched', desc: 'Handed to express international courier', icon: Truck, done: true },
    { label: 'Out for Delivery', desc: 'Arriving at destination address', icon: Home, done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in font-normal">
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 font-normal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-500 mb-1 font-normal">
          <Package className="w-4 h-4 text-[#121316]" />
          <span>Sialkot Logistics Network</span>
        </div>

        <h3 className="text-lg font-normal font-display text-neutral-900 mb-4">
          Track Your YBS Garment Order
        </h3>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. YBS-104928) or Tracking Code"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 uppercase font-mono font-normal"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#121316] text-white text-xs font-normal uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Locate
          </button>
        </form>

        {activeOrder ? (
          <div className="space-y-5 font-normal">
            {/* Order status card */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-wrap items-center justify-between gap-4 font-mono-tabular text-xs">
              <div>
                <span className="text-neutral-500 block">Order Reference</span>
                <span className="text-neutral-900 text-sm font-normal">{activeOrder.id}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Tracking Number</span>
                <span className="text-neutral-900 font-normal">{activeOrder.trackingNumber}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Estimated Arrival</span>
                <span className="text-emerald-700 font-normal">{activeOrder.estimatedDelivery}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="py-2">
              <h4 className="text-xs uppercase tracking-wider text-neutral-700 mb-4 font-normal">
                Fulfillment Timeline
              </h4>
              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                {steps.map((st, idx) => (
                  <div key={idx} className="relative flex items-start gap-3">
                    <span
                      className={`absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-white ${
                        st.done ? 'bg-[#121316]' : 'bg-neutral-300'
                      }`}
                    >
                      <st.icon className="w-2.5 h-2.5" />
                    </span>
                    <div>
                      <div className="text-xs text-neutral-900 font-normal">{st.label}</div>
                      <div className="text-[11px] text-neutral-500 font-light">{st.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery address */}
            <div className="p-3 bg-neutral-100/70 rounded-xl text-xs space-y-1 font-normal">
              <span className="text-neutral-800 block">Delivery Address:</span>
              <p className="text-neutral-600 font-mono-tabular font-light">
                {activeOrder.customer.fullName} · {activeOrder.customer.address}, {activeOrder.customer.city}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-neutral-500 text-xs bg-neutral-50 rounded-xl border border-dashed border-neutral-200 font-light">
            No active shipment selected. Enter your order ID or tracking code above to query our fulfillment network.
          </div>
        )}
      </div>
    </div>
  );
}
