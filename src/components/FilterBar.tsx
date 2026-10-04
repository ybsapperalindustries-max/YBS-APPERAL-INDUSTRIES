import { Search, X, SlidersHorizontal, ArrowUpDown, Users } from 'lucide-react';
import { Category, GenderTarget } from '../types/store';

interface FilterBarProps {
  categories: { id: Category; label: string }[];
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  selectedGender: GenderTarget;
  onSelectGender: (gender: GenderTarget) => void;
  selectedFit: string;
  onSelectFit: (fit: string) => void;
  sortBy: string;
  onSelectSort: (sort: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  onResetFilters: () => void;
}

export function FilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  selectedGender,
  onSelectGender,
  selectedFit,
  onSelectFit,
  sortBy,
  onSelectSort,
  searchQuery,
  onSearchChange,
  totalCount,
  onResetFilters,
}: FilterBarProps) {
  const hasActiveFilters =
    activeCategory !== 'all' ||
    selectedGender !== 'all' ||
    selectedFit !== 'all' ||
    searchQuery.trim().length > 0;

  return (
    <div className="bg-white border-y border-neutral-200/80 sticky top-16 sm:top-18 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2.5">
        {/* Top Row: Categories Segmented Control & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-normal uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#121316] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tracksuit, leather, jacket, cap..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 text-xs font-normal bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Secondary Filters (Gender / Target, Fit, Sort, Count) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100 text-xs font-normal">
          <div className="flex flex-wrap items-center gap-3">
            {/* Gender / Audience filter */}
            <div className="flex items-center gap-1.5 text-neutral-600">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-500">For:</span>
              <select
                value={selectedGender}
                onChange={(e) => onSelectGender(e.target.value as GenderTarget)}
                className="bg-transparent font-normal text-neutral-900 border-none focus:outline-hidden cursor-pointer"
              >
                <option value="all">All (Men, Ladies, Kids)</option>
                <option value="men">Men's Wear</option>
                <option value="ladies">Ladies / Women</option>
                <option value="kids">Kids & Juniors</option>
                <option value="unisex">Unisex Cuts</option>
              </select>
            </div>

            {/* Fit filter */}
            <div className="flex items-center gap-1.5 text-neutral-600 ml-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-500">Fit:</span>
              <select
                value={selectedFit}
                onChange={(e) => onSelectFit(e.target.value)}
                className="bg-transparent font-normal text-neutral-900 border-none focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Silhouettes</option>
                <option value="Relaxed">Relaxed</option>
                <option value="Oversized">Oversized</option>
                <option value="Athletic Fit">Athletic Fit</option>
                <option value="Tailored">Tailored</option>
                <option value="Boxy">Boxy Cut</option>
              </select>
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-1.5 text-neutral-600 ml-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => onSelectSort(e.target.value)}
                className="bg-transparent font-normal text-neutral-900 border-none focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rating</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-neutral-500 hover:text-neutral-900 underline underline-offset-2 ml-2 cursor-pointer font-normal"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="text-neutral-500 font-mono-tabular">
            Showing <span className="font-normal text-neutral-900">{totalCount}</span> {totalCount === 1 ? 'garment' : 'garments'}
          </div>
        </div>
      </div>
    </div>
  );
}
