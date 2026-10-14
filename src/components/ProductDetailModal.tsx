import React, { useState } from 'react';
import { Product, Language } from '../types/ecommerce';
import { ProductArtwork } from './ProductArtwork';
import { X, Check, Shield, Truck, RotateCcw, Plus, Minus, Ruler } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedSize: string, selectedColor?: string) => void;
  theme: 'dark' | 'light';
  lang: Language;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  theme,
  lang
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const currency = isAr ? 'ج.م' : 'EGP';

  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || '56 (M)');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto" dir={isAr ? 'rtl' : 'ltr'}>
      <div 
        className={`relative w-full max-w-4xl border rounded-2xl shadow-2xl overflow-hidden my-8 transition-colors ${
          isDark 
            ? 'bg-[#121110] border-[#d4af37]/40 text-stone-100 shadow-[0_0_50px_rgba(0,0,0,0.8)]' 
            : 'bg-white border-stone-200 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={isAr ? 'إغلاق' : 'Close'}
          className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} z-10 p-2 rounded-full border transition-colors cursor-pointer ${
            isDark 
              ? 'bg-stone-900 border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800' 
              : 'bg-white border-stone-200 text-stone-700 hover:text-stone-950 hover:bg-stone-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Showcase */}
          <div className={`md:col-span-6 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 ${
            isAr ? 'md:border-l' : 'md:border-r'
          } ${
            isDark ? 'bg-[#0d0c0a] border-stone-800' : 'bg-stone-100/70 border-stone-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#d4af37] tracking-wider uppercase">ELITE BASHA HAUTE COUTURE</span>
              <span className={`px-2 py-0.5 rounded text-[11px] ${
                isDark ? 'bg-stone-900 text-amber-300' : 'bg-white text-stone-800'
              }`}>
                {t.heroSeason}
              </span>
            </div>

            {/* Central Product Artwork */}
            <div className="my-8 aspect-4/3 w-full flex items-center justify-center">
              <ProductArtwork type={product.renderType} isDark={true} className="w-full h-full" />
            </div>

            <div className="p-3 bg-stone-950/80 rounded-lg border border-[#d4af37]/30 text-stone-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[11px] text-amber-300 font-semibold">{t.authenticityGuarantee}</span>
              </div>
              <span className="text-[11px] text-stone-400">{t.inspectBeforeBuy}</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs mb-2">
                <span className="font-bold text-[#d4af37] tracking-wider uppercase">{product.brand}</span>
                <span aria-hidden="true" className={isDark ? 'text-stone-700' : 'text-stone-300'}>·</span>
                <span className={isDark ? 'text-stone-300' : 'text-stone-600'}>
                  {isAr ? product.categoryAr : product.category.toUpperCase()}
                </span>
                <span aria-hidden="true" className={isDark ? 'text-stone-700' : 'text-stone-300'}>·</span>
                <span className="text-emerald-500 font-semibold">
                  {t.inStockCount.replace('{count}', String(product.stockCount))}
                </span>
              </div>

              {/* Title & Price */}
              <h2 className="text-2xl font-serif font-bold tracking-tight mb-1">
                {isAr ? product.nameAr : product.name}
              </h2>
              <p className={`text-xs font-mono mb-3 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                {isAr ? product.name : product.nameAr}
              </p>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold font-mono text-[#d4af37] tabular-nums">
                  {product.price.toLocaleString()} {currency}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-500 line-through font-mono tabular-nums">
                    {product.originalPrice.toLocaleString()} {currency}
                  </span>
                )}
                <span className="text-xs text-emerald-500 font-medium">{t.freeShippingNotice}</span>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className={isDark ? 'text-stone-200' : 'text-stone-800'}>{t.chooseSize}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#d4af37]">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{t.sizeGuide}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#d4af37] text-stone-950 border-[#d4af37] shadow-sm'
                          : isDark
                          ? 'bg-stone-900 text-stone-300 border-stone-800 hover:border-[#d4af37]/60'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add to Bag */}
              <div className={`p-4 rounded-xl border mb-6 ${
                isDark ? 'bg-stone-950/70 border-stone-800' : 'bg-stone-50 border-stone-200'
              }`}>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className={`font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                    {t.orderQuantity}
                  </span>
                  <span className="text-[#d4af37] font-mono text-[11px]">{product.leadTime}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`flex items-center border rounded-lg overflow-hidden ${
                    isDark ? 'border-stone-700 bg-stone-900' : 'border-stone-300 bg-white'
                  }`}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="p-2.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-mono font-bold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      aria-label="Increase quantity"
                      className="p-2.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-300 via-[#d4af37] to-amber-500 hover:brightness-110 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
                        <span>{t.addedToBag}</span>
                      </>
                    ) : (
                      <span>{t.addToBag} · {(product.price * quantity).toLocaleString()} {currency}</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Tabs for Details */}
              <div className={`flex items-center gap-4 border-b mb-4 text-xs ${
                isDark ? 'border-stone-800' : 'border-stone-200'
              }`}>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 font-bold transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : isDark ? 'border-transparent text-stone-400 hover:text-white' : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {t.tabSpecs}
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-2.5 font-bold transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'features'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : isDark ? 'border-transparent text-stone-400 hover:text-white' : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {t.tabFeatures}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 font-bold transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : isDark ? 'border-transparent text-stone-400 hover:text-white' : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {t.tabReviews} ({product.reviews.length})
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'specs' && (
                <div className="space-y-2 text-xs">
                  {product.specs.map((spec, i) => (
                    <div key={i} className={`flex justify-between py-1.5 border-b ${
                      isDark ? 'border-stone-800/80 text-stone-300' : 'border-stone-100 text-stone-700'
                    }`}>
                      <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>{spec.label}</span>
                      <span className={`font-semibold ${isAr ? 'text-right' : 'text-left'} text-[#d4af37]`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <ul className="space-y-2 text-xs">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                      <span className={isDark ? 'text-stone-300' : 'text-stone-700'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3 text-xs">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className={`p-3 rounded-lg border ${
                      isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50 border-stone-200'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#d4af37]">{rev.author}</span>
                        <span className="text-stone-500 font-mono text-[11px]">{rev.date}</span>
                      </div>
                      <p className={`text-[11px] mb-1.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{rev.role}</p>
                      <p className={`italic ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Trust Assurances */}
            <div className={`pt-6 mt-6 border-t grid grid-cols-3 gap-3 text-center text-[11px] ${
              isDark ? 'border-stone-800 text-stone-400' : 'border-stone-200 text-stone-600'
            }`}>
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-[#d4af37]" />
                <span>{t.trustFabrics}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#d4af37]" />
                <span>{t.trustCod}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#d4af37]" />
                <span>{t.trustExchange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
