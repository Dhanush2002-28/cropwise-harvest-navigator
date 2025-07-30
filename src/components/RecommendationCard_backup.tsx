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
            <p className="text-muted-foreground">{t("location.detecting")}</p>
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
    <div
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg mx-auto w-[80vw] transition-all"
      style={{ maxWidth: "1400px" }}
    >
      {/* Minimalistic Header */}
      <div className="px-8 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span className="text-lg">🌱</span>
          {t("recommendations.current_info")}
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
                <span className="font-medium">PIN:</span> {location?.pincode !== "Unknown" ? location?.pincode : "Detecting..."}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Area:</span> {location?.state}, {location?.district}
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
                <div className="text-xs text-gray-500 dark:text-gray-400">N</div>
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100">{displayNPK.n}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">P</div>
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100">{displayNPK.p}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">K</div>
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100">{displayNPK.k}</div>
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
                  <span className="font-medium">pH:</span> {cropRecommendation.soil_data.ph.toFixed(1)}
                </div>
                {cropRecommendation?.weather_data && (
                  <>
                    <div className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Temp:</span> {cropRecommendation.weather_data.temperature.toFixed(1)}°C
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Rain:</span> {cropRecommendation.weather_data.rainfall.toFixed(0)}mm
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
                <span className="font-medium">Crops:</span> {cropRecommendation?.recommended_crops?.length || 0} found
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Based on:</span> {cropRecommendation?.pincode || "Manual"}
              </div>
            </div>
          </div>
        </div>
            <h4 className="font-bold text-lg text-green-700 dark:text-green-300 flex items-center gap-3 mb-4">
              <span className="text-2xl">🧪</span> {t("soil.npk_values")}
              {cropRecommendation?.soil_data && (
                <span className="ml-2 px-2 py-1 rounded-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-semibold">
                  ✓ Database
                </span>
              )}
              {!cropRecommendation?.soil_data && npk.n > 0 && (
                <span className="ml-2 px-2 py-1 rounded-full bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-semibold">
                  Manual
                </span>
              )}
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/80 dark:bg-green-900/30 rounded-xl shadow-sm border border-green-200 dark:border-green-700">
                <p className="text-xs text-green-600 dark:text-green-400 mb-1 uppercase tracking-wide font-semibold">
                  N
                </p>
                <p className="font-bold text-2xl text-green-700 dark:text-green-300">
                  {displayNPK.n}
                </p>
              </div>
              <div className="text-center p-4 bg-white/80 dark:bg-green-900/30 rounded-xl shadow-sm border border-green-200 dark:border-green-700">
                <p className="text-xs text-green-600 dark:text-green-400 mb-1 uppercase tracking-wide font-semibold">
                  P
                </p>
                <p className="font-bold text-2xl text-green-700 dark:text-green-300">
                  {displayNPK.p}
                </p>
              </div>
              <div className="text-center p-4 bg-white/80 dark:bg-green-900/30 rounded-xl shadow-sm border border-green-200 dark:border-green-700">
                <p className="text-xs text-green-600 dark:text-green-400 mb-1 uppercase tracking-wide font-semibold">
                  K
                </p>
                <p className="font-bold text-2xl text-green-700 dark:text-green-300">
                  {displayNPK.k}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Weather info if available */}
        {cropRecommendation?.soil_data && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-900/50 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-lg text-amber-700 dark:text-amber-300 flex items-center gap-3 mb-4">
              <span className="text-2xl">🌤️</span> Additional Info
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/80 dark:bg-amber-900/30 rounded-xl p-3 text-center border border-amber-200 dark:border-amber-700">
                <p className="font-semibold text-amber-700 dark:text-amber-300">pH</p>
                <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{cropRecommendation.soil_data.ph.toFixed(1)}</p>
              </div>
              {cropRecommendation?.weather_data && (
                <>
                  <div className="bg-white/80 dark:bg-amber-900/30 rounded-xl p-3 text-center border border-amber-200 dark:border-amber-700">
                    <p className="font-semibold text-amber-700 dark:text-amber-300">Temp</p>
                    <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{cropRecommendation.weather_data.temperature.toFixed(1)}°C</p>
                  </div>
                  <div className="bg-white/80 dark:bg-amber-900/30 rounded-xl p-3 text-center border border-amber-200 dark:border-amber-700">
                    <p className="font-semibold text-amber-700 dark:text-amber-300">Rainfall</p>
                    <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{cropRecommendation.weather_data.rainfall.toFixed(0)}mm</p>
                  </div>
                  <div className="bg-white/80 dark:bg-amber-900/30 rounded-xl p-3 text-center border border-amber-200 dark:border-amber-700">
                    <p className="font-semibold text-amber-700 dark:text-amber-300">Year</p>
                    <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{cropRecommendation.weather_data.year}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Second Row: Crop Recommendations Cards */}
        <div>
          <h4 className="font-bold text-2xl text-primary flex items-center gap-3 mb-8 justify-center">
            <span className="text-3xl">🌾</span> {t("recommendations.ai_tips")}
          </h4>
          {cropRecommendation && cropRecommendation.recommended_crops ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cropRecommendation.recommended_crops
                .slice(0, 2)
                .map((crop, index) => {
                  const tips = getCropTips(crop.crop);
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/50 dark:to-green-900/50 rounded-3xl p-8 border-2 border-emerald-200 dark:border-emerald-800 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl"
                    >
                      {/* Crop Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <span className="text-5xl drop-shadow-sm">
                            {tips.icon}
                          </span>
                          <div>
                            <h5 className="font-bold text-2xl text-emerald-800 dark:text-emerald-200 tracking-tight">
                              {crop.crop}
                            </h5>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                              {Math.round(crop.probability * 100)}% Suitability
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="px-3 py-1 rounded-full bg-primary text-white text-sm font-bold shadow-lg">
                            Rank #{index + 1}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-semibold">
                            {tips.season}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="bg-emerald-200 dark:bg-emerald-800 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-green-600 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${crop.probability * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Growing Tips */}
                      <div>
                        <h6 className="font-bold text-lg text-emerald-700 dark:text-emerald-300 flex items-center gap-2 mb-4">
                          💡 Growing Tips
                        </h6>
                        <ul className="space-y-3">
                          {tips.tips.slice(0, 3).map((tip, tipIndex) => (
                            <li
                              key={tipIndex}
                              className="text-sm text-emerald-700 dark:text-emerald-300 flex items-start gap-3 bg-white/60 dark:bg-emerald-900/30 rounded-lg p-3 border border-emerald-200 dark:border-emerald-700"
                            >
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">•</span>
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
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                  <div className="animate-pulse mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto"></div>
                  </div>
                  <p className="text-lg text-muted-foreground font-medium">
                    {t("recommendations.waiting_location")}
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                  <div className="animate-pulse mb-4">
                    <div className="w-12 h-12 bg-blue-300/50 rounded-full mx-auto"></div>
                  </div>
                  <p className="text-lg text-blue-700 dark:text-blue-300 font-medium">
                    {t("recommendations.fetching_for")} {location?.pincode}...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Based on pincode info */}
          {cropRecommendation && (
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 inline-block">
                {t("recommendations.based_on_pincode")}: {cropRecommendation.pincode}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
