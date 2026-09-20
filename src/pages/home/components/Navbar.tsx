import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

const languages = [
  { code: 'es', label: 'Español', flag: '🇵🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
];

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('es');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLang = (code: string) => {
    i18n.changeLanguage(code);
    setCurrentLang(code);
    setLangOpen(false);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const activeLang = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,26,47,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-12 md:h-14">
        {/* Brand text (no logo image) */}
        <a
          href="/"
          className="cursor-pointer uppercase"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#F5E6D3" }}
        >
          Inti<span style={{ color: "#D4A72C" }}>Qori</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { key: 'nav_catalog', id: 'catalogo' },
            { key: 'nav_artisans', id: 'productoras' },
            { key: 'nav_story', id: 'impacto' },
            { key: 'nav_contact', id: 'contacto' },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap"
              style={{ color: "#F5E6D3", fontFamily: "'Inter', sans-serif" }}
            >
              {t(item.key)}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-sm font-medium cursor-pointer whitespace-nowrap transition-colors"
              style={{ color: "#F5E6D3", fontFamily: "'Inter', sans-serif" }}
            >
              <span>{activeLang.flag}</span>
              <span className="hidden sm:inline">{activeLang.code.toUpperCase()}</span>
              <i className="ri-arrow-down-s-line text-xs"></i>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-stone-100 overflow-hidden w-44 z-50">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLang(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-amber-50 ${currentLang === lang.code ? 'bg-amber-50 text-amber-700 font-medium' : 'text-stone-700'}`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap"
            style={{ color: "#F5E6D3" }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-shopping-bag-line text-xl"></i>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden cursor-pointer transition-colors"
            style={{ color: "#F5E6D3" }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 py-4 flex flex-col gap-4" style={{ background: "rgba(10,26,47,0.97)" }}>
          {[
            { key: 'nav_catalog', id: 'catalogo' },
            { key: 'nav_artisans', id: 'productoras' },
            { key: 'nav_story', id: 'impacto' },
            { key: 'nav_contact', id: 'contacto' },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-left cursor-pointer transition-colors"
              style={{ color: "#F5E6D3", fontFamily: "'Inter', sans-serif" }}
            >
              {t(item.key)}
            </button>
          ))}
        </div>
      )}

      {/* Overlay for lang dropdown */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)}></div>
      )}
    </nav>
  );
}
