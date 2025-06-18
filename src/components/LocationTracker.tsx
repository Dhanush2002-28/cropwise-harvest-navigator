import React, { useEffect } from "react";
import { reverseGeocode } from "../services/LocationService";

interface Location {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  block: string;
  // ...other fields if needed
}

interface LocationTrackerProps {
  onLocationChange: (location: Location) => void;
}

const LocationTracker: React.FC<LocationTrackerProps> = ({
  onLocationChange,
}) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const address = await reverseGeocode(latitude, longitude);

        // Map address fields to backend keys
        const state = address.state || address.county || "Unknown";
        const district =
          address.county || address.district || address.city || "Unknown";
        const block =
          address.suburb ||
          address.town ||
          address.village ||
          address.city ||
          address.hamlet ||
          "Unknown";

        const locationData: Location = {
          latitude,
          longitude,
          state,
          district,
          block,
        };

        onLocationChange(locationData);
      } catch (e) {
        // Handle error (show message, fallback, etc.)
        onLocationChange({
          latitude,
          longitude,
          state: "Unknown",
          district: "Unknown",
          block: "Unknown",
        });
      }
    });
  }, [onLocationChange]);

  return null; // This component only handles location detection
};

export default LocationTracker;
