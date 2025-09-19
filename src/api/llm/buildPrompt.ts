import catalog from "@/assets/data/skus.json";

export function buildPrompt(userQuery: string): string {
  return `
    You are a product recommendation assistant. 
    The user query: "${userQuery}"

    Here is the product catalog (JSON):
    ${JSON.stringify(catalog)}

    Your task: 
    - Compare the user’s request against the catalog.
    - Recommend the most relevant products.
    - Respond in JSON with this format:
    [
      {
        "product_name": "...",
        "brand": "...",
        "reason": "Why it matches the query"
      }
    ]
    `;
}
