import React, { useEffect, useState } from "react";
import {
  getCropRecommendations,
  CropRecommendation,
} from "../services/cropRecommendationService";

interface Location {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  block: string;
}

interface RecommendationCardProps {
  location: Location | null;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  location,
}) => {
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      location &&
      location.state &&
      location.district &&
      location.block &&
      location.state !== "Unknown" &&
      location.district !== "Unknown" &&
      location.block !== "Unknown"
    ) {
      setLoading(true);
      setError(null);
      setRecommendations([]);
      getCropRecommendations({
        state: location.state,
        district: location.district,
        block: location.block,
      })
        .then(setRecommendations)
        .catch(() =>
          setError("Failed to fetch recommendations. Please try again later.")
        )
        .finally(() => setLoading(false));
    }
  }, [location]);

  if (!location) {
    return <div>Detecting location...</div>;
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h2>Crop Recommendations</h2>
      <p>
        Location detected:{" "}
        <strong>
          {location.state}, {location.district}, {location.block}
        </strong>
      </p>
      {loading && <p>Loading recommendations...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recommendations.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Top 4 Crops:</h3>
          <ul>
            {recommendations.map((rec, idx) => (
              <li key={idx}>
                <strong>{rec.crop}</strong> &mdash; Probability:{" "}
                {(rec.probability * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
