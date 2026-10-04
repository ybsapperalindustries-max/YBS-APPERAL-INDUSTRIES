import React from 'react';

export const YBS_BADGE_IMAGE = '/src/assets/images/ybs_monogram_badge_1791052442398.jpg';

interface YBSMonogramProps {
  className?: string;
  size?: number;
  color?: string;
  accentColor?: string;
}

/**
 * Geometric, architectural vector monogram for YBS
 * Interlocks Y, B, and S in an engineered precision diamond-hexagon silhouette.
 */
export function YBSMonogram({
  className = 'w-8 h-8',
  size,
  color = 'currentColor',
  accentColor = '#D4AF37', // subtle antique gold/brass accent
}: YBSMonogramProps) {
  const dimensionProps = size ? { width: size, height: size } : {};

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...dimensionProps}
      aria-label="YBS Monogram"
    >
      {/* Outer Geometric Hexagonal Diamond Shield */}
      <polygon
        points="50,4 92,26 92,74 50,96 8,74 8,26"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* Inner Precision Offset Inset */}
      <polygon
        points="50,9 87,28.5 87,71.5 50,91 13,71.5 13,28.5"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="2.5 2.5"
        opacity="0.4"
      />

      {/* Stylized Interlocking Monogram - YBS */}
      {/* 1. Letter 'Y' (Top Architectural Stem & V-Arms) */}
      <path
        d="M32 23 L50 42 L68 23 M50 42 L50 60"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* 2. Letter 'B' (Central & Right Bow Architecture) */}
      <path
        d="M48 38 H64 C70 38 74 42 74 47 C74 52 70 55 64 55 H48 M48 55 H66 C72 55 77 59 77 65 C77 71 72 75 66 75 H44"
        stroke={accentColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. Letter 'S' (Dynamic Flowing Base Contour) */}
      <path
        d="M62 67 C58 64 52 64 45 66 C36 68 31 72 31 77 C31 83 38 86 52 86 C67 86 73 82 73 78"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Sialkot Atelier Precision Center Hallmark Dot */}
      <circle cx="50" cy="50" r="2.2" fill={accentColor} />

      {/* Small corner alignment pins */}
      <line x1="50" y1="4" x2="50" y2="10" stroke={accentColor} strokeWidth="1.5" />
      <line x1="50" y1="90" x2="50" y2="96" stroke={accentColor} strokeWidth="1.5" />
      <line x1="8" y1="50" x2="14" y2="50" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="86" y1="50" x2="92" y2="50" stroke={color} strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

interface YBSLogoProps {
  variant?: 'full' | 'monogram' | 'badge' | 'seal';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export function YBSLogo({
  variant = 'full',
  theme = 'auto',
  className = '',
  size = 'md',
  showSubtitle = true,
}: YBSLogoProps) {
  // Dimensions and text sizing by size prop
  const sizeMap = {
    sm: { icon: 24, title: 'text-sm', sub: 'text-[8px]', gap: 'gap-2' },
    md: { icon: 34, title: 'text-base sm:text-lg', sub: 'text-[9px]', gap: 'gap-2.5' },
    lg: { icon: 44, title: 'text-xl sm:text-2xl', sub: 'text-[10px]', gap: 'gap-3' },
    xl: { icon: 56, title: 'text-2xl sm:text-3xl', sub: 'text-xs', gap: 'gap-3.5' },
  };

  const currentSize = sizeMap[size];

  // Theme-aware coloring
  const textColor =
    theme === 'dark' ? 'text-white' : theme === 'light' ? 'text-[#121316]' : 'text-current';
  const subColor =
    theme === 'dark' ? 'text-neutral-400' : theme === 'light' ? 'text-neutral-500' : 'text-neutral-500';
  const monogramColor =
    theme === 'dark' ? '#FBFBF9' : theme === 'light' ? '#121316' : 'currentColor';
  const accentColor = '#D4AF37'; // gold hallmark

  if (variant === 'monogram') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <YBSMonogram size={currentSize.icon} color={monogramColor} accentColor={accentColor} />
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <div
          className="relative rounded-lg overflow-hidden border border-neutral-800 shadow-md shrink-0 bg-neutral-900"
          style={{ width: currentSize.icon * 1.1, height: currentSize.icon * 1.1 }}
        >
          <img
            src={YBS_BADGE_IMAGE}
            alt="YBS Apparel Industries Monogram"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span
            className={`block font-normal font-display tracking-widest uppercase ${currentSize.title} ${textColor}`}
          >
            YBS APPARELS
          </span>
          {showSubtitle && (
            <span
              className={`block tracking-widest font-normal uppercase ${currentSize.sub} ${subColor} mt-0.5`}
            >
              SIALKOT · EST. 2012
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'seal') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`}>
        <div className="relative p-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/5 backdrop-blur-xs">
          <YBSMonogram size={currentSize.icon * 1.2} color={monogramColor} accentColor={accentColor} />
        </div>
        <span className={`block font-normal font-display tracking-widest uppercase mt-2 text-xs ${textColor}`}>
          YBS APPAREL INDUSTRIES
        </span>
        <span className={`block text-[9px] font-mono tracking-widest uppercase text-amber-500`}>
          SIALKOT · PAKISTAN
        </span>
      </div>
    );
  }

  // Default 'full' variant: Monogram + Wordmark
  return (
    <div className={`inline-flex items-center ${currentSize.gap} ${className}`}>
      <div className="shrink-0 relative flex items-center justify-center">
        <YBSMonogram
          size={currentSize.icon}
          color={monogramColor}
          accentColor={accentColor}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-normal font-display uppercase tracking-widest leading-none ${currentSize.title} ${textColor}`}
          >
            YBS APPARELS
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`tracking-[0.2em] font-normal uppercase leading-tight ${currentSize.sub} ${subColor} mt-1`}
          >
            SIALKOT · EST. 2012
          </span>
        )}
      </div>
    </div>
  );
}
