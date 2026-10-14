import React from 'react';

interface ProductArtworkProps {
  type: string;
  className?: string;
  isDark?: boolean;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  type,
  className = 'w-full h-full',
  isDark = true
}) => {
  const bgSurface = isDark ? 'bg-[#0f0e0c]' : 'bg-[#18181b]';

  switch (type) {
    case 'royal-jellabiya-black-gold':
      return (
        <div className={`relative flex items-center justify-center ${bgSurface} overflow-hidden ${className}`}>
          {/* Ambient Gold Halo */}
          <div className="absolute inset-0 bg-radial from-[#d4af37]/15 via-transparent to-transparent pointer-events-none" />
          <svg viewBox="0 0 400 340" className="w-full h-full max-h-76 p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hanger Silhouette */}
            <path d="M165 48 C185 32 215 32 235 48 L275 62 L125 62 Z" fill="#292524" stroke="#d4af37" strokeWidth="1" />
            <circle cx="200" cy="30" r="8" stroke="#d4af37" strokeWidth="2" fill="none" />

            {/* Jellabiya Body: Deep Black Egyptian Cotton Gown */}
            <path d="M140 68 L100 135 L125 142 L146 112 L140 310 L260 310 L254 112 L275 142 L300 135 L260 68 Z" 
                  fill="#141416" stroke="#2c2a26" strokeWidth="1.5" />
            
            {/* Subtle Fabric Folds Shadow */}
            <path d="M190 120 L188 310" stroke="#09090b" strokeWidth="4" opacity="0.6" />
            <path d="M210 120 L212 310" stroke="#09090b" strokeWidth="4" opacity="0.6" />

            {/* Royal Gold Collar Embroidery (شغل قطن يدوي وتطريز مذهب) */}
            <path d="M180 68 C180 82 220 82 220 68 L226 68 C226 90 174 90 174 68 Z" fill="#d4af37" />
            
            {/* Vertical Gold Placket (تطريز يدوي وصدرية مذهبة) */}
            <rect x="195" y="80" width="10" height="95" rx="2" fill="#d4af37" />
            <line x1="200" y1="80" x2="200" y2="175" stroke="#78350f" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Hand-Braided Gold Knots / Buttons (عقد يدوية مذهبة) */}
            <circle cx="200" cy="92" r="3" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
            <circle cx="200" cy="112" r="3" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
            <circle cx="200" cy="132" r="3" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
            <circle cx="200" cy="152" r="3" fill="#fef08a" stroke="#b45309" strokeWidth="1" />

            {/* Gold Sleeve Cuffs (أساور مطرزة) */}
            <rect x="98" y="130" width="28" height="6" rx="1" transform="rotate(18 98 130)" fill="#d4af37" />
            <rect x="274" y="138" width="28" height="6" rx="1" transform="rotate(-18 274 138)" fill="#d4af37" />

            {/* Bottom Hem Gold Trim */}
            <line x1="140" y1="305" x2="260" y2="305" stroke="#d4af37" strokeWidth="2" />
            <text x="200" y="328" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="serif" letterSpacing="3">
              ELITE BASHA · جلباب ملكي
            </text>
          </svg>
        </div>
      );

    case 'moroccan-thobe-white-gold':
      return (
        <div className={`relative flex items-center justify-center ${bgSurface} overflow-hidden ${className}`}>
          <div className="absolute inset-0 bg-radial from-[#d4af37]/20 via-transparent to-transparent pointer-events-none" />
          <svg viewBox="0 0 400 340" className="w-full h-full max-h-76 p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M165 48 C185 32 215 32 235 48 L275 62 L125 62 Z" fill="#292524" stroke="#d4af37" strokeWidth="1" />
            <circle cx="200" cy="30" r="8" stroke="#d4af37" strokeWidth="2" fill="none" />

            {/* Pristine White / Ivory Moroccan Thobe */}
            <path d="M140 68 L100 135 L125 142 L146 112 L140 310 L260 310 L254 112 L275 142 L300 135 L260 68 Z" 
                  fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
            
            {/* Shading */}
            <path d="M188 120 L186 310" stroke="#cbd5e1" strokeWidth="3" opacity="0.5" />
            <path d="M212 120 L214 310" stroke="#cbd5e1" strokeWidth="3" opacity="0.5" />

            {/* Elaborate Moroccan Tarz Embroidered Chest Mandala in Gold */}
            <circle cx="200" cy="110" r="28" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="200" cy="110" r="20" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="200" cy="110" r="6" fill="#d4af37" />

            {/* Golden Moroccan Sfifa Center Placket */}
            <rect x="197" y="68" width="6" height="110" rx="1" fill="#d4af37" />
            <circle cx="200" cy="78" r="2.5" fill="#fef08a" />
            <circle cx="200" cy="94" r="2.5" fill="#fef08a" />
            <circle cx="200" cy="126" r="2.5" fill="#fef08a" />
            <circle cx="200" cy="142" r="2.5" fill="#fef08a" />

            {/* Sleeve Cuffs */}
            <rect x="98" y="130" width="28" height="6" rx="1" transform="rotate(18 98 130)" fill="#d4af37" />
            <rect x="274" y="138" width="28" height="6" rx="1" transform="rotate(-18 274 138)" fill="#d4af37" />

            <text x="200" y="328" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="serif" letterSpacing="3">
              GANDORA MAROCAINE · ثوب أبيض مذهب
            </text>
          </svg>
        </div>
      );

    case 'basha-tuxedo-suit':
      return (
        <div className={`relative flex items-center justify-center ${bgSurface} overflow-hidden ${className}`}>
          <div className="absolute inset-0 bg-radial from-[#d4af37]/15 via-transparent to-transparent pointer-events-none" />
          <svg viewBox="0 0 400 340" className="w-full h-full max-h-76 p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Tuxedo Jacket Silhouette */}
            <path d="M130 65 L90 140 L125 145 L138 120 L135 295 L265 295 L262 120 L275 145 L310 140 L270 65 Z" 
                  fill="#0c0a09" stroke="#292524" strokeWidth="1.5" />

            {/* Crisp White Tuxedo Shirt V-Chest */}
            <path d="M175 65 L200 150 L225 65 Z" fill="#ffffff" />
            {/* Black Silk Bowtie */}
            <path d="M190 75 L210 75 L205 85 L210 95 L190 95 L195 85 Z" fill="#18181b" stroke="#d4af37" strokeWidth="0.8" />
            <circle cx="200" cy="85" r="2.5" fill="#d4af37" />

            {/* Gold Studs on White Shirt */}
            <circle cx="200" cy="110" r="2" fill="#d4af37" />
            <circle cx="200" cy="128" r="2" fill="#d4af37" />

            {/* Satin Peak Lapels (شال البدلة الساتان) */}
            <path d="M165 65 L150 140 L200 190 L185 130 Z" fill="#1c1917" stroke="#d4af37" strokeWidth="1" />
            <path d="M235 65 L250 140 L200 190 L215 130 Z" fill="#1c1917" stroke="#d4af37" strokeWidth="1" />

            {/* Golden Pasha Heraldic Crest Buttons */}
            <circle cx="185" cy="195" r="5" fill="#d4af37" stroke="#fef08a" strokeWidth="1" />
            <circle cx="215" cy="195" r="5" fill="#d4af37" stroke="#fef08a" strokeWidth="1" />
            <circle cx="185" cy="225" r="5" fill="#d4af37" stroke="#fef08a" strokeWidth="1" />
            <circle cx="215" cy="225" r="5" fill="#d4af37" stroke="#fef08a" strokeWidth="1" />

            {/* Gold Edge Pocket Square */}
            <path d="M152 145 L172 145 L170 148 L154 148 Z" fill="#d4af37" />
            <path d="M158 140 L166 140 L162 145 Z" fill="#ffffff" />

            <text x="200" y="324" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="serif" letterSpacing="3">
              BASHA TUXEDO · بدلة الباشا الكلاسيك
            </text>
          </svg>
        </div>
      );

    case 'cashmere-winter-bisht':
      return (
        <div className={`relative flex items-center justify-center ${bgSurface} overflow-hidden ${className}`}>
          <div className="absolute inset-0 bg-radial from-[#d4af37]/20 via-transparent to-transparent pointer-events-none" />
          <svg viewBox="0 0 400 340" className="w-full h-full max-h-76 p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Royal Bisht Cape Flow */}
            <path d="M150 60 C120 100 80 180 80 290 L320 290 C320 180 280 100 250 60 Z" 
                  fill="#1c1917" stroke="#292524" strokeWidth="1.5" />

            {/* Heavy Bullion Gold Zari Trimming along entire collar and front opening (الزري الملكي الألماني) */}
            <path d="M165 60 C175 75 190 85 200 85 C210 85 225 75 235 60 L245 60 C235 85 215 98 200 98 C185 98 165 85 155 60 Z" fill="#d4af37" />
            
            {/* Front Opening Zari Gold Bands */}
            <rect x="194" y="98" width="12" height="192" fill="#d4af37" />
            <rect x="197" y="98" width="6" height="192" fill="#fef08a" />

            {/* Golden Braided Tassels (البريم الملكي وشغل قطن يدوي) */}
            <path d="M194 135 C180 155 175 180 178 205" stroke="#d4af37" strokeWidth="2.5" fill="none" />
            <circle cx="178" cy="208" r="4" fill="#f59e0b" />
            <path d="M206 135 C220 155 225 180 222 205" stroke="#d4af37" strokeWidth="2.5" fill="none" />
            <circle cx="222" cy="208" r="4" fill="#f59e0b" />

            <text x="200" y="322" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="serif" letterSpacing="3">
              ROYAL CASHMERE BISHT · بشت صوف كشمير
            </text>
          </svg>
        </div>
      );

    case 'italian-linen-shirt':
      return (
        <div className={`relative flex items-center justify-center ${bgSurface} overflow-hidden ${className}`}>
          <div className="absolute inset-0 bg-radial from-stone-400/10 via-transparent to-transparent pointer-events-none" />
          <svg viewBox="0 0 400 340" className="w-full h-full max-h-76 p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shirt Hanger */}
            <path d="M165 52 C185 36 215 36 235 52 L275 66 L125 66 Z" fill="#292524" stroke="#d4af37" strokeWidth="1" />
            
            {/* White Tailored Linen / Egyptian Cotton Shirt */}
            <path d="M140 70 L95 135 L125 142 L146 112 L142 280 L258 280 L254 112 L275 142 L305 135 L260 70 Z" 
                  fill="#fcfbf7" stroke="#e7e5e4" strokeWidth="1.5" />

            {/* Mandarin Grandad Collar with Gold Accent Button */}
            <path d="M178 70 C178 82 222 82 222 70 Z" fill="#ffffff" stroke="#d6d3d1" strokeWidth="1.5" />
            <circle cx="200" cy="78" r="3" fill="#d4af37" stroke="#fef08a" strokeWidth="0.8" />

            {/* Front Placket */}
            <rect x="195" y="85" width="10" height="185" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="0.5" />
            
            {/* Mother of Pearl Buttons with Gold Rim */}
            <circle cx="200" cy="105" r="2.5" fill="#ffffff" stroke="#d4af37" strokeWidth="1" />
            <circle cx="200" cy="135" r="2.5" fill="#ffffff" stroke="#d4af37" strokeWidth="1" />
            <circle cx="200" cy="165" r="2.5" fill="#ffffff" stroke="#d4af37" strokeWidth="1" />
            <circle cx="200" cy="195" r="2.5" fill="#ffffff" stroke="#d4af37" strokeWidth="1" />
            <circle cx="200" cy="225" r="2.5" fill="#ffffff" stroke="#d4af37" strokeWidth="1" />

            {/* Pocket with subtle Gold Monogram EB */}
            <rect x="156" y="125" width="26" height="32" rx="2" fill="#ffffff" stroke="#e7e5e4" strokeWidth="1" />
            <text x="169" y="145" textAnchor="middle" fill="#d4af37" fontSize="7" fontFamily="serif" fontWeight="bold">EB</text>

            <text x="200" y="322" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="serif" letterSpacing="3">
              EGYPTIAN COTTON &amp; LINEN · قميص لينين فاخر
            </text>
          </svg>
        </div>
      );

    case 'classic-leather-oxford':
      return (
        <div className={`relative flex items-center justify-center ${bgSurface} overflow-hidden ${className}`}>
          <div className="absolute inset-0 bg-radial from-[#d4af37]/15 via-transparent to-transparent pointer-events-none" />
          <svg viewBox="0 0 400 340" className="w-full h-full max-h-76 p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Polished Black Calfskin Double Monk Strap Shoe */}
            {/* Sole */}
            <path d="M90 220 C110 220 130 215 155 218 C220 222 280 230 320 220 C325 220 330 225 320 230 C270 240 180 240 100 240 C85 240 85 220 90 220 Z" 
                  fill="#451a03" stroke="#78350f" strokeWidth="1.5" />
            <rect x="95" y="235" width="45" height="15" rx="3" fill="#292524" />

            {/* Upper Shoe Profile */}
            <path d="M95 220 C95 180 125 150 160 160 C185 167 220 185 260 190 C300 195 325 210 320 220 C280 230 160 222 95 220 Z" 
                  fill="#0c0a09" stroke="#292524" strokeWidth="2" />
            
            {/* Cap Toe Stitching */}
            <path d="M260 190 C265 205 270 215 272 222" stroke="#d4af37" strokeWidth="1" strokeDasharray="2 2" />

            {/* Double Monk Straps with Solid Gold Buckles */}
            {/* Strap 1 */}
            <path d="M165 162 L185 195" stroke="#1c1917" strokeWidth="10" strokeLinecap="round" />
            <rect x="180" y="190" width="12" height="10" rx="2" fill="none" stroke="#d4af37" strokeWidth="2.5" />
            <line x1="180" y1="195" x2="192" y2="195" stroke="#fef08a" strokeWidth="1.5" />

            {/* Strap 2 */}
            <path d="M185 168 L205 201" stroke="#1c1917" strokeWidth="10" strokeLinecap="round" />
            <rect x="200" y="196" width="12" height="10" rx="2" fill="none" stroke="#d4af37" strokeWidth="2.5" />
            <line x1="200" y1="201" x2="212" y2="201" stroke="#fef08a" strokeWidth="1.5" />

            {/* Leather Gloss Highlight */}
            <path d="M125 180 C150 170 180 175 210 185" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />

            <text x="200" y="300" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="serif" letterSpacing="3">
              HANDMADE LEATHER MONK STRAP · حذاء باشا جلد طبيعي
            </text>
          </svg>
        </div>
      );

    case 'golden-cufflinks-set':
      return (
        <div className={`relative flex items-center justify-center ${bgSurface} overflow-hidden ${className}`}>
          <div className="absolute inset-0 bg-radial from-[#d4af37]/25 via-transparent to-transparent pointer-events-none" />
          <svg viewBox="0 0 400 340" className="w-full h-full max-h-76 p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Luxury Velvet Display Case Base */}
            <rect x="80" y="70" width="240" height="190" rx="12" fill="#1c1917" stroke="#d4af37" strokeWidth="1.5" />
            <rect x="90" y="80" width="220" height="170" rx="8" fill="#0c0a09" />

            {/* Left 18K Gold Cufflink */}
            <circle cx="150" cy="165" r="34" fill="#d4af37" stroke="#fef08a" strokeWidth="2" />
            <circle cx="150" cy="165" r="26" fill="#09090b" stroke="#b45309" strokeWidth="1.5" />
            <text x="150" y="172" textAnchor="middle" fill="#d4af37" fontSize="16" fontFamily="serif" fontWeight="bold">EB</text>

            {/* Right 18K Gold Cufflink */}
            <circle cx="250" cy="165" r="34" fill="#d4af37" stroke="#fef08a" strokeWidth="2" />
            <circle cx="250" cy="165" r="26" fill="#09090b" stroke="#b45309" strokeWidth="1.5" />
            <text x="250" y="172" textAnchor="middle" fill="#d4af37" fontSize="16" fontFamily="serif" fontWeight="bold">EB</text>

            {/* Gold Pasha Tie Clip (دبوس كرافات مذهب) */}
            <rect x="130" y="215" width="140" height="8" rx="3" fill="#d4af37" stroke="#fef08a" strokeWidth="1" />
            <circle cx="200" cy="219" r="2.5" fill="#000000" />

            <text x="200" y="302" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="serif" letterSpacing="3">
              18K GOLD CUFFLINKS · أزرار أكمام ذهبية عيار 18
            </text>
          </svg>
        </div>
      );

    case 'royal-winter-farwa':
    default:
      return (
        <div className={`relative flex items-center justify-center ${bgSurface} overflow-hidden ${className}`}>
          <div className="absolute inset-0 bg-radial from-[#d4af37]/20 via-transparent to-transparent pointer-events-none" />
          <svg viewBox="0 0 400 340" className="w-full h-full max-h-76 p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Heavy Luxury Winter Farwa / Fur Coat */}
            <path d="M140 65 L90 145 L125 152 L146 120 L135 305 L265 305 L254 120 L275 152 L310 145 L260 65 Z" 
                  fill="#171717" stroke="#262626" strokeWidth="2" />

            {/* Soft Warm Fur Lining along collar and interior */}
            <path d="M150 65 C150 110 180 140 200 140 C220 140 250 110 250 65 L262 65 C262 125 220 158 200 158 C180 158 138 125 138 65 Z" 
                  fill="#e7e5e4" stroke="#d6d3d1" strokeWidth="1" />

            {/* Gold Floral Braid Piping */}
            <path d="M200 158 L200 305" stroke="#d4af37" strokeWidth="4" />
            <line x1="198" y1="170" x2="202" y2="170" stroke="#fef08a" strokeWidth="2" />
            <line x1="198" y1="200" x2="202" y2="200" stroke="#fef08a" strokeWidth="2" />
            <line x1="198" y1="230" x2="202" y2="230" stroke="#fef08a" strokeWidth="2" />
            <line x1="198" y1="260" x2="202" y2="260" stroke="#fef08a" strokeWidth="2" />

            {/* Heavy Gold Frogging Clasp at Chest */}
            <circle cx="188" cy="130" r="5" fill="#d4af37" />
            <circle cx="212" cy="130" r="5" fill="#d4af37" />
            <path d="M188 130 C195 125 205 125 212 130" stroke="#d4af37" strokeWidth="2" fill="none" />

            <text x="200" y="324" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="serif" letterSpacing="3">
              ROYAL WINTER FARWA · فروة شتوية ملكية
            </text>
          </svg>
        </div>
      );
  }
};
