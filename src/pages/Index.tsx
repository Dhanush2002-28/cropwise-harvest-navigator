import { useState } from "react";
import UILoader from "../components/UILoader";
import EmptyState from "../components/EmptyState";
import { Toaster } from "../components/ui/toaster";
import { useToast } from "../hooks/use-toast";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NPKOrLocationSelector from "../components/NPKOrLocationSelector";
import CropForm from "../components/CropForm";
import RecommendationCard from "../components/RecommendationCard";
import Footer from "../components/Footer";
import { ArrowRight, Leaf, Wheat } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface Location {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  block: string;
  pincode: string;
}

interface FormData {
  interestedCrops: string;
}

// Update the CropRecommendation interface:
interface CropRecommendation {
  pincode: string;
  location: {
    state: string;
    district: string;
    block: string;
  };
  soil_data?: {
    nitrogen: number;
    phosphorous: number;
    potassium: number;
    ph: number;
  };
  weather_data?: {
    temperature: number;
    rainfall: number;
    year: number;
  };
  recommended_crops: Array<{
    crop: string;
    probability: number;
  }>;
}

// Fix the RecommendationCardProps interface
interface RecommendationCardProps {
  location: Location | null;
  npk: { n: number; p: number; k: number };
  cropRecommendation?: CropRecommendation | null;
}

const Index = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [location, setLocation] = useState<Location | null>(null);
  // Removed formData and CropForm step
  const [npk, setNpk] = useState<{
    n: number;
    p: number;
    k: number;
    ph?: number;
  }>({ n: 0, p: 0, k: 0 });
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [cropRecommendation, setCropRecommendation] =
    useState<CropRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState<string>("");

  // Start over handler
  const handleStartOver = () => {
    setLocation(null);
    setNpk({ n: 0, p: 0, k: 0 });
    setCropRecommendation(null);
  };

  // Convert numerical NPK to categorical
  const getNPKCategory = (n: number, p: number, k: number) => {
    const N_status = n < 280 ? "Low" : n <= 560 ? "Medium" : "High";
    const P_status = p < 10 ? "Low" : p <= 24.6 ? "Medium" : "High";
    const K_status = k < 108 ? "Low" : k <= 280 ? "Medium" : "High";
    return { N_status, P_status, K_status };
  };

  // Handler for NPKOrLocationSelector
  const handleNPKSubmit = (data: {
    n: number;
    p: number;
    k: number;
    ph?: number;
  }) => {
    console.log("Index.tsx handleNPKSubmit called with:", data);
    console.log(
      "Current states before update - loading:",
      loading,
      "cropRecommendation:",
      cropRecommendation
    );

    setNpk(data);
    setShowLocationInput(false);

    // Always set a dummy location for manual NPK input
    setLocation({
      latitude: 0,
      longitude: 0,
      state: "Manual",
      district: "Manual",
      block: "Manual",
      pincode: "Manual",
    });

    setLoaderMessage("Fetching recommendations based on NPK values...");
    setLoading(true);

    // Simulate recommendation fetch with realistic mock data
    setTimeout(() => {
      console.log(
        "Timeout completed, setting loading to false and adding recommendations..."
      );

      const newRecommendation = {
        pincode: "Manual",
        location: {
          state: "Manual",
          district: "Manual",
          block: "Manual",
        },
        soil_data: {
          nitrogen: data.n,
          phosphorous: data.p,
          potassium: data.k,
          ph: data.ph || 7,
        },
        weather_data: { temperature: 28, rainfall: 120, year: 2025 },
        recommended_crops: [
          { crop: "Rice", probability: 0.92 },
          { crop: "Wheat", probability: 0.85 },
          { crop: "Maize", probability: 0.78 },
        ],
      };

      setLoading(false);
      setCropRecommendation(newRecommendation);

      toast({
        title: "Recommendations Ready",
        description: "Your crop recommendations are ready! (Demo Mode)",
      });
    }, 1800);
  };

  // Handler for manual location input
  const handleManualLocation = ({
    state,
    district,
    block,
  }: {
    state: string;
    district: string;
    block: string;
  }) => {
    setLocation({
      latitude: 0,
      longitude: 0,
      state,
      district,
      block,
      pincode: "Manual",
    });
    setLoaderMessage(`Fetching recommendations for ${district}, ${state}...`);
    setLoading(true);

    // Simulate recommendation fetch with location-specific mock data
    setTimeout(() => {
      setLoading(false);
      setCropRecommendation({
        pincode: "Manual",
        location: { state, district, block },
        soil_data: {
          nitrogen: npk.n || 300,
          phosphorous: npk.p || 15,
          potassium: npk.k || 120,
          ph: npk.ph || 6.8,
        },
        weather_data: { temperature: 26, rainfall: 180, year: 2025 },
        recommended_crops: [
          { crop: "Rice", probability: 0.89 },
          { crop: "Sugarcane", probability: 0.82 },
          { crop: "Cotton", probability: 0.75 },
        ],
      });
      toast({
        title: "Recommendations Ready",
        description: `Crop recommendations for ${district}, ${state} are ready! (Demo Mode)`,
      });
    }, 1800);
  };

  // Removed handleFormSubmit and CropForm

  // Debug logging
  console.log(
    "Current render state - loading:",
    loading,
    "cropRecommendation:",
    !!cropRecommendation,
    "cropRecommendation === null:",
    cropRecommendation === null,
    "typeof cropRecommendation:",
    typeof cropRecommendation
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

      <main id="content-section" className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium">
                  Smart Agriculture
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("hero.subtitle")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("recommendations.fill_form")}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center min-h-[70vh]">
                {/* Centered Questionnaire with enhanced styling */}
                <div className="w-full max-w-4xl">
                  {/* Only show the questionnaire until it's complete */}
                  {cropRecommendation === null ? (
                    <div>
                      <p className="text-sm text-gray-500 mb-4">
                        Debug: Showing NPKOrLocationSelector (cropRecommendation
                        is null: {String(cropRecommendation === null)})
                      </p>
                      <NPKOrLocationSelector
                        onNPKSubmit={handleNPKSubmit}
                        onLocationSubmit={handleManualLocation}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-8 mt-8 w-full">
                      <p className="text-sm text-green-500 mb-4">
                        Debug: Showing RecommendationCard
                      </p>
                      <div className="w-full flex justify-center">
                        <RecommendationCard
                          location={location}
                          npk={npk}
                          cropRecommendation={cropRecommendation}
                        />
                      </div>
                      <button
                        className="mt-4 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition"
                        onClick={handleStartOver}
                      >
                        Start Over
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium">
                  {t("features.title")}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("features.title")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("features.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass p-6 rounded-xl card-shine">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("features.precision.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("features.precision.desc")}
                  </p>
                </div>

                <div className="glass p-6 rounded-xl card-shine">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Wheat className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("features.optimization.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("features.optimization.desc")}
                  </p>
                </div>

                <div className="glass p-6 rounded-xl card-shine">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("features.easy.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("features.easy.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Toaster />
      {loading && (
        <UILoader message={loaderMessage || "Fetching recommendations..."} />
      )}
    </div>
  );
};

export default Index;
