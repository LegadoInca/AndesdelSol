import { useCart } from '@/hooks/useCart';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductorasSection from './components/ProductorasSection';
import ImpactoSection from './components/ImpactoSection';
import HistoriasSection from './components/HistoriasSection';
import CatalogoSection from './components/CatalogoSection';
import ProcesoSection from './components/ProcesoSection';
import TestimoniosSection from './components/TestimoniosSection';
import ContactoSection from './components/ContactoSection';
import FooterSection from './components/FooterSection';
import CartDrawer from './components/CartDrawer';
import CookieBanner from './components/CookieBanner';

export default function Home() {
  const { items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, total, count } = useCart();

  return (
    <div className="min-h-screen">
      <Navbar cartCount={count} onCartOpen={() => setIsOpen(true)} />
      <HeroSection />
      <ProductorasSection />
      <ImpactoSection />
      <HistoriasSection />
      <CatalogoSection onAddToCart={addItem} />
      <ProcesoSection />
      <TestimoniosSection />
      <ContactoSection />
      <FooterSection />
      <CartDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onRemove={removeItem}
        onUpdateQuantity={updateQuantity}
        total={total}
      />
      <CookieBanner />
    </div>
  );
}
