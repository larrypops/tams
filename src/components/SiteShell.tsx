"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { CONTACT_INFO, PRODUCTS } from "@/src/constants";
import { cn } from "@/src/lib/utils";

function CompanyLogo() {
  return (
    <div className="flex items-center">
      <img
        src="/images/logo-01.jpeg"
        alt="Logo TAM'S EMPIRE CONSTRUCTION"
        className="h-14 w-14 rounded-xl border border-brand-gold/30 object-cover md:h-16 md:w-16"
      />
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Produits", path: "/produits" },
    { name: "Réalisations", path: "/realisations" },
    { name: "À Propos", path: "/a-propos" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 py-3 shadow-md backdrop-blur-md" : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <CompanyLogo />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "font-medium transition-colors hover:text-brand-gold",
                  isActivePath(link.path) ? "text-brand-gold" : "text-brand-navy",
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full bg-brand-gold px-6 py-2 font-bold text-white shadow-lg shadow-yellow-200 transition-all hover:bg-yellow-600"
            >
              Devis Gratuit
            </Link>
          </div>

          <button
            type="button"
            className="text-brand-navy md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 border-t bg-white px-4 py-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "border-b border-gray-50 py-2 text-lg font-semibold",
                    isActivePath(link.path) ? "text-brand-gold" : "text-brand-navy",
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 rounded-xl bg-brand-gold py-3 text-center font-bold text-white"
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
    <footer className="bg-brand-navy pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo-01.jpeg"
                  alt="Logo TAM'S EMPIRE CONSTRUCTION"
                  className="h-10 w-10 rounded-lg border border-brand-gold/30 object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-display text-xl leading-none font-bold text-brand-gold">
                    TAM&apos;S EMPIRE
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-white">
                    Construction SARL
                  </span>
                </div>
              </div>
            </Link>
            <p className="leading-relaxed text-gray-400">
              La référence des bâtisseurs au Cameroun. Grossiste en matériaux de
              construction métalliques de haute qualité.
            </p>
            <div className="flex gap-4">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-brand-gold"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-display text-lg font-bold">Navigation</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-gold">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/produits" className="transition-colors hover:text-brand-gold">
                  Nos Produits
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="transition-colors hover:text-brand-gold">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="transition-colors hover:text-brand-gold">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-brand-gold">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-display text-lg font-bold">Produits</h4>
            <ul className="space-y-4 text-gray-400">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/produits/${product.id}`}
                    className="transition-colors hover:text-brand-gold"
                  >
                    {product.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-display text-lg font-bold">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 text-brand-gold" size={20} />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="shrink-0 text-brand-gold" size={20} />
                <div className="flex flex-col">
                  <span>{CONTACT_INFO.phone1}</span>
                  <span>{CONTACT_INFO.phone2}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="shrink-0 text-brand-gold" size={20} />
                <span className="break-all">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-10 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Accès administrateur</p>
              <p className="text-xs text-gray-300">
                Ouvrez le panel pour gérer les produits et contenus.
              </p>
            </div>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center rounded-xl border border-brand-gold bg-brand-gold px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-yellow-600"
            >
              Ouvrir le panel admin
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} TAM&apos;S EMPIRE CONSTRUCTION SARL. Tous
            droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
            <a href="#" className="transition-colors hover:text-white">
              Mentions Légales
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloating() {
  return (
    <a
      href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 left-4 z-50 flex items-center justify-center rounded-full bg-white p-3 text-white shadow-2xl ring-4 ring-[#25D366]/25 transition-transform hover:scale-110 md:bottom-8 md:left-6 lg:right-8 lg:left-auto"
    >
      <img
        src="/icons/whatsapp-logo.svg"
        alt="WhatsApp"
        className="h-10 w-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
      />
      <span className="pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm font-bold text-brand-navy opacity-0 shadow-xl transition-opacity group-hover:opacity-100 lg:block">
        Besoin d&apos;aide ? WhatsApp
      </span>
    </a>
  );
}

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {isAdminRoute ? (
        <main className="min-h-screen bg-slate-50">{children}</main>
      ) : (
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppFloating />
        </div>
      )}
    </>
  );
}
