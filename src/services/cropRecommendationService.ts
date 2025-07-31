// Base URL for the API - update this to match your backend
const API_BASE_URL = "https://agrivision-backend.onrender.com"; // Replace with your actual Render URL

// Interfaces for different recommendation methods
export interface LocationBasedRequest {
    method: 'location';
    latitude: number;
    longitude: number;
}

export interface ManualLocationRequest {
    method: 'manual_location';
    state: string;
    district: string;
    block: string;
}

export interface NPKBasedRequest {
    method: 'npk';
    nitrogen_status: 'Low' | 'Medium' | 'High';
    phosphorus_status: 'Low' | 'Medium' | 'High';
    potassium_status: 'Low' | 'Medium' | 'High';
    ph_status: 'Acidic' | 'Neutral' | 'Alkaline';
}

export type CropRecommendationRequest = LocationBasedRequest | ManualLocationRequest | NPKBasedRequest;


// Backend now returns only crop names (string[]), not objects
export type CropRecommendation = string;

export interface LocationInfo {
    state?: string;
    district?: string;
    city?: string;
    country?: string;
    source?: string;
}

export interface BlockInfo {
    state: string;
    district: string;
    block: string;
    method: 'proximity' | 'most_common_in_district';
    distance_km?: number;
    data_points?: number;
}


// Backend now returns just string[] for recommendations
export interface CropRecommendationResponse {
    nearest_state?: string;
    nearest_district?: string;
    nearest_block?: string;
    predictions: string[];
    soil_data?: {
        nitrogen: number;
        phosphorous: number;
        potassium: number;
        ph: number;
    };
}

export interface LocationResolutionResponse {
    success: boolean;
    location?: LocationInfo;
    block?: BlockInfo;
    method?: string;
    needs_manual_selection?: boolean;
    available_blocks?: string[];
    error?: string;
}

export interface CoverageInfo {
    states: string[];
    total_locations: number;
    districts_by_state: Record<string, string[]>;
    sample_blocks: Record<string, string[]>;
}

// Main crop recommendation function

// New API endpoints: /predict/location and /predict/npk
export async function getCropRecommendations(
    data: CropRecommendationRequest
): Promise<CropRecommendationResponse> {
    let url = "";
    let body: Record<string, unknown> = {};
    if (data.method === "location" || data.method === "manual_location") {
        const loc = data as ManualLocationRequest;
        url = `${API_BASE_URL.replace(/\/api$/, "")}/predict/location`;
        body = {
            state: loc.state,
            district: loc.district,
            block: loc.block,
            top_n: 5
        };
    } else if (data.method === "npk") {
        const npk = data as NPKBasedRequest;
        url = `${API_BASE_URL.replace(/\/api$/, "")}/predict/npk`;
        body = {
            nitrogen_status: npk.nitrogen_status,
            phosphorus_status: npk.phosphorus_status,
            potassium_status: npk.potassium_status,
            ph_status: npk.ph_status,
            top_n: 5
        };
    } else {
        throw new Error("Unknown recommendation method");
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.detail || "Failed to fetch crop recommendations");
    }
    // For location-based requests, backend returns { nearest_state, nearest_district, nearest_block, predictions }
    // For NPK-based, backend returns string[]
    return result;
}

// Location resolution function
export async function resolveLocation(
    latitude: number,
    longitude: number
): Promise<LocationResolutionResponse> {
    console.log("Resolving location:", { latitude, longitude });

    const response = await fetch(`${API_BASE_URL}/resolve-location`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude, longitude }),
    });

    const result = await response.json();
    console.log("Location resolution result:", result);

    if (!response.ok) {
        throw new Error(result.error || "Failed to resolve location");
    }

    return result;
}

// Get blocks in a district
export async function getBlocksInDistrict(
    state: string,
    district: string
): Promise<string[]> {
    console.log("Getting blocks for:", { state, district });

    const response = await fetch(
        `${API_BASE_URL}/get-blocks?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}`
    );

    const result = await response.json();
    console.log("Blocks result:", result);

    if (!response.ok) {
        throw new Error(result.error || "Failed to fetch blocks");
    }

    return result.blocks;
}

// Get coverage information
export async function getCoverageInfo(): Promise<CoverageInfo> {
    const response = await fetch(`${API_BASE_URL}/coverage`);
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Failed to fetch coverage info");
    }

    return result.coverage;
}

// Health check
export async function healthCheck(): Promise<{ status: string; message: string; models_loaded: boolean }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    const result = await response.json();

    if (!response.ok) {
        throw new Error("API health check failed");
    }

    return result;
}