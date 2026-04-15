'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { PRODUCTS, CONTACT_INFO } from '@/src/constants';
import { MessageCircle, ArrowLeft, CheckCircle2, Settings, Target, Zap, Shield } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

export default function ProductDetail() {
  const params = useParams<{ id?: string | string[] }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const product = PRODUCTS.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(product?.image);

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-4xl font-display font-bold mb-6">Produit non trouvé</h1>
        <Link href="/produits" className="text-brand-gold font-bold flex items-center justify-center gap-2">
          <ArrowLeft size={20} />
          Retour aux produits
        </Link>
      </div>
    );
  }

  const whatsappLink = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}?text=Bonjour, je souhaite avoir plus d'informations sur le produit : ${product.title}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/produits" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-gold transition-colors mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Retour aux produits
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Product Images & Gallery */}
          <div className="space-y-6">
            <motion.div 
              layoutId={`img-${product.id}`}
              className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100"
            >
              <img 
                src={activeImage} 
                alt={product.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.gallery.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "w-24 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0",
                      activeImage === img ? "border-brand-gold scale-105" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-navy mb-6 leading-tight">
                {product.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-bold text-brand-navy">
                  <Settings size={20} className="text-brand-gold" />
                  Spécifications
                </h4>
                <ul className="space-y-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-bold text-brand-navy">
                  <Target size={20} className="text-brand-gold" />
                  Applications
                </h4>
                <ul className="space-y-3">
                  {product.applications.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-0.5" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-brand-gray p-8 rounded-[2rem] border border-gray-100">
              <h4 className="flex items-center gap-2 font-bold text-brand-navy mb-6">
                <Zap size={20} className="text-brand-gold" />
                Avantages Clés
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.advantages.map((adv, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-50">
                    <Shield size={18} className="text-brand-gold" />
                    <span className="text-sm font-semibold text-gray-700">{adv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-green-200"
              >
                <MessageCircle size={24} />
                Commander via WhatsApp
              </a>
              <Link 
                href="/contact" 
                className="flex-1 bg-brand-navy text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {product.videoUrl && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Présentation Vidéo</h2>
              <p className="text-gray-500">Découvrez le produit en action sur le terrain.</p>
            </div>
            <div className="max-w-4xl mx-auto aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-black">
              {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={product.videoUrl} 
                  title={product.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <video 
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src={product.videoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              )}
            </div>
          </section>
        )}

        {/* Related Products */}
        <section>
          <h2 className="text-3xl font-display font-bold mb-12">Autres Produits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map((p) => (
              <Link 
                key={p.id} 
                href={`/produits/${p.id}`}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-gray-50"
              >
                <div className="h-48 overflow-hidden">
                  <img src={p.image} alt={p.shortTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-brand-gold transition-colors">{p.shortTitle}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
