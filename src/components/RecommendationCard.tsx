
import { useEffect, useState } from 'react';
import { Leaf, Droplets, Sun, ThermometerSun, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// India-specific crop recommendations data
const cropData = {
  tropical: {
    alluvial: ['Rice', 'Banana', 'Sugarcane'],
    black: ['Cotton', 'Sugarcane', 'Turmeric'],
    red: ['Groundnut', 'Millet', 'Cashew'],
    laterite: ['Coconut', 'Rubber', 'Cashew'],
    arid: ['Dates', 'Pearl Millet', 'Cluster Bean'],
    mountain: ['Tea', 'Cardamom', 'Ginger'],
  },
  subtropical: {
    alluvial: ['Wheat', 'Rice', 'Maize'],
    black: ['Cotton', 'Soybean', 'Pigeon Pea'],
    red: ['Lentil', 'Chickpea', 'Rice'],
    laterite: ['Cashew', 'Mango', 'Pineapple'],
    arid: ['Millet', 'Mustard', 'Chickpea'],
    mountain: ['Apple', 'Maize', 'Potato'],
  },
  arid: {
    alluvial: ['Pearl Millet', 'Cluster Bean', 'Moth Bean'],
    black: ['Cotton', 'Sorghum', 'Pigeon Pea'],
    red: ['Sorghum', 'Groundnut', 'Sesame'],
    laterite: ['Cashew', 'Coconut', 'Mango'],
    arid: ['Pearl Millet', 'Cluster Bean', 'Mustard'],
    mountain: ['Barley', 'Peas', 'Mustard'],
  },
  humid: {
    alluvial: ['Rice', 'Jute', 'Tea'],
    black: ['Rice', 'Sugarcane', 'Jute'],
    red: ['Rice', 'Pineapple', 'Banana'],
    laterite: ['Tea', 'Rubber', 'Spices'],
    arid: ['Rice', 'Jute', 'Sugarcane'],
    mountain: ['Tea', 'Ginger', 'Cardamom'],
  },
  mountain: {
    alluvial: ['Rice', 'Wheat', 'Maize'],
    black: ['Wheat', 'Peas', 'Barley'],
    red: ['Wheat', 'Barley', 'Potato'],
    laterite: ['Tea', 'Cardamom', 'Ginger'],
    arid: ['Barley', 'Buckwheat', 'Peas'],
    mountain: ['Apple', 'Potato', 'Peas'],
  },
};

// Season-based crop recommendations for Indian agricultural seasons
const seasonalCrops = {
  kharif: ['Rice', 'Maize', 'Sorghum', 'Cotton', 'Groundnut', 'Soybean', 'Pigeon Pea', 'Green Gram', 'Black Gram'],
  rabi: ['Wheat', 'Barley', 'Gram', 'Linseed', 'Mustard', 'Peas', 'Potato', 'Lentil', 'Chickpea'],
  zaid: ['Watermelon', 'Muskmelon', 'Cucumber', 'Vegetables', 'Fodder Crops', 'Green Gram', 'Pumpkin']
};

// Types for our recommendation
export interface Crop {
  name: string;
  description: string;
  waterNeeds: number;
  growthPeriod: string;
  idealTemperature: string;
  soilPh: string;
  yieldEstimate: string; // Changed from yield to yieldEstimate
  seasonality: string;
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
  const getDetailedCropInfo = (cropName: string, preferredCrops: string[], currentSeason: string): Crop => {
    // Calculate preference match based on user's interested crops
    const isPreferred = preferredCrops.some(preferred => 
      cropName.toLowerCase().includes(preferred.toLowerCase())
    );
    
    // Check if crop is suitable for current season
    const isSeasonalCrop = seasonalCrops[currentSeason as keyof typeof seasonalCrops]?.includes(cropName);
    
    // Water needs based on climate
    const baseWaterNeeds = location?.climate === 'arid' ? 80 : 
                          location?.climate === 'humid' ? 40 : 
                          location?.climate === 'tropical' ? 60 : 50;
    
    const waterNeeds = isPreferred ? Math.min(baseWaterNeeds + 10, 90) : baseWaterNeeds;
    
    // Growth periods typical for Indian crops
    const growthPeriods = {
      'Rice': '110-150 days',
      'Wheat': '120-150 days',
      'Maize': '80-110 days',
      'Cotton': '160-180 days',
      'Sugarcane': '10-12 months',
      'Potato': '70-120 days',
      'Soybean': '90-120 days',
    };
    
    // Get specific growth period or use a default range
    const growthPeriod = growthPeriods[cropName as keyof typeof growthPeriods] || 
                          (isSeasonalCrop ? '90-120 days' : '100-150 days');
    
    // Temperature ranges for Indian climate zones
    const temperatureRanges = {
      'tropical': '24-32°C',
      'subtropical': '18-28°C',
      'arid': '25-40°C',
      'humid': '22-30°C',
      'mountain': '10-20°C',
    };
    
    const idealTemperature = temperatureRanges[location?.climate as keyof typeof temperatureRanges] || '20-30°C';
    
    // Soil pH ranges based on soil type
    const soilPhRanges = {
      'alluvial': '6.5-7.5',
      'black': '7.5-8.5',
      'red': '6.0-6.5',
      'laterite': '5.5-6.5',
      'arid': '7.0-8.5',
      'mountain': '6.0-7.0',
    };
    
    const soilPh = soilPhRanges[location?.soilType as keyof typeof soilPhRanges] || '6.5-7.5';
    
    // Yield estimates
    const yieldRanges = ['2-3 tons/acre', '3-5 tons/acre', '1.5-2.5 tons/acre', '4-6 tons/acre'];
    const yieldEstimate = isPreferred ? yieldRanges[1] : yieldRanges[Math.floor(Math.random() * yieldRanges.length)];
    
    // Seasonality information
    let seasonality = '';
    if (seasonalCrops.kharif.includes(cropName)) seasonality += 'Kharif, ';
    if (seasonalCrops.rabi.includes(cropName)) seasonality += 'Rabi, ';
    if (seasonalCrops.zaid.includes(cropName)) seasonality += 'Zaid, ';
    seasonality = seasonality ? seasonality.slice(0, -2) : 'Year-round';
    
    return {
      name: cropName,
      description: `${cropName} is well-suited for ${location?.climate} climate and thrives in ${location?.soilType} soil of India. It is typically grown during the ${seasonality} season${isSeasonalCrop ? ' (current season)' : ''}.`,
      waterNeeds,
      growthPeriod,
      idealTemperature,
      soilPh,
      yieldEstimate, // Changed from yield to yieldEstimate
      seasonality,
    };
  };

  // Generate recommendations based on location and user preferences
  const generateRecommendations = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        if (!location?.climate || !location?.soilType || !location?.season) {
          setRecommendations([]);
          setLoading(false);
          return;
        }
        
        // Ensure we have valid soil type and climate from Indian agriculture perspective
        const soilType = location.soilType in {alluvial: 1, black: 1, red: 1, laterite: 1, arid: 1, mountain: 1} 
                      ? location.soilType 
                      : 'alluvial'; // Default to alluvial if unknown
        
        const climate = location.climate in {tropical: 1, subtropical: 1, arid: 1, humid: 1, mountain: 1}
                      ? location.climate
                      : 'subtropical'; // Default to subtropical if unknown
        
        // Get crops based on detected climate and soil type from our India-specific data
        const eligibleCrops = cropData[climate as keyof typeof cropData]?.[
          soilType as keyof (typeof cropData)[keyof typeof cropData]
        ] || [];
        
        // Add seasonal crops based on current season if not already included
        const currentSeason = location.season || 'kharif';
        const seasonalCropRecommendations = seasonalCrops[currentSeason as keyof typeof seasonalCrops] || [];
        
        // Combine eligible crops with additional seasonal options
        const combinedCrops = [...new Set([...eligibleCrops, ...seasonalCropRecommendations.slice(0, 3)])];
        
        // Process user's interested crops
        const userCrops = formData.interestedCrops
          .split(',')
          .map(crop => crop.trim())
          .filter(crop => crop !== '');
        
        // Generate detailed info for each crop
        const detailedRecommendations = combinedCrops
          .map(cropName => getDetailedCropInfo(cropName, userCrops, currentSeason))
          .sort((a, b) => {
            // Sort by current season match first
            const aCurrentSeason = a.seasonality.includes(currentSeason);
            const bCurrentSeason = b.seasonality.includes(currentSeason);
            
            if (aCurrentSeason && !bCurrentSeason) return -1;
            if (!aCurrentSeason && bCurrentSeason) return 1;
            
            // Then by user preference
            const aPreferred = userCrops.some(crop => 
              a.name.toLowerCase().includes(crop.toLowerCase())
            );
            const bPreferred = userCrops.some(crop => 
              b.name.toLowerCase().includes(crop.toLowerCase())
            );
            
            if (aPreferred && !bPreferred) return -1;
            if (!aPreferred && bPreferred) return 1;
            
            // Finally by water efficiency in arid/dry conditions
            if (location.climate === 'arid') {
              return a.waterNeeds - b.waterNeeds;
            }
            
            return 0;
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
                <div className="flex items-center text-sm">
                  <Sun className="w-4 h-4 mr-1.5 text-primary" />
                  <span>{t('recommendations.growth')}: {crop.growthPeriod}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Leaf className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Seasons: {crop.seasonality}</span>
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
