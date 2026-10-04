import { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { Product } from '../types/store';

interface SizeGuideModalProps {
  product: Product | null;
  onClose: () => void;
}

export function SizeGuideModal({ product, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!product) return null;

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
          <Ruler className="w-4 h-4 text-[#121316]" />
          <span>Size & Fit Calibration</span>
        </div>

        <h3 className="text-lg font-normal font-display text-neutral-900 mb-2">
          {product.name}
        </h3>

        <p className="text-xs text-neutral-600 mb-5 font-light">
          Cut in our signature <span className="text-neutral-900 font-normal">{product.fit}</span> silhouette. All garments are pre-shrunk in Sialkot industrial laundries before final stitching.
        </p>

        {/* Unit Selector Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-neutral-500 font-light">
            Measurements are garment dimensions lying flat.
          </span>
          <div className="flex items-center bg-neutral-100 p-1 rounded-lg">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs rounded-md transition-colors cursor-pointer font-normal ${
                unit === 'inches' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs rounded-md transition-colors cursor-pointer font-normal ${
                unit === 'cm' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="border border-neutral-200 rounded-xl overflow-hidden mb-6">
          <table className="w-full text-left text-xs font-normal">
            <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200 font-normal">
              <tr>
                <th className="py-2.5 px-4 uppercase tracking-wider font-normal">Size</th>
                <th className="py-2.5 px-4 uppercase tracking-wider font-normal">
                  {product.category === 'trousers' ? 'Waist' : 'Chest Circumference'}
                </th>
                <th className="py-2.5 px-4 uppercase tracking-wider font-normal">Length</th>
                <th className="py-2.5 px-4 uppercase tracking-wider font-normal">
                  {product.category === 'trousers' ? 'Inseam' : 'Shoulder Width'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono-tabular">
              {product.sizeGuide.map((row) => {
                const formatVal = (val: string) => {
                  if (unit === 'inches') {
                    return val.split('(')[0].trim();
                  } else {
                    const match = val.match(/\((.*?)\)/);
                    return match ? match[1] : val;
                  }
                };

                return (
                  <tr key={row.size} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2.5 px-4 text-neutral-900 font-normal">{row.size}</td>
                    <td className="py-2.5 px-4 text-neutral-700">{formatVal(row.chestOrWaist)}</td>
                    <td className="py-2.5 px-4 text-neutral-700">{formatVal(row.length)}</td>
                    <td className="py-2.5 px-4 text-neutral-700">{formatVal(row.shoulderOrInseam)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pro Tip Box */}
        <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 font-normal">
          <HelpCircle className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
          <div className="font-light">
            <span className="text-neutral-900 block mb-0.5 font-normal">Silhouette Recommendation:</span>
            <span>
              For an intentional editorial drape, take your normal size. Need custom sizing? Contact our master pattern makers on WhatsApp at <span className="font-mono text-neutral-900 font-normal">+92 307 8795405</span> or email <span className="text-neutral-900 font-normal">ybsapperalindustries@gmail.com</span>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
