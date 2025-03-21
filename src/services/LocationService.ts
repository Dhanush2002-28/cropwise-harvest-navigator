
// Soil type and climate determination based on location

interface SoilData {
  soilType: string;
  description: string;
}

interface ClimateData {
  climate: string;
  description: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  soil: SoilData;
  climate: ClimateData;
}

// Using a simple algorithm to determine soil type and climate based on coordinates
// In a real application, this would connect to a soil and climate API
export const getSoilAndClimateFromLocation = (latitude: number, longitude: number): { soilType: string; climate: string } => {
  // This is a simplified mapping based on rough geographical patterns
  // In reality, soil type and climate are much more complex
  
  // Simple soil determination based on latitude
  let soilType = 'loam'; // default
  
  // Tropical/equatorial regions often have clay-heavy soils
  if (Math.abs(latitude) < 15) {
    soilType = 'clay';
  }
  // Desert regions often have sandy soils
  else if ((Math.abs(latitude) >= 15 && Math.abs(latitude) < 35) && 
          (longitude > -20 && longitude < 50 || longitude > 100 && longitude < 140)) {
    soilType = 'sand';
  }
  // Temperate regions often have silt or loam
  else if (Math.abs(latitude) >= 35 && Math.abs(latitude) < 55) {
    soilType = Math.random() > 0.5 ? 'silt' : 'loam';
  }
  // Northern regions more likely to have peat
  else if (Math.abs(latitude) >= 55) {
    soilType = Math.random() > 0.7 ? 'peat' : 'loam';
  }
  
  // Simple climate determination
  let climate = 'temperate'; // default
  
  // Tropical near equator
  if (Math.abs(latitude) < 15) {
    climate = 'tropical';
  }
  // Desert/arid zones
  else if ((Math.abs(latitude) >= 15 && Math.abs(latitude) < 35) &&
          (longitude > -20 && longitude < 50 || longitude > 100 && longitude < 140)) {
    climate = 'dry';
  }
  // Temperate
  else if (Math.abs(latitude) >= 35 && Math.abs(latitude) < 55) {
    climate = 'temperate';
  }
  // Cold continental or polar
  else if (Math.abs(latitude) >= 55 && Math.abs(latitude) < 70) {
    climate = 'continental';
  }
  else {
    climate = 'polar';
  }
  
  return { soilType, climate };
};

// Determine the current growing season based on location and date
export const getCurrentSeason = (latitude: number): string => {
  const now = new Date();
  const month = now.getMonth();
  
  // Northern hemisphere
  if (latitude > 0) {
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  } 
  // Southern hemisphere (seasons reversed)
  else {
    if (month >= 2 && month <= 4) return 'fall';
    if (month >= 5 && month <= 7) return 'winter';
    if (month >= 8 && month <= 10) return 'spring';
    return 'summer';
  }
};
