import React, { useState } from 'react';
import { CartItem, ShippingAddress, Order, Language } from '../types/ecommerce';
import { X, Lock, CreditCard, Banknote, Smartphone, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: { code: string; percent: number } | null;
  onOrderComplete: (order: Order) => void;
  theme: 'dark' | 'light';
  lang: Language;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  onOrderComplete,
  theme,
  lang
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const currency = isAr ? 'ج.م' : 'EGP';

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: isAr ? 'المستشار طارق المنشاوي' : 'Counsellor Tarek El-Menshawy',
    email: 'tarek.almenshawy@vip.eg',
    phone: '+20 100 123 4567',
    street: isAr ? 'شارع قصر النيل، عمارة الإيموبيليا، الدور الرابع' : 'Qasr El-Nil St, Immobilia Building, 4th Floor',
    city: isAr ? 'القاهرة - وسط البلد' : 'Cairo - Downtown',
    state: isAr ? 'محافظة القاهرة' : 'Cairo Governorate',
    postalCode: '11511',
    country: isAr ? 'مصر' : 'Egypt'
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'instapay'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = discount ? (subtotal * discount.percent) / 100 : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.05;
  const shippingFee = subtotal > 3000 ? 0 : 75;
  const total = taxableAmount + tax + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `EB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingNumber = `BOSTA-VIP-${Math.floor(1000000 + Math.random() * 9000000)}`;

      const newOrder: Order = {
        id: `ord_eb_${Date.now()}`,
        orderNumber,
        createdAt: new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        status: 'Confirmed',
        items: items.map(item => ({
          productId: item.product.id,
          productName: `${isAr ? item.product.nameAr : item.product.name} (${item.selectedSize})`,
          size: item.selectedSize,
          quantity: item.quantity,
          unitPrice: item.product.price,
          totalPrice: item.product.price * item.quantity
        })),
        shippingAddress: address,
        shippingMethod: 'express',
        paymentMethod,
        subtotal,
        discount: discountAmount,
        shippingFee,
        tax,
        total,
        trackingNumber,
        estimatedDelivery: isAr ? 'خلال 24 إلى 48 ساعة حتى باب المنزل' : 'Within 24 to 48 hours to your doorstep'
      };

      setIsSubmitting(false);
      onOrderComplete(newOrder);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto" dir={isAr ? 'rtl' : 'ltr'}>
      <div 
        className={`relative w-full max-w-2xl border rounded-2xl shadow-2xl overflow-hidden my-8 transition-colors ${
          isDark 
            ? 'bg-[#121110] border-[#d4af37]/40 text-stone-100' 
            : 'bg-white border-stone-200 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${
          isDark ? 'border-stone-800 bg-stone-950/80' : 'border-stone-200 bg-stone-50'
        }`}>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#d4af37]" />
            <div>
              <h2 className="text-base font-bold font-serif text-[#d4af37]">
                {t.checkoutTitle}
              </h2>
              <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                {t.checkoutSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={isAr ? 'إغلاق نافذة الدفع' : 'Close checkout'}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'text-stone-400 hover:text-white' : 'text-stone-400 hover:text-stone-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Shipping Address */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
              {t.recipientSection}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className={`block mb-1 font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  {t.fullNameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-[#d4af37] ${
                    isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border font-mono focus:ring-1 focus:ring-[#d4af37] ${
                    isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={`block mb-1 font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  {t.streetLabel}
                </label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-[#d4af37] ${
                    isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  {t.cityLabel}
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-[#d4af37] ${
                    isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  {t.stateCountryLabel}
                </label>
                <input
                  type="text"
                  required
                  value={`${address.state} - ${address.country}`}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-[#d4af37] ${
                    isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
              {t.paymentSection}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-xl border ${isAr ? 'text-right' : 'text-left'} transition-all flex flex-col justify-between cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-[#d4af37] bg-[#d4af37]/15 shadow-sm ring-1 ring-[#d4af37]'
                    : isDark ? 'border-stone-800 bg-stone-900/60 text-stone-300' : 'border-stone-200 bg-white text-stone-700'
                }`}
              >
                <Banknote className="w-5 h-5 text-[#d4af37] mb-2" />
                <div>
                  <p className="text-xs font-bold text-[#d4af37]">{t.paymentCodTitle}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {t.paymentCodDesc}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-xl border ${isAr ? 'text-right' : 'text-left'} transition-all flex flex-col justify-between cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#d4af37] bg-[#d4af37]/15 shadow-sm ring-1 ring-[#d4af37]'
                    : isDark ? 'border-stone-800 bg-stone-900/60 text-stone-300' : 'border-stone-200 bg-white text-stone-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#d4af37] mb-2" />
                <div>
                  <p className="text-xs font-bold">{t.paymentCardTitle}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {t.paymentCardDesc}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('instapay')}
                className={`p-3.5 rounded-xl border ${isAr ? 'text-right' : 'text-left'} transition-all flex flex-col justify-between cursor-pointer ${
                  paymentMethod === 'instapay'
                    ? 'border-[#d4af37] bg-[#d4af37]/15 shadow-sm ring-1 ring-[#d4af37]'
                    : isDark ? 'border-stone-800 bg-stone-900/60 text-stone-300' : 'border-stone-200 bg-white text-stone-700'
                }`}
              >
                <Smartphone className="w-5 h-5 text-[#d4af37] mb-2" />
                <div>
                  <p className="text-xs font-bold">{t.paymentInstapayTitle}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {t.paymentInstapayDesc}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Totals Summary */}
          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            isDark ? 'bg-stone-950/70 border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex justify-between">
              <span>{t.subtotal} ({items.length})</span>
              <span className="font-mono tabular-nums">{subtotal.toLocaleString()} {currency}</span>
            </div>
            {discount && (
              <div className="flex justify-between text-emerald-500 font-semibold">
                <span>{t.discount} ({discount.code})</span>
                <span className="font-mono tabular-nums">-{discountAmount.toLocaleString()} {currency}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{t.shipping}</span>
              <span className="font-mono tabular-nums text-[#d4af37] font-semibold">
                {shippingFee === 0 ? (isAr ? 'مجاني' : 'Free') : `${shippingFee} ${currency}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t.vat}</span>
              <span className="font-mono tabular-nums">{tax.toFixed(0)} {currency}</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-stone-700 text-[#d4af37]">
              <span>{t.totalDue}</span>
              <span className="font-mono tabular-nums text-base">{total.toLocaleString()} {currency}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-300 via-[#d4af37] to-amber-500 hover:brightness-110 disabled:opacity-50 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            {isSubmitting ? (
              <span>{t.submittingOrder}</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>{t.confirmOrderButton.replace('{amount}', total.toLocaleString())}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
