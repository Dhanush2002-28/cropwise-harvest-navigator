// Base URL for the API - update this to match your backend
const API_BASE_URL = "http://127.0.0.1:5000/api";

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

export interface CropRecommendation {
    crop: string;
    confidence: number;
    rank: number;
}

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

export interface CropRecommendationResponse {
    success: boolean;
    method: string;
    location?: LocationInfo;
    block?: BlockInfo;
    input_parameters?: Record<string, string>;
    recommendations: CropRecommendation[];
    error?: string;
    needs_manual_selection?: boolean;
    available_blocks?: string[];
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
export async function getCropRecommendations(
    data: CropRecommendationRequest
): Promise<CropRecommendationResponse> {
    console.log("Making crop recommendation request:", data);

    const response = await fetch(`${API_BASE_URL}/recommend-crops`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);
    const result = await response.json();
    console.log("Response body:", result);

    if (!response.ok) {
        throw new Error(result.error || "Failed to fetch crop recommendations");
    }

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