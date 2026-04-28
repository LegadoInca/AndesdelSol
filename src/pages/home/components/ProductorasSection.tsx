import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { productoras } from '@/mocks/productoras';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProductorasSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ threshold: 0.1 });

  const current = productoras[active];

  const goTo = (idx: number) => {
    if (idx === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 350);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % productoras.length);
        setAnimating(false);
      }, 350);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="productoras" className="pt-24 pb-10 relative overflow-hidden" style={{ backgroundColor: '#1a0a00' }}>
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.9, zIndex: 0 }}
      >
        <source src="/AndesdelSol/videos/fondos1.mp4" type="video/mp4" />
      </video>
      {/* Warm golden overlay — light so the image breathes */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(30,15,5,0.25) 0%, rgba(60,30,8,0.20) 50%, rgba(30,15,5,0.25) 100%)' }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-14 fade-up ${headerVisible ? 'visible' : ''}`}>
          <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-white/30">
            {t('prod_badge')}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('prod_title1')}<br />
            <span className="text-amber-300">{t('prod_title2')}</span>
          </h2>
        </div>

        {/* Main Layout */}
        <div ref={carouselRef} className={`flex gap-4 md:gap-6 items-stretch fade-up ${carouselVisible ? 'visible' : ''}`} style={{ minHeight: '520px', transitionDelay: '150ms' }}>

          {/* Left Sidebar - Thumbnails */}
          <div className="flex flex-col gap-3 justify-center flex-shrink-0">
            {productoras.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => goTo(idx)}
                className={`relative group cursor-pointer transition-all duration-300 rounded-xl overflow-hidden flex-shrink-0 ${
                  idx === active
                    ? 'ring-2 ring-amber-400 scale-105'
                    : 'opacity-50 hover:opacity-80'
                }`}
                style={{ width: '64px', height: '72px' }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover object-top"
                />
                {/* Active bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-amber-400 transition-opacity duration-300 ${idx === active ? 'opacity-100' : 'opacity-0'}`}></div>
              </button>
            ))}
          </div>

          {/* Center - Big Background Card */}
          <div className="relative flex-1 rounded-2xl overflow-hidden min-h-[480px]">
            {/* Background image */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}>
              <img
                src={current.workImage}
                alt={current.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

            {/* Top badges */}
            <div className={`absolute top-5 left-5 right-5 flex items-center justify-between transition-all duration-500 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-map-pin-line text-amber-400 text-xs"></i>
                  </div>
                  <span className="text-white/90 text-xs">{current.region}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-time-line text-amber-400 text-xs"></i>
                  </div>
                  <span className="text-white/90 text-xs">{current.years} años de experiencia</span>
                </div>
              </div>
              <span className="bg-amber-600 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full">
                {current.specialty}
              </span>
            </div>

            {/* Bottom content */}
            <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <p className="text-amber-400/80 text-xs font-semibold uppercase tracking-widest mb-2">
                {current.region.split(',')[1]?.trim() || 'Perú'} · Perú
              </p>
              <h3
                className="text-white font-black text-4xl md:text-5xl mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {current.name}
              </h3>
              <p className="text-white/75 text-sm leading-relaxed max-w-md mb-4">
                {current.story}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"></div>
                <p className="text-amber-400 text-sm italic font-medium">&ldquo;{current.quote}&rdquo;</p>
              </div>
            </div>
          </div>

          {/* Right - Portrait + Work photo */}
          <div className="hidden lg:flex flex-col gap-4 flex-shrink-0" style={{ width: '200px' }}>
            {/* Portrait */}
            <div className={`relative rounded-2xl overflow-hidden flex-1 transition-all duration-500 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Productora</span>
              </div>
            </div>

            {/* Work image */}
            <div className={`relative rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-500 delay-75 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} style={{ height: '140px' }}>
              <img
                src={current.workImage}
                alt="En trabajo"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">En taller</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom - Counter + Dots */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {productoras.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`cursor-pointer transition-all duration-300 rounded-full ${
                  idx === active ? 'w-8 h-2 bg-amber-400' : 'w-2 h-2 bg-white/35 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          <span className="text-white/50 text-sm font-mono">
            {String(active + 1).padStart(2, '0')} / {String(productoras.length).padStart(2, '0')}
          </span>
        </div>


      </div>
    </section>
  );
}
