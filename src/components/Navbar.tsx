
import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle theme switching
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Apply theme on load and set up scroll listener
  useEffect(() => {
    // Apply saved theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Handle scroll for navbar background
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  // Close menu on navigation
  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen 
          ? 'bg-background/80 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-primary">
          <img 
            src="/lovable-uploads/28a87d9e-bf3b-4021-bd55-6a7c87f2f8f3.png" 
            alt="AgriVision Logo" 
            className="h-10 w-auto" 
          />
          <span className="font-semibold text-xl">AgriVision</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">{t('nav.home')}</Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">{t('nav.contact')}</Link>
          
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            
            <button
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <LanguageSelector />
          
          <button
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-foreground" />
            )}
          </button>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 text-foreground"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md py-4 md:hidden animate-slide-in">
          <nav className="container mx-auto px-6 flex flex-col space-y-4">
            <Link to="/" onClick={handleMenuClose} className="py-2 text-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/about" onClick={handleMenuClose} className="py-2 text-foreground hover:text-primary transition-colors">
              {t('nav.about')}
            </Link>
            <Link to="/contact" onClick={handleMenuClose} className="py-2 text-foreground hover:text-primary transition-colors">
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
