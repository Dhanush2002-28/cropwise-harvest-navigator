
import { useEffect, useState } from 'react';
import { Leaf, Droplets, Sun, ThermometerSun, Sparkles } from 'lucide-react';

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
  } | null;
  formData: {
    soilType: string;
    climate: string;
    season: string;
    waterAvailability: number;
    previousCrop: string;
  };
}

const RecommendationCard = ({ location, formData }: RecommendationProps) => {
  const [recommendations, setRecommendations] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate detailed information for a crop
  const getDetailedCropInfo = (cropName: string): Crop => {
    // This would normally come from an API, but we're generating it for demo purposes
    const waterNeeds = Math.floor(Math.random() * 70) + 30; // 30-100
    const growthPeriods = ['60-90 days', '3-4 months', '4-6 months', '6-8 months'];
    const temperatures = ['18-24°C', '20-30°C', '15-21°C', '24-32°C'];
    const soilPh = [`${(Math.random() * 3 + 5).toFixed(1)}-${(Math.random() * 2 + 7).toFixed(1)}`];
    const yields = ['1.5-3 tons/acre', '2-4 tons/acre', '3-5 tons/acre', '0.5-2 tons/acre'];
    
    return {
      name: cropName,
      description: `${cropName} is well-suited for the ${formData.climate} climate and thrives in ${formData.soilType} soil. It performs best during the ${formData.season} season.`,
      waterNeeds,
      growthPeriod: growthPeriods[Math.floor(Math.random() * growthPeriods.length)],
      idealTemperature: temperatures[Math.floor(Math.random() * temperatures.length)],
      soilPh: soilPh[Math.floor(Math.random() * soilPh.length)],
      yield: yields[Math.floor(Math.random() * yields.length)],
    };
  };

  // Generate recommendations based on form data
  const generateRecommendations = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Get crops based on climate and soil type
        const eligibleCrops = cropData[formData.climate as keyof typeof cropData]?.[
          formData.soilType as keyof (typeof cropData)[keyof typeof cropData]
        ] || [];
        
        // Generate detailed info for each crop
        const detailedRecommendations = eligibleCrops
          .map(cropName => getDetailedCropInfo(cropName))
          .sort((a, b) => {
            // Sort by water needs vs availability
            const aWaterDiff = Math.abs(a.waterNeeds - formData.waterAvailability);
            const bWaterDiff = Math.abs(b.waterNeeds - formData.waterAvailability);
            return aWaterDiff - bWaterDiff;
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
    // Only generate recommendations if we have all required data
    if (
      formData.soilType &&
      formData.climate &&
      formData.season
    ) {
      generateRecommendations();
    }
  }, [formData]);

  if (!formData.soilType || !formData.climate) {
    return (
      <div className="glass rounded-xl p-6 text-center card-shine">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
        <h3 className="text-xl font-semibold mb-2">Awaiting Your Preferences</h3>
        <p className="text-muted-foreground">
          Fill out the form to get personalized crop recommendations for your land.
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
          Recommended Crops
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
                    Best Match
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-4">{crop.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center text-sm">
                  <Droplets className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Water: {crop.waterNeeds}%</span>
                </div>
                <div className="flex items-center text-sm">
                  <ThermometerSun className="w-4 h-4 mr-1.5 text-primary" />
                  <span>{crop.idealTemperature}</span>
                </div>
                <div className="flex items-center text-sm col-span-2">
                  <Sun className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Growth: {crop.growthPeriod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No crop recommendations available for the selected combination.
            Please try different soil type or climate settings.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
