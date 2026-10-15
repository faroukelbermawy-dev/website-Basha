import React from 'react';
import { Product, Language } from '../types/ecommerce';
import { ProductArtwork } from './ProductArtwork';
import { Eye, Plus, Heart } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  theme: 'dark' | 'light';
  lang: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  theme,
  lang
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const currency = isAr ? 'ج.م' : 'EGP';

  return (
    <article className={`group flex flex-col rounded-xl overflow-hidden transition-all duration-200 border hover:-translate-y-1 ${
      isDark
        ? 'bg-[#121110] border-[#d4af37]/25 hover:border-[#d4af37]/70 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] text-stone-100'
        : 'bg-white border-stone-200 hover:border-[#d4af37]/60 hover:shadow-lg text-stone-900'
    }`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* 65-75% visual slot */}
      <div 
        className="relative aspect-4/3 w-full bg-[#0d0c0a] overflow-hidden cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <ProductArtwork 
          type={product.renderType} 
          isDark={isDark} 
          className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]" 
        />

        {/* Wishlist Affordance */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? (isAr ? 'إزالة من المفضلة' : 'Remove from wishlist') : (isAr ? 'حفظ في المفضلة' : 'Save to wishlist')}
          className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-rose-950/80 text-rose-400 border border-rose-800 shadow-sm'
              : 'bg-black/40 text-stone-300 hover:text-[#d4af37] hover:bg-black/70'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Discount badge */}
        {product.originalPrice && (
          <span className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} text-[11px] font-bold tracking-tight text-stone-950 bg-gradient-to-r from-amber-300 to-[#d4af37] px-2.5 py-0.5 rounded shadow-sm`}>
            {t.saveAmount.replace('{amount}', (product.originalPrice - product.price).toLocaleString())}
          </span>
        )}

        {/* Hover Quick-Action bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-200 hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.quickView}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-300 to-[#d4af37] rounded hover:brightness-110 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.quickAdd}</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Category & Stock (Clean unboxed metadata) */}
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[11px] tracking-wider text-[#d4af37] uppercase">
              {product.brand}
            </span>
            <span aria-hidden="true" className={isDark ? 'text-stone-700' : 'text-stone-300'}>·</span>
            <span className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              {isAr ? product.categoryAr : product.category.toUpperCase()}
            </span>
          </div>

          <span className="font-mono text-[11px] text-emerald-500 font-medium">
            {t.inStockCount.replace('{count}', String(product.stockCount))}
          </span>
        </div>

        {/* Product Title in Arabic & English */}
        <h3
          onClick={() => onSelect(product)}
          className={`text-base font-bold font-serif cursor-pointer transition-colors line-clamp-1 mb-1 ${
            isDark ? 'text-stone-100 hover:text-[#d4af37]' : 'text-stone-900 hover:text-[#b45309]'
          }`}
        >
          {isAr ? product.nameAr : product.name}
        </h3>
        <p className={`text-[11px] font-mono tracking-tight mb-2 truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
          {isAr ? product.name : product.nameAr}
        </p>

        {/* 1-line Quiet Tagline */}
        <p className={`text-xs line-clamp-2 leading-relaxed mb-3 flex-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
          {product.tagline}
        </p>

        {/* Sizes Preview */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[10px] font-mono">
          <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>{t.sizesLabel}</span>
          {product.sizes.slice(0, 4).map((s, idx) => (
            <span key={idx} className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
              isDark ? 'bg-stone-900 text-amber-300 border border-stone-800' : 'bg-stone-100 text-stone-700'
            }`}>
              {s.split(' ')[0]}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="text-stone-500">+{product.sizes.length - 4}</span>
          )}
        </div>

        {/* Price Row & Action */}
        <div className={`flex items-center justify-between gap-2 pt-3 border-t ${
          isDark ? 'border-stone-800/80' : 'border-stone-100'
        }`}>
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-base sm:text-lg font-bold font-mono tabular-nums text-[#d4af37]">
              {product.price.toLocaleString()} {currency}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] sm:text-xs text-stone-500 line-through font-mono tabular-nums">
                {product.originalPrice.toLocaleString()} {currency}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              isDark
                ? 'bg-[#d4af37] text-stone-950 hover:bg-amber-300'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {t.addToBag}
          </button>
        </div>
      </div>
    </article>
  );
};
