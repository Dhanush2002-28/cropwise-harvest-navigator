import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";

interface ManualLocationInputProps {
  onPincodeSubmit: (pincode: string) => void;
  isLoading?: boolean;
}

const ManualLocationInput: React.FC<ManualLocationInputProps> = ({
  onPincodeSubmit,
  isLoading = false,
}) => {
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      onPincodeSubmit(pincode);
      setPincode("");
    }
  };

  return (
    <div className="glass p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Enter Your Location</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pincode" className="block text-sm font-medium mb-2">
            Pincode
          </label>
          <div className="relative">
            <input
              id="pincode"
              type="text"
              value={pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setPincode(value);
              }}
              placeholder="Enter 6-digit pincode"
              className="w-full px-4 py-3 pl-10 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={6}
              disabled={isLoading}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Examples: 560001 (Bengaluru), 400001 (Mumbai), 110001 (Delhi)
          </p>
        </div>

        <button
          type="submit"
          disabled={pincode.length !== 6 || isLoading}
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

      <div className="mt-4 p-3 bg-secondary/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> For best results, use automatic location
          detection or enter your exact pincode.
        </p>
      </div>
    </div>
  );
};

export default ManualLocationInput;
