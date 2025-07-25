export type Language = 'en' | 'hi' | 'kn' | 'ta' | 'bn';

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
    'location.title': 'Location',
    'location.pincode': 'Pincode',
    'location.area': 'Area',
    'location.detecting': 'Detecting location...',
    'location.city': 'City',
    'location.region': 'Region',
    'location.country': 'Country',
    'location.coordinates': 'Coordinates',
    'location.refresh': 'Refresh Location',
    'location.detect': 'Detect My Location',
    'location.error': 'Failed to get location',
    'location.try_again': 'Try Again',
    'location.enter_pincode_manually': 'Enter Pincode Manually',
    'location.detection_failed': 'Location Detection Failed',
    'location.get_recommendations': 'Get Recommendations',
    'location.cancel': 'Cancel',
    'location.six_digit_pincode': '6-Digit Pincode',
    'location.examples': 'Examples: 560001 (Bengaluru), 400001 (Mumbai), 110001 (Delhi)',

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

    // Add missing keys for RecommendationCard
    'recommendations.current_info': 'Current Information',
    'recommendations.ai_tips': 'AI Recommendations & Growing Tips',
    'recommendations.rank': 'Rank',
    'recommendations.growing_tips': 'Growing Tips',
    'recommendations.based_on_pincode': 'Based on pincode',
    'recommendations.waiting_location': 'Waiting for location data...',
    'recommendations.fetching_for': 'Fetching recommendations for',

    // Soil related
    'soil.npk_values': 'Soil NPK Values',
    'soil.from_database': 'from soil database',
    'soil.manual_input': 'manual input',
    'soil.nitrogen': 'Nitrogen',
    'soil.phosphorus': 'Phosphorus',
    'soil.potassium': 'Potassium',
    'soil.ph': 'pH',

    // Weather related
    'weather.temperature': 'Temperature',
    'weather.rainfall': 'Rainfall',
    'weather.year': 'Year',

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
    'language.ta': 'தமிழ் (Tamil)',
    'language.bn': 'বাংলা (Bengali)',
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
    'location.title': 'स्थान',
    'location.pincode': 'पिनकोड',
    'location.area': 'क्षेत्र',
    'location.detecting': 'स्थान का पता लगाया जा रहा है...',
    'location.city': 'शहर',
    'location.region': 'क्षेत्र',
    'location.country': 'देश',
    'location.coordinates': 'निर्देशांक',
    'location.refresh': 'स्थान रीफ्रेश करें',
    'location.detect': 'मेरा स्थान पता करें',
    'location.error': 'स्थान प्राप्त करने में विफल',
    'location.try_again': 'पुनः प्रयास करें',
    'location.enter_pincode_manually': 'पिनकोड मैन्युअल रूप से दर्ज करें',
    'location.detection_failed': 'स्थान पहचानने में विफल',
    'location.get_recommendations': 'सिफारिशें प्राप्त करें',
    'location.cancel': 'रद्द करें',
    'location.six_digit_pincode': '6-अंकीय पिनकोड',
    'location.examples': 'उदाहरण: 560001 (बेंगलुरु), 400001 (मुंबई), 110001 (दिल्ली)',

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

    // Add Hindi translations
    'recommendations.current_info': 'वर्तमान जानकारी',
    'recommendations.ai_tips': 'AI सिफारिशें और बढ़ने की युक्तियां',
    'recommendations.rank': 'रैंक',
    'recommendations.growing_tips': 'बढ़ने की युक्तियां',
    'recommendations.based_on_pincode': 'पिनकोड के आधार पर',
    'recommendations.waiting_location': 'स्थान डेटा की प्रतीक्षा में...',
    'recommendations.fetching_for': 'के लिए सिफारिशें प्राप्त कर रहे हैं',

    // Soil related
    'soil.npk_values': 'मिट्टी NPK मान',
    'soil.from_database': 'मिट्टी डेटाबेस से',
    'soil.manual_input': 'मैनुअल इनपुट',
    'soil.nitrogen': 'नाइट्रोजन',
    'soil.phosphorus': 'फास्फोरस',
    'soil.potassium': 'पोटेशियम',
    'soil.ph': 'पीएच',

    // Weather related
    'weather.temperature': 'तापमान',
    'weather.rainfall': 'वर्षा',
    'weather.year': 'वर्ष',

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
    'language.ta': 'தமிழ்',
    'language.bn': 'বাংলা',
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
    'location.title': 'ಸ್ಥಳ',
    'location.pincode': 'ಪಿನ್‌ಕೋಡ್',
    'location.area': 'ಪ್ರದೇಶ',
    'location.detecting': 'ಸ್ಥಳವನ್ನು ಕಂಡುಹಿಡಿಯುತ್ತಿದೆ...',
    'location.city': 'ನಗರ',
    'location.region': 'ಪ್ರದೇಶ',
    'location.country': 'ದೇಶ',
    'location.coordinates': 'ನಿರ್ದೇಶಾಂಕಗಳು',
    'location.refresh': 'ಸ್ಥಳ ರಿಫ್ರೆಶ್ ಮಾಡಿ',
    'location.detect': 'ನನ್ನ ಸ್ಥಳವನ್ನು ಪತ್ತೆ ಮಾಡಿ',
    'location.error': 'ಸ್ಥಳ ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ',
    'location.try_again': 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    'location.enter_pincode_manually': 'ಪಿನ್‌ಕೋಡ್ ಕೈಯಿಂದ ನಮೂದಿಸಿ',
    'location.detection_failed': 'ಸ್ಥಾನ ಪತ್ತೆಹಚ್ಚಲು ವಿಫಲ',
    'location.get_recommendations': 'ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ',
    'location.cancel': 'ರದ್ದು ಮಾಡಿ',
    'location.six_digit_pincode': '6-ಅಂಕಿ ಪಿನ್‌ಕೋಡ್',
    'location.examples': 'ಉದಾಹರಣೆಗಳು: 560001 (ಬೆಂಗಲೂರು), 400001 (ಮುಂಬೈ), 110001 (ದಿಲ್ಲಿ)',

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

    // Add Kannada translations
    'recommendations.current_info': 'ಪ್ರಸ್ತುತ ಮಾಹಿತಿ',
    'recommendations.ai_tips': 'AI ಶಿಫಾರಸುಗಳು ಮತ್ತು ಬೆಳೆಯುವ ಸಲಹೆಗಳು',
    'recommendations.rank': 'ಶ್ರೇಣಿ',
    'recommendations.growing_tips': 'ಬೆಳೆಯುವ ಸಲಹೆಗಳು',
    'recommendations.based_on_pincode': 'ಪಿನ್‌ಕೋಡ್ ಆಧಾರದ ಮೇಲೆ',
    'recommendations.waiting_location': 'ಸ್ಥಳ ಡೇಟಾಕ್ಕಾಗಿ ಕಾಯುತ್ತಿದೆ...',
    'recommendations.fetching_for': 'ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯುತ್ತಿದೆ',

    // Soil related
    'soil.npk_values': 'ಮಣ್ಣಿನ NPK ಮೌಲ್ಯಗಳು',
    'soil.from_database': 'ಮಣ್ಣಿನ ಡೇಟಾಬೇಸ್‌ನಿಂದ',
    'soil.manual_input': 'ಕೈಯಿಂದ ಇನ್‌ಪುಟ್',
    'soil.nitrogen': 'ಸಾರಜನಕ',
    'soil.phosphorus': 'ರಂಜಕ',
    'soil.potassium': 'ಪೊಟ್ಯಾಸಿಯಮ್',
    'soil.ph': 'ಪಿಎಚ್',

    // Weather related
    'weather.temperature': 'ತಾಪಮಾನ',
    'weather.rainfall': 'ಮಳೆ',
    'weather.year': 'ವರ್ಷ',

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
    'language.ta': 'தமிழ்',
    'language.bn': 'বাংলা',
  },

  ta: {
    // Navbar
    'nav.home': 'முகப்பு',
    'nav.about': 'எங்களை பற்றி',
    'nav.contact': 'தொடர்பு',

    // Hero
    'hero.title': 'புத்திசாலித்தனமான விவசாய தீர்வுகள்',
    'hero.subtitle': 'உங்கள் இருப்பிடத்தை அடிப்படையாகக் கொண்ட தனிப்பயனாக்கப்பட்ட பயிர் பரிந்துரைகளைப் பெறுங்கள்',
    'hero.cta': 'தொடங்குக',

    // Location
    'location.title': 'இருப்பிடம்',
    'location.pincode': 'பின்கோடு',
    'location.area': 'பகுதி',
    'location.detecting': 'இருப்பிடத்தைக் கண்டறிகிறது...',
    'location.city': 'நகரம்',
    'location.region': 'பகுதி',
    'location.country': 'நாடு',
    'location.coordinates': 'ஒருங்கிணைப்புகள்',
    'location.refresh': 'இருப்பிடத்தை புதுப்பிக்கவும்',
    'location.detect': 'எனது இருப்பிடத்தைக் கண்டறியவும்',
    'location.error': 'இருப்பிடத்தைப் பெற முடியவில்லை',
    'location.try_again': 'மீண்டும் முயற்சிக்கவும்',
    'location.enter_pincode_manually': 'பின்கோடு கையொப்பமாக உள்ளிடவும்',
    'location.detection_failed': 'இருப்பிடம் கண்டறிய முடியவில்லை',
    'location.get_recommendations': 'பரிந்துரைகளைப் பெறுக',
    'location.cancel': 'ரத்து செய்',
    'location.six_digit_pincode': '6-எண் பின்கோடு',
    'location.examples': 'எடுத்துக்காட்டுகள்: 560001 (பெங்களூரு), 400001 (மும்பை), 110001 (டெல்லி)',

    // Crop Form
    'crops.title': 'நீங்கள் விரும்பும் பயிர்கள்',
    'crops.input': 'நீங்கள் வளர்க்க விரும்பும் பயிர்களை உள்ளிடவும்',
    'crops.placeholder': 'எ.கா. அரிசி, கோதுமை, சோளம் (காற்புள்ளியால் பிரிக்கப்பட்டது)',
    'crops.submit': 'பரிந்துரைகளைப் பெறுக',

    // Recommendations
    'recommendations.title': 'பரிந்துரைக்கப்பட்ட பயிர்கள்',
    'recommendations.based_on': 'உங்கள் இருப்பிடத்தின் அடிப்படையில்',
    'recommendations.best_match': 'சிறந்த பொருத்தம்',
    'recommendations.water': 'நீர்',
    'recommendations.temperature': 'வெப்பநிலை',
    'recommendations.growth': 'வளர்ச்சி',
    'recommendations.waiting': 'உங்கள் விருப்பங்களுக்காக காத்திருக்கிறது',
    'recommendations.fill_form': 'தனிப்பயனாக்கப்பட்ட பயிர் பரிந்துரைகளைப் பெற உங்கள் இருப்பிடம் மற்றும் பயிர் ஆர்வங்களைப் பகிர்ந்து கொள்ளுங்கள்.',
    'recommendations.no_results': 'உங்கள் இருப்பிடத்திற்கு பயிர் பரிந்துரைகள் எதுவும் இல்லை. தயவுசெய்து வேறு இருப்பிடத்தை முயற்சிக்கவும்.',

    // Add Tamil translations
    'recommendations.current_info': 'தற்போதைய தகவல்',
    'recommendations.ai_tips': 'AI பரிந்துரைகள் மற்றும் வளர்க்கும் குறிப்புகள்',
    'recommendations.rank': 'தரவரிசை',
    'recommendations.growing_tips': 'வளர்க்கும் குறிப்புகள்',
    'recommendations.based_on_pincode': 'பின்கோடு அடிப்படையில்',
    'recommendations.waiting_location': 'இருப்பிட தரவுக்காக காத்திருக்கிறது...',
    'recommendations.fetching_for': 'பரிந்துரைகளைப் பெறுகிறது',

    // Soil related
    'soil.npk_values': 'மண் NPK மதிப்புகள்',
    'soil.from_database': 'மண் தரவுத்தளத்திலிருந்து',
    'soil.manual_input': 'கையேடு உள்ளீடு',
    'soil.nitrogen': 'நைட்ரஜன்',
    'soil.phosphorus': 'பாஸ்பரஸ்',
    'soil.potassium': 'பொட்டாசியம்',
    'soil.ph': 'பிஹெச்',

    // Weather related
    'weather.temperature': 'வெப்பநிலை',
    'weather.rainfall': 'மழைப்பொழிவு',
    'weather.year': 'ஆண்டு',

    // Features
    'features.title': 'ஏன் AgriVision ஐத் தேர்ந்தெடுக்க வேண்டும்',
    'features.subtitle': 'எங்கள் தளம் விவசாயிகள் சிறந்த முடிவுகளை எடுக்க உதவ நவீன தொழில்நுட்பத்தை விவசாய நிபுணத்துவத்துடன் இணைக்கிறது.',
    'features.precision.title': 'துல்லியமான விவசாயம்',
    'features.precision.desc': 'உங்கள் குறிப்பிட்ட இருப்பிடம் மற்றும் சுற்றுச்சூழல் நிலைமைகளுக்கு ஏற்ப பரிந்துரைகளைப் பெறுங்கள்.',
    'features.optimization.title': 'பயிர் தேர்வு மேம்படுத்தல்',
    'features.optimization.desc': 'புத்திசாலித்தனமான பயிர் தேர்வுடன் மகசூலை அதிகரிக்கவும் மற்றும் வள பயன்பாட்டைக் குறைக்கவும்.',
    'features.easy.title': 'பயன்படுத்த எளிதானது',
    'features.easy.desc': 'சிக்கல் இல்லாமல் சக்திவாய்ந்த நுண்ணறிவுகளை வழங்கும் எளிய இடைமுகம்.',

    // Footer
    'footer.quick_links': 'விரைவு இணைப்புகள்',
    'footer.contact': 'தொடர்பு',
    'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',

    // Language
    'language': 'மொழி',
    'language.en': 'English',
    'language.hi': 'हिंदी',
    'language.kn': 'ಕನ್ನಡ',
    'language.ta': 'தமிழ்',
    'language.bn': 'বাংলা',
  },

  bn: {
    // Navbar
    'nav.home': 'হোম',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.contact': 'যোগাযোগ',

    // Hero
    'hero.title': 'বুদ্ধিমান কৃষি সমাধান',
    'hero.subtitle': 'আপনার অবস্থানের উপর ভিত্তি করে ব্যক্তিগতকৃত ফসলের সুপারিশ পান',
    'hero.cta': 'শুরু করুন',

    // Location
    'location.title': 'অবস্থান',
    'location.pincode': 'পিনকোড',
    'location.area': 'এলাকা',
    'location.detecting': 'অবস্থান সনাক্ত করা হচ্ছে...',
    'location.city': 'শহর',
    'location.region': 'অঞ্চল',
    'location.country': 'দেশ',
    'location.coordinates': 'স্থানাঙ্ক',
    'location.refresh': 'অবস্থান রিফ্রেশ করুন',
    'location.detect': 'আমার অবস্থান সনাক্ত করুন',
    'location.error': 'অবস্থান পেতে ব্যর্থ হয়েছে',
    'location.try_again': 'আবার চেষ্টা করুন',
    'location.enter_pincode_manually': 'ম্যানুয়ালি পিনকোড প্রবেশ করান',
    'location.detection_failed': 'অবস্থান সনাক্তকরণ ব্যর্থ',
    'location.get_recommendations': 'সুপারিশ পান',
    'location.cancel': 'বাতিল করুন',
    'location.six_digit_pincode': '6-সংখ্যার পিনকোড',
    'location.examples': 'উদাহরণ: 560001 (বেঙ্গালুরু), 400001 (মুম্বাই), 110001 (দিল্লি)',

    // Crop Form
    'crops.title': 'আপনি যে ফসলে আগ্রহী',
    'crops.input': 'আপনি যে ফসল চাষ করতে আগ্রহী তা লিখুন',
    'crops.placeholder': 'যেমন: ধান, গম, ভুট্টা (কমা দিয়ে আলাদা করুন)',
    'crops.submit': 'সুপারিশ পান',

    // Recommendations
    'recommendations.title': 'সুপারিশকৃত ফসল',
    'recommendations.based_on': 'আপনার অবস্থানের উপর ভিত্তি করে',
    'recommendations.best_match': 'সেরা মিল',
    'recommendations.water': 'পানি',
    'recommendations.temperature': 'তাপমাত্রা',
    'recommendations.growth': 'বৃদ্ধি',
    'recommendations.waiting': 'আপনার পছন্দের জন্য অপেক্ষা করছে',
    'recommendations.fill_form': 'ব্যক্তিগতকৃত ফসলের সুপারিশ পেতে আপনার অবস্থান এবং ফসলের আগ্রহ শেয়ার করুন।',
    'recommendations.no_results': 'আপনার অবস্থানের জন্য কোনো ফসলের সুপারিশ নেই। অনুগ্রহ করে একটি ভিন্ন অবস্থান চেষ্টা করুন।',

    // Add Bengali translations
    'recommendations.current_info': 'বর্তমান তথ্য',
    'recommendations.ai_tips': 'AI সুপারিশ এবং চাষের টিপস',
    'recommendations.rank': 'র‍্যাঙ্ক',
    'recommendations.growing_tips': 'চাষের টিপস',
    'recommendations.based_on_pincode': 'পিনকোডের উপর ভিত্তি করে',
    'recommendations.waiting_location': 'অবস্থান ডেটার জন্য অপেক্ষা করছে...',
    'recommendations.fetching_for': 'সুপারিশ আনা হচ্ছে',

    // Soil related
    'soil.npk_values': 'মাটির NPK মান',
    'soil.from_database': 'মাটির ডেটাবেস থেকে',
    'soil.manual_input': 'ম্যানুয়াল ইনপুট',
    'soil.nitrogen': 'নাইট্রোজেন',
    'soil.phosphorus': 'ফসফরাস',
    'soil.potassium': 'পটাসিয়াম',
    'soil.ph': 'পিএইচ',

    'weather.temperature': 'তাপমাত্রা',
    'weather.rainfall': 'বৃষ্টিপাত',
    'weather.year': 'বছর',

    // Features
    'features.title': 'কেন AgriVision বেছে নেবেন',
    'features.subtitle': 'আমাদের প্ল্যাটফর্ম কৃষকদের স্মার্ট সিদ্ধান্ত নিতে সাহায্য করার জন্য অত্যাধুনিক প্রযুক্তিকে কৃষি বিশেষজ্ঞতার সাথে সংযুক্ত করে।',
    'features.precision.title': 'নির্ভুল কৃষি',
    'features.precision.desc': 'আপনার নির্দিষ্ট অবস্থান এবং পরিবেশগত অবস্থার জন্য তৈরি সুপারিশ পান।',
    'features.optimization.title': 'ফসল অপ্টিমাইজেশন',
    'features.optimization.desc': 'বুদ্ধিমান ফসল নির্বাচনের মাধ্যমে ফলন বাড়ান এবং সম্পদ ব্যবহার কমান।',
    'features.easy.title': 'ব্যবহার করা সহজ',
    'features.easy.desc': 'সরল ইন্টারফেস যা জটিলতা ছাড়াই শক্তিশালী অন্তর্দৃষ্টি প্রদান করে।',

    // Footer
    'footer.quick_links': 'দ্রুত লিঙ্ক',
    'footer.contact': 'যোগাযোগ',
    'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',

    // Language
    'language': 'ভাষা',
    'language.en': 'English',
    'language.hi': 'हिंदी',
    'language.kn': 'ಕನ್ನಡ',
    'language.ta': 'தமிழ்',
    'language.bn': 'বাংলা',
  },
};
