import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import SoilAnalytics from "./SoilAnalytics";
import CropDetail from "./CropDetail";

interface Location {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  block: string;
  pincode: string;
}

interface CropRecommendation {
  pincode?: string;
  location?: {
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
  recommended_crops: Array<{ crop: string; probability: number }>;
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

// Helper function for crop tips
function getCropTips(cropName: string) {
  return CROP_TIPS[cropName.toLowerCase()] || CROP_TIPS["default"];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  location,
  npk,
  cropRecommendation,
}) => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCropClick = async (cropName: string) => {
    setIsTransitioning(true);
    // Small delay for smooth transition
    await new Promise((resolve) => setTimeout(resolve, 150));
    setSelectedCrop(cropName);
    setIsTransitioning(false);
  };

  // If transitioning, show a loading state
  if (isTransitioning) {
    return (
      <div className="w-full max-w-6xl flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading detailed analytics...</p>
        </div>
      </div>
    );
  }

  // If a crop is selected, show the detailed view
  if (selectedCrop) {
    return (
      <div className="w-full max-w-6xl">
        <CropDetail
          cropName={selectedCrop}
          onBack={() => setSelectedCrop(null)}
          soilData={cropRecommendation?.soil_data}
        />
      </div>
    );
  }

  if (!location) {
    return (
      <div
        className="relative w-[85vw] transition-all shadow-lg rounded-2xl overflow-hidden"
        style={{ maxWidth: "none", minWidth: "85vw" }}
      >
        {/* Green gradient overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
        {/* Card background using website colors */}
        <div className="relative z-10 bg-card text-card-foreground border border-border rounded-2xl w-full h-full p-8 flex flex-col items-center justify-center min-h-[200px]">
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-muted rounded-full mx-auto mb-2"></div>
            <p className="text-foreground">Detecting location...</p>
          </div>
        </div>
      </div>
    );
  }

  // Use soil data from crop recommendation if available, otherwise use NPK input
  const displayNPK = cropRecommendation?.soil_data
    ? {
        n:
          typeof cropRecommendation.soil_data.nitrogen === "number"
            ? Math.round(cropRecommendation.soil_data.nitrogen)
            : cropRecommendation.soil_data.nitrogen || "-",
        p:
          typeof cropRecommendation.soil_data.phosphorous === "number"
            ? Math.round(cropRecommendation.soil_data.phosphorous)
            : cropRecommendation.soil_data.phosphorous || "-",
        k:
          typeof cropRecommendation.soil_data.potassium === "number"
            ? Math.round(cropRecommendation.soil_data.potassium)
            : cropRecommendation.soil_data.potassium || "-",
      }
    : npk;

  return (
    <div
      className="relative w-[85vw] transition-all shadow-lg rounded-2xl overflow-hidden"
      style={{ maxWidth: "none", minWidth: "85vw" }}
    >
      {/* Green gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
      {/* Card background using website colors */}
      <div className="relative z-10 bg-card text-card-foreground border border-border rounded-2xl w-full h-full">
        {/* Header */}
        <div className="px-8 py-4 border-b border-border bg-secondary/50 rounded-t-2xl">
          <h3 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
            <span className="text-lg">🌱</span>
            Crop Recommendations & Analysis
          </h3>
        </div>

        <div className="px-8 py-6">
          {/* Horizontal Information Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Location Information */}
            <div className="bg-secondary rounded-md p-4 border border-border">
              <h4 className="text-base font-semibold mb-2 flex items-center gap-2 text-foreground">
                <span className="text-base">📍</span> Location
              </h4>
              <div className="space-y-1 text-sm">
                <div className="text-foreground">
                  <span className="font-medium">PIN:</span>{" "}
                  {location?.pincode !== "Unknown"
                    ? location?.pincode
                    : "Detecting..."}
                </div>
                <div className="text-foreground">
                  <span className="font-medium">Area:</span> {location?.state},{" "}
                  {location?.district}
                </div>
              </div>
            </div>

            {/* NPK Values */}
            <div className="bg-secondary rounded-md p-4 border border-border">
              <h4 className="text-base font-semibold mb-2 flex items-center gap-2 text-foreground">
                <span className="text-base">🧪</span> NPK Values
                {cropRecommendation?.soil_data && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">
                    Database
                  </span>
                )}
                {!cropRecommendation?.soil_data && npk.n > 0 && (
                  <span className="text-xs bg-muted text-foreground px-2 py-0.5 rounded font-medium">
                    Manual
                  </span>
                )}
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-xs text-primary font-semibold">N</div>
                  <div className="text-lg font-semibold text-foreground">
                    {displayNPK.n}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-primary font-semibold">P</div>
                  <div className="text-lg font-semibold text-foreground">
                    {displayNPK.p}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-primary font-semibold">K</div>
                  <div className="text-lg font-semibold text-foreground">
                    {displayNPK.k}
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Data */}
            {cropRecommendation?.soil_data && (
              <div className="bg-secondary rounded-md p-4 border border-border">
                <h4 className="text-base font-semibold mb-2 flex items-center gap-2 text-foreground">
                  <span className="text-base">🌤️</span> Environment
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="text-foreground">
                    <span className="font-medium">pH:</span>{" "}
                    {typeof cropRecommendation.soil_data.ph === "number"
                      ? cropRecommendation.soil_data.ph.toFixed(1)
                      : cropRecommendation.soil_data.ph || "-"}
                  </div>
                  {cropRecommendation?.weather_data && (
                    <>
                      <div className="text-foreground">
                        <span className="font-medium">Temp:</span>{" "}
                        {typeof cropRecommendation.weather_data.temperature ===
                        "number"
                          ? cropRecommendation.weather_data.temperature.toFixed(
                              1
                            )
                          : "-"}
                        °C
                      </div>
                      <div className="text-foreground">
                        <span className="font-medium">Rain:</span>{" "}
                        {typeof cropRecommendation.weather_data.rainfall ===
                        "number"
                          ? cropRecommendation.weather_data.rainfall.toFixed(0)
                          : "-"}
                        mm
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Summary Stats */}
            <div className="bg-secondary rounded-md p-4 border border-border">
              <h4 className="text-base font-semibold mb-2 flex items-center gap-2 text-foreground">
                <span className="text-base">📊</span> Analysis
              </h4>
              <div className="space-y-1 text-sm">
                <div className="text-foreground">
                  <span className="font-medium">Crops:</span>{" "}
                  {cropRecommendation?.recommended_crops?.length || 0} found
                </div>
                <div className="text-foreground">
                  <span className="font-medium">Based on:</span>{" "}
                  {cropRecommendation?.pincode || "Manual"}
                </div>
              </div>
            </div>
          </div>

          {/* Crop Recommendations - Horizontal Layout */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold flex items-center gap-2 text-foreground">
                <span className="text-lg">🌾</span> Recommended Crops
              </h4>
              <p className="text-sm text-muted-foreground">
                Click any crop for detailed analytics 📊
              </p>
            </div>
            {cropRecommendation && cropRecommendation.recommended_crops ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cropRecommendation.recommended_crops
                  .slice(0, 4)
                  .map((cropObj, index) => {
                    const tips = getCropTips(cropObj.crop);
                    return (
                      <div
                        key={index}
                        onClick={() => handleCropClick(cropObj.crop)}
                        className="crop-card bg-secondary rounded-lg p-6 border border-border hover:bg-accent"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleCropClick(cropObj.crop);
                          }
                        }}
                      >
                        {/* Crop Header */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl">{tips.icon}</span>
                          <div className="text-right">
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded font-medium">
                              #{index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Crop Name */}
                        <h5 className="font-semibold text-lg mb-1 text-foreground">
                          {cropObj.crop}
                        </h5>
                        <p className="text-xs text-primary mb-2 font-medium">
                          📊 Click for detailed analysis
                        </p>

                        {/* Season */}
                        <div className="text-xs text-foreground mb-3">
                          <span className="font-medium">Season:</span>{" "}
                          {tips.season}
                        </div>

                        {/* Top Tips */}
                        <div>
                          <h6 className="text-xs font-semibold text-foreground mb-2">
                            Key Tips:
                          </h6>
                          <ul className="space-y-1">
                            {tips.tips.slice(0, 2).map((tip, tipIndex) => (
                              <li
                                key={tipIndex}
                                className="text-xs text-foreground flex items-start gap-1"
                              >
                                <span className="text-foreground mt-0.5">
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
                  <div className="bg-secondary rounded-lg p-8 border border-border">
                    <div className="animate-pulse mb-4">
                      <div className="w-8 h-8 bg-muted rounded-full mx-auto"></div>
                    </div>
                    <p className="text-muted-foreground">
                      Waiting for location...
                    </p>
                  </div>
                ) : (
                  <div className="bg-secondary rounded-lg p-8 border border-border">
                    <div className="animate-pulse mb-4">
                      <div className="w-8 h-8 bg-muted rounded-full mx-auto"></div>
                    </div>
                    <p className="text-muted-foreground">
                      Fetching recommendations for {location?.pincode}...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Soil Analytics Section */}
          {cropRecommendation?.soil_data && (
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                <span className="text-lg">📊</span> Soil Analytics
              </h4>
              <SoilAnalytics
                soilData={cropRecommendation.soil_data}
                recommendedCrops={cropRecommendation.recommended_crops}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
