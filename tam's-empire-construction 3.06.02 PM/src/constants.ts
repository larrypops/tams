export interface Product {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  features: string[];
  applications: string[];
  advantages: string[];
  specs?: {
    label: string;
    value: string;
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'buses-metalliques',
    title: 'Buses métalliques galvanisées – Solution durable pour vos ouvrages',
    shortTitle: 'Buses métalliques',
    description: 'Nos buses métalliques en acier galvanisé sont conçues pour répondre aux exigences des projets d’infrastructure modernes. Elles assurent un drainage efficace des eaux et garantissent la durabilité des ouvrages routiers et hydrauliques.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: '/videos/buses-demo.mp4', // Local video file in public/videos/
    features: [
      'Diamètres : 800 mm à 4000 mm',
      'Épaisseurs : 2 mm | 2.5 mm | 3 mm',
      'Profil d’ondulation : 912 mm',
      'Pas d’ondulation : 78 mm',
      'Profondeur d’ondulation : 18 mm'
    ],
    applications: [
      'Drainage des eaux pluviales',
      'Traversée de routes',
      'Ouvrages hydrauliques',
      'Aménagements urbains et ruraux'
    ],
    advantages: [
      'Haute résistance mécanique',
      'Protection anticorrosion (acier galvanisé)',
      'Longue durée de vie',
      'Installation rapide et efficace',
      'Réduction des coûts d’entretien'
    ]
  },
  {
    id: 'pannes-metalliques',
    title: 'Pannes métalliques galvanisées – Solidité et performance pour vos structures',
    shortTitle: 'Pannes métalliques (Z & C)',
    description: 'Nos pannes métalliques profils Z et C en acier galvanisé sont spécialement conçues pour la réalisation de charpentes métalliques fiables et durables.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
    ],
    features: [
      'Profils : Z et C',
      'Hauteurs : 80mm à 220 mm',
      'Épaisseurs : 1.5 mm | 2 mm',
      'Traitement : Acier galvanisé'
    ],
    applications: [
      'Charpentes métalliques',
      'Toitures industrielles et commerciales',
      'Hangars et entrepôts',
      'Bâtiments agricoles'
    ],
    advantages: [
      'Haute résistance mécanique',
      'Protection contre la corrosion',
      'Structure légère et facile à manipuler',
      'Installation rapide',
      'Longue durée de vie'
    ]
  },
  {
    id: 'toles-couverture',
    title: 'Tôles de couverture professionnelles – Performance, protection et finition haut de gamme',
    shortTitle: 'Tôles de couverture',
    description: 'Nous proposons des tôles de couverture en aluminium et en acier revêtu (prélaqué / aluzinc), conçues pour offrir une excellente protection contre les intempéries.',
    image: 'https://images.unsplash.com/photo-1635424710928-0544e8512eae?auto=format&fit=crop&q=80&w=800',
    features: [
      'Types : Bac (4 & 5 nervures), Tuile, Ondulée',
      'Épaisseurs Acier : 0.26mm à 0.50mm',
      'Épaisseurs Alu : 0.35mm à 0.60mm',
      'Couleurs : Vert, Bordeaux, Bleu, Noir, Rouge'
    ],
    applications: [
      'Maisons résidentielles',
      'Bâtiments industriels',
      'Hangars et entrepôts',
      'Bâtiments commerciaux'
    ],
    advantages: [
      'Excellente protection contre la corrosion',
      'Étanchéité optimale',
      'Finition esthétique durable',
      'Installation rapide',
      'Longue durée de vie'
    ]
  },
  {
    id: 'gabions-metalliques',
    title: 'Gabions métalliques – Solution de soutènement durable',
    shortTitle: 'Gabions métalliques',
    description: 'Nous mettons à votre disposition des gabions métalliques robustes, idéals pour les murs de soutènement et la protection contre l’érosion.',
    image: 'https://images.unsplash.com/photo-1590060417666-4209e3883117?auto=format&fit=crop&q=80&w=800',
    features: [
      'Structure résistante et durable',
      'Adaptés aux projets publics et privés',
      'Maillage haute performance'
    ],
    applications: [
      'Murs de soutènement',
      'Protection contre l’érosion',
      'Stabilisation de talus',
      'Aménagements routiers et paysagers'
    ],
    advantages: [
      'Structure robuste',
      'Installation rapide',
      'Drainage naturel',
      'Esthétique intégrée au paysage'
    ]
  },
  {
    id: 'toles-noires',
    title: 'Tôles noires & produits métalliques – Idéal pour fabrication et structures',
    shortTitle: 'Tôles noires',
    description: 'Nous fournissons des tôles noires et divers produits métalliques de qualité supérieure, idéaux pour la fabrication, la soudure et les structures métalliques robustes.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    features: [
      'Large choix de dimensions',
      'Différentes épaisseurs disponibles',
      'Acier de haute qualité',
      'Prêt pour la soudure'
    ],
    applications: [
      'Fabrication industrielle',
      'Soudure et chaudronnerie',
      'Structures métalliques',
      'Équipements de chantier'
    ],
    advantages: [
      'Grande polyvalence',
      'Excellente soudabilité',
      'Résistance structurelle',
      'Rapport qualité/prix optimal'
    ]
  }
];

export const CONTACT_INFO = {
  phone1: '+237 693 44 89 89',
  phone2: '+237 675 72 62 72',
  whatsapp: '+237 693 44 89 89',
  email: 'tamsempireconsrution50@gmail.com',
  address: 'Douala, Cameroun',
};
