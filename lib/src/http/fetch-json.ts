import { getResponseError } from "./error.js";
import { Result } from "./result.js";

export async function fetchJSON<T>(
  url: string,
  signal?: AbortSignal,
): Promise<Result<T>> {
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return { ok: false, error: await getResponseError(res) };
    return { ok: true, data: (await res.json()) as T };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return { ok: false, error: "Fetch aborted" };
    console.error(`fetchJSON failed for ${url}:`, err);
    return { ok: false, error: `Network Error: ${err}` };
  }
}
