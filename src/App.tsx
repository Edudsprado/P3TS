/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Star,
  ArrowRight,
  Plus,
  X,
  Heart,
  Check,
  Truck,
  ShoppingBag
} from 'lucide-react';

// Static asset URLs from design brief
const ASSETS = {
  avatar: 'https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128',
  catHouse: 'https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png',
  bottomLeft: 'https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png',
  bottomCenter: 'https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024',
  bottomRight: 'https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png',
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export default function App() {
  const [activeNav, setActiveNav] = useState('Início');
  const [cartCount, setCartCount] = useState(1);
  const [favoritesCount, setFavoritesCount] = useState(4);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Casinha Aconchegante para Gatos',
      price: 249.9,
      qty: 1,
      image: ASSETS.catHouse,
    },
  ]);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Loja', href: '#loja' },
    { name: 'Entrega e Pagamento', href: '#entrega' },
    { name: 'Marcas', href: '#marcas' },
    { name: 'Blog', href: '#blog' },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === '1');
      if (existing) {
        return prev.map((item) =>
          item.id === '1' ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: '1',
          name: 'Casinha Aconchegante para Gatos',
          price: 249.9,
          qty: 1,
          image: ASSETS.catHouse,
        },
      ];
    });
    showToast('Item adicionado ao carrinho na P3TS!');
  };

  const handleToggleFavorite = () => {
    setFavoritesCount((prev) => {
      const updated = prev > 4 ? prev - 1 : prev + 1;
      showToast(updated > 4 ? 'Item salvo nos favoritos!' : 'Item removido dos favoritos');
      return updated;
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#EFFDF0] text-[#1a3d1a] select-none relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#1a3d1a] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-up text-sm border border-emerald-800">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="shrink-0 w-full px-6 md:px-12 py-3.5 relative z-30 flex items-center justify-between animate-fade-in delay-100">
        {/* Left: Brand Logo P3TS */}
        <div className="flex items-center">
          <a
            href="#inicio"
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#1a3d1a] rounded-lg transition-transform hover:scale-[1.02]"
            title="P3TS - Página Inicial"
          >
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-[#1a3d1a] flex items-center justify-center text-white shadow-xs">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 fill-[#EFFDF0]"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 10.5c-2.4 0-4.3 1.9-4.3 4.3 0 2.1 1.7 3.7 3.8 3.7 1.2 0 2.2-.5 2.9-1.3.7.8 1.7 1.3 2.9 1.3 2.1 0 3.8-1.6 3.8-3.7 0-2.4-1.9-4.3-4.3-4.3-.8 0-1.5.2-2.1.6-.6-.4-1.3-.6-2.1-.6zM7.5 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6.5-2.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display font-normal text-2xl md:text-3xl text-[#1a3d1a] leading-none tracking-normal">
                P3TS<span className="text-[#E86A10]">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#1a3d1a]/60 font-semibold leading-tight">
                Pet Store
              </span>
            </div>
          </a>
        </div>

        {/* Center Nav: Hidden below md */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium"
          aria-label="Navegação Principal"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                setActiveNav(link.name);
                showToast(`Navegando para "${link.name}"`);
              }}
              className={`transition-colors whitespace-nowrap py-1 relative ${
                activeNav === link.name
                  ? 'text-[#1a3d1a] font-semibold'
                  : 'text-gray-600 hover:text-[#1a3d1a]'
              }`}
            >
              {link.name}
              {activeNav === link.name && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1a3d1a] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Search Button (Hidden below sm) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-[#1a3d1a]/25 bg-white/70 hover:bg-white text-[#1a3d1a] transition-all hover:scale-105 active:scale-95 shadow-xs"
            aria-label="Buscar produtos na P3TS"
            title="Buscar produtos"
          >
            <Search className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Favorites Button (Orange circle, white star, badge 4) */}
          <button
            onClick={() => setIsFavoritesOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white transition-all hover:scale-105 active:scale-95 shadow-xs"
            aria-label="Ver favoritos"
            title="Favoritos"
          >
            <Star className="w-4 h-4 fill-white stroke-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E86A10] border-2 border-[#EFFDF0] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {favoritesCount}
            </span>
          </button>

          {/* Cart Button (Circle, border, cart icon, badge 1) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#1a3d1a]/25 bg-white/70 hover:bg-white text-[#1a3d1a] transition-all hover:scale-105 active:scale-95 shadow-xs"
            aria-label="Ver carrinho de compras"
            title="Carrinho"
          >
            <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E86A10] border-2 border-[#EFFDF0] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* User Avatar (Circle, 40x40) */}
          <button
            onClick={() => showToast('Perfil do Tutor conectado na P3TS')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xs focus:ring-2 focus:ring-[#1a3d1a] transition-transform hover:scale-105"
            title="Minha Conta na P3TS"
          >
            <img
              src={ASSETS.avatar}
              alt="Foto do Tutor"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* DESKTOP HERO LAYOUT (lg+)                                */}
      {/* ======================================================== */}
      <section className="hidden lg:flex flex-1 relative flex-col overflow-hidden">
        {/* Centered Heading Layer (z-5) - Spacious, Well Positioned, Crisp Typography */}
        <div className="relative z-5 w-full flex flex-col items-center justify-start pt-8 xl:pt-12 2xl:pt-14 px-8 pointer-events-none">
          <h1 className="font-serif-display font-normal text-[#1a3d1a] text-[clamp(52px,6.5vw,94px)] leading-[1.12] text-center max-w-4xl tracking-normal">
            <span className="block mb-1.5">
              <span className="inline-block animate-word-pop delay-200 mr-4">
                Tudo
              </span>
              <span className="inline-block animate-word-pop delay-300 mr-4">
                o que
              </span>
              <span className="inline-block animate-word-pop delay-400">
                Seus
              </span>
            </span>
            <span className="block">
              <span className="inline-block animate-word-pop delay-500 mr-4 text-[#E86A10]">
                P3TS
              </span>
              <span className="inline-block animate-word-pop delay-600">
                Amam
              </span>
            </span>
          </h1>
        </div>

        {/* Bottom 3 Images & Overlays: Absolutely positioned bottom-0 left-0 right-0 z-10 */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-center pointer-events-none">
          {/* Left Image & Overlay */}
          <div className="flex-1 relative flex items-end justify-center max-h-[min(70vh,55vw)]">
            <img
              src={ASSETS.bottomLeft}
              alt="Cãozinho feliz acolhido"
              className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-800"
              referrerPolicy="no-referrer"
            />
            {/* Left Overlay: 98K+ stat with avatar stack */}
            <div
              className="absolute left-6 xl:left-12 pointer-events-auto flex items-center gap-3.5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 shadow-lg animate-scale-in delay-1000 transition-transform hover:scale-105 cursor-pointer"
              style={{ bottom: 'clamp(20px, 4vh, 50px)' }}
              onClick={() => showToast('Mais de 98.000 tutores confiam na P3TS!')}
            >
              <div className="flex items-center -space-x-2">
                <img
                  src={ASSETS.avatar}
                  alt="Cliente P3TS"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="w-8 h-8 rounded-full bg-[#1a3d1a] text-white border-2 border-white flex items-center justify-center">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base xl:text-lg font-bold text-[#1a3d1a] leading-none">
                  98K+
                </span>
                <span className="text-[11px] text-gray-600 font-medium mt-0.5">
                  Pets Felizes
                </span>
              </div>
            </div>
          </div>

          {/* Center Image & Overlay (Tallest) */}
          <div className="flex-[1.265] relative flex items-end justify-center max-h-[min(85vh,70vw)]">
            <img
              src={ASSETS.bottomCenter}
              alt="Gatinho fofo e acolhedor"
              className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-600"
              referrerPolicy="no-referrer"
            />
            {/* Center Overlay: Best Products + Explore Products Button */}
            <div
              className="absolute inset-x-0 mx-auto w-fit flex flex-col items-center pointer-events-auto text-center px-4 animate-fade-up delay-1100"
              style={{ bottom: 'clamp(20px, 4vh, 50px)' }}
            >
              <h2 className="text-white font-serif-display font-normal text-[clamp(22px,2.4vw,34px)] leading-tight drop-shadow-md mb-3 text-shadow">
                Os Melhores Produtos para o Seu Pet
              </h2>
              <button
                onClick={() => {
                  handleAddToCart();
                  showToast('Explorando os destaques da P3TS!');
                }}
                className="flex items-center gap-2.5 bg-[#E86A10] hover:bg-[#d45e0d] text-white px-7 py-3 rounded-full font-semibold text-sm xl:text-base transition-all duration-300 shadow-xl hover:shadow-orange-500/30 hover:scale-105 active:scale-95"
              >
                <span>Explorar Produtos</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Image & Overlay */}
          <div className="flex-1 relative flex items-end justify-center max-h-[min(70vh,55vw)]">
            <img
              src={ASSETS.bottomRight}
              alt="Cachorrinho feliz e bem cuidado"
              className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-900"
              referrerPolicy="no-referrer"
            />
            {/* Right Overlay: 4.6 rating with orange filled star */}
            <div
              className="absolute right-6 xl:right-12 pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 shadow-lg animate-scale-in delay-1200 transition-transform hover:scale-105 cursor-pointer"
              style={{ bottom: 'clamp(20px, 4vh, 50px)' }}
              onClick={() => showToast('Avaliação média de 4.6 estrelas pelos clientes da P3TS!')}
            >
              <div className="w-8 h-8 rounded-full bg-[#E86A10]/15 flex items-center justify-center">
                <Star className="w-5 h-5 fill-[#E86A10] text-[#E86A10]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-base xl:text-lg font-bold text-[#1a3d1a] leading-none">
                    4.6
                  </span>
                  <span className="text-xs text-[#E86A10] font-semibold">★</span>
                </div>
                <span className="text-[11px] text-gray-600 font-medium mt-0.5">
                  Avaliação dos Tutores
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* TABLET HERO LAYOUT (md to lg)                            */}
      {/* ======================================================== */}
      <section className="hidden md:flex lg:hidden flex-1 relative flex-col overflow-hidden">
        {/* Heading */}
        <div className="relative z-5 w-full flex flex-col items-center justify-start pt-8 px-6 pointer-events-none">
          <h1 className="font-serif-display font-normal text-[#1a3d1a] text-5xl md:text-6xl leading-[1.12] tracking-normal text-center">
            <span className="block mb-1.5">
              <span className="inline-block animate-word-pop delay-200 mr-3">Tudo</span>
              <span className="inline-block animate-word-pop delay-300 mr-3">o que</span>
              <span className="inline-block animate-word-pop delay-400">Seus</span>
            </span>
            <span className="block">
              <span className="inline-block animate-word-pop delay-500 mr-3 text-[#E86A10]">P3TS</span>
              <span className="inline-block animate-word-pop delay-600">Amam</span>
            </span>
          </h1>
        </div>

        {/* Bottom 3 Images (maxHeight 60vh / 75vh / 60vh) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-center pointer-events-none">
          <div className="flex-1 relative flex items-end justify-center max-h-[60vh]">
            <img
              src={ASSETS.bottomLeft}
              alt="Pet"
              className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-800"
              referrerPolicy="no-referrer"
            />
            <div
              className="absolute left-3 pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/80 shadow-md animate-scale-in delay-1000"
              style={{ bottom: '24px' }}
            >
              <div className="flex items-center -space-x-1.5">
                <img
                  src={ASSETS.avatar}
                  alt="Cliente"
                  className="w-6 h-6 rounded-full border border-white object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="w-6 h-6 rounded-full bg-[#1a3d1a] text-white border border-white flex items-center justify-center">
                  <Plus className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1a3d1a]">98K+</span>
                <span className="text-[10px] text-gray-600 leading-none">Pets</span>
              </div>
            </div>
          </div>

          <div className="flex-[1.265] relative flex items-end justify-center max-h-[75vh]">
            <img
              src={ASSETS.bottomCenter}
              alt="Pet Principal"
              className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-600"
              referrerPolicy="no-referrer"
            />
            <div
              className="absolute inset-x-0 mx-auto w-fit flex flex-col items-center pointer-events-auto text-center px-2 animate-fade-up delay-1100"
              style={{ bottom: '24px' }}
            >
              <h2 className="text-white font-serif-display font-normal text-xl leading-tight drop-shadow-md mb-2">
                Os Melhores Produtos para o Seu Pet
              </h2>
              <button
                onClick={() => {
                  handleAddToCart();
                  showToast('Explorando os destaques da P3TS!');
                }}
                className="flex items-center gap-2 bg-[#E86A10] hover:bg-[#d45e0d] text-white px-5 py-2.5 rounded-full font-semibold text-xs shadow-lg"
              >
                <span>Explorar Produtos</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex items-end justify-center max-h-[60vh]">
            <img
              src={ASSETS.bottomRight}
              alt="Pet"
              className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-900"
              referrerPolicy="no-referrer"
            />
            <div
              className="absolute right-3 pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/80 shadow-md animate-scale-in delay-1200"
              style={{ bottom: '24px' }}
            >
              <Star className="w-4 h-4 fill-[#E86A10] text-[#E86A10]" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1a3d1a]">4.6 ★</span>
                <span className="text-[10px] text-gray-600 leading-none">Avaliações</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* MOBILE HERO LAYOUT (below md)                            */}
      {/* ======================================================== */}
      <section className="flex md:hidden flex-1 flex-col justify-between overflow-hidden px-4 pt-2 pb-1">
        {/* Top Section: Title, subtitle, "Explorar Produtos" */}
        <div className="flex flex-col items-center text-center shrink-0 animate-fade-up delay-200 pt-2">
          <h1 className="font-serif-display font-normal text-[#1a3d1a] text-[34px] sm:text-[38px] leading-[1.12] tracking-normal">
            Tudo o que Seus <span className="text-[#E86A10]">P3TS</span> Amam
          </h1>
          <p className="text-xs text-gray-600 mt-1.5 max-w-xs font-medium leading-snug">
            Conforto acolhedor, brinquedos e nutrição premium pensados para cada momento.
          </p>
          <button
            onClick={() => {
              handleAddToCart();
              showToast('Explorando os destaques da P3TS!');
            }}
            className="mt-3 flex items-center gap-2 bg-[#E86A10] hover:bg-[#d45e0d] text-white px-5 py-2 rounded-full font-semibold text-xs shadow-md transition-transform active:scale-95"
          >
            <span>Explorar Produtos</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Stats Row: 98K+ with avatars left, divider, 4.6 star right */}
        <div className="flex items-center justify-center gap-4 bg-white/80 backdrop-blur-xs py-2 px-5 rounded-xl border border-white/60 mx-auto w-full max-w-xs shadow-xs z-20 shrink-0 my-2 animate-fade-in delay-600">
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-1.5">
              <img
                src={ASSETS.avatar}
                alt="Cliente"
                className="w-5 h-5 rounded-full border border-white object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="w-5 h-5 rounded-full bg-[#1a3d1a] text-white border border-white flex items-center justify-center">
                <Plus className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </div>
            <span className="text-xs font-bold text-[#1a3d1a]">98K+ Pets</span>
          </div>

          <div className="w-[1px] h-4 bg-gray-300" />

          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-[#E86A10] text-[#E86A10]" />
            <span className="text-xs font-bold text-[#1a3d1a]">4.6 Estrelas</span>
          </div>
        </div>

        {/* Bottom 3 Images */}
        <div className="flex items-end justify-center w-full mt-auto relative z-10 pointer-events-none">
          <div className="flex-1 flex items-end justify-center">
            <img
              src={ASSETS.bottomLeft}
              alt="Pet"
              className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-[1.265] flex items-end justify-center">
            <img
              src={ASSETS.bottomCenter}
              alt="Pet Principal"
              className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 flex items-end justify-center">
            <img
              src={ASSETS.bottomRight}
              alt="Pet"
              className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-800"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* INTERACTIVE DRAWERS & UTILITY MODALS (Search, Cart, Fav) */}
      {/* ======================================================== */}

      {/* 1. Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-fade-in"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-gray-100 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-semibold text-lg text-[#1a3d1a]">Buscar na P3TS</h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative mt-4">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex: casinha de gato, brinquedos, camas, rações..."
                autoFocus
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a3d1a] text-sm"
              />
            </div>
            <div className="mt-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Buscas Mais Populares
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Casinha Aconchegante', 'Arranhador para Gatos', 'Cama Ortopédica', 'Comedouro Lento', 'Snacks Naturais'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        showToast(`Buscando por: "${term}"`);
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#EFFDF0] text-[#1a3d1a] hover:bg-emerald-100 transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Cart Drawer */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#E86A10]" />
                <h3 className="font-semibold text-lg text-[#1a3d1a]">Seu Carrinho ({cartCount})</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#1a3d1a] truncate">{item.name}</h4>
                    <span className="text-xs text-gray-500">Unidade: R$ {item.price.toFixed(2)}</span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center border border-gray-300 rounded-md bg-white">
                        <button
                          onClick={() => {
                            if (item.qty > 1) {
                              setCartItems(cartItems.map(i => i.id === item.id ? { ...i, qty: i.qty - 1 } : i));
                              setCartCount(c => c - 1);
                            }
                          }}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.qty}</span>
                        <button
                          onClick={() => {
                            setCartItems(cartItems.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
                            setCartCount(c => c + 1);
                          }}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#1a3d1a]">
                        R$ {(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Frete grátis para todo o Brasil pela P3TS!</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-[#1a3d1a]">
                  R$ {cartItems.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Entrega</span>
                <span className="text-emerald-600 font-semibold">Grátis</span>
              </div>
              <button
                onClick={() => {
                  showToast('Pedido finalizado com sucesso! Obrigado por comprar na P3TS.');
                  setIsCartOpen(false);
                }}
                className="w-full py-3 bg-[#E86A10] hover:bg-[#d45e0d] text-white rounded-xl font-semibold text-sm transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Finalizar Compra</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Favorites Modal */}
      {isFavoritesOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsFavoritesOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-gray-100 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#E86A10] fill-[#E86A10]" />
                <h3 className="font-semibold text-lg text-[#1a3d1a]">Seus Favoritos ({favoritesCount})</h3>
              </div>
              <button
                onClick={() => setIsFavoritesOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <img
                  src={ASSETS.catHouse}
                  alt="Casinha Aconchegante"
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#1a3d1a]">Casinha Aconchegante para Gatos</h4>
                  <span className="text-xs font-bold text-[#E86A10]">R$ 249,90</span>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="px-3 py-1.5 text-xs bg-[#1a3d1a] text-white rounded-lg font-medium hover:bg-[#2a5a2a]"
                >
                  Comprar
                </button>
              </div>

              <div className="text-center py-2">
                <p className="text-xs text-gray-500">
                  Mais itens salvos na sua lista de desejos da P3TS.
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleFavorite}
              className="w-full py-2.5 bg-[#EFFDF0] text-[#1a3d1a] border border-[#1a3d1a]/20 rounded-xl text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              Alternar Status da Lista
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
