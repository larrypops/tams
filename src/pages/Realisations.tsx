'use client';

import { motion } from 'motion/react';

const REALISATION_IMAGES = [
  '/images/realisations-01.jpeg',
  '/images/realisation-02.jpeg',
  '/images/realisations-03.jpeg',
  '/images/realisations-04.jpeg',
  '/images/realisations-05.jpeg',
  '/images/realisations-06.jpeg',
  '/images/realisations-07.jpeg',
  '/images/realisations-08.jpeg',
  '/images/realisations-09.jpeg',
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
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6">Nos <span className="text-brand-gold">Réalisations</span></h1>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-xl text-gray-600 leading-relaxed">
            TAM&apos;S EMPIRE accompagne des projets de construction et d&apos;infrastructure
            à travers le Cameroun avec des matériaux métalliques fiables et durables.
            Cette galerie présente quelques réalisations livrées sur le terrain.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10">
            Galerie <span className="text-brand-gold">Photos</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REALISATION_IMAGES.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-50"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={`Réalisation ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
