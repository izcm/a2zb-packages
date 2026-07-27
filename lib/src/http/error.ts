export async function getResponseError(res: Response): Promise<string> {
  try {
    const json = await res.json();
    return json.message ?? JSON.stringify(json);
  } catch {
    return res.text();
  }
}
