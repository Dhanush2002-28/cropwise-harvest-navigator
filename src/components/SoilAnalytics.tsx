import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Leaf, Droplet, Activity } from "lucide-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface SoilAnalyticsProps {
  soilData?: {
    nitrogen: number | string;
    phosphorous: number | string;
    potassium: number | string;
    ph?: number | string;
  };
  recommendedCrops: Array<{
    crop: string;
    probability: number;
  }>;
}

const SoilAnalytics: React.FC<SoilAnalyticsProps> = ({
  soilData,
  recommendedCrops,
}) => {
  if (!soilData) {
    return null;
  }

  // Helper functions
  const getPhStatus = (ph?: number | string) => {
    const numPh = typeof ph === "number" ? ph : Number(ph);
    if (!numPh || isNaN(numPh)) return "Unknown";
    if (numPh < 6.5) return "Acidic";
    if (numPh > 7.5) return "Alkaline";
    return "Neutral";
  };

  const getPhColor = (ph?: number | string) => {
    const numPh = typeof ph === "number" ? ph : Number(ph);
    if (!numPh || isNaN(numPh)) return "bg-gray-500";
    if (numPh < 6.5) return "bg-red-500";
    if (numPh > 7.5) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Low":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "High":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  // NPK Distribution Pie Chart Data
  const safeNitrogen =
    typeof soilData.nitrogen === "number"
      ? soilData.nitrogen
      : Number(soilData.nitrogen) || 0;
  const safePhosphorous =
    typeof soilData.phosphorous === "number"
      ? soilData.phosphorous
      : Number(soilData.phosphorous) || 0;
  const safePotassium =
    typeof soilData.potassium === "number"
      ? soilData.potassium
      : Number(soilData.potassium) || 0;

  const npkTotal = safeNitrogen + safePhosphorous + safePotassium;

  // If all values are 0, use default values for demonstration
  const hasValidData = npkTotal > 0;
  const displayData = hasValidData
    ? [safeNitrogen, safePhosphorous, safePotassium]
    : [40, 20, 30]; // Default demo values

  const npkPieData = {
    labels: ["Nitrogen (N)", "Phosphorous (P)", "Potassium (K)"],
    datasets: [
      {
        data: displayData,
        backgroundColor: [
          "#10b981", // Green for Nitrogen
          "#f59e0b", // Amber for Phosphorous
          "#8b5cf6", // Purple for Potassium
        ],
        borderColor: ["#059669", "#d97706", "#7c3aed"],
        borderWidth: 2,
      },
    ],
  };

  const npkPieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "NPK Distribution",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: number; label: string }) => {
            const total = hasValidData ? npkTotal : 90; // Use correct total for percentage
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Debug info
  console.log("NPK Data Debug:", {
    nitrogen: safeNitrogen,
    phosphorous: safePhosphorous,
    potassium: safePotassium,
    total: npkTotal,
    hasValidData,
    displayData,
  });

  // NPK Status Categories
  const getNPKStatus = (
    n: number | undefined,
    p: number | undefined,
    k: number | undefined
  ) => {
    const safeN = typeof n === "number" ? n : 0;
    const safeP = typeof p === "number" ? p : 0;
    const safeK = typeof k === "number" ? k : 0;

    return {
      nitrogen: safeN < 280 ? "Low" : safeN <= 560 ? "Medium" : "High",
      phosphorous: safeP < 10 ? "Low" : safeP <= 24.6 ? "Medium" : "High",
      potassium: safeK < 108 ? "Low" : safeK <= 280 ? "Medium" : "High",
    };
  };

  const npkStatus = getNPKStatus(
    typeof soilData.nitrogen === "number"
      ? soilData.nitrogen
      : Number(soilData.nitrogen) || 0,
    typeof soilData.phosphorous === "number"
      ? soilData.phosphorous
      : Number(soilData.phosphorous) || 0,
    typeof soilData.potassium === "number"
      ? soilData.potassium
      : Number(soilData.potassium) || 0
  );

  // NPK Status Bar Chart
  const statusValues = {
    nitrogen:
      npkStatus.nitrogen === "Low"
        ? 1
        : npkStatus.nitrogen === "Medium"
        ? 2
        : 3,
    phosphorous:
      npkStatus.phosphorous === "Low"
        ? 1
        : npkStatus.phosphorous === "Medium"
        ? 2
        : 3,
    potassium:
      npkStatus.potassium === "Low"
        ? 1
        : npkStatus.potassium === "Medium"
        ? 2
        : 3,
  };

  const statusBarData = {
    labels: ["Nitrogen", "Phosphorous", "Potassium"],
    datasets: [
      {
        label: "Nutrient Levels",
        data: [
          statusValues.nitrogen,
          statusValues.phosphorous,
          statusValues.potassium,
        ],
        backgroundColor: [
          statusValues.nitrogen === 1
            ? "#ef4444"
            : statusValues.nitrogen === 2
            ? "#f59e0b"
            : "#10b981",
          statusValues.phosphorous === 1
            ? "#ef4444"
            : statusValues.phosphorous === 2
            ? "#f59e0b"
            : "#10b981",
          statusValues.potassium === 1
            ? "#ef4444"
            : statusValues.potassium === 2
            ? "#f59e0b"
            : "#10b981",
        ],
        borderColor: [
          statusValues.nitrogen === 1
            ? "#dc2626"
            : statusValues.nitrogen === 2
            ? "#d97706"
            : "#059669",
          statusValues.phosphorous === 1
            ? "#dc2626"
            : statusValues.phosphorous === 2
            ? "#d97706"
            : "#059669",
          statusValues.potassium === 1
            ? "#dc2626"
            : statusValues.potassium === 2
            ? "#d97706"
            : "#059669",
        ],
        borderWidth: 1,
      },
    ],
  };

  const statusBarOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Nutrient Status Levels",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { y: number }; label: string }) => {
            const level =
              context.parsed.y === 1
                ? "Low"
                : context.parsed.y === 2
                ? "Medium"
                : "High";
            return `${context.label}: ${level}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: (value: string | number) => {
            const numValue = Number(value);
            return numValue === 1
              ? "Low"
              : numValue === 2
              ? "Medium"
              : numValue === 3
              ? "High"
              : "";
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* NPK Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Nitrogen</p>
                <p className="text-2xl font-bold">
                  {typeof soilData.nitrogen === "number"
                    ? soilData.nitrogen
                    : soilData.nitrogen || "N/A"}
                </p>
                <Badge className={getStatusColor(npkStatus.nitrogen)}>
                  {npkStatus.nitrogen}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-sm text-muted-foreground">Phosphorous</p>
                <p className="text-2xl font-bold">
                  {typeof soilData.phosphorous === "number"
                    ? soilData.phosphorous
                    : soilData.phosphorous || "N/A"}
                </p>
                
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Droplet className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Potassium</p>
                <p className="text-2xl font-bold">
                  {typeof soilData.potassium === "number"
                    ? soilData.potassium
                    : soilData.potassium || "N/A"}
                </p>
                
              </div>
            </div>
          </CardContent>
        </Card>

        {soilData.ph && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-5 h-5 rounded-full ${getPhColor(soilData.ph)}`}
                />
                <div>
                  <p className="text-sm text-muted-foreground">pH Level</p>
                  <p className="text-2xl font-bold">
                    {typeof soilData.ph === "number"
                      ? soilData.ph.toFixed(1)
                      : soilData.ph || "N/A"}
                  </p>
                  
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NPK Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>NPK Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Pie data={npkPieData} options={npkPieOptions} />
            </div>
          </CardContent>
        </Card>

        {/* NPK Status Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Nutrient Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={statusBarData} options={statusBarOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations based on soil data */}
      {recommendedCrops.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Soil-Based Crop Suitability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your soil's NPK levels and pH, these crops are
              recommended:
            </p>
            <div className="flex flex-wrap gap-2">
              {recommendedCrops.slice(0, 6).map((crop, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {crop.crop}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SoilAnalytics;
