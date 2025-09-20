import { getRecommendations } from "@/services/recommendationService";
import { useState } from "react";

export function useRecommendations() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function fetchRecommendations(query: string) {
    setLoading(true);
    setError(null);

    try {
      const recs = await getRecommendations(query);
      setRecommendations(recs);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { recommendations, loading, error, fetchRecommendations };
}