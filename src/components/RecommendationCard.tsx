import { useEffect, useState } from "react";
import {
  Leaf,
  Droplets,
  Sun,
  ThermometerSun,
  Sparkles,
  Cloud,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// India-specific crop recommendations data
const cropData = {
  tropical: {
    alluvial: ["Rice", "Banana", "Sugarcane"],
    black: ["Cotton", "Sugarcane", "Turmeric"],
    red: ["Groundnut", "Millet", "Cashew"],
    laterite: ["Coconut", "Rubber", "Cashew"],
    arid: ["Dates", "Pearl Millet", "Cluster Bean"],
    mountain: ["Tea", "Cardamom", "Ginger"],
  },
  // ... keep existing code (all other climate and soil type crop data)
};

// Season-based crop recommendations for Indian agricultural seasons
const seasonalCrops = {
  kharif: [
    "Rice",
    "Maize",
    "Sorghum",
    "Cotton",
    "Groundnut",
    "Soybean",
    "Pigeon Pea",
    "Green Gram",
    "Black Gram",
  ],
  rabi: [
    "Wheat",
    "Barley",
    "Gram",
    "Linseed",
    "Mustard",
    "Peas",
    "Potato",
    "Lentil",
    "Chickpea",
  ],
  zaid: [
    "Watermelon",
    "Muskmelon",
    "Cucumber",
    "Vegetables",
    "Fodder Crops",
    "Green Gram",
    "Pumpkin",
  ],
};

// Crop-specific data for more accurate recommendations
const cropSpecificData = {
  // Kharif crops
  Rice: {
    waterNeeds: 85,
    idealTemp: "24-30°C",
    minRainfall: 1000,
    maxRainfall: 2000,
    npk: { n: [80, 120], p: [40, 60], k: [40, 60] },
  },
  Maize: {
    waterNeeds: 65,
    idealTemp: "21-27°C",
    minRainfall: 500,
    maxRainfall: 800,
    npk: { n: [60, 90], p: [30, 50], k: [30, 50] },
  },
  Sorghum: {
    waterNeeds: 55,
    idealTemp: "26-30°C",
    minRainfall: 450,
    maxRainfall: 650,
  },
  Cotton: {
    waterNeeds: 60,
    idealTemp: "25-35°C",
    minRainfall: 600,
    maxRainfall: 1200,
  },
  Groundnut: {
    waterNeeds: 50,
    idealTemp: "25-30°C",
    minRainfall: 500,
    maxRainfall: 700,
  },
  Soybean: {
    waterNeeds: 60,
    idealTemp: "20-30°C",
    minRainfall: 600,
    maxRainfall: 900,
  },
  "Pigeon Pea": {
    waterNeeds: 45,
    idealTemp: "25-30°C",
    minRainfall: 400,
    maxRainfall: 700,
  },

  // Rabi crops
  Wheat: {
    waterNeeds: 55,
    idealTemp: "15-24°C",
    minRainfall: 450,
    maxRainfall: 650,
  },
  Barley: {
    waterNeeds: 45,
    idealTemp: "12-20°C",
    minRainfall: 300,
    maxRainfall: 500,
  },
  Gram: {
    waterNeeds: 40,
    idealTemp: "20-25°C",
    minRainfall: 350,
    maxRainfall: 500,
  },
  Mustard: {
    waterNeeds: 35,
    idealTemp: "10-25°C",
    minRainfall: 300,
    maxRainfall: 450,
  },
  Peas: {
    waterNeeds: 50,
    idealTemp: "12-18°C",
    minRainfall: 400,
    maxRainfall: 600,
  },
  Potato: {
    waterNeeds: 65,
    idealTemp: "15-20°C",
    minRainfall: 450,
    maxRainfall: 650,
  },
  Lentil: {
    waterNeeds: 35,
    idealTemp: "18-25°C",
    minRainfall: 350,
    maxRainfall: 500,
  },

  // Zaid crops
  Watermelon: {
    waterNeeds: 70,
    idealTemp: "22-30°C",
    minRainfall: 400,
    maxRainfall: 600,
  },
  Muskmelon: {
    waterNeeds: 65,
    idealTemp: "24-32°C",
    minRainfall: 350,
    maxRainfall: 550,
  },
  Cucumber: {
    waterNeeds: 75,
    idealTemp: "18-24°C",
    minRainfall: 400,
    maxRainfall: 600,
  },

  // Other important crops
  Sugarcane: {
    waterNeeds: 80,
    idealTemp: "24-30°C",
    minRainfall: 1500,
    maxRainfall: 2500,
  },
  Banana: {
    waterNeeds: 75,
    idealTemp: "24-32°C",
    minRainfall: 1200,
    maxRainfall: 2200,
  },
  Tea: {
    waterNeeds: 70,
    idealTemp: "18-30°C",
    minRainfall: 1500,
    maxRainfall: 2500,
  },
  Coconut: {
    waterNeeds: 60,
    idealTemp: "27-32°C",
    minRainfall: 1200,
    maxRainfall: 2000,
  },
  Rubber: {
    waterNeeds: 75,
    idealTemp: "25-34°C",
    minRainfall: 2000,
    maxRainfall: 3000,
  },
  Apple: {
    waterNeeds: 55,
    idealTemp: "10-18°C",
    minRainfall: 800,
    maxRainfall: 1200,
  },

  // Default values
  default: {
    waterNeeds: 60,
    idealTemp: "20-30°C",
    minRainfall: 500,
    maxRainfall: 800,
    npk: { n: [50, 100], p: [20, 50], k: [20, 50] },
  },
};

// Historical rainfall data for India (average annual in mm) by region
const regionalRainfallData = {
  Karnataka: { current: 750, previous: 820 },
  Kerala: { current: 2800, previous: 3000 },
  "Tamil Nadu": { current: 950, previous: 1000 },
  "Andhra Pradesh": { current: 860, previous: 800 },
  Telangana: { current: 790, previous: 750 },
  Maharashtra: { current: 1200, previous: 1300 },
  Gujarat: { current: 620, previous: 580 },
  Rajasthan: { current: 350, previous: 380 },
  Punjab: { current: 570, previous: 550 },
  Haryana: { current: 490, previous: 510 },
  "Uttar Pradesh": { current: 850, previous: 900 },
  "Madhya Pradesh": { current: 950, previous: 1000 },
  Bihar: { current: 1050, previous: 1100 },
  "West Bengal": { current: 1600, previous: 1750 },
  Assam: { current: 2200, previous: 2400 },
  default: { current: 900, previous: 950 },
};

// Types for our recommendation
export interface Crop {
  name: string;
  description: string;
  waterNeeds: number;
  growthPeriod: string;
  idealTemperature: string;
  soilPh: string;
  yieldEstimate: string;
  seasonality: string;
  rainfall: {
    required: string;
    current: number;
    previous: number;
    suitability: number;
  };
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
  npk: {
    n: number;
    p: number;
    k: number;
  };
}

const RecommendationCard = ({ location, formData }: RecommendationProps) => {
  const { t } = useLanguage();
  const [recommendations, setRecommendations] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(false);

  // Get rainfall data based on region
  const getRainfallData = (region: string | undefined) => {
    if (!region) return regionalRainfallData.default;

    // Check for exact match
    if (region in regionalRainfallData) {
      return regionalRainfallData[region as keyof typeof regionalRainfallData];
    }

    // Check for partial match
    for (const key of Object.keys(regionalRainfallData)) {
      if (region.includes(key) || key.includes(region)) {
        return regionalRainfallData[key as keyof typeof regionalRainfallData];
      }
    }

    return regionalRainfallData.default;
  };

  // Generate detailed information for a crop
  const getDetailedCropInfo = (
    cropName: string,
    preferredCrops: string[],
    currentSeason: string
  ): Crop => {
    // Get crop-specific data or default values
    const cropData =
      cropSpecificData[cropName as keyof typeof cropSpecificData] ||
      cropSpecificData.default;

    // Calculate preference match based on user's interested crops
    const isPreferred = preferredCrops.some((preferred) =>
      cropName.toLowerCase().includes(preferred.toLowerCase())
    );

    // Check if crop is suitable for current season
    const isSeasonalCrop =
      seasonalCrops[currentSeason as keyof typeof seasonalCrops]?.includes(
        cropName
      );

    // Water needs - use crop-specific data
    const baseWaterNeeds = cropData.waterNeeds;
    const waterNeeds = isPreferred
      ? Math.min(baseWaterNeeds + 5, 95)
      : baseWaterNeeds;

    // Growth periods typical for Indian crops
    const growthPeriods = {
      Rice: "110-150 days",
      Wheat: "120-150 days",
      Maize: "80-110 days",
      Cotton: "160-180 days",
      Sugarcane: "10-12 months",
      Potato: "70-120 days",
      Soybean: "90-120 days",
    };

    // Get specific growth period or use a default range
    const growthPeriod =
      growthPeriods[cropName as keyof typeof growthPeriods] ||
      (isSeasonalCrop ? "90-120 days" : "100-150 days");

    // Use crop-specific temperature range
    const idealTemperature = cropData.idealTemp;

    // Soil pH ranges based on soil type
    const soilPhRanges = {
      alluvial: "6.5-7.5",
      black: "7.5-8.5",
      red: "6.0-6.5",
      laterite: "5.5-6.5",
      arid: "7.0-8.5",
      mountain: "6.0-7.0",
    };

    const soilPh =
      soilPhRanges[location?.soilType as keyof typeof soilPhRanges] ||
      "6.5-7.5";

    // Yield estimates
    const yieldRanges = [
      "2-3 tons/acre",
      "3-5 tons/acre",
      "1.5-2.5 tons/acre",
      "4-6 tons/acre",
    ];
    const yieldEstimate = isPreferred
      ? yieldRanges[1]
      : yieldRanges[Math.floor(Math.random() * yieldRanges.length)];

    // Get rainfall data for the region
    const rainfallData = getRainfallData(location?.region);

    // Calculate rainfall suitability (0-100%)
    const minRequired = cropData.minRainfall;
    const maxRequired = cropData.maxRainfall;
    const currentRainfall = rainfallData.current;

    let rainfallSuitability = 0;
    if (currentRainfall < minRequired) {
      // Below minimum - partial suitability based on how close to minimum
      rainfallSuitability = Math.round((currentRainfall / minRequired) * 70);
    } else if (currentRainfall > maxRequired) {
      // Above maximum - partial suitability based on how much above maximum
      const excessFactor = (currentRainfall - maxRequired) / maxRequired;
      rainfallSuitability = Math.round(Math.max(0, 100 - excessFactor * 100));
    } else {
      // Within range - full suitability with peak at optimal (midpoint)
      const optimalRainfall = (minRequired + maxRequired) / 2;
      const distanceFromOptimal =
        Math.abs(currentRainfall - optimalRainfall) /
        (maxRequired - minRequired);
      rainfallSuitability = Math.round(100 - distanceFromOptimal * 20);
    }

    // Seasonality information
    let seasonality = "";
    if (seasonalCrops.kharif.includes(cropName)) seasonality += "Kharif, ";
    if (seasonalCrops.rabi.includes(cropName)) seasonality += "Rabi, ";
    if (seasonalCrops.zaid.includes(cropName)) seasonality += "Zaid, ";
    seasonality = seasonality ? seasonality.slice(0, -2) : "Year-round";

    return {
      name: cropName,
      description: `${cropName} is well-suited for ${
        location?.climate
      } climate and thrives in ${
        location?.soilType
      } soil of India. It is typically grown during the ${seasonality} season${
        isSeasonalCrop ? " (current season)" : ""
      }.`,
      waterNeeds,
      growthPeriod,
      idealTemperature,
      soilPh,
      yieldEstimate,
      seasonality,
      rainfall: {
        required: `${minRequired}-${maxRequired} mm`,
        current: rainfallData.current,
        previous: rainfallData.previous,
        suitability: rainfallSuitability,
      },
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
        const soilType =
          location.soilType in
          { alluvial: 1, black: 1, red: 1, laterite: 1, arid: 1, mountain: 1 }
            ? location.soilType
            : "alluvial"; // Default to alluvial if unknown

        const climate =
          location.climate in
          { tropical: 1, subtropical: 1, arid: 1, humid: 1, mountain: 1 }
            ? location.climate
            : "subtropical"; // Default to subtropical if unknown

        // Get crops based on detected climate and soil type from our India-specific data
        const eligibleCrops =
          cropData[climate as keyof typeof cropData]?.[
            soilType as keyof (typeof cropData)[keyof typeof cropData]
          ] || [];

        // Add seasonal crops based on current season if not already included
        const currentSeason = location.season || "kharif";
        const seasonalCropRecommendations =
          seasonalCrops[currentSeason as keyof typeof seasonalCrops] || [];

        // Combine eligible crops with additional seasonal options
        const combinedCrops = [
          ...new Set([
            ...eligibleCrops,
            ...seasonalCropRecommendations.slice(0, 3),
          ]),
        ];

        // Process user's interested crops
        const userCrops = formData.interestedCrops
          .split(",")
          .map((crop) => crop.trim())
          .filter((crop) => crop !== "");

        // Generate detailed info for each crop
        const detailedRecommendations = combinedCrops
          .map((cropName) =>
            getDetailedCropInfo(cropName, userCrops, currentSeason)
          )
          .sort((a, b) => {
            // Sort by current season match first
            const aCurrentSeason = a.seasonality.includes(currentSeason);
            const bCurrentSeason = b.seasonality.includes(currentSeason);

            if (aCurrentSeason && !bCurrentSeason) return -1;
            if (!aCurrentSeason && bCurrentSeason) return 1;

            // Then by rainfall suitability
            if (
              Math.abs(a.rainfall.suitability - b.rainfall.suitability) > 15
            ) {
              return b.rainfall.suitability - a.rainfall.suitability;
            }

            // Then by user preference
            const aPreferred = userCrops.some((crop) =>
              a.name.toLowerCase().includes(crop.toLowerCase())
            );
            const bPreferred = userCrops.some((crop) =>
              b.name.toLowerCase().includes(crop.toLowerCase())
            );

            if (aPreferred && !bPreferred) return -1;
            if (!aPreferred && bPreferred) return 1;

            // Finally by water efficiency in arid/dry conditions
            if (location.climate === "arid") {
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
        <h3 className="text-xl font-semibold mb-2">
          {t("recommendations.waiting")}
        </h3>
        <p className="text-muted-foreground">
          {t("recommendations.fill_form")}
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
            {[1, 2, 3].map((i) => (
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
          {t("recommendations.title")}
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
                index === 0 ? "bg-primary/5" : "bg-background/50"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-medium text-foreground">
                  {crop.name}
                </h4>
                {index === 0 && (
                  <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                    {t("recommendations.best_match")}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                {crop.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center text-sm">
                  <Droplets className="w-4 h-4 mr-1.5 text-primary" />
                  <span>
                    {t("recommendations.water")}: {crop.waterNeeds}%
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <ThermometerSun className="w-4 h-4 mr-1.5 text-primary" />
                  <span>{crop.idealTemperature}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Sun className="w-4 h-4 mr-1.5 text-primary" />
                  <span>
                    {t("recommendations.growth")}: {crop.growthPeriod}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Leaf className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Seasons: {crop.seasonality}</span>
                </div>
                <div className="flex items-center text-sm col-span-2">
                  <Cloud className="w-4 h-4 mr-1.5 text-primary" />
                  <span>
                    Rainfall: {crop.rainfall.required} required | Current:{" "}
                    {crop.rainfall.current} mm (Previous:{" "}
                    {crop.rainfall.previous} mm) | Suitability:{" "}
                    {crop.rainfall.suitability}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {t("recommendations.no_results")}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
