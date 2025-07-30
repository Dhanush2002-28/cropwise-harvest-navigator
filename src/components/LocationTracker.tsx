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
    <div className="bg-card text-card-foreground border border-border shadow-lg p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <MapPin className="w-5 h-5 text-primary" />
          Location Detection
        </h3>
        {/* Manual Entry button removed. Only automatic detection remains. */}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg border border-border">
          <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
          <div>
            <p className="font-medium text-foreground">
              Detecting your location...
            </p>
            <p className="text-sm text-muted-foreground">
              Please allow location access when prompted
            </p>
          </div>
        </div>
      )}

      {/* Error State with Better CTA */}
      {error && !showManualInput && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-destructive mb-1">
                Location Detection Failed
              </h4>
              <p className="text-sm text-destructive/80 mb-3">{error}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleGeolocation}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success State with Location Info */}
      {!isLoading && !error && detectedLocation && !showManualInput && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-primary rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
              <MapPin className="w-3 h-3 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-primary mb-1">
                Location Detected Successfully
              </h4>
              <div className="text-sm text-primary/80 space-y-1">
                <p>
                  <strong>Pincode:</strong> {detectedLocation.pincode}
                </p>
                <p>
                  <strong>Area:</strong> {detectedLocation.district},{" "}
                  {detectedLocation.state}
                </p>
              </div>
              <p className="text-xs text-primary/70 mt-2">
                ✓ Crop recommendations are being generated based on your
                location
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Manual pincode entry removed. Only automatic location detection and display remain. */}
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
