import { HERO_IMAGE } from '../data/products';
import { ArrowRight, Sparkles, Feather, Scissors, Shield } from 'lucide-react';

interface LookbookSectionProps {
  onShopCollection: () => void;
  onOpenB2B: () => void;
}

export function LookbookSection({ onShopCollection, onOpenB2B }: LookbookSectionProps) {
  const pillars = [
    {
      num: '01',
      title: 'Combed Loopback Heavy Fleece',
      desc: 'We refuse polyester and elastane blends that pucker or pill. Our 460 GSM French terry is spun strictly from 100% long-staple combed cotton.',
      icon: Feather,
    },
    {
      num: '02',
      title: 'Structural Drop-Shoulder Draping',
      desc: 'Cut with calculated boxy chest proportions and ergonomic armscyes that preserve clean architectural silhouette whether standing or in motion.',
      icon: Scissors,
    },
    {
      num: '03',
      title: 'Pre-Shrunk Garment Dye Patina',
      desc: 'Every completed garment undergoes high-temperature enzyme washing and pigment tinting in Sialkot, ensuring 0% additional shrinkage at home.',
      icon: Sparkles,
    },
    {
      num: '04',
      title: 'Sialkot Industrial Mill Standard',
      desc: 'Double-needle locked chainstitch construction and reinforced twill collar binding guaranteed for 100+ lifetime washes.',
      icon: Shield,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F5F5F2] border-t border-neutral-200 font-normal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-normal uppercase tracking-widest text-neutral-500 mb-2">
            <span>Craft & Mill Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Sialkot, Pakistan</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-normal font-display tracking-tight text-neutral-900 leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Engineered in the mill. Cut for the street.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
            Fast fashion focuses on rapid obsolescence. YBS Apparel Industries was founded on an opposite thesis: heavyweight, tactile garments designed with heavy industrial tolerances and uncompromising textile integrity.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pil) => (
            <div
              key={pil.num}
              className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs flex flex-col justify-between font-normal"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400">
                    {pil.num}.
                  </span>
                  <pil.icon className="w-4 h-4 text-neutral-800" />
                </div>
                <h3 className="text-sm font-normal text-neutral-900 font-display mb-2">
                  {pil.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {pil.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Feature Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-[#121316] text-white font-normal">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-5">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-normal">
                Sialkot Mill Direct Craftsmanship
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal font-display tracking-tight leading-snug">
                "A garment should feel like armor against trends. Heavy, effortless, enduring."
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl font-light">
                Whether you are curating tracksuits, genuine leather, winter puffers, or custom industrial blank programs, YBS Apparel Industries delivers unmatched density and tailoring.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onShopCollection}
                  className="px-6 py-2.5 bg-white text-[#121316] font-normal text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-100 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Shop Signature Line</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenB2B}
                  className="px-6 py-2.5 bg-neutral-900 border border-neutral-700 text-white font-normal text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <span>B2B & Custom Mill Inquiries</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative min-h-[360px]">
              <img
                src={HERO_IMAGE}
                alt="YBS Apparel Mill"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#121316] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
