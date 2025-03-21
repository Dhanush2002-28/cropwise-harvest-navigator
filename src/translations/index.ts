
export type Language = 'en' | 'hi' | 'kn' | 'es' | 'fr';

interface Translations {
  [language: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Intelligent Farming Solutions',
    'hero.subtitle': 'Get personalized crop recommendations based on your location',
    'hero.cta': 'Get Started',
    
    // Location
    'location.title': 'Your Location',
    'location.detecting': 'Detecting location...',
    'location.city': 'City',
    'location.region': 'Region',
    'location.country': 'Country',
    'location.coordinates': 'Coordinates',
    'location.refresh': 'Refresh Location',
    'location.detect': 'Detect My Location',
    'location.error': 'Failed to get location',
    'location.try_again': 'Try Again',
    
    // Crop Form
    'crops.title': 'Crops You\'re Interested In',
    'crops.input': 'Enter crops you\'re interested in growing',
    'crops.placeholder': 'E.g. Rice, Wheat, Corn (comma separated)',
    'crops.submit': 'Get Recommendations',
    
    // Recommendations
    'recommendations.title': 'Recommended Crops',
    'recommendations.based_on': 'Based on your location',
    'recommendations.best_match': 'Best Match',
    'recommendations.water': 'Water',
    'recommendations.temperature': 'Temperature',
    'recommendations.growth': 'Growth',
    'recommendations.waiting': 'Awaiting Your Preferences',
    'recommendations.fill_form': 'Share your location and crop interests to get personalized recommendations.',
    'recommendations.no_results': 'No crop recommendations available for your location. Please try a different location.',
    
    // Features
    'features.title': 'Why Choose AgriVision',
    'features.subtitle': 'Our platform combines cutting-edge technology with agricultural expertise to help farmers make smarter decisions.',
    'features.precision.title': 'Precision Agriculture',
    'features.precision.desc': 'Get recommendations tailored to your specific location and environmental conditions.',
    'features.optimization.title': 'Crop Optimization',
    'features.optimization.desc': 'Maximize yields and minimize resource usage with intelligent crop selection.',
    'features.easy.title': 'Easy to Use',
    'features.easy.desc': 'Simple interface that provides powerful insights without the complexity.',
    
    // Footer
    'footer.quick_links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    
    // Language
    'language': 'Language',
    'language.en': 'English',
    'language.hi': 'हिंदी (Hindi)',
    'language.kn': 'ಕನ್ನಡ (Kannada)',
    'language.es': 'Español (Spanish)',
    'language.fr': 'Français (French)',
  },
  
  hi: {
    // Navbar
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क करें',
    
    // Hero
    'hero.title': 'बुद्धिमान कृषि समाधान',
    'hero.subtitle': 'अपने स्थान के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें',
    'hero.cta': 'शुरू करें',
    
    // Location
    'location.title': 'आपका स्थान',
    'location.detecting': 'स्थान का पता लगा रहा है...',
    'location.city': 'शहर',
    'location.region': 'क्षेत्र',
    'location.country': 'देश',
    'location.coordinates': 'निर्देशांक',
    'location.refresh': 'स्थान रीफ्रेश करें',
    'location.detect': 'मेरा स्थान पता करें',
    'location.error': 'स्थान प्राप्त करने में विफल',
    'location.try_again': 'पुनः प्रयास करें',
    
    // Crop Form
    'crops.title': 'आपकी रुचि वाली फसलें',
    'crops.input': 'उन फसलों को दर्ज करें जिन्हें आप उगाने में रुचि रखते हैं',
    'crops.placeholder': 'जैसे चावल, गेहूं, मक्का (अल्पविराम से अलग)',
    'crops.submit': 'अनुशंसाएँ प्राप्त करें',
    
    // Recommendations
    'recommendations.title': 'अनुशंसित फसलें',
    'recommendations.based_on': 'आपके स्थान के आधार पर',
    'recommendations.best_match': 'सबसे अच्छा मिलान',
    'recommendations.water': 'पानी',
    'recommendations.temperature': 'तापमान',
    'recommendations.growth': 'विकास',
    'recommendations.waiting': 'आपकी प्राथमिकताओं की प्रतीक्षा',
    'recommendations.fill_form': 'व्यक्तिगत फसल अनुशंसाएँ प्राप्त करने के लिए अपना स्थान और फसल रुचियाँ साझा करें।',
    'recommendations.no_results': 'आपके स्थान के लिए कोई फसल अनुशंसा उपलब्ध नहीं है। कृपया किसी अन्य स्थान का प्रयास करें।',
    
    // Features
    'features.title': 'एग्रीविज़न क्यों चुनें',
    'features.subtitle': 'हमारा प्लेटफ़ॉर्म किसानों को स्मार्ट निर्णय लेने में मदद करने के लिए अत्याधुनिक तकनीक को कृषि विशेषज्ञता के साथ जोड़ता है।',
    'features.precision.title': 'सटीक कृषि',
    'features.precision.desc': 'अपने विशिष्ट स्थान और पर्यावरणीय स्थितियों के अनुरूप अनुशंसाएँ प्राप्त करें।',
    'features.optimization.title': 'फसल अनुकूलन',
    'features.optimization.desc': 'बुद्धिमान फसल चयन के साथ उपज को अधिकतम करें और संसाधन उपयोग को कम करें।',
    'features.easy.title': 'उपयोग में आसान',
    'features.easy.desc': 'सरल इंटरफेस जो जटिलता के बिना शक्तिशाली अंतर्दृष्टि प्रदान करता है।',
    
    // Footer
    'footer.quick_links': 'त्वरित लिंक',
    'footer.contact': 'संपर्क करें',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
    
    // Language
    'language': 'भाषा',
    'language.en': 'English',
    'language.hi': 'हिंदी',
    'language.kn': 'ಕನ್ನಡ',
    'language.es': 'Español',
    'language.fr': 'Français',
  },
  
  kn: {
    // Navbar
    'nav.home': 'ಮುಖಪುಟ',
    'nav.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
    'nav.contact': 'ಸಂಪರ್ಕಿಸಿ',
    
    // Hero
    'hero.title': 'ಬುದ್ಧಿವಂತ ಕೃಷಿ ಪರಿಹಾರಗಳು',
    'hero.subtitle': 'ನಿಮ್ಮ ಸ್ಥಳದ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ',
    'hero.cta': 'ಪ್ರಾರಂಭಿಸಿ',
    
    // Location
    'location.title': 'ನಿಮ್ಮ ಸ್ಥಳ',
    'location.detecting': 'ಸ್ಥಳ ಪತ್ತೆ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    'location.city': 'ನಗರ',
    'location.region': 'ಪ್ರದೇಶ',
    'location.country': 'ದೇಶ',
    'location.coordinates': 'ನಿರ್ದೇಶಾಂಕಗಳು',
    'location.refresh': 'ಸ್ಥಳ ರಿಫ್ರೆಶ್ ಮಾಡಿ',
    'location.detect': 'ನನ್ನ ಸ್ಥಳವನ್ನು ಪತ್ತೆ ಮಾಡಿ',
    'location.error': 'ಸ್ಥಳ ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ',
    'location.try_again': 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    
    // Crop Form
    'crops.title': 'ನೀವು ಆಸಕ್ತಿ ಹೊಂದಿರುವ ಬೆಳೆಗಳು',
    'crops.input': 'ನೀವು ಬೆಳೆಯಲು ಆಸಕ್ತಿ ಹೊಂದಿರುವ ಬೆಳೆಗಳನ್ನು ನಮೂದಿಸಿ',
    'crops.placeholder': 'ಉದಾ. ಅಕ್ಕಿ, ಗೋಧಿ, ಜೋಳ (ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಲಾಗಿದೆ)',
    'crops.submit': 'ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ',
    
    // Recommendations
    'recommendations.title': 'ಶಿಫಾರಸು ಮಾಡಲಾದ ಬೆಳೆಗಳು',
    'recommendations.based_on': 'ನಿಮ್ಮ ಸ್ಥಳದ ಆಧಾರದ ಮೇಲೆ',
    'recommendations.best_match': 'ಅತ್ಯುತ್ತಮ ಹೊಂದಾಣಿಕೆ',
    'recommendations.water': 'ನೀರು',
    'recommendations.temperature': 'ತಾಪಮಾನ',
    'recommendations.growth': 'ಬೆಳವಣಿಗೆ',
    'recommendations.waiting': 'ನಿಮ್ಮ ಆದ್ಯತೆಗಳಿಗಾಗಿ ಕಾಯುತ್ತಿದೆ',
    'recommendations.fill_form': 'ವೈಯಕ್ತಿಕ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ಬೆಳೆ ಆಸಕ್ತಿಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.',
    'recommendations.no_results': 'ನಿಮ್ಮ ಸ್ಥಳಕ್ಕೆ ಯಾವುದೇ ಬೆಳೆ ಶಿಫಾರಸುಗಳು ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ಸ್ಥಳವನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
    
    // Features
    'features.title': 'ಏಕೆ ಅಗ್ರಿವಿಷನ್ ಆಯ್ಕೆ ಮಾಡಬೇಕು',
    'features.subtitle': 'ನಮ್ಮ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ರೈತರಿಗೆ ಸ್ಮಾರ್ಟ್ ನಿರ್ಣಯಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಲು ಅತ್ಯಾಧುನಿಕ ತಂತ್ರಜ್ಞಾನವನ್ನು ಕೃಷಿ ತಜ್ಞತೆಯೊಂದಿಗೆ ಸಂಯೋಜಿಸುತ್ತದೆ.',
    'features.precision.title': 'ನಿಖರ ಕೃಷಿ',
    'features.precision.desc': 'ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಸ್ಥಳ ಮತ್ತು ಪರಿಸರ ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಹೊಂದಿಕೊಂಡಂತೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.',
    'features.optimization.title': 'ಬೆಳೆ ಆಪ್ಟಿಮೈಸೇಶನ್',
    'features.optimization.desc': 'ಬುದ್ಧಿವಂತ ಬೆಳೆ ಆಯ್ಕೆಯೊಂದಿಗೆ ಇಳುವರಿಯನ್ನು ಗರಿಷ್ಠಗೊಳಿಸಿ ಮತ್ತು ಸಂಪನ್ಮೂಲ ಬಳಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ.',
    'features.easy.title': 'ಬಳಸಲು ಸುಲಭ',
    'features.easy.desc': 'ಸರಳ ಇಂಟರ್ಫೇಸ್ ಸಂಕೀರ್ಣತೆಯಿಲ್ಲದೆ ಶಕ್ತಿಯುತ ಒಳನೋಟಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',
    
    // Footer
    'footer.quick_links': 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    'footer.contact': 'ಸಂಪರ್ಕಿಸಿ',
    'footer.rights': 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    
    // Language
    'language': 'ಭಾಷೆ',
    'language.en': 'English',
    'language.hi': 'हिंदी',
    'language.kn': 'ಕನ್ನಡ',
    'language.es': 'Español',
    'language.fr': 'Français',
  },
  
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.title': 'Soluciones Agrícolas Inteligentes',
    'hero.subtitle': 'Obtenga recomendaciones personalizadas de cultivos basadas en su ubicación',
    'hero.cta': 'Comenzar',
    
    // Location
    'location.title': 'Su Ubicación',
    'location.detecting': 'Detectando ubicación...',
    'location.city': 'Ciudad',
    'location.region': 'Región',
    'location.country': 'País',
    'location.coordinates': 'Coordenadas',
    'location.refresh': 'Actualizar Ubicación',
    'location.detect': 'Detectar Mi Ubicación',
    'location.error': 'Error al obtener la ubicación',
    'location.try_again': 'Intentar de nuevo',
    
    // Crop Form
    'crops.title': 'Cultivos que le Interesan',
    'crops.input': 'Ingrese cultivos que le interesa cultivar',
    'crops.placeholder': 'Ej. Arroz, Trigo, Maíz (separados por comas)',
    'crops.submit': 'Obtener Recomendaciones',
    
    // Recommendations
    'recommendations.title': 'Cultivos Recomendados',
    'recommendations.based_on': 'Basado en su ubicación',
    'recommendations.best_match': 'Mejor Opción',
    'recommendations.water': 'Agua',
    'recommendations.temperature': 'Temperatura',
    'recommendations.growth': 'Crecimiento',
    'recommendations.waiting': 'Esperando sus Preferencias',
    'recommendations.fill_form': 'Comparta su ubicación e intereses de cultivo para obtener recomendaciones personalizadas.',
    'recommendations.no_results': 'No hay recomendaciones de cultivos disponibles para su ubicación. Por favor, intente con una ubicación diferente.',
    
    // Features
    'features.title': 'Por qué Elegir AgriVision',
    'features.subtitle': 'Nuestra plataforma combina tecnología de vanguardia con experiencia agrícola para ayudar a los agricultores a tomar decisiones más inteligentes.',
    'features.precision.title': 'Agricultura de Precisión',
    'features.precision.desc': 'Obtenga recomendaciones adaptadas a su ubicación específica y condiciones ambientales.',
    'features.optimization.title': 'Optimización de Cultivos',
    'features.optimization.desc': 'Maximice el rendimiento y minimice el uso de recursos con la selección inteligente de cultivos.',
    'features.easy.title': 'Fácil de Usar',
    'features.easy.desc': 'Interfaz simple que proporciona información poderosa sin la complejidad.',
    
    // Footer
    'footer.quick_links': 'Enlaces Rápidos',
    'footer.contact': 'Contacto',
    'footer.rights': 'Todos los derechos reservados.',
    
    // Language
    'language': 'Idioma',
    'language.en': 'English',
    'language.hi': 'हिंदी',
    'language.kn': 'ಕನ್ನಡ',
    'language.es': 'Español',
    'language.fr': 'Français',
  },
  
  fr: {
    // Navbar
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Solutions Agricoles Intelligentes',
    'hero.subtitle': 'Obtenez des recommandations de cultures personnalisées basées sur votre emplacement',
    'hero.cta': 'Commencer',
    
    // Location
    'location.title': 'Votre Emplacement',
    'location.detecting': 'Détection de l\'emplacement...',
    'location.city': 'Ville',
    'location.region': 'Région',
    'location.country': 'Pays',
    'location.coordinates': 'Coordonnées',
    'location.refresh': 'Actualiser l\'Emplacement',
    'location.detect': 'Détecter Mon Emplacement',
    'location.error': 'Échec de l\'obtention de l\'emplacement',
    'location.try_again': 'Réessayer',
    
    // Crop Form
    'crops.title': 'Cultures qui vous Intéressent',
    'crops.input': 'Entrez les cultures qui vous intéressent',
    'crops.placeholder': 'Ex. Riz, Blé, Maïs (séparés par des virgules)',
    'crops.submit': 'Obtenir des Recommandations',
    
    // Recommendations
    'recommendations.title': 'Cultures Recommandées',
    'recommendations.based_on': 'Basé sur votre emplacement',
    'recommendations.best_match': 'Meilleure Correspondance',
    'recommendations.water': 'Eau',
    'recommendations.temperature': 'Température',
    'recommendations.growth': 'Croissance',
    'recommendations.waiting': 'En Attente de vos Préférences',
    'recommendations.fill_form': 'Partagez votre emplacement et vos intérêts de culture pour obtenir des recommandations personnalisées.',
    'recommendations.no_results': 'Aucune recommandation de culture disponible pour votre emplacement. Veuillez essayer un emplacement différent.',
    
    // Features
    'features.title': 'Pourquoi Choisir AgriVision',
    'features.subtitle': 'Notre plateforme combine technologie de pointe et expertise agricole pour aider les agriculteurs à prendre des décisions plus intelligentes.',
    'features.precision.title': 'Agriculture de Précision',
    'features.precision.desc': 'Obtenez des recommandations adaptées à votre emplacement spécifique et à vos conditions environnementales.',
    'features.optimization.title': 'Optimisation des Cultures',
    'features.optimization.desc': 'Maximisez les rendements et minimisez l\'utilisation des ressources grâce à une sélection intelligente des cultures.',
    'features.easy.title': 'Facile à Utiliser',
    'features.easy.desc': 'Interface simple qui fournit des informations puissantes sans la complexité.',
    
    // Footer
    'footer.quick_links': 'Liens Rapides',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    
    // Language
    'language': 'Langue',
    'language.en': 'English',
    'language.hi': 'हिंदी',
    'language.kn': 'ಕನ್ನಡ',
    'language.es': 'Español',
    'language.fr': 'Français',
  },
};
