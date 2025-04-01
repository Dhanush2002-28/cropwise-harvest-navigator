
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

// Expanded list of Indian locations
const indianLocations = [
  // Major metropolitan cities
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lon: 72.8777, type: "city" },
  { name: "Delhi", state: "Delhi", lat: 28.6139, lon: 77.2090, type: "city" },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lon: 77.5946, type: "city" },
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lon: 78.4867, type: "city" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707, type: "city" },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lon: 88.3639, type: "city" },
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
  { name: "Vadodara", state: "Gujarat", lat: 22.3072, lon: 73.1812, type: "city" },
  { name: "Ghaziabad", state: "Uttar Pradesh", lat: 28.6692, lon: 77.4538, type: "city" },
  { name: "Ludhiana", state: "Punjab", lat: 30.9010, lon: 75.8573, type: "city" },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lon: 78.0081, type: "city" },
  { name: "Nashik", state: "Maharashtra", lat: 19.9975, lon: 73.7898, type: "city" },
  { name: "Faridabad", state: "Haryana", lat: 28.4089, lon: 77.3178, type: "city" },
  { name: "Meerut", state: "Uttar Pradesh", lat: 28.9845, lon: 77.7064, type: "city" },
  { name: "Rajkot", state: "Gujarat", lat: 22.3039, lon: 70.8022, type: "city" },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lon: 82.9739, type: "city" },
  { name: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lon: 74.7973, type: "city" },
  { name: "Aurangabad", state: "Maharashtra", lat: 19.8762, lon: 75.3433, type: "city" },
  { name: "Dhanbad", state: "Jharkhand", lat: 23.7957, lon: 86.4304, type: "city" },
  { name: "Amritsar", state: "Punjab", lat: 31.6340, lon: 74.8723, type: "city" },
  { name: "Navi Mumbai", state: "Maharashtra", lat: 19.0330, lon: 73.0297, type: "city" },
  { name: "Allahabad", state: "Uttar Pradesh", lat: 25.4358, lon: 81.8463, type: "city" },
  { name: "Ranchi", state: "Jharkhand", lat: 23.3441, lon: 85.3096, type: "city" },
  { name: "Howrah", state: "West Bengal", lat: 22.5958, lon: 88.2636, type: "city" },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lon: 76.9558, type: "city" },
  { name: "Jabalpur", state: "Madhya Pradesh", lat: 23.1815, lon: 79.9864, type: "city" },

  // Smaller cities and towns
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lon: 77.1734, type: "town" },
  { name: "Ooty", state: "Tamil Nadu", lat: 11.4102, lon: 76.6950, type: "town" },
  { name: "Darjeeling", state: "West Bengal", lat: 27.0410, lon: 88.2663, type: "town" },
  { name: "Pushkar", state: "Rajasthan", lat: 26.4872, lon: 74.5503, type: "town" },
  { name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lon: 78.2676, type: "town" },
  { name: "Mandi", state: "Himachal Pradesh", lat: 31.7080, lon: 76.9318, type: "town" },
  { name: "Pahalgam", state: "Jammu and Kashmir", lat: 34.0151, lon: 75.3142, type: "town" },
  { name: "Gangtok", state: "Sikkim", lat: 27.3389, lon: 88.6065, type: "town" },
  { name: "Mussoorie", state: "Uttarakhand", lat: 30.4598, lon: 78.0644, type: "town" },
  { name: "Munnar", state: "Kerala", lat: 10.0889, lon: 77.0595, type: "town" },
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lon: 76.6394, type: "town" },
  { name: "Dharamshala", state: "Himachal Pradesh", lat: 32.2190, lon: 76.3234, type: "town" },
  { name: "Udaipur", state: "Rajasthan", lat: 24.5854, lon: 73.7125, type: "town" },
  { name: "Goa", state: "Goa", lat: 15.2993, lon: 74.1240, type: "town" },
  { name: "Kodaikanal", state: "Tamil Nadu", lat: 10.2381, lon: 77.4892, type: "town" },
  { name: "Panchgani", state: "Maharashtra", lat: 17.9282, lon: 73.8079, type: "town" },
  { name: "Lonavala", state: "Maharashtra", lat: 18.7546, lon: 73.4069, type: "town" },
  { name: "Mount Abu", state: "Rajasthan", lat: 24.5926, lon: 72.7156, type: "town" },
  { name: "Manali", state: "Himachal Pradesh", lat: 32.2432, lon: 77.1892, type: "town" },
  { name: "Nainital", state: "Uttarakhand", lat: 29.3919, lon: 79.4542, type: "town" },
  
  // Villages
  { name: "Khajuraho", state: "Madhya Pradesh", lat: 24.8318, lon: 79.9199, type: "village" },
  { name: "Hampi", state: "Karnataka", lat: 15.3350, lon: 76.4600, type: "village" },
  { name: "Mawlynnong", state: "Meghalaya", lat: 25.2025, lon: 91.9526, type: "village" },
  { name: "Ziro", state: "Arunachal Pradesh", lat: 27.5434, lon: 93.8324, type: "village" },
  { name: "Orchha", state: "Madhya Pradesh", lat: 25.3507, lon: 78.6422, type: "village" },
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
  { name: "Poovar", state: "Kerala", lat: 8.3196, lon: 77.0783, type: "village" },
  { name: "Shantiniketan", state: "West Bengal", lat: 23.6773, lon: 87.6837, type: "village" },
  { name: "Kaza", state: "Himachal Pradesh", lat: 32.2270, lon: 78.0722, type: "village" },
  { name: "Chitkul", state: "Himachal Pradesh", lat: 31.3500, lon: 78.4400, type: "village" },
  { name: "Varkala", state: "Kerala", lat: 8.7381, lon: 76.7163, type: "village" },
  { name: "Almora", state: "Uttarakhand", lat: 29.5892, lon: 79.6467, type: "village" },
  { name: "Zuluk", state: "Sikkim", lat: 27.3498, lon: 88.8431, type: "village" },
  { name: "Gunehar", state: "Himachal Pradesh", lat: 32.0375, lon: 76.7300, type: "village" },
  { name: "Tirthan Valley", state: "Himachal Pradesh", lat: 31.6370, lon: 77.4341, type: "village" },
  { name: "Kalpa", state: "Himachal Pradesh", lat: 31.5316, lon: 78.2559, type: "village" },
  { name: "Pangong Tso", state: "Ladakh", lat: 33.7425, lon: 78.9288, type: "village" },
  { name: "Lachen", state: "Sikkim", lat: 27.7259, lon: 88.5519, type: "village" },
  { name: "Lachung", state: "Sikkim", lat: 27.6900, lon: 88.7420, type: "village" },
  { name: "Kutch", state: "Gujarat", lat: 23.7337, lon: 69.8597, type: "village" },
  { name: "Dhanaulti", state: "Uttarakhand", lat: 30.4471, lon: 78.2326, type: "village" },
  { name: "Chopta", state: "Uttarakhand", lat: 30.4853, lon: 79.1690, type: "village" },
  { name: "Lamayuru", state: "Ladakh", lat: 34.2867, lon: 76.7736, type: "village" },
  { name: "Hemis", state: "Ladakh", lat: 33.9020, lon: 77.7340, type: "village" },
  { name: "Andretta", state: "Himachal Pradesh", lat: 32.0500, lon: 76.5667, type: "village" },
  { name: "Pragpur", state: "Himachal Pradesh", lat: 31.8259, lon: 76.2263, type: "village" },
  { name: "Garli", state: "Himachal Pradesh", lat: 31.8196, lon: 76.2265, type: "village" },
  { name: "Nubra Valley", state: "Ladakh", lat: 34.6933, lon: 77.5594, type: "village" },
  { name: "Arambol", state: "Goa", lat: 15.6857, lon: 73.7038, type: "village" },
  { name: "Palolem", state: "Goa", lat: 15.0100, lon: 74.0232, type: "village" },
  { name: "Agonda", state: "Goa", lat: 15.0449, lon: 73.9852, type: "village" },
  { name: "Morjim", state: "Goa", lat: 15.6317, lon: 73.7380, type: "village" },
  { name: "Kumbhalgarh", state: "Rajasthan", lat: 25.1482, lon: 73.5849, type: "village" },
  
  // Additional diverse locations
  { name: "Gokarna", state: "Karnataka", lat: 14.5479, lon: 74.3188, type: "town" },
  { name: "Pondicherry", state: "Puducherry", lat: 11.9416, lon: 79.8083, type: "city" },
  { name: "Khuri", state: "Rajasthan", lat: 26.6289, lon: 71.3297, type: "village" },
  { name: "Leh", state: "Ladakh", lat: 34.1526, lon: 77.5771, type: "town" },
  { name: "Kohima", state: "Nagaland", lat: 25.6747, lon: 94.1086, type: "city" },
  { name: "Cherrapunji", state: "Meghalaya", lat: 25.2744, lon: 91.7331, type: "town" },
  { name: "Imphal", state: "Manipur", lat: 24.8170, lon: 93.9368, type: "city" },
  { name: "Aizawl", state: "Mizoram", lat: 23.7271, lon: 92.7176, type: "city" },
  { name: "Itanagar", state: "Arunachal Pradesh", lat: 27.0844, lon: 93.6053, type: "city" },
  { name: "Shillong", state: "Meghalaya", lat: 25.5788, lon: 91.8933, type: "city" },
  { name: "Jorhat", state: "Assam", lat: 26.7465, lon: 94.2026, type: "city" },
  { name: "Dibrugarh", state: "Assam", lat: 27.4728, lon: 94.9120, type: "city" },
  { name: "Siliguri", state: "West Bengal", lat: 26.7271, lon: 88.3953, type: "city" },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lon: 78.1198, type: "city" },
  { name: "Tiruchirappalli", state: "Tamil Nadu", lat: 10.7905, lon: 78.7047, type: "city" },
  { name: "Thrissur", state: "Kerala", lat: 10.5276, lon: 76.2144, type: "city" },
  { name: "Kozhikode", state: "Kerala", lat: 11.2588, lon: 75.7804, type: "city" },
  { name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lon: 76.9366, type: "city" },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lon: 76.2673, type: "city" },
  { name: "Mangaluru", state: "Karnataka", lat: 12.9141, lon: 74.8560, type: "city" }
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
                {filteredLocations.slice(0, 15).map((location) => (
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
