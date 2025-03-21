
// Soil type and climate determination specifically for India

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

// Using a region-specific algorithm to determine soil type and climate based on coordinates in India
// In a real application, this would connect to a soil and climate API with India-specific data
export const getSoilAndClimateFromLocation = (latitude: number, longitude: number): { soilType: string; climate: string } => {
  // Check if coordinates are likely within India (rough bounding box)
  const isInIndia = (latitude >= 8.0 && latitude <= 37.0 && longitude >= 68.0 && longitude <= 97.0);
  
  // Default for locations outside India or fallback
  if (!isInIndia) {
    return { soilType: 'loam', climate: 'temperate' };
  }
  
  // India-specific soil determination based on regions
  let soilType = 'alluvial'; // Most common in India
  
  // Northern Plains (Indo-Gangetic plains)
  if (latitude >= 24.0 && latitude <= 32.0 && longitude >= 75.0 && longitude <= 88.0) {
    soilType = 'alluvial';
  }
  // Western India (Rajasthan, Gujarat)
  else if (latitude >= 20.0 && latitude <= 30.0 && longitude >= 68.0 && longitude <= 77.0) {
    soilType = 'arid';
  }
  // Deccan Plateau (Central and Southern)
  else if (latitude >= 10.0 && latitude <= 20.0 && longitude >= 73.0 && longitude <= 83.0) {
    soilType = 'black'; // Black cotton soil/regur
  }
  // Eastern India and coastal regions
  else if ((latitude >= 20.0 && latitude <= 25.0 && longitude >= 85.0 && longitude <= 93.0) || 
           (Math.abs(longitude - 80.0) <= 2.0 && latitude <= 15.0)) {
    soilType = 'red';
  }
  // Himalayan Region
  else if (latitude >= 28.0 && latitude <= 37.0 && longitude >= 73.0 && longitude <= 97.0) {
    soilType = 'mountain';
  }
  // Kerala, Western Ghats
  else if (latitude >= 8.0 && latitude <= 15.0 && longitude >= 74.0 && longitude <= 78.0) {
    soilType = 'laterite';
  }
  
  // India-specific climate determination
  let climate = 'subtropical'; // Default for most of India
  
  // Himalayan Region - Alpine/Mountain
  if (latitude >= 28.0 && latitude <= 37.0 && longitude >= 73.0 && longitude <= 97.0) {
    climate = 'mountain';
  }
  // Western Arid - Thar Desert
  else if (latitude >= 24.0 && latitude <= 30.0 && longitude >= 68.0 && longitude <= 75.0) {
    climate = 'arid';
  }
  // Coastal regions
  else if ((Math.abs(longitude - 73.0) <= 1.5 && latitude <= 22.0) || // Western Coast
           (Math.abs(longitude - 80.0) <= 2.0 && latitude <= 15.0)) { // Eastern Coast
    climate = 'tropical';
  }
  // Northeast India
  else if (latitude >= 22.0 && latitude <= 29.0 && longitude >= 88.0 && longitude <= 97.0) {
    climate = 'humid';
  }
  // Central India
  else if (latitude >= 17.0 && latitude <= 25.0 && longitude >= 75.0 && longitude <= 87.0) {
    climate = 'subtropical';
  }
  // Southern Peninsula
  else if (latitude <= 17.0) {
    climate = 'tropical';
  }
  
  return { soilType, climate };
};

// Determine the current growing season based on Indian agricultural seasons
export const getCurrentSeason = (latitude: number): string => {
  const now = new Date();
  const month = now.getMonth();
  
  // Indian agricultural seasons are different from Western seasons
  // Kharif (Monsoon), Rabi (Winter), Zaid (Summer)
  
  // Kharif season: June to October (Monsoon crops)
  if (month >= 5 && month <= 9) {
    return 'kharif';
  }
  // Rabi season: November to March (Winter crops)
  else if (month >= 10 || month <= 2) {
    return 'rabi';
  }
  // Zaid season: March to June (Summer crops)
  else {
    return 'zaid';
  }
};
