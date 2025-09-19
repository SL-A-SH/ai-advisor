import { queryLLM } from "@/api/llm";
import { buildPrompt } from "@/api/llm/buildPrompt";
import { sanitizeInput } from "@/api/llm/sanitizeInput";

export async function getRecommendations(userQuery: string) {
  const safeQuery = sanitizeInput(userQuery);
  const prompt = buildPrompt(safeQuery);
  const result = await queryLLM(prompt);

  try {
    return JSON.parse(result);
  } catch {
    throw new Error("Invalid JSON from LLM");
  }
}