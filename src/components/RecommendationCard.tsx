import React from "react";

interface Location {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  block: string;
  pincode: string;
}

// Rename to avoid conflict with imported interface
interface PincodeCropRecommendation {
  pincode: string;
  location: {
    state: string;
    district: string;
    block: string;
  };
  recommended_crops: Array<{
    crop: string;
    probability: number;
  }>;
}

interface RecommendationCardProps {
  location: Location | null;
  npk: { n: number; p: number; k: number };
  cropRecommendation?: PincodeCropRecommendation | null; // Use renamed interface
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  location,
  npk,
  cropRecommendation,
}) => {
  if (!location) {
    return (
      <div className="glass p-6 rounded-xl">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto mb-2"></div>
            <p className="text-muted-foreground">Detecting location...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-4">Current Information</h3>

      {/* Location Information */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-primary">📍 Location</h4>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Pincode:</span>
            <span className="ml-2 text-muted-foreground">
              {location.pincode !== "Unknown"
                ? location.pincode
                : "Detecting..."}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-medium">Area:</span>
            <span className="ml-2 text-muted-foreground">
              {location.state}, {location.district}
            </span>
          </p>
        </div>
      </div>

      {/* NPK Values */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-primary">🧪 Soil NPK Values</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Nitrogen</p>
            <p className="font-bold text-lg text-primary">{npk.n}</p>
          </div>
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Phosphorus</p>
            <p className="font-bold text-lg text-primary">{npk.p}</p>
          </div>
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Potassium</p>
            <p className="font-bold text-lg text-primary">{npk.k}</p>
          </div>
        </div>
      </div>

      {/* Crop Recommendations */}
      <div>
        <h4 className="font-medium mb-3 text-primary">🌾 AI Recommendations</h4>
        {cropRecommendation && cropRecommendation.recommended_crops ? (
          <div className="space-y-3">
            {cropRecommendation.recommended_crops
              .slice(0, 3)
              .map((crop, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-sm">{crop.crop}</span>
                    <div className="text-xs text-muted-foreground">
                      Rank #{index + 1}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-primary">
                      {(crop.probability * 100).toFixed(1)}%
                    </span>
                    <div className="text-xs text-muted-foreground">
                      confidence
                    </div>
                  </div>
                </div>
              ))}
            <div className="text-xs text-center text-muted-foreground mt-3">
              Based on pincode: {cropRecommendation.pincode}
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
                  Waiting for location data...
                </p>
              </div>
            ) : (
              <div>
                <div className="animate-pulse mb-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-full mx-auto"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Fetching recommendations for {location.pincode}...
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
