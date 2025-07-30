import { useState } from "react";
import {
  getCropRecommendations,
  resolveLocation,
  getBlocksInDistrict,
  getCoverageInfo,
  healthCheck,
  type CropRecommendationRequest,
  type CropRecommendationResponse,
  type LocationResolutionResponse,
  type CoverageInfo,
} from "../services/cropRecommendationService";

const APITestingComponent = () => {
  const [results, setResults] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Test coordinates
  const testCoordinates = {
    karnataka: { lat: 16.1848, lon: 75.6791 }, // Bagalakote
    gujarat: { lat: 23.0225, lon: 72.5714 }, // Ahmedabad
    tamilnadu: { lat: 13.0827, lon: 80.2707 }, // Chennai
  };

  const logResult = (title: string, data: unknown) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${title}:\n${JSON.stringify(
      data,
      null,
      2
    )}\n\n`;
    setResults((prev) => prev + logEntry);
  };

  const clearResults = () => setResults("");

  // Test 1: Health Check
  const testHealthCheck = async () => {
    setLoading(true);
    try {
      const result = await healthCheck();
      logResult("✅ Health Check", result);
    } catch (error) {
      logResult("❌ Health Check Error", { error: error.message });
    }
    setLoading(false);
  };

  // Test 2: Coverage Info
  const testCoverageInfo = async () => {
    setLoading(true);
    try {
      const result = await getCoverageInfo();
      logResult("📊 Coverage Info", result);
    } catch (error) {
      logResult("❌ Coverage Info Error", { error: error.message });
    }
    setLoading(false);
  };

  // Test 3: Location Resolution
  const testLocationResolution = async () => {
    setLoading(true);

    for (const [name, coords] of Object.entries(testCoordinates)) {
      try {
        const result = await resolveLocation(coords.lat, coords.lon);
        logResult(`🌍 Location Resolution - ${name}`, result);
      } catch (error) {
        logResult(`❌ Location Resolution Error - ${name}`, {
          error: error.message,
        });
      }
    }
    setLoading(false);
  };

  // Test 4: Get Blocks in District
  const testGetBlocks = async () => {
    setLoading(true);

    const testDistricts = [
      { state: "Karnataka", district: "Bagalakote" },
      { state: "Gujarat", district: "Ahmedabad" },
      { state: "Tamil Nadu", district: "Chennai" },
    ];

    for (const { state, district } of testDistricts) {
      try {
        const result = await getBlocksInDistrict(state, district);
        logResult(`🏘️ Blocks in ${state} - ${district}`, {
          blocks: result,
          count: result.length,
        });
      } catch (error) {
        logResult(`❌ Get Blocks Error - ${state}/${district}`, {
          error: error.message,
        });
      }
    }
    setLoading(false);
  };

  // Test 5: Location-based Crop Recommendations
  const testLocationBasedRecommendations = async () => {
    setLoading(true);

    for (const [name, coords] of Object.entries(testCoordinates)) {
      try {
        const request: CropRecommendationRequest = {
          method: "location",
          latitude: coords.lat,
          longitude: coords.lon,
        };

        const result = await getCropRecommendations(request);
        logResult(`🌾 Location-based Recommendations - ${name}`, result);
      } catch (error) {
        logResult(`❌ Location-based Recommendations Error - ${name}`, {
          error: error.message,
        });
      }
    }
    setLoading(false);
  };

  // Test 6: Manual Location Crop Recommendations
  const testManualLocationRecommendations = async () => {
    setLoading(true);

    const testLocations = [
      { state: "Karnataka", district: "Bagalakote", block: "JAMKHANDI" },
      { state: "Gujarat", district: "Ahmedabad", block: "DASKROI" },
    ];

    for (const location of testLocations) {
      try {
        const request: CropRecommendationRequest = {
          method: "manual_location",
          ...location,
        };

        const result = await getCropRecommendations(request);
        logResult(
          `🏷️ Manual Location Recommendations - ${location.state}/${location.district}/${location.block}`,
          result
        );
      } catch (error) {
        logResult(
          `❌ Manual Location Recommendations Error - ${location.state}`,
          { error: error.message }
        );
      }
    }
    setLoading(false);
  };

  // Test 7: NPK-based Crop Recommendations
  const testNPKRecommendations = async () => {
    setLoading(true);

    const testNPKCombinations = [
      {
        name: "High N, Medium P, Low K",
        nitrogen_status: "High" as const,
        phosphorus_status: "Medium" as const,
        potassium_status: "Low" as const,
        ph_status: "Neutral" as const,
      },
      {
        name: "Low N, High P, Low K",
        nitrogen_status: "Low" as const,
        phosphorus_status: "High" as const,
        potassium_status: "Low" as const,
        ph_status: "Acidic" as const,
      },
      {
        name: "High N, High P, High K",
        nitrogen_status: "High" as const,
        phosphorus_status: "High" as const,
        potassium_status: "High" as const,
        ph_status: "Neutral" as const,
      },
    ];

    for (const npk of testNPKCombinations) {
      try {
        const { name, ...npkData } = npk;
        const request: CropRecommendationRequest = {
          method: "npk",
          ...npkData,
        };

        const result = await getCropRecommendations(request);
        logResult(`🧪 NPK Recommendations - ${name}`, result);
      } catch (error) {
        logResult(`❌ NPK Recommendations Error - ${npk.name}`, {
          error: error.message,
        });
      }
    }
    setLoading(false);
  };

  // Run all tests
  const runAllTests = async () => {
    clearResults();
    logResult("🚀 Starting Comprehensive API Tests", {
      timestamp: new Date().toISOString(),
    });

    await testHealthCheck();
    await testCoverageInfo();
    await testLocationResolution();
    await testGetBlocks();
    await testLocationBasedRecommendations();
    await testManualLocationRecommendations();
    await testNPKRecommendations();

    logResult("✅ All Tests Completed", {
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🧪 AgriVision API Testing Dashboard
        </h1>

        {/* Test Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={testHealthCheck}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Health Check
          </button>

          <button
            onClick={testCoverageInfo}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Coverage Info
          </button>

          <button
            onClick={testLocationResolution}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Location Resolution
          </button>

          <button
            onClick={testGetBlocks}
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Get Blocks
          </button>

          <button
            onClick={testLocationBasedRecommendations}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Location Recommendations
          </button>

          <button
            onClick={testManualLocationRecommendations}
            disabled={loading}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Manual Location
          </button>

          <button
            onClick={testNPKRecommendations}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            NPK Recommendations
          </button>

          <button
            onClick={runAllTests}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50 font-bold"
          >
            🚀 Run All Tests
          </button>
        </div>

        {/* Clear Results Button */}
        <div className="mb-4">
          <button
            onClick={clearResults}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Clear Results
          </button>
          {loading && (
            <span className="ml-4 text-blue-600 font-semibold">
              🔄 Running tests...
            </span>
          )}
        </div>
      </div>

      {/* Results Display */}
      <div className="bg-gray-900 text-green-400 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">📊 Test Results</h2>
        <pre className="whitespace-pre-wrap text-sm font-mono overflow-auto max-h-96">
          {results || "No tests run yet. Click a test button to start!"}
        </pre>
      </div>

      {/* Test Information */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          ℹ️ Test Information
        </h2>
        <div className="space-y-2 text-sm text-blue-700">
          <p>
            <strong>Health Check:</strong> Verifies API server is running and
            models are loaded
          </p>
          <p>
            <strong>Coverage Info:</strong> Shows available states, districts,
            and sample blocks
          </p>
          <p>
            <strong>Location Resolution:</strong> Tests coordinate-to-block
            conversion for Karnataka, Gujarat, Tamil Nadu
          </p>
          <p>
            <strong>Get Blocks:</strong> Retrieves all blocks available in
            specific districts
          </p>
          <p>
            <strong>Location Recommendations:</strong> Gets crop recommendations
            using lat/lng coordinates
          </p>
          <p>
            <strong>Manual Location:</strong> Gets recommendations using
            explicit state/district/block
          </p>
          <p>
            <strong>NPK Recommendations:</strong> Gets recommendations based on
            soil nutrient levels
          </p>
        </div>
      </div>
    </div>
  );
};

export default APITestingComponent;
