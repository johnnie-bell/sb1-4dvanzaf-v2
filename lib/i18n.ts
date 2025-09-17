export type Language = 'en' | 'es' | 'fr' | 'nl';

export interface Translations {
  // Header & Navigation
  browse: string;
  howItWorks: string;
  menu: string;
  inbox: string;
  myProfile: string;
  help: string;
  signOut: string;
  
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  browseItems: string;
  
  // Filter Bar
  deliveryDate: string;
  weeks: string;
  collection: string;
  pricePerWeek: string;
  
  // Product
  addToCart: string;
  rentalDates: string;
  perfectForHoliday: string;
  highQuality: string;
  flexiblePricing: string;
  easyDelivery: string;
  fullyCleaned: string;
  selectDeliveryDate: string;
  cancel: string;
  
  // Categories
  beach: string;
  sports: string;
  baby: string;
  mobility: string;
  
  // Cart
  cart: string;
  cartEmpty: string;
  addItemsToStart: string;
  subtotal: string;
  checkout: string;
  perWeek: string;
  
  // Footer
  footerDescription: string;
  browseCategories: string;
  support: string;
  helpCenter: string;
  contactSupport: string;
  contact: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
  
  // Common
  availableItems: string;
  itemsFound: string;
  noItemsFound: string;
  tryAdjustingFilters: string;
  continueBrowsing: string;
  backToHome: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header & Navigation
    browse: 'Browse',
    howItWorks: 'How it works',
    menu: 'Menu',
    inbox: 'Inbox',
    myProfile: 'My Profile',
    help: 'Help',
    signOut: 'Sign out',
    
    // Hero
    heroTitle: 'Holiday-ready in a click.',
    heroSubtitle: 'From beach essentials to mobility aids, rent everything you need for the perfect holiday experience.',
    browseItems: 'Browse items',
    
    // Filter Bar
    deliveryDate: 'Delivery date',
    weeks: 'Weeks',
    collection: 'Collection',
    pricePerWeek: 'Price / week',
    
    // Product
    addToCart: 'Add to cart',
    rentalDates: 'Rental dates',
    perfectForHoliday: 'Perfect for your holiday',
    highQuality: '• High-quality equipment',
    flexiblePricing: '• Flexible weekly pricing',
    easyDelivery: '• Easy delivery & collection',
    fullyCleaned: '• Fully cleaned & sanitized',
    selectDeliveryDate: 'Please select a delivery date',
    cancel: 'Cancel',
    
    // Categories
    beach: 'Beach',
    sports: 'Sports',
    baby: 'Baby',
    mobility: 'Mobility',
    
    // Cart
    cart: 'Cart',
    cartEmpty: 'Your cart is empty',
    addItemsToStart: 'Add some items to get started',
    subtotal: 'Subtotal',
    checkout: 'Checkout',
    perWeek: 'per week',
    
    // Footer
    footerDescription: 'Holiday-ready in a click. Rent everything you need for the perfect holiday experience.',
    browseCategories: 'Browse',
    support: 'Support',
    helpCenter: 'Help Center',
    contactSupport: 'Contact Support',
    contact: 'Contact',
    allRightsReserved: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    
    // Common
    availableItems: 'Available Items',
    itemsFound: 'items found',
    noItemsFound: 'No items found matching your criteria.',
    tryAdjustingFilters: 'Try adjusting your filters.',
    continueBrowsing: 'Continue browsing',
    backToHome: 'Back to home',
  },
  es: {
    // Header & Navigation
    browse: 'Explorar',
    howItWorks: 'Cómo funciona',
    menu: 'Menú',
    inbox: 'Bandeja',
    myProfile: 'Mi Perfil',
    help: 'Ayuda',
    signOut: 'Cerrar sesión',
    
    // Hero
    heroTitle: 'Alquila Equipo de Vacaciones en un clic',
    heroSubtitle: 'Tablas de Paddle, Bicicletas, Sillas de Playa y Sombrillas, Cañas de Pescar, E-Scooters, Tiendas de Playa para Niños, Bañeras para Bebés, Sillas para Bebés y mucho más. Alquila todo lo que necesitas para la experiencia de vacaciones perfecta.',
    browseItems: 'Explorar artículos',
    
    // Filter Bar
    deliveryDate: 'Fecha de entrega',
    weeks: 'Semanas',
    collection: 'Recogida',
    pricePerWeek: 'Precio / semana',
    
    // Product
    addToCart: 'Añadir al carrito',
    rentalDates: 'Fechas de alquiler',
    perfectForHoliday: 'Perfecto para tus vacaciones',
    highQuality: '• Equipamiento de alta calidad',
    flexiblePricing: '• Precios semanales flexibles',
    easyDelivery: '• Entrega y recogida fácil',
    fullyCleaned: '• Completamente limpio y desinfectado',
    selectDeliveryDate: 'Por favor selecciona una fecha de entrega',
    cancel: 'Cancelar',
    
    // Categories
    beach: 'Playa',
    sports: 'Deportes',
    baby: 'Bebé',
    mobility: 'Movilidad',
    
    // Cart
    cart: 'Carrito',
    cartEmpty: 'Tu carrito está vacío',
    addItemsToStart: 'Añade algunos artículos para empezar',
    subtotal: 'Subtotal',
    checkout: 'Finalizar compra',
    perWeek: 'por semana',
    
    // Footer
    footerDescription: 'Listo para vacaciones en un clic. Alquila todo lo que necesitas para la experiencia de vacaciones perfecta.',
    browseCategories: 'Explorar',
    support: 'Soporte',
    helpCenter: 'Centro de Ayuda',
    contactSupport: 'Contactar Soporte',
    contact: 'Contacto',
    allRightsReserved: 'Todos los derechos reservados.',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    cookiePolicy: 'Política de Cookies',
    
    // Common
    availableItems: 'Artículos Disponibles',
    itemsFound: 'artículos encontrados',
    noItemsFound: 'No se encontraron artículos que coincidan con tus criterios.',
    tryAdjustingFilters: 'Intenta ajustar tus filtros.',
    continueBrowsing: 'Continuar explorando',
    backToHome: 'Volver al inicio',
  },
  fr: {
    // Header & Navigation
    browse: 'Parcourir',
    howItWorks: 'Comment ça marche',
    menu: 'Menu',
    inbox: 'Boîte de réception',
    myProfile: 'Mon Profil',
    help: 'Aide',
    signOut: 'Se déconnecter',
    
    // Hero
    heroTitle: 'Louez du Matériel de Vacances en un clic',
    heroSubtitle: 'Planches de Paddle, Vélos, Chaises de Plage et Parasols, Cannes à Pêche, E-Scooters, Tentes de Plage pour Enfants, Baignoires pour Bébés, Chaises pour Bébés et bien plus. Louez tout ce dont vous avez besoin pour une expérience de vacances parfaite.',
    browseItems: 'Parcourir les articles',
    
    // Filter Bar
    deliveryDate: 'Date de livraison',
    weeks: 'Semaines',
    collection: 'Collecte',
    pricePerWeek: 'Prix / semaine',
    
    // Product
    addToCart: 'Ajouter au panier',
    rentalDates: 'Dates de location',
    perfectForHoliday: 'Parfait pour vos vacances',
    highQuality: '• Équipement de haute qualité',
    flexiblePricing: '• Prix hebdomadaires flexibles',
    easyDelivery: '• Livraison et collecte faciles',
    fullyCleaned: '• Entièrement nettoyé et désinfecté',
    selectDeliveryDate: 'Veuillez sélectionner une date de livraison',
    cancel: 'Annuler',
    
    // Categories
    beach: 'Plage',
    sports: 'Sports',
    baby: 'Bébé',
    mobility: 'Mobilité',
    
    // Cart
    cart: 'Panier',
    cartEmpty: 'Votre panier est vide',
    addItemsToStart: 'Ajoutez quelques articles pour commencer',
    subtotal: 'Sous-total',
    checkout: 'Commander',
    perWeek: 'par semaine',
    
    // Footer
    footerDescription: 'Prêt pour les vacances en un clic. Louez tout ce dont vous avez besoin pour une expérience de vacances parfaite.',
    browseCategories: 'Parcourir',
    support: 'Support',
    helpCenter: 'Centre d\'aide',
    contactSupport: 'Contacter le support',
    contact: 'Contact',
    allRightsReserved: 'Tous droits réservés.',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions d\'utilisation',
    cookiePolicy: 'Politique des cookies',
    
    // Common
    availableItems: 'Articles disponibles',
    itemsFound: 'articles trouvés',
    noItemsFound: 'Aucun article trouvé correspondant à vos critères.',
    tryAdjustingFilters: 'Essayez d\'ajuster vos filtres.',
    continueBrowsing: 'Continuer à parcourir',
    backToHome: 'Retour à l\'accueil',
  },
  nl: {
    // Header & Navigation
    browse: 'Bladeren',
    howItWorks: 'Hoe het werkt',
    menu: 'Menu',
    inbox: 'Inbox',
    myProfile: 'Mijn Profiel',
    help: 'Hulp',
    signOut: 'Uitloggen',
    
    // Hero
    heroTitle: 'Huur Vakantie Uitrusting met één klik',
    heroSubtitle: 'Paddle Boards, Fietsen, Strandstoelen en Parasols, Hengels, E-Scooters, Strandtenten voor Kinderen, Babybadjes, Babystoelen en nog veel meer. Huur alles wat je nodig hebt voor de perfecte vakantie-ervaring.',
    browseItems: 'Artikelen bekijken',
    
    // Filter Bar
    deliveryDate: 'Bezorgdatum',
    weeks: 'Weken',
    collection: 'Ophalen',
    pricePerWeek: 'Prijs / week',
    
    // Product
    addToCart: 'Toevoegen aan winkelwagen',
    rentalDates: 'Huurdatums',
    perfectForHoliday: 'Perfect voor je vakantie',
    highQuality: '• Hoogwaardige uitrusting',
    flexiblePricing: '• Flexibele wekelijkse prijzen',
    easyDelivery: '• Gemakkelijke bezorging en ophalen',
    fullyCleaned: '• Volledig gereinigd en gedesinfecteerd',
    selectDeliveryDate: 'Selecteer een bezorgdatum',
    cancel: 'Annuleren',
    
    // Categories
    beach: 'Strand',
    sports: 'Sport',
    baby: 'Baby',
    mobility: 'Mobiliteit',
    
    // Cart
    cart: 'Winkelwagen',
    cartEmpty: 'Je winkelwagen is leeg',
    addItemsToStart: 'Voeg enkele artikelen toe om te beginnen',
    subtotal: 'Subtotaal',
    checkout: 'Afrekenen',
    perWeek: 'per week',
    
    // Footer
    footerDescription: 'Vakantie-klaar met één klik. Huur alles wat je nodig hebt voor de perfecte vakantie-ervaring.',
    browseCategories: 'Bladeren',
    support: 'Ondersteuning',
    helpCenter: 'Helpcentrum',
    contactSupport: 'Contact opnemen met ondersteuning',
    contact: 'Contact',
    allRightsReserved: 'Alle rechten voorbehouden.',
    privacyPolicy: 'Privacybeleid',
    termsOfService: 'Servicevoorwaarden',
    cookiePolicy: 'Cookiebeleid',
    
    // Common
    availableItems: 'Beschikbare artikelen',
    itemsFound: 'artikelen gevonden',
    noItemsFound: 'Geen artikelen gevonden die voldoen aan je criteria.',
    tryAdjustingFilters: 'Probeer je filters aan te passen.',
    continueBrowsing: 'Doorgaan met bladeren',
    backToHome: 'Terug naar home',
  }
};

export const getTranslation = (key: keyof Translations, language: Language): string => {
  return translations[language][key] || translations.en[key];
};