import { X, Target, Compass, MapPin, Phone, CheckCircle2, Factory } from 'lucide-react';
import { YBSLogo, YBS_BADGE_IMAGE } from './YBSLogo';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenB2B: () => void;
}

export function AboutUsModal({ isOpen, onClose, onOpenB2B }: AboutUsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in font-normal">
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col font-normal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-[#FBFBF9]">
          <div className="flex items-center gap-3">
            <YBSLogo variant="badge" size="md" theme="light" />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7 text-neutral-700 font-normal">
          {/* Story Intro */}
          <div className="space-y-3">
            <h4 className="text-sm font-normal text-neutral-900 uppercase tracking-wider">
              The Sialkot Heritage
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 font-light">
              Based in the legendary manufacturing capital of <span className="text-neutral-900 font-normal">Sialkot, Punjab, Pakistan</span>, <span className="text-neutral-900 font-normal">YBS APPARELS</span> is the direct-to-consumer and private-label flagship of <span className="text-neutral-900 font-normal">YBS Apparel Industries</span>.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 font-light">
              Sialkot has earned an unrivaled global reputation for producing athletic equipment, official FIFA match balls, technical apparel, and leather for the world's most elite brands. At YBS APPARELS, we harness this regional textile expertise to craft architectural streetwear, tracksuits, leatherwear, and sportswear cut from long-staple combed cotton.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mission */}
            <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#121316] text-white flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h5 className="text-sm font-normal font-display text-neutral-900 uppercase">
                Our Mission
              </h5>
              <p className="text-xs leading-relaxed text-neutral-600 font-light">
                To engineer world-class, heavyweight apparel combining precision Sialkot craftsmanship with progressive streetwear silhouettes, delivering factory-direct luxury without excessive markups.
              </p>
            </div>

            {/* Vision */}
            <div className="p-5 bg-[#121316] text-white rounded-xl space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-white text-[#121316] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h5 className="text-sm font-normal font-display text-white uppercase">
                Our Vision
              </h5>
              <p className="text-xs leading-relaxed text-neutral-300 font-light">
                To establish YBS Apparels as an internationally recognized apparel house and premier manufacturer from Pakistan, setting the benchmark for ethical garment engineering, sustainable dyeing practices, and precision tailoring.
              </p>
            </div>
          </div>

          {/* Core Commitments */}
          <div className="space-y-3">
            <h4 className="text-sm font-normal text-neutral-900 uppercase tracking-wider">
              Manufacturing Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2 p-3 bg-neutral-50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-900 block font-normal">Heavy Combed Cotton</span>
                  <span className="text-neutral-500 font-light">240 to 520 GSM loopback fleece without synthetic blends.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-neutral-50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-900 block font-normal">Garment Washed & Pre-Shrunk</span>
                  <span className="text-neutral-500 font-light">Pre-washed in industrial laundries to eliminate shrinkage.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-neutral-50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-900 block font-normal">Ethical Mill Standards</span>
                  <span className="text-neutral-500 font-light">Safe, regulated working conditions and living wages in Sialkot.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-neutral-50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-900 block font-normal">Direct Mill to Wardrobe</span>
                  <span className="text-neutral-500 font-light">Cutting out retail middlemen to offer honest luxury prices.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Direct WhatsApp */}
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-neutral-900 font-normal">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>Small Industrial Estate, Sialkot, Punjab, Pakistan</span>
              </div>
              <div className="text-neutral-600">
                Official WhatsApp: <span className="font-mono text-emerald-800">+92 307 8795405</span>
              </div>
            </div>

            <a
              href="https://wa.me/923078795405?text=Hello%20YBS%20Apparels,%20I%20would%20like%20to%20learn%20more%20about%20your%20brand%20and%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 font-normal"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between font-normal">
          <button
            onClick={() => {
              onClose();
              onOpenB2B();
            }}
            className="text-xs text-neutral-700 hover:text-black underline cursor-pointer font-normal"
          >
            Looking for Custom Manufacturing / B2B in Sialkot?
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#121316] text-white text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer font-normal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
