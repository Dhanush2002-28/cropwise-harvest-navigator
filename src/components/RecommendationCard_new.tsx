import React from "react";
import { useLanguage } from "../context/LanguageContext";

interface Location {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  block: string;
  pincode: string;
}

interface CropRecommendation {
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
  cropRecommendation?: CropRecommendation | null;
}

// Crop tips data
const CROP_TIPS: {
  [key: string]: { icon: string; season: string; tips: string[] };
} = {
  rice: {
    icon: "🌾",
    season: "Kharif (June-Nov)",
    tips: [
      "Requires flooded fields for first 6-8 weeks",
      "Plant during monsoon season",
      "Needs 20-25°C temperature for optimal growth",
      "Harvest when grains turn golden",
    ],
  },
  wheat: {
    icon: "🌾",
    season: "Rabi (Nov-Apr)",
    tips: [
      "Sow after monsoon season ends",
      "Requires cool weather for growth",
      "Irrigate 4-6 times during growing season",
      "Harvest when crop turns golden",
    ],
  },
  cotton: {
    icon: "🌱",
    season: "Kharif (Apr-Oct)",
    tips: [
      "Requires warm climate (21-30°C)",
      "Deep, well-drained soil preferred",
      "Needs adequate moisture during flowering",
      "Regular pest monitoring required",
    ],
  },
  sugarcane: {
    icon: "🎋",
    season: "Year-round",
    tips: [
      "Requires 12-15 months growing period",
      "Heavy water requirement",
      "Rich, well-drained soil needed",
      "Regular earthing up required",
    ],
  },
  default: {
    icon: "🌿",
    season: "Variable",
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
  const { t } = useLanguage();

  if (!location) {
    return (
      <div
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg mx-auto w-[80vw] p-6"
        style={{ maxWidth: "1400px" }}
      >
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Detecting location...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getCropTips = (cropName: string) => {
    return CROP_TIPS[cropName.toLowerCase()] || CROP_TIPS["default"];
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
    <div
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg mx-auto w-[80vw] transition-all"
      style={{ maxWidth: "1400px" }}
    >
      {/* Minimalistic Header */}
      <div className="px-8 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span className="text-lg">🌱</span>
          Crop Recommendations & Analysis
        </h3>
      </div>

      <div className="px-8 py-6">
        {/* Horizontal Information Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Location Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <span className="text-base">📍</span> Location
            </h4>
            <div className="space-y-1 text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">PIN:</span>{" "}
                {location?.pincode !== "Unknown"
                  ? location?.pincode
                  : "Detecting..."}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Area:</span> {location?.state},{" "}
                {location?.district}
              </div>
            </div>
          </div>

          {/* NPK Values */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <span className="text-base">🧪</span> NPK Values
              {cropRecommendation?.soil_data && (
                <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                  Database
                </span>
              )}
              {!cropRecommendation?.soil_data && npk.n > 0 && (
                <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                  Manual
                </span>
              )}
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  N
                </div>
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {displayNPK.n}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  P
                </div>
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {displayNPK.p}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  K
                </div>
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {displayNPK.k}
                </div>
              </div>
            </div>
          </div>

          {/* Weather Data */}
          {cropRecommendation?.soil_data && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <span className="text-base">🌤️</span> Environment
              </h4>
              <div className="space-y-1 text-sm">
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">pH:</span>{" "}
                  {cropRecommendation.soil_data.ph.toFixed(1)}
                </div>
                {cropRecommendation?.weather_data && (
                  <>
                    <div className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Temp:</span>{" "}
                      {cropRecommendation.weather_data.temperature.toFixed(1)}°C
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Rain:</span>{" "}
                      {cropRecommendation.weather_data.rainfall.toFixed(0)}mm
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Summary Stats */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <span className="text-base">📊</span> Analysis
            </h4>
            <div className="space-y-1 text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Crops:</span>{" "}
                {cropRecommendation?.recommended_crops?.length || 0} found
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Based on:</span>{" "}
                {cropRecommendation?.pincode || "Manual"}
              </div>
            </div>
          </div>
        </div>

        {/* Crop Recommendations - Horizontal Layout */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="text-lg">🌾</span> Recommended Crops
          </h4>
          {cropRecommendation && cropRecommendation.recommended_crops ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cropRecommendation.recommended_crops
                .slice(0, 4)
                .map((crop, index) => {
                  const tips = getCropTips(crop.crop);
                  return (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all"
                    >
                      {/* Crop Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{tips.icon}</span>
                        <div className="text-right">
                          <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                            #{index + 1}
                          </span>
                        </div>
                      </div>

                      {/* Crop Name */}
                      <h5 className="font-medium text-lg text-gray-900 dark:text-gray-100 mb-1">
                        {crop.crop}
                      </h5>

                      {/* Suitability */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {Math.round(crop.probability * 100)}% Suitable
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gray-600 dark:bg-gray-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${crop.probability * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Season */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <span className="font-medium">Season:</span>{" "}
                        {tips.season}
                      </div>

                      {/* Top Tips */}
                      <div>
                        <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Key Tips:
                        </h6>
                        <ul className="space-y-1">
                          {tips.tips.slice(0, 2).map((tip, tipIndex) => (
                            <li
                              key={tipIndex}
                              className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1"
                            >
                              <span className="text-gray-500 dark:text-gray-500 mt-0.5">
                                •
                              </span>
                              <span className="leading-relaxed">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              {location?.pincode === "Unknown" ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                  <div className="animate-pulse mb-4">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Waiting for location...
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                  <div className="animate-pulse mb-4">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fetching recommendations for {location?.pincode}...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
