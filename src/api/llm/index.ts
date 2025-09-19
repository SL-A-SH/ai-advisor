export async function queryLLM(prompt: string): Promise<string> {
  const response = await fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.EXPO_DEV_OPEN_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    console.log(response);
    throw new Error(`LLM API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}