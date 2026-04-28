import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const hotspots = [
  {
    id: 1,
    x: 18,
    y: 22,
    label: 'Mano del artesano: Detalle del punto',
    image: '/AndesdelSol/images/mano.png',
  },
  {
    id: 2,
    x: 35,
    y: 60,
    label: 'Lana de alpaca teñida',
    image: '/AndesdelSol/images/lana.png',
  },
  {
    id: 3,
    x: 10,
    y: 75,
    label: 'Telar ancestral de madera',
    image: '/AndesdelSol/images/telar.png',
  },
];

export default function ImpactoSection() {
  const { t } = useTranslation();
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const offset = -rect.top * 0.2;
        setScrollY(offset);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="impacto" ref={sectionRef} className="relative overflow-hidden">

      {/* Full-screen parallax background image */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY}px)`, willChange: 'transform', top: '-10%', bottom: '-10%' }}
      >
        <img
          src="/AndesdelSol/images/fondo1.jpeg"
          alt="Tejiendo artesanía"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/35"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

      {/* Hotspots layer — over the full image, independent of text */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {hotspots.map(spot => (
          <div
            key={spot.id}
            className="absolute pointer-events-auto"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setActiveHotspot(spot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* Pulse ring */}
              <span
                className="absolute rounded-full bg-amber-400/40 animate-ping"
                style={{ width: '28px', height: '28px', top: '-6px', left: '-6px' }}
              ></span>
              {/* Dot */}
              <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-lg relative z-10 transition-transform duration-200 hover:scale-125"></div>

              {/* Popup */}
              {activeHotspot === spot.id && (
                <div
                  className="absolute z-50 rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    width: '220px',
                    bottom: '28px',
                    left: '0',
                    right: 'auto',
                    background: 'rgba(20,15,10,0.90)',
                    backdropFilter: 'blur(14px)',
                    border: '1px solid rgba(217,119,6,0.5)',
                  }}
                >
                  <div className="relative" style={{ height: '130px' }}>
                    <img
                      src={spot.image}
                      alt={spot.label}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-amber-300 text-xs font-semibold leading-snug">{spot.label}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col lg:flex-row items-stretch">

        {/* LEFT - Big text only, no hotspots here */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-16">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-4 lg:mb-6">
            {t('impact_title1')}
          </p>
          <h2
            className="text-white font-black leading-none mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 7vw, 100px)' }}
          >
            MÁS QUE<br />
            <span className="text-amber-300">ARTESANÍA</span>
          </h2>
          <p className="text-white/75 text-lg md:text-xl italic font-light tracking-wide">
            {t('impact_subtitle')}
          </p>
        </div>

        {/* RIGHT - Glassmorphism panel (same as before) */}
        <div className="w-full lg:w-auto lg:max-w-md xl:max-w-lg flex-shrink-0 px-4 py-10 lg:px-8 lg:py-14">
          <div
            className="rounded-2xl p-7 md:p-9"
            style={{
              background: 'rgba(245, 235, 220, 0.15)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-amber-400/60 text-amber-300 mb-5">
              <i className="ri-compass-3-line text-xl"></i>
            </div>

            {/* Title */}
            <h3
              className="text-amber-200 font-black text-2xl md:text-3xl leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t('impact_right_title1')}<br />
              {t('impact_right_title2')}
            </h3>

            {/* Paragraphs as bordered blocks */}
            <div className="space-y-3 mb-6">
              {[t('impact_p1'), t('impact_p2'), t('impact_p3')].map((text, i) => (
                <div
                  key={i}
                  className="px-4 py-3 rounded-lg text-white/85 text-sm leading-relaxed"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {text}
                </div>
              ))}
            </div>

            {/* Stats list */}
            <div className="space-y-3 mb-7">
              {[
                { icon: 'ri-scales-3-line', key: 'impact_stat1' },
                { icon: 'ri-heart-2-line', key: 'impact_stat2' },
                { icon: 'ri-community-line', key: 'impact_stat3' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full border border-amber-400/50 text-amber-300 flex-shrink-0">
                    <i className={`${item.icon} text-sm`}></i>
                  </div>
                  <span className="text-white/90 text-sm font-medium">{t(item.key)}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-xl font-semibold text-sm cursor-pointer transition-colors whitespace-nowrap"
            >
              {t('impact_cta')}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <div className="w-5 h-5 flex items-center justify-center text-white/40">
          <i className="ri-arrow-down-s-line text-xl"></i>
        </div>
      </div>
    </section>
  );
}
