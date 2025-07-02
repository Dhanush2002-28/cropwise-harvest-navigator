import React, { useEffect, useState } from "react";
import { reverseGeocode } from "../services/LocationService";
import { MapPin, Navigation, Edit, AlertCircle } from "lucide-react";

interface Location {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  block: string;
  pincode: string;
}

interface LocationTrackerProps {
  onLocationChange: (location: Location) => void;
  onCropRecommendation?: (recommendation: unknown) => void;
}

const LocationTracker: React.FC<LocationTrackerProps> = ({
  onLocationChange,
  onCropRecommendation,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualPincode, setManualPincode] = useState("");
  const [detectedLocation, setDetectedLocation] = useState<Location | null>(
    null
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, ""); // Remove trailing slash if present

  const fetchCropRecommendation = async (pincode: string) => {
    if (pincode && pincode !== "Unknown") {
      try {
        console.log("Fetching crop recommendation for pincode:", pincode);

        const response = await fetch(`${BACKEND_URL}/recommend-crop`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ pincode: pincode }), // Make sure pincode is sent as an object
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Crop Recommendation data:", data);

        if (onCropRecommendation) {
          onCropRecommendation(data);
        }
      } catch (error) {
        console.error("Error fetching crop recommendation:", error);
        setError("Failed to fetch crop recommendations");
      }
    }
  };

  const createFallbackLocation = () => {
    const fallbackLocation: Location = {
      latitude: 0,
      longitude: 0,
      state: "Unknown",
      district: "Unknown",
      block: "Unknown",
      pincode: "Unknown",
    };
    onLocationChange(fallbackLocation);
  };

  const handleManualPincode = (pincode: string) => {
    const locationData: Location = {
      latitude: 0,
      longitude: 0,
      state: "Manual Entry",
      district: "Manual Entry",
      block: "Manual Entry",
      pincode: pincode,
    };

    setDetectedLocation(locationData);
    onLocationChange(locationData);
    fetchCropRecommendation(pincode);
    setIsLoading(false);
    setError(null);
  };

  const handleManualSubmit = () => {
    if (manualPincode.length === 6) {
      handleManualPincode(manualPincode);
      setShowManualInput(false);
      setManualPincode("");
    }
  };

  const handleGeolocation = async () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      createFallbackLocation();
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const address = await reverseGeocode(latitude, longitude);
          const addressData = address.address || address;

          const pincode = String(
            addressData.postcode ||
              addressData.postal_code ||
              address.postcode ||
              address.postal_code ||
              addressData.zipcode ||
              addressData.zip ||
              "Unknown"
          );

          const locationData: Location = {
            latitude,
            longitude,
            state: String(
              addressData.state ||
                addressData.county ||
                addressData.state_district ||
                "Unknown"
            ),
            district: String(
              addressData.county ||
                addressData.district ||
                addressData.city ||
                addressData.state_district ||
                "Unknown"
            ),
            block: String(
              addressData.suburb ||
                addressData.town ||
                addressData.village ||
                addressData.city ||
                addressData.residential ||
                "Unknown"
            ),
            pincode,
          };

          setDetectedLocation(locationData);
          onLocationChange(locationData);

          if (pincode !== "Unknown") {
            await fetchCropRecommendation(pincode);
          }
        } catch (error) {
          console.error("Error in reverse geocoding:", error);
          setError("Failed to get location details");
          createFallbackLocation();
        }

        setIsLoading(false);
      },
      (error) => {
        let errorMessage = "Location access denied";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Please enable location access to get personalized crop recommendations";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          default:
            errorMessage = "Unable to detect location";
            break;
        }

        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000,
      }
    );
  };

  useEffect(() => {
    handleGeolocation();
  }, []);

  return (
    <div className="glass p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Location Detection
        </h3>
        {!isLoading && !showManualInput && (
          <button
            onClick={() => setShowManualInput(true)}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Manual Entry
          </button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
          <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
          <div>
            <p className="font-medium">Detecting your location...</p>
            <p className="text-sm text-muted-foreground">
              Please allow location access when prompted
            </p>
          </div>
        </div>
      )}

      {/* Error State with Better CTA */}
      {error && !showManualInput && (
        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-1">
                Location Detection Failed
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                {error}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleGeolocation}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={() => setShowManualInput(true)}
                  className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-md text-sm hover:bg-primary/20 transition-colors"
                >
                  Enter Pincode Manually
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success State with Location Info */}
      {!isLoading && !error && detectedLocation && !showManualInput && (
        <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
              <MapPin className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">
                Location Detected Successfully
              </h4>
              <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <p>
                  <strong>Pincode:</strong> {detectedLocation.pincode}
                </p>
                <p>
                  <strong>Area:</strong> {detectedLocation.district},{" "}
                  {detectedLocation.state}
                </p>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                ✓ Crop recommendations are being generated based on your
                location
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Manual Input Form - Better Positioned */}
      {showManualInput && (
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Enter Your Pincode
            </h4>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="manual-pincode"
                  className="block text-sm font-medium mb-1"
                >
                  6-Digit Pincode
                </label>
                <input
                  id="manual-pincode"
                  type="text"
                  value={manualPincode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setManualPincode(value);
                  }}
                  placeholder="e.g., 560001"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  maxLength={6}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Examples: 560001 (Bengaluru), 400001 (Mumbai), 110001 (Delhi)
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleManualSubmit}
                  disabled={manualPincode.length !== 6}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Get Recommendations
                </button>
                <button
                  onClick={() => {
                    setShowManualInput(false);
                    setManualPincode("");
                  }}
                  className="px-4 py-2 border border-border rounded-md text-sm hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;

// Update the interface for crop recommendation response:

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
