
import { useState } from 'react';
import { Check, ChevronDown, Droplets, Thermometer, Wheat } from 'lucide-react';

// Define our soil types and climate zones
const soilTypes = [
  { id: 'clay', name: 'Clay' },
  { id: 'silt', name: 'Silt' },
  { id: 'sand', name: 'Sandy' },
  { id: 'loam', name: 'Loam' },
  { id: 'peat', name: 'Peat' },
  { id: 'chalk', name: 'Chalky' },
];

const climateZones = [
  { id: 'tropical', name: 'Tropical' },
  { id: 'dry', name: 'Dry' },
  { id: 'temperate', name: 'Temperate' },
  { id: 'continental', name: 'Continental' },
  { id: 'polar', name: 'Polar' },
];

const cropSeasons = [
  { id: 'all', name: 'All Year' },
  { id: 'spring', name: 'Spring' },
  { id: 'summer', name: 'Summer' },
  { id: 'fall', name: 'Fall' },
  { id: 'winter', name: 'Winter' },
];

interface CropFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  soilType: string;
  climate: string;
  season: string;
  waterAvailability: number;
  previousCrop: string;
}

const CropForm = ({ onSubmit }: CropFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    soilType: '',
    climate: '',
    season: '',
    waterAvailability: 50,
    previousCrop: '',
  });
  
  const [dropdownOpen, setDropdownOpen] = useState({
    soilType: false,
    climate: false,
    season: false,
  });

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleDropdown = (field: keyof typeof dropdownOpen) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getSoilTypeName = () => {
    const soil = soilTypes.find(s => s.id === formData.soilType);
    return soil ? soil.name : 'Select Soil Type';
  };

  const getClimateName = () => {
    const climate = climateZones.find(c => c.id === formData.climate);
    return climate ? climate.name : 'Select Climate Zone';
  };

  const getSeasonName = () => {
    const season = cropSeasons.find(s => s.id === formData.season);
    return season ? season.name : 'Select Growing Season';
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 card-shine">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Wheat className="w-5 h-5 mr-2 text-primary" />
        Crop Preferences
      </h3>

      <div className="space-y-6">
        {/* Soil Type Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Soil Type</label>
          <div className="relative">
            <button
              type="button"
              className="w-full p-3 bg-background border border-input rounded-md flex justify-between items-center text-left"
              onClick={() => toggleDropdown('soilType')}
            >
              <span>{getSoilTypeName()}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.soilType ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen.soilType && (
              <div className="absolute z-10 mt-1 w-full bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto animate-scale-in">
                {soilTypes.map((soil) => (
                  <button
                    key={soil.id}
                    type="button"
                    className={`w-full text-left px-4 py-2 hover:bg-secondary flex items-center ${
                      formData.soilType === soil.id ? 'bg-primary/10 text-primary' : ''
                    }`}
                    onClick={() => {
                      handleChange('soilType', soil.id);
                      toggleDropdown('soilType');
                    }}
                  >
                    {formData.soilType === soil.id && <Check className="w-4 h-4 mr-2" />}
                    <span className={formData.soilType === soil.id ? 'ml-0' : 'ml-6'}>
                      {soil.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Climate Zone Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Climate Zone</label>
          <div className="relative">
            <button
              type="button"
              className="w-full p-3 bg-background border border-input rounded-md flex justify-between items-center text-left"
              onClick={() => toggleDropdown('climate')}
            >
              <div className="flex items-center">
                <Thermometer className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{getClimateName()}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.climate ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen.climate && (
              <div className="absolute z-10 mt-1 w-full bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto animate-scale-in">
                {climateZones.map((climate) => (
                  <button
                    key={climate.id}
                    type="button"
                    className={`w-full text-left px-4 py-2 hover:bg-secondary flex items-center ${
                      formData.climate === climate.id ? 'bg-primary/10 text-primary' : ''
                    }`}
                    onClick={() => {
                      handleChange('climate', climate.id);
                      toggleDropdown('climate');
                    }}
                  >
                    {formData.climate === climate.id && <Check className="w-4 h-4 mr-2" />}
                    <span className={formData.climate === climate.id ? 'ml-0' : 'ml-6'}>
                      {climate.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Season Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Growing Season</label>
          <div className="relative">
            <button
              type="button"
              className="w-full p-3 bg-background border border-input rounded-md flex justify-between items-center text-left"
              onClick={() => toggleDropdown('season')}
            >
              <span>{getSeasonName()}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.season ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen.season && (
              <div className="absolute z-10 mt-1 w-full bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto animate-scale-in">
                {cropSeasons.map((season) => (
                  <button
                    key={season.id}
                    type="button"
                    className={`w-full text-left px-4 py-2 hover:bg-secondary flex items-center ${
                      formData.season === season.id ? 'bg-primary/10 text-primary' : ''
                    }`}
                    onClick={() => {
                      handleChange('season', season.id);
                      toggleDropdown('season');
                    }}
                  >
                    {formData.season === season.id && <Check className="w-4 h-4 mr-2" />}
                    <span className={formData.season === season.id ? 'ml-0' : 'ml-6'}>
                      {season.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Water Availability Slider */}
        <div className="space-y-2">
          <label className="block text-sm font-medium flex items-center">
            <Droplets className="w-4 h-4 mr-2 text-primary" />
            Water Availability
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Low</span>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.waterAvailability}
              onChange={(e) => handleChange('waterAvailability', parseInt(e.target.value))}
              className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-sm">High</span>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {formData.waterAvailability}%
          </div>
        </div>

        {/* Previous Crop Input */}
        <div className="space-y-2">
          <label htmlFor="previousCrop" className="block text-sm font-medium">
            Previous Crop (optional)
          </label>
          <input
            type="text"
            id="previousCrop"
            value={formData.previousCrop}
            onChange={(e) => handleChange('previousCrop', e.target.value)}
            placeholder="E.g. Wheat, Corn, etc."
            className="w-full p-3 bg-background border border-input rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          Get Recommendations
        </button>
      </div>
    </form>
  );
};

export default CropForm;
