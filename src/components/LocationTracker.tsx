import React, { useEffect } from "react";
import { reverseGeocode } from "../services/LocationService";

interface Location {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  block: string;
  pincode: string; // Add pincode to the location interface
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
        const address = (await reverseGeocode(latitude, longitude)) || {};

        // Extract pincode from the reverse geocoding result
        const pincode = String(address.postcode || "Unknown");

        const locationData: Location = {
          latitude,
          longitude,
          state: String(address.state || address.county || "Unknown"),
          district: String(
            address.county || address.district || address.city || "Unknown"
          ),
          block: String(
            address.suburb ||
              address.town ||
              address.village ||
              address.city ||
              "Unknown"
          ),
          pincode, // Include pincode in the location data
        };

        onLocationChange(locationData);
      } catch (e) {
        console.error("Error detecting location:", e);
      }
    });
  }, [onLocationChange]);

  return null; // This component only handles location detection
};

export default LocationTracker;
