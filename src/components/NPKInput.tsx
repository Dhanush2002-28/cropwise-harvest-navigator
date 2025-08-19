import React, { useState, useEffect } from "react";

interface NPKInputProps {
  onChange: (npk: { n: number; p: number; k: number }) => void;
}

const NPKInput: React.FC<NPKInputProps> = ({ onChange }) => {
  const [npk, setNpk] = useState({ n: 0, p: 0, k: 0 });

  useEffect(() => {
    onChange(npk);
  }, [npk, onChange]);

  const handleInputChange = (field: "n" | "p" | "k", value: string) => {
    const numValue = parseFloat(value) || 0;
    const newNpk = { ...npk, [field]: numValue };

    setNpk(newNpk);
  };

  return (
    <div className="bg-card text-card-foreground border border-border shadow-lg p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        🧪 Soil NPK Analysis
      </h3>

      {/* Current Values Display */}
      <div className="mb-4 p-3 bg-secondary rounded-lg border border-border">
        <h4 className="font-medium mb-2 text-sm text-foreground">
          Current NPK Values:
        </h4>
        <div className="flex gap-2 text-sm">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
            N: {npk.n}
          </span>
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
            P: {npk.p}
          </span>
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
            K: {npk.k}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Nitrogen (N) kg/ha
          </label>
          <input
            type="number"
            value={npk.n || ""}
            onChange={(e) => handleInputChange("n", e.target.value)}
            placeholder="Enter N value"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            min="0"
            max="300"
          />
          <p className="text-xs text-muted-foreground mt-1">Normal: 40-100</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Phosphorus (P) kg/ha
          </label>
          <input
            type="number"
            value={npk.p || ""}
            onChange={(e) => handleInputChange("p", e.target.value)}
            placeholder="Enter P value"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            min="0"
            max="200"
          />
          <p className="text-xs text-muted-foreground mt-1">Normal: 20-60</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Potassium (K) kg/ha
          </label>
          <input
            type="number"
            value={npk.k || ""}
            onChange={(e) => handleInputChange("k", e.target.value)}
            placeholder="Enter K value"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            min="0"
            max="500"
          />
          <p className="text-xs text-muted-foreground mt-1">Normal: 30-80</p>
        </div>
      </div>

      {/* Quick Test Values Button */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            const testValues = { n: 45, p: 25, k: 35 };
            setNpk(testValues);
            console.log("Test values set:", testValues);
          }}
          className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Use Test Values
        </button>
        <button
          onClick={() => {
            const clearValues = { n: 0, p: 0, k: 0 };
            setNpk(clearValues);
            console.log("Values cleared:", clearValues);
          }}
          className="px-3 py-1.5 text-sm border border-border bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
        >
          Clear Values
        </button>
      </div>
    </div>
  );
};

export default NPKInput;
