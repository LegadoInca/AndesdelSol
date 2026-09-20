import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type SlideType = 'image' | 'video';

interface Slide {
  id: number;
  type: SlideType;
  src: string;
  label: string;
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'image',
    src: "/AndesdelSol/images/fondo(2).jpg",
    label: 'Tejidos Ancestrales',
  },
  {
    id: 2,
    type: 'image',
    src: "/AndesdelSol/images/fondo3.jpg",
    label: 'Cerámica Viva',
  },
  {
    id: 3,
    type: 'image',
    src: "/AndesdelSol/images/telar.png",
    label: 'Comunidad y Fuerza',
  },
];

export default function HeroSection() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = (duration: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setAnimating(false);
      }, 500);
    }, duration);
  };

  useEffect(() => {
    startTimer(8000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
        >
          {slide.type === 'video' ? (
            <video
              ref={idx === 0 ? videoRef : undefined}
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <img
              src={slide.src}
              alt={slide.label}
              className="w-full h-full object-cover object-top"
            />
          )}
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

      {/* Content */}
      <div className={`absolute inset-0 flex items-center transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-map-pin-line text-amber-300 text-sm"></i>
              </div>
              <span className="text-white/90 text-xs font-medium tracking-widest uppercase">{t('hero_badge')}</span>
            </div>

            {/* Title */}
            <h1 className="text-white font-black leading-none mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="block text-5xl md:text-7xl uppercase" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}>
                <span style={{ color: "#141414" }}>Inti</span><span style={{ color: "#D4A72C" }}>Qori</span>
              </span>
              <span className="flex items-center gap-2 mt-1 mb-1">
                <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#D4A72C", display: "inline-block" }} />
                <span
                  className="text-sm md:text-base font-semibold tracking-[0.35em] uppercase"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#141414" }}
                >
                  Artesania
                </span>
              </span>
              <span className="block text-xl md:text-3xl mt-2">{t('hero_title2')}</span>
              <span className="block text-xl md:text-3xl">{t('hero_title3')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/85 font-bold text-xs md:text-sm leading-relaxed mb-8 max-w-xl">
              {t('hero_subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo('catalogo')}
                className="relative overflow-hidden inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-semibold text-sm cursor-pointer hover:bg-amber-300 transition-colors whitespace-nowrap group"
              >
                <span className="relative z-10">{t('hero_cta_catalog')}</span>
                <div className="relative z-10 w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line"></i>
                </div>
                <span className="absolute top-0 bottom-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </button>
              <button
                onClick={() => scrollTo('productoras')}
                className="relative overflow-hidden inline-flex items-center gap-2 border-2 border-white/70 text-white px-8 py-4 rounded-full font-semibold text-sm cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap group"
              >
                <span className="relative z-10">{t('hero_cta_artisans')}</span>
                <span className="absolute top-0 bottom-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${idx === current ? 'w-8 h-2 bg-amber-300' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>

      {/* Slide Label + video indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2">
        {slides[current].type === 'video' && (
          <div className="w-4 h-4 flex items-center justify-center text-amber-300">
            <i className="ri-play-circle-line text-sm"></i>
          </div>
        )}
        <span className="text-white/60 text-xs tracking-widest uppercase">{slides[current].label}</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-white/30 animate-pulse"></div>
        <span className="text-white/50 text-xs tracking-widest uppercase rotate-90 origin-center translate-y-4">Scroll</span>
      </div>
    </section>
  );
}
