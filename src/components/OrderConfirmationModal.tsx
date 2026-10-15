import React from 'react';
import { Order, Language } from '../types/ecommerce';
import { Truck, Printer, Crown } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  theme: 'dark' | 'light';
  lang: Language;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  theme,
  lang
}) => {
  if (!order) return null;
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const currency = isAr ? 'ج.م' : 'EGP';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-xs overflow-y-auto" dir={isAr ? 'rtl' : 'ltr'}>
      <div 
        className={`relative w-full max-w-2xl border rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 transition-colors ${
          isDark 
            ? 'bg-[#121110] border-[#d4af37]/40 text-stone-100' 
            : 'bg-white border-stone-200 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-stone-950 via-[#14120f] to-stone-950 border-b border-[#d4af37]/30 text-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] shrink-0">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs font-mono text-[#d4af37]">{t.orderNumberLabel.replace('{orderNumber}', order.orderNumber)}</p>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-white">{t.orderConfirmedGreeting}</h2>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-stone-900 hover:bg-stone-800 border border-[#d4af37]/40 rounded-lg transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.printReceipt}</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[75vh] sm:max-h-[70vh] overflow-y-auto">
          {/* Tracking Bar */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-stone-950/70 border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#d4af37]" />
                <span className="font-bold">{t.courierTitle}</span>
              </div>
              <span className="font-mono text-[#d4af37] font-semibold">{order.trackingNumber}</span>
            </div>
            <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              {t.estimatedDeliveryPrefix} <span className="font-bold text-emerald-500">{order.estimatedDelivery}</span>
            </p>
          </div>

          {/* Recipient & Payment Method */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs ${
            isDark ? 'text-stone-300' : 'text-stone-600'
          }`}>
            <div>
              <h4 className="font-bold text-[#d4af37] mb-1">{t.dispatchAddress}</h4>
              <p className="font-semibold text-white">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city} · {order.shippingAddress.country}</p>
              <p className="font-mono text-stone-400 mt-1">{order.shippingAddress.phone}</p>
            </div>

            <div>
              <h4 className="font-bold text-[#d4af37] mb-1">{t.paymentMethodUsed}</h4>
              <p className="font-semibold">
                {order.paymentMethod === 'cod'
                  ? (isAr ? 'الدفع عند الاستلام بعد المعاينة والقياس' : 'Cash on Delivery upon Inspection')
                  : order.paymentMethod === 'card'
                  ? (isAr ? 'بطاقة بنكية (تم السداد بنجاح)' : 'Bank Card (Paid Successfully)')
                  : (isAr ? 'تحويل إنستاباي / محفظة إلكترونية' : 'InstaPay / Mobile Wallet')}
              </p>
              <p className="text-stone-400 mt-1">
                {isAr ? 'تم إرسال إشعار التأكيد وتفاصيل الفاتورة عبر الهاتف' : 'Confirmation notice and dispatch details dispatched via WhatsApp'}
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
              {t.orderManifest}
            </h4>
            <div className={`border rounded-xl overflow-hidden text-xs ${
              isDark ? 'border-stone-800' : 'border-stone-200'
            }`}>
              <table className={`w-full ${isAr ? 'text-right' : 'text-left'}`}>
                <thead className={isDark ? 'bg-stone-900 text-stone-400' : 'bg-stone-50 text-stone-500'}>
                  <tr>
                    <th className="p-3 font-semibold">{t.productCol}</th>
                    <th className="p-3 font-semibold text-center">{t.qtyCol}</th>
                    <th className={`p-3 font-semibold ${isAr ? 'text-left' : 'text-right'}`}>{t.unitPriceCol}</th>
                    <th className={`p-3 font-semibold ${isAr ? 'text-left' : 'text-right'}`}>{t.lineTotalCol}</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-stone-800' : 'divide-stone-100'}`}>
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold">{item.productName}</td>
                      <td className="p-3 text-center font-mono tabular-nums">{item.quantity}</td>
                      <td className={`p-3 ${isAr ? 'text-left' : 'text-right'} font-mono tabular-nums text-stone-400`}>
                        {item.unitPrice.toLocaleString()} {currency}
                      </td>
                      <td className={`p-3 ${isAr ? 'text-left' : 'text-right'} font-mono tabular-nums font-bold text-[#d4af37]`}>
                        {item.totalPrice.toLocaleString()} {currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={`p-4 border-t space-y-1 ${isAr ? 'text-left' : 'text-right'} text-xs ${
                isDark ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-200'
              }`}>
                <div className="flex justify-between text-stone-400">
                  <span className={isAr ? 'text-right' : 'text-left'}>{t.subtotal}</span>
                  <span className="font-mono tabular-nums">{order.subtotal.toLocaleString()} {currency}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>{t.discount}</span>
                    <span className="font-mono tabular-nums">-{order.discount.toLocaleString()} {currency}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>{t.shipping}</span>
                  <span className="font-mono tabular-nums text-[#d4af37]">
                    {order.shippingFee === 0 ? (isAr ? 'مجاني' : 'Free') : `${order.shippingFee} ${currency}`}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>{t.vat}</span>
                  <span className="font-mono tabular-nums">{order.tax.toFixed(0)} {currency}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-stone-800 text-[#d4af37]">
                  <span>{t.totalDue}</span>
                  <span className="font-mono tabular-nums">{order.total.toLocaleString()} {currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Concierge Note */}
          <div className="p-4 bg-amber-950/40 border border-[#d4af37]/40 rounded-xl flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>{t.conciergeNotice}</span>
            </div>
            <span className="font-bold text-[#d4af37] whitespace-nowrap ml-3">
              {t.vipSupport}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex justify-end ${
          isDark ? 'border-stone-800 bg-stone-950' : 'border-stone-200 bg-stone-50'
        }`}>
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold text-stone-950 bg-[#d4af37] hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            {t.continueShopping}
          </button>
        </div>
      </div>
    </div>
  );
};
