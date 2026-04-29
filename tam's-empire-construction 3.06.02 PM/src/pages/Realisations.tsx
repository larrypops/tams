import { motion } from 'motion/react';
import { ExternalLink, MapPin, Calendar, Building2 } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Installation de Buses Métalliques',
    location: 'Axe Douala - Yaoundé',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    date: '2023'
  },
  {
    title: 'Charpente Métallique Industrielle',
    location: 'Zone Industrielle Magzi',
    category: 'Bâtiment',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    date: '2023'
  },
  {
    title: 'Couverture Toiture Résidentielle',
    location: 'Bonapriso, Douala',
    category: 'Toiture',
    image: 'https://images.unsplash.com/photo-1635424710928-0544e8512eae?auto=format&fit=crop&q=80&w=800',
    date: '2024'
  },
  {
    title: 'Ouvrage de Drainage Urbain',
    location: 'Yaoundé',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    date: '2024'
  },
  {
    title: 'Mur de Soutènement en Gabions',
    location: 'Ouest Cameroun',
    category: 'Génie Civil',
    image: 'https://images.unsplash.com/photo-1590060417666-4209e3883117?auto=format&fit=crop&q=80&w=800',
    date: '2023'
  },
  {
    title: 'Entrepôt Logistique',
    location: 'Kribi',
    category: 'Bâtiment',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    date: '2024'
  }
];

export default function Realisations() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6">Nos <span className="text-brand-gold">Réalisations</span></h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment nos matériaux sécurisent et pérennisent les infrastructures à travers tout le Cameroun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-50"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-gold text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{project.date}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-brand-navy mb-4 group-hover:text-brand-gold transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <MapPin size={16} className="text-brand-gold" />
                  <span>{project.location}</span>
                </div>
                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                    <Building2 size={16} className="text-brand-gold" />
                    TAM'S EMPIRE
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-navy hover:bg-brand-gold hover:text-white transition-all">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Projets Livrés', value: '150+' },
            { label: 'Clients Satisfaits', value: '80+' },
            { label: 'Villes Couvertes', value: '15+' },
            { label: 'Années d\'Expérience', value: '10+' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 bg-brand-gray rounded-3xl">
              <p className="text-4xl md:text-5xl font-display font-black text-brand-gold mb-2">{stat.value}</p>
              <p className="text-sm font-bold text-brand-navy uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
