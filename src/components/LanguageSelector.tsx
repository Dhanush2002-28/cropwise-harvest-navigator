
import { useState, useRef, useEffect } from 'react';
import { Languages, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: t('language.en') },
    { code: 'hi', name: t('language.hi') },
    { code: 'kn', name: t('language.kn') },
    { code: 'ta', name: t('language.ta') },
    { code: 'bn', name: t('language.bn') },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Languages className="h-4 w-4" />
        <span>{t('language')}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-background border border-border rounded-md shadow-lg z-50 animate-scale-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full text-left px-4 py-2 hover:bg-secondary flex items-center ${
                language === lang.code ? 'bg-primary/10 text-primary' : ''
              }`}
              onClick={() => selectLanguage(lang.code)}
            >
              {language === lang.code && <Check className="w-4 h-4 mr-2" />}
              <span className={language === lang.code ? 'ml-0' : 'ml-6'}>
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
