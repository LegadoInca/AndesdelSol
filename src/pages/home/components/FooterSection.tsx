import { useTranslation } from 'react-i18next';

export default function FooterSection() {
  const { t } = useTranslation();

  return (
    <footer className="bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img
              src="https://public.readdy.ai/ai/img_res/1a7d4011-655d-43af-8ac4-7728ff0a084e.png"
              alt="Andes del Sol"
              className="h-14 w-auto object-contain mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-5">{t('footer_tagline')}</p>
            <div className="flex gap-3">
              {['ri-instagram-line', 'ri-facebook-circle-line', 'ri-pinterest-line', 'ri-whatsapp-line'].map((icon, i) => (
                <a key={i} href="#" rel="nofollow" className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-full text-white/60 hover:text-white hover:border-white/50 transition-colors cursor-pointer">
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h5 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">{t('footer_links')}</h5>
            <ul className="space-y-3">
              {[
                { key: 'footer_our_story', id: 'impacto' },
                { key: 'footer_artisans', id: 'productoras' },
                { key: 'footer_catalog', id: 'catalogo' },
                { key: 'footer_impact', id: 'impacto' },
                { key: 'footer_contact', id: 'contacto' },
              ].map(item => (
                <li key={item.key}>
                  <button
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white/60 text-sm hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {t(item.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h5 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">{t('footer_info')}</h5>
            <ul className="space-y-3">
              {['footer_shipping', 'footer_returns', 'footer_faq', 'footer_privacy', 'footer_terms'].map(key => (
                <li key={key}>
                  <a href="#" rel="nofollow" className="text-white/60 text-sm hover:text-white transition-colors cursor-pointer">
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h5 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">Perú</h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-map-pin-line text-amber-400 text-sm"></i>
                </div>
                <span className="text-white/60 text-sm">Lima, Perú<br />Comunidades Andinas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-amber-400 text-sm"></i>
                </div>
                <span className="text-white/60 text-sm">hola@ayni.pe</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-phone-line text-amber-400 text-sm"></i>
                </div>
                <span className="text-white/60 text-sm">+51 1 234 5678</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">© 2026 Andes del Sol. {t('footer_rights')}</p>
          <div className="flex gap-4">
            {['footer_privacy', 'footer_terms', 'footer_cookies_link'].map(key => (
              <a key={key} href="#" rel="nofollow" className="text-white/40 text-xs hover:text-white/70 transition-colors cursor-pointer whitespace-nowrap">
                {t(key)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Big AYNI text */}
      <div className="overflow-hidden">
        <p className="text-center text-white/5 font-black select-none" style={{ fontSize: 'clamp(80px, 15vw, 200px)', fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
          Andes del Sol
        </p>
      </div>
    </footer>
  );
}
