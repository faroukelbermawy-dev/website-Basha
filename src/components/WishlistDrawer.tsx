import React from 'react';
import { Product, Language } from '../types/ecommerce';
import { ProductArtwork } from './ProductArtwork';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  theme: 'dark' | 'light';
  lang: Language;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart,
  theme,
  lang
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const currency = isAr ? 'ج.م' : 'EGP';

  const wishlistedItems = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className={`fixed inset-y-0 ${isAr ? 'right-0 pl-10' : 'left-0 pr-10'} max-w-full flex`}>
        <div className={`w-screen max-w-md ${isAr ? 'border-l' : 'border-r'} shadow-2xl flex flex-col transition-colors ${
          isDark 
            ? 'bg-[#0f0e0c] border-[#d4af37]/30 text-stone-100' 
            : 'bg-white border-stone-200 text-stone-900'
        }`}>
          <div className={`px-6 py-5 border-b flex items-center justify-between ${
            isDark ? 'border-stone-800 bg-stone-950/80' : 'border-stone-200 bg-stone-50'
          }`}>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="text-lg font-serif font-bold text-[#d4af37]">
                {t.wishlistTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label={isAr ? 'إغلاق المفضلة' : 'Close wishlist'}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isDark ? 'text-stone-400 hover:text-white' : 'text-stone-400 hover:text-stone-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                  isDark ? 'bg-stone-900 text-rose-400' : 'bg-stone-100 text-stone-400'
                }`}>
                  <Heart className="w-6 h-6" />
                </div>
                <p className="text-base font-bold font-serif mb-1">
                  {t.wishlistEmptyTitle}
                </p>
                <p className={`text-xs max-w-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {t.wishlistEmptyDesc}
                </p>
              </div>
            ) : (
              wishlistedItems.map((product) => (
                <div
                  key={product.id}
                  className={`flex gap-4 p-3.5 rounded-xl border transition-colors ${
                    isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="w-20 h-22 bg-[#0a0a0a] rounded-lg overflow-hidden shrink-0 border border-[#d4af37]/20">
                    <ProductArtwork type={product.renderType} isDark={true} className="w-full h-full" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold font-serif line-clamp-1">
                          {isAr ? product.nameAr : product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          aria-label={isAr ? `حذف ${product.nameAr} من المفضلة` : `Remove ${product.name} from wishlist`}
                          className="text-stone-400 hover:text-rose-500 transition-colors p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                        {isAr ? product.categoryAr : product.category.toUpperCase()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-bold font-mono text-[#d4af37] tabular-nums">
                        {product.price.toLocaleString()} {currency}
                      </span>

                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-950 bg-[#d4af37] hover:bg-amber-300 rounded-lg transition-colors shadow-sm cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3 text-stone-950" />
                        <span>{t.moveToBag}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
