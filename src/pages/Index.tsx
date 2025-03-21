
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LocationTracker from '../components/LocationTracker';
import CropForm from '../components/CropForm';
import RecommendationCard from '../components/RecommendationCard';
import Footer from '../components/Footer';
import { ArrowRight, Leaf, Wheat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
  country?: string;
  soilType?: string;
  climate?: string;
  season?: string;
}

interface FormData {
  interestedCrops: string;
}

const Index = () => {
  const { t } = useLanguage();
  const [location, setLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState<FormData>({
    interestedCrops: '',
  });

  const handleLocationChange = (newLocation: Location) => {
    setLocation(newLocation);
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <main id="content-section" className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium">
                  Smart Agriculture
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('hero.subtitle')}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t('recommendations.fill_form')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <LocationTracker onLocationChange={handleLocationChange} />
                  <CropForm onSubmit={handleFormSubmit} />
                </div>
                <div>
                  <RecommendationCard location={location} formData={formData} />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium">
                  {t('features.title')}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t('features.subtitle')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass p-6 rounded-xl card-shine">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('features.precision.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('features.precision.desc')}
                  </p>
                </div>
                
                <div className="glass p-6 rounded-xl card-shine">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Wheat className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('features.optimization.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('features.optimization.desc')}
                  </p>
                </div>
                
                <div className="glass p-6 rounded-xl card-shine">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('features.easy.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('features.easy.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
