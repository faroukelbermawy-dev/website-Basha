import React from 'react';
import { ArrowRight, Sparkles, Check, Crown } from 'lucide-react';
import { ProductArtwork } from './ProductArtwork';
import { Language } from '../types/ecommerce';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  onExploreCatalog: () => void;
  theme: 'dark' | 'light';
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, theme, lang }) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  return (
    <section className={`relative transition-colors duration-200 border-b overflow-hidden ${
      isDark 
        ? 'bg-[#0a0a0a] border-[#d4af37]/20 text-white' 
        : 'bg-[#fafaf9] border-stone-200 text-stone-900'
    }`}>
      {/* Subtle Background Gold Aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Brand Story & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="flex items-center gap-1.5 text-amber-500">
                <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.heroKicker}</span>
              </span>
              <span aria-hidden="true" className={isDark ? 'text-stone-600' : 'text-stone-300'}>·</span>
              <span className={isDark ? 'text-stone-400 font-mono text-[11px]' : 'text-stone-500 font-mono text-[11px]'}>
                {t.heroSeason}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-[1.18] text-balance mb-4">
              {t.heroTitlePrefix} <br/>
              <span className="bg-gradient-to-r from-amber-200 via-[#d4af37] to-amber-500 bg-clip-text text-transparent">
                {t.heroTitleHighlight}
              </span>
            </h1>

            <p className={`text-sm sm:text-base max-w-xl leading-relaxed mb-8 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              {t.heroDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreCatalog}
                className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer ${
                  isDark
                    ? 'bg-gradient-to-r from-amber-400 via-[#d4af37] to-amber-500 text-stone-950 hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                    : 'bg-stone-950 text-white hover:bg-stone-800'
                }`}
              >
                <span>{t.heroCtaExplore}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('craftsmanship-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-stone-900/80 text-amber-300 border-[#d4af37]/40 hover:bg-stone-800 hover:border-[#d4af37]'
                    : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.heroCtaAtelier}</span>
              </button>
            </div>

            {/* Proof Points: explicitly 100% قطن مصري and شغل قطن يدوي */}
            <div className={`grid grid-cols-3 gap-6 pt-8 mt-8 border-t text-xs ${
              isDark ? 'border-stone-800 text-stone-300' : 'border-stone-200 text-stone-600'
            }`}>
              <div>
                <p className="text-lg font-bold font-serif text-[#d4af37]">{t.heroProofCotton}</p>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {t.heroProofCottonSub}
                </p>
              </div>
              <div>
                <p className="text-lg font-bold font-serif text-[#d4af37]">{t.heroProofHandwork}</p>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {t.heroProofHandworkSub}
                </p>
              </div>
              <div>
                <p className="text-lg font-bold font-serif text-[#d4af37]">{t.heroProofInspection}</p>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {t.heroProofInspectionSub}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Canvas */}
          <div className="lg:col-span-5">
            <div className={`relative rounded-xl border overflow-hidden shadow-xl transition-all ${
              isDark
                ? 'bg-stone-950 border-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.15)] text-stone-100'
                : 'bg-white border-stone-200 shadow-lg text-stone-900'
            }`}>
              <div className={`p-4 border-b flex items-center justify-between text-xs font-mono ${
                isDark ? 'border-stone-800 text-amber-300 bg-stone-900/50' : 'border-stone-100 text-stone-600 bg-stone-50'
              }`}>
                <span className="flex items-center gap-1.5 font-bold">
                  <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{t.heroSpotlightBadge}</span>
                </span>
                <span className="text-[#d4af37] font-semibold">{t.heroSpotlightFabric}</span>
              </div>

              <div className="aspect-4/3 w-full bg-[#0a0a0a] flex items-center justify-center p-2">
                <ProductArtwork type="royal-jellabiya-black-gold" isDark={isDark} className="w-full h-full" />
              </div>

              <div className={`p-5 ${isDark ? 'bg-stone-950' : 'bg-white'}`}>
                <div className="flex items-baseline justify-between mb-1">
                  <h2 className="text-base font-bold font-serif">
                    {isAr ? 'جلباب الباشا الملكي أسود مذهب' : 'Royal Black & Gold Heritage Jellabiya'}
                  </h2>
                  <span className="font-mono text-base font-bold text-[#d4af37] tabular-nums">
                    2,850 {isAr ? 'ج.م' : 'EGP'}
                  </span>
                </div>
                <p className={`text-xs mb-4 line-clamp-2 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {isAr 
                    ? '100% قطن مصري بشغل قطن يدوي متقن حول الياقة والأساور مع لمسات ذهبية تمنحك إطلالة الباشوات.' 
                    : 'Tailored from 100% pure Egyptian cotton with handcrafted cotton detailing and gold trims along the collar and cuffs.'}
                </p>

                <div className={`flex items-center justify-between pt-3 border-t text-xs ${
                  isDark ? 'border-stone-800' : 'border-stone-100'
                }`}>
                  <div className="flex items-center gap-1.5 text-emerald-500 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>{isAr ? 'متوفر بكافة المقاسات (54 - 62)' : 'Available in all sizes (54 - 62)'}</span>
                  </div>
                  <button
                    onClick={onExploreCatalog}
                    className="text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {t.heroSpotlightView}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
