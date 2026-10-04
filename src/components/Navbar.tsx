import { useState } from 'react';
import { Search, ShoppingBag, Heart, Package, Menu, X, MessageCircle, Shield, Plus } from 'lucide-react';
import { Category } from '../types/store';
import { YBSLogo } from './YBSLogo';

interface NavbarProps {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onOpenCart: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  onOpenB2B: () => void;
  onOpenAboutUs: () => void;
  onOpenAdmin: (tab?: 'orders' | 'articles' | 'add_article') => void;
  onOpenSearch: () => void;
  onGoHome: () => void;
  onGoLookbook: () => void;
}

export function Navbar({
  activeCategory,
  onSelectCategory,
  onOpenCart,
  cartCount,
  wishlistCount,
  onOpenWishlist,
  onOpenTracking,
  onOpenB2B,
  onOpenAboutUs,
  onOpenAdmin,
  onOpenSearch,
  onGoHome,
  onGoLookbook,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; cat?: Category; isSpecial?: 'lookbook' | 'b2b' | 'about' }[] = [
    { label: 'All Garments', cat: 'all' },
    { label: 'Tracksuits', cat: 'tracksuits' },
    { label: 'Jackets', cat: 'jackets' },
    { label: 'Leather', cat: 'leather' },
    { label: 'Sport & Gym', cat: 'sportswear' },
    { label: 'Caps & Hats', cat: 'caps_hats' },
    { label: 'About Us', isSpecial: 'about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-neutral-200/80 transition-all font-normal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Zone 1: YBS Monogram & Wordmark Lockup */}
          <button
            onClick={() => {
              onGoHome();
              setMobileMenuOpen(false);
            }}
            className="hover:opacity-85 transition-opacity cursor-pointer shrink-0 text-left group py-1"
            aria-label="YBS APPARELS Home"
          >
            <YBSLogo variant="full" size="md" theme="light" />
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-normal uppercase tracking-wider text-neutral-600">
            {navLinks.map((link) => {
              const isActive = link.cat && activeCategory === link.cat;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.isSpecial === 'about') {
                      onOpenAboutUs();
                    } else if (link.isSpecial === 'lookbook') {
                      onGoLookbook();
                    } else if (link.cat) {
                      onSelectCategory(link.cat);
                    }
                  }}
                  className={`transition-colors py-1 cursor-pointer whitespace-nowrap hover:text-[#121316] relative font-normal ${
                    isActive ? 'text-[#121316]' : 'text-neutral-500'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#121316]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Search collection"
              title="Search products"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Direct WhatsApp link */}
            <a
              href="https://wa.me/923078795405"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-normal text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer border border-emerald-200"
              title="Chat with YBS on WhatsApp +92 307 8795405"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span className="font-mono">+92 307 8795405</span>
            </a>

            {/* Store Operations / Orders & Articles button */}
            <button
              onClick={() => onOpenAdmin('orders')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-normal text-neutral-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer border border-amber-200"
              title="Store Owner Portal: View Customer Orders & Add New Articles"
            >
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Orders & Articles</span>
              <span className="sm:hidden">Orders</span>
            </button>

            <button
              onClick={onOpenTracking}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-normal text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              title="Track Active Order"
            >
              <Package className="w-4 h-4" />
              <span>Track Order</span>
            </button>

            <button
              onClick={onOpenWishlist}
              className="p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer relative"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#121316] text-white text-[10px] font-normal rounded-full flex items-center justify-center font-mono-tabular">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 py-1.5 px-3 bg-[#121316] hover:bg-neutral-800 text-white rounded-lg transition-colors cursor-pointer ml-1 font-normal"
              aria-label={`Shopping Bag (${cartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-mono-tabular font-normal">
                Bag ({cartCount})
              </span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg ml-1"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-[#FBFBF9] px-4 pt-3 pb-6 space-y-3 font-normal">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.isSpecial === 'about') {
                    onOpenAboutUs();
                  } else if (link.isSpecial === 'lookbook') {
                    onGoLookbook();
                  } else if (link.cat) {
                    onSelectCategory(link.cat);
                  }
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 text-sm font-normal uppercase tracking-wider text-neutral-800 hover:bg-neutral-100 rounded-md"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAdmin('orders');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 px-3 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-md text-left font-normal"
            >
              <Shield className="w-4 h-4 text-amber-700" />
              <span>Owner Portal: View Orders & Add Articles</span>
            </button>
            <a
              href="https://wa.me/923078795405"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 px-3 text-sm text-emerald-800 bg-emerald-50 rounded-md font-normal"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>WhatsApp: +92 307 8795405</span>
            </a>
            <button
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 px-3 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md text-left font-normal"
            >
              <Package className="w-4 h-4" />
              <span>Track Existing Order</span>
            </button>
            <button
              onClick={() => {
                onOpenB2B();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 px-3 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md text-left font-normal"
            >
              <span>Wholesale & Custom Manufacturing (Sialkot Mill)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
