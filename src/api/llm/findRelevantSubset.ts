const STOPWORDS = new Set([
  "i","me","my","we","our","you","your","he","she","it","they",
  "a","an","the","please","need","want","for","with","and","or","to",
  "is","are","was","were","in","on","at","of"
]);

function normalize(text: string): string {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ") // remove punctuation
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter(t => t && !STOPWORDS.has(t));
}

function ngramsFromTokens(toks: string[], n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i <= toks.length - n; i++) {
    out.push(toks.slice(i, i + n).join(" "));
  }
  return out;
}

export function findRelevantSubset(
  catalog: any[],
  query: string,
  minScore = 1
): any[] {
  if (!query || !catalog?.length) return [];

  const qTokens = tokens(query); // e.g. ["vacuum","cleaner"]
  const qBigrams = ngramsFromTokens(qTokens, 2);

  const scored = catalog.map(item => {
    const name = normalize(item.product_name || "");
    const desc = normalize(item.description || "");
    const category = normalize(item.category || "");
    const brand = normalize(item.brand || "");
    const combined = `${name} ${desc} ${category} ${brand}`;

    let score = 0;

    // token matches with weights
    for (const t of qTokens) {
      if (!t) continue;
      if (name.includes(t)) score += 3;        // strong signal
      else if (category.includes(t)) score += 2;
      else if (desc.includes(t)) score += 1;
      if (brand.includes(t)) score += 1;
    }

    // phrase (bigram) matches get bonus
    for (const bg of qBigrams) {
      if (name.includes(bg)) score += 4;
      else if (category.includes(bg)) score += 3;
      else if (desc.includes(bg)) score += 2;
    }

    return { item, _matchScore: score };
  });

  const filtered = scored
    .filter(x => x._matchScore >= minScore)
    .sort((a, b) => b._matchScore - a._matchScore)
    .map(x => ({ ...x.item, _matchScore: x._matchScore }));

  return filtered;
}

export function stripMatchScore(items: any[]) {
  return items.map(({ _matchScore, ...rest }) => rest);
}