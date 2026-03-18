import { SourcesResponse } from "@/types/news";

const API_KEY = ""; // User must provide their own key

const BASE_URL = "https://newsapi.org/v2/top-headlines/sources";

export async function fetchSources(apiKey: string): Promise<SourcesResponse> {
  const res = await fetch(`${BASE_URL}?apiKey=${apiKey}`);
  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("RATE_LIMITED");
    }
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}
