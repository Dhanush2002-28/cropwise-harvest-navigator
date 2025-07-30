import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";

interface ManualLocationInputProps {
  onLocationSubmit: (location: {
    state: string;
    district: string;
    block: string;
  }) => void;
  isLoading?: boolean;
}

// State, District, Block data for 4 states
const locationData = {
  Goa: {
    "North Goa": ["Bardez", "Bicholim", "Pernem", "Sattari", "Tiswadi"],
    "South Goa": ["Canacona", "Mormugao", "Quepem", "Salcete", "Sanguem"],
  },
  Gujarat: {
    Ahmedabad: ["Daskroi", "Detroj-Rampura", "Sanand", "Viramgam"],
    Surat: ["Bardoli", "Choryasi", "Kamrej", "Olpad"],
    Vadodara: ["Dabhoi", "Karjan", "Padra", "Savli"],
  },
  Karnataka: {
    "Bengaluru Urban": [
      "Anekal",
      "Bangalore North",
      "Bangalore South",
      "Yelahanka",
    ],
    Mysuru: ["Heggadadevankote", "Krishnarajanagara", "Mysore", "Nanjangud"],
    Belagavi: ["Athani", "Bailhongal", "Belgaum", "Chikodi"],
  },
  "Tamil Nadu": {
    Chennai: ["Ambattur", "Alandur", "Madhavaram", "Tondiarpet"],
    Coimbatore: ["Annur", "Coimbatore North", "Mettupalayam", "Pollachi"],
    Madurai: ["Melur", "Peraiyur", "Thirumangalam", "Usilampatti"],
  },
};

const ManualLocationInput: React.FC<ManualLocationInputProps> = ({
  onLocationSubmit,
  isLoading = false,
}) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedDistrict("");
    setSelectedBlock("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedBlock("");
  };

  const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlock(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedState && selectedDistrict && selectedBlock) {
      onLocationSubmit({
        state: selectedState,
        district: selectedDistrict,
        block: selectedBlock,
      });
      setSelectedState("");
      setSelectedDistrict("");
      setSelectedBlock("");
    }
  };

  return (
    <div className="bg-card text-card-foreground border border-border shadow-lg p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Enter Your Location Manually
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium mb-2 text-foreground"
          >
            State
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isLoading}
          >
            <option value="">Select State</option>
            {Object.keys(locationData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {selectedState && (
          <div>
            <label
              htmlFor="district"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              District
            </label>
            <select
              id="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            >
              <option value="">Select District</option>
              {Object.keys(locationData[selectedState]).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedDistrict && (
          <div>
            <label
              htmlFor="block"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Block
            </label>
            <select
              id="block"
              value={selectedBlock}
              onChange={handleBlockChange}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            >
              <option value="">Select Block</option>
              {locationData[selectedState][selectedDistrict].map(
                (block: string) => (
                  <option key={block} value={block}>
                    {block}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={
            !(selectedState && selectedDistrict && selectedBlock) || isLoading
          }
          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
              Getting Recommendations...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Get Crop Recommendations
            </>
          )}
        </button>
      </form>

      <div className="mt-4 p-3 bg-secondary rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> For best results, use automatic location
          detection or select your exact location.
        </p>
      </div>
    </div>
  );
};

export default ManualLocationInput;
