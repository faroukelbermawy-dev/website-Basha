import React from 'react';

interface EliteBashaLogoProps {
  className?: string;
  isDark?: boolean;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const EliteBashaLogo: React.FC<EliteBashaLogoProps> = ({
  className = '',
  isDark = true,
  showSubtitle = true,
  size = 'md'
}) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-7 h-7 sm:w-9 sm:h-9';
  const titleSize = size === 'sm' ? 'text-xs sm:text-sm' : size === 'lg' ? 'text-xl sm:text-2xl' : 'text-sm sm:text-lg';

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      {/* Bespoke Royal Pasha Monogram Crest */}
      <div className={`relative ${iconSize} shrink-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#1c1917] via-[#0c0a09] to-[#000000] border border-[#d4af37]/60 shadow-[0_0_12px_rgba(212,175,55,0.25)]`}>
        <svg viewBox="0 0 100 100" className="w-full h-full p-0.5 sm:p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Outer Diamond Shield */}
          <rect x="50" y="8" width="59" height="59" rx="6" transform="rotate(45 50 8)" stroke="url(#goldGradient)" strokeWidth="2.5" />
          
          {/* Royal Pasha Crown / Fez Cap Tassel Motif */}
          <path d="M38 28 L62 28 L58 35 L42 35 Z" fill="url(#goldGradient)" />
          <line x1="50" y1="28" x2="66" y2="22" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
          <circle cx="66" cy="22" r="2.5" fill="#f59e0b" />

          {/* Interlocking Monogram EB */}
          {/* E */}
          <path d="M35 40 L35 72 L52 72 M35 56 L48 56 M35 40 L52 40" stroke="url(#goldGradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* B */}
          <path d="M48 40 L48 72 L58 72 C63 72 67 68 67 63 C67 58 63 56 58 56 C62 56 65 52 65 48 C65 43 62 40 57 40 Z" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />

          {/* Star Accent */}
          <polygon points="50,77 52,82 57,82 53,85 55,90 50,87 45,90 47,85 43,82 48,82" fill="url(#goldGradient)" />

          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography: Elite Basha / إليت باشا */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-bold tracking-wider font-serif uppercase ${titleSize} ${isDark ? 'text-white' : 'text-stone-900'}`}>
            Elite <span className="bg-gradient-to-r from-amber-300 via-[#d4af37] to-amber-500 bg-clip-text text-transparent">Basha</span>
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-[9px] sm:text-[10px] tracking-widest font-medium uppercase mt-0.5 hidden xs:inline sm:inline ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            إليت باشا · Haute Couture
          </span>
        )}
      </div>
    </div>
  );
};
