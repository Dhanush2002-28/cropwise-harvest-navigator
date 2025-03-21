
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import { 
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { getSoilAndClimateFromLocation, getCurrentSeason } from '../services/LocationService';

// Major cities in India with their coordinates
const indianCities = [
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lon: 72.8777 },
  { name: "Delhi", state: "Delhi", lat: 28.6139, lon: 77.2090 },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lon: 77.5946 },
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lon: 78.4867 },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707 },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lon: 88.3639 },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lon: 73.8567 },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lon: 72.5714 },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lon: 75.7873 },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lon: 80.9462 },
  { name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lon: 80.3319 },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lon: 79.0882 },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lon: 75.8577 },
  { name: "Thane", state: "Maharashtra", lat: 19.2183, lon: 72.9781 },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lon: 77.4126 },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lon: 83.2185 },
  { name: "Patna", state: "Bihar", lat: 25.5941, lon: 85.1376 },
  { name: "Vadodara", state: "Gujarat", lat: 22.3072, lon: 73.1812 },
  { name: "Ludhiana", state: "Punjab", lat: 30.9010, lon: 75.8573 },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lon: 78.0081 },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lon: 82.9739 },
  { name: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lon: 74.7973 },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lon: 76.2673 },
  { name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lon: 76.9366 },
  { name: "Guwahati", state: "Assam", lat: 26.1445, lon: 91.7362 },
  { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lon: 76.7794 },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lon: 76.9558 },
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lon: 76.6394 },
  { name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lon: 85.8245 },
  { name: "Jamshedpur", state: "Jharkhand", lat: 22.8046, lon: 86.2029 },
  { name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lon: 78.0322 },
  { name: "Raipur", state: "Chhattisgarh", lat: 21.2514, lon: 81.6296 },
];

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

interface CityDropdownProps {
  onLocationSelect: (location: Location) => void;
}

const CityDropdown = ({ onLocationSelect }: CityDropdownProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCities, setFilteredCities] = useState(indianCities);

  useEffect(() => {
    // Filter cities based on search input
    if (searchValue) {
      const filtered = indianCities.filter(city => 
        city.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        city.state.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(indianCities);
    }
  }, [searchValue]);

  const handleCitySelect = (city: typeof indianCities[0]) => {
    const { soilType, climate } = getSoilAndClimateFromLocation(city.lat, city.lon);
    const season = getCurrentSeason(city.lat);
    
    const locationData: Location = {
      latitude: city.lat,
      longitude: city.lon,
      city: city.name,
      region: city.state,
      country: "India",
      soilType,
      climate,
      season
    };
    
    onLocationSelect(locationData);
    setOpen(false);
    toast.success(t('location.selected', { city: city.name }));
  };

  return (
    <div className="mt-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between"
            role="combobox"
            aria-expanded={open}
          >
            {t('location.select_city')}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder={t('location.search_cities')} 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>{t('location.no_cities_found')}</CommandEmpty>
              <CommandGroup heading={t('location.cities')}>
                {filteredCities.map((city) => (
                  <CommandItem
                    key={`${city.name}-${city.state}`}
                    value={`${city.name}-${city.state}`}
                    onSelect={() => handleCitySelect(city)}
                  >
                    <span>{city.name}, {city.state}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CityDropdown;
