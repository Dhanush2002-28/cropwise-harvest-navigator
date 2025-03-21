
import { useEffect, useState } from 'react';
import { Leaf, Droplets, Sun, ThermometerSun, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Mock data for crop recommendations
const cropData = {
  tropical: {
    clay: ['Rice', 'Sugarcane', 'Banana'],
    silt: ['Cacao', 'Coffee', 'Pineapple'],
    sand: ['Coconut', 'Cashew', 'Cassava'],
    loam: ['Avocado', 'Mango', 'Papaya'],
    peat: ['Taro', 'Yam', 'Sweet Potato'],
    chalk: ['Sisal', 'Agave', 'Guava'],
  },
  dry: {
    clay: ['Sorghum', 'Cotton', 'Safflower'],
    silt: ['Chickpea', 'Millet', 'Barley'],
    sand: ['Date Palm', 'Jojoba', 'Olive'],
    loam: ['Grapes', 'Pomegranate', 'Fig'],
    peat: ['Jatropha', 'Aloe Vera', 'Neem'],
    chalk: ['Almonds', 'Pistachios', 'Oregano'],
  },
  temperate: {
    clay: ['Corn', 'Beans', 'Cabbage'],
    silt: ['Wheat', 'Rye', 'Oats'],
    sand: ['Strawberry', 'Carrot', 'Onion'],
    loam: ['Apple', 'Tomato', 'Potato'],
    peat: ['Blueberry', 'Cranberry', 'Raspberry'],
    chalk: ['Lavender', 'Rosemary', 'Thyme'],
  },
  continental: {
    clay: ['Sunflower', 'Flax', 'Canola'],
    silt: ['Maple', 'Barley', 'Buckwheat'],
    sand: ['Rye', 'Elderberry', 'Asparagus'],
    loam: ['Cherry', 'Plum', 'Pear'],
    peat: ['Blackberry', 'Lingonberry', 'Strawberry'],
    chalk: ['Walnut', 'Hazelnut', 'Cherry'],
  },
  polar: {
    clay: ['Barley', 'Rye', 'Oats'],
    silt: ['Cabbage', 'Kale', 'Radish'],
    sand: ['Potato', 'Turnip', 'Carrot'],
    loam: ['Arctic Berries', 'Rhubarb', 'Chives'],
    peat: ['Cloudberry', 'Lingonberry', 'Bilberry'],
    chalk: ['Hardy Herbs', 'Thyme', 'Sorrel'],
  },
};

// Types for our recommendation
export interface Crop {
  name: string;
  description: string;
  waterNeeds: number;
  growthPeriod: string;
  idealTemperature: string;
  soilPh: string;
  yield: string;
}

interface RecommendationProps {
  location: {
    latitude?: number;
    longitude?: number;
    city?: string;
    region?: string;
    country?: string;
    soilType?: string;
    climate?: string;
    season?: string;
  } | null;
  formData: {
    interestedCrops: string;
  };
}

const RecommendationCard = ({ location, formData }: RecommendationProps) => {
  const { t } = useLanguage();
  const [recommendations, setRecommendations] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate detailed information for a crop
  const getDetailedCropInfo = (cropName: string, preferredCrops: string[]): Crop => {
    // Calculate preference match based on user's interested crops
    const isPreferred = preferredCrops.some(preferred => 
      cropName.toLowerCase().includes(preferred.toLowerCase())
    );
    
    // This would normally come from an API, but we're generating it for demo purposes
    const waterNeeds = Math.floor(Math.random() * 70) + 30; // 30-100
    const growthPeriods = ['60-90 days', '3-4 months', '4-6 months', '6-8 months'];
    const temperatures = ['18-24°C', '20-30°C', '15-21°C', '24-32°C'];
    const soilPh = [`${(Math.random() * 3 + 5).toFixed(1)}-${(Math.random() * 2 + 7).toFixed(1)}`];
    const yields = ['1.5-3 tons/acre', '2-4 tons/acre', '3-5 tons/acre', '0.5-2 tons/acre'];
    
    return {
      name: cropName,
      description: `${cropName} is well-suited for the ${location?.climate} climate and thrives in ${location?.soilType} soil. It performs best during the ${location?.season} season.`,
      waterNeeds: isPreferred ? 80 : waterNeeds, // Preferred crops get better water score
      growthPeriod: growthPeriods[Math.floor(Math.random() * growthPeriods.length)],
      idealTemperature: temperatures[Math.floor(Math.random() * temperatures.length)],
      soilPh: soilPh[Math.floor(Math.random() * soilPh.length)],
      yield: isPreferred ? yields[2] : yields[Math.floor(Math.random() * yields.length)], // Better yield for preferred crops
    };
  };

  // Generate recommendations based on location and user preferences
  const generateRecommendations = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        if (!location?.climate || !location?.soilType) {
          setRecommendations([]);
          setLoading(false);
          return;
        }
        
        // Get crops based on detected climate and soil type
        const eligibleCrops = cropData[location.climate as keyof typeof cropData]?.[
          location.soilType as keyof (typeof cropData)[keyof typeof cropData]
        ] || [];
        
        // Process user's interested crops
        const userCrops = formData.interestedCrops
          .split(',')
          .map(crop => crop.trim())
          .filter(crop => crop !== '');
        
        // Generate detailed info for each crop
        const detailedRecommendations = eligibleCrops
          .map(cropName => getDetailedCropInfo(cropName, userCrops))
          .sort((a, b) => {
            // Sort by user preference first, then by water needs
            const aPreferred = userCrops.some(crop => 
              a.name.toLowerCase().includes(crop.toLowerCase())
            );
            const bPreferred = userCrops.some(crop => 
              b.name.toLowerCase().includes(crop.toLowerCase())
            );
            
            if (aPreferred && !bPreferred) return -1;
            if (!aPreferred && bPreferred) return 1;
            
            // Then sort by water efficiency for the current season
            const waterEfficiency = (crop: Crop) => {
              if (location.season === 'summer' || location.season === 'dry') {
                return -crop.waterNeeds; // Lower water needs better in dry seasons
              }
              return 0; // No preference in other seasons
            };
            
            return waterEfficiency(b) - waterEfficiency(a);
          });
        
        setRecommendations(detailedRecommendations);
        setLoading(false);
      } catch (error) {
        console.error("Error generating recommendations:", error);
        setLoading(false);
      }
    }, 1500);
  };

  useEffect(() => {
    // Generate recommendations if we have location data
    if (location?.latitude && location?.longitude) {
      generateRecommendations();
    }
  }, [location, formData]);

  if (!location?.latitude || !location?.longitude) {
    return (
      <div className="glass rounded-xl p-6 text-center card-shine">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
        <h3 className="text-xl font-semibold mb-2">{t('recommendations.waiting')}</h3>
        <p className="text-muted-foreground">
          {t('recommendations.fill_form')}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="glass rounded-xl p-6 text-center card-shine">
        <div className="animate-pulse">
          <div className="rounded-full bg-primary/20 h-12 w-12 mx-auto mb-4"></div>
          <div className="h-6 bg-primary/10 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-secondary rounded w-5/6 mx-auto mb-2"></div>
          <div className="h-4 bg-secondary rounded w-4/6 mx-auto mb-6"></div>
          
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col space-y-2">
                <div className="h-5 bg-secondary rounded-full w-1/3"></div>
                <div className="h-4 bg-secondary/50 rounded-full w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 card-shine">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Leaf className="w-5 h-5 mr-2 text-primary" />
          {t('recommendations.title')}
        </h3>
        {location?.city && (
          <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {location.city}
          </div>
        )}
      </div>

      {recommendations.length > 0 ? (
        <div className="space-y-6">
          {recommendations.map((crop, index) => (
            <div 
              key={crop.name} 
              className={`p-4 rounded-lg border border-border ${
                index === 0 ? 'bg-primary/5' : 'bg-background/50'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-medium text-foreground">{crop.name}</h4>
                {index === 0 && (
                  <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                    {t('recommendations.best_match')}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-4">{crop.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center text-sm">
                  <Droplets className="w-4 h-4 mr-1.5 text-primary" />
                  <span>{t('recommendations.water')}: {crop.waterNeeds}%</span>
                </div>
                <div className="flex items-center text-sm">
                  <ThermometerSun className="w-4 h-4 mr-1.5 text-primary" />
                  <span>{crop.idealTemperature}</span>
                </div>
                <div className="flex items-center text-sm col-span-2">
                  <Sun className="w-4 h-4 mr-1.5 text-primary" />
                  <span>{t('recommendations.growth')}: {crop.growthPeriod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {t('recommendations.no_results')}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
