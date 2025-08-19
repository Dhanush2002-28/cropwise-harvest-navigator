import React, { useState } from "react";
import ManualLocationInput from "./ManualLocationInput";
import { Info } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { reverseGeocode } from "../services/reverseGeocodeService";

interface NPKOrLocationSelectorProps {
  onNPKSubmit: (values: {
    n: number;
    p: number;
    k: number;
    ph?: number;
  }) => void;
  onLocationSubmit: (location: {
    state: string;
    district: string;
    block: string;
  }) => void;
}

type Step = "start" | "npk" | "chooseLocationMethod" | "manualLocation";

const NPKOrLocationSelector: React.FC<NPKOrLocationSelectorProps> = ({
  onNPKSubmit,
  onLocationSubmit,
}) => {
  const [step, setStep] = useState<Step>("start");
  const [npk, setNpk] = useState({ n: "", p: "", k: "", ph: "" });
  const [error, setError] = useState("");

  // Enhanced styling with animations and gradients

  // Reduced font sizes for less overwhelming UI
  const containerClass =
    "flex flex-col items-center justify-center min-h-[70vh] w-full max-w-4xl mx-auto rounded-3xl shadow-2xl border p-8 backdrop-blur-sm transition-all duration-500" +
    " " +
    "bg-[var(--card-bg,#f9fafb)] dark:bg-[var(--card-bg,#18181b)] border-[var(--border,#e5e7eb)] dark:border-[var(--border,#27272a)] text-[var(--card-foreground,#18181b)] dark:text-[var(--card-foreground,#f3f4f6)]";

  // Always green for primary actions in both modes
  const buttonClass =
    "w-full py-3 px-6 text-base font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 mb-4 transform hover:scale-105 hover:shadow-lg bg-[var(--primary,#22c55e)] text-[var(--primary-foreground,#fff)] border border-[var(--primary,#22c55e)] hover:bg-[var(--primary,#16a34a)] dark:bg-[var(--primary,#22c55e)] dark:text-[var(--primary-foreground,#fff)] dark:border-[var(--primary,#22c55e)] dark:hover:bg-[var(--primary,#16a34a)]";

  const secondaryButtonClass =
    "w-full py-3 px-6 text-base font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 mb-4 transform hover:scale-105 hover:shadow-lg" +
    " " +
    "bg-[var(--secondary,#e0e7ff)] text-[var(--foreground,#222)] border border-[var(--border,#a5b4fc)] hover:bg-[var(--secondary,#c7d2fe)] dark:bg-[var(--secondary,#312e81)] dark:text-[var(--foreground,#f3f4f6)] dark:border-[var(--border,#6366f1)] dark:hover:bg-[var(--secondary,#3730a3)]";

  const mutedButtonClass =
    "w-full py-3 px-6 text-base font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 mb-4 transform hover:scale-105 hover:shadow-lg" +
    " " +
    "bg-[var(--muted,#f3f4f6)] text-[var(--muted-foreground,#6b7280)] border border-[var(--border,#e5e7eb)] hover:bg-[var(--muted,#e5e7eb)]/80 dark:bg-[var(--muted,#27272a)] dark:text-[var(--muted-foreground,#a1a1aa)] dark:border-[var(--border,#3f3f46)] dark:hover:bg-[var(--muted,#18181b)]";

  const titleClass =
    "text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#22c55e] to-[#6366f1] bg-clip-text text-transparent dark:from-[#22c55e] dark:to-[#818cf8] drop-shadow-lg";

  // Automatic location detection
  const [detecting, setDetecting] = useState(false);
  const [detectError, setDetectError] = useState("");
  const handleDetectLocation = async () => {
    setDetecting(true);
    setDetectError("");

    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      setDetecting(false);
      setDetectError("Location detection timed out. Please try manual input.");
    }, 10000); // 10 second timeout

    if (!navigator.geolocation) {
      clearTimeout(timeoutId);
      setDetectError("Geolocation is not supported by your browser.");
      setDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;
        try {
          const data = await reverseGeocode(latitude, longitude);
          const address = data.address || {};
          const state = address.state || address.state_district || "";
          const district =
            address.county ||
            address.district ||
            address.city_district ||
            address.city ||
            "";
          const block =
            address.suburb ||
            address.village ||
            address.town ||
            address.hamlet ||
            "";
          if (state && district) {
            onLocationSubmit({ state, district, block });
          } else {
            setDetectError(
              "Could not determine your location details. Please enter manually."
            );
          }
        } catch (e) {
          setDetectError("Failed to fetch location details. Please try again.");
        }
        setDetecting(false);
      },
      (err) => {
        clearTimeout(timeoutId);
        setDetectError(
          "Unable to get your location. Please allow location access or enter manually."
        );
        setDetecting(false);
      },
      {
        timeout: 8000, // 8 second timeout for geolocation
        enableHighAccuracy: false,
        maximumAge: 60000, // Cache for 1 minute
      }
    );
  };

  const handleNPKChange = (field: "n" | "p" | "k" | "ph", value: string) => {
    setNpk({ ...npk, [field]: value });
  };

  const handleNPKSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!npk.n || !npk.p || !npk.k) {
      setError("N, P, and K values are required.");
      return;
    }
    setError("");
    onNPKSubmit({
      n: parseFloat(npk.n),
      p: parseFloat(npk.p),
      k: parseFloat(npk.k),
      ph: npk.ph ? parseFloat(npk.ph) : undefined,
    });
  };

  // Step rendering
  return (
    <div className={containerClass}>
      {step === "start" && (
        <>
          <h2 className={titleClass}>Do you know your soil's NPK values?</h2>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <button className={buttonClass} onClick={() => setStep("npk")}>
              Yes, I know my NPK values
            </button>
            <button
              className={secondaryButtonClass}
              onClick={() => setStep("chooseLocationMethod")}
            >
              No, I want to use my location
            </button>
          </div>
        </>
      )}

      {step === "chooseLocationMethod" && (
        <>
          <h2 className={titleClass}>
            How would you like to provide your location?
          </h2>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <button
              className={
                buttonClass + " flex items-center justify-center gap-2"
              }
              onClick={handleDetectLocation}
              disabled={detecting}
            >
              {detecting ? "Detecting..." : "Detect My Location Automatically"}
            </button>
            {detecting && (
              <button
                className={
                  mutedButtonClass +
                  " !bg-destructive/20 !text-destructive hover:!bg-destructive/30"
                }
                onClick={() => {
                  setDetecting(false);
                  setDetectError("Location detection cancelled.");
                }}
              >
                Cancel Detection
              </button>
            )}
            <button
              className={secondaryButtonClass}
              onClick={() => setStep("manualLocation")}
              disabled={detecting}
            >
              Enter location manually
            </button>
            <button
              className={mutedButtonClass}
              onClick={() => setStep("start")}
              disabled={detecting}
            >
              Go Back
            </button>
            {detectError && (
              <p className="text-destructive text-sm mt-2">{detectError}</p>
            )}
          </div>
        </>
      )}
      {step === "npk" && (
        <>
          <h2 className={titleClass}>Enter your soil NPK values</h2>
          <TooltipProvider>
            <form
              onSubmit={handleNPKSubmit}
              className="space-y-6 w-full max-w-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-base font-medium mb-2 flex items-center gap-1 text-[var(--foreground,#18181b)] dark:text-[var(--foreground,#f3f4f6)]">
                    Nitrogen (N) kg/ha*
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span tabIndex={0}>
                          <Info className="w-4 h-4 text-[var(--primary,#22c55e)] dark:text-[var(--primary,#22c55e)] cursor-pointer" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Essential for leaf growth. Typical range: 0-1000 mg/kg.
                      </TooltipContent>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    value={npk.n}
                    onChange={(e) => handleNPKChange("n", e.target.value)}
                    placeholder="e.g. 300"
                    className="w-full px-4 py-3 border border-[var(--primary,#22c55e)] rounded-xl text-lg bg-[var(--background,#fff)] text-[var(--foreground,#18181b)] placeholder:text-[var(--muted-foreground,#6b7280)] focus:ring-2 focus:ring-[var(--primary,#22c55e)] focus:border-transparent dark:bg-[var(--background,#18181b)] dark:text-[var(--foreground,#f3f4f6)] dark:placeholder:text-[var(--muted-foreground,#a1a1aa)]"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="text-base font-medium mb-2 flex items-center gap-1 text-foreground">
                    Phosphorus (P) kg/ha*
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span tabIndex={0}>
                          <Info className="w-4 h-4 text-primary cursor-pointer" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Important for root and flower growth. Typical range:
                        0-50 mg/kg.
                      </TooltipContent>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    value={npk.p}
                    onChange={(e) => handleNPKChange("p", e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full px-4 py-3 border border-[var(--primary,#22c55e)] rounded-xl text-lg bg-[var(--background,#fff)] text-[var(--foreground,#18181b)] placeholder:text-[var(--muted-foreground,#6b7280)] focus:ring-2 focus:ring-[var(--primary,#22c55e)] focus:border-transparent dark:bg-[var(--background,#18181b)] dark:text-[var(--foreground,#f3f4f6)] dark:placeholder:text-[var(--muted-foreground,#a1a1aa)]"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="text-base font-medium mb-2 flex items-center gap-1 text-foreground">
                    Potassium (K) kg/ha*
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span tabIndex={0}>
                          <Info className="w-4 h-4 text-primary cursor-pointer" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Helps overall plant health. Typical range: 0-500 mg/kg.
                      </TooltipContent>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    value={npk.k}
                    onChange={(e) => handleNPKChange("k", e.target.value)}
                    placeholder="e.g. 120"
                    className="w-full px-4 py-3 border border-[var(--primary,#22c55e)] rounded-xl text-lg bg-[var(--background,#fff)] text-[var(--foreground,#18181b)] placeholder:text-[var(--muted-foreground,#6b7280)] focus:ring-2 focus:ring-[var(--primary,#22c55e)] focus:border-transparent dark:bg-[var(--background,#18181b)] dark:text-[var(--foreground,#f3f4f6)] dark:placeholder:text-[var(--muted-foreground,#a1a1aa)]"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="text-base font-medium mb-2 flex items-center gap-1 text-foreground">
                    pH (optional)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span tabIndex={0}>
                          <Info className="w-4 h-4 text-primary cursor-pointer" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Soil acidity/alkalinity. 6.0-7.5 is ideal for most
                        crops.
                      </TooltipContent>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    value={npk.ph}
                    onChange={(e) => handleNPKChange("ph", e.target.value)}
                    placeholder="e.g. 6.5"
                    className="w-full px-4 py-3 border border-[var(--primary,#22c55e)] rounded-xl text-lg bg-[var(--background,#fff)] text-[var(--foreground,#18181b)] placeholder:text-[var(--muted-foreground,#6b7280)] focus:ring-2 focus:ring-[var(--primary,#22c55e)] focus:border-transparent dark:bg-[var(--background,#18181b)] dark:text-[var(--foreground,#f3f4f6)] dark:placeholder:text-[var(--muted-foreground,#a1a1aa)]"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              {error && <p className="text-destructive text-base">{error}</p>}
              <div className="flex flex-col gap-4 mt-8">
                <button
                  type="submit"
                  style={{
                    background: "#39FF14",
                    color: "#111",
                    border: "2px solid #111",
                    fontWeight: 800,
                  }}
                  className="w-full py-4 rounded-xl text-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#22c55e]"
                >
                  🌾 Get Crop Recommendations
                </button>

                <div className="flex flex-col md:flex-row gap-3">
                  <button
                    type="button"
                    className="flex-1 py-3 rounded-xl text-base border bg-[var(--secondary,#e0e7ff)] text-[var(--foreground,#222)] border-[var(--border,#a5b4fc)] hover:bg-[var(--secondary,#c7d2fe)] dark:bg-[var(--secondary,#312e81)] dark:text-[var(--foreground,#f3f4f6)] dark:border-[var(--border,#6366f1)] dark:hover:bg-[var(--secondary,#3730a3)]"
                    onClick={() => setStep("start")}
                  >
                    ← Go Back
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-3 rounded-xl text-base border bg-[var(--muted,#f3f4f6)] text-[var(--muted-foreground,#6b7280)] border-[var(--border,#e5e7eb)] hover:bg-[var(--muted,#e5e7eb)]/80 dark:bg-[var(--muted,#27272a)] dark:text-[var(--muted-foreground,#a1a1aa)] dark:border-[var(--border,#3f3f46)] dark:hover:bg-[var(--muted,#18181b)]"
                    onClick={() => setStep("manualLocation")}
                  >
                    Use Location Instead
                  </button>
                </div>
              </div>
            </form>
          </TooltipProvider>
        </>
      )}

      {/* Removed chooseLocation step, now only manualLocation is available */}

      {step === "manualLocation" && (
        <div className="w-full">
          <ManualLocationInput
            onLocationSubmit={(loc) => {
              onLocationSubmit(loc);
            }}
          />
          <button
            className="w-full py-4 text-lg font-semibold rounded-xl border mt-4 bg-[var(--background,#fff)] text-[var(--foreground,#18181b)] border-[var(--border,#e5e7eb)] hover:bg-[var(--muted,#f3f4f6)] dark:bg-[var(--background,#18181b)] dark:text-[var(--foreground,#f3f4f6)] dark:border-[var(--border,#3f3f46)] dark:hover:bg-[var(--muted,#27272a)]"
            onClick={() => setStep("start")}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default NPKOrLocationSelector;
