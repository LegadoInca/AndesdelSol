import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { products, featuredProducts } from '@/mocks/products';
import { CartItem } from '@/hooks/useCart';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCurrency } from '@/hooks/useCurrency';

interface CatalogoSectionProps {
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

interface ToastItem {
  id: number;
  productName: string;
  remaining: number;
  image: string;
}

const categories = [
  { key: 'cat_filter_all', value: 'all' },
  { key: 'cat_filter_textiles', value: 'Textiles' },
  { key: 'cat_filter_ceramica', value: 'Cerámica' },
  { key: 'cat_filter_joyeria', value: 'Joyería' },
  { key: 'cat_filter_deco', value: 'Decoración' },
  { key: 'cat_filter_accesorios', value: 'Accesorios' },
];

// Each product gets a random countdown offset so they don't all show the same time
const COUNTDOWN_OFFSETS: Record<number, number> = {};
[...products, ...featuredProducts].forEach(p => {
  // Random between 1h and 12h in seconds
  COUNTDOWN_OFFSETS[p.id] = Math.floor(Math.random() * (12 * 3600 - 3600 + 1)) + 3600;
});

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => (prev <= 1 ? initialSeconds : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [initialSeconds]);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function CountdownBadge({ productId }: { productId: number }) {
  const time = useCountdown(COUNTDOWN_OFFSETS[productId] ?? 3600);
  return (
    <div className="flex items-center gap-1.5 border border-amber-300 bg-amber-50 rounded-lg px-3 py-1.5 mt-2">
      <div className="w-3 h-3 flex items-center justify-center">
        <i className="ri-time-line text-amber-600 text-xs"></i>
      </div>
      <span className="text-amber-700 text-xs font-medium">Oferta termina en</span>
      <span className="text-amber-800 text-xs font-black tracking-wider">{time}</span>
    </div>
  );
}

function FeaturedCountdownBadge({ productId }: { productId: number }) {
  const time = useCountdown(COUNTDOWN_OFFSETS[productId] ?? 3600);
  return (
    <div className="flex items-center gap-1 mt-1.5">
      <div className="w-3 h-3 flex items-center justify-center">
        <i className="ri-time-line text-amber-400 text-xs"></i>
      </div>
      <span className="text-amber-400 text-xs font-black tracking-wider">{time}</span>
    </div>
  );
}

function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) {
    return (
      <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 mt-2">
        <div className="w-4 h-4 flex items-center justify-center">
          <i className="ri-close-circle-fill text-red-500 text-sm"></i>
        </div>
        <span className="text-red-600 text-xs font-semibold">¡Agotado!</span>
      </div>
    );
  }
  if (stock <= 5) {
    return (
      <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 mt-2 animate-pulse">
        <div className="w-3 h-3 flex items-center justify-center">
          <span className="block w-2 h-2 rounded-full bg-red-500"></span>
        </div>
        <span className="text-red-600 text-xs font-semibold">¡Quedan solo {stock} unidades!</span>
      </div>
    );
  }
  if (stock <= 10) {
    return (
      <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-2">
        <div className="w-3 h-3 flex items-center justify-center">
          <span className="block w-2 h-2 rounded-full bg-amber-500"></span>
        </div>
        <span className="text-amber-700 text-xs font-semibold">Quedan {stock} unidades</span>
      </div>
    );
  }
  return null;
}

function FeaturedStockBadge({ stock }: { stock: number }) {
  if (stock <= 0) {
    return (
      <div className="flex items-center gap-1 mt-1.5">
        <div className="w-3 h-3 flex items-center justify-center">
          <i className="ri-close-circle-fill text-red-400 text-xs"></i>
        </div>
        <span className="text-red-400 text-xs font-semibold">¡Agotado!</span>
      </div>
    );
  }
  if (stock <= 5) {
    return (
      <div className="flex items-center gap-1 mt-1.5 animate-pulse">
        <div className="w-3 h-3 flex items-center justify-center">
          <span className="block w-1.5 h-1.5 rounded-full bg-red-400"></span>
        </div>
        <span className="text-red-400 text-xs font-semibold">¡Solo {stock} disponibles!</span>
      </div>
    );
  }
  if (stock <= 10) {
    return (
      <div className="flex items-center gap-1 mt-1.5">
        <div className="w-3 h-3 flex items-center justify-center">
          <span className="block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        </div>
        <span className="text-amber-400 text-xs font-semibold">Quedan {stock}</span>
      </div>
    );
  }
  return null;
}

// Toast notification component
function ToastNotification({ toasts, onRemove }: { toasts: ToastItem[]; onRemove: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-stone-900 text-white rounded-2xl px-4 py-3 shadow-lg"
          style={{ animation: 'slideInLeft 0.35s cubic-bezier(0.34,1.56,0.64,1) both', minWidth: '280px', maxWidth: '340px' }}
        >
          <div className="w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden">
            <img src={toast.image} alt={toast.productName} className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white leading-tight truncate">{toast.productName}</p>
            <p className="text-xs text-emerald-400 font-semibold mt-0.5">¡Añadido al carrito!</p>
            {toast.remaining > 0 ? (
              <p className="text-xs text-red-400 font-medium mt-0.5">
                Quedan solo <span className="font-black">{toast.remaining}</span> unidades
              </p>
            ) : (
              <p className="text-xs text-red-400 font-medium mt-0.5">¡Última unidad vendida!</p>
            )}
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            className="w-5 h-5 flex items-center justify-center text-white/40 hover:text-white cursor-pointer transition-colors flex-shrink-0"
          >
            <i className="ri-close-line text-sm"></i>
          </button>
        </div>
      ))}
    </div>
  );
}

// Initial stock: force all grid products to low stock (2–5 units) for urgency
const INITIAL_STOCK: Record<number, number> = {};
products.forEach((p, i) => {
  const lowStocks = [2, 3, 4, 5, 2, 3, 5, 4];
  INITIAL_STOCK[p.id] = lowStocks[i % lowStocks.length];
});
featuredProducts.forEach((p, i) => {
  const lowStocks = [2, 3, 2, 4, 3];
  INITIAL_STOCK[p.id] = lowStocks[i % lowStocks.length];
});

let toastCounter = 0;

export default function CatalogoSection({ onAddToCart }: CatalogoSectionProps) {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });
  const { format, config } = useCurrency();
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const [stockMap, setStockMap] = useState<Record<number, number>>(() => ({ ...INITIAL_STOCK }));

  const filtered = activeFilter === 'all' ? products : products.filter(p => p.category === activeFilter);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    clearTimeout(toastTimers.current[id]);
  }, []);

  const showToast = useCallback((productName: string, remaining: number, image: string) => {
    toastCounter += 1;
    const id = toastCounter;
    setToasts(prev => [...prev.slice(-2), { id, productName, remaining, image }]);
    toastTimers.current[id] = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const handleAdd = useCallback((product: typeof products[0]) => {
    const currentStock = stockMap[product.id] ?? INITIAL_STOCK[product.id] ?? 0;
    if (currentStock <= 0) return;
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      artisan: product.artisan,
      image: product.image,
    });
    const newStock = Math.max(0, currentStock - 1);
    setStockMap(prev => ({ ...prev, [product.id]: newStock }));
    showToast(product.name, newStock, product.image);
    setAddedIds(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  }, [stockMap, onAddToCart, showToast]);

  const handleFeaturedAdd = useCallback((product: typeof featuredProducts[0]) => {
    const currentStock = stockMap[product.id] ?? INITIAL_STOCK[product.id] ?? 0;
    if (currentStock <= 0) return;
    onAddToCart({ id: product.id, name: product.name, price: product.price, artisan: product.artisan, image: product.image });
    const newStock = Math.max(0, currentStock - 1);
    setStockMap(prev => ({ ...prev, [product.id]: newStock }));
    showToast(product.name, newStock, product.image);
  }, [stockMap, onAddToCart, showToast]);

  const visibleFeatured = featuredProducts.slice(featuredIdx, featuredIdx + 3);

  return (
    <>
      {/* Toast notifications */}
      <ToastNotification toasts={toasts} onRemove={removeToast} />

      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>

      <section id="catalogo" className="py-24 relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://res.cloudinary.com/djfmngyl0/image/upload/v1775317494/pexels-jose-galarza-677920650-19276487_crimft.jpg')" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(255,248,230,0.55) 0%, rgba(245,232,200,0.50) 50%, rgba(255,248,230,0.55) 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div ref={headerRef} className={`text-center mb-12 fade-up ${headerVisible ? 'visible' : ''}`}>
            <span className="inline-block bg-stone-900 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
              {t('cat_badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('cat_title')}
            </h2>
          </div>

          {/* Filters */}
          <div className={`flex flex-wrap justify-center gap-2 mb-12 fade-up ${headerVisible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all whitespace-nowrap ${
                  activeFilter === cat.value
                    ? 'bg-amber-700 text-white'
                    : 'bg-white/70 border border-stone-300 text-stone-600 hover:border-amber-600 hover:text-amber-700'
                }`}
              >
                {t(cat.key)}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-up ${gridVisible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            {filtered.map((product, idx) => {
              const stock = stockMap[product.id] ?? INITIAL_STOCK[product.id] ?? 0;
              return (
                <div key={product.id} className={`group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 fade-up ${gridVisible ? 'visible' : ''}`} style={{ transitionDelay: `${idx * 60}ms` }}>
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: '260px' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badge left */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${product.badge === 'Nuevo' ? 'bg-emerald-500 text-white' : 'bg-amber-700 text-white'}`}>
                        {product.badge === 'Nuevo' ? t('cat_new') : t('cat_limited')}
                      </span>
                    </div>
                    {/* Stock badge top-right on image */}
                    {stock > 0 && stock <= 5 && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full whitespace-nowrap animate-pulse">
                          ¡Solo {stock}!
                        </span>
                      </div>
                    )}
                    {stock <= 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white text-sm font-black px-4 py-2 rounded-full">AGOTADO</span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    {stock > 0 && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-8 h-8 flex items-center justify-center text-white">
                          <i className="ri-zoom-in-line text-2xl"></i>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <span className="text-amber-700 text-xs font-semibold uppercase tracking-widest">{product.category}</span>
                    <h3 className="font-bold text-stone-900 text-base mt-1 leading-tight line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {product.name}
                    </h3>
                    <p className="text-stone-400 text-xs mt-1 italic">{t('cat_by')} {product.artisan}</p>
                    <p className="text-stone-500 text-xs mt-2 leading-relaxed line-clamp-2">{product.description}</p>

                    {/* Countdown timer */}
                    {stock > 0 && <CountdownBadge productId={product.id} />}

                    {/* Stock alert */}
                    <StockBadge stock={stock} />

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-2xl font-black text-stone-900">{format(product.price)}</span>
                        <span className="ml-1 text-xs text-stone-400 font-medium">{config.code}</span>
                      </div>
                      <button
                        onClick={() => handleAdd(product)}
                        disabled={stock <= 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                          stock <= 0
                            ? 'bg-stone-300 text-stone-400 cursor-not-allowed'
                            : addedIds.has(product.id)
                              ? 'bg-emerald-500 text-white cursor-pointer'
                              : 'bg-stone-900 text-white hover:bg-amber-700 cursor-pointer'
                        }`}
                      >
                        <div className="w-3 h-3 flex items-center justify-center">
                          <i className={addedIds.has(product.id) ? 'ri-check-line' : 'ri-shopping-bag-line'}></i>
                        </div>
                        {stock <= 0 ? 'Agotado' : addedIds.has(product.id) ? t('cat_added') : t('cat_add_cart')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Carousel */}
          <div className={`mt-20 bg-stone-900 rounded-3xl p-8 md:p-12 fade-up ${gridVisible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white text-2xl md:text-3xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('cat_featured')}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setFeaturedIdx(Math.max(0, featuredIdx - 1))}
                  disabled={featuredIdx === 0}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white cursor-pointer hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <i className="ri-arrow-left-line"></i>
                </button>
                <button
                  onClick={() => setFeaturedIdx(Math.min(featuredProducts.length - 3, featuredIdx + 1))}
                  disabled={featuredIdx >= featuredProducts.length - 3}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white cursor-pointer hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {visibleFeatured.map(product => {
                const fStock = stockMap[product.id] ?? INITIAL_STOCK[product.id] ?? 0;
                return (
                  <div key={product.id} className="group bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors">
                    <div className="relative overflow-hidden" style={{ height: '220px' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        {fStock <= 0 ? (
                          <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                            ¡Agotado!
                          </span>
                        ) : fStock <= 3 ? (
                          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap animate-pulse">
                            ¡Solo {fStock}!
                          </span>
                        ) : (
                          <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                            {t('cat_only_one')}
                          </span>
                        )}
                      </div>
                      {fStock <= 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-600 text-white text-sm font-black px-4 py-2 rounded-full">AGOTADO</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-bold text-sm leading-tight">{product.name}</h4>
                      <p className="text-white/50 text-xs mt-1 italic">{t('cat_by')} {product.artisan}</p>
                      {fStock > 0 && <FeaturedCountdownBadge productId={product.id} />}
                      <FeaturedStockBadge stock={fStock} />
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-amber-300 font-black text-lg">{format(product.price)}</span>
                        <button
                          onClick={() => handleFeaturedAdd(product)}
                          disabled={fStock <= 0}
                          className={`text-xs transition-colors whitespace-nowrap flex items-center gap-1 ${
                            fStock <= 0
                              ? 'text-white/30 cursor-not-allowed'
                              : 'text-white/70 hover:text-white cursor-pointer'
                          }`}
                        >
                          <div className="w-3 h-3 flex items-center justify-center">
                            <i className={fStock <= 0 ? 'ri-close-line' : 'ri-add-line'}></i>
                          </div>
                          {fStock <= 0 ? 'Agotado' : t('cat_add_cart')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
