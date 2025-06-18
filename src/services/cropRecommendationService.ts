export interface CropRecommendationRequest {
    state: string;
    district: string;
    block: string;
}

export interface CropRecommendation {
    crop: string;
    probability: number;
}

export async function getCropRecommendations(
    data: { state: string; district: string; block: string; }
): Promise<CropRecommendation[]> {
    console.log("Posting to /recommend-crop with body:", data);
    const response = await fetch("http://127.0.0.1:8000/recommend-crop", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    console.log("Response status:", response.status);
    const result = await response.json().catch(() => ({}));
    console.log("Response body:", result);
    if (!response.ok) throw new Error("Failed to fetch crop recommendations");
    return result.recommended_crops;
}