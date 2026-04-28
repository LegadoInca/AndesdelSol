import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  { value: 50, suffix: '+', label: 'Familias Apoyadas', color: '#d97706' },
  { value: 120, suffix: '', label: 'Niños en Educación', color: '#d97706' },
  { value: 85, suffix: 'K€', label: 'Donados en 2024', color: '#d97706' },
  { value: 38, suffix: '', label: 'Mujeres Empoderadas', color: '#d97706' },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

function CircularProgress({ value, color }: { value: number; color: string }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [isVisible, value]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="relative w-28 h-28">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="6"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 2s ease-out' }}
        />
      </svg>
    </div>
  );
}

export default function StatsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="pt-4 pb-16 relative overflow-hidden" style={{ backgroundColor: '#3d1f0a' }}>
      {/* Background image — same as testimonials */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://res.cloudinary.com/djfmngyl0/image/upload/v1775317494/pexels-jose-galarza-677920650-19276487_crimft.jpg')" }}
      />
      {/* Golden warm overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(120,60,10,0.78) 0%, rgba(160,90,20,0.72) 40%, rgba(100,50,5,0.80) 100%)' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div ref={ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children fade-up ${isVisible ? 'visible' : ''}`}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`relative bg-white/10 border border-white/20 rounded-2xl p-6 overflow-hidden group hover:bg-white/15 transition-all duration-300 fade-up ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative flex flex-col items-center text-center">
                {/* Circle with number inside */}
                <div className="relative mb-4">
                  <CircularProgress value={75 + idx * 5} color="#fbbf24" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-black text-amber-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                </div>

                {/* Label */}
                <p className="text-white/80 text-xs font-semibold uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
