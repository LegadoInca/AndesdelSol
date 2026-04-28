import { useTranslation } from 'react-i18next';
import { CartItem } from '@/hooks/useCart';
import { useCurrency } from '@/hooks/useCurrency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, qty: number) => void;
  total: number;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQuantity, total }: CartDrawerProps) {
  const { t } = useTranslation();
  const { format } = useCurrency();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-900 font-serif">{t('cart_title')}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer transition-colors">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center text-stone-300">
                <i className="ri-shopping-bag-line text-5xl"></i>
              </div>
              <p className="text-stone-600 font-medium">{t('cart_empty')}</p>
              <p className="text-stone-400 text-sm">{t('cart_empty_sub')}</p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2 bg-amber-700 text-white rounded-full text-sm font-medium cursor-pointer hover:bg-amber-800 transition-colors whitespace-nowrap"
              >
                {t('nav_catalog')}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-stone-100">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-900 text-sm leading-tight">{item.name}</p>
                    <p className="text-stone-400 text-xs mt-1">{t('cat_by')} {item.artisan}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-stone-200 rounded-full px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
                        >
                          <i className="ri-subtract-line text-xs"></i>
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
                        >
                          <i className="ri-add-line text-xs"></i>
                        </button>
                      </div>
                      <p className="font-bold text-stone-900 text-sm">{format(item.price * item.quantity)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="w-6 h-6 flex items-center justify-center text-stone-300 hover:text-red-400 cursor-pointer transition-colors flex-shrink-0"
                  >
                    <i className="ri-delete-bin-line text-sm"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-100 bg-stone-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-stone-600 font-medium">{t('cart_subtotal')}</span>
              <span className="text-2xl font-bold text-stone-900">{format(total)}</span>
            </div>
            <button className="w-full bg-stone-900 text-white py-4 rounded-xl font-semibold text-sm cursor-pointer hover:bg-amber-700 transition-colors whitespace-nowrap">
              {t('cart_checkout')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
