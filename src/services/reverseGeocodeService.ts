// Service to call backend reverse geocode proxy
const API_BASE_URL = "http://127.0.0.1:8000";

export async function reverseGeocode(lat: number, lon: number) {
    const url = `${API_BASE_URL}/reverse-geocode/?lat=${lat}&lon=${lon}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to reverse geocode location");
    }
    return res.json();
}
