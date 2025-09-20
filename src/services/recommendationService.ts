import { queryLLM } from "@/api/llm";
import { buildPrompt } from "@/api/llm/buildPrompt";
import { findRelevantSubset, stripMatchScore } from "@/api/llm/findRelevantSubset";
import { sanitizeInput } from "@/api/llm/sanitizeInput";
import catalog from "@/assets/data/skus.json";

export async function getRecommendations(userQuery: string) {
  const safeQuery = sanitizeInput(userQuery);
  const subset = findRelevantSubset(catalog, safeQuery);

  if (subset.length === 0) {
    return { 
      recommendations: [], 
      note: "No matching products in catalog" 
    };
  }

  const prompt = buildPrompt(safeQuery, stripMatchScore(subset));
  const result = await queryLLM(prompt);

  try {
    return result.recommendations;
  } catch {
    throw new Error("Invalid JSON from LLM");
  }
}