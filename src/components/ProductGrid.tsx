import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductCategory, Language } from '../types/ecommerce';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowDownAZ, 
  ArrowUpZA, 
  ArrowDown01, 
  ArrowUp10, 
  RotateCcw,
  Tag
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export type SortOption = 
  | 'featured' 
  | 'alpha-asc' 
  | 'alpha-desc' 
  | 'price-asc' 
  | 'price-desc' 
  | 'rating';

export type PriceBracket = 'all' | 'under-2500' | '2500-3500' | 'above-3500';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  theme: 'dark' | 'light';
  lang: Language;
  filterHandcrafted?: boolean;
  onClearHandcraftedFilter?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  theme,
  lang,
  filterHandcrafted = false,
  onClearHandcraftedFilter
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const currency = isAr ? 'ج.م' : 'EGP';

  // Search input state (typed vs applied)
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  // Sorting
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Advanced filters state
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceBracket, setPriceBracket] = useState<PriceBracket>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [onlyHandcrafted, setOnlyHandcrafted] = useState(filterHandcrafted);
  const [onlyEgyptianCotton, setOnlyEgyptianCotton] = useState(false);

  // Sync external filterHandcrafted
  useEffect(() => {
    if (filterHandcrafted) {
      setOnlyHandcrafted(true);
      setShowFiltersPanel(true);
    }
  }, [filterHandcrafted]);

  // Handle Search Submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setAppliedSearch('');
  };

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: t.catAll },
    { id: 'jellabiya', label: t.catJellabiya },
    { id: 'suits', label: t.catSuits },
    { id: 'bisht', label: t.catBisht },
    { id: 'shirts', label: t.catShirts },
    { id: 'accessories', label: t.catAccessories }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

        // Stock
        if (inStockOnly && !p.inStock) return false;

        // Handcrafted cotton filter
        if (onlyHandcrafted) {
          const isHandcrafted = 
            p.fabric.toLowerCase().includes('handcrafted') ||
            p.fabric.includes('شغل قطن يدوي') ||
            p.specs.some(s => s.value.includes('شغل قطن يدوي') || s.value.toLowerCase().includes('handcrafted')) ||
            p.features.some(f => f.includes('شغل قطن يدوي')) ||
            p.description.includes('شغل قطن يدوي');
          if (!isHandcrafted) return false;
        }

        // 100% Egyptian cotton filter
        if (onlyEgyptianCotton) {
          const isEgyptianCotton = 
            p.fabric.includes('قطن مصري') || 
            p.fabric.toLowerCase().includes('egyptian cotton');
          if (!isEgyptianCotton) return false;
        }

        // Price bracket presets
        if (priceBracket === 'under-2500' && p.price >= 2500) return false;
        if (priceBracket === '2500-3500' && (p.price < 2500 || p.price > 3500)) return false;
        if (priceBracket === 'above-3500' && p.price <= 3500) return false;

        // Custom min/max price
        const min = minPrice ? parseFloat(minPrice) : null;
        const max = maxPrice ? parseFloat(maxPrice) : null;
        if (min !== null && !isNaN(min) && p.price < min) return false;
        if (max !== null && !isNaN(max) && p.price > max) return false;

        // Search Query Match (Bilingual across multiple attributes)
        if (appliedSearch !== '') {
          const q = appliedSearch.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q) || p.nameAr.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTagline = p.tagline.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          const matchFeatures = p.features.some(f => f.toLowerCase().includes(q));

          if (!matchName && !matchBrand && !matchDesc && !matchTagline && !matchFabric && !matchFeatures) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        // Alphabetical sorting (Arabic and English aware)
        if (sortBy === 'alpha-asc') {
          const strA = isAr ? a.nameAr : a.name;
          const strB = isAr ? b.nameAr : b.name;
          return strA.localeCompare(strB, isAr ? 'ar' : 'en');
        }
        if (sortBy === 'alpha-desc') {
          const strA = isAr ? a.nameAr : a.name;
          const strB = isAr ? b.nameAr : b.name;
          return strB.localeCompare(strA, isAr ? 'ar' : 'en');
        }
        // Price sorting
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        // Rating sorting
        if (sortBy === 'rating') return b.rating - a.rating;
        // Featured default
        return 0;
      });
  }, [
    products, 
    selectedCategory, 
    appliedSearch, 
    sortBy, 
    inStockOnly, 
    onlyHandcrafted, 
    onlyEgyptianCotton, 
    priceBracket, 
    minPrice, 
    maxPrice,
    isAr
  ]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (appliedSearch) count++;
    if (selectedCategory !== 'all') count++;
    if (sortBy !== 'featured') count++;
    if (inStockOnly) count++;
    if (priceBracket !== 'all') count++;
    if (minPrice || maxPrice) count++;
    if (onlyHandcrafted) count++;
    if (onlyEgyptianCotton) count++;
    return count;
  }, [appliedSearch, selectedCategory, sortBy, inStockOnly, priceBracket, minPrice, maxPrice, onlyHandcrafted, onlyEgyptianCotton]);

  const handleResetAll = () => {
    setSearchInput('');
    setAppliedSearch('');
    setSelectedCategory('all');
    setSortBy('featured');
    setInStockOnly(false);
    setPriceBracket('all');
    setMinPrice('');
    setMaxPrice('');
    setOnlyHandcrafted(false);
    setOnlyEgyptianCotton(false);
    if (onClearHandcraftedFilter) onClearHandcraftedFilter();
  };

  return (
    <section id="catalog-section" className={`max-w-7xl mx-auto px-6 py-12 transition-colors duration-200 ${
      isDark ? 'text-white' : 'text-stone-900'
    }`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Title & Search bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.catalogKicker}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            {t.catalogTitle}
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            {t.catalogShowing.replace('{count}', String(filteredProducts.length))}
          </p>
        </div>

        {/* Search Bar with Dedicated Search Button */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className={`w-4 h-4 absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-stone-400`} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={`w-full ${isAr ? 'pr-9 pl-8' : 'pl-9 pr-8'} py-2.5 text-xs rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 ${
                isDark
                  ? 'bg-stone-900/90 border-[#d4af37]/40 text-white placeholder-stone-400 focus:border-[#d4af37]'
                  : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#d4af37]'
              }`}
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label={t.clearSearch}
                className={`absolute ${isAr ? 'left-2.5' : 'right-2.5'} top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-200 cursor-pointer`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Button requested by user */}
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-all shadow-sm bg-gradient-to-r from-amber-400 via-[#d4af37] to-amber-500 text-stone-950 hover:brightness-110 shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t.searchButton}</span>
          </button>

          {/* Advanced Filters Toggle Button */}
          <button
            type="button"
            onClick={() => setShowFiltersPanel((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-lg border transition-all shrink-0 cursor-pointer ${
              showFiltersPanel || activeFiltersCount > 0
                ? isDark 
                  ? 'bg-stone-900 text-[#d4af37] border-[#d4af37]' 
                  : 'bg-amber-50 text-amber-900 border-amber-300'
                : isDark
                ? 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-stone-700'
                : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">{t.filtersButton}</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#d4af37] text-stone-950 text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </form>
      </div>

      {/* Primary Category Filter Bar */}
      <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b ${
        isDark ? 'border-stone-800' : 'border-stone-200'
      }`}>
        {/* Category buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 via-[#d4af37] to-amber-500 text-stone-950 shadow-md'
                    : isDark
                    ? 'text-stone-300 bg-stone-900/80 hover:bg-stone-800 hover:text-[#d4af37] border border-stone-800'
                    : 'text-stone-700 bg-stone-100 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Quick Sorting Dropdown with Alphabetical and Price options */}
        <div className={`flex items-center gap-3 shrink-0 text-xs ${
          isDark ? 'text-stone-300' : 'text-stone-600'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>{t.sortLabel}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className={`px-2.5 py-1.5 rounded-lg border font-semibold focus:outline-none cursor-pointer text-xs transition-colors ${
                isDark 
                  ? 'bg-stone-900 text-amber-300 border-[#d4af37]/40 focus:border-[#d4af37]' 
                  : 'bg-white text-stone-900 border-stone-300 focus:border-[#d4af37]'
              }`}
            >
              <option value="featured">{t.sortFeatured}</option>
              <option value="alpha-asc">{t.sortAlphaAsc}</option>
              <option value="alpha-desc">{t.sortAlphaDesc}</option>
              <option value="price-asc">{t.sortPriceAsc}</option>
              <option value="price-desc">{t.sortPriceDesc}</option>
              <option value="rating">{t.sortRating}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expandable Advanced Filters Drawer */}
      {showFiltersPanel && (
        <div className={`p-5 rounded-xl border mb-6 transition-all duration-200 ${
          isDark 
            ? 'bg-stone-950/90 border-[#d4af37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]' 
            : 'bg-stone-50 border-stone-200 shadow-sm'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Price Range & Custom Min/Max */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>{t.priceRangeTitle}</span>
              </h4>
              
              {/* Price preset pills */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setPriceBracket('all')}
                  className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md border text-center transition-colors cursor-pointer ${
                    priceBracket === 'all'
                      ? 'bg-[#d4af37] text-stone-950 border-[#d4af37] font-bold'
                      : isDark
                      ? 'border-stone-800 text-stone-300 hover:border-stone-700'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {t.filterAllPrices}
                </button>
                <button
                  type="button"
                  onClick={() => setPriceBracket('under-2500')}
                  className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md border text-center transition-colors cursor-pointer ${
                    priceBracket === 'under-2500'
                      ? 'bg-[#d4af37] text-stone-950 border-[#d4af37] font-bold'
                      : isDark
                      ? 'border-stone-800 text-stone-300 hover:border-stone-700'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {t.filterUnder2500}
                </button>
                <button
                  type="button"
                  onClick={() => setPriceBracket('2500-3500')}
                  className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md border text-center transition-colors cursor-pointer ${
                    priceBracket === '2500-3500'
                      ? 'bg-[#d4af37] text-stone-950 border-[#d4af37] font-bold'
                      : isDark
                      ? 'border-stone-800 text-stone-300 hover:border-stone-700'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {t.filter2500to3500}
                </button>
                <button
                  type="button"
                  onClick={() => setPriceBracket('above-3500')}
                  className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md border text-center transition-colors cursor-pointer ${
                    priceBracket === 'above-3500'
                      ? 'bg-[#d4af37] text-stone-950 border-[#d4af37] font-bold'
                      : isDark
                      ? 'border-stone-800 text-stone-300 hover:border-stone-700'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {t.filterAbove3500}
                </button>
              </div>

              {/* Custom Min/Max Inputs */}
              <div className="flex items-center gap-2 text-xs">
                <input
                  type="number"
                  placeholder={t.minPrice}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className={`w-1/2 px-2.5 py-1.5 rounded-md border font-mono text-xs focus:outline-none focus:border-[#d4af37] ${
                    isDark ? 'bg-stone-900 border-stone-800 text-white' : 'bg-white border-stone-300 text-stone-900'
                  }`}
                />
                <span className="text-stone-400">-</span>
                <input
                  type="number"
                  placeholder={t.maxPrice}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className={`w-1/2 px-2.5 py-1.5 rounded-md border font-mono text-xs focus:outline-none focus:border-[#d4af37] ${
                    isDark ? 'bg-stone-900 border-stone-800 text-white' : 'bg-white border-stone-300 text-stone-900'
                  }`}
                />
              </div>
            </div>

            {/* Column 2: Specific Garment Craft Filters */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                {isAr ? 'نوع الصنعة والأقمشة' : 'Craft & Fabric Type'}
              </h4>
              <div className="space-y-2.5 text-xs">
                {/* Handcrafted Cotton toggle */}
                <label className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer select-none transition-colors ${
                  onlyHandcrafted
                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] font-semibold'
                    : isDark
                    ? 'border-stone-800 hover:border-stone-700 text-stone-300'
                    : 'border-stone-200 hover:bg-stone-100 text-stone-700'
                }`}>
                  <input
                    type="checkbox"
                    checked={onlyHandcrafted}
                    onChange={(e) => setOnlyHandcrafted(e.target.checked)}
                    className="w-4 h-4 accent-[#d4af37]"
                  />
                  <span>{t.filterHandcraftedOnly}</span>
                </label>

                {/* 100% Egyptian Cotton toggle */}
                <label className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer select-none transition-colors ${
                  onlyEgyptianCotton
                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] font-semibold'
                    : isDark
                    ? 'border-stone-800 hover:border-stone-700 text-stone-300'
                    : 'border-stone-200 hover:bg-stone-100 text-stone-700'
                }`}>
                  <input
                    type="checkbox"
                    checked={onlyEgyptianCotton}
                    onChange={(e) => setOnlyEgyptianCotton(e.target.checked)}
                    className="w-4 h-4 accent-[#d4af37]"
                  />
                  <span>{t.filterCottonOnly}</span>
                </label>

                {/* In Stock Only */}
                <label className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer select-none transition-colors ${
                  inStockOnly
                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] font-semibold'
                    : isDark
                    ? 'border-stone-800 hover:border-stone-700 text-stone-300'
                    : 'border-stone-200 hover:bg-stone-100 text-stone-700'
                }`}>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#d4af37]"
                  />
                  <span>{t.inStockOnly}</span>
                </label>
              </div>
            </div>

            {/* Column 3: Sorting Details & Reset */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                  {isAr ? 'طريقة العرض والترتيب' : 'Sorting & Order'}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSortBy('alpha-asc')}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                      sortBy === 'alpha-asc'
                        ? 'border-[#d4af37] bg-[#d4af37] text-stone-950 font-bold'
                        : isDark ? 'border-stone-800 text-stone-300' : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    <ArrowDownAZ className="w-3.5 h-3.5" />
                    <span>{isAr ? 'أ إلى ي' : 'A to Z'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSortBy('alpha-desc')}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                      sortBy === 'alpha-desc'
                        ? 'border-[#d4af37] bg-[#d4af37] text-stone-950 font-bold'
                        : isDark ? 'border-stone-800 text-stone-300' : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    <ArrowUpZA className="w-3.5 h-3.5" />
                    <span>{isAr ? 'ي إلى أ' : 'Z to A'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSortBy('price-asc')}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                      sortBy === 'price-asc'
                        ? 'border-[#d4af37] bg-[#d4af37] text-stone-950 font-bold'
                        : isDark ? 'border-stone-800 text-stone-300' : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    <ArrowDown01 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'السعر تصاعدي' : 'Price Asc'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSortBy('price-desc')}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                      sortBy === 'price-desc'
                        ? 'border-[#d4af37] bg-[#d4af37] text-stone-950 font-bold'
                        : isDark ? 'border-stone-800 text-stone-300' : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    <ArrowUp10 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'السعر تنازلي' : 'Price Desc'}</span>
                  </button>
                </div>
              </div>

              {/* Reset action */}
              <button
                type="button"
                onClick={handleResetAll}
                className={`mt-4 flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  isDark
                    ? 'border-rose-900/50 text-rose-300 hover:bg-rose-950/30'
                    : 'border-rose-200 text-rose-700 hover:bg-rose-50'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resetFilters}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Pill Bar (When any filter is active) */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <span className={`font-semibold ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            {t.activeFiltersLabel}
          </span>

          {appliedSearch && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] font-medium">
              <span>"{appliedSearch}"</span>
              <button onClick={() => setAppliedSearch('')} className="hover:opacity-80 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedCategory !== 'all' && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] font-medium">
              <span>{categories.find(c => c.id === selectedCategory)?.label}</span>
              <button onClick={() => setSelectedCategory('all')} className="hover:opacity-80 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {sortBy !== 'featured' && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] font-medium">
              <span>
                {sortBy === 'alpha-asc' && t.sortAlphaAsc}
                {sortBy === 'alpha-desc' && t.sortAlphaDesc}
                {sortBy === 'price-asc' && t.sortPriceAsc}
                {sortBy === 'price-desc' && t.sortPriceDesc}
                {sortBy === 'rating' && t.sortRating}
              </span>
              <button onClick={() => setSortBy('featured')} className="hover:opacity-80 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {priceBracket !== 'all' && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] font-medium">
              <span>
                {priceBracket === 'under-2500' && t.filterUnder2500}
                {priceBracket === '2500-3500' && t.filter2500to3500}
                {priceBracket === 'above-3500' && t.filterAbove3500}
              </span>
              <button onClick={() => setPriceBracket('all')} className="hover:opacity-80 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(minPrice || maxPrice) && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] font-medium">
              <span>{minPrice || '0'} - {maxPrice || '∞'} {currency}</span>
              <button onClick={() => { setMinPrice(''); setMaxPrice(''); }} className="hover:opacity-80 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyHandcrafted && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] font-medium">
              <span>{t.filterHandcraftedOnly}</span>
              <button onClick={() => { setOnlyHandcrafted(false); if (onClearHandcraftedFilter) onClearHandcraftedFilter(); }} className="hover:opacity-80 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyEgyptianCotton && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] font-medium">
              <span>{t.filterCottonOnly}</span>
              <button onClick={() => setOnlyEgyptianCotton(false)} className="hover:opacity-80 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {inStockOnly && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] font-medium">
              <span>{t.inStockOnly}</span>
              <button onClick={() => setInStockOnly(false)} className="hover:opacity-80 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={handleResetAll}
            className={`text-xs font-bold underline transition-colors mr-2 cursor-pointer ${
              isDark ? 'text-stone-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            {t.resetFilters}
          </button>
        </div>
      )}

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              theme={theme}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        <div className={`py-16 text-center border rounded-xl p-8 ${
          isDark ? 'bg-stone-950 border-stone-800' : 'bg-white border-stone-200'
        }`}>
          <p className="text-base font-bold mb-1">
            {t.noProductsTitle}
          </p>
          <p className={`text-xs mb-4 max-w-sm mx-auto ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            {t.noProductsDesc}
          </p>
          <button
            onClick={handleResetAll}
            className="px-5 py-2 text-xs font-bold text-stone-950 bg-[#d4af37] rounded-lg hover:bg-amber-300 transition-colors cursor-pointer"
          >
            {t.resetFilters}
          </button>
        </div>
      )}
    </section>
  );
};
