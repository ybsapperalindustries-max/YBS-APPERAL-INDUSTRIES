import { useState } from 'react';
import { X, Building2, CheckCircle2, Mail, Send } from 'lucide-react';

interface B2BModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function B2BModal({ isOpen, onClose }: B2BModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: 'ybsapperalindustries@gmail.com',
    phone: '',
    category: 'Heavyweight French Terry Hoodies (480 GSM)',
    quantity: '100 - 300 units',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4 font-normal">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-normal font-display text-neutral-900">
              Inquiry Dispatched to Mill Engineers
            </h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed font-light">
              Thank you for contacting <span className="text-neutral-900 font-normal">YBS Apparel Industries</span>. Our manufacturing and sampling director will review your technical specifications and respond at <span className="text-neutral-900 font-mono">{formData.email}</span> within 24 business hours.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#121316] text-white text-xs font-normal uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div className="font-normal">
            <div className="flex items-center gap-2 text-xs font-normal uppercase tracking-wider text-neutral-500 mb-1">
              <Building2 className="w-4 h-4 text-[#121316]" />
              <span>YBS Apparel Industries · Commercial Division</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-normal font-display text-neutral-900 mb-2">
              Wholesale, Blanks & Private Label Sourcing
            </h3>

            <p className="text-xs text-neutral-600 mb-6 leading-relaxed font-light">
              Direct-from-mill supply for high-end streetwear brands, corporate capsules, and boutique retail lines. Minimum order quantity (MOQ) starts at 50 units per colorway.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-normal">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-normal mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-normal mb-1">Brand or Entity Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Atelier Studio"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-normal mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-normal mb-1">Direct Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-normal mb-1">Primary Garment Program</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 cursor-pointer font-normal"
                  >
                    <option value="Sialkot Tracksuit Sets (Matching 460 GSM)">Sialkot Tracksuit Sets (Matching 460 GSM)</option>
                    <option value="Technical Sportswear & Shell Windbreakers">Technical Sportswear & Shell Windbreakers</option>
                    <option value="Gym Wear & Active Compression Suits">Gym Wear & Active Compression Suits</option>
                    <option value="Heavyweight French Terry Hoodies (480 GSM)">Heavyweight French Terry Hoodies (480 GSM)</option>
                    <option value="280 GSM Boxy Cut Combed Tees">280 GSM Boxy Cut Combed Tees</option>
                    <option value="340 GSM Utility Cargo Trousers">340 GSM Utility Cargo Trousers</option>
                    <option value="Custom Mixed Capsule Program">Custom Mixed Capsule Program</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-700 font-normal mb-1">Estimated Initial Volume</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 cursor-pointer font-mono-tabular font-normal"
                  >
                    <option value="50 - 100 units">50 - 100 units (Sampling run)</option>
                    <option value="100 - 300 units">100 - 300 units</option>
                    <option value="300 - 1,000 units">300 - 1,000 units</option>
                    <option value="1,000+ units">1,000+ units (Tier 1 Production)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-normal mb-1">Custom Notes, Colors, or Screenprint/Embroidery Specs</label>
                <textarea
                  rows={3}
                  placeholder="Detail your desired GSM, wash treatments, custom neck labels, or timeline requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-normal"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-neutral-600 font-normal">
                <div>
                  <span className="font-normal text-neutral-900 block">Facility: Sialkot, Punjab, Pakistan</span>
                  <span>Direct WhatsApp: <span className="font-mono text-emerald-700 font-normal">+92 307 8795405</span></span>
                </div>
                <a
                  href="https://wa.me/923078795405?text=Hello%20YBS%20Apparel%20Industries,%20I%20have%20a%20B2B%20wholesale%20manufacturing%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-900 underline font-normal"
                >
                  Quick WhatsApp Chat ↗
                </a>
              </div>

              <div className="pt-2 flex items-center justify-between font-normal">
                <div className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-neutral-800" />
                  <span>Direct: <span className="text-neutral-800 font-mono font-normal">ybsapperalindustries@gmail.com</span></span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#121316] text-white font-normal text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
