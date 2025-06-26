import React from "react";
import { useLanguage } from "../context/LanguageContext"; // Add this import

interface Location {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  block: string;
  pincode: string;
}

interface PincodeCropRecommendation {
  pincode: string;
  location: {
    state: string;
    district: string;
    block: string;
  };
  soil_data?: {
    nitrogen: number;
    phosphorous: number;
    potassium: number;
    ph: number;
  };
  weather_data?: {
    temperature: number;
    rainfall: number;
    year: number;
  };
  recommended_crops: Array<{
    crop: string;
    probability: number;
  }>;
}

interface RecommendationCardProps {
  location: Location | null;
  npk: { n: number; p: number; k: number };
  cropRecommendation?: PincodeCropRecommendation | null;
}

// Add crop growing tips data
const CROP_TIPS = {
  Rice: {
    icon: "🌾",
    season: "Kharif (June-Nov)",
    tips: [
      "Requires flooded fields for first 6-8 weeks",
      "Plant during monsoon season",
      "Needs 20-25°C temperature for optimal growth",
      "Harvest when grains turn golden yellow",
    ],
  },
  Wheat: {
    icon: "🌾",
    season: "Rabi (Nov-Apr)",
    tips: [
      "Sow after monsoon season ends",
      "Requires cool weather for growth",
      "Irrigate 4-6 times during growing season",
      "Harvest when crop turns golden brown",
    ],
  },
  Maize: {
    icon: "🌽",
    season: "Kharif & Rabi",
    tips: [
      "Plant when soil temperature reaches 15°C",
      "Requires well-drained soil",
      "Water regularly but avoid waterlogging",
      "Harvest when kernels are plump and firm",
    ],
  },
  Cotton: {
    icon: "🌱",
    season: "Kharif (Apr-Oct)",
    tips: [
      "Needs warm climate with 180+ frost-free days",
      "Plant after soil reaches 18°C",
      "Requires moderate rainfall during growth",
      "Harvest when bolls are fully opened",
    ],
  },
  Sugarcane: {
    icon: "🎋",
    season: "Year-round",
    tips: [
      "Plant during February-March or October-November",
      "Needs abundant water supply",
      "Requires 200-250cm annual rainfall",
      "Harvest after 10-18 months depending on variety",
    ],
  },
  // Add default for unknown crops
  default: {
    icon: "🌿",
    season: "Season varies",
    tips: [
      "Follow local agricultural guidelines",
      "Consult with local agricultural extension officer",
      "Monitor soil health regularly",
      "Use appropriate fertilizers based on soil test",
    ],
  },
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  location,
  npk,
  cropRecommendation,
}) => {
  const { t } = useLanguage(); // Add this line

  if (!location) {
    return (
      <div className="glass p-6 rounded-xl">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto mb-2"></div>
            <p className="text-muted-foreground">{t('location.detecting')}</p>
          </div>
        </div>
      </div>
    );
  }

  const getCropTips = (cropName: string) => {
    return CROP_TIPS[cropName] || CROP_TIPS["default"];
  };

  // Use soil data from crop recommendation if available, otherwise use NPK input
  const displayNPK = cropRecommendation?.soil_data
    ? {
        n: Math.round(cropRecommendation.soil_data.nitrogen),
        p: Math.round(cropRecommendation.soil_data.phosphorous),
        k: Math.round(cropRecommendation.soil_data.potassium),
      }
    : npk;

  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-4">{t('recommendations.current_info')}</h3>

      {/* Location Information */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-primary">📍 {t('location.title')}</h4>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">{t('location.pincode')}:</span>
            <span className="ml-2 text-muted-foreground">
              {location?.pincode !== "Unknown"
                ? location?.pincode
                : t('location.detecting')}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-medium">{t('location.area')}:</span>
            <span className="ml-2 text-muted-foreground">
              {location?.state}, {location?.district}
            </span>
          </p>
        </div>
      </div>

      {/* NPK Values - Show source and use backend data */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-primary">
          🧪 {t('soil.npk_values')}
          {cropRecommendation?.soil_data && (
            <span className="text-xs font-normal text-green-600 ml-2">
              ✓ {t('soil.from_database')}
            </span>
          )}
          {!cropRecommendation?.soil_data && npk.n > 0 && (
            <span className="text-xs font-normal text-orange-600 ml-2">
              ({t('soil.manual_input')})
            </span>
          )}
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t('soil.nitrogen')}</p>
            <p className="font-bold text-lg text-primary">{displayNPK.n}</p>
          </div>
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t('soil.phosphorus')}</p>
            <p className="font-bold text-lg text-primary">{displayNPK.p}</p>
          </div>
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t('soil.potassium')}</p>
            <p className="font-bold text-lg text-primary">{displayNPK.k}</p>
          </div>
        </div>

        {/* Show pH and additional soil info if available */}
        {cropRecommendation?.soil_data && (
          <div className="mt-3 p-3 bg-secondary/30 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <p>
                <strong>{t('soil.ph')}:</strong>{" "}
                {cropRecommendation.soil_data.ph.toFixed(1)}
              </p>
              {cropRecommendation?.weather_data && (
                <>
                  <p>
                    <strong>{t('weather.temperature')}:</strong>{" "}
                    {cropRecommendation.weather_data.temperature.toFixed(1)}°C
                  </p>
                  <p>
                    <strong>{t('weather.rainfall')}:</strong>{" "}
                    {cropRecommendation.weather_data.rainfall.toFixed(0)}mm
                  </p>
                  <p>
                    <strong>{t('weather.year')}:</strong>{" "}
                    {cropRecommendation.weather_data.year}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
            <p>
              <strong>Debug:</strong>
            </p>
            <p>
              Manual NPK: N:{npk.n}, P:{npk.p}, K:{npk.k}
            </p>
            {cropRecommendation?.soil_data && (
              <p>
                Backend NPK: N:
                {Math.round(cropRecommendation.soil_data.nitrogen)}, P:
                {Math.round(cropRecommendation.soil_data.phosphorous)}, K:
                {Math.round(cropRecommendation.soil_data.potassium)}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Crop Recommendations with Growing Tips */}
      <div>
        <h4 className="font-medium mb-3 text-primary">
          🌾 {t('recommendations.ai_tips')}
        </h4>
        {cropRecommendation && cropRecommendation.recommended_crops ? (
          <div className="space-y-4">
            {cropRecommendation.recommended_crops
              .slice(0, 3)
              .map((crop, index) => {
                const tips = getCropTips(crop.crop);
                return (
                  <div
                    key={index}
                    className="border border-primary/20 rounded-lg p-4 bg-gradient-to-r from-primary/5 to-primary/10"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{tips.icon}</span>
                      <div>
                        <h5 className="font-semibold text-lg">{crop.crop}</h5>
                        <p className="text-xs text-primary font-medium">
                          {t('recommendations.rank')} #{index + 1} • {tips.season}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h6 className="font-medium text-sm text-primary">
                        💡 {t('recommendations.growing_tips')}:
                      </h6>
                      <ul className="space-y-1">
                        {tips.tips.map((tip, tipIndex) => (
                          <li
                            key={tipIndex}
                            className="text-xs text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            <div className="text-xs text-center text-muted-foreground mt-3">
              {t('recommendations.based_on_pincode')}: {cropRecommendation.pincode}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            {location.pincode === "Unknown" ? (
              <div>
                <div className="animate-pulse mb-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-full mx-auto"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('recommendations.waiting_location')}
                </p>
              </div>
            ) : (
              <div>
                <div className="animate-pulse mb-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-full mx-auto"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('recommendations.fetching_for')} {location.pincode}...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
