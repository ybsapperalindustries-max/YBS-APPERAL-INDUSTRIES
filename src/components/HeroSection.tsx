import { HERO_IMAGE } from '../data/products';
import { ArrowRight, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onBestsellerClick: () => void;
}

export function HeroSection({ onExploreClick, onBestsellerClick }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#121316] text-white">
      {/* Background Campaign Imagery with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="YBS Apparels SS26 Editorial Campaign"
          className="w-full h-full object-cover object-center opacity-70 filter brightness-95"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121316]/95 via-[#121316]/65 to-[#121316]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Clean unboxed metadata - Zero-Pill discipline */}
          <div className="flex items-center gap-2 text-xs font-normal uppercase tracking-widest text-amber-300/90 mb-4">
            <span>SS26 Collection</span>
            <span aria-hidden="true">·</span>
            <span>YBS Apparel Industries</span>
            <span aria-hidden="true">·</span>
            <span>Sialkot, Pakistan</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-normal font-display tracking-tight text-white leading-[1.12] mb-6"
            style={{ textWrap: 'balance' }}
          >
            Engineered silhouettes for the modern urban wardrobe.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light mb-8 max-w-xl">
            Custom-milled 240 to 520 GSM textiles, master leather craft, and technical sportswear tailored in Sialkot with precision garment dyes designed to hold architectural shape.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-[#121316] font-normal text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-100 transition-all cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBestsellerClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-900/80 hover:bg-neutral-800 text-white font-normal text-xs uppercase tracking-wider border border-white/20 rounded-lg transition-all cursor-pointer backdrop-blur-sm"
            >
              <span>View Tracksuits & Jackets</span>
            </button>
          </div>

          {/* Adjacency Proof Line */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-neutral-300 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Zero Synthetic Dilution</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Pre-Shrunk Garment Dye</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-amber-300 shrink-0" />
              <span>30-Day Free Return Gate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
