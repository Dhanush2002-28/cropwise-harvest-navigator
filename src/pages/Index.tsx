import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LocationTracker from "../components/LocationTracker";
import ManualLocationInput from "../components/ManualLocationInput";
import NPKInput from "../components/NPKInput";
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

// Add proper typing for crop recommendation
interface CropRecommendation {
  pincode: string;
  location: {
    state: string;
    district: string;
    block: string;
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
  cropRecommendation?: CropRecommendation | null; // Add this prop
}

const Index = () => {
  const { t } = useLanguage();
  const [location, setLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState<FormData>({
    interestedCrops: "",
  });
  const [npk, setNpk] = useState({ n: 0, p: 0, k: 0 });
  const [cropRecommendation, setCropRecommendation] =
    useState<CropRecommendation | null>(null); // Fix typing

  const handleLocationChange = (newLocation: Location) => {
    setLocation(newLocation);
    console.log("Location updated:", newLocation);
  };

  const handleCropRecommendation = (recommendation: CropRecommendation) => {
    setCropRecommendation(recommendation);
    console.log("Crop recommendation received:", recommendation);
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
  };

  // Add debug logging to see when NPK values change
  const handleNpkChange = (newNpk: { n: number; p: number; k: number }) => {
    console.log("NPK state updated in Index:", newNpk);
    setNpk(newNpk);
  };

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <LocationTracker
                    onLocationChange={handleLocationChange}
                    onCropRecommendation={handleCropRecommendation}
                  />
                  <NPKInput onChange={handleNpkChange} />
                  <CropForm onSubmit={handleFormSubmit} />
                </div>
                <div>
                  <RecommendationCard
                    location={location}
                    npk={npk}
                    cropRecommendation={cropRecommendation} // Now properly typed
                  />
                </div>
              </div>

              {/* Display crop recommendations if available */}
              {cropRecommendation && (
                <div className="mt-12 max-w-4xl mx-auto">
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-6">
                      Crop Recommendations for Pincode:{" "}
                      {cropRecommendation.pincode}
                    </h3>

                    {/* Location Info */}
                    <div className="mb-6 p-4 bg-secondary/20 rounded-lg">
                      <p className="text-muted-foreground mb-2">
                        <strong>Location:</strong>{" "}
                        {cropRecommendation.location?.state},{" "}
                        {cropRecommendation.location?.district}
                      </p>

                      {/* NPK Values Display */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3 text-primary">
                          🧪 Soil NPK Values
                        </h4>
                        {npk.n === 0 && npk.p === 0 && npk.k === 0 ? (
                          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg text-center">
                            <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                              ⚠️ NPK values not provided
                            </p>
                            <p className="text-xs text-orange-600 dark:text-orange-400">
                              Enter your soil NPK values above for personalized
                              recommendations
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-3">
                            <div className="text-center p-3 bg-primary/5 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">
                                Nitrogen
                              </p>
                              <p className="font-bold text-lg text-primary">
                                {npk.n}
                              </p>
                            </div>
                            <div className="text-center p-3 bg-primary/5 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">
                                Phosphorus
                              </p>
                              <p className="font-bold text-lg text-primary">
                                {npk.p}
                              </p>
                            </div>
                            <div className="text-center p-3 bg-primary/5 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">
                                Potassium
                              </p>
                              <p className="font-bold text-lg text-primary">
                                {npk.k}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Recommended Crops */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4">
                        Recommended Crops:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cropRecommendation.recommended_crops?.map(
                          (crop, index: number) => (
                            <div
                              key={index}
                              className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Wheat className="w-5 h-5 text-primary" />
                                <h4 className="font-semibold text-lg">
                                  {crop.crop}
                                </h4>
                              </div>
                              <div className="space-y-1">
                                <p className="text-primary font-medium">
                                  {(crop.probability * 100).toFixed(1)}%
                                  confidence
                                </p>
                                <div className="w-full bg-secondary rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${crop.probability * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* NPK Recommendations for each crop (if available) */}
                    {npk.n > 0 || npk.p > 0 || npk.k > 0 ? (
                      <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                          💡 Soil Analysis Summary
                        </h4>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          <p>
                            Based on your soil NPK values (N:{npk.n}, P:{npk.p},
                            K:{npk.k}), the above crops are most suitable for
                            your soil conditions.
                          </p>
                          {npk.n < 50 && (
                            <p className="mt-1">
                              • Consider nitrogen fertilizers to improve crop
                              yield
                            </p>
                          )}
                          {npk.p < 30 && (
                            <p className="mt-1">
                              • Phosphorus levels are low - consider phosphate
                              fertilizers
                            </p>
                          )}
                          {npk.k < 40 && (
                            <p className="mt-1">
                              • Potassium supplementation may be beneficial
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                        <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                          ⚠️ NPK Values Not Provided
                        </h4>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          For more accurate recommendations, please provide your
                          soil NPK values using the form above.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
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

        {/* Add this temporarily in your Index.tsx for testing (after NPKInput): */}
        {import.meta.env.DEV && (
          <div className="glass p-4 rounded-xl">
            <h4 className="font-medium mb-2">Debug Controls</h4>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const testNpk = { n: 45, p: 25, k: 35 };
                  setNpk(testNpk);
                  console.log("Debug: NPK set to:", testNpk);
                }}
                className="px-3 py-1.5 text-sm bg-green-500 text-white rounded"
              >
                Set Test NPK (45,25,35)
              </button>
              <button
                onClick={() => {
                  console.log("Current NPK state:", npk);
                  console.log("Current location:", location);
                  console.log(
                    "Current crop recommendation:",
                    cropRecommendation
                  );
                }}
                className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded"
              >
                Log Current State
              </button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Current NPK: N:{npk.n}, P:{npk.p}, K:{npk.k}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
