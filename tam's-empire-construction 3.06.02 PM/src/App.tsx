import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, MessageCircle, Menu, X, ChevronRight, ArrowRight, CheckCircle2, Building2, Users2, ShieldCheck, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { PRODUCTS, CONTACT_INFO } from '@/src/constants';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Realisations from './pages/Realisations';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Produits', path: '/produits' },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
            <div className="flex flex-col">
              <span className={cn("font-display font-bold text-xl leading-none text-brand-gold")}>TAM'S EMPIRE</span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-navy">Construction SARL</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-colors hover:text-brand-gold",
                  location.pathname === link.path ? "text-brand-gold" : "text-brand-navy"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="bg-brand-gold text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-200">
              Devis Gratuit
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-brand-navy" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl py-6 px-4 md:hidden border-t"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-semibold py-2 border-b border-gray-50",
                    location.pathname === link.path ? "text-brand-gold" : "text-brand-navy"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="bg-brand-gold text-white text-center py-3 rounded-xl font-bold mt-2"
              >
                Demander un devis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none text-brand-gold">TAM'S EMPIRE</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-white">Construction SARL</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              La référence des bâtisseurs au Cameroun. Grossiste en matériaux de construction métalliques de haute qualité.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <MessageCircle size={20} />
              </a>
              {/* Add more social icons if needed */}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-brand-gold transition-colors">Accueil</Link></li>
              <li><Link to="/produits" className="hover:text-brand-gold transition-colors">Nos Produits</Link></li>
              <li><Link to="/realisations" className="hover:text-brand-gold transition-colors">Réalisations</Link></li>
              <li><Link to="/a-propos" className="hover:text-brand-gold transition-colors">À Propos</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Produits</h4>
            <ul className="space-y-4 text-gray-400">
              {PRODUCTS.map(p => (
                <li key={p.id}><Link to="/produits" className="hover:text-brand-gold transition-colors">{p.shortTitle}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-gold shrink-0" size={20} />
                <span>Douala, Cameroun</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-brand-gold shrink-0" size={20} />
                <div className="flex flex-col">
                  <span>{CONTACT_INFO.phone1}</span>
                  <span>{CONTACT_INFO.phone2}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-brand-gold shrink-0" size={20} />
                <span className="break-all">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TAM'S EMPIRE CONSTRUCTION SARL. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloating() {
  return (
    <a 
      href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 bg-white text-brand-navy px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Besoin d'aide ? WhatsApp
      </span>
    </a>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produits" element={<Products />} />
              <Route path="/produits/:id" element={<ProductDetail />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/realisations" element={<Realisations />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppFloating />
      </div>
    </Router>
  );
}
