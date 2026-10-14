import React from 'react';
import { ShoppingBag, Sun, Moon, Heart, Languages } from 'lucide-react';
import { EliteBashaLogo } from './EliteBashaLogo';
import { Language } from '../types/ecommerce';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToCatalog: () => void;
  onSelectHandcrafted?: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onScrollToCatalog,
  onSelectHandcrafted,
  onOpenWishlist,
  wishlistCount,
  theme,
  onToggleTheme,
  lang,
  onToggleLang
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-200 border-b backdrop-blur-md ${
      isDark 
        ? 'bg-[#0a0a0a]/95 border-[#d4af37]/25 text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]' 
        : 'bg-[#ffffff]/95 border-stone-200 text-stone-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-3.5">
        {/* Zone 1: Elite Basha Brand Wordmark & Monogram Crest */}
        <button
          onClick={onScrollToCatalog}
          className="flex items-center gap-2 text-left cursor-pointer transition-opacity hover:opacity-90 shrink-0"
          aria-label="Elite Basha Homepage"
        >
          <EliteBashaLogo isDark={isDark} size="md" />
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide uppercase">
          <button
            onClick={onScrollToCatalog}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isDark ? 'text-[#d4af37]' : 'text-stone-950 font-bold'
            }`}
          >
            {t.navCatalog}
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isDark ? 'text-stone-300 hover:text-[#d4af37]' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.navJellabiya}
          </button>

          {/* شغل قطن يدوي (Handcrafted Cotton) nav button */}
          <button
            onClick={() => {
              if (onSelectHandcrafted) {
                onSelectHandcrafted();
              } else {
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer ${
              isDark ? 'text-amber-300 hover:text-[#d4af37]' : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span>{t.navHandcrafted}</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('craftsmanship-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isDark ? 'text-stone-300 hover:text-[#d4af37]' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.navAtelier}
          </button>

          <button
            onClick={onOpenWishlist}
            className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isDark ? 'text-stone-300 hover:text-[#d4af37]' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
            <span>{t.navWishlist} ({wishlistCount})</span>
          </button>
        </nav>

        {/* Zone 3: Language Toggle + Dark/White Toggle + Shopping Bag */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Toggle Button (عربي / English) */}
          <button
            onClick={onToggleLang}
            title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
            aria-label={`Switch language to ${lang === 'ar' ? 'English' : 'العربية'}`}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all duration-200 cursor-pointer shadow-sm ${
              isDark
                ? 'bg-stone-900/90 text-[#d4af37] border-[#d4af37]/40 hover:bg-stone-800 hover:border-[#d4af37]'
                : 'bg-stone-100 text-stone-900 border-stone-300 hover:bg-stone-200'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-semibold text-[11px] uppercase tracking-wider">
              {lang === 'ar' ? 'English' : 'عربي'}
            </span>
          </button>

          {/* Dark / White Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDark ? 'White' : 'Dark'} mode`}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 cursor-pointer ${
              isDark
                ? 'bg-stone-900/90 text-amber-300 border-[#d4af37]/40 hover:bg-stone-800 hover:border-[#d4af37]'
                : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200 hover:text-stone-900'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-[11px] hidden sm:inline">{t.switchThemeLight}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-stone-700" />
                <span className="font-mono text-[11px] hidden sm:inline">{t.switchThemeDark}</span>
              </>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label={`Open shopping cart with ${cartCount} items`}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer ${
              isDark
                ? 'bg-gradient-to-r from-amber-400 via-[#d4af37] to-amber-500 text-stone-950 hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-stone-950 text-white hover:bg-stone-800'
            }`}
          >
            <ShoppingBag className={`w-3.5 h-3.5 ${isDark ? 'text-stone-950' : 'text-stone-200'}`} />
            <span>{t.navBag}</span>
            <span className={`font-mono tabular-nums px-1.5 py-0.2 rounded text-[11px] font-bold ${
              isDark ? 'bg-stone-950 text-amber-300' : 'bg-stone-800 text-stone-200'
            }`}>
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
