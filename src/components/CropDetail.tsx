import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Calendar,
  Droplet,
  Sun,
  TrendingUp,
  DollarSign,
  Thermometer,
  Clock,
  MapPin,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface CropDetailProps {
  cropName: string;
  onBack: () => void;
  soilData?: {
    nitrogen: number | string;
    phosphorous: number | string;
    potassium: number | string;
    ph?: number | string;
  };
}

const CropDetail: React.FC<CropDetailProps> = ({
  cropName,
  onBack,
  soilData,
}) => {
  interface CropData {
    icon: string;
    category: string;
    duration: string;
    season: string;
    waterReq: string;
    tempRange: string;
    soilPh: string;
    avgYield: string;
    marketPrice: string;
    nutrients: {
      nitrogen: number;
      phosphorus: number;
      potassium: number;
    };
    monthlyGrowth: number[];
    monthlyLabels: string[];
    regionalYield: Record<string, number>;
    seasonalRequirements: Record<
      string,
      {
        water: number;
        temperature: number;
        humidity: number;
      }
    >;
  }

  // Mock crop data - in real app, this would come from API
  const getCropData = (crop: string): CropData => {
    const cropDatabase: Record<string, CropData> = {
      rice: {
        icon: "🌾",
        category: "Cereal",
        duration: "120-140 days",
        season: "Kharif (Jun-Nov)",
        waterReq: "High (1200-1500mm)",
        tempRange: "20-35°C",
        soilPh: "6.0-7.0",
        avgYield: "3-5 tons/hectare",
        marketPrice: "₹2000-2500/quintal",
        nutrients: {
          nitrogen: 120,
          phosphorus: 60,
          potassium: 40,
        },
        monthlyGrowth: [10, 25, 40, 65, 85, 100],
        monthlyLabels: [
          "Month 1",
          "Month 2",
          "Month 3",
          "Month 4",
          "Month 5",
          "Harvest",
        ],
        regionalYield: {
          Punjab: 4.5,
          Haryana: 4.2,
          "Uttar Pradesh": 3.8,
          "West Bengal": 4.0,
          "Andhra Pradesh": 3.5,
        },
        seasonalRequirements: {
          Sowing: { water: 80, temperature: 25, humidity: 70 },
          Vegetative: { water: 100, temperature: 28, humidity: 75 },
          Reproductive: { water: 90, temperature: 30, humidity: 80 },
          Maturity: { water: 60, temperature: 32, humidity: 65 },
        },
      },
      maize: {
        icon: "🌽",
        category: "Cereal",
        duration: "90-110 days",
        season: "Kharif/Rabi",
        waterReq: "Medium (500-800mm)",
        tempRange: "21-27°C",
        soilPh: "6.0-7.5",
        avgYield: "5-7 tons/hectare",
        marketPrice: "₹1800-2200/quintal",
        nutrients: {
          nitrogen: 120,
          phosphorus: 60,
          potassium: 50,
        },
        monthlyGrowth: [15, 35, 55, 75, 90, 100],
        monthlyLabels: [
          "Month 1",
          "Month 2",
          "Month 3",
          "Month 4",
          "Month 5",
          "Harvest",
        ],
        regionalYield: {
          Karnataka: 6.5,
          "Andhra Pradesh": 6.0,
          "Tamil Nadu": 5.8,
          Maharashtra: 5.2,
          "Uttar Pradesh": 4.8,
        },
        seasonalRequirements: {
          Sowing: { water: 50, temperature: 23, humidity: 65 },
          Vegetative: { water: 80, temperature: 25, humidity: 70 },
          Tasseling: { water: 100, temperature: 27, humidity: 75 },
          Maturity: { water: 60, temperature: 26, humidity: 65 },
        },
      },
      chickpea: {
        icon: "🌱",
        category: "Legume",
        duration: "120-150 days",
        season: "Rabi (Oct-Mar)",
        waterReq: "Low (300-400mm)",
        tempRange: "15-25°C",
        soilPh: "6.0-7.5",
        avgYield: "1.5-2.0 tons/hectare",
        marketPrice: "₹4000-5000/quintal",
        nutrients: {
          nitrogen: 25,
          phosphorus: 60,
          potassium: 30,
        },
        monthlyGrowth: [10, 25, 45, 70, 90, 100],
        monthlyLabels: [
          "Month 1",
          "Month 2",
          "Month 3",
          "Month 4",
          "Month 5",
          "Harvest",
        ],
        regionalYield: {
          "Madhya Pradesh": 1.8,
          Rajasthan: 1.7,
          Maharashtra: 1.6,
          Karnataka: 1.5,
          "Andhra Pradesh": 1.4,
        },
        seasonalRequirements: {
          Sowing: { water: 35, temperature: 18, humidity: 65 },
          Branching: { water: 45, temperature: 20, humidity: 70 },
          Flowering: { water: 60, temperature: 22, humidity: 75 },
          "Pod Filling": { water: 55, temperature: 24, humidity: 70 },
        },
      },
      kidneybeans: {
        icon: "🫘",
        category: "Legume",
        duration: "90-120 days",
        season: "Kharif/Rabi",
        waterReq: "Medium (400-600mm)",
        tempRange: "15-25°C",
        soilPh: "6.0-7.0",
        avgYield: "1.2-2.0 tons/hectare",
        marketPrice: "₹6000-8000/quintal",
        nutrients: {
          nitrogen: 20,
          phosphorus: 60,
          potassium: 30,
        },
        monthlyGrowth: [15, 35, 60, 85, 100],
        monthlyLabels: ["Month 1", "Month 2", "Month 3", "Month 4", "Harvest"],
        regionalYield: {
          "Himachal Pradesh": 1.8,
          "Jammu & Kashmir": 1.6,
          "Uttar Pradesh": 1.4,
          Karnataka: 1.3,
          Maharashtra: 1.2,
        },
        seasonalRequirements: {
          Sowing: { water: 40, temperature: 18, humidity: 70 },
          Vegetative: { water: 60, temperature: 20, humidity: 75 },
          Flowering: { water: 80, temperature: 22, humidity: 80 },
          "Pod Development": { water: 70, temperature: 24, humidity: 75 },
        },
      },
      pigeonpeas: {
        icon: "🫛",
        category: "Legume",
        duration: "150-180 days",
        season: "Kharif (Jun-Dec)",
        waterReq: "Medium (500-750mm)",
        tempRange: "20-30°C",
        soilPh: "6.0-7.5",
        avgYield: "1.2-2.0 tons/hectare",
        marketPrice: "₹5500-7000/quintal",
        nutrients: {
          nitrogen: 25,
          phosphorus: 50,
          potassium: 30,
        },
        monthlyGrowth: [8, 18, 35, 55, 75, 90, 100],
        monthlyLabels: [
          "Month 1",
          "Month 2",
          "Month 3",
          "Month 4",
          "Month 5",
          "Month 6",
          "Harvest",
        ],
        regionalYield: {
          Maharashtra: 1.8,
          Karnataka: 1.6,
          "Madhya Pradesh": 1.5,
          "Andhra Pradesh": 1.4,
          "Uttar Pradesh": 1.2,
        },
        seasonalRequirements: {
          Sowing: { water: 45, temperature: 25, humidity: 70 },
          Vegetative: { water: 65, temperature: 27, humidity: 75 },
          Flowering: { water: 85, temperature: 29, humidity: 80 },
          "Pod Development": { water: 75, temperature: 28, humidity: 75 },
        },
      },
      mothbeans: {
        icon: "🫛",
        category: "Legume",
        duration: "75-90 days",
        season: "Kharif (Jul-Oct)",
        waterReq: "Very Low (200-350mm)",
        tempRange: "25-35°C",
        soilPh: "7.0-8.5",
        avgYield: "0.6-1.0 tons/hectare",
        marketPrice: "₹4500-6000/quintal",
        nutrients: {
          nitrogen: 15,
          phosphorus: 40,
          potassium: 20,
        },
        monthlyGrowth: [20, 50, 80, 100],
        monthlyLabels: ["Month 1", "Month 2", "Month 3", "Harvest"],
        regionalYield: {
          Rajasthan: 0.9,
          Gujarat: 0.8,
          Haryana: 0.7,
          Punjab: 0.6,
          "Uttar Pradesh": 0.5,
        },
        seasonalRequirements: {
          Sowing: { water: 25, temperature: 27, humidity: 60 },
          Vegetative: { water: 35, temperature: 30, humidity: 65 },
          Flowering: { water: 50, temperature: 33, humidity: 70 },
          Maturity: { water: 30, temperature: 35, humidity: 60 },
        },
      },
      mungbean: {
        icon: "🟢",
        category: "Legume",
        duration: "60-90 days",
        season: "Kharif/Summer",
        waterReq: "Low (300-400mm)",
        tempRange: "25-35°C",
        soilPh: "6.2-7.2",
        avgYield: "0.8-1.2 tons/hectare",
        marketPrice: "₹6000-8000/quintal",
        nutrients: {
          nitrogen: 15,
          phosphorus: 40,
          potassium: 20,
        },
        monthlyGrowth: [20, 50, 80, 100],
        monthlyLabels: ["Month 1", "Month 2", "Month 3", "Harvest"],
        regionalYield: {
          Rajasthan: 1.1,
          "Andhra Pradesh": 1.0,
          Karnataka: 0.9,
          Maharashtra: 0.8,
          "Tamil Nadu": 0.7,
        },
        seasonalRequirements: {
          Sowing: { water: 35, temperature: 27, humidity: 65 },
          Flowering: { water: 55, temperature: 30, humidity: 70 },
          "Pod Formation": { water: 65, temperature: 32, humidity: 75 },
          Maturity: { water: 40, temperature: 33, humidity: 65 },
        },
      },
      blackgram: {
        icon: "⚫",
        category: "Legume",
        duration: "70-90 days",
        season: "Kharif/Rabi",
        waterReq: "Low (300-400mm)",
        tempRange: "25-35°C",
        soilPh: "6.5-7.5",
        avgYield: "0.8-1.0 tons/hectare",
        marketPrice: "₹7000-9000/quintal",
        nutrients: {
          nitrogen: 15,
          phosphorus: 40,
          potassium: 20,
        },
        monthlyGrowth: [25, 60, 90, 100],
        monthlyLabels: ["Month 1", "Month 2", "Month 3", "Harvest"],
        regionalYield: {
          "Andhra Pradesh": 0.9,
          "Tamil Nadu": 0.8,
          Karnataka: 0.8,
          "Madhya Pradesh": 0.7,
          Maharashtra: 0.6,
        },
        seasonalRequirements: {
          Sowing: { water: 30, temperature: 27, humidity: 65 },
          Flowering: { water: 50, temperature: 30, humidity: 70 },
          "Pod Filling": { water: 60, temperature: 32, humidity: 75 },
          Maturity: { water: 35, temperature: 33, humidity: 65 },
        },
      },
      lentil: {
        icon: "🫘",
        category: "Legume",
        duration: "110-130 days",
        season: "Rabi (Oct-Mar)",
        waterReq: "Low (300-400mm)",
        tempRange: "18-25°C",
        soilPh: "6.0-7.5",
        avgYield: "1.0-1.5 tons/hectare",
        marketPrice: "₹5000-6000/quintal",
        nutrients: {
          nitrogen: 20,
          phosphorus: 60,
          potassium: 30,
        },
        monthlyGrowth: [10, 25, 45, 70, 90, 100],
        monthlyLabels: [
          "Month 1",
          "Month 2",
          "Month 3",
          "Month 4",
          "Month 5",
          "Harvest",
        ],
        regionalYield: {
          "Madhya Pradesh": 1.4,
          "Uttar Pradesh": 1.3,
          "West Bengal": 1.2,
          Bihar: 1.1,
          Jharkhand: 1.0,
        },
        seasonalRequirements: {
          Sowing: { water: 30, temperature: 20, humidity: 65 },
          Branching: { water: 40, temperature: 22, humidity: 70 },
          Flowering: { water: 55, temperature: 24, humidity: 75 },
          "Pod Filling": { water: 50, temperature: 25, humidity: 70 },
        },
      },
      pomegranate: {
        icon: "🍇",
        category: "Fruit",
        duration: "365+ days (Perennial)",
        season: "Year-round",
        waterReq: "Medium (800-1200mm)",
        tempRange: "15-35°C",
        soilPh: "6.5-7.5",
        avgYield: "15-25 tons/hectare",
        marketPrice: "₹4000-8000/quintal",
        nutrients: {
          nitrogen: 400,
          phosphorus: 150,
          potassium: 600,
        },
        monthlyGrowth: [5, 15, 30, 50, 70, 85, 95, 100],
        monthlyLabels: [
          "M1-3",
          "M4-6",
          "M7-9",
          "M10-12",
          "Year 2",
          "Year 3",
          "Year 4",
          "Maturity",
        ],
        regionalYield: {
          Maharashtra: 22,
          Karnataka: 20,
          "Andhra Pradesh": 18,
          Gujarat: 16,
          Rajasthan: 15,
        },
        seasonalRequirements: {
          Planting: { water: 60, temperature: 20, humidity: 60 },
          Flowering: { water: 100, temperature: 25, humidity: 65 },
          "Fruit Development": { water: 120, temperature: 30, humidity: 70 },
          Harvesting: { water: 80, temperature: 28, humidity: 65 },
        },
      },
      banana: {
        icon: "🍌",
        category: "Fruit",
        duration: "365+ days (Perennial)",
        season: "Year-round",
        waterReq: "High (1500-2500mm)",
        tempRange: "26-30°C",
        soilPh: "6.0-7.5",
        avgYield: "40-60 tons/hectare",
        marketPrice: "₹1500-3000/quintal",
        nutrients: {
          nitrogen: 200,
          phosphorus: 60,
          potassium: 300,
        },
        monthlyGrowth: [8, 20, 35, 55, 75, 90, 98, 100],
        monthlyLabels: [
          "M1-2",
          "M3-4",
          "M5-6",
          "M7-8",
          "M9-10",
          "M11-12",
          "M13-14",
          "Harvest",
        ],
        regionalYield: {
          "Tamil Nadu": 55,
          Karnataka: 50,
          Maharashtra: 45,
          "Andhra Pradesh": 42,
          Gujarat: 40,
        },
        seasonalRequirements: {
          Planting: { water: 120, temperature: 27, humidity: 80 },
          Vegetative: { water: 180, temperature: 29, humidity: 85 },
          Flowering: { water: 200, temperature: 30, humidity: 90 },
          "Fruit Development": { water: 160, temperature: 28, humidity: 85 },
        },
      },
      mango: {
        icon: "🥭",
        category: "Fruit",
        duration: "365+ days (Perennial)",
        season: "Year-round",
        waterReq: "Medium (600-1200mm)",
        tempRange: "24-30°C",
        soilPh: "6.0-7.5",
        avgYield: "8-15 tons/hectare",
        marketPrice: "₹2000-6000/quintal",
        nutrients: {
          nitrogen: 500,
          phosphorus: 250,
          potassium: 750,
        },
        monthlyGrowth: [3, 8, 15, 25, 40, 60, 80, 100],
        monthlyLabels: [
          "Year 1",
          "Year 2",
          "Year 3",
          "Year 4",
          "Year 5",
          "Year 6",
          "Year 7",
          "Maturity",
        ],
        regionalYield: {
          "Uttar Pradesh": 12,
          "Andhra Pradesh": 11,
          Karnataka: 10,
          Bihar: 9,
          Gujarat: 8,
        },
        seasonalRequirements: {
          Planting: { water: 50, temperature: 25, humidity: 70 },
          Flowering: { water: 80, temperature: 28, humidity: 75 },
          "Fruit Development": { water: 120, temperature: 30, humidity: 80 },
          Harvesting: { water: 60, temperature: 32, humidity: 70 },
        },
      },
      grapes: {
        icon: "🍇",
        category: "Fruit",
        duration: "365+ days (Perennial)",
        season: "Year-round",
        waterReq: "Medium (500-1200mm)",
        tempRange: "15-35°C",
        soilPh: "6.0-8.0",
        avgYield: "20-40 tons/hectare",
        marketPrice: "₹3000-8000/quintal",
        nutrients: {
          nitrogen: 120,
          phosphorus: 60,
          potassium: 200,
        },
        monthlyGrowth: [10, 25, 45, 65, 80, 95, 100],
        monthlyLabels: [
          "M1-2",
          "M3-4",
          "M5-6",
          "M7-8",
          "M9-10",
          "M11-12",
          "Harvest",
        ],
        regionalYield: {
          Maharashtra: 35,
          Karnataka: 32,
          "Andhra Pradesh": 28,
          "Tamil Nadu": 25,
          Gujarat: 22,
        },
        seasonalRequirements: {
          Pruning: { water: 40, temperature: 20, humidity: 60 },
          "Bud Break": { water: 60, temperature: 25, humidity: 65 },
          Flowering: { water: 80, temperature: 30, humidity: 70 },
          "Fruit Development": { water: 100, temperature: 32, humidity: 75 },
        },
      },
      watermelon: {
        icon: "🍉",
        category: "Fruit",
        duration: "90-120 days",
        season: "Summer (Feb-Jun)",
        waterReq: "Medium (400-600mm)",
        tempRange: "25-35°C",
        soilPh: "6.0-7.0",
        avgYield: "25-50 tons/hectare",
        marketPrice: "₹500-1500/quintal",
        nutrients: {
          nitrogen: 100,
          phosphorus: 50,
          potassium: 150,
        },
        monthlyGrowth: [15, 40, 70, 100],
        monthlyLabels: ["Month 1", "Month 2", "Month 3", "Harvest"],
        regionalYield: {
          "Uttar Pradesh": 45,
          Rajasthan: 40,
          Maharashtra: 35,
          "Andhra Pradesh": 32,
          Karnataka: 30,
        },
        seasonalRequirements: {
          Sowing: { water: 40, temperature: 27, humidity: 70 },
          Vegetative: { water: 70, temperature: 30, humidity: 75 },
          Flowering: { water: 90, temperature: 33, humidity: 80 },
          "Fruit Development": { water: 80, temperature: 35, humidity: 75 },
        },
      },
      muskmelon: {
        icon: "🍈",
        category: "Fruit",
        duration: "90-120 days",
        season: "Summer (Feb-Jun)",
        waterReq: "Medium (400-600mm)",
        tempRange: "25-35°C",
        soilPh: "6.0-7.5",
        avgYield: "15-30 tons/hectare",
        marketPrice: "₹800-2000/quintal",
        nutrients: {
          nitrogen: 80,
          phosphorus: 40,
          potassium: 120,
        },
        monthlyGrowth: [15, 40, 70, 100],
        monthlyLabels: ["Month 1", "Month 2", "Month 3", "Harvest"],
        regionalYield: {
          "Uttar Pradesh": 28,
          Rajasthan: 25,
          Punjab: 22,
          Haryana: 20,
          Gujarat: 18,
        },
        seasonalRequirements: {
          Sowing: { water: 40, temperature: 27, humidity: 70 },
          Vegetative: { water: 70, temperature: 30, humidity: 75 },
          Flowering: { water: 90, temperature: 33, humidity: 80 },
          "Fruit Development": { water: 80, temperature: 35, humidity: 75 },
        },
      },
      apple: {
        icon: "🍎",
        category: "Fruit",
        duration: "365+ days (Perennial)",
        season: "Year-round",
        waterReq: "Medium (600-1000mm)",
        tempRange: "15-24°C",
        soilPh: "6.0-7.0",
        avgYield: "15-30 tons/hectare",
        marketPrice: "₹4000-10000/quintal",
        nutrients: {
          nitrogen: 150,
          phosphorus: 75,
          potassium: 200,
        },
        monthlyGrowth: [5, 15, 30, 50, 70, 85, 95, 100],
        monthlyLabels: [
          "Year 1",
          "Year 2",
          "Year 3",
          "Year 4",
          "Year 5",
          "Year 6",
          "Year 7",
          "Maturity",
        ],
        regionalYield: {
          "Himachal Pradesh": 28,
          "Jammu & Kashmir": 25,
          Uttarakhand: 20,
          "Arunachal Pradesh": 18,
          Sikkim: 15,
        },
        seasonalRequirements: {
          Dormancy: { water: 20, temperature: 5, humidity: 60 },
          "Bud Break": { water: 40, temperature: 15, humidity: 65 },
          Flowering: { water: 60, temperature: 20, humidity: 70 },
          "Fruit Development": { water: 80, temperature: 22, humidity: 75 },
        },
      },
      orange: {
        icon: "🍊",
        category: "Fruit",
        duration: "365+ days (Perennial)",
        season: "Year-round",
        waterReq: "Medium (800-1200mm)",
        tempRange: "20-30°C",
        soilPh: "6.0-7.5",
        avgYield: "20-35 tons/hectare",
        marketPrice: "₹2000-5000/quintal",
        nutrients: {
          nitrogen: 300,
          phosphorus: 150,
          potassium: 400,
        },
        monthlyGrowth: [8, 20, 35, 55, 75, 90, 100],
        monthlyLabels: [
          "Year 1",
          "Year 2",
          "Year 3",
          "Year 4",
          "Year 5",
          "Year 6",
          "Maturity",
        ],
        regionalYield: {
          Maharashtra: 32,
          "Andhra Pradesh": 28,
          Karnataka: 25,
          "Tamil Nadu": 22,
          Punjab: 20,
        },
        seasonalRequirements: {
          Planting: { water: 60, temperature: 22, humidity: 70 },
          Flowering: { water: 90, temperature: 26, humidity: 75 },
          "Fruit Development": { water: 120, temperature: 28, humidity: 80 },
          Harvesting: { water: 80, temperature: 30, humidity: 75 },
        },
      },
      papaya: {
        icon: "🥭",
        category: "Fruit",
        duration: "365+ days (Perennial)",
        season: "Year-round",
        waterReq: "High (1200-2000mm)",
        tempRange: "22-28°C",
        soilPh: "6.0-7.0",
        avgYield: "50-80 tons/hectare",
        marketPrice: "₹1500-3500/quintal",
        nutrients: {
          nitrogen: 250,
          phosphorus: 100,
          potassium: 400,
        },
        monthlyGrowth: [15, 35, 55, 75, 90, 100],
        monthlyLabels: ["M1-3", "M4-6", "M7-9", "M10-12", "M13-18", "Maturity"],
        regionalYield: {
          "Andhra Pradesh": 75,
          Karnataka: 70,
          "Tamil Nadu": 65,
          Maharashtra: 60,
          Gujarat: 55,
        },
        seasonalRequirements: {
          Planting: { water: 100, temperature: 24, humidity: 75 },
          Vegetative: { water: 150, temperature: 26, humidity: 80 },
          Flowering: { water: 180, temperature: 27, humidity: 85 },
          Fruiting: { water: 160, temperature: 28, humidity: 80 },
        },
      },
      coconut: {
        icon: "🥥",
        category: "Fruit",
        duration: "365+ days (Perennial)",
        season: "Year-round",
        waterReq: "High (1500-2500mm)",
        tempRange: "27-35°C",
        soilPh: "5.5-8.0",
        avgYield: "8000-12000 nuts/hectare",
        marketPrice: "₹15-30/nut",
        nutrients: {
          nitrogen: 1300,
          phosphorus: 520,
          potassium: 2000,
        },
        monthlyGrowth: [2, 5, 10, 20, 35, 55, 75, 100],
        monthlyLabels: [
          "Year 1-2",
          "Year 3-4",
          "Year 5-6",
          "Year 7-8",
          "Year 9-10",
          "Year 11-12",
          "Year 13-15",
          "Maturity",
        ],
        regionalYield: {
          Kerala: 11000,
          "Tamil Nadu": 10500,
          Karnataka: 9500,
          "Andhra Pradesh": 9000,
          Odisha: 8500,
        },
        seasonalRequirements: {
          Planting: { water: 120, temperature: 28, humidity: 75 },
          Vegetative: { water: 200, temperature: 30, humidity: 80 },
          Flowering: { water: 250, temperature: 32, humidity: 85 },
          Fruiting: { water: 220, temperature: 33, humidity: 85 },
        },
      },
      cotton: {
        icon: "🌱",
        category: "Cash Crop",
        duration: "180-200 days",
        season: "Kharif (Apr-Oct)",
        waterReq: "Medium (700-1000mm)",
        tempRange: "21-30°C",
        soilPh: "5.8-8.0",
        avgYield: "1.5-2.5 tons/hectare",
        marketPrice: "₹5500-6500/quintal",
        nutrients: {
          nitrogen: 100,
          phosphorus: 50,
          potassium: 50,
        },
        monthlyGrowth: [8, 20, 35, 55, 75, 100],
        monthlyLabels: [
          "Month 1",
          "Month 2",
          "Month 3",
          "Month 4",
          "Month 5",
          "Month 6",
        ],
        regionalYield: {
          Gujarat: 2.2,
          Maharashtra: 1.8,
          Telangana: 2.0,
          Karnataka: 1.6,
          Punjab: 2.4,
        },
        seasonalRequirements: {
          Sowing: { water: 60, temperature: 25, humidity: 65 },
          Squaring: { water: 80, temperature: 27, humidity: 70 },
          Flowering: { water: 100, temperature: 28, humidity: 75 },
          "Boll Formation": { water: 85, temperature: 29, humidity: 70 },
        },
      },
      jute: {
        icon: "🌾",
        category: "Fiber",
        duration: "120-150 days",
        season: "Kharif (Apr-Aug)",
        waterReq: "High (1000-1500mm)",
        tempRange: "25-35°C",
        soilPh: "6.0-7.5",
        avgYield: "2.5-3.5 tons/hectare",
        marketPrice: "₹3500-4500/quintal",
        nutrients: {
          nitrogen: 80,
          phosphorus: 40,
          potassium: 40,
        },
        monthlyGrowth: [15, 35, 60, 85, 100],
        monthlyLabels: ["Month 1", "Month 2", "Month 3", "Month 4", "Harvest"],
        regionalYield: {
          "West Bengal": 3.2,
          Bihar: 2.8,
          Assam: 2.5,
          Odisha: 2.3,
          "Uttar Pradesh": 2.0,
        },
        seasonalRequirements: {
          Sowing: { water: 80, temperature: 27, humidity: 80 },
          Vegetative: { water: 120, temperature: 30, humidity: 85 },
          Flowering: { water: 140, temperature: 32, humidity: 90 },
          "Fiber Development": { water: 100, temperature: 30, humidity: 85 },
        },
      },
      coffee: {
        icon: "☕",
        category: "Beverage",
        duration: "365+ days (Perennial)",
        season: "Year-round",
        waterReq: "High (1500-2500mm)",
        tempRange: "15-25°C",
        soilPh: "6.0-6.5",
        avgYield: "800-1500 kg/hectare",
        marketPrice: "₹12000-25000/quintal",
        nutrients: {
          nitrogen: 275,
          phosphorus: 50,
          potassium: 250,
        },
        monthlyGrowth: [3, 8, 15, 30, 50, 70, 85, 100],
        monthlyLabels: [
          "Year 1",
          "Year 2",
          "Year 3",
          "Year 4",
          "Year 5",
          "Year 6",
          "Year 7",
          "Maturity",
        ],
        regionalYield: {
          Karnataka: 1200,
          Kerala: 1000,
          "Tamil Nadu": 800,
          "Andhra Pradesh": 600,
          Odisha: 400,
        },
        seasonalRequirements: {
          Planting: { water: 120, temperature: 18, humidity: 80 },
          Vegetative: { water: 180, temperature: 20, humidity: 85 },
          Flowering: { water: 200, temperature: 22, humidity: 90 },
          "Berry Development": { water: 160, temperature: 24, humidity: 85 },
        },
      },
    };

    return (
      cropDatabase[crop.toLowerCase()] ||
      cropDatabase[crop.toLowerCase().replace(/\s+/g, "_")] ||
      cropDatabase[crop.toLowerCase().replace(/_/g, "")] || {
        icon: "🌱",
        category: "Unknown",
        duration: "N/A",
        season: "N/A",
        waterReq: "N/A",
        tempRange: "N/A",
        soilPh: "N/A",
        avgYield: "N/A",
        marketPrice: "N/A",
        nutrients: { nitrogen: 0, phosphorus: 0, potassium: 0 },
        monthlyGrowth: [0],
        monthlyLabels: ["N/A"],
        regionalYield: {},
        seasonalRequirements: {},
      }
    );
  };

  const cropData = getCropData(cropName);

  // Growth Chart Data
  const growthChartData = {
    labels: cropData.monthlyLabels,
    datasets: [
      {
        label: "Growth Progress (%)",
        data: cropData.monthlyGrowth,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const growthChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Crop Growth Timeline",
        font: { size: 16, weight: "bold" as const },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: string | number) => `${value}%`,
        },
      },
    },
  };

  // Regional Yield Chart
  const regionalData = {
    labels: Object.keys(cropData.regionalYield),
    datasets: [
      {
        label: "Yield (tons/hectare)",
        data: Object.values(cropData.regionalYield),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        borderWidth: 1,
      },
    ],
  };

  const regionalOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Regional Yield Comparison",
        font: { size: 16, weight: "bold" as const },
      },
    },
  };

  // Function to convert categorical NPK values to numeric values for chart display
  const getCategoricalToNumeric = (
    category: string,
    type: "nitrogen" | "phosphorus" | "potassium"
  ): number => {
    const upperCategory = String(category).toUpperCase();

    if (type === "nitrogen") {
      switch (upperCategory) {
        case "LOW":
          return 200; // Representative low value
        case "MEDIUM":
          return 420; // Representative medium value
        case "HIGH":
          return 700; // Representative high value
        default:
          return 0;
      }
    } else if (type === "phosphorus") {
      switch (upperCategory) {
        case "LOW":
          return 7; // Representative low value
        case "MEDIUM":
          return 17; // Representative medium value
        case "HIGH":
          return 35; // Representative high value
        default:
          return 0;
      }
    } else {
      // potassium
      switch (upperCategory) {
        case "LOW":
          return 80; // Representative low value
        case "MEDIUM":
          return 190; // Representative medium value
        case "HIGH":
          return 350; // Representative high value
        default:
          return 0;
      }
    }
  };

  // Nutrient Requirements vs Soil Data
  const currentSoil = {
    nitrogen: (() => {
      if (typeof soilData?.nitrogen === "number" && !isNaN(soilData.nitrogen)) {
        return soilData.nitrogen;
      }
      // Check if it's a categorical value
      if (typeof soilData?.nitrogen === "string") {
        return getCategoricalToNumeric(soilData.nitrogen, "nitrogen");
      }
      const parsed = parseFloat(String(soilData?.nitrogen || "0"));
      return isNaN(parsed) ? 0 : parsed;
    })(),
    phosphorus: (() => {
      if (
        typeof soilData?.phosphorous === "number" &&
        !isNaN(soilData.phosphorous)
      ) {
        return soilData.phosphorous;
      }
      // Check if it's a categorical value
      if (typeof soilData?.phosphorous === "string") {
        return getCategoricalToNumeric(soilData.phosphorous, "phosphorus");
      }
      const parsed = parseFloat(String(soilData?.phosphorous || "0"));
      return isNaN(parsed) ? 0 : parsed;
    })(),
    potassium: (() => {
      if (
        typeof soilData?.potassium === "number" &&
        !isNaN(soilData.potassium)
      ) {
        return soilData.potassium;
      }
      // Check if it's a categorical value
      if (typeof soilData?.potassium === "string") {
        return getCategoricalToNumeric(soilData.potassium, "potassium");
      }
      const parsed = parseFloat(String(soilData?.potassium || "0"));
      return isNaN(parsed) ? 0 : parsed;
    })(),
  };

  // Debug logging to help identify the issue
  console.log("Raw soil data:", soilData);
  console.log("Processed currentSoil:", currentSoil);

  // Function to convert numeric NPK values to categorical labels, or return existing categorical data
  const getNutrientStatus = (
    value: number,
    type: "nitrogen" | "phosphorus" | "potassium"
  ) => {
    // If we have categorical soil data, use it directly
    if (typeof soilData?.nitrogen === "string" && type === "nitrogen") {
      const category = soilData.nitrogen.toUpperCase();
      if (category === "LOW")
        return { status: soilData.nitrogen, color: "destructive" as const };
      if (category === "MEDIUM")
        return { status: soilData.nitrogen, color: "default" as const };
      return { status: soilData.nitrogen, color: "secondary" as const };
    }
    if (typeof soilData?.phosphorous === "string" && type === "phosphorus") {
      const category = soilData.phosphorous.toUpperCase();
      if (category === "LOW")
        return { status: soilData.phosphorous, color: "destructive" as const };
      if (category === "MEDIUM")
        return { status: soilData.phosphorous, color: "default" as const };
      return { status: soilData.phosphorous, color: "secondary" as const };
    }
    if (typeof soilData?.potassium === "string" && type === "potassium") {
      const category = soilData.potassium.toUpperCase();
      if (category === "LOW")
        return { status: soilData.potassium, color: "destructive" as const };
      if (category === "MEDIUM")
        return { status: soilData.potassium, color: "default" as const };
      return { status: soilData.potassium, color: "secondary" as const };
    }

    // Otherwise, convert numeric values to categorical
    if (type === "nitrogen") {
      if (value < 280) return { status: "Low", color: "destructive" as const };
      if (value <= 560) return { status: "Medium", color: "default" as const };
      return { status: "High", color: "secondary" as const };
    } else if (type === "phosphorus") {
      if (value < 10) return { status: "Low", color: "destructive" as const };
      if (value <= 24.6) return { status: "Medium", color: "default" as const };
      return { status: "High", color: "secondary" as const };
    } else {
      // potassium
      if (value < 108) return { status: "Low", color: "destructive" as const };
      if (value <= 280) return { status: "Medium", color: "default" as const };
      return { status: "High", color: "secondary" as const };
    }
  };

  // Get nutrient statuses for display
  const nitrogenStatus = getNutrientStatus(currentSoil.nitrogen, "nitrogen");
  const phosphorusStatus = getNutrientStatus(
    currentSoil.phosphorus,
    "phosphorus"
  );
  const potassiumStatus = getNutrientStatus(currentSoil.potassium, "potassium");

  const nutrientComparisonData = {
    labels: ["Nitrogen", "Phosphorus", "Potassium"],
    datasets: [
      {
        label: "Required (kg/hectare)",
        data: [
          cropData.nutrients.nitrogen,
          cropData.nutrients.phosphorus,
          cropData.nutrients.potassium,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "#3b82f6",
        borderWidth: 1,
      },
      {
        label: "Available in Soil",
        data: [
          currentSoil.nitrogen,
          currentSoil.phosphorus,
          currentSoil.potassium,
        ],
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderColor: "#10b981",
        borderWidth: 1,
      },
    ],
  };

  const nutrientOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Nutrient Requirements vs Available",
        font: { size: 16, weight: "bold" as const },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Seasonal Requirements Radar/Doughnut
  const seasonalLabels = Object.keys(cropData.seasonalRequirements);
  const waterReqs = seasonalLabels.map(
    (stage) => cropData.seasonalRequirements[stage]?.water || 0
  );

  const seasonalData = {
    labels: seasonalLabels,
    datasets: [
      {
        data: waterReqs,
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const seasonalOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Water Requirements by Growth Stage",
        font: { size: 16, weight: "bold" as const },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recommendations
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{cropData.icon}</span>
          <div>
            <h2 className="text-2xl font-bold capitalize">{cropName}</h2>
            <Badge variant="secondary">{cropData.category}</Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{cropData.duration}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Season</p>
                <p className="font-semibold">{cropData.season}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Water Need</p>
                <p className="font-semibold text-xs">{cropData.waterReq}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-sm text-muted-foreground">Market Price</p>
                <p className="font-semibold text-xs">{cropData.marketPrice}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Growth Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Line data={growthChartData} options={growthChartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Regional Yield */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Regional Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={regionalData} options={regionalOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Nutrient Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Nutrient Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={nutrientComparisonData} options={nutrientOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Seasonal Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-5 h-5" />
              Growth Stage Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Doughnut data={seasonalData} options={seasonalOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Requirements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Growth Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Growth Stage</th>
                  <th className="text-left p-2">Water (mm/week)</th>
                  <th className="text-left p-2">Temperature (°C)</th>
                  <th className="text-left p-2">Humidity (%)</th>
                </tr>
              </thead>
              <tbody>
                {seasonalLabels.map((stage) => (
                  <tr key={stage} className="border-b">
                    <td className="p-2 font-medium">{stage}</td>
                    <td className="p-2">
                      {cropData.seasonalRequirements[stage]?.water || "N/A"}
                    </td>
                    <td className="p-2">
                      {cropData.seasonalRequirements[stage]?.temperature ||
                        "N/A"}
                    </td>
                    <td className="p-2">
                      {cropData.seasonalRequirements[stage]?.humidity || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Soil Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>pH Range:</span>
                <span className="font-semibold">{cropData.soilPh}</span>
              </div>
              <div className="flex justify-between">
                <span>Temperature:</span>
                <span className="font-semibold">{cropData.tempRange}</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Yield:</span>
                <span className="font-semibold">{cropData.avgYield}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suitability for Your Soil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {soilData && (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">Nitrogen:</span>
                      <span className="text-sm text-muted-foreground">
                        {typeof soilData?.nitrogen === "string"
                          ? `${soilData.nitrogen} (~${currentSoil.nitrogen} kg/ha)`
                          : `${currentSoil.nitrogen.toFixed(1)} kg/ha`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={nitrogenStatus.color}>
                        {nitrogenStatus.status}
                      </Badge>
                      <Badge
                        variant={
                          currentSoil.nitrogen >= cropData.nutrients.nitrogen
                            ? "default"
                            : "destructive"
                        }
                      >
                        {currentSoil.nitrogen >= cropData.nutrients.nitrogen
                          ? "Sufficient"
                          : "Needs Fertilizer"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">Phosphorus:</span>
                      <span className="text-sm text-muted-foreground">
                        {typeof soilData?.phosphorous === "string"
                          ? `${soilData.phosphorous} (~${currentSoil.phosphorus} kg/ha)`
                          : `${currentSoil.phosphorus.toFixed(1)} kg/ha`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={phosphorusStatus.color}>
                        {phosphorusStatus.status}
                      </Badge>
                      <Badge
                        variant={
                          currentSoil.phosphorus >=
                          cropData.nutrients.phosphorus
                            ? "default"
                            : "destructive"
                        }
                      >
                        {currentSoil.phosphorus >= cropData.nutrients.phosphorus
                          ? "Sufficient"
                          : "Needs Fertilizer"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">Potassium:</span>
                      <span className="text-sm text-muted-foreground">
                        {typeof soilData?.potassium === "string"
                          ? `${soilData.potassium} (~${currentSoil.potassium} kg/ha)`
                          : `${currentSoil.potassium.toFixed(1)} kg/ha`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={potassiumStatus.color}>
                        {potassiumStatus.status}
                      </Badge>
                      <Badge
                        variant={
                          currentSoil.potassium >= cropData.nutrients.potassium
                            ? "default"
                            : "destructive"
                        }
                      >
                        {currentSoil.potassium >= cropData.nutrients.potassium
                          ? "Sufficient"
                          : "Needs Fertilizer"}
                      </Badge>
                    </div>
                  </div>

                  {/* Additional soil info */}
                  {soilData.ph && (
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex flex-col">
                        <span className="font-medium">pH Level:</span>
                        <span className="text-sm text-muted-foreground">
                          {soilData.ph}
                        </span>
                      </div>
                      <Badge
                        variant={
                          typeof soilData.ph === "number"
                            ? soilData.ph < 6.5
                              ? "destructive"
                              : soilData.ph > 7.5
                              ? "destructive"
                              : "default"
                            : "secondary"
                        }
                      >
                        {typeof soilData.ph === "number"
                          ? soilData.ph < 6.5
                            ? "Acidic"
                            : soilData.ph > 7.5
                            ? "Alkaline"
                            : "Neutral"
                          : String(soilData.ph)}
                      </Badge>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropDetail;
