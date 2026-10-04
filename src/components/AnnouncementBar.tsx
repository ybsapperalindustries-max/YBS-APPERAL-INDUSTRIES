import { useState } from 'react';
import { X } from 'lucide-react';
import { YBSMonogram } from './YBSLogo';

interface AnnouncementBarProps {
  onPromoClick?: (code: string) => void;
  onOpenAdmin?: () => void;
}

export function AnnouncementBar({ onPromoClick, onOpenAdmin }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Store announcement" className="bg-[#121316] text-[#EAE6DF] text-xs py-2 px-4 border-b border-neutral-800 transition-all font-normal">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center font-normal tracking-wide flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="inline-flex items-center gap-1.5 text-amber-300">
            <YBSMonogram size={13} color="#FFFFFF" accentColor="#FCD34D" />
            <span>SIALKOT, PAKISTAN APPAREL MILL</span>
          </span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>WHATSAPP ORDERS: <a href="https://wa.me/923078795405" target="_blank" rel="noopener noreferrer" className="font-mono text-emerald-400 hover:underline">+92 307 8795405</a></span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>FREE SHIPPING OVER $50</span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <button
            onClick={() => onPromoClick?.('YBS10')}
            className="underline underline-offset-4 hover:text-white transition-colors cursor-pointer"
          >
            USE CODE <span className="font-mono text-amber-300">YBS10</span> FOR 10% OFF
          </button>
          {onOpenAdmin && (
            <>
              <span className="opacity-40" aria-hidden="true">·</span>
              <button
                onClick={onOpenAdmin}
                className="text-amber-200 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                OWNER: ORDERS & ARTICLES
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-neutral-400 hover:text-white p-1 ml-2 transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
