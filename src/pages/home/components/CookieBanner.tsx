import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('ayni_cookies');
    if (!accepted) setTimeout(() => setVisible(true), 1500);
  }, []);

  const accept = () => { localStorage.setItem('ayni_cookies', 'accepted'); setVisible(false); };
  const decline = () => { localStorage.setItem('ayni_cookies', 'declined'); setVisible(false); };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-stone-600 text-sm leading-relaxed max-w-2xl">{t('cookies_text')}</p>
      <div className="flex gap-3 flex-shrink-0">
        <button onClick={decline} className="px-5 py-2 border border-stone-300 rounded-full text-stone-600 text-sm cursor-pointer hover:border-stone-500 transition-colors whitespace-nowrap">{t('cookies_decline')}</button>
        <button onClick={accept} className="px-5 py-2 bg-amber-700 text-white rounded-full text-sm cursor-pointer hover:bg-amber-800 transition-colors whitespace-nowrap">{t('cookies_accept')}</button>
      </div>
    </div>
  );
}
