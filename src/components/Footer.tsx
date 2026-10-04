import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck, CreditCard, Landmark, Smartphone, Truck } from 'lucide-react';
import { Category } from '../types/store';
import { YBSLogo, YBSMonogram } from './YBSLogo';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
  onOpenTracking: () => void;
  onOpenB2B: () => void;
  onOpenAboutUs: () => void;
  onOpenAdmin: (tab?: 'orders' | 'articles' | 'add_article') => void;
  onOpenSizeGuide: () => void;
  onGoLookbook: () => void;
}

export function Footer({
  onSelectCategory,
  onOpenTracking,
  onOpenB2B,
  onOpenAboutUs,
  onOpenAdmin,
  onOpenSizeGuide,
  onGoLookbook,
}: FooterProps) {
  return (
    <footer className="bg-[#121316] text-[#EAE6DF] border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-neutral-800">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="pb-1">
              <YBSLogo variant="badge" size="lg" theme="dark" />
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Engineered tracksuits, high-performance sportswear, gym wear, and heavyweight streetwear silhouettes cut from 240 to 520 GSM combed textiles. Manufactured by <span className="text-white font-medium">YBS Apparel Industries</span> in Sialkot, Pakistan.
            </p>

            <div className="space-y-2 pt-1 text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Small Industrial Estate, Sialkot, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/923078795405"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-400 hover:underline"
                >
                  WhatsApp: +92 307 8795405
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <a href="mailto:ybsapperalindustries@gmail.com" className="font-mono text-xs hover:underline">
                  ybsapperalindustries@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Catalog Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-normal uppercase tracking-wider text-white">
              Garment Lines
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Complete Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('tracksuits')}
                  className="hover:text-white transition-colors cursor-pointer text-amber-300 font-normal"
                >
                  Latest Tracksuits (Set)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('sportswear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Technical Sportswear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('gymwear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gym Wear & Compression
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('streetwear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Heavyweight Streetwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('hoodies')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  French Terry Hoodies
                </button>
              </li>
            </ul>
          </div>

          {/* Client Services & About */}
          <div className="space-y-3">
            <h4 className="text-xs font-normal uppercase tracking-wider text-white">
              About & Concierge
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={onOpenAboutUs}
                  className="hover:text-white transition-colors cursor-pointer font-normal text-white flex items-center gap-1"
                >
                  <span>About Us, Mission & Vision</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAdmin('orders')}
                  className="hover:text-white transition-colors cursor-pointer text-amber-300 flex items-center gap-1 font-normal"
                >
                  <span>Owner Portal: View Orders</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAdmin('add_article')}
                  className="hover:text-white transition-colors cursor-pointer text-amber-200 flex items-center gap-1 font-normal"
                >
                  <span>+ Add New Garment Article</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Existing Shipment
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Size & Fit Calibration
                </button>
              </li>
              <li>
                <button
                  onClick={onGoLookbook}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Textile Sourcing & Mill Story
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenB2B}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-amber-300 font-normal"
                >
                  <span>Wholesale & B2B (Sialkot Mill)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Accepted Online Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-xs font-normal uppercase tracking-wider text-white">
              Online Payment
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              We support secure digital and online transactions:
            </p>
            <div className="space-y-1.5 text-[11px] text-neutral-300">
              <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                <span>Credit/Debit Cards (Visa/MasterCard)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                <span>Online Bank Transfer & Raast</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>JazzCash & EasyPaisa (Online)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                <Truck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Cash on Delivery (Doorstep COD)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-xs">
          <div className="flex items-center gap-2">
            <YBSMonogram size={18} color="#888888" accentColor="#D4AF37" />
            <span>
              © {new Date().getFullYear()} YBS APPARELS · YBS Apparel Industries (Sialkot, Pakistan). All Rights Reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onOpenAboutUs} className="hover:text-neutral-300">Our Heritage</button>
            <span aria-hidden="true">·</span>
            <span>Ethical Mill Standards</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Courier</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
