export async function getResponseError(res: Response): Promise<string> {
  const text = await res.text();

  try {
    const json = JSON.parse(text);
    return json.message ?? JSON.stringify(json);
  } catch {
    return text;
  }
}
