
import { Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-primary mb-4">
              <img 
                src="/28a87d9e-bf3b-4021-bd55-6a7c87f2f8f3.png" 
                alt="AgriVision Logo" 
                className="h-10 w-auto" 
              />
              <span className="font-semibold text-xl">AgriVision</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              AI based crop recommendation system harnessing the power of artificial intelligence 
              to revolutionize agriculture with personalized recommendations based on your unique environmental conditions.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:dhanushchandru28@gmail.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>Dhanush C</li>
              <li>Department of MCA</li>
              <li>Acharya Institute of Technology, Bengaluru</li>
              <li>dhanushchandru28@gmail.com</li>
              <li>+91 99016 62554</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>© {currentYear} AgriVision. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
