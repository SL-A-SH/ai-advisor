import Constants from 'expo-constants';

export async function queryLLM(prompt: string): Promise<string> {
  const apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENAI_API_KEY; 

  if (!apiKey) {
    throw new Error("API Key is missing from Expo config.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  console.log("API Key", apiKey);
  if (!response.ok) {
    throw new Error(`LLM API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}