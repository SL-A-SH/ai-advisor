export async function queryLLM(prompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  console.log("All env:", process.env);
  if (!response.ok) {
    throw new Error(`LLM API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}