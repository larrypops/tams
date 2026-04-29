import { motion } from 'motion/react';
import { ArrowRight, Phone, MessageCircle, FileText, CheckCircle2, Building2, Users2, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CONTACT_INFO } from '@/src/constants';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000" 
            alt="Construction background" 
            className="w-full h-full object-cover brightness-[0.3]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brand-gold/20 border border-brand-gold/30 text-brand-gold rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                TAM'S EMPIRE CONSTRUCTION SARL
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-tight mb-6">
                Grossiste en matériaux de <span className="text-brand-gold">construction</span> au Cameroun
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Approvisionnement fiable pour vos chantiers et projets. Nous accompagnons les entreprises BTP, mairies, revendeurs et artisans avec des matériaux métalliques de qualité.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${CONTACT_INFO.phone1.replace(/\s+/g, '')}`} className="bg-brand-gold text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-yellow-600 transition-all shadow-xl shadow-yellow-900/20">
                  <Phone size={20} />
                  Appeler maintenant
                </a>
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}`} className="bg-white text-brand-navy px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-all shadow-xl">
                  <MessageCircle size={20} className="text-[#25D366]" />
                  WhatsApp direct
                </a>
                <Link to="/contact" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <FileText size={20} />
                  Demander un devis
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-brand-gold/10 blur-[120px] rounded-full -mr-20 -mb-20" />
      </section>

      {/* Presentation Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6">
                La référence des bâtisseurs
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chez TAM’S EMPIRE CONSTRUCTION SARL, nous sommes spécialisés dans la fourniture de matériaux de construction métalliques pour les projets professionnels et industriels.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Nous mettons à votre disposition des solutions fiables, durables et adaptées aux réalités du terrain au Cameroun. Nous ne vendons pas seulement des matériaux, nous sécurisons vos projets et vos investissements.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Building2, title: 'BTP & Mairies', desc: 'Accompagnement institutionnel' },
                  { icon: Users2, title: 'Revendeurs', desc: 'Approvisionnement régulier' },
                  { icon: ShieldCheck, title: 'Qualité Pro', desc: 'Matériaux certifiés' },
                  { icon: Clock, title: 'Réactivité', desc: 'Service rapide' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-brand-gold shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000" 
                  alt="Construction materials" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-gold text-white p-8 rounded-3xl shadow-2xl hidden md:block">
                <p className="text-4xl font-display font-black mb-1">100%</p>
                <p className="font-bold uppercase tracking-wider text-sm">Fiabilité Garantie</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Nos Produits Principaux</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une gamme complète de solutions métalliques pour tous vos besoins de construction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.shortTitle} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl mb-3 group-hover:text-brand-gold transition-colors">{product.shortTitle}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {product.description}
                  </p>
                  <Link to={`/produits/${product.id}`} className="text-brand-gold font-bold flex items-center gap-2 group/btn">
                    En savoir plus
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-navy text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-12">Pourquoi nous choisir ?</h2>
              <div className="space-y-8">
                {[
                  { title: 'Approvisionnement fiable et régulier', desc: 'Nous garantissons une disponibilité constante de nos stocks.' },
                  { title: 'Produits de qualité professionnelle', desc: 'Tous nos matériaux répondent aux normes les plus strictes.' },
                  { title: 'Disponibilité en volume', desc: 'Capacité à fournir des chantiers de grande envergure.' },
                  { title: 'Réactivité et service rapide', desc: 'Délais de livraison optimisés pour vos projets.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000" 
                  alt="Quality materials" 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-display font-black text-brand-gold mb-2">TAM'S</p>
                  <p className="text-xl font-bold tracking-widest uppercase">EMPIRE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-gold rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-yellow-200">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Besoin d’un fournisseur fiable pour vos chantiers ?</h2>
              <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
                Contactez-nous dès maintenant pour un devis rapide et personnalisé. Nos experts sont à votre écoute.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a href={`tel:${CONTACT_INFO.phone1.replace(/\s+/g, '')}`} className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl">
                  <Phone size={24} />
                  {CONTACT_INFO.phone1}
                </a>
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}`} className="bg-white text-brand-navy px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl">
                  <MessageCircle size={24} className="text-[#25D366]" />
                  WhatsApp Direct
                </a>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-navy/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
