import { useState } from "react";
import { getCropRecommendations } from "../services/cropRecommendationService";
import UILoader from "../components/UILoader";
import EmptyState from "../components/EmptyState";
import { Toaster } from "../components/ui/toaster";
import { useToast } from "../hooks/use-toast";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NPKOrLocationSelector from "../components/NPKOrLocationSelector";
import CropForm from "../components/CropForm";
import RecommendationCard from "../components/RecommendationCard";
import CoverageMap from "../components/CoverageMap";
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

// Local interface to avoid conflict with imported CropRecommendation type
interface LocalCropRecommendation {
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
  cropRecommendation?: LocalCropRecommendation | null;
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
    useState<LocalCropRecommendation | null>(null);
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
  const handleNPKSubmit = async (data: {
    n: number;
    p: number;
    k: number;
    ph?: number;
  }) => {
    setNpk(data);
    setShowLocationInput(false);
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
    setCropRecommendation(null);
    try {
      // Convert NPK values to status
      const N_status = data.n < 280 ? "Low" : data.n <= 560 ? "Medium" : "High";
      const P_status = data.p < 10 ? "Low" : data.p <= 24.6 ? "Medium" : "High";
      const K_status = data.k < 108 ? "Low" : data.k <= 280 ? "Medium" : "High";
      let ph_status: "Acidic" | "Neutral" | "Alkaline" = "Neutral";
      if (data.ph !== undefined) {
        if (data.ph < 6.5) ph_status = "Acidic";
        else if (data.ph > 7.5) ph_status = "Alkaline";
      }
      const response = await getCropRecommendations({
        method: "npk",
        nitrogen_status: N_status,
        phosphorus_status: P_status,
        potassium_status: K_status,
        ph_status,
      });
      setLoading(false);
      setCropRecommendation({
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
          ph: data.ph,
        },
        weather_data: undefined,
        recommended_crops: Array.isArray(response)
          ? response.map((crop) => ({ crop, probability: 1 }))
          : Array.isArray(response.predictions)
          ? response.predictions.map((crop) => ({ crop, probability: 1 }))
          : [],
      });
      toast({
        title: "Recommendations Ready",
        description: "Your crop recommendations are ready!",
      });
    } catch (err: unknown) {
      setLoading(false);
      let message = "Failed to fetch recommendations.";
      if (err && typeof err === "object" && "message" in err) {
        const e = err as { message?: string };
        if (typeof e.message === "string") {
          message = e.message;
        }
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  // Handler for manual location input
  const handleManualLocation = async ({
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
    setCropRecommendation(null);
    try {
      const response = await getCropRecommendations({
        method: "manual_location",
        state,
        district,
        block,
      });
      setLoading(false);
      setCropRecommendation({
        pincode: "Manual",
        location: {
          state: response.nearest_state || state,
          district: response.nearest_district || district,
          block: response.nearest_block || block,
        },
        // Use backend soil_data if present, else undefined
        soil_data: response.soil_data
          ? {
              nitrogen: response.soil_data.nitrogen,
              phosphorous: response.soil_data.phosphorous,
              potassium: response.soil_data.potassium,
              ph: response.soil_data.ph,
            }
          : undefined,
        // weather_data: response.weather_data, // Removed because property does not exist
        weather_data: undefined,
        recommended_crops: Array.isArray(response.predictions)
          ? response.predictions.map((crop) => ({ crop, probability: 1 }))
          : [],
      });      
      toast({
        title: "Recommendations Ready",
        description: `Crop recommendations for ${
          response.nearest_district || district
        }, ${response.nearest_state || state} are ready!`,
      });
    } catch (err: unknown) {
      setLoading(false);
      let message = "Failed to fetch recommendations.";
      if (err && typeof err === "object" && "message" in err) {
        const e = err as { message?: string };
        if (typeof e.message === "string") {
          message = e.message;
        }
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  // Removed handleFormSubmit and CropForm


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
                      
                      <NPKOrLocationSelector
                        onNPKSubmit={handleNPKSubmit}
                        onLocationSubmit={handleManualLocation}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-8 mt-8 w-full">
                      
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

        {/* Coverage Map Section */}
        
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
