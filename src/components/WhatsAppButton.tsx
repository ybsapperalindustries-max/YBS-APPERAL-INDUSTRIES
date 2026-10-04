import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function WhatsAppButton({
  phoneNumber = '923078795405',
  defaultMessage = 'Hello YBS Apparels (Sialkot, Pakistan), I have an inquiry regarding your clothing collection.',
}: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(true);

  const encodedMsg = encodeURIComponent(defaultMessage);
  const waUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2 font-normal">
      {/* Friendly Tooltip */}
      {showTooltip && (
        <div className="bg-white border border-neutral-200 shadow-xl rounded-xl p-3 max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2 text-neutral-800 relative font-normal">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-neutral-400 hover:text-neutral-700 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="text-neutral-900 flex items-center gap-1.5 mb-0.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>YBS Concierge (Sialkot, PK)</span>
          </div>
          <p className="text-[11px] text-neutral-600 leading-snug font-light">
            Need sizing advice, custom manufacturing, or instant order assistance? Chat with us on WhatsApp!
          </p>
          <div className="mt-1.5 text-[10px] font-mono text-emerald-700 font-medium">
            +92 307 8795405
          </div>
        </div>
      )}

      {/* Main WhatsApp Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp +923078795405"
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group cursor-pointer font-normal"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs tracking-wide hidden sm:inline-block font-normal">
          Order on WhatsApp
        </span>
      </a>
    </div>
  );
}
