
import { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import { getSoilAndClimateFromLocation, getCurrentSeason } from '../services/LocationService';

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
  country?: string;
  soilType?: string;
  climate?: string;
  season?: string;
}

interface LocationTrackerProps {
  onLocationChange: (location: Location) => void;
}

const LocationTracker = ({ onLocationChange }: LocationTrackerProps) => {
  const { t } = useLanguage();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      toast.error(t('location.error'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Get soil type and climate for this location
        const { soilType, climate } = getSoilAndClimateFromLocation(latitude, longitude);
        
        // Get current growing season
        const season = getCurrentSeason(latitude);
        
        try {
          // Try to get location name from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          const locationData: Location = {
            latitude,
            longitude,
            city: data.address?.city || data.address?.town || data.address?.village || 'Unknown',
            region: data.address?.state || data.address?.county || 'Unknown',
            country: data.address?.country || 'Unknown',
            soilType,
            climate,
            season
          };
          
          setLocation(locationData);
          onLocationChange(locationData);
          setLoading(false);
          toast.success(t('location.detecting'));
        } catch (err) {
          // If reverse geocoding fails, still save coordinates with soil and climate
          const locationData: Location = { 
            latitude, 
            longitude,
            soilType,
            climate,
            season
          };
          setLocation(locationData);
          onLocationChange(locationData);
          setLoading(false);
          toast.success(t('location.detecting'));
        }
      },
      (err) => {
        setError(`${t('location.error')}: ${err.message}`);
        setLoading(false);
        toast.error(`${t('location.error')}: ${err.message}`);
      }
    );
  };

  useEffect(() => {
    // Get location on component mount
    getLocation();
  }, []);

  return (
    <div className="glass rounded-xl p-6 mb-8 card-shine">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-primary" />
        {t('location.title')}
      </h3>
      
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <span className="ml-2">{t('location.detecting')}</span>
        </div>
      ) : error ? (
        <div>
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={getLocation}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {t('location.try_again')}
          </button>
        </div>
      ) : location ? (
        <div className="space-y-2">
          {location.city && (
            <p className="text-foreground">
              <span className="font-medium">{t('location.city')}:</span> {location.city}
            </p>
          )}
          {location.region && (
            <p className="text-foreground">
              <span className="font-medium">{t('location.region')}:</span> {location.region}
            </p>
          )}
          {location.country && (
            <p className="text-foreground">
              <span className="font-medium">{t('location.country')}:</span> {location.country}
            </p>
          )}
          <p className="text-muted-foreground text-sm">
            {t('location.coordinates')}: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </p>
          <button
            onClick={getLocation}
            className="mt-2 flex items-center text-primary hover:text-primary/80 transition-colors text-sm"
          >
            <MapPin className="w-4 h-4 mr-1" />
            {t('location.refresh')}
          </button>
        </div>
      ) : (
        <button
          onClick={getLocation}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          {t('location.detect')}
        </button>
      )}
    </div>
  );
};

export default LocationTracker;
