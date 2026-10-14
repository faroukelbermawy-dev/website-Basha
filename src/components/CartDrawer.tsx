import React, { useState } from 'react';
import { CartItem, Language } from '../types/ecommerce';
import { ProductArtwork } from './ProductArtwork';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedDiscount: { code: string; percent: number } | null;
  onApplyDiscount: (code: string) => boolean;
  onRemoveDiscount: () => void;
  theme: 'dark' | 'light';
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedDiscount,
  onApplyDiscount,
  onRemoveDiscount,
  theme,
  lang
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const currency = isAr ? 'ج.م' : 'EGP';

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percent) / 100 : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.05; // 5% VAT
  const shipping = subtotal > 3000 || items.length === 0 ? 0 : 75;
  const total = taxableAmount + tax + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const success = onApplyDiscount(couponInput.trim());
    if (success) {
      setCouponInput('');
    } else {
      setCouponError(t.couponInvalid);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Backdrop */}
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
          {/* Header */}
          <div className={`px-6 py-5 border-b flex items-center justify-between ${
            isDark ? 'border-stone-800 bg-stone-950/80' : 'border-stone-200 bg-stone-50'
          }`}>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#d4af37]">
                {t.bagTitle}
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                {t.bagItemsCount.replace('{count}', String(items.length))}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label={isAr ? 'إغلاق الحقيبة' : 'Close cart'}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isDark ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-400 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                  isDark ? 'bg-stone-900 text-[#d4af37]' : 'bg-stone-100 text-stone-500'
                }`}>
                  <Tag className="w-6 h-6" />
                </div>
                <p className="text-base font-bold font-serif mb-1">
                  {t.bagEmptyTitle}
                </p>
                <p className={`text-xs max-w-xs mb-6 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {t.bagEmptyDesc}
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-bold text-stone-950 bg-[#d4af37] rounded-lg hover:bg-amber-300 transition-colors shadow-sm cursor-pointer"
                >
                  {t.browseCollection}
                </button>
              </div>
            ) : (
              items.map(({ product, quantity, selectedSize }) => (
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
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={isAr ? `حذف ${product.nameAr}` : `Remove ${product.name}`}
                          className="text-stone-400 hover:text-rose-500 transition-colors p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px]">
                        <span className="text-[#d4af37] font-semibold font-mono">
                          {isAr ? 'المقاس:' : 'Size:'} {selectedSize}
                        </span>
                        <span aria-hidden="true" className={isDark ? 'text-stone-700' : 'text-stone-300'}>·</span>
                        <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>
                          {isAr ? product.categoryAr : product.category.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className={`flex items-center border rounded-md ${
                        isDark ? 'border-stone-700 bg-stone-950' : 'border-stone-300 bg-white'
                      }`}>
                        <button
                          onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                          className="px-2 py-0.5 text-stone-400 hover:text-white text-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, Math.min(product.stockCount, quantity + 1))}
                          className="px-2 py-0.5 text-stone-400 hover:text-white text-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono text-[#d4af37] tabular-nums">
                        {(product.price * quantity).toLocaleString()} {currency}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Breakdown */}
          {items.length > 0 && (
            <div className={`p-6 border-t space-y-4 ${
              isDark ? 'border-stone-800 bg-stone-950/90' : 'border-stone-200 bg-stone-50/80'
            }`}>
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t.couponPlaceholder}
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className={`flex-1 px-3 py-2 text-xs rounded-lg uppercase font-mono tracking-wider border focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
                      isDark 
                        ? 'bg-stone-900 border-stone-800 text-white placeholder-stone-400' 
                        : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400'
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-stone-950 bg-[#d4af37] hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.applyCoupon}
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-500">{couponError}</p>}
                {appliedDiscount && (
                  <div className="flex items-center justify-between text-[11px] text-emerald-500 font-semibold pt-1">
                    <span>{t.couponApplied.replace('{code}', appliedDiscount.code).replace('{percent}', String(appliedDiscount.percent))}</span>
                    <button
                      type="button"
                      onClick={onRemoveDiscount}
                      className="text-stone-400 hover:text-stone-200 underline cursor-pointer"
                    >
                      {t.removeCoupon}
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className={`space-y-1.5 text-xs pt-3 border-t ${
                isDark ? 'border-stone-800 text-stone-300' : 'border-stone-200 text-stone-600'
              }`}>
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-mono tabular-nums">{subtotal.toLocaleString()} {currency}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>{t.discount} ({appliedDiscount.percent}%)</span>
                    <span className="font-mono tabular-nums">-{discountAmount.toLocaleString()} {currency}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t.shipping}</span>
                  <span className="font-mono tabular-nums text-[#d4af37] font-semibold">
                    {shipping === 0 ? t.freeShippingThreshold : `${shipping} ${currency}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.vat}</span>
                  <span className="font-mono tabular-nums">{tax.toFixed(0)} {currency}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-stone-800 text-[#d4af37]">
                  <span>{t.totalDue}</span>
                  <span className="font-mono tabular-nums text-base">{total.toLocaleString()} {currency}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-300 via-[#d4af37] to-amber-500 hover:brightness-110 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{t.checkoutButton}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{t.checkoutCodNotice}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
