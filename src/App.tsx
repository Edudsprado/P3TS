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
  ShoppingBag,
  Scissors,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Phone,
  Mail,
  ChevronDown,
  Calendar,
  Award,
  RefreshCw,
  Gift
} from 'lucide-react';

// Static asset URLs
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

interface Product {
  id: string;
  name: string;
  category: 'camas' | 'alimentacao' | 'brinquedos' | 'higiene';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: '1',
    name: 'Casinha Aconchegante Térmica para Gatos',
    category: 'camas',
    categoryLabel: 'Casinhas & Camas',
    price: 249.9,
    originalPrice: 299.9,
    rating: 4.9,
    reviews: 1420,
    image: ASSETS.catHouse,
    badge: 'Mais Vendido',
    description: 'Design térmico ultra macio com isolamento acústico e tecido lavável.',
  },
  {
    id: '2',
    name: 'Cama Ortopédica Nuvem Zen',
    category: 'camas',
    categoryLabel: 'Casinhas & Camas',
    price: 189.9,
    originalPrice: 229.0,
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80',
    badge: 'Alívio Articular',
    description: 'Espuma viscoelástica com memória para cães e gatos de todas as idades.',
  },
  {
    id: '3',
    name: 'Kit Snacks 100% Naturais Desidratados',
    category: 'alimentacao',
    categoryLabel: 'Alimentação & Petiscos',
    price: 49.9,
    rating: 4.9,
    reviews: 650,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=80',
    badge: 'Sem Conservantes',
    description: 'Petiscos proteicos sem corantes artificiais, ideais para treino positivo.',
  },
  {
    id: '4',
    name: 'Brinquedo Interativo Dispenser Smart',
    category: 'brinquedos',
    categoryLabel: 'Brinquedos Interativos',
    price: 79.9,
    originalPrice: 99.9,
    rating: 4.7,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
    badge: 'Anti-estresse',
    description: 'Estimula o raciocínio e desacelera a alimentação de forma lúdica.',
  },
  {
    id: '5',
    name: 'Fonte de Água Silenciosa Inox com Filtro',
    category: 'higiene',
    categoryLabel: 'Higiene & Bem-estar',
    price: 159.9,
    originalPrice: 199.9,
    rating: 4.9,
    reviews: 1104,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80',
    badge: 'Saúde Renal',
    description: 'Água corrente purificada 24 horas para estimular hidratação contínua.',
  },
  {
    id: '6',
    name: 'Arranhador Torre Castelo com Pelúcia',
    category: 'camas',
    categoryLabel: 'Casinhas & Camas',
    price: 319.0,
    originalPrice: 380.0,
    rating: 4.8,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80',
    badge: 'Reforçado',
    description: 'Postes em corda de sisal natural e plataformas com forro acolchoado.',
  },
];

export default function App() {
  const [activeNav, setActiveNav] = useState('Início');
  const [cartCount, setCartCount] = useState(1);
  const [favoritesCount, setFavoritesCount] = useState(4);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Service Booking Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Banho & Tosa SPA');
  const [petName, setPetName] = useState('');
  const [bookingDate, setBookingDate] = useState('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Casinha Aconchegante Térmica para Gatos',
      price: 249.9,
      qty: 1,
      image: ASSETS.catHouse,
    },
  ]);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Quem Somos', href: '#quem-somos' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Loja', href: '#loja' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'FAQ', href: '#faq' },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product?: Product) => {
    setCartCount((prev) => prev + 1);
    if (!product) {
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
            name: 'Casinha Aconchegante Térmica para Gatos',
            price: 249.9,
            qty: 1,
            image: ASSETS.catHouse,
          },
        ];
      });
      showToast('Item adicionado ao carrinho na P3TS!');
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          image: product.image,
        },
      ];
    });
    showToast(`${product.name} adicionado ao carrinho!`);
  };

  const handleToggleFavorite = () => {
    setFavoritesCount((prev) => {
      const updated = prev > 4 ? prev - 1 : prev + 1;
      showToast(updated > 4 ? 'Item salvo nos favoritos!' : 'Item removido dos favoritos');
      return updated;
    });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName || !bookingDate) {
      showToast('Por favor, preencha o nome do pet e a data.');
      return;
    }
    showToast(`Agendamento de ${selectedService} para ${petName} confirmado com sucesso!`);
    setIsBookingOpen(false);
    setPetName('');
    setBookingDate('');
  };

  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    if (selectedCategory === 'todos') return true;
    return item.category === selectedCategory;
  });

  const faqs = [
    {
      q: 'Como funciona o frete e a política de entrega da P3TS?',
      a: 'Entregamos em todo o Brasil. Para compras a partir de R$ 199, o frete é 100% gratuito. Para capitais, oferecemos modalidade expressa com entrega no mesmo dia útil para pedidos confirmados até as 13h.',
    },
    {
      q: 'Qual é o diferencial dos produtos selecionados pela P3TS?',
      a: 'Nosso catálogo passa por rigorosa curadoria técnica. Trabalhamos exclusivamente com itens atóxicos, ergonômicos e recomendados por especialistas em comportamento e medicina veterinária.',
    },
    {
      q: 'Como agendar os serviços de Banho & Tosa ou Consulta Veterinária?',
      a: 'Você pode agendar diretamente nesta página através do botão "Agendar Horário", escolhendo o melhor dia e período. Nossa equipe entra em contato via WhatsApp para confirmar os detalhes.',
    },
    {
      q: 'Como funciona a garantia e a política de troca e devolução?',
      a: 'Se o seu pet não se adaptar à casinha, caminha ou qualquer produto, você tem até 30 dias para solicitar a devolução ou troca gratuita sem burocracia.',
    },
    {
      q: 'Existe algum benefício no Clube de Assinatura P3TS?',
      a: 'Sim! Os membros do Clube garantem 15% de desconto vitalício em todas as compras da loja, brindes surpresa em cada entrega mensal e prioridade na fila de agendamento de serviços.',
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#EFFDF0] text-[#1a3d1a] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#1a3d1a] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-up text-sm border border-emerald-800">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. HERO SECTION WRAPPER (h-screen intacto como antes)    */}
      {/* ======================================================== */}
      <div id="inicio" className="h-screen w-full flex flex-col relative overflow-hidden bg-[#EFFDF0] shrink-0">
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
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveNav(link.name)}
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
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-[#1a3d1a]/25 bg-white/70 hover:bg-white text-[#1a3d1a] transition-all hover:scale-105 active:scale-95 shadow-xs"
              aria-label="Buscar produtos na P3TS"
              title="Buscar produtos"
            >
              <Search className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* Favorites Button */}
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

            {/* Cart Button */}
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

            {/* User Avatar */}
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
        {/* DESKTOP HERO LAYOUT (lg+) - EXACT ORIGINAL DESIGN        */}
        {/* ======================================================== */}
        <section className="hidden lg:flex flex-1 relative flex-col overflow-hidden">
          {/* Centered Heading Layer (z-20) - Always ABOVE the pet images */}
          <div className="relative z-20 w-full flex flex-col items-center justify-start pt-6 xl:pt-10 2xl:pt-12 px-8 pointer-events-none">
            <h1 className="font-serif-display font-normal text-[#1a3d1a] text-[clamp(50px,6.2vw,90px)] leading-[1.12] text-center max-w-4xl tracking-normal">
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

          {/* Bottom 3 Images & Overlays: Positioned at bottom (z-10, below text) */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-center pointer-events-none">
            {/* Left Image & Overlay */}
            <div className="flex-1 relative flex items-end justify-center max-h-[min(52vh,42vw)]">
              <img
                src={ASSETS.bottomLeft}
                alt="Cãozinho feliz acolhido"
                className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-800"
                referrerPolicy="no-referrer"
              />
              {/* Left Overlay: 98K+ stat with avatar stack */}
              <div
                className="absolute left-6 xl:left-12 pointer-events-auto flex items-center gap-3.5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 shadow-lg animate-scale-in delay-1000 transition-transform hover:scale-105 cursor-pointer z-30"
                style={{ bottom: 'clamp(16px, 3.5vh, 40px)' }}
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
            <div className="flex-[1.265] relative flex items-end justify-center max-h-[min(64vh,52vw)]">
              <img
                src={ASSETS.bottomCenter}
                alt="Gatinho fofo e acolhedor"
                className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-600"
                referrerPolicy="no-referrer"
              />
              {/* Center Overlay: Best Products + Explore Products Button */}
              <div
                className="absolute inset-x-0 mx-auto w-fit flex flex-col items-center pointer-events-auto text-center px-4 animate-fade-up delay-1100 z-30"
                style={{ bottom: 'clamp(16px, 3.5vh, 40px)' }}
              >
                <h2 className="text-white font-serif-display font-normal text-[clamp(20px,2.2vw,32px)] leading-tight drop-shadow-md mb-3 text-shadow">
                  Os Melhores Produtos para o Seu Pet
                </h2>
                <a
                  href="#loja"
                  className="flex items-center gap-2.5 bg-[#E86A10] hover:bg-[#d45e0d] text-white px-7 py-3 rounded-full font-semibold text-sm xl:text-base transition-all duration-300 shadow-xl hover:shadow-orange-500/30 hover:scale-105 active:scale-95 pointer-events-auto"
                >
                  <span>Explorar Produtos</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>

            {/* Right Image & Overlay */}
            <div className="flex-1 relative flex items-end justify-center max-h-[min(52vh,42vw)]">
              <img
                src={ASSETS.bottomRight}
                alt="Cachorrinho feliz e bem cuidado"
                className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-900"
                referrerPolicy="no-referrer"
              />
              {/* Right Overlay: 4.6 rating with orange filled star */}
              <div
                className="absolute right-6 xl:right-12 pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 shadow-lg animate-scale-in delay-1200 transition-transform hover:scale-105 cursor-pointer z-30"
                style={{ bottom: 'clamp(16px, 3.5vh, 40px)' }}
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
          {/* Heading (z-20) */}
          <div className="relative z-20 w-full flex flex-col items-center justify-start pt-6 px-6 pointer-events-none">
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

          {/* Bottom 3 Images (maxHeight controlled) */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-center pointer-events-none">
            <div className="flex-1 relative flex items-end justify-center max-h-[48vh]">
              <img
                src={ASSETS.bottomLeft}
                alt="Pet"
                className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-800"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute left-3 pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/80 shadow-md animate-scale-in delay-1000 z-30"
                style={{ bottom: '20px' }}
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

            <div className="flex-[1.265] relative flex items-end justify-center max-h-[58vh]">
              <img
                src={ASSETS.bottomCenter}
                alt="Pet Principal"
                className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-600"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute inset-x-0 mx-auto w-fit flex flex-col items-center pointer-events-auto text-center px-2 animate-fade-up delay-1100 z-30"
                style={{ bottom: '20px' }}
              >
                <h2 className="text-white font-serif-display font-normal text-xl leading-tight drop-shadow-md mb-2">
                  Os Melhores Produtos para o Seu Pet
                </h2>
                <a
                  href="#loja"
                  className="flex items-center gap-2 bg-[#E86A10] hover:bg-[#d45e0d] text-white px-5 py-2.5 rounded-full font-semibold text-xs shadow-lg pointer-events-auto"
                >
                  <span>Explorar Produtos</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>

            <div className="flex-1 relative flex items-end justify-center max-h-[48vh]">
              <img
                src={ASSETS.bottomRight}
                alt="Pet"
                className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-900"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute right-3 pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/80 shadow-md animate-scale-in delay-1200 z-30"
                style={{ bottom: '20px' }}
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
        <section className="flex md:hidden flex-1 flex-col justify-between overflow-hidden px-4 pt-2 pb-1 relative">
          {/* Top Section: Title, subtitle, "Explorar Produtos" (z-20) */}
          <div className="flex flex-col items-center text-center shrink-0 animate-fade-up delay-200 pt-1 relative z-20">
            <h1 className="font-serif-display font-normal text-[#1a3d1a] text-[32px] sm:text-[36px] leading-[1.12] tracking-normal">
              Tudo o que Seus <span className="text-[#E86A10]">P3TS</span> Amam
            </h1>
            <p className="text-xs text-gray-600 mt-1 max-w-xs font-medium leading-snug">
              Conforto acolhedor, brinquedos e nutrição premium pensados para cada momento.
            </p>
            <a
              href="#loja"
              className="mt-2.5 flex items-center gap-2 bg-[#E86A10] hover:bg-[#d45e0d] text-white px-5 py-2 rounded-full font-semibold text-xs shadow-md transition-transform active:scale-95"
            >
              <span>Explorar Produtos</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>

          {/* Stats Row: 98K+ with avatars left, divider, 4.6 star right (z-20) */}
          <div className="flex items-center justify-center gap-4 bg-white/85 backdrop-blur-xs py-1.5 px-4 rounded-xl border border-white/60 mx-auto w-full max-w-xs shadow-xs z-20 shrink-0 my-1 animate-fade-in delay-600">
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

          {/* Bottom 3 Images (z-10, controlled height) */}
          <div className="flex items-end justify-center w-full mt-auto relative z-10 pointer-events-none max-h-[38vh]">
            <div className="flex-1 flex items-end justify-center max-h-[34vh]">
              <img
                src={ASSETS.bottomLeft}
                alt="Pet"
                className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-[1.265] flex items-end justify-center max-h-[38vh]">
              <img
                src={ASSETS.bottomCenter}
                alt="Pet Principal"
                className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 flex items-end justify-center max-h-[34vh]">
              <img
                src={ASSETS.bottomRight}
                alt="Pet"
                className="w-full h-auto block object-contain object-bottom animate-photo-reveal delay-800"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>
      </div>

      {/* ======================================================== */}
      {/* 2. SEÇÃO: QUEM SOMOS                                     */}
      {/* ======================================================== */}
      <section id="quem-somos" className="py-24 px-6 md:px-12 bg-white relative border-y border-[#1a3d1a]/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-bold text-[#E86A10] block mb-2">
                Quem Somos · Nossa História
              </span>
              <h2 className="font-serif-display font-normal text-3xl md:text-5xl text-[#1a3d1a] leading-[1.15]">
                Muito mais que uma loja: um refúgio de acolhimento para o seu pet.
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed">
              Nascemos do amor genuíno e da convicção de que pets são membros legítimos da família. Criamos um ecossistema com produtos certificados, serviços carinhosos e atendimento veterinário ético.
            </p>
          </div>

          {/* 3 Pilares Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#EFFDF0] border border-[#1a3d1a]/10 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#1a3d1a] text-white flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-serif-display font-normal text-2xl text-[#1a3d1a] mb-3">
                Curadoria Rigorosa
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cada item do nosso estoque passa por testes prévios de segurança, ergonomia e qualidade nutricional antes de chegar até você.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#EFFDF0] border border-[#1a3d1a]/10 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#E86A10] text-white flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <h3 className="font-serif-display font-normal text-2xl text-[#1a3d1a] mb-3">
                Amor em Cada Detalhe
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Profissionais capacitados em comportamento animal para garantir que seu pet se sinta protegido, confortável e amado.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#EFFDF0] border border-[#1a3d1a]/10 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#1a3d1a] text-white flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="font-serif-display font-normal text-2xl text-[#1a3d1a] mb-3">
                Inovação & Conforto
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Materiais térmicos, brinquedos de enriquecimento ambiental e produtos desenhados para a saúde física e mental do seu melhor amigo.
              </p>
            </div>
          </div>

          {/* Banner de Estatísticas da P3TS */}
          <div className="mt-16 p-8 md:p-12 rounded-3xl bg-[#1a3d1a] text-white grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="block font-serif-display text-4xl md:text-5xl text-[#EFFDF0]">98.000+</span>
              <span className="text-xs md:text-sm text-emerald-200 mt-1 block">Famílias e pets atendidos</span>
            </div>
            <div>
              <span className="block font-serif-display text-4xl md:text-5xl text-[#EFFDF0]">100%</span>
              <span className="text-xs md:text-sm text-emerald-200 mt-1 block">Produtos certificados</span>
            </div>
            <div>
              <span className="block font-serif-display text-4xl md:text-5xl text-[#EFFDF0]">4.6 ★</span>
              <span className="text-xs md:text-sm text-emerald-200 mt-1 block">Nota de satisfação dos tutores</span>
            </div>
            <div>
              <span className="block font-serif-display text-4xl md:text-5xl text-[#EFFDF0]">24/7</span>
              <span className="text-xs md:text-sm text-emerald-200 mt-1 block">Suporte e acolhimento</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SEÇÃO: SERVIÇOS P3TS                                  */}
      {/* ======================================================== */}
      <section id="servicos" className="py-24 px-6 md:px-12 bg-[#EFFDF0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E86A10] block mb-2">
              Serviços Especializados
            </span>
            <h2 className="font-serif-display font-normal text-3xl md:text-5xl text-[#1a3d1a] leading-tight">
              Cuidados completos com carinho e padrão hospitalar
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-3">
              Estrutura equipada para garantir bem-estar sem estresse para cães e gatos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Banho e Tosa */}
            <div className="bg-white rounded-3xl p-8 border border-[#1a3d1a]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1a3d1a] flex items-center justify-center mb-6">
                  <Scissors className="w-6 h-6 text-[#1a3d1a]" />
                </div>
                <h3 className="font-serif-display font-normal text-2xl text-[#1a3d1a] mb-2">
                  Banho & Tosa SPA
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Banhos relaxantes com água ozonizada, hidratação profunda, tosa na tesoura e secagem com proteção acústica.
                </p>
                <ul className="text-xs text-gray-500 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Shampoos hipoalergênicos e naturais
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Corte de unhas e limpeza auricular
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Cabines individuais climatizadas
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setSelectedService('Banho & Tosa SPA');
                  setIsBookingOpen(true);
                }}
                className="w-full py-3 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Banho & Tosa</span>
              </button>
            </div>

            {/* Card 2: Veterinário */}
            <div className="bg-white rounded-3xl p-8 border border-[#1a3d1a]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#E86A10] flex items-center justify-center mb-6">
                  <Stethoscope className="w-6 h-6 text-[#E86A10]" />
                </div>
                <h3 className="font-serif-display font-normal text-2xl text-[#1a3d1a] mb-2">
                  Consulta & Prevenção
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Acompanhamento preventivo com médicos veterinários dedicados, vacinação ética e exames de rotina completos.
                </p>
                <ul className="text-xs text-gray-500 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Vacinas importadas e microchipagem
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Teleorientação para emergências
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Nutrição clínica personalizada
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setSelectedService('Consulta Veterinária');
                  setIsBookingOpen(true);
                }}
                className="w-full py-3 bg-[#E86A10] hover:bg-[#d45e0d] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta</span>
              </button>
            </div>

            {/* Card 3: Clube de Assinatura */}
            <div className="bg-white rounded-3xl p-8 border border-[#1a3d1a]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                  <Gift className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-serif-display font-normal text-2xl text-[#1a3d1a] mb-2">
                  Clube P3TS Box
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Receba mensalmente rações premium, medicamentos preventivos, brinquedos e mimos surpresa com desconto garantido.
                </p>
                <ul className="text-xs text-gray-500 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> 15% OFF fixo em todos os produtos
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Frete grátis em todos os pedidos
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Brindes exclusivos a cada ciclo
                  </li>
                </ul>
              </div>
              <button
                onClick={() => showToast('Inscrição no Clube P3TS Box iniciada! Fale com nosso consultor.')}
                className="w-full py-3 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Conhecer o Clube</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SEÇÃO: LOJA & CATÁLOGO                                */}
      {/* ======================================================== */}
      <section id="loja" className="py-24 px-6 md:px-12 bg-white border-t border-[#1a3d1a]/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#E86A10] block mb-2">
                Loja Oficial P3TS
              </span>
              <h2 className="font-serif-display font-normal text-3xl md:text-5xl text-[#1a3d1a]">
                Destaques Mais Amados pelos Pets
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-sm">
              Explore nossos produtos campeões de vendas com entrega rápida e garantia de conforto.
            </p>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {[
              { id: 'todos', label: 'Todos os Produtos' },
              { id: 'camas', label: 'Casinhas & Camas' },
              { id: 'alimentacao', label: 'Alimentação & Snacks' },
              { id: 'brinquedos', label: 'Brinquedos Interativos' },
              { id: 'higiene', label: 'Higiene & Bem-estar' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#1a3d1a] text-white shadow-sm'
                    : 'bg-[#EFFDF0] text-gray-700 hover:bg-emerald-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#EFFDF0]/40 rounded-3xl p-5 border border-[#1a3d1a]/10 hover:border-[#1a3d1a]/25 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white mb-4 shadow-2xs">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#E86A10] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <button
                      onClick={handleToggleFavorite}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-gray-600 hover:text-[#E86A10] flex items-center justify-center transition-colors shadow-xs"
                      title="Favoritar"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="font-bold text-[#1a3d1a]">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews})</span>
                  </div>

                  <h3 className="font-serif-display font-normal text-xl text-[#1a3d1a] group-hover:text-[#E86A10] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1a3d1a]/10 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#1a3d1a]">
                      R$ {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through block">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs active:scale-95"
                    title="Adicionar ao carrinho"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Banner de Garantia de Satisfação */}
          <div className="mt-16 p-8 rounded-3xl bg-[#EFFDF0] border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#E86A10] text-white flex items-center justify-center shrink-0">
                <RefreshCw className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-serif-display font-normal text-2xl text-[#1a3d1a]">
                  Garantia Pet Feliz: 30 dias para teste
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                  Se o seu pet não se adaptar, devolvemos seu dinheiro sem questionamentos.
                </p>
              </div>
            </div>
            <button
              onClick={() => showToast('Política de troca transparente: logística reversa 100% gratuita!')}
              className="px-6 py-2.5 rounded-full bg-white text-[#1a3d1a] border border-[#1a3d1a]/15 text-xs font-semibold hover:bg-emerald-50 transition-colors whitespace-nowrap shadow-xs"
            >
              Conhecer Política de Devolução
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. SEÇÃO: DEPOIMENTOS                                    */}
      {/* ======================================================== */}
      <section id="depoimentos" className="py-24 px-6 md:px-12 bg-[#EFFDF0] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E86A10] block mb-2">
              Opinião de Quem Ama
            </span>
            <h2 className="font-serif-display font-normal text-3xl md:text-5xl text-[#1a3d1a] leading-tight">
              O que os tutores dizem sobre a P3TS
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-3">
              Histórias reais de carinho, saúde e satisfação compartilhadas pela nossa comunidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-[#1a3d1a]/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  "A Casinha Aconchegante da P3TS foi a melhor compra que fiz para a Amora! O material é quentinho e ela não dorme mais em outro lugar."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1a3d1a] font-bold flex items-center justify-center text-xs">
                  CR
                </div>
                <div>
                  <h5 className="text-sm font-bold text-[#1a3d1a]">Camila Rodrigues</h5>
                  <span className="text-xs text-gray-500">Tutora da gatinha Amora</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#1a3d1a]/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  "O serviço de banho com água ozonizada tirou a alergia de pele do Fred. O cuidado e o respeito dos profissionais são de outro nível."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-[#E86A10] font-bold flex items-center justify-center text-xs">
                  FA
                </div>
                <div>
                  <h5 className="text-sm font-bold text-[#1a3d1a]">Felipe Albuquerque</h5>
                  <span className="text-xs text-gray-500">Tutor do Golden Fred</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#1a3d1a]/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  "A entrega chegou no mesmo dia aqui em São Paulo! Embalagem linda, cheirosa e com petisquinhos de brinde. Ganharam uma cliente fiel."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1a3d1a] font-bold flex items-center justify-center text-xs">
                  MS
                </div>
                <div>
                  <h5 className="text-sm font-bold text-[#1a3d1a]">Mariana Santos</h5>
                  <span className="text-xs text-gray-500">Tutora do Spitz Theo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. SEÇÃO: PERGUNTAS FREQUENTES (FAQ)                     */}
      {/* ======================================================== */}
      <section id="faq" className="py-24 px-6 md:px-12 bg-white border-t border-[#1a3d1a]/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E86A10] block mb-2">
              Dúvidas Comuns
            </span>
            <h2 className="font-serif-display font-normal text-3xl md:text-5xl text-[#1a3d1a]">
              Perguntas Frequentes
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Tudo o que você precisa saber sobre compras, envios e serviços na P3TS.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#1a3d1a]/10 overflow-hidden bg-[#EFFDF0]/30 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-[#1a3d1a] hover:text-[#E86A10] transition-colors"
                  >
                    <span className="text-sm md:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#E86A10]' : 'text-gray-400'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-[#1a3d1a]/5 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. SEÇÃO: NEWSLETTER & COMUNIDADE                        */}
      {/* ======================================================== */}
      <section className="py-20 px-6 md:px-12 bg-[#1a3d1a] text-white relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-300 block mb-2">
            Clube de Vantagens
          </span>
          <h2 className="font-serif-display font-normal text-3xl md:text-5xl text-[#EFFDF0] leading-tight mb-4">
            Receba 15% OFF na sua primeira compra
          </h2>
          <p className="text-sm md:text-base text-emerald-200/90 max-w-lg mx-auto mb-8 leading-relaxed">
            Cadastre-se na comunidade P3TS para receber dicas de veterinários parceiros, lançamentos antecipados e cupons exclusivos.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newsletterEmail) return;
              showToast('Cupom P3TS15 enviado para seu e-mail!');
              setNewsletterEmail('');
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Seu melhor e-mail..."
              required
              className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-emerald-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white font-semibold text-sm transition-all shadow-lg shrink-0 whitespace-nowrap active:scale-95"
            >
              Garantir Cupom
            </button>
          </form>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. FOOTER                                                */}
      {/* ======================================================== */}
      <footer className="bg-white border-t border-[#1a3d1a]/10 py-16 px-6 md:px-12 text-[#1a3d1a]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Coluna 1: Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#1a3d1a] flex items-center justify-center text-white">
                <svg className="w-5 h-5 fill-[#EFFDF0]" viewBox="0 0 24 24">
                  <path d="M12 10.5c-2.4 0-4.3 1.9-4.3 4.3 0 2.1 1.7 3.7 3.8 3.7 1.2 0 2.2-.5 2.9-1.3.7.8 1.7 1.3 2.9 1.3 2.1 0 3.8-1.6 3.8-3.7 0-2.4-1.9-4.3-4.3-4.3-.8 0-1.5.2-2.1.6-.6-.4-1.3-.6-2.1-.6zM7.5 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6.5-2.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                </svg>
              </div>
              <span className="font-serif-display font-normal text-2xl text-[#1a3d1a]">
                P3TS<span className="text-[#E86A10]">.</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              O ecossistema completo para a saúde, bem-estar e alegria do seu animal de estimação. Feito com amor por quem vive por eles.
            </p>
            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} P3TS Pet Store. Todos os direitos reservados.
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h5 className="font-semibold text-sm mb-4 text-[#1a3d1a]">Navegação Rápida</h5>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><a href="#inicio" className="hover:text-[#E86A10] transition-colors">Início</a></li>
              <li><a href="#quem-somos" className="hover:text-[#E86A10] transition-colors">Nossa História</a></li>
              <li><a href="#servicos" className="hover:text-[#E86A10] transition-colors">Serviços & SPA</a></li>
              <li><a href="#loja" className="hover:text-[#E86A10] transition-colors">Loja Oficial</a></li>
              <li><a href="#faq" className="hover:text-[#E86A10] transition-colors">Dúvidas Frequentes</a></li>
            </ul>
          </div>

          {/* Coluna 3: Categorias */}
          <div>
            <h5 className="font-semibold text-sm mb-4 text-[#1a3d1a]">Categorias</h5>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><a href="#loja" onClick={() => setSelectedCategory('camas')} className="hover:text-[#E86A10] transition-colors">Casinhas & Camas</a></li>
              <li><a href="#loja" onClick={() => setSelectedCategory('alimentacao')} className="hover:text-[#E86A10] transition-colors">Alimentação Saudável</a></li>
              <li><a href="#loja" onClick={() => setSelectedCategory('brinquedos')} className="hover:text-[#E86A10] transition-colors">Brinquedos Interativos</a></li>
              <li><a href="#loja" onClick={() => setSelectedCategory('higiene')} className="hover:text-[#E86A10] transition-colors">Higiene & Farmácia</a></li>
            </ul>
          </div>

          {/* Coluna 4: Atendimento & Segurança */}
          <div>
            <h5 className="font-semibold text-sm mb-4 text-[#1a3d1a]">Atendimento</h5>
            <ul className="space-y-3 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E86A10] shrink-0" />
                <span>(11) 4002-8922 · Seg a Sáb 8h às 20h</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E86A10] shrink-0" />
                <span>contato@p3ts.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certificado de Compra Segura SSL</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* MODAL DE AGENDAMENTO DE SERVIÇOS                         */}
      {/* ======================================================== */}
      {isBookingOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsBookingOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-gray-100 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-semibold text-lg text-[#1a3d1a]">Agendamento P3TS</h3>
                <p className="text-xs text-gray-500">Escolha o melhor dia e horário para o seu pet</p>
              </div>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Serviço Selecionado
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1a3d1a] focus:outline-none bg-white"
                >
                  <option value="Banho & Tosa SPA">Banho & Tosa SPA</option>
                  <option value="Consulta Veterinária">Consulta Veterinária Preventiva</option>
                  <option value="Day Care Recreativo">Day Care Recreativo</option>
                  <option value="Avaliação de Comportamento">Avaliação de Comportamento</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nome do Pet & Raça/Espécie
                </label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Ex: Thor (Golden Retriever) ou Nina (Gatinha)"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1a3d1a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Data Desejada
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1a3d1a] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#E86A10] hover:bg-[#d45e0d] text-white rounded-xl font-semibold text-sm transition-all shadow-md active:scale-95"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL DE BUSCA                                           */}
      {/* ======================================================== */}
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

      {/* ======================================================== */}
      {/* DRAWER DO CARRINHO                                       */}
      {/* ======================================================== */}
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
                <span>Frete grátis para todo o Brasil nesta compra!</span>
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

      {/* ======================================================== */}
      {/* MODAL DE FAVORITOS                                       */}
      {/* ======================================================== */}
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
                  <h4 className="text-sm font-semibold text-[#1a3d1a]">Casinha Aconchegante Térmica</h4>
                  <span className="text-xs font-bold text-[#E86A10]">R$ 249,90</span>
                </div>
                <button
                  onClick={() => handleAddToCart()}
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
