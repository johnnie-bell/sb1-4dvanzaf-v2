import { Language } from './i18n';

export type CategoryKey = 'BEACH' | 'SPORTS' | 'BABY' | 'MOBILITY';

export const CATEGORY_META: Record<CategoryKey, { image: string }> = {
  BEACH: { image: '/categories/beach.jpg' },
  SPORTS: { image: '/categories/sports.jpg' },
  BABY: { image: '/categories/baby.jpg' },
  MOBILITY: { image: '/categories/mobility.jpg' },
};

export const getCategoryLabel = (category: CategoryKey, language: Language): string => {
  const labels = {
    en: {
      BEACH: 'Beach',
      SPORTS: 'Sport & Activity',
      BABY: 'Baby',
      MOBILITY: 'Mobility'
    },
    es: {
      BEACH: 'Playa',
      SPORTS: 'Deporte y Actividad',
      BABY: 'Bebé',
      MOBILITY: 'Movilidad'
    },
    fr: {
      BEACH: 'Plage',
      SPORTS: 'Sport et Activité',
      BABY: 'Bébé',
      MOBILITY: 'Mobilité'
    },
    nl: {
      BEACH: 'Strand',
      SPORTS: 'Sport & Activiteit',
      BABY: 'Baby',
      MOBILITY: 'Mobiliteit'
    }
  };
  return labels[language][category];
};