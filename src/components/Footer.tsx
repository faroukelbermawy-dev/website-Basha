import React from 'react';
import { EliteBashaLogo } from './EliteBashaLogo';
import { Language } from '../types/ecommerce';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  onScrollToTop: () => void;
  theme: 'dark' | 'light';
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, theme, lang }) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  return (
    <footer className={`border-t text-xs transition-colors duration-200 ${
      isDark 
        ? 'bg-[#080706] border-stone-800 text-stone-300' 
        : 'bg-stone-900 border-stone-800 text-stone-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <EliteBashaLogo isDark={true} size="md" />
            <p className="text-stone-400 text-xs leading-relaxed max-w-xs mt-2">
              {t.footerDesc}
            </p>
          </div>

          {/* Links: Garments */}
          <div>
            <h4 className="font-bold text-[#d4af37] mb-3 tracking-wider uppercase text-[11px]">
              {t.footerGarmentsTitle}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={onScrollToTop} className="hover:text-white transition-colors cursor-pointer">
                  {isAr ? 'جلاليب ملكية بشغل قطن يدوي' : 'Royal Jellabiyas with Handcrafted Cotton'}
                </button>
              </li>
              <li>
                <button onClick={onScrollToTop} className="hover:text-white transition-colors cursor-pointer">
                  {isAr ? 'ثياب مغربية بيضاء مذهبة' : 'Imperial Moroccan Thobes'}
                </button>
              </li>
              <li>
                <button onClick={onScrollToTop} className="hover:text-white transition-colors cursor-pointer">
                  {isAr ? 'بدل سهرة كلاسيك' : 'Classic Evening Tuxedos'}
                </button>
              </li>
              <li>
                <button onClick={onScrollToTop} className="hover:text-white transition-colors cursor-pointer">
                  {isAr ? 'بشوت كشمير وفروات شتوية' : 'Royal Bishts & Winter Farwas'}
                </button>
              </li>
              <li>
                <button onClick={onScrollToTop} className="hover:text-white transition-colors cursor-pointer">
                  {isAr ? 'أحذية وإكسسوارات ذهبية' : 'Gold Accessories & Leather Footwear'}
                </button>
              </li>
            </ul>
          </div>

          {/* Links: Shopping & Guarantees */}
          <div>
            <h4 className="font-bold text-[#d4af37] mb-3 tracking-wider uppercase text-[11px]">
              {t.footerGuaranteesTitle}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={onScrollToTop} 
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  {isAr ? 'الدفع عند الاستلام بعد المعاينة والقياس' : 'Cash on Delivery upon Inspection'}
                </button>
              </li>
              <li>
                <button 
                  onClick={onScrollToTop} 
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  {isAr ? 'جدول مقاسات الباشا المعتمد' : 'Basha Certified Sizing Guide'}
                </button>
              </li>
              <li>
                <button 
                  onClick={onScrollToTop} 
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  {isAr ? 'استبدال فوري للمقاسات مجاناً' : 'Instant Complimentary Size Exchange'}
                </button>
              </li>
              <li>
                <button 
                  onClick={onScrollToTop} 
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  {isAr ? 'ضمان 100% قطن مصري أصيل' : '100% Pure Egyptian Cotton Guarantee'}
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-[#d4af37] mb-3 tracking-wider uppercase text-[11px]">
              {t.footerCustomerServiceTitle}
            </h4>
            <p className="text-stone-400 leading-relaxed mb-3">
              {isAr ? 'استفسارات عن المقاسات، تفصيل البدل الخاصة، أو متابعة الشحنات:' : 'Inquiries regarding sizing, custom tailoring, or shipment tracking:'}
            </p>
            <p className="font-mono text-amber-300 font-semibold mb-1" dir="ltr">
              {t.footerWhatsappPrefix} +20 100 123 4567
            </p>
            <p className="font-mono text-stone-400" dir="ltr">
              concierge@elitebasha.store
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 text-center sm:text-start">
          <p>{t.footerCopyright}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 text-[#d4af37]">
            <span>{isAr ? '100% قطن مصري فاخر' : '100% Pure Egyptian Cotton'}</span>
            <span aria-hidden="true" className="hidden xs:inline">·</span>
            <span>{isAr ? 'شغل قطن يدوي راقي' : 'Handcrafted Cotton Stitching'}</span>
            <span aria-hidden="true" className="hidden xs:inline">·</span>
            <span>{isAr ? 'توصيل ومعاينة لكافة المحافظات' : 'Nationwide Fitting & Delivery'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
