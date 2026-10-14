import React from 'react';
import { Scissors, Sparkles, ShieldCheck, Crown } from 'lucide-react';
import { Language } from '../types/ecommerce';
import { TRANSLATIONS } from '../data/translations';

interface CraftsmanshipSectionProps {
  theme: 'dark' | 'light';
  lang: Language;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({ theme, lang }) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];

  return (
    <section id="craftsmanship-section" className={`border-t py-16 transition-colors duration-200 ${
      isDark ? 'bg-[#0a0a0a] border-stone-800 text-white' : 'bg-stone-50 border-stone-200 text-stone-900'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-2">
            <Crown className="w-4 h-4" />
            <span>{t.atelierKicker}</span>
          </div>
          <h2 className="text-3xl font-serif font-bold tracking-tight leading-tight">
            {t.atelierTitle}
          </h2>
          <p className={`text-sm mt-3 leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
            {t.atelierDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`p-6 rounded-xl border transition-all ${
            isDark ? 'bg-stone-900/60 border-[#d4af37]/30 shadow-md' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <Scissors className="w-6 h-6 text-[#d4af37] mb-4" />
            <h3 className="text-base font-bold font-serif mb-2">
              {t.atelierCard1Title}
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              {t.atelierCard1Desc}
            </p>
          </div>

          <div className={`p-6 rounded-xl border transition-all ${
            isDark ? 'bg-stone-900/60 border-[#d4af37]/30 shadow-md' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <Sparkles className="w-6 h-6 text-[#d4af37] mb-4" />
            <h3 className="text-base font-bold font-serif mb-2">
              {t.atelierCard2Title}
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              {t.atelierCard2Desc}
            </p>
          </div>

          <div className={`p-6 rounded-xl border transition-all ${
            isDark ? 'bg-stone-900/60 border-[#d4af37]/30 shadow-md' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <ShieldCheck className="w-6 h-6 text-[#d4af37] mb-4" />
            <h3 className="text-base font-bold font-serif mb-2">
              {t.atelierCard3Title}
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              {t.atelierCard3Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
