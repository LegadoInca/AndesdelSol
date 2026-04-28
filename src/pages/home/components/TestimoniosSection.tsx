import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { testimonials } from '@/mocks/testimonials';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function TestimoniosSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ threshold: 0.1 });

  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(i => (i + 1) % testimonials.length);

  // Returns index relative to active: -2, -1, 0, 1, 2
  const getRelative = (idx: number) => {
    let rel = idx - active;
    if (rel > testimonials.length / 2) rel -= testimonials.length;
    if (rel < -testimonials.length / 2) rel += testimonials.length;
    return rel;
  };

  return (
    <section className="py-20 overflow-hidden relative" style={{ backgroundColor: '#3d1f0a' }}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://res.cloudinary.com/djfmngyl0/image/upload/v1775317494/pexels-jose-galarza-677920650-19276487_crimft.jpg')" }}
      />
      {/* Golden warm overlay — soft and elegant */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(120,60,10,0.78) 0%, rgba(160,90,20,0.72) 40%, rgba(100,50,5,0.80) 100%)' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-12 fade-up ${headerVisible ? 'visible' : ''}`}>
          <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-white/30">
            {t('test_badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('test_title')}
          </h2>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className={`relative fade-up ${carouselVisible ? 'visible' : ''}`}>
          {/* Cards track */}
          <div className="relative flex items-center justify-center" style={{ height: '340px' }}>
            {testimonials.map((item, idx) => {
              const rel = getRelative(idx);
              const isCenter = rel === 0;
              const isVisible = Math.abs(rel) <= 2;

              if (!isVisible) return null;

              // Position and style based on relative position
              const xOffset = rel * 280;
              const scale = isCenter ? 1 : Math.abs(rel) === 1 ? 0.82 : 0.68;
              const opacity = isCenter ? 1 : Math.abs(rel) === 1 ? 0.6 : 0.3;
              const zIndex = isCenter ? 30 : Math.abs(rel) === 1 ? 20 : 10;

              return (
                <div
                  key={item.id}
                  onClick={() => !isCenter && setActive(idx)}
                  className="absolute bg-white rounded-2xl p-7 flex flex-col gap-4 transition-all duration-500"
                  style={{
                    width: '380px',
                    transform: `translateX(${xOffset}px) scale(${scale})`,
                    opacity,
                    zIndex,
                    cursor: isCenter ? 'default' : 'pointer',
                    boxShadow: isCenter ? '0 20px 60px rgba(0,0,0,0.12)' : 'none',
                  }}
                >
                  <div className="text-amber-400 text-4xl leading-none" style={{ fontFamily: 'Georgia, serif' }}>&ldquo;</div>
                  <p className={`text-stone-600 leading-relaxed flex-1 ${isCenter ? 'text-base' : 'text-sm line-clamp-4'}`}>
                    {item.text}
                  </p>
                  <div className="border-t border-stone-100 pt-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                      <img src={item.avatar} alt={item.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 text-sm">{item.name}</p>
                      <p className="text-stone-400 text-xs">{item.flag} {item.location}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-11 h-11 flex items-center justify-center bg-white rounded-full border border-stone-200 text-stone-600 cursor-pointer hover:border-amber-400 hover:text-amber-700 transition-colors"
            style={{ left: 'calc(50% - 260px)' }}
          >
            <i className="ri-arrow-left-s-line text-xl"></i>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-11 h-11 flex items-center justify-center bg-white rounded-full border border-stone-200 text-stone-600 cursor-pointer hover:border-amber-400 hover:text-amber-700 transition-colors"
            style={{ right: 'calc(50% - 260px)' }}
          >
            <i className="ri-arrow-right-s-line text-xl"></i>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`cursor-pointer transition-all duration-300 rounded-full ${idx === active ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/35 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
