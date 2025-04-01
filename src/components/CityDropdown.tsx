
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

// Sample of Indian locations (would be much larger in production)
const indianLocations = [
  // Major cities
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lon: 72.8777, type: "city" },
  { name: "Delhi", state: "Delhi", lat: 28.6139, lon: 77.2090, type: "city" },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lon: 77.5946, type: "city" },
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lon: 78.4867, type: "city" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707, type: "city" },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lon: 88.3639, type: "city" },
  // Towns
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lon: 77.1734, type: "town" },
  { name: "Ooty", state: "Tamil Nadu", lat: 11.4102, lon: 76.6950, type: "town" },
  { name: "Darjeeling", state: "West Bengal", lat: 27.0410, lon: 88.2663, type: "town" },
  { name: "Pushkar", state: "Rajasthan", lat: 26.4872, lon: 74.5503, type: "town" },
  // Villages
  { name: "Khajuraho", state: "Madhya Pradesh", lat: 24.8318, lon: 79.9199, type: "village" },
  { name: "Hampi", state: "Karnataka", lat: 15.3350, lon: 76.4600, type: "village" },
  { name: "Mawlynnong", state: "Meghalaya", lat: 25.2025, lon: 91.9526, type: "village" },
  { name: "Ziro", state: "Arunachal Pradesh", lat: 27.5434, lon: 93.8324, type: "village" },
  { name: "Orchha", state: "Madhya Pradesh", lat: 25.3507, lon: 78.6422, type: "village" },
  // Additional cities
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lon: 73.8567, type: "city" },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lon: 72.5714, type: "city" },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lon: 75.7873, type: "city" },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lon: 80.9462, type: "city" },
  { name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lon: 80.3319, type: "city" },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lon: 79.0882, type: "city" },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lon: 75.8577, type: "city" },
  { name: "Thane", state: "Maharashtra", lat: 19.2183, lon: 72.9781, type: "city" },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lon: 77.4126, type: "city" },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lon: 83.2185, type: "city" },
  { name: "Patna", state: "Bihar", lat: 25.5941, lon: 85.1376, type: "city" },
  // Additional villages
  { name: "Bishnupur", state: "West Bengal", lat: 23.0800, lon: 87.3200, type: "village" },
  { name: "Malana", state: "Himachal Pradesh", lat: 32.0643, lon: 77.2477, type: "village" },
  { name: "Spiti Valley", state: "Himachal Pradesh", lat: 32.2464, lon: 78.0349, type: "village" },
  { name: "Majuli", state: "Assam", lat: 26.9526, lon: 94.1680, type: "village" },
  { name: "Vadakara", state: "Kerala", lat: 11.6085, lon: 75.5917, type: "village" },
  { name: "Mandawa", state: "Rajasthan", lat: 28.0552, lon: 75.1531, type: "village" },
  { name: "Nako", state: "Himachal Pradesh", lat: 31.8800, lon: 78.6300, type: "village" },
  { name: "Bir", state: "Himachal Pradesh", lat: 32.0335, lon: 76.7278, type: "village" },
  { name: "Kasol", state: "Himachal Pradesh", lat: 32.0100, lon: 77.3152, type: "village" },
  { name: "Tawang", state: "Arunachal Pradesh", lat: 27.5865, lon: 91.8594, type: "village" },
  { name: "Munsiyari", state: "Uttarakhand", lat: 30.0717, lon: 80.2358, type: "village" },
  { name: "Pithoragarh", state: "Uttarakhand", lat: 29.5828, lon: 80.2181, type: "village" },
  { name: "Chamba", state: "Himachal Pradesh", lat: 32.5533, lon: 76.1258, type: "village" },
  { name: "Tharangambadi", state: "Tamil Nadu", lat: 11.0273, lon: 79.8564, type: "village" },
  { name: "Chettinad", state: "Tamil Nadu", lat: 10.1098, lon: 77.9843, type: "village" },
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
  const [filteredLocations, setFilteredLocations] = useState(indianLocations);

  useEffect(() => {
    // Filter locations based on search input
    if (searchValue) {
      const filtered = indianLocations.filter(location => 
        location.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        location.state.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(indianLocations);
    }
  }, [searchValue]);

  const handleLocationSelect = (location: typeof indianLocations[0]) => {
    const { soilType, climate } = getSoilAndClimateFromLocation(location.lat, location.lon);
    const season = getCurrentSeason(location.lat);
    
    const locationData: Location = {
      latitude: location.lat,
      longitude: location.lon,
      city: location.name,
      region: location.state,
      country: "India",
      soilType,
      climate,
      season
    };
    
    onLocationSelect(locationData);
    setOpen(false);
    toast.success(t('location.selected', { city: location.name }));
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
            {searchValue || t('location.search_location')}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder={t('location.type_to_search')} 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>{t('location.no_locations_found')}</CommandEmpty>
              <CommandGroup heading={t('location.suggestions')}>
                {filteredLocations.slice(0, 10).map((location) => (
                  <CommandItem
                    key={`${location.name}-${location.state}`}
                    value={`${location.name}-${location.state}`}
                    onSelect={() => handleLocationSelect(location)}
                  >
                    <span>
                      {location.name}, {location.state} 
                      <span className="ml-1 text-xs text-muted-foreground">({location.type})</span>
                    </span>
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
