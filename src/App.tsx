import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Order, Language } from './types/ecommerce';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';

export default function App() {
  // Theme state: default to 'dark' for regal Black, White, Gold, with 1-click toggle to 'white'
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elite_basha_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });

  // Language state: 'ar' (Arabic) and 'en' (English)
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elite_basha_lang');
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'ar'; // Default Arabic as requested
  });

  // Filter trigger for handcrafted cotton from navigation
  const [filterHandcrafted, setFilterHandcrafted] = useState(false);

  useEffect(() => {
    localStorage.setItem('elite_basha_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0a0a0a';
      document.body.style.color = '#f8fafc';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#fafaf9';
      document.body.style.color = '#0c0a09';
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('elite_basha_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleTheme = () => {
    setTheme((prev: 'dark' | 'light') => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = () => {
    setLang((prev: Language) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Seed initial item so the bag is immediately tangible and interactive
    { product: PRODUCTS[0], quantity: 1, selectedSize: '58 (L)' }
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id, PRODUCTS[3].id]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Discount: BASHA10 gives 10% discount
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>({
    code: 'BASHA10',
    percent: 10
  });

  // Cart operations
  const handleAddToCart = (
    product: Product, 
    quantity: number = 1, 
    selectedSize: string = product.sizes[0] || '56 (M)',
    selectedColor?: string
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedSize === selectedSize);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize, selectedColor }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleApplyDiscount = (code: string) => {
    if (code.toUpperCase() === 'BASHA10') {
      setAppliedDiscount({ code: 'BASHA10', percent: 10 });
      return true;
    }
    if (code.toUpperCase() === 'ELITE20') {
      setAppliedDiscount({ code: 'ELITE20', percent: 20 });
      return true;
    }
    return false;
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  // Order completion
  const handleOrderComplete = (order: Order) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setConfirmedOrder(order);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectHandcraftedFromNav = () => {
    setFilterHandcrafted(true);
    scrollToCatalog();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div 
      className={`min-h-screen flex flex-col transition-colors duration-200 selection:bg-[#d4af37] selection:text-black ${
        theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-[#fafaf9] text-stone-900'
      }`} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Top Bar with Brand Logo, Handcrafted Nav, Arabic/English Switcher and Dark/White Toggle */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToCatalog={scrollToCatalog}
        onSelectHandcrafted={handleSelectHandcraftedFromNav}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlistIds.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={scrollToCatalog}
          theme={theme}
          lang={lang}
        />

        {/* Product Catalog Grid with Search Button and Rich Filters */}
        <ProductGrid
          products={PRODUCTS}
          onSelectProduct={setSelectedProduct}
          onAddToCart={(p) => handleAddToCart(p, 1, p.sizes[0])}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          theme={theme}
          lang={lang}
          filterHandcrafted={filterHandcrafted}
          onClearHandcraftedFilter={() => setFilterHandcrafted(false)}
        />

        {/* Craftsmanship & Atelier Section */}
        <CraftsmanshipSection theme={theme} lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        onScrollToTop={scrollToTop}
        theme={theme}
        lang={lang}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        theme={theme}
        lang={lang}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedDiscount={appliedDiscount}
        onApplyDiscount={handleApplyDiscount}
        onRemoveDiscount={handleRemoveDiscount}
        theme={theme}
        lang={lang}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={PRODUCTS}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1, p.sizes[0])}
        theme={theme}
        lang={lang}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={appliedDiscount}
        onOrderComplete={handleOrderComplete}
        theme={theme}
        lang={lang}
      />

      {/* Post-Order Confirmation Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        theme={theme}
        lang={lang}
      />
    </div>
  );
}
