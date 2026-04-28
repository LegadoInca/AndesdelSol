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
    type: 'video',
    src: 'https://res.cloudinary.com/djfmngyl0/video/upload/v1775279987/4438993-uhd_3840_2160_30fps_sxqudw.mp4',
    label: 'Tejidos Ancestrales',
  },
  {
    id: 2,
    type: 'image',
    src: "https://readdy.ai/api/search-image?query=close%20up%20of%20peruvian%20andean%20woman%20hands%20crafting%20traditional%20ceramic%20pottery%20with%20clay%2C%20warm%20earthy%20tones%2C%20artisan%20workshop%2C%20documentary%20photography%2C%20powerful%20and%20authentic%20scene&width=1920&height=1080&seq=hero2&orientation=landscape",
    label: 'Cerámica Viva',
  },
  {
    id: 3,
    type: 'image',
    src: "https://readdy.ai/api/search-image?query=group%20of%20peruvian%20andean%20women%20artisans%20in%20traditional%20colorful%20clothing%20working%20together%20in%20mountain%20community%2C%20warm%20sunlight%2C%20documentary%20photography%2C%20empowering%20and%20authentic%20scene&width=1920&height=1080&seq=hero3&orientation=landscape",
    label: 'Comunidad y Fuerza',
  },
  {
    id: 4,
    type: 'image',
    src: "https://readdy.ai/api/search-image?query=beautiful%20peruvian%20andean%20artisan%20woman%20with%20traditional%20colorful%20textiles%20and%20crafts%20displayed%2C%20mountain%20andes%20background%2C%20warm%20golden%20hour%20light%2C%20documentary%20photography%2C%20proud%20and%20dignified&width=1920&height=1080&seq=hero4&orientation=landscape",
    label: 'Arte con Propósito',
  },
  {
    id: 5,
    type: 'image',
    src: "https://readdy.ai/api/search-image?query=traditional%20peruvian%20andean%20crafts%20and%20textiles%20displayed%20in%20mountain%20market%2C%20colorful%20handmade%20products%2C%20warm%20natural%20light%2C%20documentary%20photography%2C%20vibrant%20and%20authentic%20scene&width=1920&height=1080&seq=hero5&orientation=landscape",
    label: 'Colores del Ande',
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
    const currentSlide = slides[current];
    if (currentSlide.type === 'video') {
      // For video slides, advance after video ends or after 12s max
      startTimer(12000);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      startTimer(6000);
    }
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

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
              <span className="block text-7xl md:text-9xl text-amber-300">{t('hero_title1')}</span>
              <span className="block text-3xl md:text-5xl mt-2">{t('hero_title2')}</span>
              <span className="block text-3xl md:text-5xl">{t('hero_title3')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {t('hero_subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo('catalogo')}
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-semibold text-sm cursor-pointer hover:bg-amber-300 transition-colors whitespace-nowrap"
              >
                {t('hero_cta_catalog')}
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </button>
              <button
                onClick={() => scrollTo('productoras')}
                className="inline-flex items-center gap-2 border-2 border-white/70 text-white px-8 py-4 rounded-full font-semibold text-sm cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                {t('hero_cta_artisans')}
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
