import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProcesoSection() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const stats = [
    { stat: 'process_stat1', label: 'process_label1', icon: 'ri-time-line' },
    { stat: 'process_stat2', label: 'process_label2', icon: 'ri-hand-heart-line' },
    { stat: 'process_stat3', label: 'process_label3', icon: 'ri-ancient-gate-line' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <img
        src="https://readdy.ai/api/search-image?query=peruvian%20andean%20artisan%20woman%20smiling%20working%20with%20pottery%20wheel%20in%20warm%20golden%20workshop%20light%2C%20close%20up%20documentary%20photography%2C%20rich%20amber%20and%20brown%20tones%2C%20cinematic%20depth%20of%20field%2C%20authentic%20craftsmanship%20scene%20with%20ceramic%20vessels%20in%20background&width=1920&height=700&seq=proceso2&orientation=landscape"
        alt="Proceso artesanal"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      {/* Dark overlay — lighter at top, heavier at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center fade-up ${isVisible ? 'visible' : ''}`}
      >
        {/* Title */}
        <h2
          className="text-white font-black text-3xl md:text-5xl mb-14 max-w-2xl leading-tight drop-shadow-lg"
          style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
        >
          {t('process_title')}
        </h2>

        {/* Stats bar — glassmorphism horizontal pill */}
        <div className="w-full max-w-4xl">
          <div
            className="relative flex items-center justify-between rounded-2xl px-6 md:px-10 py-6 md:py-8"
            style={{
              background: 'rgba(20, 14, 6, 0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(212, 160, 60, 0.25)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,160,60,0.15)',
            }}
          >
            {/* Horizontal connector line */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 mx-16 md:mx-24 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,60,0.4) 20%, rgba(212,160,60,0.4) 80%, transparent)' }}
            />

            {stats.map((item, i) => (
              <div
                key={i}
                className={`relative flex flex-col items-center gap-2 flex-1 fade-up ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 180}ms` }}
              >
                {/* Icon circle */}
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full mb-1"
                  style={{
                    background: i === 1
                      ? 'radial-gradient(circle, rgba(212,160,60,0.35) 0%, rgba(212,160,60,0.1) 70%)'
                      : 'rgba(212,160,60,0.08)',
                    border: `2px solid ${i === 1 ? 'rgba(212,160,60,0.8)' : 'rgba(212,160,60,0.4)'}`,
                    boxShadow: i === 1 ? '0 0 20px rgba(212,160,60,0.4)' : 'none',
                  }}
                >
                  <i
                    className={`${item.icon} text-2xl`}
                    style={{ color: i === 1 ? '#f0c060' : '#c8a040' }}
                  ></i>
                </div>

                {/* Stat value */}
                <div
                  className="font-black leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: i === 1 ? '2.4rem' : '2rem',
                    color: i === 1 ? '#f0c060' : '#e8d5a0',
                    textShadow: i === 1 ? '0 0 30px rgba(240,192,96,0.5)' : 'none',
                  }}
                >
                  {t(item.stat)}
                </div>

                {/* Label */}
                <div
                  className="text-xs md:text-sm font-medium tracking-wide"
                  style={{ color: 'rgba(232, 213, 160, 0.65)' }}
                >
                  {t(item.label)}
                </div>

                {/* Center photo inset (only for middle stat) */}
                {i === 1 && (
                  <div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl overflow-hidden"
                    style={{
                      border: '2px solid rgba(212,160,60,0.6)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    }}
                  >
                    <img
                      src="https://readdy.ai/api/search-image?query=close%20up%20hands%20of%20peruvian%20artisan%20shaping%20clay%20pottery%20on%20wheel%2C%20warm%20amber%20golden%20light%2C%20macro%20photography%2C%20authentic%20craft%20detail&width=120&height=120&seq=proceso_thumb1&orientation=squarish"
                      alt="Artesanía manual"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
