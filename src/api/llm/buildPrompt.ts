export function buildPrompt(userQuery: string, subset: any[]): string {
  return `
    You are a product recommendation assistant. 
    The user query: "${userQuery}"

    Here is the product catalog subset (JSON):
    ${JSON.stringify(subset)}

    Your task: 
    - Compare the user’s request against the catalog subset.
    - If there are matches, recommend the most relevant products.
    - For each recommended product, provide multiple reasons as an array of strings (not a single string).
    - If there are no matches at all, return an empty "recommendations" array
      and include a "note" field that says "No matching products in catalog" when 
      "recommendations" array is empty and "Products found" when "recommendations" array is not empty.
    - Respond ONLY with valid JSON in this format:
    {
      "recommendations": [
        {
          "product_name": "...",
          "brand": "...",
          "price": "...",
          "reasons": [
            "Point 1 about why this product matches",
            "Point 2 about why this product matches",
            "Point 3 about why this product matches"
          ]
        }
      ],
      "note": "..."
    }
  `;
}
