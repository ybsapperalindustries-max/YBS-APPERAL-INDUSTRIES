import { Compass, Target, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { YBSLogo, YBS_BADGE_IMAGE, YBSMonogram } from './YBSLogo';

interface AboutUsSectionProps {
  onOpenB2B?: () => void;
}

export function AboutUsSection({ onOpenB2B }: AboutUsSectionProps) {
  return (
    <section id="about-us" className="py-20 sm:py-28 bg-white border-t border-neutral-200 font-normal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Monogram Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs font-normal uppercase tracking-widest text-neutral-500 mb-2">
              <YBSMonogram size={16} color="#121316" accentColor="#D4AF37" />
              <span>Our Heritage & Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>Sialkot, Pakistan</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-normal font-display tracking-tight text-neutral-900 leading-tight mb-6"
              style={{ textWrap: 'balance' }}
            >
              About YBS APPARELS
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
              Headquartered in <span className="text-neutral-900 font-normal">Sialkot, Pakistan</span>—the world's premier export capital for technical sportswear, combat apparel, and fine leather goods—<span className="text-neutral-900 font-normal">YBS Apparel Industries</span> was born from a singular conviction: to merge the legendary textile engineering of Sialkot with progressive, minimalist streetwear cuts.
            </p>
          </div>

          <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center gap-4 max-w-sm">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-neutral-300 shadow-xs bg-neutral-900">
                <img
                  src={YBS_BADGE_IMAGE}
                  alt="YBS Official Monogram Badge"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs">
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-700 block">
                  Official Atelier Hallmark
                </span>
                <span className="font-normal font-display tracking-wider text-neutral-900 block mt-0.5">
                  YBS MONOGRAM
                </span>
                <span className="text-[11px] text-neutral-500 block">
                  Embossed hardware & custom woven neck labels on every piece.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission and Vision Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <div className="bg-[#FBFBF9] p-8 sm:p-10 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#121316] text-white flex items-center justify-center shadow-md">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-normal tracking-widest text-amber-700">
                  Core Purpose
                </span>
                <h3 className="text-xl sm:text-2xl font-normal font-display text-neutral-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                To engineer world-class, heavyweight apparel combining precision Sialkot craftsmanship with progressive streetwear silhouettes, delivering factory-direct luxury without inflated retail middleman markups.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs text-neutral-600 font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Custom loopback cottons from 240 GSM to 520 GSM with zero polyester dilution.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Double-needle lockstitch construction tested to withstand 100+ lifetime wash cycles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Empower local master tailors and textile craftsmen in Sialkot with dignified wages.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-[#121316] text-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white text-[#121316] flex items-center justify-center shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-normal tracking-widest text-amber-400">
                  Long-Term Horizon
                </span>
                <h3 className="text-xl sm:text-2xl font-normal font-display text-white">
                  Our Vision
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                To establish YBS Apparels as an internationally recognized apparel house and premier manufacturer from Pakistan, setting the benchmark for ethical garment engineering, sustainable dyeing practices, and architectural tailoring globally.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs text-neutral-300 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Showcase Pakistan's industrial manufacturing excellence on the global fashion stage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Pioneer 100% closed-loop zero-waste textile cutting and eco-friendly pigment washes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Direct global supply chain serving individuals and partner brands worldwide.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Location & Facility Anchor in Sialkot, Pakistan */}
        <div className="p-6 sm:p-8 bg-neutral-50 rounded-2xl border border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-normal">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 shadow-xs shrink-0">
              <MapPin className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-500 block">Manufacturing Base</span>
              <h4 className="text-sm font-normal text-neutral-900">Sialkot, Punjab, Pakistan</h4>
              <p className="text-xs text-neutral-600 mt-0.5">Small Industrial Zone · Export Apparel Hub</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 shadow-xs shrink-0">
              <Phone className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-500 block">WhatsApp & Support</span>
              <a
                href="https://wa.me/923078795405"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-normal text-neutral-900 hover:text-emerald-700 font-mono transition-colors"
              >
                +92 307 8795405
              </a>
              <p className="text-xs text-neutral-600 mt-0.5">Instant WhatsApp Orders & Inquiries</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 shadow-xs shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-500 block">Corporate Email</span>
              <a
                href="mailto:ybsapperalindustries@gmail.com"
                className="text-xs font-normal text-neutral-900 hover:underline font-mono"
              >
                ybsapperalindustries@gmail.com
              </a>
              <p className="text-xs text-neutral-600 mt-0.5">Factory & Wholesale Program</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
